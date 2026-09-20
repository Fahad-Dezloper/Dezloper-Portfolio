import type { ReactNode } from "react";

/**
 * A quieter note set beside the main argument: smaller and italic, so it reads
 * as an aside rather than another beat in the section.
 *
 * Formatters split JSX blocks in MDX across lines, and MDX then turns each loose
 * line of text into its own <p>. So this renders a <div> (a <p> inside a <p> is
 * invalid and breaks hydration) and lays those paragraphs out inline, keeping
 * the note one continuous sentence however the source is formatted.
 */
export default function Aside({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="my-6 text-sm italic leading-relaxed text-[var(--foreground)]/55 [&>p]:!my-0 [&>p]:!inline [&>p+button]:ml-[0.28em] [&>p]:![color:inherit] [&>p]:![font-size:inherit] [&>p]:![line-height:inherit]"
    >
      {children}
    </div>
  );
}
