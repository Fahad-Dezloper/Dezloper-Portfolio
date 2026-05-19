import React from "react";
import Link from "next/link";

const Blogs = () => {
  // Placeholder blog posts matching the visual vibe
  const posts = [
    {
      title: "how are you doing",
      date: "Jan 18, 2026",
      slug: "#",
    },
    {
      title: "For Devs",
      date: "Dec 10, 2025",
      slug: "#",
    },
    {
      title: "Project One overview",
      date: "Nov 05, 2025",
      slug: "#",
    },
  ];

  return (
    <main className="w-full max-w-2xl flex-1 flex flex-col ">
      <section className="flex flex-col text-[var(--foreground)] w-full">
        <h1 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Writing
        </h1>

        <div className="flex flex-col w-full">
          {posts.map((post, index) => (
            <Link
              key={index}
              href={post.slug}
              className="group py-3 flex justify-between items-baseline gap-4 border-b border-[var(--foreground)]/5 last:border-0 transition-colors"
            >
              <span className="font-medium group-hover:text-[var(--foreground)]/70 transition-colors">
                {post.title}
              </span>
              <span className="text-xs text-[var(--foreground)]/40 shrink-0">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blogs;
