import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The card that shows when the site is shared.
 *
 * The handle is the subject: "dezloper" is "developer" respelled, so the Z is
 * set in a solid tile, marking the one letter that turns the job into the
 * name. Everything else is the site's own vocabulary, ink on #F5F5F5 in Inter
 * Tight, so the card and the page look like the same person made them.
 *
 * Generated at build time by next/og, which means there is no image file to
 * keep in sync with the copy, and changing a word here is a code change rather
 * than a trip through a design tool.
 */

export const alt =
  "Fahad Khan, who goes by dezloper: developer, respelled.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#161616";
const BG = "#F5F5F5";
const MUTED = "#8C8C88";
const BODY = "#3A3A38";

export default async function Image() {
  // process.cwd() is the project root. These are woff, not woff2: satori,
  // which next/og renders with, reads ttf, otf and woff only.
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/InterTight-Regular.woff")),
    readFile(join(process.cwd(), "assets/fonts/InterTight-Bold.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: BG,
          color: INK,
          fontFamily: "Inter Tight",
        }}
      >
        {/* The name, and where to find it. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 3,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>FAHAD KHAN</div>
          <div style={{ display: "flex" }}>FAAHHAD.COM</div>
        </div>

        {/* The wordmark. The Z carries the whole idea, so it gets the only
            filled shape on the card. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                fontSize: 172,
                fontWeight: 700,
                letterSpacing: -6,
                lineHeight: 1,
              }}
            >
              DE
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: INK,
                color: BG,
                borderRadius: 26,
                // Tall enough to hold the whole 172px line box rather than
                // just the cap, so the glyph sits inside the tile instead of
                // breaking out of the top of it. Both this box and the plain
                // letters beside it centre on a 172px line, which is what puts
                // the Z back on the same baseline as the rest of the word.
                width: 152,
                height: 198,
                margin: "0 12px",
                fontSize: 172,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Z
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 172,
                fontWeight: 700,
                letterSpacing: -6,
                lineHeight: 1,
              }}
            >
              LOPER
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: MUTED,
            }}
          >
            developer, respelled
          </div>
        </div>

        {/* His own line, not a job title. */}
        <div style={{ display: "flex", fontSize: 30, color: BODY }}>
          Cooking up a revolution through code.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: regular, style: "normal", weight: 400 },
        { name: "Inter Tight", data: bold, style: "normal", weight: 700 },
      ],
    },
  );
}
