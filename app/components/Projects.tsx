export default function Projects() {
  const openSourceProjects = [
    {
      title: "CEX",
      desc: "A high-performance centralized crypto exchange on Solana with MPC wallets. Provides real-time order matching and low latency.",
      link: "https://github.com/Fahad-Dezloper/CEX",
    },
    {
      title: "AllSolana",
      desc: "High-density index of active repositories on Solana. Discover and contribute to top open-source projects in the ecosystem.",
      link: "https://github.com/Fahad-Dezloper/AllSolana",
    },
  ];

  const videoProjects = [
    {
      video: "/Craft/dynamicIsland.mp4",
      link: "#",
    },
    {
      video: "/Craft/bell.mp4",
      link: "#",
    },
    {
      video: "/Craft/Gooey.mp4",
      link: "#",
    },
    {
      video: "/Craft/interfaceCraft.mp4",
      link: "#",
    },
    {
      video: "/Craft/smoothness.mp4",
      link: "#",
    },
  ];

  return (
    <section className="w-full max-w-none self-stretch ">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Projects
        </h2>

        {/* Text Projects List */}
        <div className="flex flex-col gap-6">
          {openSourceProjects.map((item, index) => (
            <div key={index} className="flex flex-col gap-1.5 group">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 transition-colors">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </a>
              </div>
              <p className="text-sm leading-snug text-[var(--foreground)]/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Projects Carousel */}
      <div className="mt-8 w-full overflow-x-auto scrolll pb-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {videoProjects.map((item, index) => (
            <div
              key={index}
              className="flex w-[min(280px,85vw)] shrink-0 flex-col gap-3 group"
            >
              <div
                className={`aspect-5/4 w-full rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 overflow-hidden relative`}
              >
                {item.video && (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover absolute inset-0"
                  />
                )}
              </div>
              {/* <div className="flex items-start justify-between gap-2">
                <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white group-hover:underline decoration-neutral-300 dark:decoration-zinc-600 underline-offset-4 font-intert">
                  {item.title}
                </h3>
                <span
                  className="shrink-0 text-neutral-900 dark:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                >
                  ↗
                </span>
              </div>
              <p className="text-left text-sm leading-snug text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {item.desc}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
