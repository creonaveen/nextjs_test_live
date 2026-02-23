'use client';
import { useState, useEffect, useRef } from 'react';

const TOP_LOCK = 10;
const TOP_HIDE_OFFSET = 100;

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= TOP_LOCK) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= TOP_HIDE_OFFSET) {
        if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true); // scroll up → show immediately
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); // scroll down → hide immediately
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isVisible };
}
