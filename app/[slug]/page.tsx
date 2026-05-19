import { getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";

// Custom MDX components to match the minimalist aesthetic
const components = {
  h1: (props: any) => (
    <h1
      className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-lg font-bold text-[var(--foreground)] mt-6 mb-3"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-[var(--foreground)]/80 leading-relaxed mb-4 text-base"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-[var(--foreground)] underline decoration-[var(--foreground)]/30 underline-offset-4 hover:decoration-[var(--foreground)]/70 transition-colors"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="list-disc pl-5 mb-4 text-[var(--foreground)]/80 space-y-2"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal pl-5 mb-4 text-[var(--foreground)]/80 space-y-2"
      {...props}
    />
  ),
  li: (props: any) => <li className="pl-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-[var(--foreground)]/20 pl-4 italic text-[var(--foreground)]/60 my-6"
      {...props}
    />
  ),
  code: (props: any) => {
    // If it has a data-language attribute, it's a code block from rehype-pretty-code
    if (props["data-language"]) {
      return <code {...props} />;
    }
    // Otherwise it's inline code
    return (
      <code
        className="bg-[var(--foreground)]/5 rounded-md px-1.5 py-0.5 text-sm font-mono text-[var(--foreground)]/80"
        {...props}
      />
    );
  },
  pre: (props: any) => (
    <pre
      className="rounded-xl p-4 overflow-x-auto text-sm my-6 border border-[var(--foreground)]/10"
      {...props}
    />
  ),
  img: (props: any) => (
    <img
      className="max-w-full h-auto rounded-xl my-6 border border-[var(--foreground)]/5 object-cover"
      {...props}
    />
  ),
};

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full max-w-2xl flex-1 flex flex-col">
      <article className="flex flex-col w-full">
        <header className="mb-10">
          <Link
            href={"/blogs"}
            className="text-2xl flex items-center font-bold text-[var(--foreground)] mb-2"
          >
            <ChevronLeft /> {post.metadata.title}
          </Link>
          <div className="flex items-center gap-4 text-sm text-[var(--foreground)]/50">
            <time>{post.metadata.date}</time>
          </div>
        </header>

        <div className="flex flex-col">
          <MDXRemote
            source={post.content}
            components={components}
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
