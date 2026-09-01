/**
 * The products from the density axis, shown at one shared height.
 *
 * Widths are left alone on purpose — a payments app really is a narrow column
 * and a terminal really is a wide grid, so the silhouettes carry part of the
 * argument before you read a single label.
 */

const APPS = [
  { src: "/blogs/density/cashapp.webp", label: "Cash App", note: "sparse" },
  { src: "/blogs/density/wise.webp", label: "Wise", note: "sparse" },
  { src: "/blogs/density/aavemarkets.webp", label: "Aave", note: "" },
  { src: "/blogs/density/jupiterpro.webp", label: "Jupiter Pro", note: "" },
  { src: "/blogs/density/backpackterminal.webp", label: "Backpack", note: "dense" },
];

const HEIGHT = 168;

export default function AppStrip() {
  return (
    <div className="my-6">
      <div className="flex flex-wrap items-end gap-2.5">
        {APPS.map((app) => (
          <figure key={app.label} className="m-0 flex flex-col gap-1.5">
            <img
              src={app.src}
              alt={`${app.label} interface`}
              style={{ height: HEIGHT, width: "auto" }}
              className="!my-0 rounded-md border border-[var(--foreground)]/10 object-cover"
            />
            <figcaption className="flex items-baseline gap-1.5 font-mono text-[10px] tracking-wide text-[var(--foreground)]/45">
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
  );
}
