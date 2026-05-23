"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  distributionData,
  scatterData,
  bedroomDistribution,
  featureImportance,
  priceByCityData,
  datasetStats,
} from "@/data";
import { Activity, Home, MapPin, TrendingUp, BarChart3 } from "lucide-react";
import ChartContainer from "@/components/ChartContainer";
import CorrelationHeatmap from "@/components/CorrelationHeatmap";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import { chartTooltipStyle, CHART_COLORS, staggerContainer } from "@/lib/animations";
import { formatPriceAxis } from "@/lib/formatters";

export default function DashboardPage() {
  return (
    <div className="page-container">
      <PageHeader
        title="Data Visualization"
        description={`Interactive analytics from ${datasetStats.totalRecords.toLocaleString()} housing records.`}
        icon={BarChart3}
        badge="Analytics"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <StatCard title="Total Records" value={datasetStats.totalRecords} icon={Activity} iconColor="text-blue-500" />
        <StatCard title="Avg. Price" value={Math.round(datasetStats.avgPrice)} prefix="$" icon={TrendingUp} iconColor="text-green-500" />
        <StatCard title="Avg. Sqft" value={Math.round(datasetStats.avgSqft)} icon={Home} iconColor="text-purple-500" />
        <StatCard title="Cities" value={datasetStats.cityCount} icon={MapPin} iconColor="text-orange-500" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer title="Price Distribution" description="Houses sold per price range" delay={0.1}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.5)" }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Sqft Living vs. Price" description="Sample scatter from dataset" delay={0.2}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" dataKey="sqft" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="number" dataKey="price" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatPriceAxis} />
              <ZAxis type="number" range={[40, 40]} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Scatter data={scatterData} fill="#a855f7" fillOpacity={0.75} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer title="Bedroom Distribution" description="Properties by bedroom count">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bedroomDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="count"
                nameKey="bedrooms"
                label={({ bedrooms, percent }) => `${bedrooms} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
                fontSize={10}
              >
                {bedroomDistribution.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Feature Importance" description="Normalized |coefficient| from MLR">
          <div className="space-y-3 h-full flex flex-col justify-center py-2">
            {featureImportance.map((f, i) => (
              <div key={f.feature} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground font-medium">{f.feature}</span>
                  <span className="text-muted-foreground">{(f.importance * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${f.importance * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.7 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: f.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      <ChartContainer title="Correlation Heatmap" description="Feature correlations (numeric columns)" height={320} className="mb-6">
        <CorrelationHeatmap />
      </ChartContainer>

      <ChartContainer title="Average Price by City (Top 10)" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceByCityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="city" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} angle={-28} textAnchor="end" height={56} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatPriceAxis} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, "Avg Price"]} />
            <Area type="monotone" dataKey="avgPrice" stroke="hsl(var(--primary))" fill="url(#colorPrice)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
