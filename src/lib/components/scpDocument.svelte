<script>
  import { onMount } from "svelte";

  export let jsonPath;
  export let backHref = "/";

  let documentData = null;
  let loadError = null;

  let attemptedAuth = false;
  let authorized = false;

  let clearance = "";
  let rank = "";
  let department = "";

  onMount(async () => {
    try {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error(`Failed to load document: ${res.status}`);

      documentData = await res.json();
    } catch (err) {
      loadError = err.message;
      console.error(err);
    }
  });

  function arr(value) {
    return Array.isArray(value) ? value : [];
  }

  function fieldEntries(fields) {
    if (!fields) return [];

    return Object.entries(fields).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    );
  }

  function clearanceNumber(value) {
    return Number(String(value ?? "").replace(/\D/g, "")) || 0;
  }

  function requiredDocumentClearance() {
    return clearanceNumber(
      documentData?.requiredClearance ?? documentData?.classification ?? "CL1",
    );
  }

  function authCheck() {
    attemptedAuth = true;

    authorized =
      clearanceNumber(clearance) >= requiredDocumentClearance() &&
      rank.trim().length > 0 &&
      department.trim().length > 0;
  }

  function canView(element) {
    if (!element.requiredClearance) return true;

    return (
      authorized &&
      clearanceNumber(clearance) >= clearanceNumber(element.requiredClearance)
    );
  }

  function renderedElements(elements) {
    const output = [];
    const source = arr(elements);

    for (let i = 0; i < source.length; i++) {
      const element = source[i];

      if (element.requiredClearance && !canView(element)) {
        const required = element.requiredClearance;
        let endIndex = i + 1;

        while (
          endIndex < source.length &&
          source[endIndex].requiredClearance === required &&
          !canView(source[endIndex])
        ) {
          endIndex++;
        }

        output.push({
          type: "redacted_group",
          requiredClearance: required,
          count: endIndex - i,
        });

        i = endIndex - 1;
        continue;
      }

      output.push(element);
    }

    return output;
  }

  function eventText(element) {
    const labels = {
      door_close: "Door closes.",
      door_open: "Door opens.",
      chair_movement: "Chair movement.",
      paper_shuffle: "Paper shuffling.",
      pen_stops: "Pen movement ceases.",
      notebook_closes: "Notebook closes.",
      object_placed: "Object placed on table.",
      footsteps_departing: "Footsteps departing.",
      recorder_activated: "Recorder activated.",
      recorder_deactivated: "Recorder deactivated.",
      recording_terminated: "Recording terminated.",
    };

    return (
      labels[element.event] ??
      element.content ??
      element.event ??
      "Unspecified event."
    );
  }

  function imageUrl(element) {
    return element.args?.url ?? element.url ?? "";
  }

  function imageAlt(element) {
    return element.args?.alt ?? element.alt ?? "";
  }

  function imageCaption(element) {
    return element.args?.caption ?? element.caption ?? "";
  }

  function imageScale(element) {
    const scale = Number(element.params?.scale ?? element.scale ?? 1);

    if (!Number.isFinite(scale) || scale <= 0) {
      return 100;
    }

    return Math.min(scale * 100, 100);
  }
</script>

<svelte:head>
  <title
    >{documentData?.fields?.title ??
      documentData?.title ??
      "Foundation Document"}</title
  >
</svelte:head>

