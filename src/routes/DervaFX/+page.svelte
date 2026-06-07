<script>
  import { projectFocus } from "$lib/dervafx-wiki";

  let { data } = $props();

  const guidePages = $derived(
    data.wikiGroups
      .filter((group) => group.title !== "Components" && group.title !== "Overview")
      .flatMap((group) => group.items)
  );
</script>

<svelte:head>
  <title>DervaFX Wiki | PrinceOfCookies</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60">
  <header class="border-b border-neutral-900 px-5 py-5 md:px-6">
    <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
      New Wiki
    </p>
    <h2 class="mt-2 text-3xl font-semibold text-neutral-100">DervaFX Wiki</h2>
    <p class="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300">
      DervaFX is a small JavaFX wrapper library with a chainable API and a
      Derma-inspired direction. This is the new public wiki for the project, grouped
      more like an actual reference section instead of one long fake-looking page.
    </p>
  </header>

  <section class="grid gap-4 border-b border-neutral-900 px-5 py-5 md:px-6 xl:grid-cols-[minmax(0,1fr)_280px]">
    <div>
      <h3 class="text-lg font-semibold text-neutral-100">What It Focuses On</h3>
      <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
        {#each projectFocus as item}
          <li>{item}</li>
        {/each}
      </ul>
    </div>

    <aside class="rounded-lg border border-neutral-800 bg-neutral-950/80 p-4">
      <h3 class="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">
        Project Info
      </h3>
      <dl class="mt-3 grid grid-cols-[84px_1fr] gap-x-3 gap-y-2 text-sm">
        <dt class="text-neutral-500">Status</dt>
        <dd class="text-neutral-200">Early public build</dd>
        <dt class="text-neutral-500">Language</dt>
        <dd class="text-neutral-200">Java / JavaFX</dd>
        <dt class="text-neutral-500">Artifact</dt>
        <dd class="text-neutral-200"><code>dervafx-pub</code></dd>
        <dt class="text-neutral-500">Version</dt>
        <dd class="text-neutral-200"><code>0.0.6-SNAPSHOT</code></dd>
      </dl>
    </aside>
  </section>

  <section class="grid gap-4 px-5 py-5 md:px-6 md:grid-cols-2">
    <figure class="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/70">
      <img
        src="https://raw.githubusercontent.com/PrinceOfCookies/DervaFX-Public/master/assets/Demo.png"
        alt="DervaFX demo window with grid-based inputs"
        class="block h-auto w-full bg-neutral-950"
      />
      <figcaption class="border-t border-neutral-800 px-4 py-3 text-sm text-neutral-400">
        Demo menu now includes Derma-theme, dock, and property-sheet showcases
      </figcaption>
    </figure>

    <figure class="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/70">
      <img
        src="https://raw.githubusercontent.com/PrinceOfCookies/DervaFX-Public/master/assets/Home.png"
        alt="DervaFX base application stage"
        class="block h-auto w-full bg-neutral-950"
      />
      <figcaption class="border-t border-neutral-800 px-4 py-3 text-sm text-neutral-400">
        Base application stage shell
      </figcaption>
    </figure>
  </section>
</article>

<section class="mt-4 rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <h3 class="text-xl font-semibold text-neutral-100">Getting Started</h3>
  <div class="mt-4 grid gap-3 md:grid-cols-2">
    {#each guidePages as item}
      <a
        href={item.href}
        class="rounded-lg border border-neutral-800 bg-neutral-950/70 px-4 py-4 no-underline transition-colors hover:border-neutral-700 hover:bg-neutral-900/80"
      >
        <h4 class="text-base font-semibold text-neutral-100">{item.title}</h4>
        <p class="mt-2 text-sm leading-relaxed text-neutral-400">{item.summary}</p>
      </a>
    {/each}
  </div>
</section>

<section class="mt-4 rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <div class="flex items-end justify-between gap-3">
    <div>
      <h3 class="text-xl font-semibold text-neutral-100">Component Pages</h3>
      <p class="mt-2 text-sm text-neutral-400">
        Every main public piece now gets its own page.
      </p>
    </div>
    <a href="/DervaFX/components" class="text-sm text-cyan-400 no-underline hover:text-cyan-300">
      View all
    </a>
  </div>

  {#each data.componentGroups as group}
    <div class="mt-5 first:mt-4">
      <h4 class="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {group.title}
      </h4>
      <div class="mt-3 grid gap-3 md:grid-cols-2">
        {#each group.items as slug}
          {@const doc = data.componentDocsBySlug[slug]}
          <a
            href={`/DervaFX/components/${doc.slug}`}
            class="rounded-lg border border-neutral-800 bg-neutral-950/70 px-4 py-4 no-underline transition-colors hover:border-neutral-700 hover:bg-neutral-900/80"
          >
            <div class="flex items-center justify-between gap-3">
              <h5 class="text-base font-semibold text-neutral-100">{doc.title}</h5>
              <span class="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                {doc.kind}
              </span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-neutral-400">{doc.summary}</p>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</section>
