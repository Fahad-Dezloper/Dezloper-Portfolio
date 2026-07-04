"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type ExperienceItem = {
  id: string;
  title: string;
  dates?: string;
  description?: string;
  bullets?: string[];
  logo?: string;
  link?: string;
};

export default function Experiences() {
  const [showAll, setShowAll] = useState(false);

  const professionalExperince: ExperienceItem[] = [
    {
      id: "Swish",
      title: "Swish.cash",
      dates: "June 2026 - Present",
      description:
        "Privacy consumer app on Solana | Owned the backend end-to-end, building the auto-routing engine, SDK, and relayer infrastructure to aggregate multiple privacy protocols.",
      link: "https://swish.cash/",
      logo: "/companies/Swish2.png",
    },
    {
      id: "x2c",
      title: "X2C.fun",
      dates: "Nov 2025 – Present",
      description:
        "Web3 game studio | Owned the frontend across Farcaster mini apps, web games, the Skins NFT marketplace, user game dashboard, and the company website.",
      link: "https://www.x2c.fun/",
      logo: "/companies/x2c.png",
    },
    {
      id: "food-for-thought",
      title: "Food For Thought Fest",
      dates: "Freelance",
      description:
        "India's biggest food festival | Built a comprehensive website covering all aspects of the event, including the food, thought, and fun fest verticals.",
      link: "https://foodforthoughtfest.in/",
      logo: "/companies/FoodFest.png",
    },
    {
      id: "ascomp",
      title: "Ascomp INC",
      dates: "Freelance",
      description:
        "India's leading projector supplier for PVR Cinemas | Developed a robust CRM for administrators and engineers to manage projector maintenance and AMCs, featuring customizable forms, automated workflows, and comprehensive payment tracking.",
      link: "",
      logo: "/companies/Ascomp.png",
    },
    {
      id: "haute-services",
      title: "Haute Services",
      dates: "Freelance",
      description:
        "Premium boutique consultancy firm | Built a full-stack website highlighting the firm's three distinct verticals—Hospitality Consulting, Lifestyle Events, and Art Advisory—while maintaining an authentic and premium brand aesthetic.",
      link: "https://hauteservices.in/",
      logo: "/companies/Haute.png",
    },
    {
      id: "artizence",
      title: "Artizence Systems LLP",
      dates: "Feb 2025",
      description:
        "Web2 SaaS agency | Built CRM frontends for multiple client products using Next.js, focusing on scalable and reusable interfaces.",
      link: "",
      logo: "/companies/Artizence.png",
    },
    {
      id: "read-rise",
      title: "Read & Rise",
      dates: "2022 – 2023",
      description:
        "Independent bookstore | Managed the website and day-to-day operations, maintained a 50,000+ book catalog, and oversaw inventory, sales, and customer retention.",
      link: "",
      logo: "/companies/readrise.png",
    },
  ];

  const allExperiences = [...professionalExperince];

  return (
    <section className="w-full max-w-none self-stretch">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-8">
          Cool Experience I have had
        </h2>
        <div className="flex flex-col gap-10">
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
        </div>
        {allExperiences.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-8 w-fit mx-auto flex items-center justify-center gap-2 rounded-xl bg-[var(--foreground)]/5 px-3 py-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-all hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
          >
            {showAll ? "View less" : "View more"}
          </button>
        )}
      </div>
    </section>
  );
}

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
