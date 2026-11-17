import { intro } from "./intro";

function ArrowUpRight() {
  return (
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
}

type Project = {
  title: string;
  desc: string;
  /** Where the project lives for now, until its in-depth page exists. */
  link?: string;
  underConstruction?: boolean;
};

export default function Projects() {
  const openSourceProjects: Project[] = [
    {
      title: "PerpExchange",
      desc: "Crypto Perpetual Futures Exchange",
      link: "https://github.com/Fahad-Dezloper/PerpExchange",
    },
    {
      title: "Wallet",
      desc: "A Privy-like embedded wallet infrastructure.",
      underConstruction: true,
    },
    {
      title: "Solana OSS",
      desc: "Active Solana Open Source Projects",
      link: "https://www.solanaoss.com/",
    },
  ];

  return (
    <section className="w-full pt-[56px] md:pt-[80px] max-w-none self-stretch ">
      <div className="mx-auto max-w-xl px-4 md:px-0">
        <h2 className=" mb-10" {...intro(9)}>Projects</h2>

        {/* Text Projects List */}
        <div className="flex flex-col gap-6 group/list">
          {openSourceProjects.map((item, index) => {
            const inner = (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex relative items-center -gap-1">
                    <h3 className="text-base text-foreground transition-colors duration-300 group-hover/list:text-secondary group-hover/item:!text-foreground ">
                      {item.title}
                    </h3>
                    {item.link && <ArrowUpRight />}
                  </div>
                  {item.underConstruction && (
                    <span className="rounded-full border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-2 py-0.5 text-[11px] font-medium leading-none text-[var(--foreground)]/60">
                      Under construction
                    </span>
                  )}
                </div>
                <p className="leading-snug text-secondary transition-colors duration-300 group-hover/list:text-secondary/50 group-hover/item:!text-secondary">
                  {item.desc}
                </p>
              </>
            );

            return item.link ? (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 group/item cursor-pointer text-left"
                {...intro(10 + index)}
              >
                {inner}
              </a>
            ) : (
              <div
                key={item.title}
                className="flex flex-col gap-1.5 group/item cursor-default text-left"
                {...intro(10 + index)}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
