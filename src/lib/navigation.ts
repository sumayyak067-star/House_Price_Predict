import {
  Home,
  Info,
  BarChart3,
  Calculator,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home, description: "Overview & highlights" },
  { name: "About", href: "/about", icon: Info, description: "Model & dataset" },
];

export const mlNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3, description: "Data visualizations" },
  { name: "Predict", href: "/predict", icon: Calculator, description: "Price estimator", badge: "Live" },
  { name: "Insights", href: "/insights", icon: BrainCircuit, description: "Model metrics" },
];

export const allNavItems = [...mainNavItems, ...mlNavItems];

export function getPageTitle(pathname: string): string {
  const item = allNavItems.find((n) => n.href === pathname);
  return item?.name ?? "PredictHouse";
}
