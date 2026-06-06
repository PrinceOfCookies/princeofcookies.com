<script>
  import { customThemeSnippet, themeSnippet } from "$lib/dervafx-wiki";
</script>

<svelte:head>
  <title>Theming | DervaFX Wiki</title>
</svelte:head>

<article class="rounded-xl border border-neutral-900 bg-black/60 px-5 py-5 md:px-6">
  <p class="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
    DervaFX Wiki
  </p>
  <h2 class="mt-2 text-3xl font-semibold text-neutral-100">Theming</h2>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <p class="text-sm leading-relaxed text-neutral-300">
      DervaFX currently ships with a single built-in stylesheet:
      <code>/com/princeofcookies/dervafx/dervafx-dark.css</code>
    </p>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Apply the Current Theme</h3>
    <pre class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code>{themeSnippet}</code></pre>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Select the Built-In Theme</h3>
    <pre class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code>DervaFX.setTheme(DervaTheme.dark());</code></pre>
  </section>

  <section class="mt-5 border-t border-neutral-900 pt-5">
    <h3 class="text-lg font-semibold text-neutral-100">Use a Custom Theme Resource</h3>
    <pre class="mt-3 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200"><code>{customThemeSnippet}</code></pre>
    <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
      <li>Themes are scene-level stylesheet attachments.</li>
      <li>
        <code>DervaThemeManager</code> tracks scenes and reapplies the current
        stylesheet when the theme changes.
      </li>
      <li>
        If a stylesheet resource cannot be found, DervaFX throws an
        <code>IllegalStateException</code>.
      </li>
    </ul>
  </section>
</article>
