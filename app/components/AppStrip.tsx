import ZoomableImage from "@/app/components/ZoomableImage";

/**
 * The products from the density axis, at one shared height.
 *
 * Widths are left alone on purpose: a payments app really is a narrow column
 * and a terminal really is a wide grid, so the silhouettes carry part of the
 * argument before you read a single label.
 *
 * Each figure grows in proportion to its aspect ratio, which lands every image
 * at the same height and fills the column exactly, with no wrapping. Below the
 * breakpoint that would squeeze the phone shots into slivers, so the strip
 * scrolls sideways at a fixed height instead.
 */

const APPS = [
  { src: "/blogs/density/cashapp.webp", label: "Cash App", note: "sparse", ratio: 226 / 510 },
  { src: "/blogs/density/wise.webp", label: "Wise", note: "", ratio: 218 / 510 },
  { src: "/blogs/density/aavemarkets.webp", label: "Aave", note: "", ratio: 816 / 510 },
  { src: "/blogs/density/jupiterpro.webp", label: "Jupiter Pro", note: "", ratio: 816 / 510 },
  {
    src: "/blogs/density/backpackterminal.webp",
    label: "Backpack",
    note: "dense",
    ratio: 1800 / 1020,
  },
];

const CSS = `
/* Break out of the prose column to full viewport width, then push the content
   back so it begins on the column's left edge, aligned with the text.
   The padding has to sit on THIS element, not on the row inside it: percentages
   resolve against the containing block, and only here is that the prose column.
   On the row inside, 50% would mean 50vw and cancel out to nothing. */
.appstrip-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding-left: max(1rem, calc(50vw - 50%));
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 0.25rem;
}
.appstrip-bleed::-webkit-scrollbar {
  display: none;
}

.appstrip {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: max-content;
  padding-right: 1.5rem;
}
.appstrip figure {
  margin: 0;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.appstrip img {
  display: block;
  height: 260px;
  width: auto;
  max-width: none;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
}
@media (max-width: 700px) {
  .appstrip img { height: 200px; }
}
`;

export default function AppStrip() {
  return (
    <div className="my-6">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="appstrip-bleed">
        <div className="appstrip">
          {APPS.map((app) => (
            <figure key={app.label}>
              <ZoomableImage src={app.src} alt={`${app.label} interface`} />
              <figcaption className="flex items-baseline gap-1.5 font-mono text-[11px] tracking-wide text-[var(--foreground)]/45">
                {app.label}
                {app.note && (
                  <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--foreground)]/25">
                    {app.note}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
