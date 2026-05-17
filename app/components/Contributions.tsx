import Link from "next/link";

export default function Contributions() {
  const contributions = [
    {
      title: "Antiwork",
      desc: "Sell your stuff. See what sticks.",
      link: "https://github.com/antiwork/gumboard/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/antiwork.png",
    },
    {
      title: "Zero",
      desc: "An Open-Source Gmail Alternative for the Future of Email",
      link: "https://github.com/Mail-0/Zero/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/zero2.png",
    },
    {
      title: "Cal",
      desc: "Scheduling infrastructure for absolutely everyone.",
      link: "https://github.com/calcom/cal.diy/pulls/Fahad-Dezloper",
      img: "/OSC/cal.png",
    },
    {
      title: "Solix",
      desc: "The universal data bridge for Solana. Making on-chain data accessible to every developer.",
      link: "https://github.com/SolixDB/app/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/solix.png",
    },
  ];

  return (
    <section id="contribute" className="w-full max-w-none self-stretch py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
          Companies I have Contributed to
        </h2>
      </div>
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-[max(1rem,calc((100vw-42rem)/2-0.4rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {contributions.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[min(280px,85vw)] shrink-0 flex-col gap-3 group"
            >
              <div
                className={`aspect-2/2 w-full rounded-2xl overflow-hidden dark:bg-zinc-800`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-101"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white group-hover:underline underline-offset-4">
                  {item.title}
                </h3>
              </div>
              <p className="text-left text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
