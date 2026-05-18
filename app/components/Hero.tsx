"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("fahadkhann0204@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="flex flex-1 max-w-2xl w-full flex-col items-center bg-white dark:bg-[#1C1C1C] sm:items-start">
      <div className="flex flex-col gap-3 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px] sm:text-base">
        <div className="flex w-full justify-between items-center">
          <p>22, Design engineer</p>

          <button
            onClick={handleCopy}
            className="group flex items-center gap-2 rounded-xl bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-[#1C1C1C] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
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
        </div>

        <p>
          I consider myself a builder at heart and enjoy crafting products &
          interfaces that feel great to use.
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
