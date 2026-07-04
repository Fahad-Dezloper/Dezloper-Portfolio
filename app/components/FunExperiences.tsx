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
  // smallImage?: string;
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
      image: "/Highlight/superdevs.png",
      className: "bg-blue-500",
      // smallImage: "/experiences/STIndia.webp",
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
      image: "/Highlight/graduation.png",
      className: "bg-green-500",
      // smallImage: "/experiences/100xDevs.webp",
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
      id: "superteam",
      title: "Startup Village 2026 Resident",
      dates: "May 15 - May 25",
      image: "/Highlight/STeam.png",
      className: "bg-blue-500",
      // smallImage: "/experiences/STIndia.webp",
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
      id: "athena",
      title: "Athena Hacker House",
      dates: "Nov 2025 – Present",
      image: "/Highlight/Athena.png",
      className: "bg-orange-500",
      // smallImage: "/experiences/athena.webp",
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
    <section className="w-full pt-[80px] max-w-none self-stretch">
      <div className="w-full overflow-x-auto scrolll pb-2 pt-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-1 sm:gap-2 items-end">
          {experiences.map((item, index) => {
            const heights = [
              "h-[220px] sm:h-[300px]",
              "h-[170px] sm:h-[240px]",
              "h-[140px] sm:h-[300px]",
              "h-[180px] sm:h-[280px]",
            ];
            return (
              <div
                key={index}
                className="flex rounded-xl overflow-hidden flex-col relative shrink-0 group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-auto max-w-none transition-transform duration-300 ${heights[index % 4]}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
