"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "fade" | "scale";

function shouldShowInstantly(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  );
}

/**
 * Shared intersection-observer behind every scroll reveal. Fires once,
 * then disconnects. Respects reduced motion (shows instantly).
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldShowInstantly()) {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

/**
 * Scroll-triggered reveal wrapper. Transform/opacity only (no layout
 * shift), staggered via `delay`. Server renders the resting (hidden)
 * state; a <noscript> style in the layout keeps content visible with
 * JS disabled.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "reveal",
        variant === "fade" && "reveal-fade",
        variant === "scale" && "reveal-scale",
        shown && "is-in",
        className,
      )}
    >
      {children}
    </div>
  );
}
