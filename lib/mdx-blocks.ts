import fs from "fs";
import path from "path";

/**
 * Dev-only support for click-to-edit on rendered blog posts.
 *
 * A block is only editable when its markdown source and its rendered text are
 * the same string — i.e. the paragraph contains no inline markup. Anything with
 * bold, links, inline code, images or headings stays locked, because editing the
 * rendered HTML would silently drop the formatting on the way back to MDX.
 */

export type EditableBlock = {
  /** Index into the array returned by splitParts() — not a paragraph number. */
  index: number;
  text: string;
  italic: boolean;
};

const INLINE_MARKUP = /[*_`[\]<>#|!]/;

const contentDirectory = path.join(process.cwd(), "content/blogs");

/** Normalise for comparison only — never for what gets written to disk. */
export function norm(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Split on blank lines, keeping the separators, so parts.join("") reproduces
 * the source byte for byte. Even indices are blocks, odd indices are gaps.
 */
export function splitParts(body: string): string[] {
  return body.split(/(\n{2,})/);
}

export function readPost(slug: string) {
  const file = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const source = fs.readFileSync(file, "utf8");
  // Keep frontmatter (and the blank line after it) verbatim in `head` so block
  // indices are relative to the body alone.
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n\s*/.exec(source);
  const head = match ? match[0] : "";

  return { file, head, body: source.slice(head.length) };
}

export function getEditableBlocks(body: string): EditableBlock[] {
  const parts = splitParts(body);
  const blocks: EditableBlock[] = [];

  for (let i = 0; i < parts.length; i += 2) {
    const text = parts[i].trim();
    // Multi-line blocks are lists, code fences or tables — leave them alone.
    if (!text || text.includes("\n")) continue;

    const italic = /^\*([^*]+)\*$/.exec(text);
    if (italic && !INLINE_MARKUP.test(italic[1])) {
      blocks.push({ index: i, text: italic[1], italic: true });
    } else if (!INLINE_MARKUP.test(text)) {
      blocks.push({ index: i, text, italic: false });
    }
  }

  return blocks;
}

export function countBlocks(body: string): number {
  const parts = splitParts(body);
  let n = 0;
  for (let i = 0; i < parts.length; i += 2) if (parts[i].trim()) n++;
  return n;
}
