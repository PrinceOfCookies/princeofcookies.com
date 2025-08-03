<script>
  import clsx from 'clsx';

  let modalSrc = null;

  const images = [
    [
      'assets/o2wmqpm6nyngii4.webp',
      'assets/kzsw5vz5lztfprd.webp',
      'assets/84ttsjehfyimnfv.webp',
    ],
    ['assets/23kdhhvphycn0se.webp', 'assets/9e4l616kz3uo3xl.webp'],
    [
      'assets/7c4ekig77t73imc.webp',
      'assets/0bowbf9ph9akz7a.webp',
      'assets/kojywu2de9f0uwv.webp',
    ],
  ];

  const sectionText = [
    {
      title: 'General UI',
      text:
        "While the UI isn't the best, and is following a tutorial, it atleast exists and does its job. However, at some point I do plan on revamping the UI, I do not know when I plan to do this though",
    },
    {
      title: 'Programs!',
      text:
        'Cookie"OS" has a couple programs, some of which are custom made by me, while some others are made by other people!',
    },
    {
      title: 'Base Program Replacements',
      html: `This also offers some base program replacements, such as <code>ls</code>, <code>list</code>, <code>about</code>, <code>reboot</code>, <code>shutdown</code>, <code>shell</code>, and <code>screenfetch</code>. While most of these changes are small, both <code>ls</code>, and <code>list</code> (Since they are the same thing) have been changed quiet a bit to display more information about files/directories.`,
    },
  ];

  function onImageKeydown(event, src) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      modalSrc = src;
    }
  }
</script>

<main class="bg-[#0c0c0c] min-h-screen font-sans">
  <header class="text-center text-[#f5f5f5] py-8">
    <h1 class="text-3xl font-semibold">CookieOS</h1>
    <p class="mt-2 text-[#f5f5f5]">
      A Minecraft mod project for
      <a
        href="https://github.com/cc-tweaked/CC-Tweaked"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-300 hover:underline mx-1"
      >
        CC:Tweaked,
      </a>
      replacing several base functions, adding new programs, and featuring a basic UI.
    </p>
  </header>

  {#each images as group, idx}
    <section
      class={clsx(
        'flex flex-col items-center gap-6 py-5 px-5 md:px-16 w-screen rounded-xl shadow-md',
        idx === 1 ? 'md:flex-row-reverse' : 'md:flex-row',
        idx % 2 === 1
          ? 'bg-gradient-to-l from-[#363533] to-[#0e0d0d]'
          : 'bg-gradient-to-br from-[#1f1e1d] to-[#0e0d0d]'
      )}
    >
      <div class="flex h-[215px]">
        {#if group.length === 3}
          <div class="flex h-[150px]">
            <button
              type="button"
              class="clickable-image w-[100px] h-[150px] cursor-pointer transition-transform hover:scale-105 hover:shadow-xl border-0 bg-transparent"
              on:click={() => (modalSrc = group[0])}
              on:keydown={(e) => onImageKeydown(e, group[0])}
              aria-label={`View image Section ${idx} Image 0`}
            >
              <img
                src={group[0]}
                alt={`Section ${idx} Image 0`}
                width="100"
                height="150"
                loading="lazy"
                class="object-cover"
                draggable="false"
              />
            </button>

            <div class="flex flex-col h-[150px] w-[100px]">
              {#each group.slice(1, 3) as src, i}
                <button
                  type="button"
                  class="clickable-image w-[100px] h-[75px] cursor-pointer transition-transform hover:scale-105 hover:shadow-xl p-0 border-0 bg-transparent"
                  on:click={() => (modalSrc = src)}
                  on:keydown={(e) => onImageKeydown(e, src)}
                  aria-label={`View image Section ${idx} Image ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Section ${idx} Image ${i + 1}`}
                    width="100"
                    height="75"
                    loading="lazy"
                    class="object-cover"
                    draggable="false"
                  />
                </button>
              {/each}
            </div>
          </div>
        {:else}
          <div class="flex h-[150px]">
            {#each group as src, i}
              <button
                type="button"
                class="clickable-image w-[100px] h-[150px] cursor-pointer transition-transform hover:scale-105 hover:shadow-xl p-0 border-0 bg-transparent"
                on:click={() => (modalSrc = src)}
                on:keydown={(e) => onImageKeydown(e, src)}
                aria-label={`View image Section ${idx} Image ${i}`}
              >
                <img
                  src={src}
                  alt={`Section ${idx} Image ${i}`}
                  width="100"
                  height="150"
                  loading="lazy"
                  class="object-cover"
                  draggable="false"
                />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div class="flex-1 text-[#dcdcdc]">
        <h2 class="text-[#e0e0e0] text-2xl font-normal mb-2">{sectionText[idx].title}</h2>
        {#if sectionText[idx].html}
          <p class="text-[#bfbfbf] leading-relaxed">{@html sectionText[idx].html}</p>
        {:else}
          <p class="text-[#bfbfbf] leading-relaxed">{sectionText[idx].text}</p>
        {/if}
      </div>
    </section>
  {/each}

  {#if modalSrc}
    <div
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      on:click={(e) => {
        if (e.target === e.currentTarget) modalSrc = null;
      }}
    >
      <button
        type="button"
        class="absolute top-6 right-10 text-white text-4xl cursor-pointer bg-transparent border-0"
        aria-label="Close modal"
        on:click={() => (modalSrc = null)}
      >
        &times;
      </button>
      <img
        src={modalSrc}
        alt="Expanded"
        width="800"
        height="600"
        class="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
        loading="eager"
        draggable="false"
      />
    </div>
  {/if}
</main>

<style>
  .clickable-image:focus {
    outline: 2px solid #dcdcdc;
    outline-offset: 2px;
  }
</style>
