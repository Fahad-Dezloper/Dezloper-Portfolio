type ExperienceItem = {
  id: string;
  title: string;
  dates?: string;
  description?: string;
  bullets?: string[];
  logo?: string;
  link?: string;
};
type FunExperienceItem = {
  id: string;
  title: string;
  dates?: string;
  description?: string;
  image?: string;
  width?: string;
  bullets?: string[];
  className?: string;
  object?: string;
  smallImage?: string;
  config?: {
    y: number;
    x: number;
    zIndex: number;
    rotate: number;
  };
};

export default function Experiences() {
  const professionalExperince: ExperienceItem[] = [
    {
      id: "Swish",
      title: "Swish.cash",
      dates: "June 2026 - Present",
      description:
        "Building the next generation of fun frontend experiences. Managed a team of developers and led architectural decisions.",
      link: "https://swish.cash/",
      logo: "/companies/Swish2.png",
    },
    {
      id: "x2c",
      title: "X2C.fun",
      dates: "Nov 2025 – Present",
      description:
        "Building the next generation of fun frontend experiences. Managed a team of developers and led architectural decisions.",
      link: "https://www.x2c.fun/",
      logo: "/companies/x2c.png",
    },
    {
      id: "artizence",
      title: "Artizence Systems LLP",
      dates: "Feb 2025",
      description:
        "Led frontend development for various client projects. Focused on performance optimization and scalable component architecture.",
      link: "",
      logo: "/companies/Artizence.png",
    },
    {
      id: "read-rise",
      title: "Read & Rise",
      dates: "2022 – 2023",
      description:
        "Managed operations and coordinated teams to deliver educational resources. Streamlined internal processes for better efficiency.",
      link: "",
      logo: "/companies/readrise.png",
    },
  ];

  const experiences: FunExperienceItem[] = [
    {
      id: "superteam",
      title: "Startup Village 2026 Resident",
      dates: "May 15 - May 25",
      image: "/experiences/startupVillage.webp",
      className: "bg-blue-500",
      smallImage: "/experiences/STIndia.webp",
      width: "60",
      object: "cover",
      config: {
        y: 4,
        x: 25,
        zIndex: 10,
        rotate: -3,
      },
    },
    {
      id: "superdevs",
      title: "Solana Superdevs Fellowship",
      dates: "Sept – Dec",
      bullets: [
        "Graduated in the top 20 out of 2500.",
        "Learned and built on Solana (Rust), including private key management.",
        "Convocation at Ahmedabad Startup Village.",
      ],
      image: "/experiences/superdevs.webp",
      className: "bg-green-500",
      smallImage: "/experiences/100xDevs.webp",
      width: "60",
      object: "cover",
      config: {
        y: 18,
        x: 265,
        zIndex: 20,
        rotate: -3,
      },
    },
    {
      id: "athena",
      title: "Athena Hacker House",
      dates: "Nov 2025 – Present",
      image: "/experiences/athena2.webp",
      className: "bg-orange-500",
      smallImage: "/experiences/athena.webp",
      width: "40",
      object: "cover",
      config: {
        y: 24,
        x: 420,
        zIndex: 30,
        rotate: 5,
      },
    },
    // {
    //   id: "athena",
    //   title: "Full Fledged Athena FOSS Member",
    //   dates: "Aug – Present",
    //   description:
    //     "Elite developer community of 300 cracked devs (160/300 members).",
    //   image: "/experiences/athena.webp",
    //   className: "bg-red-500",
    //   width: "40",
    //   object: "cover",
    //   config: {
    //     y: 4,
    //     x: 500,
    //     zIndex: 40,
    //     rotate: 3,
    //   },
    // },
  ];

  const allExperiences = [...professionalExperince];

  return (
    <section className="w-full max-w-none self-stretch">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-8">
          Cool Experience I have had
        </h2>
        <div className="flex flex-col gap-10">
          {allExperiences.map((item, index) => (
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
                      <span className="text-[17px] font-semibold text-foreground group-hover:underline">
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
                      <span className="text-[17px] font-semibold text-foreground">
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
        </div>
      </div>

      <div className="mt-8 w-full overflow-x-auto scrolll pb-2 pt-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {experiences.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col relative gap-2.5 shrink-0 group mt-6"
              >
                <div className="absolute z-10 w-10 h-10 rounded-md overflow-hidden -top-5 left-2 transition-transform duration-300 md:group-hover:-translate-y-3 md:-translate-y-0 -translate-y-3 shadow-md border border-[var(--foreground)]/10">
                  <img
                    src={item.smallImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[min(240px,75vw)] aspect-video z-20 relative overflow-hidden rounded-md bg-[var(--foreground)]/5 border border-[var(--foreground)]/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300 "
                  />
                </div>

                <div className="flex flex-col gap-0.5 px-0.5 max-w-[min(240px,75vw)] whitespace-normal">
                  <h3 className="text-sm font-medium text-[var(--foreground)] leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs text-[var(--foreground)]/50">
                    {item.dates}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
