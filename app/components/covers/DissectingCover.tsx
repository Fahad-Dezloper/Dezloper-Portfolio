"use client";

import { useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Cover for "Dissecting Complex Interfaces".
 *
 * At rest it is a trading screen with every panel pushed up against its
 * neighbours: top bar, chart, order book, control panel, positions. Two pixels
 * of gap, which is how these screens are really built, and why they read as
 * one wall of information rather than five decisions.
 *
 * Hovering opens the gaps. Nothing moves except the space between the panels,
 * each one travelling away from the middle, so the screen comes apart into the
 * pieces it was always made of. The dissection is the whole point of the
 * article, so the cover performs it rather than illustrating something else.
 *
 * Mono on purpose: the ReVanced cover beside it is ink on paper.
 */

const W = 400;
const H = 500;

const BG = "#F5F5F5";
const INK = "#161616";

/**
 * The assembled screen. Sized against the ReVanced mark on the tile beside it,
 * which after its own scaling occupies 224 x 236 of this viewBox centred on
 * y 197, so the two covers carry the same weight in the row instead of one
 * reading as a thumbnail next to a poster.
 */
const X = 55;
const Y = 92;
const SCREEN_W = 290;
const BAR_H = 30;
const BODY_Y = Y + BAR_H + 2;
const BODY_H = 180;

const COL_L = 154; // chart and positions
const COL_M = 64; //  order book
const COL_R = 68; //  control panel
const CHART_H = 116;

/**
 * Every panel, with where it travels when the screen is taken apart. The
 * vectors point away from the middle, so the gaps grow evenly instead of the
 * stack sliding off in one direction. They stay modest on purpose: the screen
 * is large now, and it has to come apart without any panel reaching the edge
 * of the tile or the title underneath it.
 */
const PANELS = [
  { id: "topbar", x: X, y: Y, w: SCREEN_W, h: BAR_H, dx: 0, dy: -34 },
  { id: "chart", x: X, y: BODY_Y, w: COL_L, h: CHART_H, dx: -26, dy: -10 },
  {
    id: "positions",
    x: X,
    y: BODY_Y + CHART_H + 2,
    w: COL_L,
    h: BODY_H - CHART_H - 2,
    dx: -26,
    dy: 28,
  },
  { id: "book", x: X + COL_L + 2, y: BODY_Y, w: COL_M, h: BODY_H, dx: 0, dy: 6 },
  {
    id: "panel",
    x: X + COL_L + COL_M + 4,
    y: BODY_Y,
    w: COL_R,
    h: BODY_H,
    dx: 28,
    dy: -4,
  },
] as const;

const isPointer = (e: PointerEvent) => e.pointerType !== "touch";

/** Fixed, never generated: a coordinate that rounds differently in Node and
 *  the browser is a hydration mismatch. */
const CANDLES = [
  [0.07, 0.3, 0.66],
  [0.18, 0.22, 0.52],
  [0.29, 0.44, 0.8],
  [0.4, 0.14, 0.46],
  [0.51, 0.36, 0.74],
  [0.62, 0.5, 0.88],
  [0.73, 0.26, 0.6],
  [0.84, 0.4, 0.82],
  [0.93, 0.18, 0.54],
] as const;

const LADDER = [
  0.82, 0.54, 0.7, 0.38, 0.92, 0.46, 0.64, 0.86, 0.3, 0.76, 0.5, 0.88, 0.42,
  0.66, 0.34,
] as const;

export default function DissectingCover() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const exploded = open && !reduce;

  return (
    <div
      className="absolute inset-0"
      style={{ background: BG }}
      onPointerEnter={(e) => isPointer(e) && setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {PANELS.map((p, i) => (
          <motion.g
            key={p.id}
            initial={false}
            animate={{ x: exploded ? p.dx : 0, y: exploded ? p.dy : 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
              delay: exploded ? i * 0.03 : (PANELS.length - 1 - i) * 0.02,
            }}
          >
            <rect
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              rx={4}
              fill="#FFFFFF"
              stroke={INK}
              strokeOpacity={0.5}
              strokeWidth={1.4}
            />

            {p.id === "topbar" && (
              <>
                <rect
                  x={p.x + 10}
                  y={p.y + 10}
                  width={46}
                  height={11}
                  rx={5.5}
                  fill={INK}
                />
                {[64, 110, 152].map((lx, c) => (
                  <rect
                    key={lx}
                    x={p.x + lx}
                    y={p.y + 10}
                    width={c === 2 ? 28 : 36}
                    height={11}
                    rx={5.5}
                    fill={INK}
                    fillOpacity={0.22}
                  />
                ))}
                <circle cx={p.x + p.w - 16} cy={p.y + 15} r={5} fill={INK} />
              </>
            )}

            {p.id === "chart" && (
              <>
                {[0.3, 0.55, 0.8].map((g) => (
                  <line
                    key={g}
                    x1={p.x + 6}
                    y1={p.y + p.h * g}
                    x2={p.x + p.w - 6}
                    y2={p.y + p.h * g}
                    stroke={INK}
                    strokeOpacity={0.12}
                  />
                ))}
                <path
                  d={
                    `M ${p.x + 8} ${p.y + p.h - 8} ` +
                    CANDLES.map(
                      ([t, , hi]) =>
                        `L ${p.x + 8 + (p.w - 16) * t} ${p.y + 10 + (p.h - 22) * (1 - hi)}`,
                    ).join(" ") +
                    ` L ${p.x + p.w - 8} ${p.y + p.h - 8} Z`
                  }
                  fill={INK}
                  fillOpacity={0.1}
                />
                {CANDLES.map(([t, lo, hi], c) => (
                  <line
                    key={c}
                    x1={p.x + 8 + (p.w - 16) * t}
                    y1={p.y + 10 + (p.h - 22) * (1 - lo)}
                    x2={p.x + 8 + (p.w - 16) * t}
                    y2={p.y + 10 + (p.h - 22) * (1 - hi)}
                    stroke={INK}
                    strokeWidth={5}
                    strokeLinecap="round"
                  />
                ))}
              </>
            )}

            {p.id === "book" && (
              <>
                {LADDER.map((len, r) => (
                  <rect
                    key={r}
                    x={p.x + 6}
                    y={p.y + 10 + r * 11}
                    width={(p.w - 12) * len}
                    height={6}
                    rx={3}
                    fill={INK}
                    fillOpacity={r === 6 || r === 7 ? 0.85 : 0.3}
                  />
                ))}
                <line
                  x1={p.x + 5}
                  y1={p.y + 10 + 7 * 11 - 3}
                  x2={p.x + p.w - 5}
                  y2={p.y + 10 + 7 * 11 - 3}
                  stroke={INK}
                  strokeOpacity={0.45}
                />
              </>
            )}

            {p.id === "panel" && (
              <>
                {[0, 1, 2, 3].map((r) => (
                  <rect
                    key={r}
                    x={p.x + 7}
                    y={p.y + 12 + r * 23}
                    width={p.w - 14}
                    height={14}
                    rx={4}
                    fill={INK}
                    fillOpacity={r === 0 ? 0.5 : 0.14}
                  />
                ))}
                <rect
                  x={p.x + 7}
                  y={p.y + p.h - 32}
                  width={p.w - 14}
                  height={22}
                  rx={5}
                  fill={INK}
                />
              </>
            )}

            {p.id === "positions" && (
              <>
                {[0, 1, 2, 3].map((r) => (
                  <g key={r}>
                    <rect
                      x={p.x + 8}
                      y={p.y + 11 + r * 13}
                      width={32}
                      height={7}
                      rx={3.5}
                      fill={INK}
                      fillOpacity={0.5}
                    />
                    {[54, 92, 124].map((lx, c) => (
                      <rect
                        key={lx}
                        x={p.x + lx}
                        y={p.y + 11 + r * 13}
                        width={c === 2 ? 18 : 28}
                        height={7}
                        rx={3.5}
                        fill={INK}
                        fillOpacity={0.2}
                      />
                    ))}
                  </g>
                ))}
              </>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
