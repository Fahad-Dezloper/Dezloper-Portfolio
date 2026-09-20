import { Children, type ReactNode } from "react";

/**
 * Lays out figures side by side in MDX.
 *
 *   <Row ratios="1.76 0.54">
 *
 *   ![wide](/a.webp)
 *
 *   ![tall](/b.webp)
 *
 *   </Row>
 *
 * `ratios` are the images' width÷height. Growing each column in proportion to
 * its aspect ratio makes every image land at the same height with its natural
 * width, which is the only way a landscape and a portrait shot sit together
 * without one of them towering over the other. Omit it for equal columns.
 *
 * The blank lines matter: they are what makes MDX parse the images as markdown
 * rather than as literal text inside the JSX block.
 */
export default function Row({
  children,
  ratios,
  gap = "0.25rem",
}: {
  children: ReactNode;
  ratios?: string;
  gap?: string;
}) {
  const items = Children.toArray(children).filter(
    (child) => typeof child !== "string" || child.trim() !== ""
  );

  const weights = ratios
    ? ratios
        .trim()
        .split(/\s+/)
        .map((n) => Number(n) || 1)
    : null;

  return (
    <div
      className="my-6 flex items-stretch [&_img]:!my-0 [&_img]:!h-auto [&_img]:!w-full [&_p]:!mb-0"
      style={{ gap }}
    >
      {items.map((child, i) => (
        <div key={i} className="min-w-0" style={{ flex: `${weights?.[i] ?? 1} 1 0%` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
