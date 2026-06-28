import { isScpCharacterSlug } from "$lib/scp-routing";

export function match(param) {
  return isScpCharacterSlug(param);
}
