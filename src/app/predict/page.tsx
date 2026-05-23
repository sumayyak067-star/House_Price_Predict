"use client";

import { Calculator } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import PageHeader from "@/components/PageHeader";

export default function PredictPage() {
  return (
    <div className="page-container">
      <PageHeader
        title="Price Predictor"
        description="Enter property details to get an ML-powered price estimate using exported regression coefficients."
        icon={Calculator}
        badge="Live MLR"
      />
      <PredictionForm />
    </div>
  );
}
