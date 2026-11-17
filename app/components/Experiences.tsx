"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { intro } from "./intro";

type ExperienceItem = {
  id: string;
  title: string;
  dates?: string;
  /** What the company is, in a few muted words under its name. */
  kind?: string;
  /** Prose. Wrap a figure in ** ** to set it in full ink, after the way
   *  francescomusso.com carries its numbers: muted sentence, hard number. */
  description?: string;
  bullets?: string[];
  logo?: string;
  link?: string;
};

export default function Experiences() {
  const [showAll, setShowAll] = useState(false);

  const professionalExperince: ExperienceItem[] = [
    {
      id: "x2c",
      title: "X2C.fun",
      dates: "Nov 2025 – Nov 2026",
      kind: "Web3 gaming studio",
      // Players and plays are x2c.fun's own counters, read off the live page
      // (63,929 and 346,282 on 17 Nov 2026) and rounded down with a plus,
      // because they climb and an exact figure goes stale the week after it
      // is written. Revenue is Fahad's own figure; the site does not publish
      // one.
      description:
        "Managed design across the studio's games and surfaces, from the NFT marketplace and mini apps to casino and web games, the company site and the player dashboard.\n\nThose games have since drawn **63,000+** players and **346,000+** plays, and taken **$60,000+** in revenue.",
      link: "https://www.x2c.fun/",
      logo: "/companies/x2c.png",
    },
    {
      id: "Swish",
      title: "Swish.cash",
      dates: "June 2026 - August 2026",
      kind: "Privacy consumer app on Solana",
      // Fahad's own figures. The last one is deliberately phrased as having
      // happened since, not because of: the app kept growing after he left and
      // the sentence should not quietly take credit for that.
      description:
        "Decoupled the auto-routing engine, SDK and relayer infrastructure from the Next.js app into a standalone backend, then migrated the web and mobile clients onto it as a single shared service.\n\nTotal volume went from **$4,000** to **$10,000** over those months, and has since passed **$100,000**.",
      link: "https://swish.cash/",
      logo: "/companies/swish2.png",
    },
    {
      id: "food-for-thought",
      title: "Food For Thought Fest",
      dates: "Freelance",
      kind: "South Asian culinary festival",
      // The festival's own published figures, from the "Our Impact" block on
      // foodforthoughtfest.in. They belong to the fest, not to the website, so
      // the sentence credits the fest with them.
      description:
        "Built the site covering the food, thought and fun verticals.\n\nRunning since 2015, the fest has drawn **150+** celebrity chefs and speakers from **15+** countries and **150,000+** food enthusiasts across its editions.",
      link: "https://foodforthoughtfest.in/",
      logo: "/companies/FoodFest.png",
    },
    {
      id: "ascomp",
      title: "Ascomp INC",
      dates: "Freelance",
      kind: "Projector supplier to PVR Cinemas",
      description:
        "Developed a CRM for administrators and engineers to manage projector maintenance and AMCs, with customisable forms, automated workflows and comprehensive payment tracking.",
      link: "",
      logo: "/companies/Ascomp.png",
    },
    {
      id: "haute-services",
      title: "Haute Services",
      dates: "Freelance",
      kind: "Premium boutique consultancy",
      description:
        "Built a full stack website across the firm's three verticals, hospitality consulting, lifestyle events and art advisory, keeping the brand's own premium register throughout.",
      link: "https://hauteservices.in/",
      logo: "/companies/Haute.png",
    },
    {
      id: "artizence",
      title: "Artizence Systems LLP",
      dates: "Feb 2025",
      kind: "Web2 SaaS agency",
      description:
        "Built CRM frontends for several client products in Next.js, focusing on scalable and reusable interfaces.",
      link: "",
      logo: "/companies/Artizence.png",
    },
    {
      id: "read-rise",
      title: "Read & Rise",
      dates: "2022 – 2023",
      kind: "Independent bookstore",
      description:
        "Managed the website and the day to day running of the shop, maintained a **50,000+** book catalogue, and oversaw inventory, sales and customer retention.",
      link: "",
      logo: "/companies/readrise.png",
    },
  ];

  // Open source work sits under Experience rather than beside Projects: it is
  // the same claim as a job, made with somebody else's repository, and it
  // reads as a continuation of the record above it rather than a new topic.
  const contributions = [
    {
      title: "Antiwork",
      desc: "Sell your stuff. See what sticks.",
      link: "https://github.com/antiwork/gumboard/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/antiwork.webp",
    },
    {
      title: "Zero",
      desc: "An open source Gmail alternative for the future of email",
      link: "https://github.com/Mail-0/Zero/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/zero2.webp",
    },
    {
      title: "Cal",
      desc: "Scheduling infrastructure for absolutely everyone",
      link: "https://github.com/calcom/cal.diy/pulls/Fahad-Dezloper",
      img: "/OSC/cal.webp",
    },
    {
      title: "Solix",
      desc: "The universal data bridge for Solana",
      link: "https://github.com/SolixDB/app/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/solix.webp",
    },
    {
      title: "Pillar",
      desc: "Operations platform for running Solana validators",
      link: "https://github.com/niks3089/pillar/pulls?q=is%3Apr+is%3Aclosed+author%3AFahad-Dezloper",
      img: "/OSC/pillar.webp",
    },
  ];

  const allExperiences = [...professionalExperince];

  return (
    <section className="w-full max-w-none self-stretch">
      <div className="mx-auto max-w-xl px-4 md:px-0">
        <h2 className="mb-10" {...intro(9)}>Experience</h2>
        <div className="flex flex-col">
          {allExperiences.slice(0, 3).map((item, index) => (
            <div key={index} className={index !== 0 ? "mt-10" : ""} {...intro(9 + index)}>
              <ExperienceItemComponent item={item} />
            </div>
          ))}

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col overflow-hidden"
              >
                {allExperiences.slice(3).map((item, index) => (
                  <div key={index + 3} className="pt-10">
                    <ExperienceItemComponent item={item} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {allExperiences.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            {...intro(9)}
            className="mt-8 w-fit mx-auto flex items-center justify-center gap-2 rounded-xl bg-[var(--foreground)]/5 px-3 py-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-all hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
          >
            {showAll ? "View less" : "View more"}
          </button>
        )}

        {/* The label belongs to the column, so it lines up with the prose. */}
        <p className="mt-12 text-sm text-secondary" {...intro(12)}>
          Contributions
        </p>
      </div>

      {/* The strip runs outside the column and past both edges of it, the way
          it did as its own section: it scrolls rather than wraps, so the row
          stays one line however many repositories end up on it. */}
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-4 md:pl-[max(1rem,calc((100vw-42rem)/1.7-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4" {...intro(12)}>
          {contributions.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[140px] md:w-[160px] shrink-0 flex-col gap-2.5 group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
                />
              </div>
              <div className="flex items-center -gap-1">
                <h3 className="text-left text-base font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 group-hover:underline transition-colors">
                  {item.title}
                </h3>
                <ContributionArrow />
              </div>
              <p className="text-left text-sm leading-snug text-[var(--foreground)]/70">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * `**like this**` comes out in full ink against the muted sentence around it.
 * A figure that matters should be the thing the eye lands on without the
 * paragraph having to stop and make a table of it.
 */
const Highlight = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, i) =>
      i % 2 ? (
        <strong
          key={i}
          className="font-semibold tracking-tight text-[var(--foreground)]"
        >
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </>
);

const ContributionArrow = () => (
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
);

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
      {item.kind && <p className="-mt-1 text-sm text-secondary">{item.kind}</p>}

      {(item.description || item.bullets) && (
        <div className="text-[15px] leading-relaxed text-[var(--foreground)]/70 mt-1">
          {item.description && (
            // A blank line in the string starts a new paragraph. The figures
            // used to ride on the end of the prose, which on a phone left
            // three of them stacked on consecutive lines with nowhere to
            // breathe; given their own paragraph they read as a result rather
            // than as the tail of a sentence.
            <div className="space-y-4">
              {item.description.split("\n\n").map((para, i) => (
                <p key={i}>
                  <Highlight text={para} />
                </p>
              ))}
            </div>
          )}
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
