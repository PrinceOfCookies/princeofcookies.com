<script>
  import { onMount } from "svelte";
  import Project from "$lib/components/project.svelte";
  // test
  let typewriterText = "";
  const text = "I'm PrinceOfCookies";
  const speed = 75;

  onMount(() => {
    typewriterText = "";
    let index = 0;
    let timeoutId;

    function type() {
      if (index < text.length) {
        typewriterText += text.charAt(index++);
        timeoutId = setTimeout(type, speed);
      }
    }
    type();

    return () => clearTimeout(timeoutId);
  });

  const favoriteProjects = [
    {
      name: "TS-CookieLang",
      desc: 'A TypeScript project exploring the creation of a "language." Though unfinished, it was a great learning experience.',
      repoLink: "https://github.com/PrinceOfCookies/TS-CookieLang",
      isPrivate: false,
      language: "ts",
      icons: ["ts", "deno"],
    },
    {
      name: "CookieOS",
      desc: "A Minecraft mod project for CC:Tweaked, replacing several base functions, adding new programs, and featuring a basic UI.",
      repoLink: "https://github.com/PrinceOfCookies/CookieOS",
      isPrivate: false,
      language: "lua",
      moreinfo: "/CookieOS",
      icons: ["lua"],
    },
  ];

  const projects = [
    {
      name: "Low Sodium Hit System",
      isPrivate: true,
      tooltipContent: "Private repository",
      language: "lua",
      desc: `Developing a hit system for a Garry's Mod server called
        <strong>Low Sodium</strong>. Join us on
        <a href="https://discord.com/invite/BTjYMp3FWe" class="underline">Discord</a>.`,
      icons: ["mysql", "lua"],
    },
    {
      name: "Fudgy DarkRP",
      isPrivate: true,
      tooltipContent: "Private repository",
      language: "lua",
      desc: `This is a Garry's mod server owned by a popular youtuber
        <a href="https://www.youtube.com/UCh7gme0kfhUZXG3NDqpeL_g" class="underline font-semibold">Fudgy</a>
        that I'm a developer on.`,
      icons: ["mysql", "lua"],
    },
    {
      name: "My Portfolio",
      repoLink: "https://github.com/PrinceOfCookies/princeofcookies.tech",
      isPrivate: false,
      language: "js",
      desc: `This is the website you're currently viewing! My portfolio, showing a list of projects, what they are, along with some other information`,
      icons: ["js", "sk", "tailwind", "node"],
    },
    {
      name: "StrwRemastered",
      repoLink: "https://github.com/PrinceOfCookies/StrwRemastered",
      isPrivate: false,
      language: "js",
      desc: `This is a discord bot for the
        <a href="https://discord.gg/rfYF3PSveM" class="underline font-semibold">Strawhat</a>
        discord server, owned by my friend for his
        <a href="https://www.youtube.com/@lifeline4603" class="underline font-semibold">YouTube channel</a>`,
      icons: ["js", "mysql", "node"],
    },
    {
      name: "Kitty Bot",
      repoLink: "https://github.com/PrinceOfCookies/StrwRemastered",
      isPrivate: false,
      language: "js",
      desc: `This is a simple discord bot that I made for fun, it spits out cat images using
        <a href="https://thecatapi.com" class="underline font-semibold">thecatapi</a>`,
      icons: ["js", "node"],
    },
    {
      name: "AutoCreateGLUAProj",
      repoLink: "https://github.com/PrinceOfCookies/AutoCreateGLUAProj",
      isPrivate: false,
      language: "js",
      desc: `This is a simple tool I made to automate the initial setup step of creating a GLua project.`,
      icons: ["js", "node"],
    },
    {
      name: "NoHud",
      repoLink: "https://github.com/PrinceOfCookies/NoHudMod",
      isPrivate: false,
      language: "cs",
      desc: `<a href="https://thunderstore.io/c/lethal-company/p/Cookies/NoHud/" class="underline font-semibold">NoHud</a> is a simple Lethal Company mod that removes <em>almost</em> all HUD elements from your view. Toggleable by typing <code>!hidehud</code> in chat.`,
      icons: ["cs"]
    },
    {
      name: "CommandRelay",
      repoLink: "https://github.com/PrinceOfCookies/CommandRelay",
      isPrivate: false,
      language: "rust",
      desc: `CommandRelay is a tool I created for the Fudgys DarkRP Garry's Mod server. It uses a file generated when a specific setting is enabled during gameplay, which contains a simple chat log. Combined with the <code>-hijack</code> launch parameter for GMod, this allows me to implement custom chat commands without relying on cheats. Because of this method, the project is tailored specifically for that server but could likely be adapted to work with a generic console.log file.`,
      icons: ["rust"],
    },
  ];
