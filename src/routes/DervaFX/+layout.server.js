import { getDervaFXDocs } from "$lib/server/dervafx-docs";

export async function load() {
  return await getDervaFXDocs();
}
