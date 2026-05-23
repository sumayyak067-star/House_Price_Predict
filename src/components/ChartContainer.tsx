"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp } from "@/lib/animations";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  height?: number;
  className?: string;
  delay?: number;
}

/** Glass card wrapper for Recharts with consistent styling */
export default function ChartContainer({
  title,
  description,
  children,
  height = 280,
  className = "",
  delay = 0,
}: ChartContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      <Card className="glass-card border-none h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-foreground text-lg">{title}</CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground text-sm">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="w-full" style={{ height }}>
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