<div class="mx-auto w-full max-w-5xl px-4 py-14">
  <a
    href={backHref}
    class="mb-5 inline-flex rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/65 transition hover:border-white/20 hover:text-white"
  >
    Back
  </a>

  {#if loadError}
    <div
      class="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200"
    >
      {loadError}
    </div>
  {:else if documentData && !authorized}
    <section
      class="rounded-2xl border border-white/10 bg-black/35 p-6 text-white"
    >
      <div class="text-xs tracking-[0.35em] text-white/45">
        FOUNDATION RECORDS ACCESS
      </div>

      <h1 class="mt-3 text-3xl font-semibold tracking-wide">
        AUTHORIZATION REQUIRED
      </h1>

      <div
        class="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/65"
      >
        <div>
          Document:
          <span class="text-white">
            {documentData.fields?.title ??
              documentData.title ??
              "Untitled Document"}
          </span>
        </div>

        <div class="mt-1">
          Required Clearance:
          <span class="text-white">CL{requiredDocumentClearance()}</span>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-3">
        <label class="block">
          <span class="text-xs tracking-wide text-white/45"
            >CLEARANCE LEVEL</span
          >
          <input
            bind:value={clearance}
            placeholder="CL2"
            class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none"
          />
        </label>

        <label class="block">
          <span class="text-xs tracking-wide text-white/45">RANK / ROLE</span>
          <input
            bind:value={rank}
            placeholder="Technician Expert"
            class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none"
          />
        </label>

        <label class="block">
          <span class="text-xs tracking-wide text-white/45">DEPARTMENT</span>
          <input
            bind:value={department}
            placeholder="E&TS"
            class="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none"
          />
        </label>
      </div>

      <button
        on:click={authCheck}
        class="mt-5 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
      >
        Submit Authorization
      </button>

      {#if attemptedAuth && !authorized}
        <div
          class="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
        >
          ACCESS DENIED. Clearance insufficient or credentials incomplete.
        </div>
      {/if}
    </section>
  {:else if documentData}
    <div class="space-y-8">
      {#each arr(documentData.pages) as page, pageIndex}
        <article
          class="relative overflow-hidden rounded-sm bg-neutral-100 px-8 py-10 text-black shadow-2xl sm:px-12"
        >
          <div class="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div
              class="flex h-full items-center justify-center text-8xl font-black tracking-[0.2em]"
            >
              SCP
            </div>
          </div>

          <div class="relative">
            <div class="mb-8 border-b-2 border-black pb-4">
              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              >
                <div>
                  <div
                    class="text-xs font-bold tracking-[0.25em] text-black/55"
                  >
                    FOUNDATION DOCUMENT
                  </div>

                  <h1 class="mt-2 text-3xl font-black tracking-tight">
                    {documentData.fields?.title ??
                      documentData.title ??
                      "UNTITLED DOCUMENT"}
                  </h1>

                  {#if documentData.fields?.subtitle}
                    <div class="mt-1 text-sm font-semibold text-black/60">
                      {documentData.fields.subtitle}
                    </div>
                  {/if}
                </div>

                <div
                  class="text-right text-xs font-bold uppercase tracking-wide text-black/65"
                >
                  {#if documentData.classification}
                    <div>{documentData.classification}</div>
                  {/if}

                  {#if documentData.draftId}
                    <div>{documentData.draftId}</div>
                  {/if}
                </div>
              </div>

              {#if fieldEntries(documentData.fields).length}
                <div
                  class="mt-5 grid grid-cols-1 gap-2 border border-black/20 p-3 text-xs sm:grid-cols-2"
                >
                  {#each fieldEntries(documentData.fields) as [key, value]}
                    {#if key !== "title" && key !== "subtitle"}
                      <div class="grid grid-cols-[130px_1fr] gap-2">
                        <span class="font-bold uppercase text-black/50"
                          >{key}</span
                        >
                        <span>{value}</span>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>

            <div class="space-y-4">
              {#each renderedElements(page.elements) as element}
                {#if element.type === "redacted_group"}
                  <div
                    class="border border-black bg-black p-5 text-center font-mono text-sm font-black uppercase tracking-[0.2em] text-white"
                  >
                    REDACTED - {element.requiredClearance} REQUIRED
                  </div>
                {:else if element.type === "header"}
                  <h2
                    class="border-b border-black/30 pb-2 text-2xl font-black uppercase tracking-tight"
                  >
                    {element.content}
                  </h2>
                {:else if element.type === "header2"}
                  <h3
                    class="border-b border-black/20 pb-1 text-xl font-black uppercase tracking-tight"
                  >
                    {element.content}
                  </h3>
                {:else if element.type === "header3"}
                  <h4 class="text-base font-black uppercase tracking-wide">
                    {element.content}
                  </h4>
                {:else if element.type === "subheader"}
                  <h3 class="text-lg font-black uppercase tracking-wide">
                    {element.content}
                  </h3>
                {:else if element.type === "smalltext"}
                  <p
                    class="text-xs font-semibold uppercase tracking-wide text-black/55"
                  >
                    {element.content}
                  </p>
                {:else if element.type === "paragraph"}
                  <p class="text-sm leading-7 text-black/85">
                    {element.content}
                  </p>
                {:else if element.type === "line"}
                  <div class="h-px w-full bg-black/25"></div>
                {:else if element.type === "divider"}
                  <hr class="my-6 border-black/25" />
                {:else if element.type === "image"}
                  <figure class="my-5">
                    <div class="flex justify-center">
                      <img
                        src={imageUrl(element)}
                        alt={imageAlt(element)}
                        class="rounded border border-black/20 object-contain"
                        style={`width: ${imageScale(element)}%;`}
                      />
                    </div>

                    {#if imageCaption(element)}
                      <figcaption
                        class="mt-2 text-center text-xs font-semibold text-black/55"
                      >
                        {imageCaption(element)}
                      </figcaption>
                    {/if}
                  </figure>
                {:else if element.type === "transcript" || element.type === "transcript_entry"}
                  <div
                    class="border-l-4 border-black/30 bg-black/[0.03] px-4 py-3"
                  >
                    <div
                      class="text-xs font-black uppercase tracking-wide text-black/50"
                    >
                      {element.speaker}
                    </div>
                    <p
                      class="mt-1 whitespace-pre-line text-sm leading-7 text-black/85"
                    >
                      {element.content}
                    </p>
                  </div>
                {:else if element.type === "environment" || element.type === "stage_direction"}
                  <div
                    class="rounded border border-black/10 bg-black/[0.035] px-4 py-2 text-center text-xs font-semibold italic tracking-wide text-black/55"
                  >
                    [{eventText(element)}]
                  </div>
                {:else if element.type === "recording_event"}
                  <div
                    class="rounded border border-black/20 bg-black/[0.06] px-4 py-2 text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-black/65"
                  >
                    [{eventText(element)}]
                  </div>
                {:else if element.type === "pause"}
                  <div
                    class="text-center text-xs font-semibold italic tracking-wide text-black/45"
                  >
                    [Approximately {element.duration} of silence.]
                  </div>
                {:else if element.type === "timestamp"}
                  <div class="font-mono text-xs font-bold text-black/45">
                    [{element.content}]
                  </div>
                {:else if element.type === "audio_interference" || element.type === "interference"}
                  <div
                    class="border border-black/20 bg-black/[0.06] p-4 font-mono text-xs leading-6 text-black/65"
                  >
                    <div class="mb-2 font-black uppercase tracking-wide">
                      [Audio Interference{element.severity
                        ? ` - ${element.severity}`
                        : ""}]
                    </div>

                    {#if Array.isArray(element.content)}
                      <div class="space-y-1">
                        {#each element.content as line}
                          <div>“{line}”</div>
                        {/each}
                      </div>
                    {:else}
                      <div class="whitespace-pre-line">{element.content}</div>
                    {/if}
                  </div>
                {:else if element.type === "audio_note"}
                  <div
                    class="border border-black/25 bg-yellow-100/70 p-4 text-sm leading-6"
                  >
                    <div
                      class="mb-1 text-xs font-black uppercase tracking-wide text-black/55"
                    >
                      Transcription Note
                    </div>
                    {element.content}
                  </div>
                {:else if element.type === "observer_note"}
                  <div
                    class="border-l-4 border-black/40 bg-black/[0.04] px-4 py-3 text-sm leading-7 text-black/80"
                  >
                    <div
                      class="mb-1 text-xs font-black uppercase tracking-wide text-black/50"
                    >
                      Observer Note
                    </div>
                    {element.content}
                  </div>
                {:else if element.type === "classification_banner"}
                  <div
                    class="border-2 border-black bg-black p-3 text-center font-mono text-sm font-black uppercase tracking-[0.24em] text-white"
                  >
                    {element.content}
                  </div>
                {:else if element.type === "evaluation_note"}
                  <div
                    class="border border-black/20 bg-black/[0.04] p-4 text-sm leading-6 text-black/80"
                  >
                    <div
                      class="mb-1 text-xs font-black uppercase tracking-wide text-black/50"
                    >
                      Evaluation Note
                    </div>
                    {element.content}
                  </div>
                {:else if element.type === "note"}
                  <div
                    class="border border-black/25 bg-yellow-100/70 p-4 text-sm leading-6"
                  >
                    <div
                      class="mb-1 text-xs font-black uppercase tracking-wide text-black/55"
                    >
                      Note
                    </div>
                    {element.content}
                  </div>
                {:else if element.type === "redacted"}
                  <div
                    class="border border-black bg-black p-4 text-center font-mono text-sm font-black uppercase tracking-[0.2em] text-white"
                  >
                    {element.content ?? "REDACTED"}
                  </div>
                {:else if element.type === "list"}
                  <ul
                    class="list-disc space-y-2 pl-6 text-sm leading-7 text-black/85"
                  >
                    {#each arr(element.items) as item}
                      <li>{item}</li>
                    {/each}
                  </ul>
                {:else if element.type === "quote"}
                  <blockquote
                    class="border-l-4 border-black/40 pl-4 text-sm italic leading-7 text-black/75"
                  >
                    “{element.content}”
                  </blockquote>
                {:else if element.type === "signature"}
                  <div class="mt-8 max-w-sm border-t border-black pt-2 text-sm">
                    <div class="font-black">{element.name ?? "UNKNOWN"}</div>
                    <div class="text-xs uppercase tracking-wide text-black/55">
                      {element.title}
                    </div>
                  </div>
                {:else if element.type === "audio"}
                  <audio class="w-full" controls src={element.url}></audio>
                {:else}
                  <p
                    class="whitespace-pre-line text-sm leading-7 text-black/85"
                  >
                    {element.content}
                  </p>
                {/if}
              {/each}
            </div>

            <div
              class="mt-10 border-t border-black/20 pt-3 text-center text-xs font-bold text-black/45"
            >
              PAGE {pageIndex + 1} / {arr(documentData.pages).length}
            </div>
          </div>
        </article>
      {/each}
    </div>
  {:else}
    <div class="text-sm text-white/60">Loading document…</div>
  {/if}
</div>
