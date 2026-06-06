<script>
  import { requirements } from "$lib/dervafx-wiki";
</script>

<svelte:head>
  <title>Installation and Build | DervaFX Wiki</title>
</svelte:head>

<article
  class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6"
>
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
    DervaFX Wiki
  </p>
  <h2 class="mt-2 text-3xl font-semibold text-neutral-100">
    Installation and Build
  </h2>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Requirements</h3>
    <ul
      class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300"
    >
      {#each requirements as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Build</h3>
    <pre
      class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code
        >mvn clean package</code
      ></pre>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Run the Demo Menu</h3>
    <pre
      class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code
        >mvn javafx:run</code
      ></pre>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Maven Coordinates</h3>
    <pre
      class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code
        >&lt;dependency&gt;
  &lt;groupId&gt;com.princeofcookies&lt;/groupId&gt;
  &lt;artifactId&gt;dervafx-pub&lt;/artifactId&gt;
  &lt;version&gt;0.0.5-SNAPSHOT&lt;/version&gt;
&lt;/dependency&gt;</code
      ></pre>
  </section>
</article>
