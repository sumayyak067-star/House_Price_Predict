"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Database,
  Filter,
  BrainCircuit,
  LineChart,
  CheckCircle2,
  Layers,
  Target,
  BarChart2,
} from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import PageHeader from "@/components/PageHeader";
import { metrics, datasetStats } from "@/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const pipelineCards = [
  {
    title: "Data Preprocessing",
    description:
      "Dropped non-numeric columns (date, street, statezip, country). Applied pd.get_dummies on city with drop_first=True → 55 features.",
    icon: Filter,
    color: "text-blue-500",
  },
  {
    title: "Training",
    description:
      "LinearRegression from Scikit-Learn. train_test_split(test_size=0.2, random_state=42). Fitted on 3,680 training samples.",
    icon: BrainCircuit,
    color: "text-purple-500",
  },
  {
    title: "Prediction",
    description:
      "y = β₀ + Σβᵢxᵢ. Coefficients exported to model.json for client-side inference in this Next.js app.",
    icon: Target,
    color: "text-green-500",
  },
  {
    title: "Evaluation",
    description: `MAE $${Math.round(metrics.mae).toLocaleString()}, RMSE $${Math.round(metrics.rmse).toLocaleString()}, R² ${metrics.r2.toFixed(3)} on the held-out test set.`,
    icon: LineChart,
    color: "text-orange-500",
  },
];

const datasetFeatures = [
  "price (target)",
  "bedrooms",
  "bathrooms",
  "sqft_living",
  "sqft_lot",
  "floors",
  "waterfront",
  "view",
  "condition",
  "sqft_above",
  "sqft_basement",
  "yr_built",
  "yr_renovated",
];

export default function AboutPage() {
  return (
    <div className="page-container max-w-5xl">
      <PageHeader
        title="House Price Predictor"
        description="Multiple Linear Regression on housing data — based on MLR_Assignment.ipynb. Helps buyers, sellers, and agents with data-driven valuations."
        icon={Layers}
        badge="About"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card border-none h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" /> The Dataset
              </CardTitle>
              <CardDescription>Housing Sales Data (data.csv)</CardDescription>
            </CardHeader>
            <CardContent className="text-foreground/80 space-y-4">
              <p>
                House sale prices from a regional housing dataset including multiple cities. Sales between May 2014 and May 2015.
                Original columns: date, price, bedrooms, bathrooms, sqft_living, sqft_lot, floors, waterfront,
                view, condition, sqft_above, sqft_basement, yr_built, yr_renovated, street, city, statezip, country.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span><strong>Target:</strong> price (continuous USD)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span><strong>Records:</strong> {datasetStats.totalRecords.toLocaleString()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span><strong>Price range:</strong> ${datasetStats.minPrice.toLocaleString()} – ${datasetStats.maxPrice.toLocaleString()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span><strong>After encoding:</strong> {datasetStats.featureCount} features</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card border-none h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" /> The Algorithm
              </CardTitle>
              <CardDescription>Multiple Linear Regression (MLR)</CardDescription>
            </CardHeader>
            <CardContent className="text-foreground/80 space-y-4">
              <p>
                MLR predicts a continuous target using multiple explanatory variables. Each feature has a learned
                coefficient βᵢ; the intercept β₀ shifts the baseline price.
              </p>
              <div className="bg-foreground/[0.03] p-4 rounded-lg font-mono text-sm text-primary border border-border/50 text-center">
                ŷ = β₀ + β₁x₁ + β₂x₂ + … + βₙxₙ
              </div>
              <p className="text-sm text-muted-foreground">
                City is one-hot encoded (drop_first). Algona is the reference category; selecting Seattle sets city_Seattle = 1.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <SectionReveal className="mb-16">
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground">Features & Target Variable</CardTitle>
            <CardDescription>Numeric inputs + city dummy variables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {datasetFeatures.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                >
                  {f}
                </span>
              ))}
              <span className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border/50 font-medium">
                + {datasetStats.featureCount - 13} city dummy variables
              </span>
            </div>
          </CardContent>
        </Card>
      </SectionReveal>

      <SectionReveal className="mb-4">
        <h2 className="text-xl font-bold text-foreground">ML Pipeline</h2>
        <p className="text-sm text-muted-foreground mt-1">Each stage from your notebook workflow</p>
      </SectionReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {pipelineCards.map((card) => (
          <motion.div key={card.title} variants={staggerItem}>
            <Card className="glass-card border-none h-full hover:scale-[1.02] transition-transform duration-300">
              <CardHeader>
                <div className={`w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center mb-3`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <CardTitle className="text-lg text-foreground">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <SectionReveal>
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground">How This Helps Users</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-3">
            {[
              "Enables buyers to estimate fair property prices before making decisions",
              "Assists sellers in setting competitive and realistic listing prices",
              "Helps real estate agents provide data-driven recommendations",
              "Saves time with instant predictions vs. manual market research",
              "Improves transparency in property valuation using machine learning",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                <p className="text-sm text-foreground/80">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </SectionReveal>
    </div>
  );
}
