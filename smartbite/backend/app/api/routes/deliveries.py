from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database.session import get_db
from app.models.all_models import Delivery, Notification, AuditLog
from app.schemas.schemas import DeliveryResponse
from app.services.logistics_service import logistics_service

router = APIRouter(prefix="/deliveries", tags=["Logistics & Route Management"])

@router.get("", response_model=List[DeliveryResponse])
def get_deliveries(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Delivery)
    if status and status != "All":
        query = query.filter(Delivery.delivery_status == status)
    return query.order_by(Delivery.id.desc()).all()

@router.get("/{id}", response_model=DeliveryResponse)
def get_delivery(id: int, db: Session = Depends(get_db)):
    delivery = db.query(Delivery).filter(Delivery.id == id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery record not found")
    return delivery

@router.put("/{id}/status")
def update_delivery_status(id: int, status: str, db: Session = Depends(get_db)):
    delivery = db.query(Delivery).filter(Delivery.id == id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery record not found")

    valid_statuses = [
        "Pending", "Assigned", "Pickup in Progress",
        "Picked Up", "In Transit", "Delivered", "Failed", "Cancelled"
    ]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")

    delivery.delivery_status = status
    now = datetime.utcnow()

    if status in ["Pickup in Progress", "Picked Up"]:
        delivery.picked_up_at = now
        if delivery.donation:
            delivery.donation.donation_status = "Picked Up"
            if delivery.donation.food_item:
                delivery.donation.food_item.listing_status = "In Transit"
    elif status == "Delivered":
        delivery.delivered_at = now
        if delivery.donation:
            delivery.donation.donation_status = "Completed"
            delivery.donation.completed_at = now
            if delivery.donation.food_item:
                delivery.donation.food_item.listing_status = "Delivered"

        # Notify NGO and Provider
        db.add(Notification(
            user_id=2,  # NGO
            title="Food Delivered Successfully!",
            message=f"Delivery from {delivery.pickup_location.split(',')[0]} has arrived. Please confirm receipt.",
            notification_type="Delivery Completed"
        ))
        db.add(Notification(
            user_id=1,  # Provider
            title="Redistribution Completed",
            message="Your surplus donation has been successfully handed over to the community kitchen.",
            notification_type="Delivery Completed"
        ))

    db.commit()
    return {"message": f"Delivery #{id} status updated to {status}", "current_status": status}

@router.get("/{id}/route")
def get_delivery_route(id: int, db: Session = Depends(get_db)):
    delivery = db.query(Delivery).filter(Delivery.id == id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery record not found")

    return logistics_service.get_route_details(delivery)
