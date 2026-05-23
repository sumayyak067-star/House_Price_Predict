"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/AnimatedCounter";
import { staggerItem } from "@/lib/animations";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  iconColor = "text-primary",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div variants={staggerItem} transition={{ delay }}>
      <Card className="glass-card border-none h-full hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-5 sm:p-6 flex items-center justify-between">
          <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                    <AnimatedCounter
                      target={value}
                      prefix={prefix}
                      suffix={suffix}
                      className="text-2xl sm:text-3xl font-bold text-foreground"
            />
          </div>
          <div className={`w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
