"use client";

import * as React from "react";

type ExperienceItem = {
  id: string;
  title: string;
  dates?: string;
  bullets?: string[];
  description?: string;
};

export default function ExperienceAccordion({ items }: { items: ExperienceItem[] }) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => {
        const hasDetails = Boolean(
          (item.bullets && item.bullets.length > 0) || item.description
        );
        const isOpen = openId === item.id;
        const contentId = `experience-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-neutral-200 bg-white/60 p-3 dark:border-neutral-800 dark:bg-white/5"
          >
            <button
              type="button"
              onClick={() => {
                if (!hasDetails) return;
                setOpenId((prev) => (prev === item.id ? null : item.id));
              }}
              aria-expanded={hasDetails ? isOpen : undefined}
              aria-controls={hasDetails ? contentId : undefined}
              className={[
                "w-full text-left",
                "flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline",
                hasDetails ? "cursor-pointer" : "cursor-default",
              ].join(" ")}
            >
              <div className="text-base font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </div>

              <div className="flex items-center gap-2">
                {item.dates ? (
                  <div className="text-sm text-neutral-600 dark:text-neutral-300">
                    {item.dates}
                  </div>
                ) : null}

                {hasDetails ? (
                  <span
                    className={[
                      "text-sm text-neutral-500 dark:text-neutral-400",
                      "transition-transform duration-200",
                      isOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                    aria-hidden
                  >
                    ▾
                  </span>
                ) : null}
              </div>
            </button>

            {hasDetails ? (
              <div id={contentId} className={isOpen ? "mt-3" : "hidden"}>
                {item.description ? (
                  <div className="text-sm text-neutral-700 dark:text-neutral-200">
                    {item.description}
                  </div>
                ) : null}

                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-200">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

