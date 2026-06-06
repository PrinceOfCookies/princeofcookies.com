import { error } from "@sveltejs/kit";
import { getDervaFXDocs } from "$lib/server/dervafx-docs";

export async function load({ params }) {
  const docs = await getDervaFXDocs();
  const doc = docs.componentDocsBySlug[params.slug];

  if (!doc) {
    throw error(404, "Component page not found");
  }

  return { doc };
}
