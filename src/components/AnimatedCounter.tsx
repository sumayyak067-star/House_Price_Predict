"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

interface AnimatedCounterProps {
  /** Target number to animate towards */
  target: number;
  /** Duration of animation in seconds */
  duration?: number;
  /** Prefix string e.g. "$" */
  prefix?: string;
  /** Suffix string e.g. "%" */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** CSS class for the number text */
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      const formatted = Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(latest);
      setDisplayValue(formatted);
    });
    return unsubscribe;
  }, [spring, decimals]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
