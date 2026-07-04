import re

with open("app/components/Experiences.tsx", "r") as f:
    content = f.read()

# 1. Add imports
content = content.replace(
    '"use client";\nimport { useState } from "react";',
    '"use client";\nimport { useState } from "react";\nimport { motion, AnimatePresence } from "motion/react";'
)

# 2. Fix the allExperiences logic
content = content.replace(
    '''  const allExperiences = [...professionalExperince];
  const visibleExperiences = showAll
    ? allExperiences
    : allExperiences.slice(0, 3);''',
    '''  const allExperiences = [...professionalExperince];'''
)

# 3. Define ExperienceItemComponent at the bottom
card_comp = """
const ExperienceItemComponent = ({ item }: { item: ExperienceItem }) => (
  <article className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
    {item.dates && (
      <div className="w-full sm:w-28 shrink-0 text-sm font-medium text-secondary pt-0.5">
        {item.dates}
      </div>
    )}
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2.5">
        {item.logo ? (
          <img
            src={item.logo}
            alt=""
            className="size-5 shrink-0 border border-border"
          />
        ) : (
          <div className="w-6 h-6 rounded bg-[var(--foreground)]/10 shrink-0" />
        )}
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex relative items-center -gap-1 group hover:opacity-80 transition-opacity"
          >
            <span className="text-base font-semibold text-foreground group-hover:underline">
              {item.title}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right size-3 inline -translate-y-2 translate-x-0.5 text-muted-foreground md:opacity-80 scale-60 group-hover:scale-100 group-hover:opacity-100 transition-[opacity,scale] origin-bottom-left ease-out"
              aria-hidden="true"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold text-foreground">
              {item.title}
            </span>
          </div>
        )}
      </div>
      {(item.description || item.bullets) && (
        <div className="text-[15px] leading-relaxed text-[var(--foreground)]/70 mt-1">
          {item.description && <p>{item.description}</p>}
          {item.bullets && (
            <ul className="list-disc ml-4 mt-2 space-y-1">
              {item.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  </article>
);
"""
content += card_comp

# 4. Replace the map with the new logic
target_map = '''        <div className="flex flex-col gap-10">
          {visibleExperiences.map((item, index) => (
            <article
              key={index}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start"
            >
              {item.dates && (
                <div className="w-full sm:w-28 shrink-0 text-sm font-medium text-secondary pt-0.5">
                  {item.dates}
                </div>
              )}
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center gap-2.5">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      className="size-5 shrink-0 border border-border"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-[var(--foreground)]/10 shrink-0" />
                  )}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex relative items-center -gap-1 group hover:opacity-80 transition-opacity"
                    >
                      <span className="text-base font-semibold text-foreground group-hover:underline">
                        {item.title}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-arrow-up-right size-3 inline -translate-y-2 translate-x-0.5 text-muted-foreground md:opacity-80 scale-60 group-hover:scale-100 group-hover:opacity-100 transition-[opacity,scale] origin-bottom-left ease-out"
                        aria-hidden="true"
                      >
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </a>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-semibold text-foreground">
                        {item.title}
                      </span>
                    </div>
                  )}
                </div>
                {(item.description || item.bullets) && (
                  <div className="text-[15px] leading-relaxed text-[var(--foreground)]/70 mt-1">
                    {item.description && <p>{item.description}</p>}
                    {item.bullets && (
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        {item.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>'''

new_map = '''        <div className="flex flex-col gap-10">
          {allExperiences.slice(0, 3).map((item, index) => (
            <ExperienceItemComponent key={index} item={item} />
          ))}
          
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-10 overflow-hidden"
              >
                {allExperiences.slice(3).map((item, index) => (
                  <ExperienceItemComponent key={index + 3} item={item} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>'''

content = content.replace(target_map, new_map)

with open("app/components/Experiences.tsx", "w") as f:
    f.write(content)

print("done")
