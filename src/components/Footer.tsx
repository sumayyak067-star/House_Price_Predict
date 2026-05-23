import { BrainCircuit, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background/60 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">PredictHouse</span>
            </div>
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
              Professional ML portfolio showcasing Multiple Linear Regression on real estate data.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navigation</p>
            <div className="grid grid-cols-2 gap-2 text-base">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Predict", href: "/predict" },
                { label: "Insights", href: "/insights" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group w-fit"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js 14", "TypeScript", "Tailwind", "ShadCN", "Framer Motion", "Recharts"].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-foreground/[0.04] text-muted-foreground border border-border/40 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PredictHouse. ML Regression Project.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-foreground/5 hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-foreground/5 hover:text-foreground transition-colors" aria-label="Vercel">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
