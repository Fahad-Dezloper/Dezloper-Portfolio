"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import Hero from "./components/Hero";
import Experiences from "./components/Experiences";
import FunExperiences from "./components/FunExperiences";
import Projects from "./components/Projects";
import Experiments from "./components/Experiments";

export default function HomeShell({ writings }: { writings: ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SilkScroll hijacks native scrolling into a custom element.
    // We must find it so framer-motion can attach its scroll listeners there instead of the window.
    const silkScrollContainer = document.querySelector(
      '[data-silk~="c2"]',
    ) as HTMLElement;
    setContainer(silkScrollContainer || document.documentElement);
    setMounted(true);
  }, []);

  if (!mounted || !container) {
    // SSR / First frame fallback before we find the scroll container
    return (
      <div className="font-sans w-full bg-black flex flex-col">
        <div className="flex w-full pb-[150px] overflow-hidden flex-col gap-10 bg-white flex-1 items-center justify-center">
          <Hero />
          <Experiences />
          <FunExperiences />
          <div className="w-full">
            <Projects />
          </div>
        </div>
        <div className="w-full mt-10">
          <Experiments />
        </div>
      </div>
    );
  }

  return <AnimatedHome scrollContainer={container} writings={writings} />;
}

function AnimatedHome({
  scrollContainer,
  writings,
}: {
  scrollContainer: HTMLElement;
  writings: ReactNode;
}) {
  const projectsRef = useRef<HTMLDivElement>(null);

  // If we fell back to documentElement, we want to tell framer-motion to use the window (undefined)
  const isWindow = scrollContainer === document.documentElement;
  const containerRef = useRef(scrollContainer);

  const { scrollYProgress, scrollY } = useScroll({
    container: isWindow ? undefined : containerRef,
  });

  // Write the debug readout straight to the DOM via refs. Using setState here
  // would re-render AnimatedHome (and every child section) on EVERY scroll
  // frame, which is what makes scrolling feel heavy. Motion values update the
  // text off the React render loop, so scrolling triggers zero re-renders and
  // stays as smooth as Silk's native replacement allows.
  const progressRef = useRef<HTMLSpanElement>(null);
  const pixelsRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (progressRef.current)
      progressRef.current.textContent = latest.toFixed(4);
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pixelsRef.current)
      pixelsRef.current.textContent = `${latest.toFixed(0)}px`;
  });

  // Using the exact scroll boundaries you found!
  const scale = useTransform(scrollYProgress, [0.53, 0.7033], [1, 0.93]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.517, 0.7033],
    ["0rem", "2.5rem"],
  );

  return (
    <div className="font-sans w-full bg-black flex flex-col relative">
      {/* <div className="fixed bottom-10 right-10 bg-black/80 text-green-400 font-mono text-sm p-4 rounded-xl z-50 border border-green-400/30 backdrop-blur-md">
        <div>
          Scroll Progress (0 to 1): <span ref={progressRef}>0.0000</span>
        </div>
        <div>
          Scroll Pixels: <span ref={pixelsRef}>0px</span>
        </div>
      </div> */}

      <motion.div
        // style={{ borderRadius, scale }}
        className="flex w-full pb-[150px] overflow-hidden flex-col gap-10 bg-white flex-1 items-center justify-center"
      >
        <Hero />
        <Experiences />
        <FunExperiences />
        <Projects />
        {/* <div ref={projectsRef} className="w-full"> */}
        {writings}
        {/* </div> */}
      </motion.div>
      {/* <div className="w-full mt-10">
        <Experiments />
      </div> */}
    </div>
  );
}
