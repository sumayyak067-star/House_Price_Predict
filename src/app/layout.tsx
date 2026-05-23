import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import AppShell from "@/components/AppShell";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "PredictHouse | ML Regression Showcase",
    template: "%s | PredictHouse",
  },
  description:
    "Premium AI/ML portfolio app for predicting house prices using Multiple Linear Regression. Built with Next.js 14, Tailwind, ShadCN, Framer Motion, and Recharts.",
  keywords: [
    "machine learning",
    "house price prediction",
    "multiple linear regression",
    "next.js",
    "housing prediction",
    "portfolio project",
  ],
  authors: [{ name: "PredictHouse ML Project" }],
  openGraph: {
    title: "PredictHouse — House Price ML Showcase",
    description: "Multiple Linear Regression on real estate data with interactive dashboards and live predictions.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background font-sans antialiased bg-gradient-animate`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppShell>
            <main className="flex-1">{children}</main>
            <Footer />
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
