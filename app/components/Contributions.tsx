import { Link } from "next-view-transitions";

export default function Contributions() {
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
      desc: "The universal data bridge for Solana. Making on-chain data accessible to every developer.",
      link: "https://github.com/SolixDB/app/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/solix.webp",
    },
    {
      title: "Pillar",
      desc: "Open-source operations platform for running Solana validators — at one node or fleet scale.",
      link: "https://github.com/niks3089/pillar/pulls?q=is%3Apr+is%3Aclosed+author%3AFahad-Dezloper",
      img: "/OSC/Pillar.webp",
    },
  ];

  return (
    <section id="contribute" className="w-full max-w-none self-stretch">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Companies I have Contributed to
        </h2>
      </div>
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {contributions.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[min(200px,35vw)] md:w-[min(200px,15vw)] xl:w-[200px] shrink-0 flex-col gap-3 group"
            >
              <div
                className={`w-full aspect-3/3 md:aspect-2/2 xl:aspect-4/4 rounded-2xl overflow-hidden bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 flex items-center justify-center`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-left text-base font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 group-hover:underline transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-left text-sm leading-snug text-[var(--foreground)]/70">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
