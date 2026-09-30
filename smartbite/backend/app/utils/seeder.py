import datetime
from sqlalchemy.orm import Session
from app.models.all_models import (
    Organization, User, FoodItem, DemandForecast,
    Donation, Delivery, FoodSafetyCheck, Notification, AuditLog
)
from app.core.security import hash_password

def seed_database(db: Session):
    """Seed comprehensive realistic DEMO DATA for SmartBite pilot."""
    # Check if already seeded
    if db.query(User).first():
        return

    print("Seeding SmartBite demo database...")

    # 1. Organizations
    orgs = [
        Organization(
            id=1,
            organization_name="Green Leaf Fine Dining",
            organization_type="Restaurant",
            address="102, 100 Feet Road, Indiranagar",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560038",
            latitude=12.9784,
            longitude=77.6408,
            verification_status="Verified",
            capacity_daily_meals=350
        ),
        Organization(
            id=2,
            organization_name="Fresh Harvest Supermarket",
            organization_type="Supermarket",
            address="45, 80 Feet Road, Koramangala 4th Block",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560034",
            latitude=12.9345,
            longitude=77.6266,
            verification_status="Verified",
            capacity_daily_meals=500
        ),
        Organization(
            id=3,
            organization_name="Campus Kitchen - Apex Institute",
            organization_type="Canteen",
            address="Gate 2, Tech Campus, Electronic City Phase 1",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560100",
            latitude=12.8399,
            longitude=77.6770,
            verification_status="Verified",
            capacity_daily_meals=800
        ),
        Organization(
            id=4,
            organization_name="Helping Hands NGO",
            organization_type="NGO",
            address="14, Queens Road, Tasker Town, Shivajinagar",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560051",
            latitude=12.9856,
            longitude=77.6012,
            verification_status="Verified",
            capacity_daily_meals=250
        ),
        Organization(
            id=5,
            organization_name="Hope Community Kitchen",
            organization_type="Community Kitchen",
            address="88, Old Madras Road, Ulsoor",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560008",
            latitude=12.9822,
            longitude=77.6255,
            verification_status="Verified",
            capacity_daily_meals=200
        ),
        Organization(
            id=6,
            organization_name="Care Shelter Foundation",
            organization_type="Shelter",
            address="23, Amarjyoti Layout, Domlur",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560071",
            latitude=12.9610,
            longitude=77.6387,
            verification_status="Verified",
            capacity_daily_meals=180
        ),
        Organization(
            id=7,
            organization_name="GreenPulse Eco-Logistics",
            organization_type="Logistics",
            address="Logistics Hub, MG Road",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560001",
            latitude=12.9756,
            longitude=77.6066,
            verification_status="Verified",
            capacity_daily_meals=1000
        ),
        Organization(
            id=8,
            organization_name="SmartBite Governance Board",
            organization_type="Administration",
            address="SmartBite Pilot Center, Bengaluru",
            city="Bengaluru",
            state="Karnataka",
            postal_code="560001",
            latitude=12.9716,
            longitude=77.5946,
            verification_status="Verified",
            capacity_daily_meals=1000
        )
    ]
    db.add_all(orgs)
    db.commit()

    # 2. Users (One for each core role)
    users = [
        User(
            id=1,
            full_name="Rajesh Sharma",
            email="provider@greenleaf.com",
            phone="+91 98450 11223",
            password_hash=hash_password("password123"),
            role="Provider",
            organization_id=1,
            account_status="Active"
        ),
        User(
            id=2,
            full_name="Sunita Deshmukh",
            email="ngo@helpinghands.org",
            phone="+91 98200 44556",
            password_hash=hash_password("password123"),
            role="Recipient",
            organization_id=4,
            account_status="Active"
        ),
        User(
            id=3,
            full_name="Amit Verma",
            email="driver@greenpulse.com",
            phone="+91 98765 43210",
            password_hash=hash_password("password123"),
            role="Logistics",
            organization_id=7,
            account_status="Active"
        ),
        User(
            id=4,
            full_name="Dr. Ananya Roy (Admin)",
            email="admin@smartbite.org",
            phone="+91 99000 88776",
            password_hash=hash_password("admin123"),
            role="Administrator",
            organization_id=8,
            account_status="Active"
        )
    ]
    db.add_all(users)
    db.commit()

    # 3. Food Items
    now = datetime.datetime.utcnow()
    food_items = [
        FoodItem(
            id=1,
            provider_id=1,
            food_name="Hyderabadi Vegetable Dum Biryani & Mirchi Ka Salan",
            category="Cooked Meals",
            description="Freshly prepared aromatic basmati rice with farm-fresh vegetables, saffron, and spices. Stored in hot holding units.",
            quantity=45.0,
            unit="servings",
            preparation_time=now - datetime.timedelta(hours=2),
            storage_information="Hot Holding (>65°C)",
            storage_temperature=68.5,
            safe_use_deadline=now + datetime.timedelta(hours=4),
            pickup_deadline=now + datetime.timedelta(hours=2),
            allergen_information="Dairy (Ghee), Nuts (Cashews)",
            safety_status="Verified",
            listing_status="Available",
            image_url="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
        ),
        FoodItem(
            id=2,
            provider_id=1,
            food_name="Soft Phulka Chapati & Dal Tadka with Paneer",
            category="Cooked Meals",
            description="Warm whole wheat rotis paired with protein-rich yellow lentil dal and fresh cottage cheese gravy.",
            quantity=60.0,
            unit="servings",
            preparation_time=now - datetime.timedelta(hours=1, minutes=30),
            storage_information="Insulated Food Grade Warm Containers",
            storage_temperature=65.0,
            safe_use_deadline=now + datetime.timedelta(hours=5),
            pickup_deadline=now + datetime.timedelta(hours=2, minutes=30),
            allergen_information="Gluten, Dairy",
            safety_status="Verified",
            listing_status="Available",
            image_url="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80"
        ),
        FoodItem(
            id=3,
            provider_id=2,
            food_name="Organic Robusta Bananas & Shimla Apples",
            category="Fruits",
            description="Grade-A ripe fruit surplus from morning retail displays. Firm texture, excellent nutritional quality.",
            quantity=30.0,
            unit="kg",
            preparation_time=now - datetime.timedelta(hours=6),
            storage_information="Cool Ambient Ventilated Crates",
            storage_temperature=18.0,
            safe_use_deadline=now + datetime.timedelta(days=2),
            pickup_deadline=now + datetime.timedelta(hours=8),
            allergen_information="None",
            safety_status="Verified",
            listing_status="Available",
            image_url="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80"
        ),
        FoodItem(
            id=4,
            provider_id=2,
            food_name="Whole Grain Brown Bread & Sweet Milk Buns",
            category="Bakery Products",
            description="Packaged bakery surplus from morning shelf stock, sealed in food-grade wrapping.",
            quantity=35.0,
            unit="packets",
            preparation_time=now - datetime.timedelta(hours=12),
            storage_information="Dry Storage",
            storage_temperature=22.0,
            safe_use_deadline=now + datetime.timedelta(days=1),
            pickup_deadline=now + datetime.timedelta(hours=6),
            allergen_information="Gluten, Milk",
            safety_status="Verified",
            listing_status="Reserved",
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
        ),
        FoodItem(
            id=5,
            provider_id=3,
            food_name="Steamed Sona Masoori Rice & Sambar",
            category="Cooked Meals",
            description="Canteen lunch batch cooked with hygienic steam kettles and balanced herbs.",
            quantity=50.0,
            unit="servings",
            preparation_time=now - datetime.timedelta(hours=2),
            storage_information="Insulated Thermal Food Carts",
            storage_temperature=66.0,
            safe_use_deadline=now + datetime.timedelta(hours=4),
            pickup_deadline=now + datetime.timedelta(hours=2),
            allergen_information="Mustard seeds",
            safety_status="Verified",
            listing_status="Accepted",
            image_url="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80"
        )
    ]
    db.add_all(food_items)
    db.commit()

    # 4. Food Safety Checks
    safety_checks = [
        FoodSafetyCheck(
            food_item_id=1,
            checked_by=1,
            verification_status="Verified",
            checklist_data={"temp_ok": True, "packaging_intact": True, "sensory_passed": True, "within_window": True},
            remarks="Holding temperature 68.5°C verified. Steam intact. Packaged in sanitized stainless containers.",
            checked_at=now - datetime.timedelta(minutes=45)
        ),
        FoodSafetyCheck(
            food_item_id=2,
            checked_by=1,
            verification_status="Verified",
            checklist_data={"temp_ok": True, "packaging_intact": True, "sensory_passed": True, "within_window": True},
            remarks="Dal pH & temperature checked. Roti steam sealed. Passed all pilot safety protocols.",
            checked_at=now - datetime.timedelta(minutes=30)
        )
    ]
    db.add_all(safety_checks)
    db.commit()

    # 5. Donations & Deliveries (One active delivery in transit for the live demo)
    donation_active = Donation(
        id=1,
        food_item_id=4,
        provider_id=2,
        recipient_id=5,  # Hope Community Kitchen
        quantity_donated=35.0,
        donation_status="In Transit",
        accepted_at=now - datetime.timedelta(minutes=40)
    )
    db.add(donation_active)
    db.commit()

    delivery_active = Delivery(
        id=1,
        donation_id=1,
        logistics_partner_id=7,
        driver_name="Amit Verma",
        driver_phone="+91 98765 43210",
        vehicle_number="KA-05-EV-4029 (Electric Van)",
        pickup_location="Fresh Harvest Supermarket, 80 Feet Road, Koramangala",
        pickup_lat=12.9345,
        pickup_lng=77.6266,
        delivery_location="Hope Community Kitchen, Ulsoor, Bengaluru",
        delivery_lat=12.9822,
        delivery_lng=77.6255,
        route_distance=6.4,
        estimated_travel_time=24,
        delivery_status="In Transit",
        picked_up_at=now - datetime.timedelta(minutes=15),
        notes="Temperature monitored EV delivery cargo container active."
    )
    db.add(delivery_active)
    db.commit()

    # 6. Notifications
    notifs = [
        Notification(
            user_id=1,
            title="AI Demand Alert: Friday Surge Expected",
            message="Demand forecasting predicts an 18% surge today due to local tech events. Recommended prep adjusted.",
            notification_type="Forecast Update",
            is_read=False,
            created_at=now - datetime.timedelta(hours=3)
        ),
        Notification(
            user_id=2,
            title="New Verified Surplus Nearby (2.8 km)",
            message="Green Leaf Fine Dining has listed 45 servings of fresh Biryani with 4 hrs safe window.",
            notification_type="New Food Available Nearby",
            is_read=False,
            created_at=now - datetime.timedelta(hours=1)
        ),
        Notification(
            user_id=3,
            title="Dispatch Assigned: Mission #SB-DEL-104",
            message="Pickup assigned from Koramangala to Ulsoor. EV route optimized via OSRM.",
            notification_type="Pickup Assigned",
            is_read=True,
            created_at=now - datetime.timedelta(minutes=40)
        ),
        Notification(
            user_id=4,
            title="Organization Verification Requested",
            message="Sunrise Catering Services submitted FSSAI compliance documents for review.",
            notification_type="Organization Verification Update",
            is_read=False,
            created_at=now - datetime.timedelta(hours=2)
        )
    ]
    db.add_all(notifs)

    # 7. Audit log
    audit = AuditLog(
        user_id=1,
        user_name="Rajesh Sharma",
        action="CREATE_SURPLUS_LISTING",
        entity_type="FoodItem",
        entity_id=1,
        details="Added 45 servings Hyderabadi Dum Biryani with verified safety checklist."
    )
    db.add(audit)
    db.commit()
    print("Database seeding completed successfully.")
