"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const images = [
  [
    "/o2wmqpm6nyngii4.webp",
    "/kzsw5vz5lztfprd.webp",
    "/84ttsjehfyimnfv.webp",
  ],
  ["/23kdhhvphycn0se.webp", "/9e4l616kz3uo3xl.webp"],
  [
    "/7c4ekig77t73imc.webp",
    "/0bowbf9ph9akz7a.webp",
    "/kojywu2de9f0uwv.webp",
  ],
];

const sectionText = [
  // Section one
  {
    title: "General UI",
    text: `While the UI isn't the best, and is following a tutorial, it atleast exists and does its job. However, at some point I do plan on revamping the UI, I do not know when I plan to do this though`,
  },
  // Section two
  {
    title: "Programs!",
    text: `Cookie\"OS\" has a couple programs, some of which are custom made by me, while some others are made by other people!`,
  },
  // Section three
  {
    title: "Base Program Replacements",
    text: (
      <>
        This also offers some base program replacements, such as <code>ls</code>
        , <code>list</code>, <code>about</code>, <code>reboot</code>,{" "}
        <code>shutdown</code>, <code>shell</code>, and <code>screenfetch</code>.
        While most of these changes are small, both <code>ls</code>, and{" "}
        <code>list</code> (Since they are the same thing) have been changed
        quiet a bit to display more information about files/directories.
      </>
    ),
  },
];

export default function CookieOS() {
  const [modalSrc, setModalSrc] = useState(null);

  return (
    <main className="bg-[#0c0c0c] min-h-screen font-sans">
      <header className="text-center text-[#f5f5f5] py-8">
        <h1 className="text-3xl font-semibold">CookieOS</h1>
        <p className="mt-2 text-[#f5f5f5]">
          A Minecraft mod project for
          <a
            href="https://github.com/cc-tweaked/CC-Tweaked"
            className="text-gray-300 hover:underline mx-1"
            target="_blank"
          >
            CC:Tweaked
          </a>
          , replacing several base functions, adding new programs, and featuring
          a basic UI.
        </p>
      </header>

      {images.map((group, idx) => (
        <section
          key={idx}
          className={`flex ${
            idx === 1 ? "md:flex-row-reverse" : "md:flex-row"
          } flex-col items-center gap-6 py-5 px-5 md:px-16 w-screen rounded-xl shadow-md ${
            idx % 2 === 1
              ? "bg-gradient-to-l from-[#363533] to-[#0e0d0d]"
              : "bg-gradient-to-br from-[#1f1e1d] to-[#0e0d0d]"
          }`}
        >
          <div className="flex h-[220px]">
            {group.length === 3 ? (
              <div className="flex h-[150px]">
                <Image
                  src={group[0]}
                  alt={`Section ${idx} Image 0`}
                  width={100}
                  height={150}
                  onClick={() => setModalSrc(group[0])}
                  className="clickable-image object-cover cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
                />
                <div className="flex flex-col h-[150px] w-[100px]">
                  <Image
                    src={group[1]}
                    alt={`Section ${idx} Image 1`}
                    loading="lazy"
                    width={100}
                    height={75}
                    onClick={() => setModalSrc(group[1])}
                    className="h-[72px] w-[100px] clickable-image object-cover cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
                  />
                  <Image
                    src={group[2]}
                    alt={`Section ${idx} Image 2`}
                    width={100}
                    loading="lazy"
                    height={75}
                    onClick={() => setModalSrc(group[2])}
                    className="h-[72px] w-[100px]  clickable-image object-cover cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-[200px]">
                {group.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Section ${idx} Image ${i}`}
                    width={100}
                    loading="lazy"
                    height={100}
                    onClick={() => setModalSrc(src)}
                    className="clickable-image object-cover cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 text-[#dcdcdc]">
            <h2 className="text-[#e0e0e0] text-2xl font-normal mb-2">
              {sectionText[idx].title}
            </h2>
            <p className="text-[#bfbfbf] leading-relaxed">
              {sectionText[idx].text}
            </p>
          </div>
        </section>
      ))}

      {modalSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalSrc(null);
          }}
        >
          <span
            className="absolute top-6 right-10 text-white text-4xl cursor-pointer"
            onClick={() => setModalSrc(null)}
          >
            &times;
          </span>
          <Image
            src={modalSrc}
            alt="Expanded"
            width={800}
            height={600}
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}
