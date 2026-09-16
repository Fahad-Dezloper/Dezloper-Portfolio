import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fahad Khan",
    short_name: "Fahad Khan",
    description: "Design & Infra Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/favicon_io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
