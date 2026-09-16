"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Scroll } from "@silk-hq/components";
import { PageFromBottom } from "./PageFromBottom";
import ArticleIndex from "../ArticleIndex";
import RevancedCover from "../covers/RevancedCover";
import DissectingCover from "../covers/DissectingCover";
import { writingPath } from "@/lib/writing-routes";
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

/** Interactive cover art, keyed so the server list can pick one by name. */
const COVERS = {
  revanced: RevancedCover,
  dissecting: DissectingCover,
} as const;
export type CoverKey = keyof typeof COVERS;

const WritingSheet = ({
  title,
  slug,
  cover,
  date,
  content,
  headings = [],
  defaultOpen = false,
}: {
  title: string;
  slug?: string;
  cover?: CoverKey;
  date?: string;
  content?: ReactNode;
  headings?: Heading[];
  /** True when the page was loaded at this writing's URL, e.g. after a refresh. */
  defaultOpen?: boolean;
}) => {
  const Cover = cover ? COVERS[cover] : null;
  const [presented, setPresented] = useState(defaultOpen);
  // Only step back through history if this sheet is what pushed the entry.
  const pushedRef = useRef(false);
  // Loaded straight at /slug, so there is no earlier in-app entry to go back to.
  const openedFromUrlRef = useRef(defaultOpen);

  // Lets page chrome (the toast stack) step aside while an article is open.
  useEffect(() => {
    if (!presented) return;
    document.body.classList.add("sheet-open");
    return () => document.body.classList.remove("sheet-open");
  }, [presented]);

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
        window.history.pushState({ sheet: slug }, "", writingPath(slug));
      } else if (pushedRef.current) {
        // Unwind our own entry so the URL and the back button stay in step.
        pushedRef.current = false;
        window.history.back();
      } else if (openedFromUrlRef.current) {
        // Arrived via the article URL: closing should land on the home page,
        // not step back out of the site.
        openedFromUrlRef.current = false;
        window.history.replaceState(null, "", "/");
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
        <div className="group relative aspect-[4/5] w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-[#f4f4f2] md:w-[290px]">
          {Cover && <Cover />}

          {/* Title set inside the tile. pointer-events-none so moving over it
              still reaches the cover underneath, which needs the cursor. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-balance text-[16px] font-medium leading-[1.15] md:text-[20px] text-[#161616] decoration-1 underline-offset-4 group-hover:underline">
              {title}
            </h3>
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
