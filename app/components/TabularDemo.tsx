"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Live comparison of proportional vs tabular figures.
 *
 * Both columns render the *same* values in the *same* typeface. The only
 * difference is `font-variant-numeric`, so any movement you see in the left
 * column is caused by digits having different advance widths.
 */

const PANEL = "#141417";
const BORDER = "#26262b";
const TEXT = "#e8e8ea";
const DIM = "#5f5f68";
const GREEN = "#3ecf7d";
const RED = "#f0526b";

const ROWS = 5;
const TICK_MS = 900;

// Weighted toward 1 and 0 — the widest advance-width gap in most proportional faces.
const DIGITS = "1101987654321100";

const digit = () => DIGITS[(Math.random() * DIGITS.length) | 0];

/** Always four whole digits, so the comma never moves and only glyph width varies. */
const price = () => {
  const n = `${digit()}${digit()}${digit()}${digit()}`;
  return `${n[0]},${n.slice(1)}.${digit()}${digit()}`;
};

// Fixed first paint so the server and client markup agree.
const SEED = ["1,101.10", "1,010.01", "1,110.01", "1,001.10", "1,100.11"];

export default function TabularDemo() {
  const [values, setValues] = useState<string[]>(SEED);
  const [running, setRunning] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

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
      setValues(Array.from({ length: ROWS }, price));
    }, TICK_MS);
    return stop;
  }, [running, stop]);

  const column = (tabular: boolean) => (
    <div
      style={{
        flex: "1 1 240px",
        minWidth: 0,
        background: PANEL,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "18px 20px 20px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          color: tabular ? GREEN : RED,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          marginBottom: 14,
          whiteSpace: "nowrap",
        }}
      >
        {tabular ? "TABULAR-NUMS" : "PROPORTIONAL"}
      </div>

      <div
        style={{
          fontSize: 19,
          lineHeight: 1.75,
          color: TEXT,
          fontVariantNumeric: tabular ? "tabular-nums" : "normal",
          fontFeatureSettings: tabular ? '"tnum" 1' : '"tnum" 0',
        }}
      >
        {values.map((v, i) => (
          <div key={i}>${v}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ margin: "28px 0" }}>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {column(false)}
        {column(true)}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 10,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          color: DIM,
        }}
      >
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          style={{
            border: `1px solid ${BORDER}`,
            borderRadius: 999,
            background: "transparent",
            color: DIM,
            font: "inherit",
            padding: "3px 12px",
            cursor: "pointer",
          }}
        >
          {running ? "pause" : "play"}
        </button>
      </div>
    </div>
  );
}
