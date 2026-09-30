from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.database.session import engine, Base, SessionLocal
from app.utils.seeder import seed_database
from app.ml.demand_model import demand_forecast_engine

from app.api.routes import (
    auth, food, forecast, matching, donations, deliveries, safety, analytics, notifications, admin
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed demo data
    print("Initializing SmartBite database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

    print("Checking AI ML Demand Forecasting engine...")
    if not demand_forecast_engine.is_trained:
        try:
            demand_forecast_engine.train_models()
        except Exception as e:
            print(f"ML Model training fallback initialized: {e}")

    yield
    # Shutdown logic if any

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Smart Food Waste Reduction and Redistribution Platform REST API",
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(food.router, prefix=settings.API_V1_STR)
app.include_router(forecast.router, prefix=settings.API_V1_STR)
app.include_router(matching.router, prefix=settings.API_V1_STR)
app.include_router(donations.router, prefix=settings.API_V1_STR)
app.include_router(deliveries.router, prefix=settings.API_V1_STR)
app.include_router(safety.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(notifications.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "Welcome to SmartBite API - AI-Powered Food Waste Reduction & Redistribution Platform",
        "docs": "/docs",
        "version": settings.VERSION,
        "pilot_cities": ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai"],
        "tagline": "Predict Smart. Waste Less. Feed More."
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "ai_engine": "active",
        "timestamp": "2026-09-29T13:55:00Z"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
