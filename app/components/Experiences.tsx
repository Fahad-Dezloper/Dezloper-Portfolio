type ExperienceItem = {
  id: string;
  title: string;
  dates?: string;
  description?: string;
  bullets?: string[];
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
      id: "x2c",
      title: "Frontend Lead · X2C.fun",
      dates: "Nov 2025 – Present",
    },
    {
      id: "artizence",
      title: "Frontend Lead · Artizence Systems LLP",
      dates: "Feb 2025 – Apr 2025",
    },
    {
      id: "read-rise",
      title: "Manager · Read & Rise",
      dates: "Sep 2022 – Oct 2023",
    },
  ];

  const experiences: FunExperienceItem[] = [
    {
      id: "superteam",
      title: "Startup Village 2026 Resident",
      dates: "May 15 - May 25",
      image: "/experiences/startupVillage.png",
      className: "bg-blue-500",
      smallImage: "/experiences/STIndia.png",
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
      title: "Solana Superdevs Fellowship · Graduate",
      dates: "Sept – Dec",
      bullets: [
        "Graduated in the top 20 out of 2500.",
        "Learned and built on Solana (Rust), including private key management.",
        "Convocation at Ahmedabad Startup Village.",
      ],
      image: "/experiences/superdevs.png",
      className: "bg-green-500",
      smallImage: "/experiences/100xDevs.png",
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
      image: "/experiences/athena2.png",
      className: "bg-orange-500",
      smallImage: "/experiences/athena.png",
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
    //   image: "/experiences/athena.png",
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

  const renderTitle = (title: string) => {
    const parts = title.split(" · ");
    if (parts.length === 2) {
      return (
        <div className="text-base">
          <span className="font-medium">{parts[0]}</span>
          <span className="text-[var(--foreground)]/50 text-sm">
            {" · " + parts[1]}
          </span>
        </div>
      );
    }
    return (
      <div className="text-base">
        <span className="font-medium text-xs">{title}</span>
      </div>
    );
  };

  return (
    <section className="w-full max-w-none self-stretch py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Cool Experience I have had
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {allExperiences.map((item, index) => (
            <article key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline gap-4">
                {renderTitle(item.title)}
                {item.dates && (
                  <span className="text-xs text-[var(--foreground)]/40 shrink-0">
                    {item.dates}
                  </span>
                )}
              </div>
            </article>
          ))}
          <div className="flex w-full gap-4 pb-4 mt-2">
            {/* {experiences.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-${item.width} absolute h-40 overflow-hidden rounded-xl ${item.className} `}
                  style={{
                    zIndex: item.config?.zIndex,
                    transform: `translateX(${item.config?.x}px) translateY(${item.config?.y}px) rotate(${item.config?.rotate}deg)`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`object-${item.object} w-full h-full `}
                  />
                </div>
              );
            })} */}
            {experiences.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col relative gap-2.5 shrink-0 group mt-6"
                >
                  <div className="absolute z-10 w-10 h-10 rounded-md overflow-hidden -top-5 left-2 transition-transform duration-300 group-hover:-translate-y-3">
                    <img
                      src={item.smallImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-60 h-40 z-20 relative overflow-hidden rounded-md bg-[var(--foreground)]/5 border border-[var(--foreground)]/5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-300 "
                    />
                  </div>

                  <div className="flex flex-col gap-0.5 px-0.5">
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
      </div>
    </section>
  );
}
