"use client";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function GmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
      <path d="M7 7.5L9.94202 9.23943C11.6572 10.2535 12.3428 10.2535 14.058 9.23943L17 7.5" />
      <path d="M10.5 19.5C10.0337 19.4939 9.56682 19.485 9.09883 19.4732C5.95033 19.3941 4.37608 19.3545 3.24496 18.2184C2.11383 17.0823 2.08114 15.5487 2.01577 12.4814C1.99475 11.4951 1.99474 10.5147 2.01576 9.52843C2.08114 6.46113 2.11382 4.92748 3.24495 3.79139C4.37608 2.6553 5.95033 2.61573 9.09882 2.53658C11.0393 2.4878 12.9607 2.48781 14.9012 2.53659C18.0497 2.61574 19.6239 2.65532 20.755 3.79141C21.8862 4.92749 21.9189 6.46114 21.9842 9.52844C21.9939 9.98251 21.9991 10.1965 21.9999 10.5" />
      <path d="M19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17ZM19 17V17.5C19 18.3284 19.6716 19 20.5 19C21.3284 19 22 18.3284 22 17.5V17C22 14.5147 19.9853 12.5 17.5 12.5C15.0147 12.5 13 14.5147 13 17C13 19.4853 15.0147 21.5 17.5 21.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
      <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"></path>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}>
      <path d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409" />
    </svg>
  );
}

const socials = [
  {
    name: "Gmail",
    label: "fahadkhann0204@gmail.com",
    href: "mailto:fahadkhann0204@gmail.com",
    Icon: GmailIcon,
  },
  {
    name: "Twitter",
    label: "dezloperr",
    href: "https://x.com/dezloperr",
    Icon: TwitterIcon,
  },
  {
    name: "Telegram",
    label: "dezloper",
    href: "https://t.me/dezloper",
    Icon: TelegramIcon,
  },
];

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
            <p className="text-secondary">Design & Infra Engineer</p>
          </div>

          <div className="flex items-center gap-1">
            {socials.map(({ name, label, href, Icon }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={`${name} — ${label}`}
                className="group flex items-center rounded-xl bg-[var(--foreground)]/5 p-1.5 text-xs font-medium text-[var(--foreground)]/70 transition-colors hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]"
              >
                <Icon />
                {/* 0fr → 1fr animates the label's width open without a fixed size */}
                <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr]">
                  <span className="overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="pl-1.5 pr-0.5">{label}</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
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
            crafting motion
          </span>
          <span
            className={`transition-all duration-300 ${unblurredCrafting ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            {" "}
            that makes interfaces feel alive.
          </span>
          <br />

          <span
            className={`transition-all duration-300 opacity-100 ${unblurredCrafting ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            When I&apos;m not obsessing over pixels,{" "}
          </span>
          <span
            className={`transition-all duration-300 ${unblurredProtocols ? "blur-none opacity-100" : "blur-[4px] opacity-70"}`}
          >
            I&apos;m{" "}
          </span>
          <span
            className="text-foreground font-medium cursor-default"
            onMouseEnter={() => setUnblurredProtocols(true)}
          >
            exploring protocols
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
