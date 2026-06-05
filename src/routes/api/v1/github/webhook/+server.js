import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

const HIDDEN_MESSAGE = '*Commit message hidden*';

const HIDDEN_PATTERNS = ['[hide]', '[private]', 'secret'];

const DISCORD_EMBED_COLOR = 0x5865f2;
const MAX_COMMIT_LINES = 10;
const MAX_FILE_LINES = 12;

function shouldHideMessage(message) {
	const lowerMessage = message.toLowerCase();

	return HIDDEN_PATTERNS.some((pattern) =>
		lowerMessage.includes(pattern.toLowerCase())
	);
}

function getCommitMessage(commit) {
	if (shouldHideMessage(commit.message)) {
		return HIDDEN_MESSAGE;
	}

	return commit.message.split('\n')[0];
}

function formatCommit(commit) {
	const shortHash = commit.id.slice(0, 7);
	const message = getCommitMessage(commit);

	return `[\`${shortHash}\`](${commit.url}) ${message}`;
}

function getBranchName(ref) {
	return ref.replace('refs/heads/', '');
}

function getChanges(payload) {
	return payload.commits.reduce(
		(total, commit) => {
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

function getChangedFiles(payload) {
	const files = new Set();

	for (const commit of payload.commits) {
		for (const file of commit.added ?? []) files.add(`+ ${file}`);
		for (const file of commit.modified ?? []) files.add(`~ ${file}`);
		for (const file of commit.removed ?? []) files.add(`- ${file}`);
	}

	return [...files];
}

function formatChangedFiles(payload) {
	const files = getChangedFiles(payload);

	if (files.length === 0) {
		return '*No changed files listed*';
	}

	const visibleFiles = files.slice(0, MAX_FILE_LINES);
	const remainingCount = files.length - visibleFiles.length;

	return [
		'```diff',
		...visibleFiles,
		remainingCount > 0 ? `... ${remainingCount} more file(s)` : null,
		'```'
	]
		.filter(Boolean)
		.join('\n');
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
	const repoName = payload.repository.full_name;
	const branchName = getBranchName(payload.ref);
	const pusherName = payload.pusher.name;
	const commitCount = payload.commits?.length ?? 0;

	const fields = [
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
	];

	const changedFiles = formatChangedFiles(payload);

	if (changedFiles) {
		fields.push({
			name: 'Changed Files',
			value: changedFiles
		});
	}

	return {
		embeds: [
			{
				title: `${pusherName} pushed to ${repoName}`,
				url: payload.compare,
				color: DISCORD_EMBED_COLOR,
				fields,
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