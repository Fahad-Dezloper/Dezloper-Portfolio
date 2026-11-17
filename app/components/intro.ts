import type { CSSProperties } from "react";

/**
 * Marks a block for the first-load cascade defined in globals.css.
 *
 * `i` is the block's place in the queue, counted down the page: each step
 * holds the block back a little longer than the one above it, so the page
 * assembles in a wave instead of appearing at once. Numbering runs across
 * components, so a block's number only means anything relative to its
 * neighbours above and below. The delay stops growing past the last block
 * that could be on screen, which keeps the sections further down from
 * trailing in long after everything else.
 */
export const intro = (i: number) =>
  ({
    "data-intro": "",
    style: { "--intro-i": i } as CSSProperties,
  }) as const;
