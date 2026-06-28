"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  format?: boolean;
  className?: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  format = false,
  className,
  suffix = "",
  prefix = "",
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(val) {
          setDisplay(val);
        },
      });
      return () => controls.stop();
    }, delay * 1000); // Convert delay to milliseconds

    return () => clearTimeout(timeout);
  }, [inView, value, duration, delay]);

  const formatted = format ? formatNumber(Math.floor(display)) : Math.floor(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}