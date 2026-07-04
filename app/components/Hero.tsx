"use client";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [unblurredCrafting, setUnblurredCrafting] = useState(false);
  const [unblurredProtocols, setUnblurredProtocols] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("fahadkhann0204@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="flex flex-1 max-w-xl pt-[200px] w-full flex-col items-center sm:items-start">
      <div className="flex flex-col gap-3 text-[var(--foreground)]/70 leading-relaxed text-[15px] sm:text-base">
        <div className="flex w-full  justify-between items-end  gap-3 sm:gap-0">
          <div className="flex flex-col">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                }
                const audio = new Audio("/sound/FAHHH (Meme Sound Effect).mp3");
                audio.play().catch(console.error);
              }}
              className="hover:bg-[var(--foreground)]/5 text-foreground p-2 rounded-2xl flex gap-2 items-center -ml-2 transition-[background-color] w-fit font-bold"
            >
              Fahad Khan
            </Link>
            <p className="text-secondary">Updated 4th July, 2026</p>
          </div>

          <button
            onClick={handleCopy}
            className="group flex items-center gap-2 rounded-xl bg-[var(--foreground)]/5 px-3 py-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-all hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
          >
            <span>fahadkhann0204@gmail.com</span>
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                className={`absolute transition-all duration-300 ${
                  copied
                    ? "scale-0 opacity-0 blur-[10px]"
                    : "scale-100 opacity-100 blur-0"
                }`}
              >
                <Copy size={14} />
              </span>
              <span
                className={`absolute transition-all duration-300 ${
                  copied
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-0 opacity-0 blur-[10px]"
                }`}
              >
                <Check size={14} />
              </span>
            </span>
          </button>
        </div>

        <p className="pt-[20px] leading-relaxed">
          <span
            className={`transition-all duration-300 ${unblurredCrafting ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            I love designing and{" "}
          </span>
          <span
            className="text-foreground font-medium cursor-default"
            onMouseEnter={() => setUnblurredCrafting(true)}
          >
            crafting
          </span>
          <span
            className={`transition-all duration-300 ${unblurredCrafting ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            {" "}
            motion that makes interfaces feel alive.
          </span>
          <br />

          <span className="transition-all duration-300 blur-none opacity-100">
            When I&apos;m not obsessing over pixels,{" "}
          </span>
          <span
            className={`transition-all duration-300 ${unblurredProtocols ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            I&apos;m exploring{" "}
          </span>
          <span
            className="text-foreground font-medium cursor-default"
            onMouseEnter={() => setUnblurredProtocols(true)}
          >
            protocols
          </span>
          <span
            className={`transition-all duration-300 ${unblurredProtocols ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            {" "}
            and complex infrastructure, rebuilding them from scratch to
            understand them from first principles.
          </span>
        </p>

        {/* <div className="mt-2 flex items-center">
          <button
            onClick={handleCopy}
            className="group flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-[#1C1C1C] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <span>fahadkhann0204@gmail.com</span>
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span
                className={`absolute transition-all duration-300 ${
                  copied
                    ? "scale-0 opacity-0 blur-[10px]"
                    : "scale-100 opacity-100 blur-0"
                }`}
              >
                <Copy size={14} />
              </span>
              <span
                className={`absolute text-green-500 transition-all duration-300 ${
                  copied
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-0 opacity-0 blur-[10px]"
                }`}
              >
                <Check size={14} />
              </span>
            </span>
          </button>
        </div> */}
      </div>
    </main>
  );
}
