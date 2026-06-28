<script>
  import { onMount } from "svelte";

  export let jsonPath;
  export let backHref = "/scprp";

  let character = null;

  onMount(async () => {
    try {
      const res = await fetch(jsonPath);
      if (res.ok) character = await res.json();
    } catch {}
  });

  function arr(value) {
    return Array.isArray(value) ? value : [];
  }

  function identityEntries(identity) {
    if (!identity) return [];

    return Object.entries(identity)
      .filter(([, value]) => value)
      .map(([key, value]) => ({
        label: key.replace(/([A-Z])/g, " $1").toUpperCase(),
        value,
      }));
  }
</script>

<svelte:head>
  <title>{character?.name ?? "SCPRP Character"}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-14">
  <div class="rounded-2xl border border-white/10 bg-black/30 p-6 sm:p-7">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <div class="text-xs tracking-[0.35em] text-white/55">
          {character?.designation ?? "SCPRP DOSSIER"}
        </div>

        <h1
          class="mt-3 text-3xl font-semibold tracking-wide text-white sm:text-4xl"
        >
          {character?.name ?? "Unknown"}
        </h1>

        {#if character}
          <div class="mt-3 flex flex-wrap gap-2">
            {#each identityEntries(character.identity) as item}
              <span
                class="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] tracking-wide text-white/70"
              >
                {item.label}: {item.value}
              </span>
            {/each}

            {#if character.status}
              <span
                class="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] tracking-wide text-white/70"
              >
                STATUS: {character.status}
              </span>
            {/if}

            {#if character.risk}
              <span
                class="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] tracking-wide text-white/70"
              >
                RISK: {character.risk}
              </span>
            {/if}
          </div>
        {/if}
      </div>

      <a
        href={backHref}
        class="inline-flex rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/70 transition hover:border-white/20 hover:bg-black/35 hover:text-white"
      >
        Back
      </a>
    </div>
  </div>

  {#if character}
    <div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div class="space-y-4 lg:col-span-7">
        <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
          <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
            OVERVIEW
          </h2>
          <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
            {#each arr(character.overview) as line}
              <p>{line}</p>
            {/each}
          </div>
        </section>

        {#if arr(character.careerTimeline).length}
          <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
            <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
              CAREER TIMELINE
            </h2>
            <div class="mt-5 space-y-4">
              {#each arr(character.careerTimeline) as item}
                <div class="border-l border-white/10 pl-4">
                  <h3 class="text-sm font-semibold text-white/85">
                    {item.title}
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-white/68">
                    {item.body}
                  </p>
                </div>
              {/each}
            </div>
          </section>
        {/if}

        {#if arr(character.incidents).length}
          <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
            <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
              INCIDENTS OF INTEREST
            </h2>
            <div class="mt-4 space-y-3">
              {#each arr(character.incidents) as incident}
                <div class="rounded-xl border border-white/10 bg-black/25 p-4">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-sm font-semibold text-white/85">
                      {incident.title}
                    </h3>
                    {#if incident.classification}
                      <span
                        class="rounded-full border border-white/10 px-2 py-0.5 text-[10px] tracking-wide text-white/50"
                      >
                        {incident.classification}
                      </span>
                    {/if}
                  </div>
                  <p class="mt-2 text-sm leading-6 text-white/68">
                    {incident.body}
                  </p>
                </div>
              {/each}
            </div>
          </section>
        {/if}
      </div>

      <div class="space-y-4 lg:col-span-5">
        {#if arr(character.associates).length}
          <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
            <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
              KNOWN ASSOCIATES
            </h2>
            <div class="mt-4 space-y-3">
              {#each arr(character.associates) as associate}
                <div class="rounded-xl border border-white/10 bg-black/25 p-4">
                  <h3 class="text-sm font-semibold text-white/85">
                    {associate.name}
                  </h3>
                  <p class="mt-1 text-xs tracking-wide text-white/45">
                    {associate.relation}
                  </p>
                  <p class="mt-2 text-sm leading-6 text-white/68">
                    {associate.note}
                  </p>
                </div>
              {/each}
            </div>
          </section>
        {/if}

        <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
          <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
            PUBLIC EYE
          </h2>
          <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
            {#each arr(character.publicEye) as line}
              <p>{line}</p>
            {/each}
          </div>
        </section>

        <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
          <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
            PRIVATE SELF-NOTES
          </h2>
          <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
            {#each arr(character.privateNotes) as line}
              <p>{line}</p>
            {/each}
          </div>
        </section>

        <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
          <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
            CONTRADICTIONS
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-white/72">
            {#each arr(character.contradictions) as line}
              <li class="flex gap-3">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40"
                ></span>
                <span>{line}</span>
              </li>
            {/each}
          </ul>
        </section>

        {#if arr(character.quotes).length}
          <section class="rounded-2xl border border-white/10 bg-black/25 p-6">
            <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
              QUOTE FRAGMENTS
            </h2>
            <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
              {#each arr(character.quotes) as quote}
                <p
                  class="rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  “{quote}”
                </p>
              {/each}
            </div>
          </section>
        {/if}
      </div>
    </div>
  {:else}
    <div class="mt-10 text-sm text-white/60">Loading dossier…</div>
  {/if}
</div>
