"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Dev-only click-to-edit layer for blog posts.
 *
 * Paragraphs whose markdown source is plain text become contentEditable and are
 * written straight back to the .mdx file. Anything containing inline markup
 * (bold, links, code, images) is left locked — see lib/mdx-blocks.ts.
 */

type Block = { index: number; text: string; italic: boolean };

const norm = (s: string) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const CSS = `
.blog-editable {
  outline: 1px dashed transparent;
  outline-offset: 7px;
  border-radius: 3px;
  transition: outline-color .15s ease, background-color .15s ease;
}
.blog-editable:hover {
  outline-color: color-mix(in srgb, var(--foreground) 22%, transparent);
}
.blog-editable:focus {
  outline: 1px solid color-mix(in srgb, var(--foreground) 45%, transparent);
  background: color-mix(in srgb, var(--foreground) 4%, transparent);
}
.blog-editable[data-dirty="1"] {
  outline-color: #3ecf7d;
  background: color-mix(in srgb, #3ecf7d 7%, transparent);
}
.blog-show-locked .blog-locked {
  outline: 1px dashed color-mix(in srgb, #f0526b 35%, transparent);
  outline-offset: 7px;
  border-radius: 3px;
}
`;

export default function BlogEditor({
  slug,
  blocks,
  total,
}: {
  slug: string;
  blocks: Block[];
  total: number;
}) {
  const [dirty, setDirty] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [showLocked, setShowLocked] = useState(false);
  const originals = useRef<Record<number, string>>({});

  const bind = useCallback(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const paragraphs = Array.from(article.querySelectorAll("p"));
    const claimed = new Set<HTMLElement>(
      paragraphs.filter((p) => p.dataset.blockIndex !== undefined)
    );

    for (const block of blocks) {
      const target = paragraphs.find(
        (p) => !claimed.has(p) && norm(p.textContent || "") === norm(block.text)
      );
      if (!target) continue;

      claimed.add(target);
      originals.current[block.index] = block.text;

      target.dataset.blockIndex = String(block.index);
      target.dataset.blockItalic = block.italic ? "1" : "";
      target.contentEditable = "plaintext-only";
      target.spellcheck = true;
      target.classList.add("blog-editable");
      target.classList.remove("blog-locked");

      target.addEventListener("input", () => {
        const value = (target.innerText || "").replace(/\s+/g, " ").trim();
        const changed = norm(value) !== norm(originals.current[block.index] ?? "");
        target.dataset.dirty = changed ? "1" : "";
        setDirty((prev) => {
          const next = { ...prev };
          if (changed) next[block.index] = value;
          else delete next[block.index];
          return next;
        });
      });

      // Enter would insert a newline inside one markdown paragraph.
      target.addEventListener("keydown", (e) => {
        if ((e as KeyboardEvent).key === "Enter") e.preventDefault();
      });
    }

    for (const p of paragraphs) {
      if (p.dataset.blockIndex === undefined) p.classList.add("blog-locked");
    }
  }, [blocks]);

  useEffect(() => {
    bind();
    const article = document.querySelector("article");
    if (!article) return;

    // Re-bind if a hot reload swaps the server-rendered content out.
    const observer = new MutationObserver(() => {
      observer.disconnect();
      bind();
      observer.observe(article, { childList: true, subtree: true });
    });
    observer.observe(article, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [bind]);

  useEffect(() => {
    document.body.classList.toggle("blog-show-locked", showLocked);
  }, [showLocked]);

  const count = Object.keys(dirty).length;

  const save = useCallback(async () => {
    const edits = Object.entries(dirty).map(([index, text]) => {
      const i = Number(index);
      const el = document.querySelector<HTMLElement>(`[data-block-index="${i}"]`);
      return {
        index: i,
        original: originals.current[i],
        text,
        italic: el?.dataset.blockItalic === "1",
      };
    });
    if (!edits.length) return;

    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/edit-block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, edits }),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok) {
        for (const e of edits) {
          originals.current[e.index] = e.text;
          const el = document.querySelector<HTMLElement>(
            `[data-block-index="${e.index}"]`
          );
          if (el) el.dataset.dirty = "";
        }
        setDirty({});
        setMessage(`Saved ${edits.length} to ${slug}.mdx`);
      } else {
        setMessage(body.error || `Save failed (${res.status})`);
      }
    } catch {
      setMessage("Save failed — is the dev server still running?");
    } finally {
      setSaving(false);
    }
  }, [dirty, slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  useEffect(() => {
    if (!count) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [count]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-[#141417] px-3 py-2 font-mono text-[11px] text-white/70 shadow-lg"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        <span className="pl-1">
          {blocks.length}/{total} editable
        </span>

        <button
          type="button"
          onClick={() => setShowLocked((v) => !v)}
          className={`rounded-full px-2 py-1 transition-colors ${
            showLocked ? "bg-white/15 text-white" : "hover:bg-white/10"
          }`}
          title="Outline the paragraphs that can't be edited here"
        >
          locked
        </button>

        {message && (
          <span className={message.startsWith("Saved") ? "text-[#3ecf7d]" : "text-[#f0526b]"}>
            {message}
          </span>
        )}

        <button
          type="button"
          onClick={() => void save()}
          disabled={!count || saving}
          className={`rounded-full px-3 py-1 font-medium transition-colors ${
            count && !saving
              ? "bg-[#3ecf7d] text-black hover:bg-[#35c26b]"
              : "cursor-default bg-white/10 text-white/40"
          }`}
        >
          {saving ? "saving…" : count ? `save ${count}  ⌘S` : "saved"}
        </button>
      </div>
    </>
  );
}
