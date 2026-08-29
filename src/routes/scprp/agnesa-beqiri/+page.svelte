<script>
  import CharacterDossier from "$lib/components/dossier.svelte";
  import { getScpCharacterJsonPath } from "$lib/scp-routing";
</script>

<CharacterDossier jsonPath={getScpCharacterJsonPath("agnesa-beqiri")} />