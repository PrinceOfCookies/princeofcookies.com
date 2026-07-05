<script>
  export let documentData;
  export let page;
  export let pageIndex = 0;
  export let totalPages = 1;
  export let renderedElements = [];

  function arr(value) {
    return Array.isArray(value) ? value : [];
  }

  function fieldEntries(fields) {
    if (!fields) return [];

    return Object.entries(fields).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    );
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

<article
  class="relative min-h-[780px] overflow-hidden rounded-sm border border-black/10 bg-neutral-100 px-8 py-10 text-black shadow-2xl sm:px-12"
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
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="text-xs font-bold tracking-[0.25em] text-black/55">
            FOUNDATION DOCUMENT
          </div>

          <h1 class="mt-2 text-3xl font-black tracking-tight">
            {documentData.fields?.title ?? documentData.title ?? "UNTITLED DOCUMENT"}
          </h1>

          {#if documentData.fields?.subtitle}
            <div class="mt-1 text-sm font-semibold text-black/60">
              {documentData.fields.subtitle}
            </div>
          {/if}

          {#if page?.label}
            <div class="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-black/45">
              {page.label}
            </div>
          {/if}
        </div>

        <div class="text-right text-xs font-bold uppercase tracking-wide text-black/65">
          {#if documentData.classification}
            <div>{documentData.classification}</div>
          {/if}

          {#if documentData.draftId}
            <div>{documentData.draftId}</div>
          {/if}
        </div>
      </div>

      {#if pageIndex === 0 && fieldEntries(documentData.fields).length}
        <div
          class="mt-5 grid grid-cols-1 gap-2 border border-black/20 p-3 text-xs sm:grid-cols-2"
        >
          {#each fieldEntries(documentData.fields) as [key, value]}
            {#if key !== "title" && key !== "subtitle"}
              <div class="grid grid-cols-[130px_1fr] gap-2">
                <span class="font-bold uppercase text-black/50">{key}</span>
                <span>{value}</span>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <div class="space-y-4">
      {#each renderedElements as element}
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
          <p class="whitespace-pre-line text-xs font-semibold uppercase tracking-wide text-black/55">
            {element.content}
          </p>
        {:else if element.type === "paragraph"}
          <p class="whitespace-pre-line text-sm leading-7 text-black/85">
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
          <div class="border-l-4 border-black/30 bg-black/[0.03] px-4 py-3">
            <div class="text-xs font-black uppercase tracking-wide text-black/50">
              {element.speaker}
            </div>
            <p class="mt-1 whitespace-pre-line text-sm leading-7 text-black/85">
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
          <div class="text-center text-xs font-semibold italic tracking-wide text-black/45">
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
              [Audio Interference{element.severity ? ` - ${element.severity}` : ""}]
            </div>

            {#if Array.isArray(element.content)}
              <div class="space-y-1">
                {#each element.content as line}
                  <div>"{line}"</div>
                {/each}
              </div>
            {:else}
              <div class="whitespace-pre-line">{element.content}</div>
            {/if}
          </div>
        {:else if element.type === "audio_note"}
          <div class="border border-black/25 bg-yellow-100/70 p-4 text-sm leading-6">
            <div class="mb-1 text-xs font-black uppercase tracking-wide text-black/55">
              Transcription Note
            </div>
            {element.content}
          </div>
        {:else if element.type === "observer_note"}
          <div
            class="border-l-4 border-black/40 bg-black/[0.04] px-4 py-3 text-sm leading-7 text-black/80"
          >
            <div class="mb-1 text-xs font-black uppercase tracking-wide text-black/50">
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
            <div class="mb-1 text-xs font-black uppercase tracking-wide text-black/50">
              Evaluation Note
            </div>
            {element.content}
          </div>
        {:else if element.type === "note"}
          <div class="border border-black/25 bg-yellow-100/70 p-4 text-sm leading-6">
            <div class="mb-1 text-xs font-black uppercase tracking-wide text-black/55">
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
          <ul class="list-disc space-y-2 pl-6 text-sm leading-7 text-black/85">
            {#each arr(element.items) as item}
              <li>{item}</li>
            {/each}
          </ul>
        {:else if element.type === "quote"}
          <blockquote
            class="border-l-4 border-black/40 pl-4 text-sm italic leading-7 text-black/75"
          >
            "{element.content}"
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
          <p class="whitespace-pre-line text-sm leading-7 text-black/85">
            {element.content}
          </p>
        {/if}
      {/each}
    </div>

    <div class="mt-10 border-t border-black/20 pt-3 text-center text-xs font-bold text-black/45">
      PAGE {pageIndex + 1} / {totalPages}
    </div>
  </div>
</article>
