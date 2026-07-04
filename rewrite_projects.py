import re

with open("app/components/Projects.tsx", "r") as f:
    content = f.read()

# Replace videoProjects array with contributions array
contributions_array = """
  const contributions = [
    {
      title: "Antiwork",
      desc: "Sell your stuff. See what sticks.",
      link: "https://github.com/antiwork/gumboard/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/antiwork.webp",
    },
    {
      title: "Zero",
      desc: "An Open-Source Gmail Alternative for the Future of Email",
      link: "https://github.com/Mail-0/Zero/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/zero2.webp",
    },
    {
      title: "Cal",
      desc: "Scheduling infrastructure for absolutely everyone.",
      link: "https://github.com/calcom/cal.diy/pulls/Fahad-Dezloper",
      img: "/OSC/cal.webp",
    },
    {
      title: "Solix",
      desc: "The universal data bridge for Solana. ",
      link: "https://github.com/SolixDB/app/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed",
      img: "/OSC/solix.webp",
    },
    {
      title: "Pillar",
      desc: "Operations platform for running Solana validators",
      link: "https://github.com/niks3089/pillar/pulls?q=is%3Apr+is%3Aclosed+author%3AFahad-Dezloper",
      img: "/OSC/Pillar.webp",
    },
  ];
"""

# We need to find the videoProjects definition and replace it.
# The user's latest patch shows videoProjects is uncommented lines 22-45.
# Let's search for "const videoProjects =" up to "];"
video_projects_pattern = re.compile(r'  const videoProjects = \[\s*\{[\s\S]*?\}\,\s*\];', re.MULTILINE)
content = video_projects_pattern.sub(contributions_array.strip(), content)

# Now we need to replace the commented out Video Projects Carousel HTML with the contributions HTML.
contributions_html = """
      {/* Contributions Carousel */}
      <div className="mt-4 w-full overflow-x-auto scrolll pb-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4">
          {contributions.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[min(200px,35vw)] md:w-[min(200px,15vw)] xl:w-[200px] shrink-0 flex-col gap-3 group"
            >
              <div
                className={`w-full aspect-3/3 md:aspect-2/2 xl:aspect-4/4 rounded-2xl overflow-hidden bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 flex items-center justify-center`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
                />
              </div>
              <div className="flex items-center -gap-1">
                <h3 className="text-left text-base font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 group-hover:underline transition-colors">
                  {item.title}
                </h3>
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
              </div>
              <p className="text-left text-sm leading-snug text-[var(--foreground)]/70">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
"""

# Look for the Video Projects Carousel section
# "      {/* Video Projects Carousel */}" up to "</div>" before "</section>"
video_carousel_pattern = re.compile(r'\s*\{\/\* Video Projects Carousel \*\/\}[\s\S]*?(?=\s*<\/section>)', re.MULTILINE)
content = video_carousel_pattern.sub(contributions_html, content)

with open("app/components/Projects.tsx", "w") as f:
    f.write(content)

print("done")
