<script>
  export let stats = null;

  const langColors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Lua: '#00007f',
    'C#': '#178600',
    Rust: '#ce422b',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00add8',
    Java: '#b07219',
    PHP: '#4f5d95',
    Ruby: '#701516',
    Swift: '#ffac45',
    Kotlin: '#a97bff',
    Shell: '#89e051',
    Svelte: '#ff3e00',
  };

  function color(lang) {
    return langColors[lang] ?? '#6b7280';
  }

  function fmt(n) {
    if (n == null) return '—';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }
</script>

{#if stats && !stats.error}
  <!-- Stat tiles -->
  <div class="grid grid-cols-2 gap-2">
    {#each [['Repos', stats.repos], ['Stars', stats.stars], ['Followers', stats.followers], ['Following', stats.following]] as [label, val]}
      <div class="rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2">
        <div class="text-[10px] uppercase tracking-[0.18em] text-neutral-500">{label}</div>
        <div class="text-lg font-semibold text-[#045dda] leading-tight mt-0.5">{fmt(val)}</div>
      </div>
    {/each}
  </div>

  <!-- Top languages -->
  {#if stats.topLanguages?.length}
    <div class="rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 space-y-2">
      <div class="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Top Languages</div>

      <div class="flex h-1.5 rounded-full overflow-hidden gap-px">
        {#each stats.topLanguages as lang}
          <div
            style="width:{lang.percentage}%;background:{color(lang.name)}"
            title="{lang.name} {lang.percentage}%"
          ></div>
        {/each}
      </div>

      <div class="flex flex-wrap gap-x-3 gap-y-1">
        {#each stats.topLanguages as lang}
          <span class="flex items-center gap-1.5 text-[11px] text-neutral-400">
            <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:{color(lang.name)}"></span>
            {lang.name}
            <span class="text-neutral-600">{lang.percentage}%</span>
          </span>
        {/each}
      </div>
    </div>
  {/if}
{:else}
  <p class="text-xs text-neutral-600">Stats unavailable</p>
{/if}
