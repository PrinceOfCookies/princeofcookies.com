<script>
  import { page } from "$app/stores";
  import ScpDocument from "$lib/components/scpDocument.svelte";

  $: slug = $page.params.slug;
  $: jsonPath = `/assets/json/scprp/documents/${slug}.json`;
</script>

<ScpDocument {jsonPath} backHref="/" />
