import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The card that shows when the site is shared.
 *
 * The mark is ∃, the existential quantifier: "there exists". It is the one
 * claim worth making, and the symbol is drawn rather than typed, so it does
 * not depend on a font shipping U+2203 and its weight is ours to set.
 *
 * Four axis-aligned rectangles on a 32 grid, every coordinate even, so the
 * same geometry halves to a clean 16px favicon without landing between
 * pixels. The same path draws the tab icon, the app icons and this card.
 *
 * Most people have not read the symbol before, so the card says what it means
 * underneath it. A mark nobody can read is decoration. Nothing else is on the
 * card: the name and the domain travel with the link already, in the title and
 * description beside it.
 */

export const alt = "The existential quantifier: there exists.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#161616";
const BG = "#F5F5F5";
const MUTED = "#8C8C88";

/**
 * Stem on the right, three arms running left. The viewBox is cropped to the
 * ink itself (8,4 → 24,28) so width and height below are the mark's true
 * optical size rather than a box with padding baked into it.
 */
const MARK = "M8 4H24V28H8V24H20V18H8V14H20V8H8Z";

export default async function Image() {
  // process.cwd() is the project root. This is woff, not woff2: satori, which
  // next/og renders with, reads ttf, otf and woff only. Only the regular is
  // loaded because only the caption is type, and it is not bold.
  const regular = await readFile(
    join(process.cwd(), "assets/fonts/InterTight-Regular.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          color: INK,
          fontFamily: "Inter Tight",
        }}
      >
        <svg width={168} height={252} viewBox="8 4 16 24">
          <path d={MARK} fill={INK} />
        </svg>

        {/* What it reads as, for everyone who has not met the symbol. */}
        <div
          style={{
            display: "flex",
            marginTop: 46,
            fontSize: 38,
            letterSpacing: 12,
            color: MUTED,
          }}
        >
          there exists
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: regular, style: "normal", weight: 400 },
      ],
    },
  );
}
