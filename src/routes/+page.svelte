<script>
  import { onMount } from "svelte";
  import { PUBLIC_DISCORD_AUTH_URI } from "$env/static/public";
  import { invalidateAll } from "$app/navigation";

  import Project from "$lib/components/project.svelte";
  import GitHubStats from "$lib/components/github-stats.svelte";

  let { data } = $props();

  const heroTitle = "I'm PrinceOfCookies";
  let typewriterText = $state("");

  onMount(() => {
    let index = 0;
    typewriterText = "";

    const intervalId = window.setInterval(() => {
      index += 1;
      typewriterText = heroTitle.slice(0, index);

      if (index >= heroTitle.length) {
        window.clearInterval(intervalId);
      }
    }, 85);

    return () => window.clearInterval(intervalId);
  });

  async function logout() {
    const response = await fetch("/api/v1/user/logout", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (response.ok) {
      await invalidateAll();
    }
  }
</script>

<main class="min-h-screen bg-[#020308] text-neutral-100 flex flex-col">
  <!-- Top bar -->
  <header
    class="fixed top-0 left-0 right-0 z-40 border-b border-neutral-900 bg-black/50 backdrop-blur-sm"
  >
    <div class="mx-auto max-w-6xl px-4 md:px-8 h-14 flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm tracking-[0.18em] text-neutral-400">
        
        <span>MY PORTFOLIO</span>
      </div>

      <div class="hidden min-[601px]:flex items-center gap-2">
          {#if data?.user}
            <button
              type="button"
              class="px-3 py-1.5 text-xs font-medium rounded-full border border-neutral-700 bg-neutral-900/80 hover:border-bg-gray-700hover:text-bg-gray-700 transition-colors"
              onclick={logout}
            >
              Log out
            </button>
          {:else}
            <a
              href={PUBLIC_DISCORD_AUTH_URI}
              class="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold py-2 px-4 rounded mr-2"
            >
              Login with Discord
            </a>
          {/if}
      </div>
    </div>
  </header>

  <div class="flex-1 pt-16">
    <!-- Hero: "I'm PrinceOfCookies" + GitHub on the right -->
    <section class="px-4 md:px-8 py-10 md:py-14">
      <div class="mx-auto max-w-6xl grid gap-10 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)] items-start">
        <!-- Left: Hello / bio -->
        <div class="space-y-6">
          <div class="inline-flex flex-col gap-2">
            <span class="text-xs uppercase tracking-[0.2em] text-neutral-500">
              PRINCEOFCOOKIES
            </span>
            <h1
              class="relative inline-block text-3xl md:text-4xl font-semibold text-neutral-100"
            >
              <span class="invisible whitespace-nowrap" aria-hidden="true">{heroTitle}</span>
              <span class="absolute inset-0 whitespace-nowrap">
                {typewriterText}<span
                  class="inline-block h-[0.95em] w-px translate-y-[0.08em] bg-neutral-500 align-middle animate-blink"
                  aria-hidden="true"
                ></span>
              </span>
            </h1>
          </div>

          <p class="text-sm md:text-base leading-relaxed text-neutral-300 max-w-xl">
            I am an <span class="font-bold">19 year old</span> developer who codes
            because it’s what I end up doing whether I plan to or not. I run games,
            break things, fix them, and keep going. I play a lot of
            <span class="font-bold"> Garry's Mod</span>,
            <span class="font-bold"> TF2</span>, and
            <span class="font-bold"> Minecraft</span>, and most of what I make
            comes from wanting those experiences to run the way I think they should.
          </p>

          <p class="text-sm md:text-base leading-relaxed text-neutral-400 max-w-xl">
            I work in
            <span class="text-pink-400 font-medium"> Lua</span> and
            <span class="text-amber-300 font-medium"> JavaScript</span>. However I do know a little bit of <span class="text-green-700 font-medium"> C#</span>, and <span class="text-orange-500"> Rust</span> and I use them in some of my projects!
          </p>
        </div>

        <div
          class="rounded-xl border border-neutral-900 bg-black/60 p-4 md:p-5 flex flex-col gap-3"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs uppercase tracking-[0.18em] text-neutral-500">
              GITHUB
            </span>
            <span class="text-[10px] text-neutral-500">
              princeofcookies
            </span>
          </div>

          <GitHubStats stats={data.githubStats} />
        </div>
      </div>
    </section>


    <section class="px-4 md:px-8 pb-10">
      <div class="mx-auto max-w-6xl space-y-3">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-2xl font-semibold text-neutral-100">
              Favorite projects
            </h2>
            <p class="text-xs md:text-sm text-neutral-500">
              A short list of projects that I really loved doing
            </p>
          </div>
        </div>

        <div
          class="rounded-xl border border-neutral-900 bg-black/60 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-neutral-950/90 border-b border-neutral-900">
                <tr class="text-xs text-neutral-400">
                  <th class="px-4 py-3 text-left w-52 font-normal">Project</th>
                  <th class="px-2 py-3 w-24 font-normal"></th>
                  <th class="px-4 py-3 text-left font-normal">Description</th>
                  <th class="px-3 py-3 font-normal"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-900/80">
                {#each data.favoriteProjects as favproject}
                  <Project
                    name={favproject.name}
                    repoLink={favproject.repoLink}
                    desc={favproject.desc}
                    language={favproject.language}
                    isPrivate={favproject.isPrivate}
                    moreinfo={favproject.moreinfo}
                    icons={favproject.icons}
                  />
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-8 pb-10">
      <div class="mx-auto max-w-6xl space-y-3">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-2xl font-semibold text-neutral-100">
              Projects
            </h2>
            <p class="text-xs md:text-sm text-neutral-500">
              Some other projects that I liked working on
            </p>
          </div>
        </div>

        <div
          class="rounded-xl border border-neutral-900 bg-black/60 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-neutral-950/90 border-b border-neutral-900">
                <tr class="text-xs text-neutral-400">
                  <th class="px-4 py-3 text-left w-52 font-normal">Project</th>
                  <th class="px-2 py-3 w-24 font-normal"></th>
                  <th class="px-4 py-3 text-left font-normal">Description</th>
                  <th class="px-3 py-3 font-normal"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-900/80">
                {#each data.projects as project}
                  <Project
                    name={project.name}
                    repoLink={project.repoLink}
                    desc={project.desc}
                    language={project.language}
                    isPrivate={project.isPrivate}
                    tooltipContent={project.tooltipContent}
                    moreinfo={project.moreinfo}
                    icons={project.icons}
                  />
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-8 pb-14">
      <div
        class="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 border-t border-neutral-900 pt-10"
      >
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-semibold text-neutral-100">
            Content
          </h2>
          <p class="text-sm md:text-base leading-relaxed text-neutral-300">
            I also run a         <a
          href="https://youtube.com/@princeofcookies?si=1ZGVREywISFAEnwY"
          class="underline"
        >
          YouTube channel,
        </a>
        where I share gameplay videos, often edited by me or my friend
        <a href="https://youtube.com/@lifeline4603" class="underline">
          Lifeline.
        </a>
      </p>

        </div>

        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-semibold text-neutral-100">
            Commissions
          </h2>
          <p class="text-sm md:text-base leading-relaxed text-neutral-300">
            Need a <strong>simple Discord bot</strong>? Hiring developers for your <strong>Gmod server</strong>? I'm available for hire!
          </p>
          <p class="text-sm text-neutral-400">
            Contact via
            <a
              href="https://discord.com/users/698793333178368040"
              class="underline decoration-neutral-600 hover:decoration-orange-500 underline-offset-4"
            >
              Discord
            </a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</main>
