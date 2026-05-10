const languageColors = {
	JavaScript: '#f7df1e',
	Lua: '#000080',
	TypeScript: '#3178c6',
	Rust: '#dea584',
	'C#': '#178600',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Svelte: '#ff3e00'
};

const escapeSvg = (value) =>
	String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');

const getSiteOrigin = (url) => `${url.protocol}//${url.host}`;

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ fetch, url }) => {
	const statsRes = await fetch(`${getSiteOrigin(url)}/api/v1/github/stats`);

	if (!statsRes.ok) {
		return new Response('Failed to load GitHub stats', { status: 502 });
	}

	const stats = await statsRes.json();
	const languages = stats.topLanguages.slice(0, 6);

	let barX = 34;

	const bars = languages
		.map((language) => {
			const width = Math.max(0, Number(language.percentage) * 5.82);
			const x = barX;
			barX += width;

			return `<rect x="${x}" y="74" width="${width}" height="14" fill="${languageColors[language.name] ?? '#3b82f6'}"/>`;
		})
		.join('');

	const rows = languages
		.map((language, index) => {
			const col = index % 2;
			const row = Math.floor(index / 2);

			const itemX = 44 + col * 285;
			const itemY = 125 + row * 34;
			const color = languageColors[language.name] ?? '#3b82f6';

			return `
				<circle cx="${itemX}" cy="${itemY - 5}" r="6" fill="${color}"/>
				<text x="${itemX + 16}" y="${itemY}" fill="#dbeafe" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="18">${escapeSvg(language.name)}</text>
				<text x="${itemX + 210}" y="${itemY}" fill="#93a4bd" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="18">${Math.round(language.percentage)}%</text>
			`;
		})
		.join('');

	const svg = `
<svg width="650" height="240" viewBox="0 0 650 240" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="650" height="240" rx="18" fill="#05080f"/>
	<rect x="1" y="1" width="648" height="238" rx="17" stroke="#1e3a8a" stroke-opacity="0.55"/>

	<text x="34" y="48" fill="#f8fafc" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">
		GitHub Status
	</text>

	<text x="470" y="48" fill="#93a4bd" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="16">
		${stats.repos} repos • ${stats.stars} stars
	</text>

	<clipPath id="barClip">
		<rect x="34" y="74" width="582" height="14" rx="7"/>
	</clipPath>

	<g clip-path="url(#barClip)">
		${bars}
	</g>

	${rows}
</svg>`.trim();

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};