@AGENTS.md


<!-- memory-consolidate: 2026-09-06 -->
## Project: Dezloper Portfolio (Next.js)

Personal portfolio + blog at `/Users/dezloper/Desktop/Dezloper-Portfolio`. Owner identity/contacts used in the contact buttons: gmail `fahadkhann0204@gmail.com`, twitter `dezloperr`, telegram `dezloper`.

## Silk HQ sheet components

The project uses [silkhq.com](https://silkhq.com) sheet primitives, wrapped locally:
- `SilkScroll` — wraps children in `Scroll.Root` > `Scroll.View pageScroll nativePageScrollReplacement="auto"` > `Scroll.Content`.
- `PageFromBottom` (in `app/components/Writtings.tsx`) — wraps `Sheet.Root` with `license="non-commercial"`. Every Silk `Sheet.Root` must carry the `license="non-commercial"` prop.
- `LongSheet` — opened when a project card in the open-source projects list is clicked.

Gotchas hit repeatedly:
- Forgetting to define/import the sheet component before use produces `ReferenceError: WritingSheet is not defined` at the `Scroll.Root` render site — the stack trace points at `SilkScroll`, not the actual missing import.
- Spreading undefined props into `Sheet.Root` throws `TypeError: Cannot convert undefined or null to object` at `Writtings.tsx`.
- The project-card sheet must be wired to the `openSourceProjects` array, **not** `contributions` — these were confused once already.

## Writings sheet behaviour (agreed spec)

- Opening a writing from the "My Writings" arrow opens `PageFromBottom` **and** pushes the article slug to the URL (must not stay on `/`).
- Layout inside the sheet: article index/table-of-contents pinned on the **left**, body centered on the page, slightly smaller font. No hero/top image.
- Esc key priority: if an image is zoomed open, Esc closes the image only; if no image is zoomed, Esc closes the article sheet.
- Clicking an article image zooms it to center via shared `layoutId` / width animation. The dark overlay must always animate **behind** the image — an overlay that crosses in front during open/close is the "blink" bug that was fixed.
- Blog images may overflow past the text column to near-full-screen width, but must stay **centered on the text column** (start from the text's position, scroll edge-to-edge) — matching the "fun experience" section, not flush-left.

## Card video hover behaviour (final spec)

The masonry image cards cycle heights from `["h-[220px] sm:h-[300px]", "h-[170px] sm:h-[240px]", "h-[140px] sm:h-[300px]", "h-[180px] sm:h-[280px]"]` via `heights[index % 4]`.

Final agreed behaviour after several iterations (auto-rotating playback was explicitly abandoned):
- Video plays **only on hover**, muted + autoplay, never on a timer.
- Hovering a new card stops any other playing video and restores that card's image.
- Crossfade between image and video in both directions.
- `cursor-pointer` only on cards that actually have a video.
- Video must not exceed the image's width — sized to the image box.

## Blog: "Dissecting Complex Interfaces"

Published at `content`/blog markdown with frontmatter `title: "Dissecting Complex Interfaces"`, `date: "Aug 31, 2026"`. Written in the style of rauno.me/craft (depth, contrasting-aesthetics) with inline interactive graphics.

Structure convention (copied from rauno.me): sections start with **Origins**, then Introduction / Current State — not a generic intro.

Assets live under `/Users/dezloper/Desktop/Dezloper-Portfolio/public/blogs/density/` (`backpack.webp`, `cashApp.png`, `wise.png`, plus fetched Aave / Jupiter Terminal / Bloomberg screenshots). Every image needs an attribution caption linking to its source page.

Interactive components built for this post:
- Tabular-nums vs non-tabular-nums demo — two number blocks both ticking every second so the column jitter is visible.
- Flashing-cells tab component: tab 1 = "worse" full-width table where every cell blinks on change; tab 2 = "budgeted" version with a **user-adjustable threshold** control so only significant changes flash.
- Hover tooltip on the phrase "optimistic UI" explaining the term (italicised) with an example.
- Density axis scatter chart — rebuilt as a **React component, not an SVG image**. Circle positions must be axis-aligned; Cash App and Aave sit deliberately off the sparse→dense line. Hovering a circle swaps the description text below the chart to that app's explanation.

Author's editorial rules for this blog:
- No em dashes (`—`) anywhere in the article text.
- Keep it short and to the point.
- Crop screenshots to the section being discussed rather than dumping full-height images; place related images side-by-side (`flex gap-1`) at full content width rather than stacked.
- Link out to source articles for depth (e.g. the Tufte article).
- Blog page kept editable in-place for live edits.

## Blog: Solana quantum-resistance article

Written after reading Paradigm's ["P.A.C.T.S: Protecting Your Bitcoin From a Quantum Sunset"](https://www.paradigm.xyz/writing/pacts-protecting-your-bitcoin-from-a-quantum-sunset) and adapting the argument to Solana.

Author's constraints: **no Bitcoin comparison** in the body (the Paradigm paper is linked instead), short and to the point, and framed as plain questions rather than academic sections, e.g. "what is a quantum computer, our assumption on how it can break it" and "is Solana quantum safe by default? how is Solana built?". Must include how the Solana Foundation / ecosystem figures publicly feel about quantum risk.


<!-- memory-consolidate: 2026-09-07 -->
## File map (component → responsibility)

The real working surface of the portfolio, inferred from the files actually edited. Names are exact.

**Home page composition** — `app/page.tsx` assembles the sections. Section components:
- `app/components/Hero.tsx` — top intro block.
- `app/components/FunExperiences.tsx` — the single most-edited file in the project (15 touches). This is the masonry image/video card grid: the `heights[index % 4]` cycling, the hover-only muted video playback, the crossfade, and the "images may overflow the text column but stay centered on it" reference layout all live here. Any change to card hover, sizing, or the fun-experience image treatment starts in this file.
- `app/components/Projects.tsx` — the open-source projects + contributions lists; owns the `openSourceProjects` array that the project card sheet must be wired to (not `contributions`).
- `app/components/Writtings.tsx` — the "My Writings" list and the `PageFromBottom` wrapper that carries `license="non-commercial"`.
- `app/components/AppStrip.tsx`, `app/components/Row.tsx`, `app/components/Aside.tsx` — smaller layout/list primitives reused across sections.

**Sheets** (Silk HQ wrappers, each in its own folder):
- `app/components/PageFromBottom/PageFromBottom.tsx` + `PageFromBottom/WritingSheet.tsx` + `PageFromBottom/WritingSheet.css` — the article sheet opened from a writing. `WritingSheet.tsx` is the component whose missing import produces the misleading `ReferenceError: WritingSheet is not defined` at the `SilkScroll` render site; its styling is in a sibling plain CSS file, not Tailwind-only.
- `app/components/LongSheet/LongSheet.tsx` + `LongSheet/ProjectSheet.tsx` — the sheet opened by clicking a project card.
- `app/components/SilkScroll.tsx` — the shared `Scroll.Root` / `Scroll.View` / `Scroll.Content` wrapper used inside both sheet families.

**Blog rendering pipeline**:
- `content/blogs/Density.mdx` — the "Dissecting Complex Interfaces" post. Blog posts are **MDX**, not plain markdown, which is what lets the interactive React demos be embedded inline in the prose.
- `app/[slug]/page.tsx` — the dynamic route that renders a post by slug. This is what satisfies the rule that opening a writing must push the article slug to the URL rather than staying on `/`.
- `app/components/mdx-components.tsx` — the MDX component map; every custom element usable inside a `.mdx` post (images, `Term`, the demos) must be registered here or it renders as an unknown tag.
- `app/components/ArticleIndex.tsx` — the left-pinned table of contents inside the article sheet.
- `app/components/ZoomableImage.tsx` — click-to-zoom article images; owns the shared `layoutId`/width animation and the overlay-behind-image ordering that fixed the "blink" bug, plus the Esc priority (zoomed image closes first, sheet second).

**In-place blog editing** — three files form one feature:
- `app/components/BlogEditor.tsx` (client editing UI)
- `app/api/edit-block/route.ts` (API route that writes an edit back)
- `lib/mdx-blocks.ts` (parses an `.mdx` file into addressable blocks so a single block can be replaced without rewriting the file)

This is the machinery behind "blog page kept editable in-place for live edits" — edits round-trip to the `content/blogs/*.mdx` source on disk, so live edits are real file writes, not just local state.

**Interactive demo components for the density post** (each a standalone React component imported into the MDX, deliberately not SVG images):
- `app/components/DensityAxis.tsx` — the sparse→dense scatter chart with hover-swapped descriptions.
- `app/components/FlashDemo.tsx` — the two-tab flashing-cells table with the adjustable change threshold.
- `app/components/TabularDemo.tsx` — the tabular-nums vs non-tabular-nums ticking comparison.
- `app/components/Term.tsx` — the inline hover-tooltip term (used for "optimistic UI").

Because these are components rather than images, editing the density article's graphics means editing `app/components/*.tsx`, not re-exporting assets.
