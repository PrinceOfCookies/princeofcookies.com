<script>
  import clsx from "clsx";

  let {
    eyebrow = "PROJECT PAGE",
    title,
    lead = null,
    leadHtml = null,
    summaryTitle = "SUMMARY",
    summaryItems = [],
    sections = [],
  } = $props();

  let modalSrc = $state(null);

  function openModal(src) {
    modalSrc = src;
  }

  function closeModal() {
    modalSrc = null;
  }

  function onImageKeydown(event, src) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(src);
    }
  }

  function onDialogKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function imageButtonClasses(image) {
    return clsx(
      "w-[100px] overflow-hidden border-0 bg-transparent p-0 transition-transform hover:scale-[1.03] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300",
      image.tall ? "h-[150px]" : "h-[75px]"
    );
  }
</script>

<main class="min-h-screen bg-[#020308] text-neutral-100">
  <div class="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
    <section class="grid items-start gap-10 border-b border-neutral-900 pb-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div class="space-y-6">
        <div class="inline-flex flex-col gap-2">
          <span class="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {eyebrow}
          </span>
          <h1 class="text-3xl font-semibold text-neutral-100 md:text-4xl">{title}</h1>
        </div>

        {#if leadHtml}
          <p class="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
            {@html leadHtml}
          </p>
        {:else if lead}
          <p class="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
            {lead}
          </p>
        {/if}
      </div>

      <div class="rounded-xl border border-neutral-900 bg-black/60 p-4 md:p-5">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs uppercase tracking-[0.18em] text-neutral-500">
            {summaryTitle}
          </span>
        </div>

        <div class="space-y-3 text-sm">
          {#each summaryItems as item}
            <p class={item.tone === "muted" ? "text-neutral-400" : "text-neutral-300"}>
              {#if item.html}
                {@html item.html}
              {:else}
                {item.text}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    </section>

    <section class="space-y-6 pt-10">
      {#each sections as section}
        <div class="rounded-xl border border-neutral-900 bg-black/60 p-4 md:p-5">
          <div
            class={clsx(
              "grid gap-6 md:items-center",
              section.reverse
                ? "md:grid-cols-[minmax(0,1fr)_240px]"
                : "md:grid-cols-[240px_minmax(0,1fr)]"
            )}
          >
            <div
              class={clsx(
                "flex justify-center",
                section.reverse ? "md:order-2" : "md:order-1"
              )}
            >
              <div
                class={clsx(
                  "rounded-lg border border-neutral-800 bg-neutral-950/90 p-2",
                  section.images.length === 3 ? "h-[231px]" : "h-[156px]"
                )}
              >
                {#if section.images.length === 3}
                  <div class="flex h-[215px]">
                    <button
                      type="button"
                      class={imageButtonClasses(section.images[0])}
                      onclick={() => openModal(section.images[0].src)}
                      onkeydown={(event) => onImageKeydown(event, section.images[0].src)}
                      aria-label={`View image for ${section.title}, image 1`}
                    >
                      <img
                        src={section.images[0].src}
                        alt={`${section.title} screenshot 1`}
                        width={section.images[0].width}
                        height={section.images[0].height}
                        loading="lazy"
                        class="h-full w-full rounded-l-md object-cover"
                        draggable="false"
                      />
                    </button>

                    <div class="flex w-[100px] flex-col">
                      {#each section.images.slice(1) as image, imageIdx}
                        <button
                          type="button"
                          class={imageButtonClasses(image)}
                          onclick={() => openModal(image.src)}
                          onkeydown={(event) => onImageKeydown(event, image.src)}
                          aria-label={`View image for ${section.title}, image ${imageIdx + 2}`}
                        >
                          <img
                            src={image.src}
                            alt={`${section.title} screenshot ${imageIdx + 2}`}
                            width={image.width}
                            height={image.height}
                            loading="lazy"
                            class={clsx(
                              "h-full w-full object-cover",
                              imageIdx === 0 ? "rounded-tr-md" : "rounded-br-md"
                            )}
                            draggable="false"
                          />
                        </button>
                      {/each}
                    </div>
                  </div>
                {:else}
                  <div class="flex h-[140px] gap-2">
                    {#each section.images as image, imageIdx}
                      <button
                        type="button"
                        class={imageButtonClasses(image)}
                        onclick={() => openModal(image.src)}
                        onkeydown={(event) => onImageKeydown(event, image.src)}
                        aria-label={`View image for ${section.title}, image ${imageIdx + 1}`}
                      >
                        <img
                          src={image.src}
                          alt={`${section.title} screenshot ${imageIdx + 1}`}
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                          class="h-full w-full rounded-md object-cover"
                          draggable="false"
                        />
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>

            <div class={clsx("min-w-0", section.reverse ? "md:order-1" : "md:order-2")}>
              <div class="mb-3">
                <p class="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  {section.label}
                </p>
                <h2 class="mt-2 text-xl font-semibold text-neutral-100 md:text-2xl">
                  {section.title}
                </h2>
              </div>

              {#if section.html}
                <p class="max-w-3xl text-sm leading-relaxed text-neutral-300 md:text-base">
                  {@html section.html}
                </p>
              {:else}
                <p class="max-w-3xl text-sm leading-relaxed text-neutral-300 md:text-base">
                  {section.text}
                </p>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </section>
  </div>

  {#if modalSrc}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      onclick={onBackdropClick}
      onkeydown={onDialogKeydown}
    >
      <button
        type="button"
        class="absolute right-4 top-4 rounded-full border border-neutral-700 bg-neutral-900/90 px-4 py-2 text-2xl text-neutral-100 transition hover:bg-neutral-800 md:right-8 md:top-8"
        aria-label="Close modal"
        onclick={closeModal}
      >
        &times;
      </button>
      <img
        src={modalSrc}
        alt="Expanded project screenshot"
        width="800"
        height="600"
        class="max-h-[90vh] max-w-[92vw] rounded-xl border border-neutral-800 object-contain shadow-2xl"
        loading="eager"
        draggable="false"
      />
    </div>
  {/if}
</main>
