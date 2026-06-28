<script>
  import { SCP_CHARACTER_SLUGS } from "$lib/scp-routing";

  function smartTitle(word) {
    const w = (word || "").toLowerCase();
    if (!w) return "";

    if (w.startsWith("mc") && w.length > 2) {
      return "Mc" + w[2].toUpperCase() + w.slice(3);
    }

    return w[0].toUpperCase() + w.slice(1);
  }

  function toDisplayName(folder) {
    if (folder.includes("-")) {
      return folder
        .split("-")
        .filter(Boolean)
        .map(smartTitle)
        .join(" ");
    }

    return folder
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .split(" ")
      .map(smartTitle)
      .join(" ")
      .trim();
  }

  const characters = SCP_CHARACTER_SLUGS
    .map((slug) => ({
      slug,
      name: toDisplayName(slug),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
</script>

<svelte:head>
  <title>SCPRP Characters</title>
</svelte:head>

<div class="mx-auto w-full max-w-5xl px-4 py-14">
  <div class="text-center">
    <div class="text-xs tracking-[0.35em] text-white/60">SCPRP</div>

    <h1 class="mt-3 text-3xl font-semibold tracking-[0.12em] text-white sm:text-4xl">
      CHARACTERS
    </h1>

    <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/70">
      Archived personnel records.
    </p>
  </div>

  <div class="mt-10 grid grid-cols-1 gap-3">
    {#each characters as c (c.slug)}
      <a
        href={`/${c.slug}`}
        class="rounded-2xl border border-white/10 bg-black/20 p-4 text-white transition hover:border-white/20 hover:bg-black/30"
      >
        <div class="text-lg font-semibold tracking-wide">
          {c.name}
        </div>
      </a>
    {/each}
  </div>
</div>
