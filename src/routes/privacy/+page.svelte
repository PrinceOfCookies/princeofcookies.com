<script lang="js">
  import { onMount } from "svelte";

  let policy = [];
  let effectiveDate = "";

  onMount(async () => {
    const res = await fetch("/assets/json/pp.json");
    const data = await res.json();

    effectiveDate = data[0]?.effectiveDate || "";
    policy = data.slice(1);
  });

  function html(node) {
    node.innerHTML = node.textContent || "";
  }
</script>

<svelte:head>
  <title>Privacy Policy - PrinceOfCookies</title>
  <meta name="description" content="Privacy Policy for princeofcookies.com" />
</svelte:head>

<main class="min-h-screen bg-[#020308] px-5 py-14 text-neutral-200 sm:px-8">
  <section class="mx-auto max-w-6xl">
    <header class="mx-auto mb-12 max-w-3xl text-center">
      <p class="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-blue-400">
        Privacy Policy
      </p>

      <h1 class="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
        Privacy Policy for princeofcookies.com
      </h1>

      {#if effectiveDate}
        <p class="mt-4 text-sm text-neutral-500">
          Effective Date:
          <span class="text-neutral-300">{effectiveDate}</span>
        </p>
      {/if}
    </header>

    <article class="grid gap-4 md:grid-cols-2">
      {#each policy as section}
        <section
          id={`section-${section.number}`}
          class="border border-neutral-800 bg-[#05070d] p-6 transition-colors hover:border-neutral-700"
        >
          <div class="mb-4 border-b border-neutral-900 pb-4">
            <p class="mb-2 font-mono text-xs tracking-widest text-blue-400/80">
              SECTION {section.number.toString().padStart(2, "0")}
            </p>

            <h2 class="text-xl font-semibold tracking-tight text-neutral-50">
              {section.name}
            </h2>
          </div>

          {#if section.description.includes("<li>")}
            <ul
              class="max-w-none list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-300 marker:text-neutral-600 [&_a]:text-blue-300 [&_a]:underline [&_a]:underline-offset-4"
              use:html
            >
              {section.description}
            </ul>
          {:else}
            <p
              class="text-sm leading-7 text-neutral-300 [&_a]:text-blue-300 [&_a]:underline [&_a]:underline-offset-4"
              use:html
            >
              {section.description}
            </p>
          {/if}

          {#if section.extra}
            {#if section.extraTag === "li"}
              <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-300 marker:text-neutral-600 [&_a]:text-blue-300 [&_a]:underline [&_a]:underline-offset-4">
                <li use:html>{section.extra}</li>
              </ul>
            {:else if section.extraTag === "mb-4"}
              <p
                class="mt-4 text-sm leading-7 text-neutral-300 [&_a]:text-blue-300 [&_a]:underline [&_a]:underline-offset-4"
                use:html
              >
                {section.extra}
              </p>
            {/if}
          {/if}
        </section>
      {/each}
    </article>
  </section>
</main>