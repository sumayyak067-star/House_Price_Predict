"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getPageTitle } from "@/lib/navigation";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-20 h-[3.75rem] border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-colors shrink-0"
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4 text-foreground" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-foreground truncate">{title}</h1>
              {!isHome && (
                <Badge variant="outline" className="hidden sm:inline-flex text-xs py-0.5">
                  ML Project
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate hidden sm:block">
              {isHome ? "House Price Prediction • ML Regression" : `PredictHouse / ${title}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-muted-foreground">Model Ready</span>
          </div>
          <button
            className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
