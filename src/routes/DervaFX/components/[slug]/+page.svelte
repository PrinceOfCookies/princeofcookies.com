<script>
  let { data } = $props();
  const doc = $derived(data.doc);
</script>

<svelte:head>
  <title>{doc.title} | DervaFX Wiki</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">DervaFX Wiki</p>
  <div class="mt-2 flex flex-wrap items-end justify-between gap-3 border-b border-neutral-900 pb-4">
    <div>
      <h2 class="text-3xl font-semibold text-neutral-100">{doc.title}</h2>
      <p class="mt-2 text-sm text-neutral-400">{doc.kind}</p>
    </div>
    <a
      href="/DervaFX/components"
      class="text-sm text-cyan-400 no-underline hover:text-cyan-300"
    >
      Back to Components
    </a>
  </div>

  <section class="mt-5">
    <p class="text-sm leading-relaxed text-neutral-300">{doc.description}</p>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Current Methods</h3>
    <ul class="mt-3 list-disc gap-x-6 pl-5 text-sm leading-relaxed text-neutral-300 md:columns-2">
      {#each doc.methods as item}
        <li><code>{item}</code></li>
      {/each}
    </ul>
  </section>

  {#if doc.inheritedHelpers?.length}
    <section class="mt-5 border-t border-neutral-900 pt-5">
      <h3 class="text-lg font-semibold text-neutral-100">Inherited DervaElement Helpers</h3>
      <ul class="mt-3 list-disc gap-x-6 pl-5 text-sm leading-relaxed text-neutral-300 md:columns-2">
        {#each doc.inheritedHelpers as item}
          <li><code>{item}</code></li>
        {/each}
      </ul>
    </section>
  {/if}

  {#if doc.notes?.length}
    <section class="mt-5 border-t border-neutral-900 pt-5">
      <h3 class="text-lg font-semibold text-neutral-100">Notes</h3>
      <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
        {#each doc.notes as item}
          <li>{item}</li>
        {/each}
      </ul>
    </section>
  {/if}
</article>
