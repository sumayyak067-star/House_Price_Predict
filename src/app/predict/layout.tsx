import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predict",
  description: "Enter property features and get an instant ML-powered house price estimate.",
};

export default function PredictLayout({ children }: { children: React.ReactNode }) {
  return children;
}
