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

<main class="max-w-3xl mx-auto p-8 text-left">
  <h1 class="text-3xl font-bold mb-6">
    Privacy Policy for princeofcookies.tech
  </h1>
  {#if effectiveDate}
    <p class="mb-4">Effective Date: {effectiveDate}</p>
  {/if}

  {#each policy as section}
    <h2 class="text-xl font-semibold mt-8 mb-2">
      {section.number}. {section.name}
    </h2>

    {#if section.description.includes("<li>")}
      <ul class="list-disc list-inside mb-4" use:html>{section.description}</ul>
    {:else}
      <p class="mb-4" use:html>{section.description}</p>
    {/if}

    {#if section.extra}
      {#if section.extraTag === "li"}
        <ul class="list-disc list-inside mb-4">
          <li use:html>{section.extra}</li>
        </ul>
      {:else if section.extraTag === "mb-4"}
        <p class="mb-4" use:html>{section.extra}</p>
      {/if}
    {/if}
  {/each}
</main>
