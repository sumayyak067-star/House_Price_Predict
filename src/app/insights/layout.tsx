import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Insights",
  description: "MAE, RMSE, R² metrics and model performance charts from the test set.",
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
