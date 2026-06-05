import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

const HIDDEN_MESSAGE = '*Commit message hidden*';

const HIDDEN_PATTERNS = [
	'[hide]',
	'[private]',
	'secret'
];

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

function buildDiscordMessage(payload) {
	const repoName = payload.repository.full_name;
	const branchName = payload.ref.replace('refs/heads/', '');
	const pusherName = payload.pusher.name;

	const commits = payload.commits
		.map(formatCommit)
		.join('\n');

	return [
		`**${pusherName}** pushed to **${repoName}**`,
		`Branch: \`${branchName}\``,
		'',
		commits || '*No commits included*'
	].join('\n');
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
		const content = buildDiscordMessage(payload);

		const discordRes = await fetch(env.DISCORD_GITHUB_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content })
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