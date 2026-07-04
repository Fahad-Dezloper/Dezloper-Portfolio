"use client";

import { Scroll } from "@silk-hq/components";
import "@silk-hq/components/unlayered-styles.css";
import type { ReactNode } from "react";

/**
 * Replaces native page scrolling with Silk's spring-driven scroll container —
 * the same "native page scroll replacement" the reference site uses.
 *
 * `nativePageScrollReplacement="auto"` enables it on desktop (where the smooth
 * scroll matters) and falls back to native scroll on mobile browsers so their
 * URL-bar chrome keeps expanding/collapsing normally.
 *
 * The page-frame styling (min height, padding, centering) lives inside
 * `Scroll.Content` because Silk fixes the scroll view to the viewport, which
 * bypasses any padding/layout set on <body>.
 */
export default function SilkScroll({ children }: { children: ReactNode }) {
  return (
    <Scroll.Root>
      <Scroll.View pageScroll nativePageScrollReplacement="auto">
        <Scroll.Content>{children}</Scroll.Content>
      </Scroll.View>
    </Scroll.Root>
  );
}
