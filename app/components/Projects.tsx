export default function Projects() {
  const projects = [
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
    {
      title: "Project One",
      desc: "Short description that can wrap to two lines.",
      color: "bg-blue-100",
    },
  ];

  return (
    <section className="w-full max-w-none self-stretch py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
          Projects
        </h2>
      </div>
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {projects.map((item, index) => (
            <article
              key={index}
              className="flex w-[min(280px,85vw)] shrink-0 flex-col gap-3"
            >
              <div
                className={`aspect-4/4 w-full rounded-2xl ${item.color} dark:bg-zinc-800`}
              />
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <span
                  className="shrink-0 text-neutral-900 dark:text-white"
                  aria-hidden
                >
                  ↗
                </span>
              </div>
              <p className="text-left text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
