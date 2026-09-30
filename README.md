# SmartBite – AI-Powered Smart Food Waste Reduction & Redistribution Platform

> **"Predict Smart. Waste Less. Feed More."**

SmartBite is an end-to-end, AI-powered platform designed to prevent unnecessary food overproduction in commercial kitchens, verify safety and thermal compliance, algorithmically match surplus meals with vetted recipient NGOs and community kitchens, optimize green EV logistics routes, and quantify national environmental and social impact.

---

## 🚀 Running the Project Locally

The project is structured cleanly into `smartbite/frontend` and `smartbite/backend`:

### 1. Start Backend (FastAPI + AI Engine + SQLite/Postgres)
```powershell
cd smartbite\backend
.\venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Health: `http://127.0.0.1:8000/api/health`
- Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

### 2. Start Frontend (React + TypeScript + Vite + Tailwind CSS)
```powershell
cd smartbite\frontend
npm run dev
```
- Web Application: `http://127.0.0.1:5173/`

---

## 🔑 1-Click Demo Accounts

| Role | Organization | Email | Password |
|---|---|---|---|
| **Food Provider** | Green Leaf Fine Dining | `provider@greenleaf.com` | `password123` |
| **NGO Recipient** | Helping Hands NGO | `ngo@helpinghands.org` | `password123` |
| **Logistics Partner** | GreenPulse EV Logistics | `driver@greenpulse.com` | `password123` |
| **Administrator** | SmartBite Governance Board | `admin@smartbite.org` | `admin123` |

You can also use the **Persona Switcher** in the top navigation bar to instantaneously toggle between roles during demonstrations!
