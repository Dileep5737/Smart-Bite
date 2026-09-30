export type UserRole = 'Provider' | 'Recipient' | 'Logistics' | 'Administrator';

export interface Organization {
  id: number;
  organization_name: string;
  organization_type: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
  verification_status: string;
  capacity_daily_meals?: number;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  organization_id?: number;
  organization?: Organization;
  account_status: string;
  created_at: string;
}

export interface FoodItem {
  id: number;
  provider_id: number;
  food_name: string;
  category: string;
  description?: string;
  quantity: number;
  unit: string;
  preparation_time: string;
  storage_information: string;
  storage_temperature?: number;
  safe_use_deadline: string;
  pickup_deadline: string;
  allergen_information?: string;
  safety_status: 'Verified' | 'Pending Verification' | 'Rejected' | 'Requires Manual Review' | 'Expired';
  listing_status: 'Available' | 'Reserved' | 'Accepted' | 'Ready for Pickup' | 'In Transit' | 'Delivered' | 'Expired' | 'Cancelled';
  image_url?: string;
  created_at: string;
  provider?: Organization;
}

export interface ForecastMetric {
  model_name: string;
  mae: number;
  rmse: number;
  r2_score: number;
  confidence: number;
}

export interface ForecastResult {
  food_item: string;
  food_category: string;
  predicted_demand: number;
  recommended_quantity: number;
  estimated_potential_surplus: number;
  model_used: string;
  forecast_type: string;
  metrics_comparison: Record<string, ForecastMetric>;
  explanation: string;
  historical_trends: Array<{
    day: string;
    prepared: number;
    consumed: number;
    waste: number;
    forecast: number;
  }>;
}

export interface RecipientMatch {
  recipient_id: number;
  recipient_name: string;
  organization_type: string;
  address: string;
  distance_km: number;
  estimated_transit_time_mins: number;
  match_score: number;
  eligible: boolean;
  factors: {
    distance_factor: string;
    safe_window_hours: number;
    capacity_meals: number;
    storage_compatible: boolean;
  };
  reasons: string[];
}

export interface DonationRequest {
  id: number;
  food_item_id: number;
  recipient_id: number;
  requested_quantity: number;
  beneficiary_count: number;
  pickup_availability: string;
  request_status: string;
  request_date: string;
  food_item?: FoodItem;
  recipient?: Organization;
}

export interface Donation {
  id: number;
  food_item_id: number;
  provider_id: number;
  recipient_id: number;
  quantity_donated: number;
  donation_status: string;
  accepted_at: string;
  completed_at?: string;
  food_item?: FoodItem;
  provider?: Organization;
  recipient?: Organization;
}

export interface Delivery {
  id: number;
  donation_id: number;
  logistics_partner_id?: number;
  driver_name: string;
  driver_phone: string;
  vehicle_number: string;
  pickup_location: string;
  pickup_lat?: number;
  pickup_lng?: number;
  delivery_location: string;
  delivery_lat?: number;
  delivery_lng?: number;
  route_distance: number;
  estimated_travel_time: number;
  delivery_status: 'Pending' | 'Assigned' | 'Pickup in Progress' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed' | 'Cancelled';
  picked_up_at?: string;
  delivered_at?: string;
  donation?: Donation;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
}

export interface ImpactMetrics {
  total_food_saved_kg: number;
  meals_redistributed: number;
  total_donations_completed: number;
  total_food_waste_prevented_kg: number;
  active_providers: number;
  partner_ngos: number;
  successful_deliveries: number;
  estimated_waste_reduction_pct: number;
  co2_emissions_prevented_kg: number;
  water_saved_liters: number;
  data_mode: string;
}
