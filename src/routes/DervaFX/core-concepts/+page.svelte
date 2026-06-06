<script>
  import { commonHelpers, exampleSnippet } from "$lib/dervafx-wiki";
</script>

<svelte:head>
  <title>Core Concepts | DervaFX Wiki</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
    DervaFX Wiki
  </p>
  <h2 class="mt-2 text-3xl font-semibold text-neutral-100">Core Concepts</h2>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Wrappers, Not a New UI Engine</h3>
    <p class="mt-3 text-sm leading-relaxed text-neutral-300">
      DervaFX wraps normal JavaFX nodes. Each DervaFX element owns a JavaFX node
      internally and exposes a chainable API for common UI setup.
    </p>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100"><code>DervaElement&lt;T&gt;</code></h3>
    <p class="mt-3 text-sm leading-relaxed text-neutral-300">
      This is the base type for most of the library. Shared helpers include:
    </p>
    <ul class="mt-3 list-disc gap-x-6 pl-5 text-sm leading-relaxed text-neutral-300 md:columns-2">
      {#each commonHelpers as item}
        <li><code>{item}</code></li>
      {/each}
    </ul>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Root vs Content Node</h3>
    <p class="mt-3 text-sm leading-relaxed text-neutral-300">
      Each element has a wrapper root node returned by <code>getNode()</code> and an
      internal content node used by the implementation. That matters for layout and
      drag behavior. For example, <code>DervaWindow</code> moves its wrapper root
      rather than the internal <code>VBox</code>.
    </p>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Factory Entry Point</h3>
    <pre class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code>{exampleSnippet}</code></pre>
  </section>
</article>
