import { getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";
import { countBlocks, getEditableBlocks, readPost } from "@/lib/mdx-blocks";
import BlogEditor from "@/app/components/BlogEditor";
import { mdxComponents } from "@/app/components/mdx-components";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";

const isDev = process.env.NODE_ENV === "development";

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

  // Dev-only: work out which paragraphs are safe to edit in the browser.
  const source = isDev ? readPost(resolvedParams.slug) : null;
  const editable = source ? getEditableBlocks(source.body) : [];

  return (
    <main className="w-full max-w-2xl flex-1 flex flex-col">
      <article className="flex flex-col w-full">
        <header className="mb-10">
          <Link
            href={"/blogs"}
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

      {source && (
        <BlogEditor
          slug={resolvedParams.slug}
          blocks={editable}
          total={countBlocks(source.body)}
        />
      )}
    </main>
  );
}
