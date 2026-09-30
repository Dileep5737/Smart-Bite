from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.all_models import Organization, User, FoodItem, Donation, AuditLog
from app.schemas.schemas import OrganizationResponse, UserResponse
from app.utils.seeder import seed_database

router = APIRouter(prefix="/admin", tags=["Administrator Operations"])

@router.get("/dashboard")
def get_admin_dashboard(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    providers = db.query(Organization).filter(Organization.organization_type.in_(["Restaurant", "Hotel", "Canteen", "Supermarket"])).count()
    verified_ngos = db.query(Organization).filter(Organization.organization_type.in_(["NGO", "Food Bank", "Shelter", "Community Kitchen"])).count()
    total_listings = db.query(FoodItem).count()
    completed_donations = db.query(Donation).filter(Donation.donation_status == "Completed").count()
    pending_orgs = db.query(Organization).filter(Organization.verification_status == "Pending").count()

    recent_audits = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(10).all()

    return {
        "total_registered_users": total_users,
        "active_food_providers": providers,
        "verified_ngos": verified_ngos,
        "total_food_listings": total_listings,
        "completed_donations": completed_donations,
        "pending_verifications": pending_orgs,
        "recent_audits": recent_audits
    }

@router.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/organizations", response_model=List[OrganizationResponse])
def get_organizations(db: Session = Depends(get_db)):
    return db.query(Organization).all()

@router.put("/organizations/{id}/verification")
def update_org_verification(id: int, status: str, db: Session = Depends(get_db)):
    org = db.query(Organization).filter(Organization.id == id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    org.verification_status = status
    db.commit()
    return {"message": f"Organization '{org.organization_name}' verification updated to {status}"}

@router.post("/seed-demo")
def trigger_demo_seed(db: Session = Depends(get_db)):
    seed_database(db)
    return {"message": "Demo data checked and seeded successfully"}
