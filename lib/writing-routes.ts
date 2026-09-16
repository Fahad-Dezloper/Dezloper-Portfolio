/**
 * Where writings live. Imported by both server code and the client sheet, so it
 * must stay free of Node-only imports.
 */

export const WRITING_BASE = "/writing";

export const writingPath = (slug: string) => `${WRITING_BASE}/${slug}`;

/** Top-level URLs posts used to be served at, mapped to their current slug. */
export const LEGACY_WRITING_SLUGS: Record<string, string> = {
  Density: "Dissecting",
};
