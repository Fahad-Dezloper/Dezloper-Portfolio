export default function Experiences() {
  const experiences = [
    {
      id: "x2c",
      title: "Frontend Lead · X2C.fun",
      dates: "Nov 2025 – Present",
    },
    {
      id: "superteam",
      title: "Full Fledged Superteam Member",
      dates: "Nov 2025 – Present",
    },
    {
      id: "superdevs",
      title: "Solana Superdevs Fellowship · Graduate",
      bullets: [
        "Graduated in the top 20 out of 2500.",
        "Learned and built on Solana (Rust), including private key management.",
        "Convocation at Ahmedabad Startup Village.",
      ],
    },
    {
      id: "athena",
      title: "Full Fledged Athena FOSS Member",
      dates: "Aug – Present",
      description:
        "Elite developer community of 300 cracked devs (160/300 members).",
    },
    {
      id: "artizence",
      title: "Frontend Lead · Artizence Systems LLP",
      dates: "Feb 2025 – Apr 2025",
      bullets: [
        "Built and deployed 5+ fully responsive dashboards with dynamic API integrations.",
        "Designed and implemented 24+ screens with clean UI/UX.",
        "Contributed to a modular, scalable frontend architecture.",
      ],
    },
    {
      id: "read-rise",
      title: "Manager · Read & Rise",
      dates: "Sep 2022 – Oct 2023",
      bullets: [
        "Managed and maintained the company website for performance and timely updates.",
        "Led website enhancement projects to improve UX and functionality.",
        "Handled inventory and stock management, ensuring accurate tracking and restocking.",
        "Collaborated cross-functionally to streamline operations and boost workflow efficiency.",
      ],
    },
  ];

  return (
    <section className="w-full max-w-none self-stretch py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
          Cool Experience I have had
        </h2>
      </div>
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {experiences.map((item, index) => (
            <article
              key={index}
              className="flex w-[min(340px,85vw)] shrink-0 flex-col gap-4 rounded-2xl bg-zinc-100/80 p-6 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
                {item.dates && (
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {item.dates}
                  </span>
                )}
              </div>
              
              {item.description && (
                <p className="text-left text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.description}
                </p>
              )}

              {item.bullets && (
                <ul className="text-left text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 flex flex-col gap-2 list-none m-0 p-0">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-zinc-400 dark:text-zinc-500 mt-[1px]">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
