import React from "react";
import GitHubContributionsDemo from "../components/GithubChart";

const page = () => {
  return (
    <div className="max-w-2xl">
      <div className="">
        Love building things on the internet. I care deeply about the interface
        — that’s my craft, that’s where I shine. I’ve worked across different
        layers of the stack: Shopify CMS, trading algorithms in Rust,
        authentication systems, Web3 key management, and real-time workflows.
        I’ve built trading terminals, mobile apps, and full-stack web
        applications. Right now, I’m focused on becoming a great design engineer
        and building fast, thoughtful products with AI's as my co-founder.
      </div>
    
    <div className="flex flex-col py-8">
      <GitHubContributionsDemo />
      </div>

      <div className="">
      <h2 className="w-full text-left text-xl font-bold text-neutral-900 dark:text-white">
        Cool Experience I have had
          </h2>

          <div className="mt-6 space-y-6">
            <div className="space-y-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Frontend Lead · X2C.fun
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Nov 2025 – Present
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Full Fledged Superteam Member
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Nov 2025 – Present
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Solana Superdevs Fellowship · Graduate
                </div>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-200">
                <li>Graduated in the top 20 out of 2500.</li>
                <li>
                  Learned and built on Solana (Rust), including private key
                  management.
                </li>
                <li>Convocation at Ahmedabad Startup Village.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Full Fledged Athena FOSS Member
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Aug – Present
                </div>
              </div>
              <div className="text-sm text-neutral-700 dark:text-neutral-200">
                Elite developer community of 300 cracked devs (160/300 members).
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Frontend Lead · Artizence Systems LLP
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Feb 2025 – Apr 2025
                </div>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-200">
                <li>
                  Built and deployed 5+ fully responsive dashboards with dynamic
                  API integrations.
                </li>
                <li>Designed and implemented 24+ screens with clean UI/UX.</li>
                <li>
                  Contributed to a modular, scalable frontend architecture.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Manager · Read &amp; Rise
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  Sep 2022 – Oct 2023
                </div>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-200">
                <li>
                  Managed and maintained the company website for performance and
                  timely updates.
                </li>
                <li>
                  Led website enhancement projects to improve UX and
                  functionality.
                </li>
                <li>
                  Handled inventory and stock management, ensuring accurate
                  tracking and restocking.
                </li>
                <li>
                  Collaborated cross-functionally to streamline operations and
                  boost workflow efficiency.
                </li>
              </ul>
            </div>

          </div>
      </div>
    </div>
  );
};

export default page;
