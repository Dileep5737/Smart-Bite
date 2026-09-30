from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database.session import get_db
from app.models.all_models import (
    DonationRequest, Donation, FoodItem, Organization, Delivery, Notification, AuditLog
)
from app.schemas.schemas import (
    DonationRequestCreate, DonationRequestResponse,
    DonationResponse
)

router = APIRouter(tags=["Donations & Requests"])

@router.post("/requests", response_model=DonationRequestResponse)
def create_donation_request(req_in: DonationRequestCreate, recipient_id: Optional[int] = None, db: Session = Depends(get_db)):
    food = db.query(FoodItem).filter(FoodItem.id == req_in.food_item_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food item not found")

    r_id = recipient_id or 4  # Default to Helping Hands NGO
    req = DonationRequest(
        food_item_id=req_in.food_item_id,
        recipient_id=r_id,
        requested_quantity=req_in.requested_quantity,
        beneficiary_count=req_in.beneficiary_count,
        pickup_availability=req_in.pickup_availability,
        request_status="Pending",
        request_date=datetime.utcnow()
    )
    db.add(req)
    db.commit()
    db.refresh(req)

    # Notify provider
    notif = Notification(
        user_id=1,
        title="New Donation Request Received",
        message=f"A recipient requested {req.requested_quantity} {food.unit} of {food.food_name}.",
        notification_type="New Donation Request"
    )
    db.add(notif)
    db.commit()

    return req

@router.get("/requests", response_model=List[DonationRequestResponse])
def get_donation_requests(recipient_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(DonationRequest)
    if recipient_id:
        query = query.filter(DonationRequest.recipient_id == recipient_id)
    return query.order_by(DonationRequest.request_date.desc()).all()

@router.put("/requests/{id}/status")
def update_request_status(id: int, status: str, db: Session = Depends(get_db)):
    req = db.query(DonationRequest).filter(DonationRequest.id == id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")

    req.request_status = status
    if status == "Accepted":
        food = req.food_item
        food.listing_status = "Accepted"
        
        # Create completed or in-progress donation
        donation = Donation(
            food_item_id=food.id,
            provider_id=food.provider_id,
            recipient_id=req.recipient_id,
            quantity_donated=req.requested_quantity,
            donation_status="Assigned",
            accepted_at=datetime.utcnow()
        )
        db.add(donation)
        db.commit()
        db.refresh(donation)

        # Create delivery assignment
        p_org = food.provider
        r_org = req.recipient
        delivery = Delivery(
            donation_id=donation.id,
            logistics_partner_id=7,  # GreenPulse
            driver_name="Amit Verma",
            driver_phone="+91 98765 43210",
            vehicle_number="KA-05-EV-4029 (Electric Van)",
            pickup_location=f"{p_org.organization_name}, {p_org.address}, {p_org.city}",
            pickup_lat=p_org.latitude or 12.9716,
            pickup_lng=p_org.longitude or 77.5946,
            delivery_location=f"{r_org.organization_name}, {r_org.address}, {r_org.city}",
            delivery_lat=r_org.latitude or 12.9850,
            delivery_lng=r_org.longitude or 77.6100,
            route_distance=4.8,
            estimated_travel_time=20,
            delivery_status="Assigned",
            notes="Eco-friendly EV dispatch coordinated."
        )
        db.add(delivery)

        # Send notifications
        db.add(Notification(
            user_id=2,  # NGO
            title="Donation Request Accepted!",
            message=f"Provider accepted your request for {food.food_name}. Dispatch partner assigned.",
            notification_type="Donation Accepted"
        ))
        db.add(Notification(
            user_id=3,  # Logistics
            title="New Dispatch Mission",
            message=f"Pickup assigned from {p_org.organization_name} to {r_org.organization_name}.",
            notification_type="Pickup Assigned"
        ))

    db.commit()
    return {"message": f"Request status updated to {status}"}

@router.get("/donations", response_model=List[DonationResponse])
def get_donations(
    provider_id: Optional[int] = None,
    recipient_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Donation)
    if provider_id:
        query = query.filter(Donation.provider_id == provider_id)
    if recipient_id:
        query = query.filter(Donation.recipient_id == recipient_id)
    return query.order_by(Donation.accepted_at.desc()).all()

@router.put("/donations/{id}/status")
def update_donation_status(id: int, status: str, db: Session = Depends(get_db)):
    donation = db.query(Donation).filter(Donation.id == id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    donation.donation_status = status
    if status == "Completed":
        donation.completed_at = datetime.utcnow()
        if donation.food_item:
            donation.food_item.listing_status = "Delivered"
            
    db.commit()
    return {"message": f"Donation status updated to {status}"}
