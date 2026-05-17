export default function Hero() {
  return (
    <main className="flex flex-1 max-w-2xl w-full flex-col items-center bg-white dark:bg-[#1C1C1C] sm:items-start">
      <div className="flex flex-col gap-3 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px] sm:text-base">
        <p>22, Design engineer</p>

        <p>
          I consider myself a builder at heart and enjoy crafting products &
          interfaces that feel great to use.
        </p>

        <p>
          You can find me on{" "}
          <a
            href="https://x.com/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
          >
            X
          </a>
          ,{" "}
          <a
            href="https://github.com/Fahad-Dezloper"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
          >
            GitHub
          </a>
          , or reach me via{" "}
          <a
            href="mailto:your.email@example.com"
            className="font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
          >
            email
          </a>
          .
        </p>
      </div>
    </main>
  );
}
