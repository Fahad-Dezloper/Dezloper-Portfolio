"use client";

import { useState } from "react";

/**
 * Where a product sits on the two inputs that earn density.
 *
 * Position is expertise (x) against frequency of use (y); circle area is the
 * density the product actually ships. The point of plotting it rather than
 * ranking it is that the two inputs come apart — Aave's users are expert but
 * infrequent, Cash App's are frequent but never expert, and both stay sparse.
 *
 * Hovering a circle swaps the note underneath; clicking pins it, so the chart
 * still works on touch. Edit PRODUCTS to move or reword anything.
 */

type Product = {
  name: string;
  expertise: number; // 0–1
  frequency: number; // 0–1
  density: number; // 0–1, drives circle size
  label?: "above" | "below" | "left";
  note: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Cash App",
    expertise: 0.1,
    frequency: 0.46,
    density: 0.12,
    note: "Frequent, but never expert. People open a payments app several times a week and learn nothing, because there is nothing to learn. Frequency on its own buys no density, so it stays a balance, a button and a list.",
  },
  {
    name: "Wise",
    expertise: 0.18,
    frequency: 0.16,
    density: 0.1,
    note: "Low on both axes, and the sparsest thing here. You move money abroad occasionally and are never on the screen long enough to build muscle memory, so every screen has to explain itself from scratch, every time.",
  },
  {
    name: "Aave",
    expertise: 0.62,
    frequency: 0.36,
    density: 0.45,
    label: "below",
    note: "Expert users, low frequency. You need to understand liquidation thresholds to be here at all, but you set a position and then check it rather than watch it. Expertise without residency earns only moderate density.",
  },
  {
    name: "Jupiter",
    expertise: 0.55,
    frequency: 0.58,
    density: 0.58,
    note: "The middle of the axis, and the interface shows it: a plain swap by default, with the routing one click behind. Dense enough for the people who want the derivation, quiet enough for the ones who don't.",
  },
  {
    name: "Backpack",
    expertise: 0.84,
    frequency: 0.84,
    density: 0.88,
    label: "left",
    note: "Both inputs high. Professionals, resident on the screen for hours, who have earned every shortcut. This is where depth bars, tabular figures and a reserved colour channel start paying for themselves.",
  },
  {
    name: "Bloomberg",
    expertise: 0.95,
    frequency: 0.95,
    density: 1,
    note: "The far corner. Maximum expertise, all-day residency, and decades of muscle memory to protect. Density is not a side effect of the product here. It is the product, which is why every redesign gets rejected.",
  },
];

const DEFAULT_NOTE =
  "Circle size is how dense each product actually is. The two points off the line are the argument: neither input earns density on its own. Hover any circle for the detail.";

const W = 1180;
const H = 560;
const OX = 165;
const OY = 70;
const OW = 900;
const OH = 370;

const PANEL = "#141417";
const BORDER = "#26262b";
const TEXT = "#e8e8ea";
const DIM = "#5f5f68";
const ACCENT = "#3ecf7d";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const CSS = `
.densityaxis { width: 100%; height: auto; display: block; }
.densityaxis .pt { cursor: pointer; outline: none; }
.densityaxis .pt circle,
.densityaxis .pt text { transition: opacity .18s ease, fill .18s ease; }
.densityaxis .pt:focus-visible circle.ring { opacity: .9; }
`;

