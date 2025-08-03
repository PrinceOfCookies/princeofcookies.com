<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import { faGithub, faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  let mailtoLink =
    'mailto:legal@princeofcookies.tech?subject=Data%20Redaction%20Request&body=Please%20redact%20my%20PII.';

  onMount(async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      if (data?.ip) {
        mailtoLink = `mailto:legal@princeofcookies.tech?subject=Data%20Redaction%20Request&body=Please%20redact%20my%20PII%20associated%20with%20IP%20address%20${encodeURIComponent(
          data.ip
        )}`;
      }
    } catch {}
  });

  function goPrivacy() {
    goto('/privacy');
  }
</script>

<footer class="bg-neutral-950 py-10 pt-5 text-center border-t border-neutral-800">
<div class="flex justify-center gap-6 text-2xl mb-4">
  <a href="https://github.com/PrinceOfCookies" target="_blank" rel="noreferrer" class="transition-transform duration-200 hover:scale-125">
    <FontAwesomeIcon icon={faGithub} style="color: white;" />
  </a>
  <a href="https://youtube.com/@princeofcookies?si=1ZGVREywISFAEnwY" target="_blank" rel="noreferrer" class="transition-transform duration-200 hover:scale-125">
    <FontAwesomeIcon icon={faYoutube} style="color: white;" />
  </a>
  <a href="https://discord.com/users/698793333178368040" target="_blank" rel="noreferrer" class="transition-transform duration-200 hover:scale-125">
    <FontAwesomeIcon icon={faDiscord} style="color: white;" />
  </a>
  <a href="mailto:prince@strw.club" target="_blank" rel="noreferrer" class="transition-transform duration-200 hover:scale-125">
    <FontAwesomeIcon icon={faEnvelope} style="color: white;" />
  </a>
</div>

  <p class="text-sm text-neutral-400">
    &copy; 2025 PrinceOfCookies. All rights reserved.
    {" | "}
    <span
      class="underline hover:text-neutral-200 transition-colors cursor-pointer"
      tabindex="0"
      role="button"
      on:click={goPrivacy}
      on:keydown={(e) => e.key === 'Enter' && goPrivacy()}
    >
      Privacy Policy
    </span>
    {" | "}
    <a href={mailtoLink} target="_blank" rel="noreferrer" class="underline text-neutral-400">
      Request redaction of my{" "}
    </a>
    <a
      href="https://gdpr.eu/article-4-definitions/"
      target="_blank"
      rel="noreferrer"
      class="underline text-natural-400 hover:text-blue-500 transition-colors font-semibold"
    >
      PII
    </a>
  </p>
</footer>
