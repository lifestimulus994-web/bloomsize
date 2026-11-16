"use client";
import { useEffect, useState } from "react";

// Keeps an overlay in the DOM long enough to play its exit transition.
// `mounted` decides whether to render, `shown` flips one frame later so the
// CSS transition actually runs (class-based, no animation libraries).
export default function usePresence(open, ms = 340) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    let timer = 0;
    if (open) {
      setMounted(true);
      raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => setShown(true)); });
    } else {
      setShown(false);
      timer = setTimeout(() => setMounted(false), ms);
    }
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [open, ms]);

  return { mounted, shown };
}
