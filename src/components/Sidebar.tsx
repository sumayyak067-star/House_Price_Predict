"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  ChevronRight,
  Sparkles,
  Database,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems, mlNavItems } from "@/lib/navigation";
import { metrics, datasetStats } from "@/data";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function NavSection({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: typeof mainNavItems;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="px-4 sidebar-nav-title mb-2">{title}</p>
      {items.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href} onClick={onNavigate} className="relative block group">
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex items-center gap-3 px-3 py-3 mx-1 rounded-xl transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  isActive ? "bg-primary/15" : "bg-foreground/[0.04] group-hover:bg-foreground/[0.08]"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="sidebar-nav-label truncate">{link.name}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold uppercase">
                      {link.badge}
                    </span>
                  )}
                </div>
                {link.description && (
                  <p className="sidebar-nav-desc truncate mt-0.5">{link.description}</p>
                )}
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-primary shrink-0" />}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-border/40">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-foreground block leading-tight">
              PredictHouse
            </span>
            <span className="text-sm text-muted-foreground font-medium">ML Regression Platform</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-5 px-2 space-y-7 scrollbar-thin">
        <NavSection title="General" items={mainNavItems} pathname={pathname} onNavigate={onNavigate} />
        <NavSection title="Machine Learning" items={mlNavItems} pathname={pathname} onNavigate={onNavigate} />
      </nav>

      <div className="px-3 pb-3">
        <Link
          href="/predict"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-base font-semibold shadow-lg shadow-primary/25 hover:opacity-95 transition-opacity"
        >
          <Sparkles className="w-5 h-5" />
          Run Prediction
        </Link>
      </div>

      <div className="px-3 pb-5">
        <div className="rounded-xl border border-border/50 bg-foreground/[0.02] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Model Status</p>
            <span className="flex items-center gap-1.5 text-sm text-green-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Online
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg bg-foreground/[0.03] p-2.5">
              <p className="text-muted-foreground text-xs">R² Score</p>
              <p className="font-bold text-foreground font-mono text-base">{metrics.r2.toFixed(3)}</p>
            </div>
            <div className="rounded-lg bg-foreground/[0.03] p-2.5">
              <p className="text-muted-foreground text-xs">Records</p>
              <p className="font-bold text-foreground font-mono text-base">{datasetStats.totalRecords}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Database className="w-4 h-4" />
            Housing Dataset • MLR v1.0
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-[300px] glass border-r border-border/50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40">
              <span className="text-base font-semibold text-foreground">Menu</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-foreground/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <SidebarContent pathname={pathname} onNavigate={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-[var(--sidebar-width)] flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
