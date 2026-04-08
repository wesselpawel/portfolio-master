"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type CSSProperties,
} from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  scale?: number;
  disabled?: boolean;
}

export const useParallax = <T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
): { ref: RefObject<T>; style: CSSProperties; isVisible: boolean } => {
  const {
    speed = 0.5,
    direction = "up",
    scale = 1.2,
    disabled = false,
  } = options;
  const elementRef = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const element = elementRef.current as unknown as HTMLElement | null;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "20% 0px",
      }
    );

    observer.observe(element);

    const updateOffset = () => {
      if (!isVisible) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      const yPos = direction === "up" ? rate : -rate;

      setOffset(yPos);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateOffset);
    };

    if (isVisible) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      updateOffset();
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction, isVisible, disabled]);

  const parallaxStyle = disabled
    ? {}
    : {
        transform: `translate3d(0, ${offset}px, 0) scale(${scale})`,
        transition: "transform 0.1s ease-out",
      };

  return { ref: elementRef as RefObject<T>, style: parallaxStyle, isVisible };
};

export default useParallax;
