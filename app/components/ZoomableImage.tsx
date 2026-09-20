"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

/**
 * Click a figure to lift it into the middle of the screen.
 *
 * Both copies share a `layoutId`, so Motion tweens the real element between its
 * place in the article and the centred overlay rather than cross-fading two
 * separate images.
 *
 * Three details keep it from flickering:
 *
 * - The placeholder left behind is also a `motion.img`. React compares element
 *   types, so swapping it for a plain `<img>` would tear down and rebuild the
 *   DOM node, which reads as a blink at the moment of click.
 * - Only the backdrop is inside AnimatePresence. The zoomed image is not, so it
 *   unmounts the instant you close and Motion animates the inline copy back
 *   from its position. Giving it an exit fade instead would keep two elements
 *   alive under one layoutId, and Motion would drop the tween and let the
 *   inline image snap back into place.
 * - The backdrop fades in but leaves instantly. On the way out the travelling
 *   image is the inline copy, which sits inside the sheet's stacking context,
 *   while the backdrop is fixed on the body above it. Any fade-out duration at
 *   all would paint the dark layer over the image on its way home. There is no
 *   z-index that fixes this from here, so the backdrop simply goes.
 * - The overlay stops its own pointer events natively. It portals to `body`,
 *   which is outside the sheet, so without this Silk would read a click on it
 *   as a click outside the article and dismiss the whole thing.
 */
export default function ZoomableImage({
  src,
  alt = "",
  className,
  style,
  ...rest
}: {
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
} & Record<string, unknown>) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const layoutId = useId();

  useEffect(() => setMounted(true), []);

  // Escape closes the zoom and nothing else. Capture phase plus
  // stopPropagation means the sheet never sees the key, so the article stays
  // open; press Escape again with no zoom open and Silk closes it as before.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      e.preventDefault();
      setOpen(false);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  // Native listeners, so the events never reach Silk's outside-click handling.
  useEffect(() => {
    const el = overlayRef.current;
    if (!open || !el) return;
    const stop = (e: Event) => e.stopPropagation();
    const close = (e: Event) => {
      e.stopPropagation();
      setOpen(false);
    };
    el.addEventListener("pointerdown", stop);
    el.addEventListener("mousedown", stop);
    el.addEventListener("click", close);
    return () => {
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("mousedown", stop);
      el.removeEventListener("click", close);
    };
  }, [open]);

  if (!src) return null;

  const shared = { src, className, ...(rest as object) };

  return (
    <>
      {open ? (
        <motion.img
          {...shared}
          alt=""
          aria-hidden
          style={{ ...style, visibility: "hidden" }}
        />
      ) : (
        <motion.img
          {...shared}
          layoutId={layoutId}
          alt={alt}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          style={{ ...style, cursor: "zoom-in", willChange: "transform" }}
          onClick={() => setOpen(true)}
        />
      )}

      {mounted &&
        createPortal(
          <>
            {/* Fades on its own so the image never inherits an opacity tween. */}
            <AnimatePresence>
              {open && (
                <motion.div
                  key="zoom-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // Leaves at once, so it can never cover the returning image.
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 118,
                    background: "rgba(8,8,10,0.9)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Deliberately outside AnimatePresence: it must leave immediately
                so the inline copy can own the layoutId and animate home. */}
            {open && (
              <div
                ref={overlayRef}
                role="dialog"
                aria-modal="true"
                aria-label={alt || "Expanded image"}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(1rem, 4vw, 3rem)",
                  cursor: "zoom-out",
                }}
              >
                <motion.img
                  layoutId={layoutId}
                  src={src}
                  alt={alt}
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    willChange: "transform",
                    maxWidth: "100%",
                    maxHeight: "90svh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 10,
                    cursor: "zoom-out",
                  }}
                />
              </div>
            )}
          </>,
          document.body
        )}
    </>
  );
}
