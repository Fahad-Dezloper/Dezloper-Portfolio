import { Suspense } from "react"


import { getCachedContributions } from "@/lib/get-cached-contributions"
import { GitHubContributions, GitHubContributionsFallback } from "@/components/github-contributions/github-contributions"

const GITHUB_USERNAME = "fahad-dezloper"
const GITHUB_PROFILE_URL = "https://github.com/Fahad-Dezloper"

export default function GitHubContributionsDemo() {
  const contributions = getCachedContributions(GITHUB_USERNAME)

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
      />
    </Suspense>
  )
}
