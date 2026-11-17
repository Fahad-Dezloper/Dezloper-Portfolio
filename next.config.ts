import { execSync } from "node:child_process";
import type { NextConfig } from "next";

/**
 * When the site last changed, resolved once at build time.
 *
 * The source of truth is the last commit, because that is what a deploy is
 * actually built from. If the working tree is dirty the commit no longer
 * describes what is on screen, so we fall back to now: that keeps local dev
 * honest while a deploy, which always builds a clean checkout, shows the real
 * date of the change.
 *
 * Formatted here rather than in the component on purpose. Doing it at render
 * time would run Intl on both the server and the browser, and their time zones
 * can disagree by a day, which is a hydration mismatch.
 */
const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

function lastUpdated() {
  let date = new Date();
  try {
    const dirty = execSync("git status --porcelain", { encoding: "utf8" }).trim();
    if (!dirty) {
      const iso = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
      if (iso) date = new Date(iso);
    }
  } catch {
    // No git (or no history) at build time: today is the best answer we have.
  }
  return {
    iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    label: `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
  };
}

const updated = lastUpdated();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAST_UPDATED: updated.label,
    NEXT_PUBLIC_LAST_UPDATED_ISO: updated.iso,
  },
  images: {
    domains: [
      "api.microlink.io"
    ]
  }
};

export default nextConfig;
