import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { WritingSheet, type CoverKey } from "./PageFromBottom/WritingSheet";
import { mdxComponents } from "./mdx-components";
import { getBlogPostBySlug } from "@/lib/mdx";
import { getHeadings, readPost } from "@/lib/mdx-blocks";

/**
 * The writing list. Every card opens its post from content/blogs inside the
 * sheet.
 *
 * This is a server component, so MDX is compiled here and passed into the
 * client sheet as an already-rendered node.
 */

type Writing = {
  title: string;
  slug?: string;
  cover?: CoverKey;
};

const writings: Writing[] = [
  {
    title: "Dissecting Complex Interfaces",
    slug: "Dissecting",
    cover: "dissecting",
  },
  {
    title: "ReVanced: Art of Digital Reverse Engineering",
    slug: "ReVanced",
    cover: "revanced",
  },
];

/** Writings that live at /slug. The post route uses this to open the sheet. */
export const writingSlugs = writings.flatMap((w) => (w.slug ? [w.slug] : []));

const Writtings = ({ openSlug }: { openSlug?: string }) => {
  return (
    <section className="w-full pt-[56px] md:pt-[80px] max-w-none self-stretch overflow-hidden">
      <div className="mx-auto max-w-xl px-4 md:px-0">
        <h2 className="mb-8">Writing</h2>
      </div>

      <div className="w-full overflow-x-auto scrolll pb-8 pt-2 pl-4 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4 items-start">
          {writings.map((item, i) => {
            const post = item.slug ? getBlogPostBySlug(item.slug) : null;
            const source = item.slug ? readPost(item.slug) : null;

            return (
              <WritingSheet
                key={i}
                title={item.title}
                slug={item.slug}
                cover={item.cover}
                date={post?.metadata.date}
                headings={source ? getHeadings(source.body) : []}
                defaultOpen={!!item.slug && item.slug === openSlug}
                content={
                  post ? (
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
                  ) : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Writtings;
