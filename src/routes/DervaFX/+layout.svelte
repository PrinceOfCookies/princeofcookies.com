<script>
  import { page } from "$app/stores";

  let { data, children } = $props();
</script>

<main class="min-h-screen bg-[#020308] px-4 py-4 text-neutral-100 md:px-8 md:py-6">
  <div class="mx-auto flex w-full max-w-6xl gap-4 lg:gap-6">
    <aside class="hidden w-72 shrink-0 lg:block">
      <div class="sticky top-4 rounded-xl border border-neutral-900 bg-black/60 p-4">
        <a
          href="/"
          class="text-xs uppercase tracking-[0.2em] text-neutral-500 no-underline"
        >
          PrinceOfCookies
        </a>

        <div class="mt-3 border-b border-neutral-900 pb-3">
          <h1 class="text-2xl font-semibold text-neutral-100">DervaFX Wiki</h1>
          <p class="mt-2 text-sm leading-relaxed text-neutral-400">
            Public documentation for the JavaFX wrapper library.
          </p>
        </div>

        <nav class="mt-3" aria-label="DervaFX wiki pages">
          {#each data.wikiGroups as group}
            <div class="mt-4 first:mt-0">
              <h2 class="mb-2 px-3 text-[11px] uppercase tracking-[0.18em] text-neutral-600">
                {group.title}
              </h2>
              <ul class="space-y-1">
                {#each group.items as item}
                  <li>
                    <a
                      href={item.href}
                      class={`block rounded-lg border px-3 py-2 text-sm no-underline transition-colors hover:border-neutral-800 hover:bg-neutral-900/80 hover:text-neutral-200 ${
                        $page.url.pathname === item.href
                          ? "border-neutral-700 bg-neutral-800/90 text-neutral-100"
                          : "border-transparent text-neutral-400"
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </nav>

        <div class="mt-4 border-t border-neutral-900 pt-4 text-sm">
          <a
            href="https://github.com/PrinceOfCookies/DervaFX-Public"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-lg px-3 py-2 text-neutral-400 no-underline transition-colors hover:bg-neutral-900/80 hover:text-neutral-200"
          >
            Repository
          </a>
          <a
            href="https://github.com/PrinceOfCookies/DervaFX-Public/wiki"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-lg px-3 py-2 text-neutral-400 no-underline transition-colors hover:bg-neutral-900/80 hover:text-neutral-200"
          >
            Old GitHub Wiki
          </a>
        </div>
      </div>
    </aside>

    <div class="min-w-0 flex-1">
      <div class="mb-4 rounded-xl border border-neutral-900 bg-black/60 px-4 py-3 lg:hidden">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              DervaFX Wiki
            </p>
            <p class="text-sm text-neutral-300">Public project documentation</p>
          </div>
          <a href="/DervaFX" class="text-sm text-cyan-400 no-underline">Home</a>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each data.wikiGroups.flatMap((group) => group.items) as item}
            <a
              href={item.href}
              class={`rounded-full border border-neutral-800 px-3 py-1 text-xs no-underline ${
                $page.url.pathname === item.href
                  ? "bg-neutral-800/90 text-neutral-100"
                  : "text-neutral-400"
              }`}
            >
              {item.title}
            </a>
          {/each}
        </div>
      </div>

      {@render children?.()}
    </div>
  </div>
</main>
