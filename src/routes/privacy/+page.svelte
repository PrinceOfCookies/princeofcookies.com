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

  // allow html binding
  export function html(node) {
    node.innerHTML = node.textContent || "";
  }
</script>

<main class="max-w-3xl mx-auto p-8 text-left bg-[#020308] text-neutral-200">
  <h1 class="text-3xl font-semibold mb-6 text-neutral-100 tracking-tight">
    Privacy Policy for princeofcookies.com
  </h1>

  {#if effectiveDate}
    <p class="mb-6 text-sm text-neutral-500">
      Effective Date: <span class="text-neutral-300">{effectiveDate}</span>
    </p>
  {/if}

  {#each policy as section}
    <h2 class="text-xl font-semibold mt-10 mb-3 text-neutral-100">
      {section.number}. {section.name}
    </h2>

    {#if section.description.includes("<li>")}
      <ul
        class="list-disc list-inside mb-5 text-neutral-300 space-y-1 marker:text-neutral-600"
        use:html
      >
        {section.description}
      </ul>
    {:else}
      <p class="mb-5 text-neutral-300 leading-relaxed" use:html>
        {section.description}
      </p>
    {/if}

    {#if section.extra}
      {#if section.extraTag === "li"}
        <ul class="list-disc list-inside mb-5 text-neutral-300 space-y-1 marker:text-neutral-600">
          <li use:html>{section.extra}</li>
        </ul>
      {:else if section.extraTag === "mb-4"}
        <p class="mb-5 text-neutral-300 leading-relaxed" use:html>
          {section.extra}
        </p>
      {/if}
    {/if}
  {/each}
</main>
