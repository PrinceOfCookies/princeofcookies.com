<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import {
    faGithub,
    faYoutube,
    faDiscord,
  } from "@fortawesome/free-brands-svg-icons";
  import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  let mailtoLink =
    "mailto:prince@strw.club?subject=Data%20Redaction%20Request&body=Please%20redact%20my%20PII.";

  onMount(async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      if (data?.ip) {
        mailtoLink = `mailto:prince@strw.club?subject=Data%20Redaction%20Request&body=Please%20redact%20my%20PII%20associated%20with%20IP%20address%20${encodeURIComponent(
          data.ip
        )}`;
      }
    } catch {}
  });

  function goPrivacy() {
    goto("/privacy");
  }
</script>

<footer
  class="bg-[#020308] border-t border-neutral-900 py-10 pt-6 text-center"
>
  <div class="flex justify-center gap-6 text-xl mb-6">
    <a
      href="https://github.com/PrinceOfCookies"
      target="_blank"
      rel="noreferrer"
      class="p-2 rounded-md bg-black/40 border border-neutral-900 hover:border-neutral-700 hover:bg-black/60 transition-colors"
    >
      <FontAwesomeIcon icon={faGithub} class="text-neutral-300" />
    </a>

    <a
      href="https://youtube.com/@princeofcookies?si=1ZGVREywISFAEnwY"
      target="_blank"
      rel="noreferrer"
      class="p-2 rounded-md bg-black/40 border border-neutral-900 hover:border-neutral-700 hover:bg-black/60 transition-colors"
    >
      <FontAwesomeIcon icon={faYoutube} class="text-neutral-300" />
    </a>

    <a
      href="https://discord.com/users/698793333178368040"
      target="_blank"
      rel="noreferrer"
      class="p-2 rounded-md bg-black/40 border border-neutral-900 hover:border-neutral-700 hover:bg-black/60 transition-colors"
    >
      <FontAwesomeIcon icon={faDiscord} class="text-neutral-300" />
    </a>

    <a
      href="mailto:prince@strw.club"
      target="_blank"
      rel="noreferrer"
      class="p-2 rounded-md bg-black/40 border border-neutral-900 hover:border-neutral-700 hover:bg-black/60 transition-colors"
    >
      <FontAwesomeIcon icon={faEnvelope} class="text-neutral-300" />
    </a>
  </div>

  <p class="text-sm text-neutral-500 leading-relaxed">
    © 2026 PrinceOfCookies
    <span class="mx-2 text-neutral-700">•</span>

    <span
      class="underline decoration-neutral-700 hover:decoration-orange-500 hover:text-neutral-300 transition-colors cursor-pointer"
      tabindex="0"
      role="button"
      on:click={goPrivacy}
      on:keydown={(e) => e.key === 'Enter' && goPrivacy()}
    >
      Privacy Policy
    </span>

    <span class="mx-2 text-neutral-700">•</span>

    <a
      href={mailtoLink}
      target="_blank"
      rel="noreferrer"
      class="underline decoration-neutral-700 hover:decoration-orange-500 hover:text-neutral-300 transition-colors"
    >
      Request data redaction
    </a>

    <span class="mx-2 text-neutral-700">•</span>

    <a
      href="https://gdpr.eu/article-4-definitions/"
      target="_blank"
      rel="noreferrer"
      class="underline decoration-neutral-700 hover:decoration-orange-500 hover:text-neutral-300 transition-colors"
    >
      PII
    </a>
  </p>
</footer>
