<script>
  import { currentGoals, missingComponents } from "$lib/dervafx-wiki";

  let { data } = $props();
</script>

<svelte:head>
  <title>Current Status | DervaFX Wiki</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
    DervaFX Wiki
  </p>
  <h2 class="mt-2 text-3xl font-semibold text-neutral-100">Current Status</h2>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">What Exists Now</h3>
    <ul class="mt-3 list-disc gap-x-6 pl-5 text-sm leading-relaxed text-neutral-300 md:columns-2">
      {#each data.currentComponents as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">What Does Not Exist Yet</h3>
    <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
      {#each missingComponents as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Current Goals</h3>
    <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
      {#each currentGoals as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>
</article>
