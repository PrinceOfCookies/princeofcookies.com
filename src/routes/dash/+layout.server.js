import { error } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (!locals?.user) throw error(401);
  return { user: locals.user };
};
