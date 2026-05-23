"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Loader2, Sparkles, ChevronDown, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cities } from "@/data";
import { predictPrice, validatePropertyInput, getConfidenceScore } from "@/lib/predict";
import { formatCurrency } from "@/lib/formatters";
import type { PropertyInput } from "@/data";
import { metrics } from "@/data";

const defaultInput: PropertyInput = {
  bedrooms: 3,
  bathrooms: 2,
  sqftLiving: 2000,
  sqftLot: 5000,
  floors: 1,
  waterfront: 0,
  view: 0,
  condition: 3,
  sqftAbove: 2000,
  sqftBasement: 0,
  yrBuilt: 1990,
  yrRenovated: 0,
  city: "Seattle",
};

export default function PredictionForm() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [bedrooms, setBedrooms] = useState([defaultInput.bedrooms]);
  const [bathrooms, setBathrooms] = useState([defaultInput.bathrooms]);
  const [sqftLiving, setSqftLiving] = useState(String(defaultInput.sqftLiving));
  const [sqftLot, setSqftLot] = useState(String(defaultInput.sqftLot));
  const [floors, setFloors] = useState([defaultInput.floors]);
  const [condition, setCondition] = useState([defaultInput.condition]);
  const [view, setView] = useState([defaultInput.view]);
  const [waterfront, setWaterfront] = useState(false);
  const [yrBuilt, setYrBuilt] = useState(String(defaultInput.yrBuilt));
  const [sqftBasement, setSqftBasement] = useState(String(defaultInput.sqftBasement));
  const [city, setCity] = useState(defaultInput.city);

  const buildInput = (): PropertyInput => ({
    bedrooms: bedrooms[0],
    bathrooms: bathrooms[0],
    sqftLiving: Number(sqftLiving),
    sqftLot: Number(sqftLot),
    floors: floors[0],
    waterfront: waterfront ? 1 : 0,
    view: view[0],
    condition: condition[0],
    sqftAbove: Number(sqftLiving),
    sqftBasement: Number(sqftBasement) || 0,
    yrBuilt: Number(yrBuilt),
    yrRenovated: 0,
    city,
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    const input = buildInput();
    const validationError = validatePropertyInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsPredicting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const result = predictPrice(input);
    setPrediction(result);
    setIsPredicting(false);
  };

  const confidence = getConfidenceScore();
  const r2Percent = Math.round(metrics.r2 * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" /> Property Details
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Adjust values — predictions use exported MLR coefficients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePredict} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <SliderField label="Bedrooms" value={bedrooms} onChange={setBedrooms} min={1} max={10} step={1} />
              <SliderField label="Bathrooms" value={bathrooms} onChange={setBathrooms} min={0.5} max={8} step={0.5} />
              <SliderField label="Floors" value={floors} onChange={setFloors} min={1} max={3.5} step={0.5} />
              <SliderField label="Condition (1–5)" value={condition} onChange={setCondition} min={1} max={5} step={1} />
              <SliderField label="View (0–4)" value={view} onChange={setView} min={0} max={4} step={1} />

              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Sqft Living" value={sqftLiving} onChange={setSqftLiving} min={300} />
                <NumberField label="Sqft Lot" value={sqftLot} onChange={setSqftLot} min={500} />
                <NumberField label="Sqft Basement" value={sqftBasement} onChange={setSqftBasement} min={0} />
                <NumberField label="Year Built" value={yrBuilt} onChange={setYrBuilt} min={1900} max={2025} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-foreground text-sm">Waterfront</Label>
                <button
                  type="button"
                  onClick={() => setWaterfront(!waterfront)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${waterfront ? "bg-primary" : "bg-foreground/10"}`}
                  aria-pressed={waterfront}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${waterfront ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground text-sm">City</Label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-3 pr-8 rounded-md bg-foreground/[0.03] border border-border text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/20"
                disabled={isPredicting}
              >
                {isPredicting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Running MLR Model...
                  </>
                ) : (
                  "Predict Price"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-stretch"
      >
        <AnimatePresence mode="wait">
          {!prediction && !isPredicting && (
            <EmptyState key="empty" />
          )}
          {isPredicting && <LoadingState key="loading" />}
          {prediction !== null && !isPredicting && (
            <ResultState
              key="result"
              prediction={prediction}
              city={city}
              confidence={confidence}
              r2Percent={r2Percent}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number[];
  onChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label className="text-foreground text-sm">{label}</Label>
        <span className="text-muted-foreground font-mono text-sm">{value[0]}</span>
      </div>
      <Slider value={value} onValueChange={onChange} max={max} min={min} step={step} />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max?: number;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground text-sm">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-foreground/[0.03] border-border text-foreground"
        min={min}
        max={max}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card border-none w-full min-h-[420px] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-muted-foreground/30" />
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">Ready to Predict</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Enter property features and run the Multiple Linear Regression model trained on real estate data.
      </p>
    </motion.div>
  );
}

function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card border-none w-full min-h-[420px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-500/5 animate-pulse" />
      <Loader2 className="w-16 h-16 text-primary animate-spin mb-6 relative z-10" />
      <h3 className="text-2xl font-medium text-foreground mb-2 relative z-10">Running ML Model</h3>
      <p className="text-muted-foreground text-sm font-mono relative z-10">Applying 55 feature weights...</p>
    </motion.div>
  );
}

function ResultState({
  prediction,
  city,
  confidence,
  r2Percent,
}: {
  prediction: number;
  city: string;
  confidence: number;
  r2Percent: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card border-none w-full min-h-[420px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-primary/5" />
      <p className="text-muted-foreground font-medium uppercase tracking-wider mb-2 text-sm z-10">
        Estimated Value
      </p>
      <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2 z-10">
        {formatCurrency(prediction)}
      </h2>
      <p className="text-xs text-muted-foreground mb-6 z-10">{city}</p>

      <div className="w-full max-w-xs space-y-3 z-10 mb-6">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Model fit (R²)
          </span>
          <span className="font-medium text-foreground">{r2Percent}%</span>
        </div>
        <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${r2Percent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Explains ~{r2Percent}% of price variance — use as a baseline estimate
        </p>
      </div>

      <div className="bg-foreground/[0.03] backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-border/50 z-10 w-full max-w-sm">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-green-500" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-foreground">Prediction Complete</p>
          <p className="text-xs text-muted-foreground">MLR • {confidence}% confidence band</p>
        </div>
      </div>
    </motion.div>
  );
}
