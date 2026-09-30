import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
)
from sqlalchemy.orm import relationship
from app.database.session import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    organization_name = Column(String(255), nullable=False)
    organization_type = Column(String(100), nullable=False)  # Restaurant, Hotel, Canteen, Supermarket, NGO, Food Bank, Shelter, Logistics
    address = Column(String(500), nullable=False)
    city = Column(String(100), nullable=False, index=True)
    state = Column(String(100), nullable=False, index=True)
    postal_code = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    verification_status = Column(String(50), default="Verified")  # Verified, Pending, Rejected
    capacity_daily_meals = Column(Integer, default=200)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    users = relationship("User", back_populates="organization")
    food_items = relationship("FoodItem", back_populates="provider")
    donations_as_provider = relationship("Donation", foreign_keys="Donation.provider_id", back_populates="provider")
    donations_as_recipient = relationship("Donation", foreign_keys="Donation.recipient_id", back_populates="recipient")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)  # Provider, Recipient, Logistics, Administrator
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    account_status = Column(String(50), default="Active")

    organization = relationship("Organization", back_populates="users")
    notifications = relationship("Notification", back_populates="user")
    safety_checks = relationship("FoodSafetyCheck", back_populates="inspector")

class FoodItem(Base):
    __tablename__ = "food_items"

    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    food_name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # Cooked Meals, Fruits, Vegetables, Bakery Products, Dairy Products, Packaged Foods, Grains, Other Food Items
    description = Column(Text, nullable=True)
    quantity = Column(Float, nullable=False)
    unit = Column(String(50), default="servings")  # servings, kg, liters, packets
    preparation_time = Column(DateTime, default=datetime.datetime.utcnow)
    storage_information = Column(String(255), default="Refrigerated (below 4°C)")  # Refrigerated, Ambient, Frozen, Hot Holding
    storage_temperature = Column(Float, nullable=True)
    safe_use_deadline = Column(DateTime, nullable=False)
    pickup_deadline = Column(DateTime, nullable=False)
    allergen_information = Column(String(255), default="Contains Gluten/Dairy")
    safety_status = Column(String(50), default="Verified")  # Pending Verification, Verified, Rejected, Expired, Requires Manual Review
    listing_status = Column(String(50), default="Available")  # Available, Reserved, Accepted, Ready for Pickup, In Transit, Delivered, Expired, Cancelled
    image_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    provider = relationship("Organization", back_populates="food_items")
    safety_checks = relationship("FoodSafetyCheck", back_populates="food_item")
    requests = relationship("DonationRequest", back_populates="food_item")
    donations = relationship("Donation", back_populates="food_item")

class InventoryRecord(Base):
    __tablename__ = "inventory_records"

    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    food_item_id = Column(Integer, ForeignKey("food_items.id"), nullable=True)
    food_name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    quantity_prepared = Column(Float, nullable=False)
    quantity_consumed = Column(Float, nullable=False)
    quantity_surplus = Column(Float, nullable=False)
    quantity_wasted = Column(Float, nullable=False)
    record_date = Column(DateTime, default=datetime.datetime.utcnow)

class DemandForecast(Base):
    __tablename__ = "demand_forecasts"

    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    food_category = Column(String(100), nullable=False)
    food_item = Column(String(255), nullable=True)
    forecast_date = Column(DateTime, default=datetime.datetime.utcnow)
    predicted_demand = Column(Float, nullable=False)
    recommended_quantity = Column(Float, nullable=False)
    estimated_surplus = Column(Float, nullable=False)
    confidence_score = Column(Float, default=0.92)
    model_name = Column(String(100), default="Random Forest Regressor")
    model_version = Column(String(50), default="v1.2-pilot")
    forecast_type = Column(String(50), default="AI_MODEL")  # AI_MODEL or DEMO_SIMULATED

class DonationRequest(Base):
    __tablename__ = "donation_requests"

    id = Column(Integer, primary_key=True, index=True)
    food_item_id = Column(Integer, ForeignKey("food_items.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    requested_quantity = Column(Float, nullable=False)
    beneficiary_count = Column(Integer, default=50)
    pickup_availability = Column(String(100), default="Immediate pickup available")
    request_status = Column(String(50), default="Pending")  # Pending, Accepted, Rejected, Cancelled
    request_date = Column(DateTime, default=datetime.datetime.utcnow)

    food_item = relationship("FoodItem", back_populates="requests")
    recipient = relationship("Organization")

class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    food_item_id = Column(Integer, ForeignKey("food_items.id"), nullable=False)
    provider_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    quantity_donated = Column(Float, nullable=False)
    donation_status = Column(String(50), default="Active")  # Active, Assigned, Picked Up, In Transit, Completed, Cancelled
    accepted_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    food_item = relationship("FoodItem", back_populates="donations")
    provider = relationship("Organization", foreign_keys=[provider_id], back_populates="donations_as_provider")
    recipient = relationship("Organization", foreign_keys=[recipient_id], back_populates="donations_as_recipient")
    delivery = relationship("Delivery", back_populates="donation", uselist=False)

class Delivery(Base):
    __tablename__ = "deliveries"

    id = Column(Integer, primary_key=True, index=True)
    donation_id = Column(Integer, ForeignKey("donations.id"), nullable=False)
    logistics_partner_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    driver_name = Column(String(255), default="Amit Verma (SmartBite Logistics)")
    driver_phone = Column(String(50), default="+91 98765 43210")
    vehicle_number = Column(String(50), default="KA-05-EV-4029")
    pickup_location = Column(String(500), nullable=False)
    pickup_lat = Column(Float, nullable=True)
    pickup_lng = Column(Float, nullable=True)
    delivery_location = Column(String(500), nullable=False)
    delivery_lat = Column(Float, nullable=True)
    delivery_lng = Column(Float, nullable=True)
    route_distance = Column(Float, default=4.2)  # km
    estimated_travel_time = Column(Integer, default=22)  # minutes
    delivery_status = Column(String(50), default="Assigned")  # Pending, Assigned, Pickup in Progress, Picked Up, In Transit, Delivered, Failed, Cancelled
    picked_up_at = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    notes = Column(String(500), nullable=True)

    donation = relationship("Donation", back_populates="delivery")
    logistics_partner = relationship("Organization")

class FoodSafetyCheck(Base):
    __tablename__ = "food_safety_checks"

    id = Column(Integer, primary_key=True, index=True)
    food_item_id = Column(Integer, ForeignKey("food_items.id"), nullable=False)
    checked_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    verification_status = Column(String(50), default="Verified")  # Verified, Pending, Rejected, Requires Manual Review
    checklist_data = Column(JSON, nullable=True)  # {"temp_ok": true, "hygiene_pack": true, "odor_color_sound": true, "within_window": true}
    remarks = Column(Text, nullable=True)
    checked_at = Column(DateTime, default=datetime.datetime.utcnow)

    food_item = relationship("FoodItem", back_populates="safety_checks")
    inspector = relationship("User", back_populates="safety_checks")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(100), default="Info")  # New Food Available Nearby, New Donation Request, Donation Accepted, Pickup Assigned, Delivery Completed, etc.
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    user_name = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(Integer, nullable=True)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
