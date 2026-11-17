---
project: Phoenix redesign
product: Phoenix (phoenix.trade), on-chain perpetual futures exchange on Solana, by Ellipsis Labs
platform: Desktop web (responsive from 768 px; phones show an "under construction" screen)
role: Independent redesign: research, UX, UI, design system, motion, working prototype
status: Working prototype on mock data. Not affiliated with or shipped by Phoenix.
date: November 2026
---

# Phoenix: an exchange that does the maths for you

**One line:** Phoenix has an open on-chain order book. The redesign uses it to show traders what an
order will do *before* they place it, in dollars and plain sentences. The screen stays calm and
keeps Phoenix's own identity.

This is a redesign of the **user experience**, not only the look. Every change below either removes
a step, removes a calculation the trader used to do in their head, or makes a cost visible before
money moves. Each change says which of those it is.

---

## By the numbers

Every figure was measured on the working prototype against an exact replica of today's
phoenix.trade, with the same demo account, at 1440×900. Scores, opinions and estimates are labelled
as such.

| What | Before | After | Change |
|---|---|---|---|
| Steps to place a market order | 4 (side, size, Place, Confirm) | 3 (side, size, Place) | −25% |
| Steps to place an order with take profit + stop loss | 7 | 5 | −29% |
| Values typed for that order | 3 (size, TP price, SL price) | 1 (size; TP +5% / SL −2.5% prefilled, drag to adjust) | −67% |
| Columns in the positions table | 11 | 7 | −36% |
| Loading wait when switching between your account and a watched trader | 1.1 s | 0 s | instant |
| Numbers the trader had to work out alone, now shown on screen | — | 8 (see "Maths we do for the trader") | new |
| Problems documented in the current UI before designing | 31 (4 high severity), on a phone | — | research |
| Chart height (honest trade-off) | 604 px | 491 px | −19%, flagged to fix |

How the steps were counted: one step is one click, one typed value or one drag. Old flow: Long →
size → tick TP/SL → type TP price → type SL price → Place Order → Confirm. New flow: Long → size →
tick TP/SL (the sheet opens with levels already set) → Done → Place Order. The Confirm dialog is
gone because everything it showed is already in the order panel.

### Context: who this is for (sourced, 31 Oct 2026)
- About **$21M of daily volume** on Phoenix's own site and **$22.4M open interest** (DefiLlama).
- Trading fees: **taker 0.035%, maker 0.005%**.
- About **1,300 traders** (reported, Galaxy). Most on-chain *transactions* are bots and market
  makers: about 14M transactions a day from about 800–880 signers.
- What this means for design: the people who use the app are few, and they can be won or lost on the
  experience. The redesign targets that group, the normal trader. Bots never see a screen.

---

## The problem

On today's Phoenix a normal trader:
1. **Cannot see risk at a glance.** The liquidation price is a bare number, so the trader has to
   work out how far away it is.
2. **Pays costs they can't see in dollars before clicking.** Slippage and the average fill depend
   on the order book, but the form doesn't show what this order will do to the book.
3. **Fills a long form, then confirms the same numbers again** in a modal.
4. **Reads dense tables.** Positions has 11 columns of 12 px text and no main number per row.

Phoenix also does several things well, and the redesign keeps them: a confirm step that shows the
whole trade, an outcome-first close, a sponsored $0.00 network fee, and one coherent visual system.

---

## Principle: intelligence-first, never advice

> Facts computed from the open order book and the trader's own inputs. Never predictions, signals or
> price opinions.

| Moment | The trader's question | The answer on screen |
|---|---|---|
| Before the trade | What will my order do? | Order preview on the book (levels eaten, average fill, slippage in bps), liquidation sentence, risk level |
| At the trade | What did I actually get? | Fill toast: filled price, time in ms, dollars saved compared with the protected price |
| After the trade | How safe am I? | Distance to liquidation on every position, as a bar |
| Watching the market | What do top traders do? | Ghost Mode: watch up to 3 traders read-only |

---

## Maths we do for the trader (the core of the UX)

Each item was a calculation the trader did by hand or skipped. It is now computed live from the same
numbers, so the form, the book and the chart always agree.

1. **Order preview on the book.** The book walks the opposite side from the best price, shades
   exactly the levels the order would eat, and shows "avg $86.34 · 1 level · 0.0 bps". The order
   form reads that same average, so its entry price and slippage match what the book shows.
2. **Price protection.** "Protected up to $87.20" sits on the Place Order button. It is the expected
   price plus the trader's max slippage, sent as a limit: the order fills at that price or better,
   or not at all. It only shows when it is technically possible: a market order, with a size, when
   the visible book can fill it.
3. **Liquidation as a sentence.** "If SOL falls 15.0% to $73.39, this position is liquidated." The
   distance is computed for the trader instead of a bare price.
4. **Risk level from the exchange's own margin rule.** Low, Medium or High is derived from
   maintenance margin (about 5%). Distance to liquidation at least 10% = Low, at least 3% = Medium,
   below that = High. On the leverage bar, 10x is labelled orange and 25x red, so the risk is
   visible before the trader drags.
