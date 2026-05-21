import React from "react";
import { Link } from "next-view-transitions";
import { getBlogPosts } from "@/lib/mdx";
import { ChevronRight } from "lucide-react";

const Blogs = () => {
  const posts = getBlogPosts();

  const devPosts = [
    {
      title: "AMM [ Automated Market Maker ]",
      img: "/blogs/AMM.webp",
      slug: "AMM",
      date: "Sep 1, 2025",
    },
    {
      title: "ReVanced — The Art of Digital Reverse Engineering",
      img: "/blogs/Revanced.webp",
      slug: "ReVanced",
      date: "Sep 2, 2025",
    },
  ];

  return (
    <main className="w-full max-w-2xl flex-1 flex flex-col ">
      <section className="flex flex-col text-[var(--foreground)] w-full">
        <h1 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Writing
        </h1>

        <div className="flex flex-col w-full">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-4 border-b border-[var(--foreground)]/5 last:border-0 transition-colors"
            >
              <span className="text-sm md:text-xl font-bold flex items-center gap-0.5">
                {/* <ChevronRight className="md:size-6 size-4 opacity-0 blur-[10px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-200 ease-out shrink-0" /> */}
                <span
                  className="text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 transition-colors"
                  style={{ viewTransitionName: `post-title-${post.slug}` }}
                >
                  {post.title}
                </span>
              </span>
              <span className="text-xs text-[var(--foreground)]/40 shrink-0">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col text-[var(--foreground)] w-full mt-8">
        <h1 className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          For Devs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {devPosts.map((post, index) => (
            <Link
              key={index}
              href={`/${post.slug}`}
              className="flex flex-col gap-3 group"
            >
              <div className="h-fit rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-contain transition-transform duration-300 "
                />
              </div>
              <h3 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)]/70 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blogs;
