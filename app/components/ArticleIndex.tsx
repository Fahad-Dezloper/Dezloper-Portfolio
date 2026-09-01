"use client";

import { useEffect, useState } from "react";

/**
 * Section index for a long piece. Tracks which section is on screen and
 * scrolls to one on click.
 *
 * Deliberately quiet: this is a way back into the piece, not a navigation bar,
 * so nothing here should compete with the prose for attention.
 */

type Heading = { id: string; text: string };

export default function ArticleIndex({
  headings,
  label = "Index",
}: {
  headings: Heading[];
  label?: string;
}) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (!headings.length) return;

    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The heading nearest the top of the viewport wins, so the index
        // doesn't flicker when two sections are visible at once.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Article sections" className="flex flex-col">
      <span className="mb-7 flex items-center gap-2 text-[13px] text-[var(--foreground)]/45">
        <span aria-hidden className="text-base">
          ↩
        </span>
        {label}
      </span>

      <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id} className="p-0">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById(h.id);
                  if (!el) return;
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActive(h.id);
                }}
                aria-current={isActive ? "true" : undefined}
                className={`block text-left text-[13px] leading-snug transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--foreground)]/90"
                    : "text-[var(--foreground)]/35 hover:text-[var(--foreground)]/60"
                }`}
              >
                {h.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
