<script>
  import ProjectPage from "$lib/components/project-page.svelte";

  const summaryItems = [
    {
      text: "CookieOS focuses on an approachable UI layer, bundled programs, and replacements for default shell tools.",
    },
    {
      text: "The page below breaks that into the main parts that currently matter.",
      tone: "muted",
    },
  ];

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

  const leadHtml = `
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
  `;
</script>

<ProjectPage
  title="CookieOS"
  leadHtml={leadHtml}
  {summaryItems}
  {sections}
/>
