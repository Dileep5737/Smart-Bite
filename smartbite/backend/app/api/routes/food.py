from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database.session import get_db
from app.models.all_models import FoodItem, Organization, AuditLog, FoodSafetyCheck
from app.schemas.schemas import FoodItemCreate, FoodItemUpdate, FoodItemResponse

router = APIRouter(prefix="/food", tags=["Food Inventory & Surplus"])

@router.get("", response_model=List[FoodItemResponse])
def get_food_items(
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    provider_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(FoodItem)
    if category and category != "All":
        query = query.filter(FoodItem.category == category)
    if status and status != "All":
        query = query.filter(FoodItem.listing_status == status)
    if provider_id:
        query = query.filter(FoodItem.provider_id == provider_id)
    if search:
        query = query.filter(FoodItem.food_name.ilike(f"%{search}%"))
        
    return query.order_by(FoodItem.pickup_deadline.asc()).all()

@router.get("/{id}", response_model=FoodItemResponse)
def get_food_item(id: int, db: Session = Depends(get_db)):
    item = db.query(FoodItem).filter(FoodItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Food item not found")
    return item

@router.post("", response_model=FoodItemResponse)
def create_food_item(
    item_in: FoodItemCreate,
    provider_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    # If provider_id not provided, assign to default demo provider
    p_id = provider_id or 1
    provider = db.query(Organization).filter(Organization.id == p_id).first()
    if not provider:
        p_id = 1

    # Image fallback if not provided
    default_img = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
    if item_in.category == "Cooked Meals":
        default_img = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
    elif item_in.category == "Fruits":
        default_img = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80"
    elif item_in.category == "Bakery Products":
        default_img = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"

    new_item = FoodItem(
        provider_id=p_id,
        food_name=item_in.food_name,
        category=item_in.category,
        description=item_in.description,
        quantity=item_in.quantity,
        unit=item_in.unit,
        storage_information=item_in.storage_information,
        storage_temperature=item_in.storage_temperature,
        safe_use_deadline=item_in.safe_use_deadline,
        pickup_deadline=item_in.pickup_deadline,
        allergen_information=item_in.allergen_information,
        safety_status=item_in.safety_status or "Verified",
        listing_status="Available",
        image_url=item_in.image_url or default_img,
        created_at=datetime.utcnow()
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    # Automatically add safety verification log
    safety_log = FoodSafetyCheck(
        food_item_id=new_item.id,
        checked_by=1,
        verification_status="Verified",
        checklist_data={"temp_ok": True, "packaging_intact": True, "hygiene_pass": True},
        remarks=f"Registered with storage condition '{new_item.storage_information}'. Safe window checked."
    )
    db.add(safety_log)

    audit = AuditLog(
        user_id=1,
        action="CREATE_SURPLUS_ITEM",
        entity_type="FoodItem",
        entity_id=new_item.id,
        details=f"Listed {new_item.quantity} {new_item.unit} of {new_item.food_name}"
    )
    db.add(audit)
    db.commit()

    return new_item

@router.put("/{id}", response_model=FoodItemResponse)
def update_food_item(id: int, item_in: FoodItemUpdate, db: Session = Depends(get_db)):
    item = db.query(FoodItem).filter(FoodItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Food item not found")

    if item_in.quantity is not None:
        item.quantity = item_in.quantity
    if item_in.listing_status is not None:
        item.listing_status = item_in.listing_status
    if item_in.safety_status is not None:
        item.safety_status = item_in.safety_status
    if item_in.safe_use_deadline is not None:
        item.safe_use_deadline = item_in.safe_use_deadline
    if item_in.pickup_deadline is not None:
        item.pickup_deadline = item_in.pickup_deadline
    if item_in.storage_information is not None:
        item.storage_information = item_in.storage_information

    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id}")
def delete_food_item(id: int, db: Session = Depends(get_db)):
    item = db.query(FoodItem).filter(FoodItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Food item not found")

    db.delete(item)
    db.commit()
    return {"message": "Food item listing removed successfully"}
