from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.all_models import FoodItem
from app.schemas.schemas import RecipientMatch
from app.services.matching_service import matching_engine

router = APIRouter(prefix="/matching", tags=["Recipient Matching Engine"])

@router.get("/food/{food_id}", response_model=List[RecipientMatch])
def match_recipients_for_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(FoodItem).filter(FoodItem.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food listing not found")

    matches = matching_engine.get_recipient_matches(food, db)
    return matches
