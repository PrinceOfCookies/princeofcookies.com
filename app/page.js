"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const text = "I'm PrinceOfCookies";
    const speed = 75;
    const element = document.getElementById("typewriterText");
    if (!element) return;

    element.textContent = "";
    let index = 0;
    let timeoutId;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index++);
        timeoutId = setTimeout(type, speed);
      }
    }

    type();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-neutral-100 p-4 min-h-screen bg-background text-foreground">
      <div className="typewriter absolute top-16 left-1/2 transform -translate-x-1/2 text-center inline-block">
        <h1
          id="typewriterText"
          className="text-4xl font-bold whitespace-nowrap overflow-hidden border-r-4 border-gray-300 animate-blink"
        ></h1>
      </div>

      <section className="max-w-5xl w-full py-10 pt-25">
        <h1 className="text-4xl mb-6">👋 Hello!</h1>
        <p className="text-lg leading-relaxed mb-10">
          I am an <strong>18-year-old</strong> developer who enjoys coding,
          gaming, and content creation. I love playing{" "}
          <strong>Garry&#39;s Mod</strong> and
          <strong> Minecraft</strong>, and I primarily code in{" "}
          <strong className="text-pink-500">Lua</strong> and
          <strong className="text-yellow-400"> JavaScript</strong>.
        </p>

        <h2 className="text-2xl mb-4">🎯 Favorite Projects</h2>
        <div className="overflow-x-auto mb-10">
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-neutral-800">
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-neutral-900">
                <td className="p-3">
                  <a
                    href="https://github.com/PrinceOfCookies/TS-CookieLang"
                    className="text-blue-500 font-semibold"
                  >
                    TS-CookieLang
                  </a>
                </td>
                <td className="p-3">
                  A TypeScript project exploring the creation of a
                  &#34;language.&#34; Though unfinished, it was a great learning
                  experience.
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3">
                  <a
                    href="https://github.com/PrinceOfCookies/CookieOS"
                    className="text-pink-500 font-semibold"
                  >
                    CookieOS
                  </a>
                </td>
                <td className="p-3">
                  A Minecraft mod project for{" "}
                  <a
                    href="https://github.com/cc-tweaked/CC-Tweaked"
                    className="underline font-semibold"
                  >
                    CC:Tweaked
                  </a>
                  , replacing several base functions, adding new programs, and
                  featuring a basic UI.
                </td>
                <td className="p-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={() => router.push("/CookieOS")}
                  >
                    More info
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl mb-4">🔨 Projects</h2>
        <div className="overflow-x-auto mb-10">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-neutral-800">
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-pink-500">
                  <em className="text-sm text-neutral-400">
                    {" "}
                    <FontAwesomeIcon
                      icon={faLock}
                      color="#9bb6ca"
                      style={{ fontSize: "1.25em" }}
                    />{" "}
                  </em>
                  Low Sodium Hit System{" "}
                </td>
                <td className="p-3">
                  Developing a hit system for a Garry&#39;s Mod server called{" "}
                  <strong>Low Sodium</strong>. Join us on{" "}
                  <a
                    href="https://discord.com/invite/BTjYMp3FWe"
                    className="underline"
                  >
                    {" "}
                    Discord
                  </a>
                  .
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-pink-500">
                  <em className="text-sm text-neutral-400">
                    {" "}
                    <FontAwesomeIcon
                      icon={faLock}
                      color="#9bb6ca"
                      style={{ fontSize: "1.25em" }}
                    />{" "}
                  </em>
                  Fudgy DarkRP{" "}
                </td>
                <td className="p-3">
                  This is a Garry&#39;s mod server owned by a popular youtuber{" "}
                  <a
                    href="https://www.youtube.com/UCh7gme0kfhUZXG3NDqpeL_g"
                    className="underline font-semibold"
                  >
                    Fudgy
                  </a>{" "}
                  that I&#39;m a developer on.
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-yellow-400">
                  <a
                    href="https://github.com/PrinceOfCookies/princeofcookies.tech"
                    className="font-semibold"
                  >
                    My Portfolio{" "}
                  </a>
                </td>
                <td className="p-3">
                  This is the website you&#39;re currently viewing! My
                  portfolio, showing a list of projects, what they are, along
                  with some other information
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-yellow-400">
                  <a
                    href="https://github.com/PrinceOfCookies/StrwRemastered"
                    className="font-semibold"
                  >
                    StrwRemastered
                  </a>
                </td>
                <td className="p-3">
                  This is a discord bot for the{" "}
                  <a
                    href="https://discord.gg/rfYF3PSveM"
                    className="underline font-semibold"
                  >
                    Strawhat
                  </a>{" "}
                  discord server, owned by my friend{" "}
                  <a
                    href="https://discord.com/users/890994028672319499"
                    className="underline font-semibold"
                  ></a>
                  for his{" "}
                  <a
                    href="https://www.youtube.com/@lifeline4603"
                    className="underline font-semibold"
                  >
                    YouTube channel
                  </a>
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-yellow-400">
                  <a
                    href="https://github.com/PrinceOfCookies/StrwRemastered"
                    className="font-semibold"
                  >
                    Kitty Bot
                  </a>
                </td>
                <td className="p-3">
                  This is a simple discord bot that I made for fun, it spits out
                  cat images using{" "}
                  <a
                    href="https://thecatapi.com"
                    className="underline font-semibold"
                  >
                    thecatapi
                  </a>
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-yellow-400">
                  <a
                    href="https://github.com/PrinceOfCookies/AutoCreateGLUAProj"
                    className="font-semibold"
                  >
                    AutoCreateGLUAProj
                  </a>
                </td>
                <td className="p-3">
                  This is a simple tool I made to automate the initial setup
                  step of creating a GLua project.
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-green-700">
                  <a
                    href="https://github.com/PrinceOfCookies/NoHudMod"
                    className="font-semibold"
                  >
                    NoHud
                  </a>
                </td>
                <td className="p-3">
                  <a
                    href="https://thunderstore.io/c/lethal-company/p/Cookies/NoHud/"
                    className="underline font-semibold"
                  >
                    NoHud
                  </a>{" "}
                  is a simple Lethal Company mod that removes <em>almost</em>{" "}
                  all HUD elements from your view. Toggleable by typing{" "}
                  <code>!hudehud</code> in chat.
                </td>
                <td className="p-3"></td>
              </tr>
              <tr className="bg-neutral-900">
                <td className="p-3 font-semibold text-orange-400">
                  <a
                    href="https://github.com/PrinceOfCookies/CommandRelay"
                    className="font-semibold"
                  >
                    CommandRelay
                  </a>
                </td>
                <td className="p-3">
                  CommandRelay is a tool I created for the Fudgys DarkRP
                  Garry&#39;s Mod server. It uses a file generated when a
                  specific setting is enabled during gameplay, which contains a
                  simple chat log. Combined with the <code>-hijack</code> launch
                  parameter for GMod, this allows me to implement custom chat
                  commands without relying on cheats. Because of this method,
                  the project is tailored specifically for that server but could
                  likely be adapted to work with a generic console.log file.
                </td>
                <td className="p-3"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl mb-4">🤖 Github Info</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Image
            src="https://github-readme-stats.vercel.app/api?username=PrinceOfCookies&show_icons=true&layout=compact&theme=dark&card_width=200px&hide=issues&stars&line_height=24px&ring_color=045dda&icon_color=0c5482&text_color=37656b&title_color=045ddb"
            alt="GitHub stats"
            width={400}
            height={200}
            className="rounded"
            unoptimized="true"
          />
          <Image
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=PrinceOfCookies&layout=compact&theme=dark&title_color=045ddb"
            alt="Top Languages"
            width={280}
            height={150}
            className="rounded"
            unoptimized="true"
          />
        </div>

        <h2 className="text-2xl mb-4">🎮 Content Creation</h2>
        <p className="mb-10">
          I&#39;m also a <strong>YouTuber</strong>! Check out my{" "}
          <a
            href="https://youtube.com/@princeofcookies?si=1ZGVREywISFAEnwY"
            className="underline"
          >
            YouTube channel
          </a>
          , where I share gameplay videos, often edited by me or my friend{" "}
          <a href="https://youtube.com/@lifeline4603" className="underline">
            Lifeline
          </a>
          .
        </p>

        <h2 className="text-2xl mb-4">🛠️ Open for Commissions</h2>
        <p className="mb-10">
          Need a <strong>simple Discord bot</strong>? I&#39;m available for
          hire! Reach out to me via{" "}
          <a
            href="https://discord.com/users/698793333178368040"
            className="underline"
          >
            Discord
          </a>
          .
        </p>
      </section>
    </main>
  );
}
