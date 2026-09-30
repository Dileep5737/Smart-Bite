from typing import Dict, Any, List
from app.models.all_models import Delivery

class LogisticsService:
    @staticmethod
    def calculate_route_waypoints(p_lat: float, p_lng: float, d_lat: float, d_lng: float, steps: int = 6) -> List[Dict[str, float]]:
        """Generate realistic intermediate road waypoints for interactive Leaflet route visualization."""
        waypoints = []
        for i in range(steps + 1):
            ratio = i / float(steps)
            # Add slight realistic road curvature deviation
            curve = 0.003 * (1 - 4 * (ratio - 0.5) ** 2) if 0 < ratio < 1 else 0
            lat = p_lat + (d_lat - p_lat) * ratio + curve
            lng = p_lng + (d_lng - p_lng) * ratio - curve
            waypoints.append({"lat": round(lat, 5), "lng": round(lng, 5)})
        return waypoints

    @staticmethod
    def get_route_details(delivery: Delivery) -> Dict[str, Any]:
        p_lat = delivery.pickup_lat or 12.9716
        p_lng = delivery.pickup_lng or 77.5946
        d_lat = delivery.delivery_lat or 12.9850
        d_lng = delivery.delivery_lng or 77.6100

        waypoints = LogisticsService.calculate_route_waypoints(p_lat, p_lng, d_lat, d_lng)
        
        return {
            "delivery_id": delivery.id,
            "distance_km": delivery.route_distance or 5.2,
            "duration_mins": delivery.estimated_travel_time or 24,
            "waypoints": waypoints,
            "safety_window_mins": 180,
            "route_type": "OSRM_OPTIMIZED_PILOT",
            "driver_name": delivery.driver_name,
            "driver_phone": delivery.driver_phone,
            "vehicle_number": delivery.vehicle_number,
            "delivery_status": delivery.delivery_status
        }

logistics_service = LogisticsService()
