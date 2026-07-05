<script>
  import CharacterDossier from "$lib/components/dossier.svelte";
  import { getScpCharacterJsonPath } from "$lib/scp-routing";

  let { data } = $props();
</script>

<CharacterDossier jsonPath={getScpCharacterJsonPath(data.slug)} />
