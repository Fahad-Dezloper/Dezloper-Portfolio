import type { ReactNode } from "react";

/**
 * One body paragraph that mixes inline components (like <Term>) with text.
 *
 * A paragraph in MDX that begins with a JSX tag, or that a formatter has split
 * across lines, stops being a paragraph: the component becomes its own block
 * and the words after it drop onto a new line. Wrapping the sentence in this
 * keeps it on one line of flow.
 */
export default function Sentence({ children }: { children: ReactNode }) {
  return (
    <div className="mdx-sentence mb-4 text-base leading-relaxed text-[var(--foreground)]/80 [&>p]:!my-0 [&>p]:!inline [&>p]:![color:inherit] [&>p]:![font-size:inherit] [&>p]:![line-height:inherit] [&>button+p]:ml-[0.28em]">
      {children}
    </div>
  );
}
