# PredictHouse — ML Regression Showcase

A premium, portfolio-worthy **Next.js 14** web application showcasing a **Multiple Linear Regression** house price predictor built from the `MLR_Assignment.ipynb` notebook and housing dataset.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Home** — Gradient hero, animated stats, ML workflow, feature highlights
- **About** — Model explanation, dataset details, pipeline cards
- **Dashboard** — Recharts visualizations, correlation heatmap, distributions
- **Predict** — Live MLR inference using exported coefficients
- **Insights** — MAE, RMSE, R² with train/test comparison charts
- Dark/light mode, glassmorphism UI, Framer Motion animations
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| ShadCN UI | Components |
| Framer Motion | Animations |
| Recharts | Charts |
| Lucide React | Icons |
| next-themes | Dark/light mode |

## Project Structure

```
├── public/
│   ├── favicon.svg
│   └── data/sample-houses.json
├── scripts/
│   └── export_model.py      # Regenerate model.json from data.csv
├── src/
│   ├── app/                 # Pages (App Router)
│   ├── components/          # UI + layout components
│   ├── data/
│   │   ├── model.json       # Exported coefficients & chart data
│   │   └── index.ts
│   ├── hooks/
│   └── lib/                 # predict, formatters, animations
├── data.csv                 # Housing sales dataset
└── MLR_Assignment.ipynb     # Reference notebook
```

## Prerequisites

- **Node.js** 18.17 or later
- **npm** (or yarn/pnpm)
- **Python 3** + pandas, scikit-learn (only to regenerate `model.json`)

## Installation

```bash
# Clone or open the project folder
cd Multiple_Linear_Regression_Nextjs_Webapp

# Install dependencies
npm install
```

## Run Locally

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

## Regenerate Model Data

After updating `data.csv` or retraining in the notebook:

```bash
pip install pandas scikit-learn numpy
npm run export-model
```

This writes `src/data/model.json` with coefficients, metrics, and chart datasets.

## Model Metrics (Test Set)

| Metric | Value |
|--------|-------|
| MAE | ~$172,955 |
| RMSE | ~$988,714 |
| R² | ~0.041 |

## Deploy to Vercel

1. Push the project to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import your repository.
4. Framework preset: **Next.js** (auto-detected).
5. Build command: `npm run build` · Output: `.next`
6. Click **Deploy**.

No environment variables are required for the demo (inference runs client-side).

### Optional: Vercel CLI

```bash
npm i -g vercel
vercel
```

## Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero & stats |
| `/about` | Project & ML pipeline documentation |
| `/dashboard` | Data visualization dashboard |
| `/predict` | Interactive price prediction form |
| `/insights` | Model performance metrics |

## License

Educational / portfolio use. Dataset from the MLR assignment (housing sales data).
