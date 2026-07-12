"use client";

import { useEffect } from "react";
import styles from "./GrainOverlay.module.css";

export default function GrainOverlay() {
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startedNearEdge = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      // Leave the strip near either screen edge alone so iOS's native
      // swipe-to-go-back/forward gesture still works.
      startedNearEdge = startX < 24 || startX > window.innerWidth - 24;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (startedNearEdge) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      // iOS Safari can rubber-band the page sideways via its native
      // scroll view even with zero real horizontal overflow and
      // touch-action: pan-y set. Block drags that are more horizontal
      // than vertical so only vertical scrolling ever happens.
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return <div className={styles.grain} aria-hidden="true" />;
}
