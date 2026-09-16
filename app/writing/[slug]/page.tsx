import { notFound } from "next/navigation";
import HomeShell from "@/app/HomeShell";
import Writtings, { writingSlugs } from "@/app/components/Writtings";
import { getBlogPostBySlug } from "@/lib/mdx";

/**
 * /writing/<slug>: the home page with that writing's sheet already open.
 *
 * Opening a writing from the list pushes this URL, so loading it directly (a
 * refresh, a shared link) has to land on the same view rather than a separate
 * article page.
 */

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return writingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = writingSlugs.includes(slug) ? getBlogPostBySlug(slug) : null;
  if (!post) return { title: "Post Not Found" };

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

export default async function WritingPage({ params }: Params) {
  const { slug } = await params;
  if (!writingSlugs.includes(slug) || !getBlogPostBySlug(slug)) notFound();

  return <HomeShell writings={<Writtings openSlug={slug} />} />;
}
