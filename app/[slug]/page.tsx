import { getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";
import { mdxComponents } from "@/app/components/mdx-components";
import { writingSlugs } from "@/app/components/Writtings";
import { LEGACY_WRITING_SLUGS, writingPath } from "@/lib/writing-routes";
import { notFound, permanentRedirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  // Writings are served under /writing, so they are not built here.
  return getBlogPosts()
    .filter((post) => !writingSlugs.includes(post.slug))
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  // Writings live at /writing/<slug>. Old top-level links (including the
  // pre-rename /Density) still resolve, permanently, to their new address.
  const writingSlug =
    LEGACY_WRITING_SLUGS[resolvedParams.slug] ??
    (writingSlugs.includes(resolvedParams.slug) ? resolvedParams.slug : null);
  if (writingSlug) {
    permanentRedirect(writingPath(writingSlug));
  }

  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full max-w-2xl flex-1 flex flex-col">
      <article className="flex flex-col w-full">
        <header className="mb-10">
          <Link
            href="/"
            className="text-sm whitespace-nowrap md:text-2xl flex items-center font-bold text-[var(--foreground)] mb-2"
          >
            <ChevronLeft className="md:size-6 size-4" />
            <span style={{ viewTransitionName: `post-title-${resolvedParams.slug}` }}>
              {post.metadata.title}
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-[var(--foreground)]/50">
            <time>{post.metadata.date}</time>
          </div>
        </header>

        <div className="flex flex-col">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        light: "github-light",
                        dark: "github-dark-dimmed",
                      },
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}
