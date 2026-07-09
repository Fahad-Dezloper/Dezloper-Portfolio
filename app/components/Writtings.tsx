import React from "react";

const Writtings = () => {
  const writings = [
    {
      title: "Painting Pixel, Web vs App",
      type: "Thesis",
      image: "", // Placeholder for your image
      bg: "bg-[#e5e5e5]",
    },
    {
      title: "Dissecting Complex Interfaces",
      type: "",
      image: "", // Placeholder for your image
      bg: "bg-[#715456]",
    },
    {
      title: "Moving from screens to air",
      type: "Thesis",
      image: "", // Placeholder for your image
      bg: "bg-[#d4d4ce]",
    },
    {
      title: "Philosphies I live by",
      type: "",
      image: "", // Placeholder for your image
      bg: "bg-[#e5e5e5]",
    },
  ];

  return (
    <section className="w-full pt-[80px] max-w-none self-stretch overflow-hidden">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-8">Writing</h2>
      </div>

      <div className="w-full overflow-x-auto scrolll pb-8 pt-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4 items-end">
          {writings.map((item, i) => (
            <div
              key={i}
              className={`w-[220px] md:w-[290px] shrink-0 h-[360px] rounded-3xl relative overflow-hidden group cursor-pointer ${item.bg}`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 p-5 flex flex-col gap-1 w-full text-white">
                <h3 className="font-medium text-xl leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writtings;
