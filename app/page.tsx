"use client";

import { useEffect, useRef, useState } from "react";
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

export default function Home() {
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

  return <AnimatedHome scrollContainer={container} />;
}

function AnimatedHome({ scrollContainer }: { scrollContainer: HTMLElement }) {
  const projectsRef = useRef<HTMLDivElement>(null);

  // If we fell back to documentElement, we want to tell framer-motion to use the window (undefined)
  const isWindow = scrollContainer === document.documentElement;
  const containerRef = useRef(scrollContainer);

  const { scrollYProgress, scrollY } = useScroll({
    container: isWindow ? undefined : containerRef,
  });

  const [progress, setProgress] = useState(0);
  const [pixels, setPixels] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setPixels(latest);
  });

  // Using the exact scroll boundaries you found!
  const scale = useTransform(scrollYProgress, [0.6358, 0.9004], [1, 0.93]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.6358, 0.9004],
    ["0rem", "2.5rem"],
  );

  return (
    <div className="font-sans w-full bg-black flex flex-col relative">
      {/* <div className="fixed bottom-10 right-10 bg-black/80 text-green-400 font-mono text-sm p-4 rounded-xl z-50 border border-green-400/30 backdrop-blur-md">
        <div>Scroll Progress (0 to 1): {progress.toFixed(4)}</div>
        <div>Scroll Pixels: {pixels.toFixed(0)}px</div>
      </div> */}

      <motion.div
        style={{ borderRadius, scale }}
        className="flex w-full pb-[150px] overflow-hidden flex-col gap-10 bg-white flex-1 items-center justify-center"
      >
        <Hero />
        <Experiences />
        <FunExperiences />
        <div ref={projectsRef} className="w-full">
          <Projects />
        </div>
      </motion.div>
      <div className="w-full mt-10">
        <Experiments />
      </div>
    </div>
  );
}
