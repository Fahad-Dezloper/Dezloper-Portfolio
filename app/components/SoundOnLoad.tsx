"use client";

import { useEffect } from "react";

const SOUND_KEY = "fahad_intro_played";

export default function SoundOnLoad() {
  useEffect(() => {
    if (sessionStorage.getItem(SOUND_KEY)) return;

    const audio = new Audio("/sound/FAHHH (Meme Sound Effect).mp3");
    audio
      .play()
      .then(() => {
        sessionStorage.setItem(SOUND_KEY, "1");
      })
      .catch(() => {
        // Browser blocked autoplay — silently ignore
      });
  }, []);

  return null;
}
