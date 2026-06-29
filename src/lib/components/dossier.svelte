<script>
  import { onMount } from "svelte";

  export let jsonPath;
  export let backHref = "/";

  let character = null;

  const knownAssociateImages = new Set(["benny-mcquail"]);

  const statusColors = {
    green: "border-green-400/25 bg-green-400/10 text-green-300",
    yellow: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
    red: "border-red-400/25 bg-red-400/10 text-red-300",
    gray: "border-white/10 bg-white/5 text-white/60",
    blue: "border-blue-400/25 bg-blue-400/10 text-blue-300",
  };

  onMount(async () => {
    try {
      const res = await fetch(jsonPath);
      if (res.ok) character = await res.json();
    } catch (err) {
      console.error("Failed to load dossier:", err);
    }
  });

  function arr(value) {
    return Array.isArray(value) ? value : [];
  }

  function identityEntries(identity) {
    if (!identity) return [];

    return Object.entries(identity)
      .filter(([key, value]) => value && key !== "photo")
      .map(([key, value]) => ({
        label: key.replace(/([A-Z])/g, " $1").toUpperCase(),
        value,
      }));
  }

  function hasClearance(clearance, level) {
    return String(clearance ?? "")
      .toUpperCase()
      .includes(level);
  }

  function imageFileName(name) {
    return String(name ?? "")
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function associateImage(name) {
    const fileName = imageFileName(name);

    if (!knownAssociateImages.has(fileName)) {
      return "/assets/images/scprp/personnel/unknown-person.webp";
    }

    return `/assets/images/scprp/personnel/${fileName}.webp`;
  }
</script>

<svelte:head>
  <title>{character?.name ?? "SCPRP Character"}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-14">
  <div
    class="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.025]"
      style="
				background-image: radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px);
				background-size: 18px 18px;
			"
    ></div>

    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]"
    >
      <div
        class="select-none text-center text-8xl font-black tracking-[0.15em] text-white"
      >
        SCP
      </div>
    </div>

    <div class="relative p-4 sm:p-6">
      <div class="rounded-2xl border border-white/10 bg-black/45 p-6 sm:p-7">
        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
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
                {#if character.status}
                  <span
                    class={`rounded-full border px-3 py-1 text-[11px] tracking-wide ${statusColors[character.statusColor] ?? statusColors.gray}`}
                  >
                    STATUS: {character.status}
                  </span>
                {/if}

                {#if hasClearance(character.identity?.clearance, "CL2")}
                  <span
                    class="rounded-full border border-green-400/25 bg-green-400/10 px-3 py-1 text-[11px] tracking-wide text-green-300"
                  >
                    CL2
                  </span>
                {/if}

                {#if hasClearance(character.identity?.clearance, "CL3")}
                  <span
                    class="rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-[11px] tracking-wide text-blue-300"
                  >
                    FORMER CL3
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
            class="inline-flex w-fit rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/70 transition hover:border-white/20 hover:bg-black/35 hover:text-white"
          >
            Back
          </a>
        </div>
      </div>

      {#if character}
        <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div class="space-y-4 lg:col-span-4">
            <section class="rounded-2xl border border-white/10 bg-black/35 p-5">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                IDENTIFICATION
              </h2>

              <div
                class="mt-4 rounded-xl border border-white/10 bg-black/35 p-4"
              >
                <div class="grid grid-cols-[96px_1fr] gap-4">
                  <img
                    src={character.identity?.photo}
                    alt={character.name}
                    class="h-28 w-24 rounded-lg border border-white/10 object-cover grayscale"
                  />

                  <div>
                    <div class="text-[10px] tracking-[0.28em] text-white/40">
                      FOUNDATION ID CARD
                    </div>

                    <div
                      class="mt-3 text-lg font-semibold leading-tight text-white"
                    >
                      {character.name}
                    </div>

                    <div class="mt-2 text-xs tracking-wide text-white/45">
                      {character.identity?.department ?? "UNKNOWN"} / SITE-65
                    </div>

                    <div class="mt-3 flex flex-wrap gap-2">
                      {#if hasClearance(character.identity?.clearance, "CL2")}
                        <span
                          class="rounded border border-green-400/20 bg-green-400/10 px-2 py-1 text-[10px] text-green-300"
                        >
                          CL2
                        </span>
                      {/if}

                      {#if hasClearance(character.identity?.clearance, "CL3")}
                        <span
                          class="rounded border border-blue-400/20 bg-blue-400/10 px-2 py-1 text-[10px] text-blue-300"
                        >
                          FORMER CL3
                        </span>
                      {/if}
                    </div>
                  </div>
                </div>

                <div
                  class="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm"
                >
                  <div>
                    <div class="text-xs tracking-wide text-white/40">
                      PERSONNEL ID
                    </div>
                    <div class="font-mono text-white/85">
                      {character.identity?.id ?? "UNKNOWN"}
                    </div>
                  </div>

                  <div>
                    <div class="text-xs tracking-wide text-white/40">
                      STATUS
                    </div>
                    <div class="text-white/85">{character.status}</div>
                  </div>

                  <div class="col-span-2">
                    <div class="text-xs tracking-wide text-white/40">
                      POSITION
                    </div>
                    <div class="text-white/85">
                      {character.identity?.rank}
                      <span class="text-white/45"
                        >({character.identity?.class})</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="rounded-2xl border border-white/10 bg-black/35 p-5">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                PERSONNEL DATA
              </h2>

              <div
                class="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/25"
              >
                {#each identityEntries(character.identity) as item}
                  <div class="grid grid-cols-3 gap-3 px-4 py-3 text-sm">
                    <div class="col-span-1 text-xs tracking-wide text-white/40">
                      {item.label}
                    </div>
                    <div class="col-span-2 text-white/75">{item.value}</div>
                  </div>
                {/each}
              </div>
            </section>

            {#if arr(character.documents).length}
              <section
                class="rounded-2xl border border-white/10 bg-black/35 p-5"
              >
                <h2
                  class="text-sm font-semibold tracking-[0.22em] text-white/80"
                >
                  RELEVANT DOCUMENTS
                </h2>

                <div class="mt-4 space-y-3">
                  {#each arr(character.documents) as document}
                    <a
                      href={document.path}
                      class="block rounded-xl border border-white/10 bg-black/25 p-4 transition hover:border-white/20 hover:bg-black/35"
                    >
                      <div class="flex items-start justify-between gap-4">
                        <div>
                          <div class="font-mono text-xs text-white/45">
                            {document.id}
                          </div>

                          <h3 class="mt-1 text-sm font-semibold text-white/85">
                            {document.title}
                          </h3>

                          <div class="mt-2 text-xs tracking-wide text-white/45">
                            {document.type}
                          </div>
                        </div>

                        <div
                          class="rounded border border-white/10 bg-black/30 px-2 py-1 text-[10px] font-semibold tracking-wide text-white/60"
                        >
                          CL{document.clearance}
                        </div>
                      </div>

                      {#if document.description}
                        <p class="mt-3 text-sm leading-6 text-white/65">
                          {document.description}
                        </p>
                      {/if}
                    </a>
                  {/each}
                </div>
              </section>
            {/if}

            <section class="rounded-2xl border border-white/10 bg-black/35 p-5">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                PUBLIC EYE
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
                {#each arr(character.publicEye) as line}
                  <p>{line}</p>
                {/each}
              </div>
            </section>

            {#if arr(character.quotes).length}
              <section
                class="rounded-2xl border border-white/10 bg-black/35 p-5"
              >
                <h2
                  class="text-sm font-semibold tracking-[0.22em] text-white/80"
                >
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

            <section class="rounded-2xl border border-white/10 bg-black/35 p-5">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                CONTRADICTIONS
              </h2>

              <ul class="mt-4 space-y-3 text-sm leading-6 text-white/72">
                {#each arr(character.contradictions) as line}
                  <li class="flex gap-3">
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40"
                    ></span>
                    <span>{line}</span>
                  </li>
                {/each}
              </ul>
            </section>
          </div>

          <div class="space-y-4 lg:col-span-5">
            <section class="rounded-2xl border border-white/10 bg-black/35 p-6">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                OVERVIEW
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
                {#each arr(character.overview) as line}
                  <p>{line}</p>
                {/each}
              </div>
            </section>

            <section class="rounded-2xl border border-white/10 bg-black/35 p-6">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                CAREER TIMELINE
              </h2>

              <div class="mt-5 space-y-4">
                {#each arr(character.careerTimeline) as item}
                  <div class="relative border-l border-white/10 pl-4">
                    <div
                      class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-white/35"
                    ></div>
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

            <section class="rounded-2xl border border-white/10 bg-black/35 p-6">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                INCIDENTS OF INTEREST
              </h2>

              <div class="mt-4 space-y-3">
                {#each arr(character.incidents) as incident}
                  <div
                    class="rounded-xl border border-white/10 bg-black/25 p-4"
                  >
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
          </div>

          <div class="space-y-4 lg:col-span-3">
            <section class="rounded-2xl border border-white/10 bg-black/35 p-5">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                KNOWN ASSOCIATES
              </h2>

              <div class="mt-4 space-y-3">
                {#each arr(character.associates) as associate}
                  <div
                    class="flex gap-3 rounded-xl border border-white/10 bg-black/25 p-4"
                  >
                    <img
                      src={associateImage(associate.name)}
                      alt={associate.name}
                      class="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover grayscale"
                    />

                    <div>
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
                  </div>
                {/each}
              </div>
            </section>

            <section class="rounded-2xl border border-white/10 bg-black/35 p-5">
              <h2 class="text-sm font-semibold tracking-[0.22em] text-white/80">
                PRIVATE SELF-NOTES
              </h2>

              <div class="mt-4 space-y-3 text-sm leading-6 text-white/72">
                {#each arr(character.privateNotes) as line}
                  <p>{line}</p>
                {/each}
              </div>
            </section>
          </div>
        </div>
      {:else}
        <div class="mt-10 text-sm text-white/60">Loading dossier…</div>
      {/if}
    </div>
  </div>
</div>