5. **Cross vs Isolated actually changes the maths.** Isolated liquidation = order price ×
   (1 ∓ (1/leverage − maintenance margin)). Cross uses the whole account. The same number drives
   the sentence, the badge, the summary and the dashed line on the chart.
6. **Position before → after.** "44.000 → 54.000 SOL" appears as soon as a size is typed.
7. **Fees and funding in dollars**, with dotted-underline explanations on hover.
8. **The fill result.** "Filled 10 SOL in 412 ms · saved $0.31": the toast measures the fill against
   the protected price.

**Worked example (illustration, Phoenix's real taker fee):** a $10,000 market order pays $3.50 in
taker fees. If it eats three levels, the preview shows a figure like "4.2 bps" *before* the click,
which is $4.20 more on that order. Before, the trader saw that only after the fill, if at all. We
don't claim a total amount saved, because that needs real traders and real data.

---

## Key decisions, and why

| Area | Before | After | Why (UX, not looks) |
|---|---|---|---|
| Confirm modal | Separate dialog repeating the form | Removed; the panel already shows everything, and price protection guards the fill | One fewer step on every order, with no less safety |
| Leverage | Dotted slider | Brick bar with stops at 1 / 5 / 10 / 25x; drag, click, scroll or keys; hover bubble "8x · Medium" | Low leverage, which most people use, gets the most room; risk is labelled at the stops |
| TP / SL when ordering | Two empty price boxes | Sheet that rises inside the order panel, prefilled at +5% / −2.5%, shown as two small $/% boxes once set | Two typed values removed; profit and loss visible in dollars |
| TP / SL on a position | Pop-up | Focus mode: the rest of the app dims, and TP/SL pills are dragged on the chart | Edit in context, one thing at a time |
| Positions | 11 columns, dense | 7 columns, a value over its context in each cell, PnL as the main number, liquidation as a "% away" bar | Read at a glance |
| Filters | Icon-only, unclear | "Market: All / SOL", "Side: All / Long / Short"; "Cancel all" becomes "Cancel shown" while a filter is on | Never cancel orders you can't see |
| Close position | Reused the order form | Result first: "You will realise +$90.64", 25/50/75/All, button says "Close 25% · 11.000 SOL" | The outcome before the commitment |
| Ghost Mode (new) | Not available | Watch up to 3 top traders read-only from a dock; ghost cursor and read-only labels | Learn from the best without leaving the trade screen |
| Rewards | Funding rebate repeated in about 3 places | One claimable number, a contribution-style grid, a two-card referral with progress to the $10,000 unlock | One clear next step |
| Leaderboard | Walls of rows | Podium, top markets, "Your standing" with distance to the next tier | Motivation through plain progress |
| Speed | 1.1 s skeleton on every account switch | Instant; skeletons only on real loads | Never make people wait for nothing |

---

## Design system

Phoenix's identity was kept: ABC Diatype and Gestura fonts, the logo mark, Lucide icons at
2 px stroke. The colour system and the rules were rebuilt.

- **Colour: "Carbon".** Neutral grey with zero hue. Page 3.5%, panel 7%, inset 10.5%, control
  15.5% (hover 20%), border 13%. Text 95%, muted text 66%.
- **One accent.** Phoenix orange `hsl(27 96% 61%)` means "selected / do this". Green
  `hsl(150 40% 52%)` and red `hsl(2 58% 62%)` mean only direction or money, never decoration.
  Risk reuses the three: low = green, medium = orange, high = red.
- **Contrast (computed).** Body text 16.7:1, muted text 7.9:1, buy 7.5:1, sell 5.5:1 on panels.
- **Spacing:** 8 / 16 / 24 px only. **Type:** 12 for labels, 14 for values, 16 for totals,
  24 for the order size.
- **Motion:** every animation carries data. Things move only when the trader acts or a book batch
  lands, never on every tick. Only transform and opacity, no blur, and reduced motion is respected.
  The order book updates in calm batches every 2.5–5 s.
- **Tooltips:** a dotted underline means "this is explained". It is used only on terms that need it
  (Fee, Funding, Current Position, Slippage, LEV).

---

## What we can't claim yet

- No testing with real traders. The step counts and layout figures are measured; the improvements in
  understanding are design judgement.
- The prototype runs on a mock exchange, so the order book is calmer than real data.
- The chart lost 19% of its height and the buy/sell lightness gap is about 5, under our target of 8.
  Both are known and listed to fix.
- Deposit, Withdraw and Settings were recoloured, not redesigned.

## Assets in this folder
- `screenshots/`: final screens at 4320×2700 (1440×900 at 3×)
- `social/`: the cursor design build-up (dark and light), 4K stills (dark and light), a square leverage clip, a TP/SL clip, the problems video with sound
- `components/`: order form, order-book fill preview, leverage and risk, price protection, TP/SL
  sheet, Ghost dock
- `videos/`: design build-up with cursors (three versions, dark and light), full walkthrough, TP/SL, Ghost Mode, portfolio, rewards, leaderboard
- `before/`: today's phoenix.trade (live, signed out) and the replica of today's layout with the same demo account, all at 4320×2700, plus a video of the problems found on a phone
