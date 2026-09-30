from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.analytics_service import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics & Impact Dashboard"])

@router.get("/overview")
def get_overview(db: Session = Depends(get_db)):
    return analytics_service.get_overview_metrics(db)

@router.get("/waste")
def get_waste_trends():
    return analytics_service.get_waste_trends()

@router.get("/categories")
def get_category_distribution():
    return analytics_service.get_category_distribution()

@router.get("/cities")
def get_city_distribution():
    return analytics_service.get_city_distribution()

@router.get("/impact")
def get_impact_details(db: Session = Depends(get_db)):
    metrics = analytics_service.get_overview_metrics(db)
    return {
        "metrics": metrics,
        "methodology": {
            "ghg_calculation": "UNEP / FAO Standard: 2.5 kg CO2e emissions avoided per 1 kg food waste eliminated from landfills.",
            "water_footprint": "Water Footprint Network estimate: 240 liters embedded freshwater saved per 1 kg prepared meal redistributed.",
            "landfill_diversion": "100% of verified collected surplus diverted from municipal solid waste streams.",
            "data_transparency_note": "Pilot metrics derived from verified active collection logs in demonstration cities."
        }
    }
