import type { Metadata } from "next";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getBooksFromNotion, type Book } from "@/lib/notion-books";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Books people re-read",
  description:
    "A living list of books worth returning to — powered by Notion and ISR.",
};

function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-zinc-900/90 ring-1 ring-zinc-800">
      <a
        href={book.notionUrl}
        target="_blank"
        rel="noreferrer"
        className="relative flex aspect-[3/4] w-full items-center justify-center bg-zinc-800/80 p-2"
      >
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 20vw, 12vw"
            unoptimized
          />
        ) : (
          <span className="px-3 text-center text-xs text-zinc-500">{book.title}</span>
        )}
      </a>
      <div className="flex items-end justify-between gap-2 px-2.5 py-2">
        <h3 className="min-w-0 flex-1 truncate text-left text-xs font-medium text-zinc-100">
          {book.title}
        </h3>
        <span
          className="shrink-0 whitespace-nowrap text-xs tabular-nums text-zinc-400"
          title="Times suggested / re-read"
        >
          🔥 {book.count}
        </span>
      </div>
    </article>
  );
}

export default async function BooksPage() {
  const updatedAt = new Date();
  let books: Book[] = [];
  let loadError: string | null = null;

  try {
    books = await getBooksFromNotion();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Could not load books from Notion.";
  }

  return (
    <div className="w-[calc(100%+3rem)] max-w-[100vw] -mx-6 bg-neutral-950 px-6 pb-16 pt-2 text-zinc-100">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Books people re-read
        </h1>
        <p className="mt-3 text-xs text-zinc-500">
          <span className="text-zinc-400">@dezloperr</span>
          {" · "}
          <time dateTime={updatedAt.toISOString()}>
            {formatDistanceToNow(updatedAt, { addSuffix: true })}
          </time>
          {" · "}
          <span>ISR · revalidate {revalidate}s</span>
        </p>

        <div className="mx-auto mt-8 max-w-xl space-y-4 text-left text-sm leading-relaxed text-zinc-300">
          <p>
            This page is backed by a Notion database: add a row, drop a cover, bump a counter — the
            site picks it up on the next regeneration without a deploy.
          </p>
          <p>
            Each card pulls the page title, cover (page cover or a &quot;Cover&quot; files column),
            and a number column for the 🔥 count (try naming it{" "}
            <span className="font-mono text-zinc-400">Count</span>,{" "}
            <span className="font-mono text-zinc-400">Re-reads</span>, or{" "}
            <span className="font-mono text-zinc-400">Votes</span>).
          </p>
          <p className="text-zinc-500">
            Uses <code className="rounded bg-zinc-900 px-1 py-0.5 font-mono text-[0.8rem]">@notionhq/client</code>{" "}
            against <code className="rounded bg-zinc-900 px-1 py-0.5 font-mono text-[0.8rem]">NOTION_DATA_SOURCE</code>{" "}
            with incremental static regeneration so the grid stays fresh.
          </p>
        </div>
      </header>

      {loadError ? (
        <div className="mx-auto mt-12 max-w-lg rounded-xl border border-amber-900/60 bg-amber-950/40 px-4 py-3 text-center text-sm text-amber-100/90">
          {loadError}
        </div>
      ) : books.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md text-center text-sm text-zinc-500">
          No books in this data source yet. Add pages to your Notion database and they will show up
          after the next revalidation.
        </p>
      ) : (
        <div className="mx-auto mt-12 w-full max-w-6xl">
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(7.5rem, 1fr))",
            }}
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
