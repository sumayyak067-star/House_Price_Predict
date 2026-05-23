import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Project",
  description:
    "Learn about the Multiple Linear Regression model, housing dataset, features, and ML pipeline.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
