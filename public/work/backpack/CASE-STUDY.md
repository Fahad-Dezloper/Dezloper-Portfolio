---
project: Backpack Futures redesign
product: Backpack Exchange mobile app (app.backpack.mobile.standalone v2.89.1), Solana
platform: Mobile (phones from 320×568 to 430×932; tested on a Solana Seeker)
role: Independent redesign: research on a real phone, UX, UI, working prototype, demo videos
status: Working prototype on a mock exchange. Not affiliated with or shipped by Backpack.
date: October 2026
---

# Backpack: a futures trade you can place with one thumb

**One line:** on a phone, Backpack's futures screen asks for everything at once. The redesign gives
each job its own space: chart first, the order in a sheet, and take profit / stop loss drawn on the
chart. Every number that matters is shown before you confirm.

Where Phoenix is about *the maths*, Backpack is about **space and reach**: a small screen, one hand,
and a trader who has to decide fast.

---

## By the numbers

Counted on the real Backpack app (captured step by step on a Solana Seeker) against the working
prototype. One step is one tap, one typed value or one drag.

| What | Before | After | Change |
|---|---|---|---|
| Steps to set take profit + stop loss on an order | 5 (tick box → "Advanced" → type TP → type SL → confirm) | 2 (tick → Set; levels prefilled, drag to adjust) | −60% |
| Values typed for TP/SL | 2, into 4 empty boxes with no chart | 0 required (drag the lines) | −100% |
| Where leverage is set | Account-wide "Max Subaccount Leverage", behind a small "Account" chip on another screen | In the order sheet, a 5-stop slider right above the button | 1 screen, per order |
| What a leverage change shows | Nothing on the form | Margin required, est. liquidation (price and % away), buying power | new |
| Trades visible in the chart view | 2 rows, columns cut off | Full height, scrolls, can sit beside the book | — |
| Lower-panel tabs | 8, scrolling off screen, mostly empty | 5 (Positions, Orders, Balances, Borrows, History) | −38% |
| Distinct numbers visible while ordering | Sheet repeated the page's stats | 6 different numbers (page: price, volume, funding, OI; sheet: mark, best bid, best ask) | no repeats |
| Phone sizes checked | — | 7, from 320×568 to 430×932 | — |

---

## The problem (found on the real app)

1. **Too dense.** Stats, risk rings, the order form and the order book share a few hundred dp. The
   form is squeezed beside the book, so inputs are small and hard to hit.
2. **No feedback.** You can't see what a leverage change does. Margin, liquidation and fees sit among
   unrelated rows, and leverage lives behind an "Account" chip as an account-wide setting.
3. **TP/SL is buried and empty.** Ticking the checkbox shows greyed buttons and an "Advanced" link to
   four empty boxes, with no chart. You can't tell what you would win or lose.
4. **Hidden state.** Eight lower tabs scroll off screen. In the chart view the book shrinks to two
   rows and the Trades columns are cut off.
5. **Unclear feedback after an order.**

What Backpack does well, and the redesign keeps: its visual language (Inter, Lucide icons, colours),
and the Positions / Orders / History screens, which keep Backpack's design.

---

## Key decisions, and why

| Area | Before | After | Why (UX) |
|---|---|---|---|
| Screen structure | Form, book and stats in one view | Chart first; Chart / Book / Trades as tabs; the order form opens as a sheet when you tap Long or Short | Every view gets the room it needs |
| Thumb reach | Actions spread over the screen | Long, Short and a 46×46 dp sheet toggle pinned at the bottom right, 8 dp gaps; the page does not scroll | Main actions stay under the right thumb |
| Order sheet | Inline form | Amount with 25 / 50 / 75 / Max; Entry and Fee side by side; Margin required and Est. liquidation in large type | The two numbers that decide risk read first |
| Leverage | Account setting, no feedback | Dotted 5-stop slider (5x always a stop) under the summary; only margin and liquidation change as you move it | Cause and effect in one glance |
| Slippage | Not shown | A small amber line, only when slippage is 0.05% or more | Warn only when it matters |
| TP / SL: Auto Close | 4 empty boxes | Full screen with the chart: green zone to take profit, red zone to stop loss; drag the tags; one line: "Make +$312.15 at TP or lose −$124.86 at SL" | Pick an exit by looking, and see the money |
| TP / SL safety | — | Entry price frozen while you edit, stop loss can't pass liquidation, minimum distance 0.1% | No moving targets, no impossible orders |
| Book + Trades | Book collapses to 2 rows | One tap shows them side by side; drag the chart corner to resize; footer the same height in both layouts so nothing jumps | You choose how much chart you want |
| Order feedback | Unclear | Banner from the top: placing, then filled; Available goes down; the position appears with live PnL | Every trade shows up everywhere it should |
| Futures only | Spot and Futures mixed | A single "Futures" focus, perpetuals-only market picker | One job, done well |
| Keyboard | Number pad popped up on slider touches | Touching any non-text control blurs the amount field first | No accidental keyboard on a small screen |

---

## Design system: kept, measured, applied

The brief was to fix the experience, not reinvent Backpack's brand. Backpack's own system was
measured from device captures and followed exactly.

- **Units:** Seeker 1200×2670 at 3× = 400×890 dp; 1 CSS px = 1 dp.
- **Type (dp):** token names 13.5, subtext 13, prices 15.5, headings 16–18, portfolio balance 30.
  Inter, with Roboto for tab labels as in the original.
- **Icons:** Lucide.
- **Motion:** plain price flash, modelled on Backpack's own tick behaviour; the book and Trades width
  animates only when the split is toggled.
- **Layout rules:** the 46×46 dp square toggle on the thumb side; equal footer heights across
  layouts; Book and Trades always match the chart's height.

---

## What we can't claim yet

- No testing with real traders. The step counts are measured; the gain in understanding is design
  judgement.
- A mock exchange drives the prototype: a $2,500 demo account, generated candles and a live mock book.
- We did not research Backpack's own volume or user numbers, so this study makes no business claims.

## Assets in this folder
- `screenshots/`: 8 final phone screens at 2000×4450 (5×), plus an overview grid; the October on-device captures are in `screenshots/on-device-oct-1200x2670/`
- `social/`: square walkthrough and problems videos with sound, overview grid image
- `videos/`: redesign walkthrough, trade screen, Book + Trades split, drag
  resize, Long/Short dock, Auto Close, old vs new
- `before/`: real Backpack captures and the "Backpack today" problems video
