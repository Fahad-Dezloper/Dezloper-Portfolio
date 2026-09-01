"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * How much of the motion channel to spend.
 *
 * Every cell moves on every tick regardless of setting — the data never changes.
 * The threshold decides how large a move has to be before it is allowed to
 * announce itself. At 0 everything flashes; turn it up and a flash becomes an
 * event. The tabs are just two presets on that dial.
 */

const COLS = 6;
const ROWS = 6;
const N = COLS * ROWS;
const TICK_MS = 850;

const MAX_MOVE = 2.1; // hard cap on a single move
const MOVE_SCALE = 0.241; // puts the default threshold at roughly 2 flashes / tick
const SLIDER_MAX = 1.5; // past this nothing flashes, so keep it off the track
const PRESET_EVERYTHING = 0;
const PRESET_BUDGETED = 0.7;

const PANEL = "#141417";
const BORDER = "#26262b";
const TEXT = "#e8e8ea";
const DIM = "#5f5f68";
const GREEN = "#3ecf7d";
const RED = "#f0526b";

type Cell = { value: number; dir: "up" | "down" | null; seq: number };

// Deterministic first paint so server and client markup agree.
const INITIAL: Cell[] = Array.from({ length: N }, (_, i) => ({
  value: 100 + ((i * 37) % 900) / 10,
  dir: null,
  seq: 0,
}));

const CSS = `
@keyframes flashfade { from { opacity: .42 } to { opacity: 0 } }
.flashcell-tint {
  position: absolute; inset: 0; border-radius: 5px;
  animation: flashfade 620ms ease-out forwards;
}
.flashdemo-range { accent-color: ${GREEN}; height: 4px; cursor: pointer; }
@media (prefers-reduced-motion: reduce) {
  .flashcell-tint { animation-duration: 1ms; }
}
`;

export default function FlashDemo({
  threshold: initialThreshold = PRESET_BUDGETED,
  everythingNote = "Every cell on this grid is moving, and every move announces itself. After a few seconds you stop seeing individual changes and start seeing weather. The motion never stops, so none of it can mean anything.",
  budgetedNote = "Exactly the same grid. Every cell is still moving, just as often, by the same amounts. Nothing has been hidden or slowed down. The only change is that a move now has to clear a threshold before it is allowed to flash. A flash has become an event, which is the only thing that makes it worth spending.",
}: {
  threshold?: number;
  everythingNote?: string;
  budgetedNote?: string;
}) {
  const [threshold, setThreshold] = useState(initialThreshold);
  const [cells, setCells] = useState<Cell[]>(INITIAL);
  const [running, setRunning] = useState(true);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const seq = useRef(0);
  // Read inside the interval so dragging the slider doesn't restart the clock.
  const thresholdRef = useRef(threshold);
  thresholdRef.current = threshold;

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    if (!running) return stop();

    timer.current = setInterval(() => {
      setCells((prev) =>
        prev.map((cell) => {
          // Every cell moves every tick, at every setting. Only the decision
          // to announce the move is under our control.
          // Exponential magnitudes: many small ticks, rare large jumps. Real
          // price moves distribute roughly this way, and it makes the
          // threshold map smoothly onto flash rate across the whole slider.
          const magnitude = Math.min(
            -Math.log(1 - Math.random()) * MOVE_SCALE,
            MAX_MOVE
          );
          const delta = (Math.random() < 0.5 ? -1 : 1) * magnitude;

          const flash = Math.abs(delta) > thresholdRef.current;
          seq.current += 1;

          return {
            value: Math.max(1, cell.value + delta),
            dir: flash ? (delta >= 0 ? "up" : "down") : null,
            seq: seq.current,
          };
        })
      );
    }, TICK_MS);

    return stop;
  }, [running, stop]);

  const flashing = cells.filter((c) => c.dir).length;
  const note = threshold < 0.35 ? everythingNote : budgetedNote;

  const preset = (value: number, label: string) => {
    const active = Math.abs(threshold - value) < 0.03;
    return (
      <button
        type="button"
        onClick={() => setThreshold(value)}
        aria-pressed={active}
        style={{
          font: "inherit",
          cursor: "pointer",
          border: `1px solid ${active ? BORDER : "transparent"}`,
          background: active ? PANEL : "transparent",
          color: active ? TEXT : DIM,
          borderRadius: 999,
          padding: "5px 14px",
          transition: "color .15s, background .15s",
        }}
      >
        {label}
      </button>
    );
  };

  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

  return (
    <div style={{ margin: "28px 0" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 12,
          fontFamily: mono,
          fontSize: 12,
        }}
      >
        {preset(PRESET_EVERYTHING, "Everything flashes")}
        {preset(PRESET_BUDGETED, "Budgeted")}
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          style={{
            font: "inherit",
            cursor: "pointer",
            marginLeft: "auto",
            border: `1px solid ${BORDER}`,
            background: "transparent",
            color: DIM,
            borderRadius: 999,
            padding: "5px 12px",
          }}
        >
          {running ? "pause" : "play"}
        </button>
      </div>

      <div
        style={{
          background: PANEL,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: 14,
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gap: 6,
        }}
      >
        {cells.map((cell, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              padding: "9px 4px",
              textAlign: "center",
              borderRadius: 5,
              fontFamily: mono,
              fontSize: 13,
              fontVariantNumeric: "tabular-nums",
              color: TEXT,
            }}
          >
            {cell.dir && (
              <span
                key={cell.seq}
                className="flashcell-tint"
                style={{ background: cell.dir === "up" ? GREEN : RED }}
              />
            )}
            <span style={{ position: "relative" }}>{cell.value.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 12,
          fontFamily: mono,
          fontSize: 11,
          color: DIM,
        }}
      >
        <label htmlFor="flash-threshold" style={{ whiteSpace: "nowrap" }}>
          flash moves over
        </label>
        <input
          id="flash-threshold"
          className="flashdemo-range"
          type="range"
          min={0}
          max={SLIDER_MAX}
          step={0.05}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ flex: 1, minWidth: 0 }}
        />
        <span
          style={{
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
            color: TEXT,
          }}
        >
          {threshold.toFixed(2)}
        </span>
        <span style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
          {N}/{N} moving · {flashing}/{N} flashing
        </span>
      </div>

      <p
        style={{
          margin: "12px 2px 0",
          fontSize: 14,
          lineHeight: 1.6,
          fontStyle: "italic",
          color: "color-mix(in srgb, var(--foreground) 60%, transparent)",
        }}
      >
        {note}
      </p>
    </div>
  );
}
