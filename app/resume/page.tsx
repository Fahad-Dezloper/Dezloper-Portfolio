import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";

/**
 * The resume, shown in the page rather than handed over as a download.
 *
 * Two renderings, because one does not cover both cases. On a wide screen the
 * PDF itself is embedded, so the native viewer's zoom, search and print come
 * for free. On a phone that embed is a blank rectangle: the viewport is far
 * too narrow for an A4 page and mobile browsers often refuse to inline a PDF
 * at all. There the page shows a render of the sheet instead, which tapping
 * opens, and <object>'s own children stay as the last fallback.
 */

const FILE = "/Fahad-Khan-Resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Fahad Khan, Full Stack Web3 Engineer. Trading interfaces, wallets and Solana infrastructure.",
};

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={15}
      height={15}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M3.5 16.5v1.5A2.5 2.5 0 0 0 6 20.5h12a2.5 2.5 0 0 0 2.5-2.5v-1.5" />
    </svg>
  );
}

export default function ResumePage() {
  return (
    <main className="flex w-full max-w-4xl flex-1 flex-col px-4 pt-[120px] pb-16 md:pt-[160px] md:px-0">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col">
          <Link
            href="/"
            className="-ml-2 flex w-fit items-center gap-2 rounded-2xl p-2 font-bold text-foreground transition-[background-color] hover:bg-[var(--foreground)]/5"
          >
            Fahad Khan
          </Link>
          <span className="text-secondary">
            Full Stack Web3 Engineer. Trading interfaces, wallets and Solana
            infrastructure.
          </span>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={FILE}
            download="Fahad-Khan-Resume.pdf"
            className="flex items-center gap-1.5 rounded-xl bg-[var(--foreground)]/5 px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
          >
            <DownloadIcon />
            Download
          </a>
          <a
            href={FILE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[var(--foreground)]/5 px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
          >
            Open in new tab
          </a>
        </div>
      </div>

      {/* Wide screens: the real PDF, with the viewer's own controls. */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.02] md:block">
        <object
          data={FILE}
          type="application/pdf"
          aria-label="Fahad Khan's resume"
          className="block h-[min(82vh,1100px)] w-full"
        >
          <div className="flex flex-col items-start gap-3 p-8">
            <p className="text-secondary">
              Your browser will not show a PDF in the page. Open it in its own
              tab, or download it.
            </p>
            <a
              href={FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[var(--foreground)]/5 px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
            >
              Open the resume
            </a>
          </div>
        </object>
      </div>

      {/* Phones: a render of the page, which opens the PDF when tapped. An
          embedded PDF here is an empty box, which reads as a broken page. */}
      <a
        href={FILE}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block overflow-hidden rounded-2xl border border-[var(--foreground)]/10 md:hidden"
      >
        <Image
          src="/resume-preview.png"
          alt="Fahad Khan's resume"
          width={1600}
          height={2262}
          priority
          className="h-auto w-full"
        />
      </a>

    </main>
  );
}
