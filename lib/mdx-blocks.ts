import fs from "fs";
import path from "path";

/**
 * Reads a post's MDX source and pulls out what the article view needs from it:
 * the body and its section headings.
 */

const contentDirectory = path.join(process.cwd(), "content/blogs");

export function readPost(slug: string) {
  const file = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const source = fs.readFileSync(file, "utf8");
  // Split off the frontmatter (and the blank line after it) so `body` is just
  // the post's content.
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n\s*/.exec(source);
  const head = match ? match[0] : "";

  return { file, head, body: source.slice(head.length) };
}

export type Heading = { id: string; text: string };

/** Stable anchor ids, shared by the heading renderer and the index. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Section headings for the article index. Headings that slugify to nothing
 * (the "## —" divider) are skipped rather than given an empty anchor.
 */
export function getHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of body.split("\n")) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[1].replace(/[*_`]/g, "").trim();
    const id = slugify(text);
    if (id) headings.push({ id, text });
  }
  return headings;
}
