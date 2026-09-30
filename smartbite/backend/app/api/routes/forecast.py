from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import ForecastRequest, ForecastResponse
from app.ml.demand_model import demand_forecast_engine
from app.models.all_models import DemandForecast

router = APIRouter(prefix="/forecast", tags=["AI Demand Forecasting"])

@router.post("/predict", response_model=ForecastResponse)
def predict_demand(req: ForecastRequest, db: Session = Depends(get_db)):
    result = demand_forecast_engine.predict(
        food_item=req.food_item,
        category=req.food_category,
        historical_prep=req.historical_prep_quantity,
        historical_consumption=req.historical_consumption,
        historical_waste=req.historical_waste,
        expected_customers=req.expected_customer_count,
        day_of_week=req.day_of_week,
        season=req.season,
        special_events=req.special_events,
        weather=req.weather or "Clear"
    )

    # Record forecast log in database
    forecast_record = DemandForecast(
        provider_id=1,
        food_category=req.food_category,
        food_item=req.food_item,
        predicted_demand=result["predicted_demand"],
        recommended_quantity=result["recommended_quantity"],
        estimated_surplus=result["estimated_potential_surplus"],
        confidence_score=0.94,
        model_name=result["model_used"],
        forecast_type=result["forecast_type"]
    )
    db.add(forecast_record)
    db.commit()

    return result

@router.get("/metrics")
def get_model_metrics():
    return {
        "status": "active",
        "models": demand_forecast_engine.metrics,
        "is_trained": demand_forecast_engine.is_trained,
        "dataset_size": 1200,
        "features": [
            "expected_customer_count",
            "historical_prep_quantity",
            "historical_consumption",
            "historical_waste",
            "day_of_week",
            "season",
            "special_events"
        ]
    }

@router.get("/history")
def get_forecast_history(db: Session = Depends(get_db)):
    logs = db.query(DemandForecast).order_by(DemandForecast.forecast_date.desc()).limit(10).all()
    return logs
