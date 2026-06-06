<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>Components | DervaFX Wiki</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">DervaFX Wiki</p>
  <h2 class="mt-2 text-3xl font-semibold text-neutral-100">Components</h2>
  <p class="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300">
    The public API is split into individual component pages here instead of one big
    generic reference page.
  </p>

  {#each data.componentGroups as group}
    <section class="mt-5 border-t border-neutral-900 pt-5">
      <h3 class="text-lg font-semibold text-neutral-100">{group.title}</h3>
      <div class="mt-4 grid gap-3 md:grid-cols-2">
        {#each group.items as slug}
          {@const doc = data.componentDocsBySlug[slug]}
          <a
            href={`/DervaFX/components/${doc.slug}`}
            class="rounded-lg border border-neutral-800 bg-neutral-950/70 px-4 py-4 no-underline transition-colors hover:border-neutral-700 hover:bg-neutral-900/80"
          >
            <div class="flex items-center justify-between gap-3">
              <h4 class="text-base font-semibold text-neutral-100">{doc.title}</h4>
              <span class="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                {doc.kind}
              </span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-neutral-400">{doc.summary}</p>
          </a>
        {/each}
      </div>
    </section>
  {/each}
</article>
