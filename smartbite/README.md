# SmartBite – AI-Powered Smart Food Waste Reduction & Redistribution Platform

> **"Predict Smart. Waste Less. Feed More."**

SmartBite is an end-to-end, AI-powered platform designed to prevent unnecessary food overproduction in commercial kitchens, verify safety and thermal compliance, algorithmically match surplus meals with vetted recipient NGOs and community kitchens, optimize green EV logistics routes, and quantify national environmental and social impact.

---

## 🌟 Key Highlights & Innovations

1. **Dual AI Demand Forecasting Engine:**
   - Deploys **Random Forest Regressor** and **Gradient Boosting Regressors** trained on commercial kitchen consumption parameters.
   - Evaluates 7 core kitchen features: expected covers, historical prep, historical consumption, past waste, day of week, seasonal patterns, and banqueting/events.
   - Dynamically evaluates and displays **MAE**, **RMSE**, and **R² scores**.
   - Computes recommended prep with a calibrated 5% safety buffer, preventing 15–35% of traditional overproduction.

2. **Strict Food Safety & Thermal Compliance Protocol:**
   - Adheres to **FSSAI Surplus Food Regulations**.
   - Mandatory thermal holding thresholds (Hot holding >65°C, Cold refrigeration <4°C).
   - Sensory evaluation checklist (aroma, appearance, container integrity, allergen disclosure).
   - Automated safe-use consumption deadline tracking.

3. **Multi-Factor Algorithmic Recipient Matching:**
   - 10-factor weighted scoring engine evaluating great-circle haversine proximity radius, NGO daily meal distribution capacity, transit travel duration, and remaining safe window margin.

4. **Green Logistics & Interactive OSRM Route Optimization:**
   - OpenStreetMap & Leaflet mapping with intermediate road waypoints, driver dispatch telemetry, and step-by-step milestone progression (`Assigned` ➔ `Pickup in Progress` ➔ `Picked Up` ➔ `In Transit` ➔ `Delivered`).

5. **ESG Sustainability & Carbon Offset Analytics:**
   - Uses UNEP & FAO standard factors (2.5 kg CO₂e avoided per 1 kg food waste diverted; 240 L embedded water preserved).
   - 10 interactive Recharts visualizations (Daily waste trends, category breakdowns, city-wise redistribution, etc.).

6. **Unified Role Portals & 1-Click Demo Persona Switcher:**
   - **Food Provider Portal:** (Restaurants, Hotels, Canteens, Supermarkets)
   - **Recipient NGO Portal:** (Shelters, Food Banks, Community Kitchens)
   - **Logistics Fleet Portal:** (EV Delivery drivers, route waypoints)
   - **Administrator Console:** (Organization verification, compliance audits, database re-seeding)

---

## 🚀 The 6-Step End-To-End Lifecycle

```
    PREDICT DEMAND (AI Forecasting)
               ↓
    PLAN PRODUCTION (Avoid Overproduction)
               ↓
    IDENTIFY SURPLUS (Catalog Batches & Allergens)
               ↓
    VERIFY FOOD SAFETY (Thermal & Sensory Audits)
               ↓
    MATCH ELIGIBLE RECIPIENTS (Proximity & Capacity Engine)
               ↓
    COORDINATE PICKUP & DELIVERY (EV Route Optimization)
               ↓
    MEASURE FOOD SAVED & IMPACT (CO2, Water & Meals Saved)
```

---

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, React Router 7, Recharts, Leaflet / React-Leaflet, Axios.
- **Backend:** Python 3.10+, FastAPI, Uvicorn, SQLAlchemy ORM, Pydantic, SQLite (zero-config local dev fallback) & PostgreSQL compatible.
- **AI & ML:** Scikit-learn (RandomForestRegressor, GradientBoostingRegressor), NumPy, Pandas, Joblib.

---

## 🏃 Local Setup & Quick Start

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

### 2. Backend Setup
```bash
cd smartbite/backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend Swagger Docs:* `http://127.0.0.1:8000/docs`
*Health Check:* `http://127.0.0.1:8000/api/health`

### 3. Frontend Setup
```bash
cd smartbite/frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
*Frontend Application:* `http://127.0.0.1:5173/`

---

## 🔑 Demo Personas (1-Click Login)

For instant evaluation, you can either click the **Switch Persona** dropdown in the top navbar or use the credentials below:

| Role | Name | Email | Password |
|---|---|---|---|
| **Food Provider** | Rajesh Sharma (Green Leaf Fine Dining) | `provider@greenleaf.com` | `password123` |
| **NGO Recipient** | Sunita Deshmukh (Helping Hands NGO) | `ngo@helpinghands.org` | `password123` |
| **Logistics Partner** | Amit Verma (GreenPulse EV Logistics) | `driver@greenpulse.com` | `password123` |
| **Administrator** | Dr. Ananya Roy (SmartBite Board) | `admin@smartbite.org` | `admin123` |

---

## 🏢 Pilot Cities Demonstration

The platform demonstrates national-scale architecture with an active pilot in **Bengaluru** (Indiranagar, Koramangala, Ulsoor, Shivajinagar, Electronic City), and comparative analytics for **Mumbai**, **Delhi NCR**, **Hyderabad**, and **Chennai**.
