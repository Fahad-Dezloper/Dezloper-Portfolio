import { Children, type ReactNode } from "react";

/**
 * Lays out figures side by side in MDX, stacking again on narrow screens.
 *
 *   <Row>
 *
 *   ![one](/a.webp)
 *
 *   ![two](/b.webp)
 *
 *   </Row>
 *
 * The blank lines matter — they're what makes MDX parse the images as markdown
 * rather than as literal text inside the JSX block.
 */
export default function Row({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(
    (child) => typeof child !== "string" || child.trim() !== ""
  );

  return (
    <div className="my-6 flex flex-wrap items-start gap-3 [&_img]:!my-0 [&_img]:!w-full [&_p]:!mb-0">
      {items.map((child, i) => (
        <div key={i} className="min-w-0 flex-1 basis-64">
          {child}
        </div>
      ))}
    </div>
  );
}
