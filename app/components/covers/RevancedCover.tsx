"use client";

import { useId, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Interactive cover for the ReVanced writing, in the line-and-dot style of
 * Paradigm's research covers.
 *
 * At rest it shows the finished logo: the V as a thin outline with
 * construction dots, and the filled inner triangle. Each hover replays the
 * triangle being built: its edges draw in turn over a faint dashed guide, then
 * the fill blooms. Moving the cursor pulls the whole mark a short way toward
 * it on a spring, with the triangle travelling slightly further than the V so
 * the two read as separate layers.
 *
 * The mark sits in the upper part of the tile and is drawn slightly smaller,
 * leaving the bottom clear for the writing's title.
 */

const W = 400;
const H = 500;

const BG = "#F5F5F5";
const INK = "#161616";
const PINK = "#ec4fa0";
const PURPLE = "#8b5cf6";

// The V: two round-capped bars meeting at the bottom.
const L_TOP = { x: 88, y: 132 };
const R_TOP = { x: 312, y: 132 };
const BOTTOM = { x: 200, y: 372 };
const BAR = 30;
const LINE = 1.6;

// The inner triangle, point down, filling the space between the arms. Its
// edges run slightly steeper than the arms, so the gap to them is narrowest at
// the top corners (about 14 units) and opens up toward the point.
const T_L = { x: 114, y: 119 };
const T_R = { x: 286, y: 119 };
const T_A = { x: 200, y: 272 };

// Furthest the mark can be pulled from centre, in viewBox units. A nudge
// toward the cursor, not a chase.
const PULL_X = 12;
const PULL_Y = 14;
// How much further the triangle travels than the V.
const DEPTH = 1.1;

const EDGES = [
  `M${T_L.x} ${T_L.y} L${T_R.x} ${T_R.y}`,
  `M${T_R.x} ${T_R.y} L${T_A.x} ${T_A.y}`,
  `M${T_A.x} ${T_A.y} L${T_L.x} ${T_L.y}`,
];
const TRIANGLE = `${T_L.x},${T_L.y} ${T_R.x},${T_R.y} ${T_A.x},${T_A.y}`;

// Scale the mark down and lift it, so even at full downward pull the V stays
// clear of the title set in the bottom of the tile.
const MARK_SCALE = 0.88;
const MARK_CENTRE = { x: 200, y: 252 };
const MARK_TARGET = { x: 200, y: 196 };
const PLACE = `translate(${MARK_TARGET.x} ${MARK_TARGET.y}) scale(${MARK_SCALE}) translate(${-MARK_CENTRE.x} ${-MARK_CENTRE.y})`;

const spring = { stiffness: 170, damping: 18, mass: 0.5 };
const draw = [0.65, 0, 0.35, 1] as const;

export default function RevancedCover() {
  const reduce = useReducedMotion();
  // Bumped on each hover. The triangle layer is keyed on it, so a new value
  // remounts the layer and replays the build from empty. 0 is the untouched
  // tile, which shows the finished logo with no animation.
  const [cycle, setCycle] = useState(0);
  const replay = cycle > 0 && !reduce;

  // `url(#…)` breaks on the colons React puts in generated ids.
  const gradientId = `revanced-fill-${useId().replace(/:/g, "")}`;

  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const x = useSpring(pullX, spring);
  const y = useSpring(pullY, spring);
  const deepX = useTransform(x, (v) => v * DEPTH);
  const deepY = useTransform(y, (v) => v * DEPTH);

  // Mouse and pen only: on touch there is no hover, and a tap opens the sheet.
  const isPointer = (e: PointerEvent) => e.pointerType !== "touch";

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !isPointer(e)) return;
    const box = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - box.left) / box.width - 0.5;
    const ny = (e.clientY - box.top) / box.height - 0.5;
    pullX.set(nx * 2 * PULL_X);
    pullY.set(ny * 2 * PULL_Y);
  };

  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (isPointer(e) && !reduce) setCycle((c) => c + 1);
  };

  // Leaving keeps the finished logo; only the pull lets go.
  const onLeave = () => {
    pullX.set(0);
    pullY.set(0);
  };

  return (
    <div
      className="absolute inset-0"
      style={{ background: BG }}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PINK} />
            <stop offset="100%" stopColor={PURPLE} />
          </linearGradient>
        </defs>

        <g transform={PLACE}>
          {/* The V. A thick ink stroke with a slightly thinner background stroke
            on top leaves a hairline outline, and doing both arms in that order
            outlines their union, so the bottom joint has no seam. */}
          <motion.g style={{ x, y }}>
            {[L_TOP, R_TOP].map((top, i) => (
              <line
                key={`ink-${i}`}
                x1={top.x}
                y1={top.y}
                x2={BOTTOM.x}
                y2={BOTTOM.y}
                stroke={INK}
                strokeWidth={BAR + LINE * 2}
                strokeLinecap="round"
              />
            ))}
            {[L_TOP, R_TOP].map((top, i) => (
              <line
                key={`cut-${i}`}
                x1={top.x}
                y1={top.y}
                x2={BOTTOM.x}
                y2={BOTTOM.y}
                stroke={BG}
                strokeWidth={BAR}
                strokeLinecap="round"
              />
            ))}
            {[L_TOP, R_TOP, BOTTOM].map((p, i) => (
              <circle key={`joint-${i}`} cx={p.x} cy={p.y} r={2.6} fill={INK} />
            ))}
          </motion.g>

          {/* The triangle, on its own deeper layer. */}
          <motion.g key={cycle} style={{ x: deepX, y: deepY }}>
            <motion.polygon
              points={TRIANGLE}
              fill="none"
              stroke={INK}
              strokeWidth={1}
              strokeDasharray="2 7"
              initial={replay ? { opacity: 0.35 } : false}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />

            <motion.polygon
              points={TRIANGLE}
              fill={`url(#${gradientId})`}
              style={{ transformBox: "fill-box", transformOrigin: "50% 33%" }}
              initial={replay ? { opacity: 0, scale: 0.55 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {EDGES.map((d, i) => (
              <motion.path
                key={`edge-${i}`}
                d={d}
                fill="none"
                stroke={INK}
                strokeWidth={LINE}
                strokeLinecap="round"
                initial={replay ? { pathLength: 0, opacity: 0 } : false}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: i * 0.26, duration: 0.4, ease: draw }}
              />
            ))}

            {[T_L, T_R, T_A].map((p, i) => (
              <circle key={`vertex-${i}`} cx={p.x} cy={p.y} r={4} fill={INK} />
            ))}
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