export default function DensityAxis({
  defaultNote = DEFAULT_NOTE,
}: {
  defaultNote?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  const activeName = hovered ?? pinned;
  const active = PRODUCTS.find((p) => p.name === activeName);

  return (
    <div className="my-6">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <svg
        className="densityaxis"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Products plotted by user expertise against frequency of use, with circle size showing how dense each interface is"
      >
        <rect width={W} height={H} rx={14} fill={PANEL} stroke={BORDER} />

        {[0.25, 0.5, 0.75].map((t) => (
          <line key={`v${t}`} x1={OX + t * OW} y1={OY} x2={OX + t * OW} y2={OY + OH}
            stroke={BORDER} strokeWidth={1} opacity={0.5} />
        ))}
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={`h${t}`} x1={OX} y1={OY + OH - t * OH} x2={OX + OW} y2={OY + OH - t * OH}
            stroke={BORDER} strokeWidth={1} opacity={0.5} />
        ))}

        <line x1={OX} y1={OY + OH} x2={OX + OW} y2={OY + OH} stroke={BORDER} strokeWidth={2} />
        <line x1={OX} y1={OY} x2={OX} y2={OY + OH} stroke={BORDER} strokeWidth={2} />
        <text x={OX} y={OY + OH + 40} fill={DIM} fontSize={16} fontFamily={MONO} letterSpacing="0.18em">
          EXPERTISE →
        </text>
        <text transform={`translate(${OX - 34},${OY + OH}) rotate(-90)`} fill={DIM} fontSize={16}
          fontFamily={MONO} letterSpacing="0.18em">
          FREQUENCY OF USE →
        </text>

        {/* Reference, not a fit. Labelled so off-diagonal points read as findings. */}
        <line x1={OX + 20} y1={OY + OH - 20} x2={OX + OW - 20} y2={OY + 20}
          stroke={ACCENT} strokeDasharray="4 8" opacity={0.18} />
        <text x={431} y={313} transform="rotate(-21 431 313)" fill={DIM} fontSize={12}
          fontFamily={MONO} letterSpacing="0.14em" opacity={0.75}>
          EXPERTISE = FREQUENCY
        </text>

        {PRODUCTS.map((p) => {
          const cx = OX + p.expertise * OW;
          const cy = OY + OH - p.frequency * OH;
          const r = 7 + p.density * 21;
          const side = p.label ?? "above";
          const isActive = activeName === p.name;
          const dimmed = activeName !== null && !isActive;

          return (
            <g
              key={p.name}
              className="pt"
              tabIndex={0}
              role="button"
              aria-label={`${p.name}: expertise ${p.expertise}, frequency ${p.frequency}`}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.name)}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned(pinned === p.name ? null : p.name)}
              opacity={dimmed ? 0.4 : 1}
            >
              <circle className="ring" cx={cx} cy={cy} r={r + 9} fill="none" stroke={ACCENT}
                strokeWidth={1.5} opacity={pinned === p.name ? 0.9 : 0} />
              <circle cx={cx} cy={cy} r={r + 13} fill={ACCENT} opacity={isActive ? 0.18 : 0.06} />
              <circle cx={cx} cy={cy} r={r} fill={ACCENT}
                opacity={isActive ? 1 : 0.3 + p.density * 0.55} />
              {side === "above" && (
                <text x={cx} y={cy - r - 16} fill={isActive ? "#ffffff" : TEXT} fontSize={19}
                  fontFamily={MONO} textAnchor="middle">{p.name}</text>
              )}
              {side === "below" && (
                <text x={cx} y={cy + r + 27} fill={isActive ? "#ffffff" : TEXT} fontSize={19}
                  fontFamily={MONO} textAnchor="middle">{p.name}</text>
              )}
              {side === "left" && (
                <text x={cx - r - 14} y={cy + 6} fill={isActive ? "#ffffff" : TEXT} fontSize={19}
                  fontFamily={MONO} textAnchor="end">{p.name}</text>
              )}
            </g>
          );
        })}

        <text x={OX + 14} y={OY + OH - 16} fill={DIM} fontSize={14} fontFamily={MONO} letterSpacing="0.16em">
          SPARSE
        </text>
        <text x={OX + OW + 16} y={OY + 18} fill={DIM} fontSize={14} fontFamily={MONO} letterSpacing="0.16em">
          DENSE
        </text>

        <circle cx={OX + 9} cy={OY + OH + 87} r={7} fill={ACCENT} opacity={0.45} />
        <circle cx={OX + 48} cy={OY + OH + 87} r={15} fill={ACCENT} opacity={0.8} />
        <text x={OX + 76} y={OY + OH + 92} fill={DIM} fontSize={15} fontFamily={MONO}>
          circle size = how dense the interface actually is
        </text>
      </svg>

      {/* Fixed min-height so swapping notes never shifts the page under the cursor. */}
      <p
        className="mt-3 text-sm italic leading-relaxed text-[var(--foreground)]/60"
        style={{ minHeight: "5.5em" }}
        aria-live="polite"
      >
        {active ? (
          <>
            <span className="font-mono text-[11px] not-italic tracking-[0.14em] text-[var(--foreground)]/40">
              {active.name.toUpperCase()}
              {pinned === active.name ? " · PINNED" : ""}
            </span>
            <br />
            {active.note}
          </>
        ) : (
          defaultNote
        )}
      </p>
    </div>
  );
}
