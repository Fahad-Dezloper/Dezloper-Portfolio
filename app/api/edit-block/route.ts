import fs from "fs";
import { norm, readPost, splitParts } from "@/lib/mdx-blocks";

/**
 * Dev-only. Writes edited paragraphs back into content/blogs/<slug>.mdx.
 * Returns 404 in any other environment so it can never ship as a live endpoint.
 */

type Edit = {
  index: number;
  original: string;
  text: string;
  italic: boolean;
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  let payload: { slug?: string; edits?: Edit[] };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const { slug, edits } = payload;

  if (!slug || !/^[A-Za-z0-9_-]+$/.test(slug)) {
    return Response.json({ error: "Bad slug" }, { status: 400 });
  }
  if (!Array.isArray(edits) || edits.length === 0) {
    return Response.json({ error: "No edits" }, { status: 400 });
  }

  const post = readPost(slug);
  if (!post) return Response.json({ error: "No such post" }, { status: 404 });

  const parts = splitParts(post.body);

  for (const edit of edits) {
    const current = parts[edit.index];
    if (current === undefined) {
      return Response.json(
        { error: "The file changed on disk — reload and try again" },
        { status: 409 }
      );
    }

    // Verify we're replacing the paragraph the browser actually showed.
    const trimmed = current.trim();
    const currentText = edit.italic ? trimmed.replace(/^\*|\*$/g, "") : trimmed;
    if (norm(currentText) !== norm(edit.original)) {
      return Response.json(
        { error: "The file changed on disk — reload and try again" },
        { status: 409 }
      );
    }

    let clean = edit.text.replace(/\s+/g, " ").trim();
    // An asterisk inside an italic caption would break its own wrapper.
    if (edit.italic) clean = clean.replace(/\*/g, "");
    if (!clean) {
      return Response.json(
        { error: "A paragraph can't be emptied here — delete it in the file" },
        { status: 400 }
      );
    }

    parts[edit.index] = edit.italic ? `*${clean}*` : clean;
  }

  fs.writeFileSync(post.file, post.head + parts.join(""), "utf8");

  return Response.json({ ok: true, saved: edits.length });
}
