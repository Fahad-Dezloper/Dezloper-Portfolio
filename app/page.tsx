import HomeShell from "./HomeShell";
import Writtings from "./components/Writtings";

/**
 * Server entry point.
 *
 * The shell has to be a client component: it uses hooks to find Silk's scroll
 * container and hand it to framer-motion. But MDX has to compile on the server,
 * so the writing section is rendered here and passed down as an already-rendered
 * node — which is how a server component reaches inside a client tree.
 */
export default function Page() {
  return <HomeShell writings={<Writtings />} />;
}
