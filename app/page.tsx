import Image from "next/image";
import Navbar from "./components/Navbar";
import LinkPreview from "@/components/ui/link-preview";

export default function Home() {
  return (
    <div className="flex w-full flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-[#1C1C1C]">
      <main className="flex flex-1 max-w-2xl w-full flex-col items-center bg-white dark:bg-[#1C1C1C] sm:items-start">
        <div className="mb-5">22, Design Engineer</div>
        <div className="flex  flex-col gap-2 ">
        <span>
          Currently Frontend Lead at{" "}
          <LinkPreview url="https://www.x2c.fun/" className="underline underline-offset-4">
            x2c.fun
          </LinkPreview>
        </span>

        <span>
          Solana Superdevs Fellowship graduate{" "}
          <LinkPreview
            url="https://fellowship.superteamin.fun/#program"
            className="underline underline-offset-4"
          >
            (program)
          </LinkPreview>
        </span>

        <span>Previously at Artizen.</span>

        <span>Before that, I was just coding.</span>
        </div>

        <div className="flex w-full justify-center py-24 items-center ">
  <div className="relative flex items-center justify-center">
    <div className="relative z-1 h-[20vh] w-[15vw] -translate-y-2 rotate-[-4deg] rounded-4xl bg-red-200 overflow-hidden">
      <img src="/Highlight/supredevs.png" alt="superdevs image" className="w-full h-full object-cover" />
    </div>
    <div className="relative z-2 -ml-10 h-[20vh] w-[15vw] translate-y-3 rotate-3 rounded-4xl bg-green-200 overflow-hidden">
    <img src="/Highlight/Superteam.png" alt="Superteam image" className="w-full h-full object-cover" />
    </div>
    <div className="relative z-3 -ml-10 h-[20vh] w-[15vw] -translate-y-1 -rotate-2 rounded-4xl bg-blue-200" />
    <div className="relative z-4 -ml-10 h-[20vh] w-[15vw] translate-y-4 rotate-[5deg] rounded-4xl bg-purple-200" />
  </div>
</div>
      </main>
      <section className="w-full max-w-none self-stretch py-12">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
            Selected Projects
          </h2>
        </div>
        <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-[max(1rem,calc((100vw-42rem)/2-0.4rem))] pr-4 [scrollbar-width:thin]">
          <div className="flex w-max gap-4">
    {[
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
    ].map((item, index) => (
      <article
        key={index}
        className="flex w-[min(280px,85vw)] shrink-0 flex-col gap-3"
      >
        <div
          className={`aspect-2/2 w-full rounded-2xl ${item.color} dark:bg-zinc-800`}
        />
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h3>
          <span className="shrink-0 text-neutral-900 dark:text-white" aria-hidden>
            ↗
          </span>
        </div>
        <p className="text-left text-sm leading-snug text-zinc-600 dark:text-zinc-400">
          {item.desc}
        </p>
      </article>
    ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-none self-stretch py-12">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="w-full text-left text-xl font-medium text-neutral-900 dark:text-white">
            Companies I have Contributed to
          </h2>
        </div>
        <div className="mt-4 w-full overflow-x-auto scrolll pb-2 pl-[max(1rem,calc((100vw-42rem)/2-0.4rem))] pr-4 [scrollbar-width:thin]">
          <div className="flex w-max gap-4">
    {[
      { title: "Antiwork", desc: "Sell your stuff. See what sticks.", link: "https://github.com/antiwork/gumboard/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed", img: "/OSC/antiwork.png" },
      { title: "Zero", desc: "An Open-Source Gmail Alternative for the Future of Email", link: "https://github.com/Mail-0/Zero/pulls?q=is%3Apr+author%3AFahad-Dezloper+is%3Aclosed", img: "/OSC/zero.png" },
      { title: "Cal", desc: "Scheduling infrastructure for absolutely everyone.", link:"https://github.com/calcom/cal.diy/pulls/Fahad-Dezloper", img: "/OSC/cal.png" },
    ].map((item, index) => (
      <article
        key={index}
        className="flex w-[min(280px,85vw)] shrink-0 flex-col gap-3"
      >
        <div
          className={`aspect-2/2 w-full rounded-2xl overflow-hidden dark:bg-zinc-800`}
        >
<img src={item.img} alt={item.title} className="w-full h-full object-contain" />
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h3>
        </div>
        <p className="text-left text-sm leading-snug text-zinc-600 dark:text-zinc-400">
          {item.desc}
        </p>
      </article>
    ))}
          </div>
        </div>
      </section>
    </div>
  );
}
