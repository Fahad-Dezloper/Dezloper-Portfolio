import Hero from "./components/Hero";
import Experiences from "./components/Experiences";
import Projects from "./components/Projects";
import Contributions from "./components/Contributions";

export default function Home() {
  return (
    <div className="flex w-full flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-[#1C1C1C]">
      <Hero />
      <Experiences />
      <Projects />
      <Contributions />
    </div>
  );
}
