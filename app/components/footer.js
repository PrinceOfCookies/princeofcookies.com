"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faYoutube,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const router = useRouter();
return (
    <footer className="bg-neutral-950 py-10 pt-5 text-center border-t border-neutral-800">
        <div className="flex justify-center gap-6 text-2xl mb-4">
            <a
                href="https://github.com/PrinceOfCookies"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-125"
            >
                <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
                href="https://youtube.com/@princeofcookies?si=1ZGVREywISFAEnwY"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-125"
            >
                <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
                href="https://discord.com/users/698793333178368040"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-125"
            >
                <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a
                href="mailto:prince@strw.club"
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-125"
            >
                <FontAwesomeIcon icon={faEnvelope} />
            </a>
        </div>
        <p className="text-sm text-neutral-400">
            &copy; 2025 PrinceOfCookies. All rights reserved.
            {" | "}
            <span
                className="underline hover:text-neutral-200 transition-colors cursor-pointer"
                onClick={() => router.push("/privacy")}
                tabIndex={0}
                role="button"
            >
                Privacy Policy
            </span>
        </p>
    </footer>
);
}
