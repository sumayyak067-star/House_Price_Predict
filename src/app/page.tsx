"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Database,
  Zap,
  TrendingUp,
  Home,
  MapPin,
  BarChart3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroBackground from "@/components/HeroBackground";
import SectionReveal from "@/components/SectionReveal";
import { datasetStats } from "@/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const features = [
  {
    icon: Database,
    title: "Real-world Dataset",
    description: `Trained on ${datasetStats.totalRecords.toLocaleString()}+ house sales with ${datasetStats.featureCount} encoded features.`,
  },
  {
    icon: Activity,
    title: "MLR Model",
    description: "Multiple Linear Regression with 80/20 train-test split (random_state=42) via Scikit-Learn.",
  },
  {
    icon: Zap,
    title: "Instant Predictions",
    description: "Client-side inference using exported coefficients — no backend required for demos.",
  },
];

const stats = [
  { label: "Records", value: datasetStats.totalRecords, prefix: "", suffix: "", icon: Database },
  { label: "Features", value: datasetStats.featureCount, prefix: "", suffix: "", icon: BarChart3 },
  {
    label: "Avg Price",
    value: Math.round(datasetStats.avgPrice / 1000),
    prefix: "$",
    suffix: "K",
    icon: TrendingUp,
  },
  { label: "Cities", value: datasetStats.cityCount, prefix: "", suffix: "", icon: MapPin },
];

const workflow = [
  { step: "Data Loading", desc: "4,600+ records • 18 raw columns" },
  { step: "Preprocessing", desc: "One-hot city encoding • 55 features" },
  { step: "Model Training", desc: "Linear Regression • 80/20 split" },
  { step: "Prediction", desc: "Real-time price estimates" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      <section className="hero-gradient w-full relative border-b border-border/30">
        <HeroBackground />
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Machine Learning Portfolio</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Predict House Prices{" "}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                with Machine Learning
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A premium showcase of Multiple Linear Regression built on real-world housing data —
              portfolio-worthy UI inspired by modern AI SaaS products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/predict">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 rounded-full text-base shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform"
                >
                  Try Prediction <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 rounded-full text-base hover:scale-[1.02] transition-transform"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} variants={staggerItem} className="glass-card p-5 sm:p-6 text-center group hover:scale-[1.02] transition-transform duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-2xl sm:text-3xl font-bold text-foreground"
                />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <SectionReveal className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-4">Why PredictHouse?</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Data-driven insights for buyers, sellers, and agents — powered by your MLR assignment notebook.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="glass-card p-8 text-center flex flex-col items-center hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionReveal>

      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">ML Workflow</h2>
          <p className="text-muted-foreground mb-16 max-w-xl mx-auto">
            From raw CSV to live predictions — the pipeline from your Jupyter notebook.
          </p>
        </SectionReveal>
        <div className="relative">
          <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {workflow.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-foreground font-bold text-lg mb-4">
                  {i + 1}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">{item.step}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-6">
        <SectionReveal className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
          <div className="relative z-10">
            <Home className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Ready to predict?</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Enter property details and get an instant ML-powered price estimate.
            </p>
            <Link href="/predict">
              <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/25">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
