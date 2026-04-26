import React from "react";
import GitHubContributionsDemo from "../components/GithubChart";
import Link from "next/link";
import ExperienceAccordion from "./ExperienceAccordion";

const page = () => {
  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-4">
        <span>Love building things on the internet.</span> 
        
        <span>I care deeply about the interface
        — that’s my <Link href="/craft" className="underline">craft</Link>, that’s where I shine.</span> 
        
        <span>I’ve worked across different
        layers of the stack: Shopify CMS, trading algorithms in Rust,
        authentication systems, Web3 key management, and real-time workflows.
        I’ve built trading terminals, mobile apps, and full-stack web
        applications.</span> <span>Right now, I’m focused on becoming a great design engineer
        and building fast, thoughtful products with AI's as my co-founder.</span>
      </div>
    
    <div className="flex flex-col py-8">
      <GitHubContributionsDemo />
      </div>

      <div className="">
      <h2 className="w-full text-left text-xl font-bold text-neutral-900 dark:text-white">
        Cool Experience I have had
          </h2>
          <ExperienceAccordion
            items={[
              {
                id: "x2c",
                title: "Frontend Lead · X2C.fun",
                dates: "Nov 2025 – Present",
              },
              {
                id: "superteam",
                title: "Full Fledged Superteam Member",
                dates: "Nov 2025 – Present",
              },
              {
                id: "superdevs",
                title: "Solana Superdevs Fellowship · Graduate",
                bullets: [
                  "Graduated in the top 20 out of 2500.",
                  "Learned and built on Solana (Rust), including private key management.",
                  "Convocation at Ahmedabad Startup Village.",
                ],
              },
              {
                id: "athena",
                title: "Full Fledged Athena FOSS Member",
                dates: "Aug – Present",
                description:
                  "Elite developer community of 300 cracked devs (160/300 members).",
              },
              {
                id: "artizence",
                title: "Frontend Lead · Artizence Systems LLP",
                dates: "Feb 2025 – Apr 2025",
                bullets: [
                  "Built and deployed 5+ fully responsive dashboards with dynamic API integrations.",
                  "Designed and implemented 24+ screens with clean UI/UX.",
                  "Contributed to a modular, scalable frontend architecture.",
                ],
              },
              {
                id: "read-rise",
                title: "Manager · Read & Rise",
                dates: "Sep 2022 – Oct 2023",
                bullets: [
                  "Managed and maintained the company website for performance and timely updates.",
                  "Led website enhancement projects to improve UX and functionality.",
                  "Handled inventory and stock management, ensuring accurate tracking and restocking.",
                  "Collaborated cross-functionally to streamline operations and boost workflow efficiency.",
                ],
              },
            ]}
          />
      </div>
    </div>
  );
};

export default page;