</script>

<main
  class="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-neutral-100 p-4"
>
  <div
    class="typewriter absolute top-16 left-1/2 transform -translate-x-1/2 text-center inline-block"
  >
    <h1
      class="text-4xl font-bold whitespace-nowrap overflow-hidden border-r-4 border-gray-300 animate-blink"
    >
      {typewriterText}
    </h1>
  </div>

  <section class="max-w-5xl w-full py-10 pt-25">
    <h1 class="text-4xl mb-6">👋 Hello!</h1>
    <p class="text-lg leading-relaxed mb-10">
      I am an <strong>18-year-old</strong> developer who enjoys coding, gaming,
      and content creation. I love playing <strong> Garry's Mod</strong> and
      <strong> Minecraft</strong>, and I primarily code in
      <strong class="text-pink-500">Lua</strong> and
      <strong class="text-yellow-400"> JavaScript</strong>.
    </p>

    <h2 class="text-2xl mb-4">🎯 Favorite Projects</h2>
    <div class="overflow-x-auto mb-10">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-neutral-800">
            <th class="p-3 text-left w-48">Project</th>
            <th class="p-3 w-24"></th>
            <th class="p-3 text-left">Description</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {#each favoriteProjects as favproject}
            <Project
              name={favproject.name}
              repoLink={favproject.repoLink}
              desc={favproject.desc}
              language={favproject.language}
              isPrivate={favproject.isPrivate}
              moreinfo={favproject.moreinfo}
              icons={favproject.icons}
            />
          {/each}
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl mb-4">🔨 Projects</h2>
    <div class="overflow-x-auto mb-10">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-neutral-800">
            <th class="p-3 text-left">Project</th>
            <th class="p-3 w-24"></th>
            <th class="p-3 text-left">Description</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {#each projects as project}
            <Project
              name={project.name}
              repoLink={project.repoLink}
              desc={project.desc}
              language={project.language}
              isPrivate={project.isPrivate}
              tooltipContent={project.tooltipContent}
              moreinfo={project.moreinfo}
              icons={project.icons}
            />
          {/each}
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl mb-4">🤖 Github Info</h2>
    <div class="flex flex-col md:flex-row gap-4 mb-10">
      <img
        src="https://github-readme-stats.vercel.app/api?username=PrinceOfCookies&show_icons=true&layout=compact&theme=dark&card_width=200px&hide=issues&stars&line_height=24px&ring_color=045dda&icon_color=0c5482&text_color=37656b&title_color=045ddb"
        alt="GitHub stats"
        width="400"
        height="200"
        class="rounded"
      />
      <img
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=PrinceOfCookies&layout=compact&theme=dark&title_color=045ddb"
        alt="Top Languages"
        width="280"
        height="150"
        class="rounded"
      />
    </div>

    <h2 class="text-2xl mb-4">🎮 Content Creation</h2>
    <p class="mb-10">
      I'm also a <strong>YouTuber</strong>! Check out my
      <a
        href="https://youtube.com/@princeofcookies?si=1ZGVREywISFAEnwY"
        class="underline"
      >
        YouTube channel,
      </a>
      where I share gameplay videos, often edited by me or my friend
      <a href="https://youtube.com/@lifeline4603" class="underline">
        Lifeline.
      </a>
    </p>

    <h2 class="text-2xl mb-4">🛠️ Open for Commissions</h2>
    <p class="mb-10">
      Need a <strong>simple Discord bot</strong>? I'm available for hire! Reach
      out to me via
      <a href="https://discord.com/users/698793333178368040" class="underline">
        Discord.
      </a>
    </p>
  </section>
</main>
