import modelData from "./model.json";

export const {
  intercept,
  coefficients,
  featureNames,
  cityDummies,
  metrics,
  datasetStats,
  distributionData,
  scatterData,
  bedroomDistribution,
  correlationData,
  featureImportance,
  priceByCityData,
  actualVsPredicted,
  performanceData,
  cities,
} = modelData;

export type PropertyInput = {
  bedrooms: number;
  bathrooms: number;
  sqftLiving: number;
  sqftLot: number;
  floors: number;
  waterfront: number;
  view: number;
  condition: number;
  sqftAbove: number;
  sqftBasement: number;
  yrBuilt: number;
  yrRenovated: number;
  city: string;
};

export { modelData };
