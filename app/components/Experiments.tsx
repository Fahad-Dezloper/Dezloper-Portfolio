import React from "react";

const experimentsData = [
  {
    id: 1,
    title: "Generative Art",
    height: "h-[300px]",
    color: "bg-neutral-900",
  },
  {
    id: 2,
    title: "WebGL Shaders",
    height: "h-[200px]",
    color: "bg-neutral-800",
  },
  {
    id: 3,
    title: "Physics Engine",
    height: "h-[400px]",
    color: "bg-neutral-900",
  },
  {
    id: 4,
    title: "Micro-interactions",
    height: "h-[250px]",
    color: "bg-neutral-800",
  },
  {
    id: 5,
    title: "Motion Layouts",
    height: "h-[350px]",
    color: "bg-neutral-800",
  },
  { id: 6, title: "Raymarching", height: "h-[280px]", color: "bg-neutral-900" },
  { id: 7, title: "Fluid Sims", height: "h-[320px]", color: "bg-neutral-800" },
  {
    id: 8,
    title: "Spring Animations",
    height: "h-[240px]",
    color: "bg-neutral-900",
  },
  {
    id: 9,
    title: "Particle Systems",
    height: "h-[320px]",
    color: "bg-neutral-800",
  },
  {
    id: 10,
    title: "Interactive Typography",
    height: "h-[200px]",
    color: "bg-neutral-900",
  },
  {
    id: 11,
    title: "3D Environments",
    height: "h-[350px]",
    color: "bg-neutral-800",
  },
  {
    id: 12,
    title: "Custom Cursors",
    height: "h-[240px]",
    color: "bg-neutral-900",
  },
  {
    id: 13,
    title: "Audio Visualizers",
    height: "h-[300px]",
    color: "bg-neutral-800",
  },
  {
    id: 14,
    title: "Scroll Rigging",
    height: "h-[260px]",
    color: "bg-neutral-900",
  },
  {
    id: 15,
    title: "Gooey Effects",
    height: "h-[280px]",
    color: "bg-neutral-800",
  },
  {
    id: 16,
    title: "Bento Grids",
    height: "h-[380px]",
    color: "bg-neutral-900",
  },
];

const Experiments = () => {
  return (
    <div className="w-screen flex min-h-screen flex-col items-center py-20 pb-40">
      <div className="min-w-5xl w-full max-w-5xl">
        <h2 className="text-base font-medium text-white/50 uppercase tracking-wider mb-6">
          Experiments
        </h2>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full space-y-4">
          {experimentsData.map((item) => (
            <div
              key={item.id}
              className={`w-full ${item.height} ${item.color} rounded-2xl break-inside-avoid p-6 flex flex-col justify-end  hover:bg-neutral-700 transition-all duration-300 cursor-pointer border border-white/5`}
            >
              <h3 className="text-white/80 font-medium">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiments;
