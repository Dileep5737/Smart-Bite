from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.database.session import get_db
from app.models.all_models import FoodSafetyCheck, FoodItem
from app.schemas.schemas import SafetyCheckCreate, SafetyCheckResponse

router = APIRouter(prefix="/safety", tags=["Food Safety Verification"])

@router.post("/checks", response_model=SafetyCheckResponse)
def submit_safety_check(check_in: SafetyCheckCreate, db: Session = Depends(get_db)):
    food = db.query(FoodItem).filter(FoodItem.id == check_in.food_item_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food item not found")

    # Evaluate safety compliance rules
    # Prompt: "Do not automatically approve food based only on appearance... Food safety decisions must follow applicable regulations and appropriate verification procedures."
    all_passed = (
        check_in.packaging_intact and
        check_in.odor_appearance_normal and
        check_in.within_safe_window and
        check_in.hygiene_standards_met
    )
    status = "Verified" if all_passed else "Requires Manual Review"

    check = FoodSafetyCheck(
        food_item_id=check_in.food_item_id,
        checked_by=1,
        verification_status=status,
        checklist_data={
            "storage_temp_celsius": check_in.storage_temp_celsius,
            "packaging_intact": check_in.packaging_intact,
            "odor_appearance_normal": check_in.odor_appearance_normal,
            "within_safe_window": check_in.within_safe_window,
            "hygiene_standards_met": check_in.hygiene_standards_met
        },
        remarks=check_in.remarks or ("Passed all hygiene & temperature verification protocols" if all_passed else "Flagged for safety review"),
        checked_at=datetime.utcnow()
    )
    db.add(check)

    # Update food item safety status
    food.safety_status = status
    if check_in.storage_temp_celsius is not None:
        food.storage_temperature = check_in.storage_temp_celsius

    db.commit()
    db.refresh(check)
    return check

@router.get("/food/{food_id}", response_model=List[SafetyCheckResponse])
def get_food_safety_checks(food_id: int, db: Session = Depends(get_db)):
    return db.query(FoodSafetyCheck).filter(FoodSafetyCheck.food_item_id == food_id).order_by(FoodSafetyCheck.checked_at.desc()).all()

@router.get("/all", response_model=List[SafetyCheckResponse])
def get_all_safety_checks(db: Session = Depends(get_db)):
    return db.query(FoodSafetyCheck).order_by(FoodSafetyCheck.checked_at.desc()).limit(50).all()
