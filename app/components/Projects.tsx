export default function Projects() {
  const projects = [
    {
      title: "CEX",
      desc: "A high-performance centralized crypto exchange on Solana with MPC wallets. Provides real-time order matching and low latency.",
      color: "bg-blue-100",
      link: "https://github.com/Fahad-Dezloper/CEX",
      video: "", // Add a URL here later
    },
    {
      title: "AllSolana",
      desc: "High-density index of active repositories on Solana. Discover and contribute to top open-source projects in the ecosystem.",
      color: "bg-green-100",
      link: "https://github.com/Fahad-Dezloper/AllSolana",
      video: "", // Add a URL here later
    },
  ];

  return (
    <section className="w-full max-w-none self-stretch py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
          Projects
        </h2>
      </div>
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {projects.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="flex w-[min(280px,85vw)] shrink-0 flex-col gap-3 group"
            >
              <div
                className={`aspect-5/4 w-full rounded-2xl ${item.color} dark:bg-zinc-800 overflow-hidden relative`}
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
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white group-hover:underline decoration-neutral-300 dark:decoration-zinc-600 underline-offset-4">
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
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
