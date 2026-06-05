import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

const HIDDEN_MESSAGE = '*Commit message hidden*';
const HIDDEN_PATTERNS = ['[secret]', '[hide]', '[private]'];

const DISCORD_EMBED_COLOR = 0x5865f2;
const MAX_COMMIT_LINES = 10;

function shouldHideCommit(commit) {
	const message = commit.message ?? '';
	const lowerMessage = message.toLowerCase();

	return HIDDEN_PATTERNS.some((pattern) =>
		lowerMessage.includes(pattern.toLowerCase())
	);
}

function getCommitMessage(commit) {
	if (shouldHideCommit(commit)) {
		return HIDDEN_MESSAGE;
	}

	return commit.message.split('\n')[0];
}

function formatCommit(commit) {
	const shortHash = commit.id.slice(0, 7);
	const message = getCommitMessage(commit);

	return `[\`${shortHash}\`](${commit.url}) ${message}`;
}

function getRepoName(payload) {
	return payload.repository?.name ?? payload.repository?.full_name ?? 'Unknown Repository';
}

function getBranchName(ref) {
	return ref.replace('refs/heads/', '');
}

function shouldSendBranch(branchName) {
	return branchName.toLowerCase().includes('main');
}

function getPusherName(payload) {
	return payload.pusher?.name ?? payload.sender?.login ?? 'Unknown User';
}

function getPusherAvatar(payload) {
	return payload.sender?.avatar_url;
}

function getChanges(payload) {
	return payload.commits.reduce(
		(total, commit) => {
			if (shouldHideCommit(commit)) {
				return total;
			}

			total.added += commit.added?.length ?? 0;
			total.modified += commit.modified?.length ?? 0;
			total.removed += commit.removed?.length ?? 0;

			return total;
		},
		{
			added: 0,
			modified: 0,
			removed: 0
		}
	);
}

function getChangesText(payload) {
	const changes = getChanges(payload);

	return `+${changes.added} ~${changes.modified} -${changes.removed}`;
}

function formatCommits(payload) {
	const commits = payload.commits ?? [];
	const visibleCommits = commits.slice(0, MAX_COMMIT_LINES);
	const remainingCount = commits.length - visibleCommits.length;

	const lines = visibleCommits.map(formatCommit);

	if (remainingCount > 0) {
		lines.push(`... ${remainingCount} more commit(s)`);
	}

	return lines.join('\n') || '*No commits included*';
}

function buildDiscordPayload(payload) {
	const repoName = getRepoName(payload);
	const branchName = getBranchName(payload.ref);
	const pusherName = getPusherName(payload);
	const pusherAvatar = getPusherAvatar(payload);
	const commitCount = payload.commits?.length ?? 0;

	return {
		embeds: [
			{
				author: {
					name: `${pusherName} pushed to ${repoName}`,
					icon_url: pusherAvatar,
					url: payload.sender?.html_url
				},
				title: 'View Changes',
				url: payload.compare,
				color: DISCORD_EMBED_COLOR,
				fields: [
					{
						name: 'Branch',
						value: `\`${branchName}\``,
						inline: true
					},
					{
						name: 'Commits',
						value: String(commitCount),
						inline: true
					},
					{
						name: 'Changes',
						value: getChangesText(payload),
						inline: true
					},
					{
						name: 'Commit List',
						value: formatCommits(payload)
					}
				],
				timestamp: new Date().toISOString(),
				footer: {
					text: 'GitHub Push Event'
				}
			}
		]
	};
}

function verifyGithubSignature(body, signature) {
	if (!env.GITHUB_WEBHOOK_SECRET || !signature) {
		return false;
	}

	const expectedSignature = `sha256=${crypto
		.createHmac('sha256', env.GITHUB_WEBHOOK_SECRET)
		.update(body)
		.digest('hex')}`;

	const signatureBuffer = Buffer.from(signature);
	const expectedBuffer = Buffer.from(expectedSignature);

	if (signatureBuffer.length !== expectedBuffer.length) {
		return false;
	}

	return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
}

export async function POST({ request }) {
	const eventType = request.headers.get('x-github-event');
	const signature = request.headers.get('x-hub-signature-256');
	const body = await request.text();

	if (!verifyGithubSignature(body, signature)) {
		return json({ error: 'Invalid signature' }, { status: 401 });
	}

	if (eventType !== 'push') {
		return json({ ok: true, ignored: true });
	}

	if (!env.DISCORD_GITHUB_WEBHOOK_URL) {
		console.error('[github/webhook] Missing DISCORD_GITHUB_WEBHOOK_URL');

		return json({ error: 'Missing Discord webhook URL' }, { status: 500 });
	}

	try {
		const payload = JSON.parse(body);
		const branchName = getBranchName(payload.ref);

		if (!shouldSendBranch(branchName)) {
			return json({
				ok: true,
				ignored: true,
				reason: 'Branch does not include main'
			});
		}

		const discordPayload = buildDiscordPayload(payload);

		const discordRes = await fetch(env.DISCORD_GITHUB_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(discordPayload)
		});

		if (!discordRes.ok) {
			throw new Error(`Discord webhook error: ${discordRes.status}`);
		}

		return json({ ok: true });
	} catch (err) {
		console.error('[github/webhook]', err);

		return json({ error: 'Failed to process GitHub webhook' }, { status: 502 });
	}
}