<script>
  import Tooltip from "$lib/components/tooltip.svelte";
  import { goto } from "$app/navigation";

  export let language = "default";

  const languageColors = {
    cs: "text-green-700",
    js: "text-yellow-500",
    ts: "text-blue-500",
    rust: "text-orange-500",
    java: "text-amber-700",
    lua: "text-pink-500",
    jssk: "bg-gradient-to-r from-orange-300 to-yellow-500 text-transparent bg-clip-text", // JS & Sveltekit
    jslua:
      "bg-gradient-to-r from-pink-300 to-yellow-500 text-transparent bg-clip-text", // JS & Lua
    default: "text-gray-400",
  };

  $: colorClass = languageColors[language] || languageColors.default;

  export let name;
  export let repoLink;
  export let desc;
  export let isPrivate;
  export let tooltipContent;
  export let moreinfo;
  export let icons;
</script>

<tr class="bg-neutral-900">
  <td class={"p-3 font-semibold " + colorClass}>
    {#if isPrivate}
      <span class="relative group">
        <Tooltip content={tooltipContent}>
          <em class="text-sm text-neutral-400">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="h-5 w-5 text-[#9bb6ca]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="5" y="11" width="14" height="10" rx="2"></rect>
              <path d="M8 11V8a4 4 0 1 1 8 0v3"></path>
            </svg>
          </em>
        </Tooltip>
      </span>
      {name}
    {:else}
      <a href={repoLink} class="font-semibold">{name}</a>
    {/if}
  </td>
  <td class="p-3">
    <div class="hidden min-[601px]:grid grid-cols-2 gap-2 items-center">
      {#if icons}
        {#each icons as icon}
          <img src={`/assets/icons/${icon}.svg`} alt={icon} class="w-6 h-6" />
        {/each}
      {/if}
      <svg class="w-6 h-6" viewBox="0 0 24 24">
        <use href="/assets/icons/static.svg#icon" />
      </svg>
    </div>
  </td>
  <td class="p-3">
    {@html desc}
  </td>
  <td class="p-3">
    {#if moreinfo}
      <button
        class="inline-flex items-center text-cyan-400 hover:text-cyan-200 transition-colors"
        onclick={() => goto(moreinfo)}
        aria-label="More info"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="h-4 w-8 transition-transform duration-500 hover:scale-125 hover:rotate-[360deg]"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="m13 6 6 6-6 6"></path>
        </svg>
      </button>
    {/if}
  </td>
</tr>
