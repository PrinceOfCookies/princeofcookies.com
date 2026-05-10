/** @type {import('./$types').RequestHandler} */
export const GET = () => {
	const svg = `
<svg width="1200" height="220" viewBox="0 0 1200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="1200" height="220" rx="24" fill="#05080f"/>
	<rect x="1" y="1" width="1198" height="218" rx="23" stroke="#1e3a8a" stroke-opacity="0.65"/>

	<circle cx="118" cy="110" r="40" fill="#2563eb"/>
	<circle cx="106" cy="96" r="6" fill="#05080f"/>
	<circle cx="128" cy="119" r="7" fill="#05080f"/>
	<circle cx="114" cy="134" r="5" fill="#05080f"/>
	<path d="M142 86C160 94 167 111 160 128C149 120 138 108 142 86Z" fill="#05080f"/>

	<text x="190" y="99" fill="#f8fafc" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="46" font-weight="700">
		PrinceOfCookies
	</text>

	<text x="192" y="142" fill="#93a4bd" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="22" letter-spacing="3">
		LUA • GARRY'S MOD • WEB • TOOLS
	</text>

	<circle cx="1060" cy="110" r="140" fill="#2563eb" opacity="0.16"/>
	<circle cx="1060" cy="110" r="75" fill="#2563eb" opacity="0.12"/>
</svg>`.trim();

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};