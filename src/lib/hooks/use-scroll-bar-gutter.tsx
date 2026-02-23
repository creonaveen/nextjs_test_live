'use client';

import { useEffect, useState } from 'react';

export function useScrollbarGutter() {
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const html = document.documentElement;
      const body = document.body;

      const contentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      const viewportHeight = window.innerHeight;
      const overflows = contentHeight > viewportHeight;

      setHasOverflow(overflows);

      if (overflows) {
        html.style.scrollbarGutter = 'stable';
      } else {
        html.style.scrollbarGutter = 'auto';
      }
    };

    // Check initially
    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    const observer = new MutationObserver(checkOverflow);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      window.removeEventListener('resize', checkOverflow);
      observer.disconnect();
      // Reset
      document.documentElement.style.scrollbarGutter = '';
    };
  }, []);

  return hasOverflow;
}
