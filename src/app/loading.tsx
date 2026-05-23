"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Animated logo pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25"
        >
          <BrainCircuit className="w-8 h-8 text-white" />
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "60%" }}
          />
        </div>

        <p className="text-sm text-muted-foreground font-medium tracking-wide">
          Loading PredictHouse...
        </p>
      </motion.div>
    </div>
  );
}
