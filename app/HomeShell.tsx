"use client";

import type { ReactNode } from "react";
import Hero from "./components/Hero";
import Experiences from "./components/Experiences";
import Recognition from "./components/Recognition";
import SelectedWork from "./components/SelectedWork";
import ToastStack from "./components/ToastStack";

/**
 * The home page.
 *
 * One tree, rendered the same on the server and the client. It used to render
 * a placeholder first and swap in a second tree once Silk's scroll container
 * had been found, which remounted every section: the intro animation below
 * restarted from the top each time, so it appeared to stutter and play several
 * times. The scroll container was only needed by effects that are long gone,
 * and ToastStack finds its own.
 */
export default function HomeShell({ writings }: { writings: ReactNode }) {
  return (
    <div className="font-sans w-full bg-black flex flex-col relative">
      <ToastStack />
      <div className="home-intro flex w-full pb-[150px] overflow-hidden flex-col gap-10 bg-white flex-1 items-center justify-center">
        <Hero />
        <SelectedWork />
        <Recognition />
        <Experiences />
        {/* Projects is parked, not gone: app/components/Projects.tsx still
            holds PerpExchange, Wallet and Solana OSS, and still renders. Put
            the import and this line back to show it again. */}
        {writings}
      </div>
    </div>
  );
}
