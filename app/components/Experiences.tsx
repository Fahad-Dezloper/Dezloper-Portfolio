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
      image: "/experiences/superdevsfellow.png",
      className: "bg-green-500",
      width: "40",
      object: "cover",
      config: {
        y: 18,
        x: 235,
        zIndex: 20,
        rotate: -3,
      },
    },
    {
      id: "superteam",
      title: "Full Fledged Superteam Member",
      dates: "Nov 2025 – Present",
      image: "/experiences/STIndia.png",
      className: "bg-orange-500",
      width: "40",
      object: "cover",
      config: {
        y: 24,
        x: 380,
        zIndex: 30,
        rotate: 5,
      },
    },
    {
      id: "athena",
      title: "Full Fledged Athena FOSS Member",
      dates: "Aug – Present",
      description:
        "Elite developer community of 300 cracked devs (160/300 members).",
      image: "/experiences/athena.png",
      className: "bg-red-500",
      width: "40",
      object: "cover",
      config: {
        y: 4,
        x: 500,
        zIndex: 40,
        rotate: 3,
      },
    },
  ];

  const allExperiences = [...professionalExperince];

  const renderTitle = (title: string) => {
    const parts = title.split(" · ");
    if (parts.length === 2) {
      return (
        <div className="text-sm font-intert">
          <span className="font-medium">{parts[0]}</span>
          <span className="text-[#cecdc3]/50 font-bold tracking-tight text-xs">
            {" · " + parts[1]}
          </span>
        </div>
      );
    }
    return (
      <div className="text-sm">
        <span className="font-medium">{title}</span>
      </div>
    );
  };

  return (
    <section className="w-full max-w-none self-stretch py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
          Cool Experience I have had
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {allExperiences.map((item, index) => (
            <article key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline gap-4">
                {renderTitle(item.title)}
                {item.dates && (
                  <span className="text-xs text-[#cecdc3]/40 shrink-0">
                    {item.dates}
                  </span>
                )}
              </div>
            </article>
          ))}
          <div className="flex w-full h-60 items-center">
            {experiences.map((item, index) => {
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
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
