# Work: Backpack + Phoenix redesigns

Served from `/work/...` on the site (this folder sits in `public/`).

Start with each project's `CASE-STUDY.md`: the problem, the before/after numbers, the UX
decisions and the design system (written for people and for AI readers).

Each project has the same folders:
- `screenshots/` — the redesign, final screens
- `videos/` — the redesign in motion (mp4, H.264, fast-start for the web)
- `before/` — the current app, for before/after (optional to show)
- `social/` — post-ready images and videos (square 1080 clips with sound, 4K stills)
- `components/` (Phoenix only) — close-up crops of single components

## Backpack — Futures trade screen, mobile (independent redesign)
Phone screens, 2000x4450 (the 400x890 dp phone layout rendered at 5x, sharper than 4K).
The original on-device captures (1200x2670, October) are in `screenshots/on-device-oct-1200x2670/`.
- 01-trade-chart-positions — Trade screen: stats row, live chart, positions, Long/Short + sheet toggle within thumb reach
- 02-book-and-trades-split — Book and Trades side by side, one tap
- 03-market-picker — Perpetuals picker
- 04-order-sheet — Order sheet: leverage slider, margin and liquidation up front
- 05-auto-close-tpsl — Auto Close: drag Take Profit / Stop Loss on the chart
- 06-order-sheet-with-tpsl — TP/SL summary tiles in the sheet
- 07-history / 08-orders — lower panel
- 00-overview-grid — all eight on one image (4160x4530)
Videos: 01-redesign-walkthrough, 02-trade-screen, 03-book-and-trades-split,
04-chart-drag-resize, 05-long-short-dock, 06-tpsl-auto-close, 07-old-vs-new.

## Phoenix — perps trading web app, desktop (independent redesign)
Desktop screens, 4320x2700 (the 1440x900 layout rendered at 3x, wider than 4K). Components are cropped from these.
- 01-trade — Trade: order-book fill preview, risk-coloured leverage, price protection
- 02-trade-signed-out, 10-trade-eth — other trade states
- 03-tpsl-focus — editing TP/SL dims everything else; drag levels on the chart
- 04-portfolio, 05-rewards, 06-leaderboard
- 07-ghost-mode — watch up to three traders read-only
- 08-settings, 09-deposit — dialogs
Components: order-form, order-book-fill-preview, leverage-and-risk,
price-protection-place-order, tpsl-sheet, ghost-dock.
Design videos (cursors building the screen, Figma-style): 01-design-buildup-cursors (dark / light),
01b-...-browser-frame (dark / light), 01c-design-buildup-plus-page-tour.
Other videos: 02-trade-walkthrough, 04-tpsl,
05-ghost-mode-leaderboard, 06-portfolio, 07-rewards, 08-leaderboard.

Before (Phoenix): `before/01-trade` is today's live phoenix.trade (signed out), at 4320x2700. `02`–`06` are the
exact replica of today's layout with the same demo account as the redesign, at 4320x2700 (a fair side-by-side).
Earlier real-account captures (1425x840) are kept in `before/real-account-lowres/`; they show a real wallet address, so keep them private.
Backpack `before/` images are real phone captures at the phone's native 1200x2670; they cannot be made sharper.

Social: Backpack — redesign walkthrough with sound and "Backpack today" problems video (both
1080x1080), overview grid image. Phoenix — design build-up with cursors (dark / light), 4K stills dark/light (3840x2160), leverage clip
(1080x1080), TP/SL clip (1920x1080), "Phoenix today" problems video with sound (1080x1080).

Data in every redesign screen is mock data from the prototype.

Posting on X as several media in one post: X shows them in a row at one fixed height and crops anything
wider than about 1.2:1 at the sides, so post the square set (all 3840x3840 stills + 1080x1080 video):
`images/4k-*-01-top-left-square.png`, `4k-*-02-full-square.png`, `4k-*-03-bottom-right-square.png` and
`videos/design-buildup-cursors-square-*.mp4`. The 16:9 stills are for single-image posts.
