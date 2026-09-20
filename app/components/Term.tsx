"use client";

import { useState, type ReactNode } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { AnimatePresence, motion } from "motion/react";

/**
 * An inline term that explains itself on hover.
 *
 *   <Term label="Optimistic UI">Showing the result before the server…</Term>
 *
 * Jargon a general reader won't know, without breaking the sentence to define
 * it. Also opens on click and on keyboard focus, so it isn't hover-only.
 */
export default function Term({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCardPrimitive.Root
      openDelay={100}
      closeDelay={120}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCardPrimitive.Trigger asChild>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={`${label}: what this means`}
          className="cursor-help font-[inherit] italic underline decoration-dotted decoration-[var(--foreground)]/45 underline-offset-4 transition-colors hover:decoration-[var(--foreground)]/80"
        >
          {label}
        </button>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content side="top" align="center" sideOffset={10} className="z-50">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="max-w-[19rem] rounded-xl border border-[var(--foreground)]/12 bg-[var(--background)] p-3.5 text-[13px] not-italic leading-relaxed text-[var(--foreground)]/75 shadow-xl"
              >
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--foreground)]/40">
                  {label}
                </span>
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
