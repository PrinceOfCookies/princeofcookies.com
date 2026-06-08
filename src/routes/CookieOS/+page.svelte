<script>
  import clsx from "clsx";

  let modalSrc = null;

  const sections = [
    {
      title: "General UI",
      label: "Desktop shell",
      text: "While the UI isn't the best, and is following a tutorial, it atleast exists and does its job. However, at some point I do plan on revamping the UI, I do not know when I plan to do this though",
      reverse: false,
      images: [
        {
          src: "assets/cookieos/o2wmqpm6nyngii4.webp",
          width: 100,
          height: 150,
          tall: true,
        },
        {
          src: "assets/cookieos/kzsw5vz5lztfprd.webp",
          width: 100,
          height: 75,
          tall: false,
        },
        {
          src: "assets/cookieos/84ttsjehfyimnfv.webp",
          width: 100,
          height: 75,
          tall: false,
        },
      ],
    },
    {
      title: "Programs!",
      label: "Launcher",
      text: 'Cookie"OS" has a couple programs, some of which are custom made by me, while some others are made by other people!',
      reverse: true,
      images: [
        {
          src: "assets/cookieos/23kdhhvphycn0se.webp",
          width: 100,
          height: 150,
          tall: true,
        },
        {
          src: "assets/cookieos/9e4l616kz3uo3xl.webp",
          width: 100,
          height: 150,
          tall: true,
        },
      ],
    },
    {
      title: "Base Program Replacements",
      label: "CLI tools",
      html: `This also offers some base program replacements, such as <code>ls</code>, <code>list</code>, <code>about</code>, <code>reboot</code>, <code>shutdown</code>, <code>shell</code>, and <code>screenfetch</code>. While most of these changes are small, both <code>ls</code>, and <code>list</code> (Since they are the same thing) have been changed quiet a bit to display more information about files/directories.`,
      reverse: false,
      images: [
        {
          src: "assets/cookieos/7c4ekig77t73imc.webp",
          width: 100,
          height: 150,
          tall: true,
        },
        {
          src: "assets/cookieos/0bowbf9ph9akz7a.webp",
          width: 100,
          height: 75,
          tall: false,
        },
        {
          src: "assets/cookieos/kojywu2de9f0uwv.webp",
          width: 100,
          height: 75,
          tall: false,
        },
      ],
    },
  ];

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
            PROJECT PAGE
          </span>
          <h1 class="text-3xl font-semibold text-neutral-100 md:text-4xl">
            CookieOS
          </h1>
        </div>

        <p class="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
          A Minecraft mod project for
          <a
            href="https://github.com/cc-tweaked/CC-Tweaked"
            target="_blank"
            rel="noopener noreferrer"
            class="mx-1 underline decoration-neutral-600 underline-offset-4 hover:decoration-neutral-300"
          >
            CC:Tweaked
          </a>
          replacing several base functions, adding custom programs, and building a
          more usable in-game desktop environment.
        </p>
      </div>

      <div class="rounded-xl border border-neutral-900 bg-black/60 p-4 md:p-5">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs uppercase tracking-[0.18em] text-neutral-500">
            SUMMARY
          </span>
        </div>

        <div class="space-y-3 text-sm text-neutral-300">
          <p>
            CookieOS focuses on an approachable UI layer, bundled programs, and
            replacements for default shell tools.
          </p>
          <p class="text-neutral-400">
            The page below breaks that into the main parts that currently matter.
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-6 pt-10">
      {#each sections as section}
        <div
          class={clsx(
            "rounded-xl border border-neutral-900 bg-black/60 p-4 md:p-5",
            section.reverse ? "" : ""
          )}
        >
          <div class={clsx("grid gap-6 md:items-center", section.reverse ? "md:grid-cols-[minmax(0,1fr)_240px]" : "md:grid-cols-[240px_minmax(0,1fr)]")}>
            <div class={clsx("flex justify-center", section.reverse ? "md:order-2" : "md:order-1")}>
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
                      on:click={() => openModal(section.images[0].src)}
                      on:keydown={(event) => onImageKeydown(event, section.images[0].src)}
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
                          on:click={() => openModal(image.src)}
                          on:keydown={(event) => onImageKeydown(event, image.src)}
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
                        on:click={() => openModal(image.src)}
                        on:keydown={(event) => onImageKeydown(event, image.src)}
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
              <div class="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    {section.label}
                  </p>
                  <h2 class="mt-2 text-xl font-semibold text-neutral-100 md:text-2xl">
                    {section.title}
                  </h2>
                </div>
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
      on:click={onBackdropClick}
      on:keydown={onDialogKeydown}
    >
      <button
        type="button"
        class="absolute right-4 top-4 rounded-full border border-neutral-700 bg-neutral-900/90 px-4 py-2 text-2xl text-neutral-100 transition hover:bg-neutral-800 md:right-8 md:top-8"
        aria-label="Close modal"
        on:click={closeModal}
      >
        &times;
      </button>
      <img
        src={modalSrc}
        alt="Expanded CookieOS screenshot"
        width="800"
        height="600"
        class="max-h-[90vh] max-w-[92vw] rounded-xl border border-neutral-800 object-contain shadow-2xl"
        loading="eager"
        draggable="false"
      />
    </div>
  {/if}
</main>
