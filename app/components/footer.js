"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faYoutube,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Footer() {
  const router = useRouter();
  const [mailtoLink, setMailtoLink] = useState(
    "mailto:legal@princeofcookies.tech?subject=Data%20Redaction%20Request&body=Please%20redact%20my%20PII."
  );

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.ip) {
          const userIp = data.ip;
          const mailto = `mailto:legal@princeofcookies.tech?subject=Data%20Redaction%20Request&body=Please%20redact%20my%20PII%20associated%20with%20IP%20address%20${encodeURIComponent(
            userIp
          )}`;
          setMailtoLink(mailto);
        }
      })
      .catch(() => {
        // fallback stays
      });
  }, []);

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
        </span>{" "}
        {" | "}
        <a
          href={mailtoLink}
          target="_blank"
          rel="noreferrer"
          className="underline text-neutral-400"
        >
          Request redaction of my{" "}
        </a>
        <a
          href="https://gdpr.eu/article-4-definitions/"
          target="_blank"
          rel="noreferrer"
          className="underline text-natural-400 hover:text-blue-500 transition-colors font-semibold"
        >
          PII
        </a>
      </p>
    </footer>
  );
}
