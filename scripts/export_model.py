"""Export MLR model coefficients and dataset stats for the Next.js app."""
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

df = pd.read_csv("data.csv")
df = df.drop(["street", "date", "statezip", "country"], axis=1)
df = pd.get_dummies(df, columns=["city"], drop_first=True)

X = df.drop("price", axis=1)
y = df["price"]
feature_names = list(X.columns)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_train_pred = model.predict(X_train)

mae = float(mean_absolute_error(y_test, y_pred))
rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
r2 = float(r2_score(y_test, y_pred))
train_r2 = float(r2_score(y_train, y_train_pred))
train_mae = float(mean_absolute_error(y_train, y_train_pred))
train_rmse = float(np.sqrt(mean_squared_error(y_train, y_train_pred)))

# Price distribution buckets
bins = [0, 200000, 400000, 600000, 800000, 1000000, float("inf")]
labels = ["<$200k", "$200k–$400k", "$400k–$600k", "$600k–$800k", "$800k–$1M", ">$1M"]
raw = pd.read_csv("data.csv")
counts = pd.cut(raw["price"], bins=bins, labels=labels).value_counts().sort_index()
distribution = [{"name": str(k), "count": int(v)} for k, v in counts.items()]

# Bedroom distribution
bed_counts = raw["bedrooms"].value_counts().sort_index()
bedroom_dist = []
for b, c in bed_counts.items():
    label = f"{int(b)}" if b < 6 else "6+"
    if b >= 6 and any(x["bedrooms"] == "6+" for x in bedroom_dist):
        bedroom_dist[-1]["count"] += int(c)
    elif b >= 6:
        bedroom_dist.append({"bedrooms": "6+", "count": int(c)})
    else:
        bedroom_dist.append({"bedrooms": label, "count": int(c)})

# Scatter sample
scatter = raw.sample(40, random_state=42)[["sqft_living", "price"]].rename(
    columns={"sqft_living": "sqft"}
)
scatter_data = scatter.to_dict(orient="records")

# Correlation matrix (numeric features)
num_cols = [
    "bedrooms", "bathrooms", "sqft_living", "sqft_lot", "floors",
    "waterfront", "view", "condition", "sqft_above", "sqft_basement",
    "yr_built", "yr_renovated", "price",
]
corr = raw[num_cols].corr()
heatmap_features = ["price", "sqftLiving", "bathrooms", "sqftAbove", "view"]
key_map = {
    "price": "price",
    "sqft_living": "sqftLiving",
    "bathrooms": "bathrooms",
    "sqft_above": "sqftAbove",
    "view": "view",
}
correlation_data = []
for row_feat in ["price", "sqft_living", "bathrooms", "sqft_above", "view"]:
    row = {"feature": row_feat.replace("_", " ").title()}
    for col_feat, col_key in key_map.items():
        row[col_key] = round(float(corr.loc[row_feat, col_feat]), 2)
    correlation_data.append(row)

# Feature importance from abs coefficients (normalized)
coef_abs = np.abs(model.coef_)
top_idx = np.argsort(coef_abs)[::-1][:10]
display_names = {
    "sqft_living": "Sqft Living",
    "waterfront": "Waterfront",
    "view": "View",
    "sqft_above": "Sqft Above",
    "bathrooms": "Bathrooms",
    "sqft_basement": "Sqft Basement",
    "floors": "Floors",
    "bedrooms": "Bedrooms",
    "condition": "Condition",
    "yr_built": "Yr Built",
}
colors = ["#3b82f6", "#8b5cf6", "#a855f7", "#6366f1", "#ec4899", "#f43f5e", "#14b8a6", "#f59e0b", "#10b981", "#64748b"]
max_coef = coef_abs[top_idx].max() if len(top_idx) else 1
feature_importance = []
for i, idx in enumerate(top_idx):
    fname = feature_names[idx]
    if fname.startswith("city_"):
        continue
    if len(feature_importance) >= 8:
        break
    feature_importance.append({
        "feature": display_names.get(fname, fname.replace("_", " ").title()),
        "importance": round(float(coef_abs[idx] / max_coef), 2),
        "color": colors[len(feature_importance) % len(colors)],
    })

# Price by city top 10
city_avg = raw.groupby("city")["price"].mean().sort_values(ascending=False).head(10)
price_by_city = [{"city": c, "avgPrice": int(p)} for c, p in city_avg.items()]

# Actual vs predicted sample
sample_idx = np.random.default_rng(42).choice(len(y_test), 20, replace=False)
actual_vs = [
    {"actual": float(y_test.iloc[i]), "predicted": float(y_pred[i])}
    for i in sample_idx
]

# Cities list (all unique from raw)
cities = sorted(raw["city"].unique().tolist())

# City dummy columns for reference
city_dummies = [c for c in feature_names if c.startswith("city_")]

output = {
    "intercept": float(model.intercept_),
    "coefficients": {feature_names[i]: float(model.coef_[i]) for i in range(len(feature_names))},
    "featureNames": feature_names,
    "cityDummies": city_dummies,
    "metrics": {
        "mae": mae,
        "rmse": rmse,
        "r2": r2,
        "trainMae": train_mae,
        "trainRmse": train_rmse,
        "trainR2": train_r2,
    },
    "datasetStats": {
        "totalRecords": int(len(raw)),
        "featureCount": len(feature_names),
        "avgPrice": float(raw["price"].mean()),
        "minPrice": float(raw["price"].min()),
        "maxPrice": float(raw["price"].max()),
        "avgSqft": float(raw["sqft_living"].mean()),
        "cityCount": int(raw["city"].nunique()),
    },
    "distributionData": distribution,
    "scatterData": scatter_data,
    "bedroomDistribution": bedroom_dist,
    "correlationData": correlation_data,
    "featureImportance": feature_importance,
    "priceByCityData": price_by_city,
    "actualVsPredicted": actual_vs,
    "performanceData": [
        {"name": "Training Set", "r2": train_r2, "mae": train_mae, "rmse": train_rmse},
        {"name": "Test Set", "r2": r2, "mae": mae, "rmse": rmse},
    ],
    "cities": cities,
}

with open("src/data/model.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2)

print("Exported to src/data/model.json")
print(f"MAE={mae:.0f} RMSE={rmse:.0f} R2={r2:.4f}")
