"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  children?: React.ReactNode;
}

/** Professional page header for inner pages */
export default function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  children,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">{title}</h1>
                {badge && <Badge variant="secondary" className="text-sm">{badge}</Badge>}
              </div>
              <p className="text-base text-muted-foreground mt-1.5 max-w-xl">{description}</p>
            </div>
          </div>
        </div>
        {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
      </div>
      <div className="mt-6 h-px bg-gradient-to-r from-border via-primary/30 to-transparent" />
    </motion.div>
  );
}
