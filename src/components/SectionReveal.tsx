"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

/** Wraps content with scroll-triggered reveal animation */
export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  variants = fadeInUp,
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
