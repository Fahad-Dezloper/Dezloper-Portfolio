import React from "react";

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
  objectPosition?: string;
  smallImage?: string;
  config?: {
    y: number;
    x: number;
    zIndex: number;
    rotate: number;
  };
};

export default function FunExperiences() {
  const experiences: FunExperienceItem[] = [
    {
      id: "superteam",
      title: "Startup Village 2026 Resident",
      dates: "May 15 - May 25",
      image: "/experiences/startupVillage.png",
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
      image: "/experiences/superdevsfellow.webp",
      className: "bg-green-500",
      smallImage: "/experiences/100xDevs.webp",
      width: "60",
      object: "cover",
      objectPosition: "top",
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
  ];

  return (
    <section className="w-full max-w-none self-stretch">
      <div className="w-full overflow-x-auto scrolll pb-2 pt-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {experiences.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col relative gap-2.5 shrink-0 group mt-6"
              >
                {/* <div className="absolute z-10 w-10 h-10 rounded-md overflow-hidden -top-5 left-2 transition-transform duration-300 md:group-hover:-translate-y-3 md:-translate-y-0 -translate-y-3 shadow-md border border-[var(--foreground)]/10">
                  <img
                    src={item.smallImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div> */}
                <div className="w-[min(240px,75vw)] aspect-video z-20 relative overflow-hidden rounded-md bg-[var(--foreground)]/5 border border-[var(--foreground)]/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300"
                    style={{ objectPosition: item.objectPosition || "center" }}
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
