import type { ReactNode } from "react";

/**
 * A quieter note set beside the main argument — smaller and italic, so it reads
 * as an aside rather than another beat in the section.
 *
 * Keep the content on one line in MDX so it stays inline and doesn't get
 * wrapped in a paragraph of its own.
 */
export default function Aside({ children }: { children: ReactNode }) {
  return (
    <p className="my-6 text-sm italic leading-relaxed text-[var(--foreground)]/55">
      {children}
    </p>
  );
}
