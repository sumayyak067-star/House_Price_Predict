"use client";

import { motion } from "framer-motion";
import { correlationData } from "@/data";

const columns = [
  { key: "price", label: "Price" },
  { key: "sqftLiving", label: "Sqft" },
  { key: "bathrooms", label: "Baths" },
  { key: "sqftAbove", label: "Above" },
  { key: "view", label: "View" },
] as const;

function cellColor(value: number): string {
  const intensity = Math.abs(value);
  if (value >= 0.7) return `rgba(59, 130, 246, ${0.3 + intensity * 0.5})`;
  if (value >= 0.4) return `rgba(139, 92, 246, ${0.2 + intensity * 0.4})`;
  if (value >= 0.2) return `rgba(168, 85, 247, ${0.15 + intensity * 0.3})`;
  return `rgba(100, 116, 139, ${0.1 + intensity * 0.2})`;
}

/** Correlation heatmap-style grid UI */
export default function CorrelationHeatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[480px]">
        <div className="grid grid-cols-6 gap-1 mb-1">
          <div className="text-xs font-medium text-muted-foreground p-2" />
          {columns.map((col) => (
            <div key={col.key} className="text-xs font-medium text-muted-foreground p-2 text-center">
              {col.label}
            </div>
          ))}
        </div>
        {correlationData.map((row, rowIdx) => (
          <div key={row.feature} className="grid grid-cols-6 gap-1 mb-1">
            <div className="text-xs font-medium text-foreground p-2 flex items-center">
              {row.feature}
            </div>
            {columns.map((col, colIdx) => {
              const value = row[col.key as keyof typeof row] as number;
              return (
                <motion.div
                  key={col.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (rowIdx + colIdx) * 0.05 }}
                  className="rounded-lg p-2 text-center text-xs font-mono font-medium text-foreground flex flex-col items-center justify-center min-h-[52px] border border-border/30"
                  style={{ backgroundColor: cellColor(value) }}
                  title={`${row.feature} × ${col.label}: ${value}`}
                >
                  {value.toFixed(2)}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Darker blue cells indicate stronger positive correlation with price-related features.
      </p>
    </div>
  );
}
