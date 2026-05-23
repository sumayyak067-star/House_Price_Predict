import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Interactive data visualizations — price distribution, correlations, and feature insights.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
