<script>
  import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import Tooltip from "$lib/components/tooltip.svelte";
  import { goto } from "$app/navigation";

  export let language = "default";

  const languageColors = {
    cs: "text-green-700",
    js: "text-yellow-500",
    ts: "text-blue-500",
    rust: "text-orange-500",
    lua: "text-pink-500",
    default: "text-gray-400",
  };

  $: colorClass = languageColors[language] || languageColors.default;

  export let name;
  export let repoLink;
  export let desc;
  export let isPrivate;
  export let tooltipContent;
  export let moreinfo;
</script>

<tr class="bg-neutral-900">
  <td class={"p-3 font-semibold " + colorClass}>
    {#if isPrivate}
      <span class="relative group">
        <Tooltip content={tooltipContent}>
          <em class="text-sm text-neutral-400">
            <FontAwesomeIcon
              icon={faLock}
              color="#9bb6ca"
              style="font-size:1.25em;"
            />
          </em>
        </Tooltip>
      </span>
      {name}
    {:else}
      <a href={repoLink} class="font-semibold">{name}</a>
    {/if}
  </td>
  <td class="p-3">
    {@html desc}
  </td>
  <td class="p-3">
    {#if moreinfo}
      <button
        class="inline-flex items-center text-cyan-400 hover:text-cyan-200 transition-colors"
        on:click={() => goto(moreinfo)}
        aria-label="More info"
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          class="w-8 h-4 transition-transform duration-500 hover:scale-125 hover:rotate-[360deg]"
        />
      </button>
    {/if}
  </td>
</tr>
