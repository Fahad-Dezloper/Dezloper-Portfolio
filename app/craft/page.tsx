export default function CraftPage() {
  const crafts = [
    {
      title: "Dynamic Island",
      date: "October 2025",
      video: "/Craft/dynamicIsland.mp4",
      link: "#",
    },
    {
      title: "Notification Bell",
      date: "November 2025",
      video: "/Craft/bell.mp4",
      link: "#",
    },
    {
      title: "Gooey Interaction",
      date: "December 2025",
      video: "/Craft/Gooey.mp4",
      link: "#",
    },
    {
      title: "Interface Craft",
      date: "January 2026",
      video: "/Craft/InterfaceCraft.mp4",
      link: "#",
    },
    {
      title: "Smoothness",
      date: "February 2026",
      video: "/Craft/smoothness.mp4",
      link: "#",
    },
  ];

  return (
    <main className="w-full max-w-none">
      <div className="px-4 sm:px-0">
        <div className="columns-3 gap-4 space-y-4">
          {crafts.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block break-inside-avoid overflow-hidden rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/5"
            >
              <div className="absolute inset-x-0 top-0 z-10 flex justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-b from-black/50 to-transparent">
                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                <span className="text-xs text-white/70">{item.date}</span>
              </div>
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
