from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Auth & User ---
class UserBase(BaseModel):
    email: str
    full_name: str
    phone: Optional[str] = None
    role: str  # Provider, Recipient, Logistics, Administrator

class UserCreate(UserBase):
    password: str
    organization_name: Optional[str] = None
    organization_type: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = "Bengaluru"
    state: Optional[str] = "Karnataka"
    postal_code: Optional[str] = "560001"

class UserLogin(BaseModel):
    email: str
    password: str

class OrganizationResponse(BaseModel):
    id: int
    organization_name: str
    organization_type: str
    address: str
    city: str
    state: str
    postal_code: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    verification_status: str
    capacity_daily_meals: Optional[int] = 200

    class Config:
        from_attributes = True

class UserResponse(UserBase):
    id: int
    account_status: str
    created_at: datetime
    organization_id: Optional[int] = None
    organization: Optional[OrganizationResponse] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# --- Food Items & Inventory ---
class FoodItemBase(BaseModel):
    food_name: str
    category: str
    description: Optional[str] = None
    quantity: float
    unit: str = "servings"
    storage_information: str = "Refrigerated (below 4°C)"
    storage_temperature: Optional[float] = None
    safe_use_deadline: datetime
    pickup_deadline: datetime
    allergen_information: Optional[str] = "None specified"
    safety_status: str = "Verified"
    image_url: Optional[str] = None

class FoodItemCreate(FoodItemBase):
    pass

class FoodItemUpdate(BaseModel):
    quantity: Optional[float] = None
    listing_status: Optional[str] = None
    safety_status: Optional[str] = None
    safe_use_deadline: Optional[datetime] = None
    pickup_deadline: Optional[datetime] = None
    storage_information: Optional[str] = None

class FoodItemResponse(FoodItemBase):
    id: int
    provider_id: int
    preparation_time: datetime
    listing_status: str
    created_at: datetime
    provider: Optional[OrganizationResponse] = None

    class Config:
        from_attributes = True

# --- Demand Forecasting ---
class ForecastRequest(BaseModel):
    food_item: str = "Vegetable Biryani / Meals"
    food_category: str = "Cooked Meals"
    historical_prep_quantity: float = 450
    historical_consumption: float = 410
    historical_waste: float = 40
    expected_customer_count: int = 420
    day_of_week: str = "Friday"
    season: str = "Monsoon"
    special_events: str = "Corporate Tech Conference Nearby"
    weather: Optional[str] = "Rainy / 24°C"

class ForecastMetric(BaseModel):
    model_name: str
    mae: float
    rmse: float
    r2_score: float
    confidence: float

class ForecastResponse(BaseModel):
    food_item: str
    food_category: str
    predicted_demand: float
    recommended_quantity: float
    estimated_potential_surplus: float
    model_used: str
    forecast_type: str  # "ML_TRAINED" or "DEMO_SIMULATED"
    metrics_comparison: Dict[str, ForecastMetric]
    explanation: str
    historical_trends: List[Dict[str, Any]]

# --- Matching ---
class RecipientMatch(BaseModel):
    recipient_id: int
    recipient_name: str
    organization_type: str
    address: str
    distance_km: float
    estimated_transit_time_mins: int
    match_score: int  # 0 to 100
    factors: Dict[str, Any]
    eligible: bool
    reasons: List[str]

# --- Donation Requests & Donations ---
class DonationRequestCreate(BaseModel):
    food_item_id: int
    requested_quantity: float
    beneficiary_count: int = 50
    pickup_availability: str = "Immediate pickup available"

class DonationRequestResponse(BaseModel):
    id: int
    food_item_id: int
    recipient_id: int
    requested_quantity: float
    beneficiary_count: int
    pickup_availability: str
    request_status: str
    request_date: datetime
    food_item: Optional[FoodItemResponse] = None
    recipient: Optional[OrganizationResponse] = None

    class Config:
        from_attributes = True

class DonationCreate(BaseModel):
    food_item_id: int
    recipient_id: int
    quantity_donated: float

class DonationResponse(BaseModel):
    id: int
    food_item_id: int
    provider_id: int
    recipient_id: int
    quantity_donated: float
    donation_status: str
    accepted_at: datetime
    completed_at: Optional[datetime] = None
    food_item: Optional[FoodItemResponse] = None
    provider: Optional[OrganizationResponse] = None
    recipient: Optional[OrganizationResponse] = None

    class Config:
        from_attributes = True

# --- Deliveries & Routes ---
class DeliveryResponse(BaseModel):
    id: int
    donation_id: int
    logistics_partner_id: Optional[int] = None
    driver_name: str
    driver_phone: str
    vehicle_number: str
    pickup_location: str
    pickup_lat: Optional[float] = None
    pickup_lng: Optional[float] = None
    delivery_location: str
    delivery_lat: Optional[float] = None
    delivery_lng: Optional[float] = None
    route_distance: float
    estimated_travel_time: int
    delivery_status: str
    picked_up_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    donation: Optional[DonationResponse] = None

    class Config:
        from_attributes = True

class RouteInfo(BaseModel):
    delivery_id: int
    distance_km: float
    duration_mins: int
    waypoints: List[Dict[str, float]]
    safety_window_mins: int
    route_type: str = "OSRM_OPTIMIZED"

# --- Food Safety ---
class SafetyCheckCreate(BaseModel):
    food_item_id: int
    storage_temp_celsius: Optional[float] = 3.5
    packaging_intact: bool = True
    odor_appearance_normal: bool = True
    within_safe_window: bool = True
    hygiene_standards_met: bool = True
    remarks: Optional[str] = "Checked and approved per pilot safety protocols"

class SafetyCheckResponse(BaseModel):
    id: int
    food_item_id: int
    verification_status: str
    remarks: Optional[str] = None
    checked_at: datetime

    class Config:
        from_attributes = True

# --- Notifications ---
class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    notification_type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Analytics ---
class ImpactMetrics(BaseModel):
    total_food_saved_kg: float
    meals_redistributed: int
    active_providers: int
    partner_ngos: int
    successful_deliveries: int
    estimated_waste_reduction_pct: float
    co2_emissions_prevented_kg: float
    water_saved_liters: float
