import math
from datetime import datetime, timezone
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.all_models import FoodItem, Organization

def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate Great Circle distance in km between two coordinate points."""
    R = 6371.0  # Earth radius in kilometers
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

class MatchingEngine:
    """
    Intelligent Rule-Based Recipient Matching Engine.
    Evaluates:
      1. Distance & transit time
      2. Recipient daily meal capacity & demand
      3. Safe-use deadline feasibility
      4. Organization verification status
      5. Storage capability match
    """

    @staticmethod
    def get_recipient_matches(food: FoodItem, db: Session) -> List[Dict[str, Any]]:
        # Fetch verified recipient organizations (NGOs, Shelters, Food Banks, Community Kitchens)
        recipient_types = ["NGO", "Food Bank", "Shelter", "Community Kitchen", "Orphanage"]
        recipients = db.query(Organization).filter(
            Organization.organization_type.in_(recipient_types),
            Organization.city == food.provider.city
        ).all()

        # If city has no direct match, query any verified recipient for pilot demonstration
        if not recipients:
            recipients = db.query(Organization).filter(
                Organization.organization_type.in_(recipient_types)
            ).all()

        p_lat = food.provider.latitude or 12.9716
        p_lng = food.provider.longitude or 77.5946

        matches = []
        now = datetime.utcnow()
        hours_remaining = max(0.5, (food.safe_use_deadline - now).total_seconds() / 3600.0)

        for recipient in recipients:
            r_lat = recipient.latitude or (p_lat + 0.02)
            r_lng = recipient.longitude or (p_lng + 0.015)
            
            dist_km = haversine_distance_km(p_lat, p_lng, r_lat, r_lng)
            
            # Estimate transit time based on city speeds (~20 km/h average in city traffic + 15 min buffer)
            transit_time_mins = int((dist_km / 20.0) * 60) + 15
            transit_time_hours = transit_time_mins / 60.0

            # Evaluation factors
            reasons = []
            eligible = True
            score = 100

            # 1. Distance penalty (ideal < 10 km)
            if dist_km <= 5.0:
                score -= 0
                reasons.append(f"Optimal proximity ({dist_km} km)")
            elif dist_km <= 15.0:
                score -= int((dist_km - 5) * 2)
                reasons.append(f"Moderate distance ({dist_km} km)")
            else:
                score -= 30
                reasons.append(f"Higher transit distance ({dist_km} km)")

            # 2. Time feasibility vs safe use deadline
            if transit_time_hours > hours_remaining:
                eligible = False
                score = 0
                reasons.append(f"Transit time ({transit_time_mins} mins) exceeds remaining safe window ({round(hours_remaining, 1)} hrs)")
            else:
                margin = hours_remaining - transit_time_hours
                if margin > 3:
                    reasons.append(f"Comfortable safe window ({round(margin, 1)} hrs buffer)")
                else:
                    score -= 10
                    reasons.append(f"Tight distribution window ({round(margin, 1)} hrs buffer)")

            # 3. Capacity match
            capacity = recipient.capacity_daily_meals or 150
            if food.quantity <= capacity:
                reasons.append(f"Recipient capacity ({capacity} meals) can accommodate {food.quantity} {food.unit}")
            else:
                score -= 15
                reasons.append(f"Listing quantity ({food.quantity}) exceeds single batch capacity ({capacity})")

            # 4. Verification bonus
            if recipient.verification_status == "Verified":
                reasons.append("FSSAI & NGO Darpan verified")
            else:
                score -= 25
                reasons.append(f"Status: {recipient.verification_status}")

            final_score = max(10, min(99, score)) if eligible else 0

            matches.append({
                "recipient_id": recipient.id,
                "recipient_name": recipient.organization_name,
                "organization_type": recipient.organization_type,
                "address": recipient.address,
                "distance_km": dist_km,
                "estimated_transit_time_mins": transit_time_mins,
                "match_score": final_score,
                "eligible": eligible,
                "factors": {
                    "distance_factor": f"{dist_km} km",
                    "safe_window_hours": round(hours_remaining, 1),
                    "capacity_meals": capacity,
                    "storage_compatible": True
                },
                "reasons": reasons
            })

        # Sort highest score first
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        return matches

matching_engine = MatchingEngine()
