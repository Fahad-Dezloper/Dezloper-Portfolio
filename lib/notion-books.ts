import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse, RichTextItemResponse } from "@notionhq/client";

export type Book = {
  id: string;
  title: string;
  coverUrl: string | null;
  count: number;
  notionUrl: string;
};

const COUNT_NAME_RE =
  /^(reads?|re-?reads?|votes?|count|times|suggestions?|heat|score|🔥)$/i;
const COVER_NAME_RE = /^(cover|image|thumbnail|photo)$/i;

function getNotionAuth(): string {
  const auth =
    process.env.NOTION_INTEGERAL_SECRET ?? process.env.NOTION_INTEGRATION_SECRET;
  if (!auth) {
    throw new Error(
      "Missing Notion secret: set NOTION_INTEGERAL_SECRET (or NOTION_INTEGRATION_SECRET) in .env",
    );
  }
  return auth;
}

function getDataSourceId(): string {
  const id = process.env.NOTION_DATA_SOURCE?.trim();
  if (!id) {
    throw new Error("Missing NOTION_DATA_SOURCE in .env");
  }
  return id;
}

function plainTextFromRichText(items: RichTextItemResponse[]): string {
  return items.map((t) => t.plain_text).join("").trim();
}

function titleFromPage(page: PageObjectResponse): string {
  for (const prop of Object.values(page.properties)) {
    if (prop.type === "title") {
      const t = plainTextFromRichText(prop.title);
      if (t) return t;
    }
  }
  return "Untitled";
}

function firstFileUrl(prop: {
  type: "files";
  files: Array<
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string } }
  >;
}): string | null {
  for (const f of prop.files) {
    if (f.type === "external") return f.external.url;
    if (f.type === "file") return f.file.url;
  }
  return null;
}

function numberFromProperty(prop: PageObjectResponse["properties"][string]): number | null {
  if (prop.type === "number" && prop.number !== null && prop.number !== undefined) {
    return prop.number;
  }
  if (prop.type === "formula" && prop.formula.type === "number" && prop.formula.number !== null) {
    return prop.formula.number;
  }
  return null;
}

function coverUrlFromProperties(page: PageObjectResponse): string | null {
  for (const [name, prop] of Object.entries(page.properties)) {
    if (prop.type !== "files") continue;
    if (!COVER_NAME_RE.test(name)) continue;
    const url = firstFileUrl(prop);
    if (url) return url;
  }
  for (const prop of Object.values(page.properties)) {
    if (prop.type !== "files") continue;
    const url = firstFileUrl(prop);
    if (url) return url;
  }
  return null;
}

function countFromProperties(page: PageObjectResponse): number {
  let fallback: number | null = null;
  for (const [name, prop] of Object.entries(page.properties)) {
    if (prop.type !== "number" && prop.type !== "formula") continue;
    const n = numberFromProperty(prop);
    if (n === null) continue;
    if (COUNT_NAME_RE.test(name)) return n;
    if (fallback === null) fallback = n;
  }
  return fallback ?? 0;
}

function coverFromPage(page: PageObjectResponse): string | null {
  if (page.cover) {
    if (page.cover.type === "external") return page.cover.external.url;
    if (page.cover.type === "file") return page.cover.file.url;
  }
  return coverUrlFromProperties(page);
}

export async function getBooksFromNotion(): Promise<Book[]> {
  const notion = new Client({ auth: getNotionAuth() });
  const dataSourceId = getDataSourceId();

  const rows: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
      result_type: "page",
    });

    for (const r of res.results) {
      if (isFullPage(r)) rows.push(r);
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  const books: Book[] = rows.map((page) => ({
    id: page.id,
    title: titleFromPage(page),
    coverUrl: coverFromPage(page),
    count: countFromProperties(page),
    notionUrl: page.url,
  }));

  books.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.title.localeCompare(b.title);
  });

  return books;
}
