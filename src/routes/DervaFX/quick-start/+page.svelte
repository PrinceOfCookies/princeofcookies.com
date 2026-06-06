<script>
  import { minimalApp } from "$lib/dervafx-wiki";
</script>

<svelte:head>
  <title>Quick Start | DervaFX Wiki</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
    DervaFX Wiki
  </p>
  <h2 class="mt-2 text-3xl font-semibold text-neutral-100">Quick Start</h2>
  <p class="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-300">
    A normal setup is: create a JavaFX host pane, create a <code>DervaRoot</code>,
    add windows or layouts, apply the DervaFX theme, and show the stage normally.
  </p>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Minimal App</h3>
    <pre class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code>{minimalApp}</code></pre>
  </section>
</article>
