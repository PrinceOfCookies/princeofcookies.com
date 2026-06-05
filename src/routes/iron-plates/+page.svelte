<svelte:head>
	<title>Iron Plates | PrinceOfCookies</title>
</svelte:head>

<main class="page">
	<section class="card">
		<h1>Iron Plates</h1>

		<div class="videoWrapper">
			<iframe
				src="https://www.youtube.com/embed/J3LadAXFc1Q?si=uAxUcNQVkOSS1_dL"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
	</section>
</main>

<style>
	.page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 2rem;
		background: #050816;
		color: white;
	}

	.card {
		width: min(900px, 100%);
		padding: 1.5rem;
		border-radius: 18px;
		background: #0b1020;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	h1 {
		margin: 0 0 1rem;
		font-size: 2rem;
	}

	.videoWrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: 14px;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
