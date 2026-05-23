import { coefficients, featureNames, intercept } from "@/data";
import type { PropertyInput } from "@/data";

/** Build feature vector matching sklearn one-hot encoding (drop_first city) */
function buildFeatureVector(input: PropertyInput): Record<string, number> {
  const features: Record<string, number> = {};

  for (const name of featureNames) {
    features[name] = 0;
  }

  features.bedrooms = input.bedrooms;
  features.bathrooms = input.bathrooms;
  features.sqft_living = input.sqftLiving;
  features.sqft_lot = input.sqftLot;
  features.floors = input.floors;
  features.waterfront = input.waterfront;
  features.view = input.view;
  features.condition = input.condition;
  features.sqft_above = input.sqftAbove;
  features.sqft_basement = input.sqftBasement;
  features.yr_built = input.yrBuilt;
  features.yr_renovated = input.yrRenovated;

  const cityKey = `city_${input.city}`;
  if (cityKey in features) {
    features[cityKey] = 1;
  }

  return features;
}

/** Predict house price using exported MLR coefficients */
export function predictPrice(input: PropertyInput): number {
  const features = buildFeatureVector(input);
  let prediction = intercept;

  for (const name of featureNames) {
    prediction += (coefficients[name as keyof typeof coefficients] ?? 0) * features[name];
  }

  return Math.max(Math.round(prediction), 0);
}

/** Estimate confidence band from model R² (educational indicator) */
export function getConfidenceScore(): number {
  return Math.min(Math.round(41), 100);
}

/** Validate property inputs; returns error message or null */
export function validatePropertyInput(input: PropertyInput): string | null {
  if (input.bedrooms < 1 || input.bedrooms > 10) return "Bedrooms must be between 1 and 10.";
  if (input.bathrooms < 0.5 || input.bathrooms > 8) return "Bathrooms must be between 0.5 and 8.";
  if (input.sqftLiving < 300 || input.sqftLiving > 15000) return "Sqft living must be between 300 and 15,000.";
  if (input.sqftLot < 500 || input.sqftLot > 100000) return "Sqft lot must be between 500 and 100,000.";
  if (input.floors < 1 || input.floors > 3.5) return "Floors must be between 1 and 3.5.";
  if (input.condition < 1 || input.condition > 5) return "Condition must be between 1 and 5.";
  if (input.view < 0 || input.view > 4) return "View rating must be between 0 and 4.";
  if (input.yrBuilt < 1900 || input.yrBuilt > 2025) return "Year built must be between 1900 and 2025.";
  if (!input.city) return "Please select a city.";
  return null;
}
