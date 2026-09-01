import { slugify } from "@/lib/mdx-blocks";
import TabularDemo from "@/app/components/TabularDemo";
import FlashDemo from "@/app/components/FlashDemo";
import DensityAxis from "@/app/components/DensityAxis";
import AppStrip from "@/app/components/AppStrip";
import Row from "@/app/components/Row";
import Term from "@/app/components/Term";
import Aside from "@/app/components/Aside";
import ZoomableImage from "@/app/components/ZoomableImage";

/**
 * One MDX renderer shared by the /[slug] route and the writing sheet, so a post
 * looks identical wherever it is opened.
 */

/** Headings can hold inline markup, so pull the text out of nested children. */
function textOf(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: unknown } }).props?.children);
  }
  return "";
}

export const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4" {...props} />
  ),
  h2: ({ children, ...props }: any) => {
    const id = slugify(textOf(children));
    return (
      <h2
        id={id || undefined}
        className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4 scroll-mt-8"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: (props: any) => (
    <h3 className="text-lg font-bold text-[var(--foreground)] mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-[var(--foreground)]/80 leading-relaxed mb-4 text-base" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-[var(--foreground)] underline decoration-[var(--foreground)]/30 underline-offset-4 hover:decoration-[var(--foreground)]/70 transition-colors"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-5 mb-4 text-[var(--foreground)]/80 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-5 mb-4 text-[var(--foreground)]/80 space-y-2" {...props} />
  ),
  li: (props: any) => <li className="pl-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-[var(--foreground)]/20 pl-4 italic text-[var(--foreground)]/60 my-6"
      {...props}
    />
  ),
  code: (props: any) => {
    // rehype-pretty-code marks real code blocks with data-language
    if (props["data-language"]) return <code {...props} />;
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
    <ZoomableImage
      className="max-w-full h-auto rounded-xl my-6 border border-[var(--foreground)]/5 object-cover"
      {...props}
    />
  ),
  // Interactive figures available to any .mdx file in content/blogs
  TabularDemo,
  FlashDemo,
  DensityAxis,
  AppStrip,
  Row,
  Term,
  Aside,
};
