import Hero from "./components/Hero";
import Experiences from "./components/Experiences";
import FunExperiences from "./components/FunExperiences";
import Projects from "./components/Projects";
import Contributions from "./components/Contributions";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-10 flex-1 items-center justify-center font-sans">
      <Hero />
      <Experiences />
      <Projects />
      <FunExperiences />
      <Contributions />
    </div>
  );
}
