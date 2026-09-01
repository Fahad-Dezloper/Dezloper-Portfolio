"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Scroll } from "@silk-hq/components";
import { PageFromBottom } from "./PageFromBottom";
import ArticleIndex from "../ArticleIndex";
import "./WritingSheet.css";

/**
 * Opens a writing in Silk's page-from-bottom sheet.
 *
 * The trigger card is built here rather than passed in as children. Silk's
 * Trigger uses `asChild`, which clones the trigger and composes a ref onto it,
 * and an element created in a server component cannot take one. So the card
 * arrives as plain data and the element is created on the client.
 *
 * `content` is the already-rendered article: MDX compiles on the server and is
 * handed in, which is safe because it is only placed into the tree, never
 * cloned or given a ref.
 */

type Heading = { id: string; text: string };

const WritingSheet = ({
  title,
  slug,
  type,
  bg = "bg-[#e5e5e5]",
  image,
  date,
  content,
  headings = [],
}: {
  title: string;
  slug?: string;
  type?: string;
  bg?: string;
  image?: string;
  date?: string;
  content?: ReactNode;
  headings?: Heading[];
}) => {
  const [presented, setPresented] = useState(false);
  // Only step back through history if this sheet is what pushed the entry.
  const pushedRef = useRef(false);

  // Browser back closes the sheet rather than leaving the page.
  useEffect(() => {
    const onPop = () => {
      pushedRef.current = false;
      setPresented(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const handlePresentedChange = useCallback(
    (next: boolean) => {
      setPresented(next);
      if (!slug) return;

      if (next) {
        pushedRef.current = true;
        window.history.pushState({ sheet: slug }, "", `/${slug}`);
      } else if (pushedRef.current) {
        // Unwind our own entry so the URL and the back button stay in step.
        pushedRef.current = false;
        window.history.back();
      }
    },
    [slug]
  );

  return (
    <PageFromBottom.Root
      presented={presented}
      onPresentedChange={handlePresentedChange}
    >
      <PageFromBottom.Trigger asChild>
        <div
          className={`w-[220px] md:w-[290px] shrink-0 h-[360px] rounded-3xl relative overflow-hidden group cursor-pointer ${bg}`}
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 p-5 flex flex-col gap-1 w-full text-white">
            <h3 className="font-medium text-xl leading-snug">{title}</h3>
            {type && <p className="text-white/60 text-sm">{type}</p>}
          </div>
        </div>
      </PageFromBottom.Trigger>
      <PageFromBottom.Portal>
        <PageFromBottom.View>
          <PageFromBottom.Backdrop />
          <PageFromBottom.Content>
            <Scroll.Root asChild>
              <Scroll.View className="WritingSheet-scrollView" scrollGestureTrap={true}>
                <Scroll.Content asChild>
                  <article className="WritingSheet-article">
                    <div className="WritingSheet-layout">
                      <aside className="WritingSheet-index">
                        <div className="WritingSheet-indexInner">
                          <ArticleIndex headings={headings} />
                        </div>
                      </aside>

                      <div className="WritingSheet-main">
                        <header>
                          <PageFromBottom.Title className="WritingSheet-title" asChild>
                            <h1>{title}</h1>
                          </PageFromBottom.Title>
                          {date && <div className="WritingSheet-date">{date}</div>}
                        </header>

                        <div className="WritingSheet-body">
                          {content ?? (
                            <p className="WritingSheet-empty">
                              This one isn&apos;t written yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Scroll.Content>
              </Scroll.View>
            </Scroll.Root>
          </PageFromBottom.Content>
        </PageFromBottom.View>
      </PageFromBottom.Portal>
    </PageFromBottom.Root>
  );
};

export { WritingSheet };
