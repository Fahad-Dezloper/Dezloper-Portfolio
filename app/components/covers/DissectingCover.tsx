"use client";

import { useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Interactive cover for "Dissecting Complex Interfaces": six nodes on a
 * hexagon with every pair wired together, in single hairlines to match the
 * ReVanced cover.
 *
 * At rest the graph is complete. Hovering the tile replays it being wired up:
 * the nodes appear, then the perimeter, the short diagonals and the long
 * diagonals connect in turn. Hovering a node fills its circle solid.
 */

const W = 400;
const H = 500;

const BG = "#F5F5F5";
const INK = "#161616";

// Kept in the upper part of the tile so the title below stays clear.
const CX = 200;
const CY = 196;
const R = 125;

const LINE = 1.6; // every stroke: wires and node outlines
const NODE = 13; // node radius
const NODE_HIT = NODE + 9; // hover target, a little larger than the circle

// Flat-topped hexagon, clockwise from the right-hand vertex.
const NODES = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
});

// All 15 pairs, ordered for the build: outline first, then inward.
const EDGES: [number, number][] = [
  ...[0, 1, 2, 3, 4, 5].map((i) => [i, (i + 1) % 6] as [number, number]),
  ...[0, 1, 2, 3, 4, 5].map((i) => [i, (i + 2) % 6] as [number, number]),
  ...[0, 1, 2].map((i) => [i, i + 3] as [number, number]),
];

const seg = ([a, b]: [number, number]) => ({
  x1: NODES[a].x,
  y1: NODES[a].y,
  x2: NODES[b].x,
  y2: NODES[b].y,
});

const ease = [0.65, 0, 0.35, 1] as const;
const drawTiming = (i: number) => ({
  delay: 0.2 + i * 0.06,
  duration: 0.45,
  ease,
});

export default function DissectingCover() {
  const reduce = useReducedMotion();
  // Bumped on each tile hover; the graph is keyed on it so a new value replays
  // the build. 0 is the untouched tile, drawn complete with no animation.
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const replay = cycle > 0 && !reduce;

  // Mouse and pen only: on touch a tap just opens the sheet.
  const isPointer = (e: PointerEvent) => e.pointerType !== "touch";

  const drawIn = replay ? { pathLength: 0, opacity: 0 } : false;

  return (
    <div
      className="absolute inset-0"
      style={{ background: BG }}
      onPointerEnter={(e) => {
        if (isPointer(e) && !reduce) setCycle((c) => c + 1);
      }}
      onPointerLeave={() => setHovered(null)}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g key={cycle}>
          {EDGES.map((edge, i) => (
            <motion.line
              key={`wire-${i}`}
              {...seg(edge)}
              stroke={INK}
              strokeWidth={LINE}
              strokeLinecap="round"
              initial={drawIn}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={drawTiming(i)}
            />
          ))}

          {/* Nodes sit on top of the wires. Their background fill hides where
              each wire meets the centre, so wires appear to end at the circle. */}
          {NODES.map((p, i) => (
            <motion.g
              key={`node-${i}`}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={replay ? { opacity: 0, scale: 0.4 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.04,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={NODE}
                stroke={INK}
                strokeWidth={LINE}
                initial={false}
                animate={{ fill: hovered === i ? INK : BG }}
                transition={{ duration: 0.18 }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_HIT}
                fill="#000"
                fillOpacity={0}
                pointerEvents="all"
                onPointerEnter={(e) => {
                  if (isPointer(e)) setHovered(i);
                }}
                onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
              />
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
}
