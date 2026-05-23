"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface AppShellProps {
  children: React.ReactNode;
}

/** Global layout shell with sidebar + top bar */
export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-[var(--sidebar-width)] flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
