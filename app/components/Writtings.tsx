import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { WritingSheet } from "./PageFromBottom/WritingSheet";
import { mdxComponents } from "./mdx-components";
import { getBlogPostBySlug } from "@/lib/mdx";
import { getHeadings, readPost } from "@/lib/mdx-blocks";

/**
 * The writing list. Cards with a `slug` open the real post inside the sheet;
 * the rest open an empty sheet until they are written.
 *
 * This is a server component, so MDX is compiled here and passed into the
 * client sheet as an already-rendered node.
 */

const writings = [
  { title: "Painting Pixel, Web vs App", type: "Thesis", image: "", bg: "bg-[#e5e5e5]" },
  { title: "Dissecting Complex Interfaces", type: "", image: "", bg: "bg-[#715456]", slug: "Density" },
  { title: "Moving from screens to air", type: "Thesis", image: "", bg: "bg-[#d4d4ce]" },
  { title: "Philosphies I live by", type: "", image: "", bg: "bg-[#e5e5e5]" },
];


const Writtings = () => {
  return (
    <section className="w-full pt-[80px] max-w-none self-stretch overflow-hidden">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-8">Writing</h2>
      </div>

      <div className="w-full overflow-x-auto scrolll pb-8 pt-2 md:pl-[max(1rem,calc((100vw-42rem)/2-1.6rem))] pr-4 [scrollbar-width:thin]">
        <div className="flex w-max gap-4 items-end">
          {writings.map((item, i) => {
            const post = item.slug ? getBlogPostBySlug(item.slug) : null;
            const source = item.slug ? readPost(item.slug) : null;

            return (
              <WritingSheet
                key={i}
                title={item.title}
                slug={item.slug}
                type={item.type}
                bg={item.bg}
                image={item.image}
                date={post?.metadata.date}
                headings={source ? getHeadings(source.body) : []}
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
