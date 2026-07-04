import Link from "next/link";

export default function Projects() {
  const openSourceProjects = [
    {
      title: "PerpExchange",
      desc: "A perpetual futures exchange a crypto trading platform for leveraged perpetual contracts, built entirely from scratch. (Ongoing)",
      link: "https://github.com/Fahad-Dezloper/PerpExchange",
    },
    {
      title: "CEX",
      desc: "A high-performance centralized crypto exchange on Solana with MPC wallets. Provides real-time order matching and low latency.",
      link: "https://github.com/Fahad-Dezloper/CEX",
    },
    {
      title: "AllSolana",
      desc: "High-density index of active repositories on Solana. Discover and contribute to top open-source projects in the ecosystem.",
      link: "https://www.solanaoss.com/",
    },
  ];

  const contributions = [
    {
      title: "Antiwork",
      desc: "Sell your stuff. See what sticks.",
      link: "https://github.com/antiwork/gumboard/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/antiwork.webp",
    },
    {
      title: "Zero",
      desc: "An Open-Source Gmail Alternative for the Future of Email",
      link: "https://github.com/Mail-0/Zero/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/zero2.webp",
    },
    {
      title: "Cal",
      desc: "Scheduling infrastructure for absolutely everyone.",
      link: "https://github.com/calcom/cal.diy/pulls/Fahad-Dezloper",
      img: "/OSC/cal.webp",
    },
    {
      title: "Solix",
      desc: "The universal data bridge for Solana. ",
      link: "https://github.com/SolixDB/app/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/solix.webp",
    },
    {
      title: "Pillar",
      desc: "Operations platform for running Solana validators",
      link: "https://github.com/niks3089/pillar/pulls?q=is%3Apr+is%3Aclosed+author%3AFahad-Dezloper",
      img: "/OSC/Pillar.webp",
    },
  ];

  return (
    <section className="w-full pt-[80px] max-w-none self-stretch ">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Projects and Contributions
        </h2>

        {/* Text Projects List */}
        <div className="flex flex-col gap-6">
          {openSourceProjects.map((item, index) => (
            <div key={index} className="flex flex-col gap-1.5 group">
              <div className="flex items-center gap-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex relative items-center -gap-1 group hover:opacity-80 transition-opacity"
                >
                  <h3 className="text-base font-semibold text-foreground group-hover:underline">
                    {item.title}
                  </h3>
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
              </div>
              <p className="text-sm leading-snug text-[var(--foreground)]/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Contributions Carousel */}
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 md:pl-[max(1rem,calc((100vw-42rem)/1.8-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {contributions.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[140px] md:w-[160px] shrink-0 flex-col gap-2.5 group"
            >
              <div
                className={`w-full aspect-square rounded-2xl overflow-hidden bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 flex items-center justify-center`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
                />
              </div>
              <div className="flex items-center -gap-1">
                <h3 className="text-left text-base font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 group-hover:underline transition-colors">
                  {item.title}
                </h3>
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
