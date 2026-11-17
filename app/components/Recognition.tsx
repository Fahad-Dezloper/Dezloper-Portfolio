"use client";

import { useRef } from "react";
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

type RecognitionItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  width?: string;
  bullets?: string[];
  className?: string;
  object?: string;
  objectPosition?: string;
  video?: string;
  // smallImage?: string;
  link?: string;
  config?: {
    y: number;
    x: number;
    zIndex: number;
    rotate: number;
  };
};

export default function Recognition() {
  const experiences: RecognitionItem[] = [
    {
      id: "superteam",
      title: "Startup Village Resident",
      image: "/Highlight/superdevs.png",
      className: "bg-blue-500",
      video: "/experiences/videos/sv.mp4",
      // smallImage: "/experiences/STIndia.webp",
      width: "60",
      object: "cover",
      link: "https://x.com/SuperteamIN/status/2056052264603947245?s=20",
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
      bullets: [
        "Graduated in the top 20 out of 2500.",
        "Learned and built on Solana (Rust), including private key management.",
        "Convocation at Ahmedabad Startup Village.",
      ],
      image: "/Highlight/graduation.png",
      className: "bg-green-500",
      video: "/experiences/videos/sdvid.mp4",
      // smallImage: "/experiences/100xDevs.webp",
      width: "60",
      object: "cover",
      objectPosition: "top",
      link: "https://x.com/SuperteamIN/status/1987555281283510517?s=20",
      config: {
        y: 18,
        x: 265,
        zIndex: 20,
        rotate: -3,
      },
    },
    {
      id: "superteam-member",
      title: "Superteam India Member",
      image: "/Highlight/STeam.png",
      className: "bg-blue-500",
      // smallImage: "/experiences/STIndia.webp",
      video: "/experiences/videos/svfriends.mp4",
      width: "60",
      object: "cover",
      link: "https://x.com/SuperteamIN/status/2057138549942837653?s=20",
      config: {
        y: 4,
        x: 25,
        zIndex: 10,
        rotate: -3,
      },
    },
  ];

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const playVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  // Pause only — leaving currentTime alone so the clip doesn't snap back to
  // frame 0 while it is still fading out.
  const pauseVideo = (index: number) => {
    videoRefs.current[index]?.pause();
  };

  return (
    <section className="w-full pt-[56px] md:pt-[80px] max-w-none self-stretch">
      <div className="mx-auto max-w-xl px-4 md:px-0">
        <h2 className="mb-8" {...intro(7)}>Recognition</h2>
      </div>

      <div className="w-full overflow-x-auto scrolll pb-2 pt-2 pl-4 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-1 sm:gap-2 items-end" {...intro(8)}>
          {experiences.map((item, index) => {
            const heights = [
              "h-[220px] sm:h-[300px]",
              "h-[170px] sm:h-[240px]",
              "h-[140px] sm:h-[300px]",
              "h-[180px] sm:h-[280px]",
            ];
            const media = (
              <span className="relative block w-fit overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-auto max-w-none transition-transform duration-300 ${heights[index % 4]}`}
                />
                {item.video && (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </span>
            );

            return (
              <div
                key={index}
                onMouseEnter={() => playVideo(index)}
                onMouseLeave={() => pauseVideo(index)}
                className="group flex shrink-0 flex-col gap-2.5"
              >
                {/* A photo alone does not say what the recognition was, so each
                    card is captioned: what it is, and when. */}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2.5"
                  >
                    {media}
                    <span className="flex w-0 min-w-full flex-col gap-0.5 px-0.5">
                      <h3 className="text-left text-base font-medium text-secondary transition-colors group-hover:text-[var(--foreground)] group-hover:underline">
                        {item.title}
                        <ArrowUpRight />
                      </h3>
                    </span>
                  </a>
                ) : (
                  <>
                    {media}
                    <span className="flex w-0 min-w-full flex-col gap-0.5 px-0.5">
                      <h3 className="text-left text-base font-medium text-secondary">
                        {item.title}
                      </h3>
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
