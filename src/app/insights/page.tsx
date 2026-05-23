"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  Line,
} from "recharts";
import { performanceData, actualVsPredicted, metrics } from "@/data";
import { Target, AlertCircle, TrendingDown, CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChartContainer from "@/components/ChartContainer";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import { chartTooltipStyle } from "@/lib/animations";
import { formatPriceAxis } from "@/lib/formatters";

const maeRmseData = [
  { name: "MAE", train: metrics.trainMae, test: metrics.mae },
  { name: "RMSE", train: metrics.trainRmse, test: metrics.rmse },
];

export default function InsightsPage() {
  return (
    <div className="page-container max-w-5xl">
      <PageHeader
        title="Model Insights"
        description="Performance metrics and evaluation from the held-out test set — exported from your Scikit-Learn notebook."
        icon={BrainCircuit}
        badge="Evaluation"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="MAE" value={Math.round(metrics.mae)} prefix="$" icon={Target} iconColor="text-blue-500" />
        <StatCard title="RMSE" value={Math.round(metrics.rmse)} prefix="$" icon={AlertCircle} iconColor="text-red-500" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card border-none h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground text-lg">R² Score</CardTitle>
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatedCounter target={metrics.r2} decimals={3} className="text-3xl font-bold text-foreground" />
              <p className="text-xs text-muted-foreground mt-1">Coefficient of determination</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <Card className="glass-card border-none h-full">
          <CardHeader>
            <CardTitle className="text-foreground">Metric explanations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-foreground/80">
            <div>
              <h4 className="font-semibold text-blue-500 mb-1 text-sm">MAE</h4>
              <p className="text-sm">Average error of ~${Math.round(metrics.mae).toLocaleString()} per prediction.</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-500 mb-1 text-sm">RMSE</h4>
              <p className="text-sm">${Math.round(metrics.rmse).toLocaleString()} — luxury outliers inflate squared errors.</p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-500 mb-1 text-sm">R²</h4>
              <p className="text-sm">Only ~{(metrics.r2 * 100).toFixed(1)}% of variance explained by linear features.</p>
            </div>
          </CardContent>
        </Card>

        <ChartContainer title="Train vs Test — R²" height={250}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis domain={[0, 1]} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => v.toFixed(3)} />
              <Legend />
              <Bar dataKey="r2" name="R² Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <ChartContainer title="MAE & RMSE Comparison" className="mb-10" height={260}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={maeRmseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={formatPriceAxis} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => `$${Math.round(v).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="train" name="Train" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="test" name="Test" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer title="Actual vs Predicted" className="mb-10" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" dataKey="actual" tickFormatter={formatPriceAxis} stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis type="number" dataKey="predicted" tickFormatter={formatPriceAxis} stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
            <ZAxis type="number" range={[50, 50]} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(val: number) => `$${val.toLocaleString()}`} />
            <Scatter data={actualVsPredicted} fill="#3b82f6" fillOpacity={0.7} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Card className="glass-card border-none">
        <CardHeader>
          <CardTitle className="text-foreground">Model Verdict</CardTitle>
          <CardDescription>Strengths & limitations for portfolio review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Strengths</p>
              {["Fast inference", "Interpretable coefficients", "Easy deployment", "Strong baseline"].map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  <p className="text-sm text-foreground/80">{s}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold">Limitations</p>
              {[`Low R² (${(metrics.r2 * 100).toFixed(1)}%)`, "Linear assumptions", "Outlier sensitivity", "Many city dummies"].map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                  <p className="text-sm text-foreground/80">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
