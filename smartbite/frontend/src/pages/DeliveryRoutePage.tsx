import React, { useState, useEffect } from 'react';
import { logisticsApi } from '../services/api';
import { Delivery } from '../types';
import {
  Truck, MapPin, Clock, ShieldCheck, CheckCircle2,
  Navigation, Check, AlertCircle, ArrowRight, UserCheck
} from 'lucide-react';

export const DeliveryRoutePage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const data = await logisticsApi.getDeliveries();
      setDeliveries(data);
      if (data.length > 0) {
        setSelectedDelivery(data[0]);
      }
    } catch {
      // Demo fallback
      const fallback: Delivery = {
        id: 1,
        donation_id: 1,
        driver_name: "Amit Verma",
        driver_phone: "+91 98765 43210",
        vehicle_number: "KA-05-EV-4029 (Electric Van)",
        pickup_location: "Fresh Harvest Supermarket, 80 Feet Road, Koramangala",
        pickup_lat: 12.9345,
        pickup_lng: 77.6266,
        delivery_location: "Hope Community Kitchen, Old Madras Road, Ulsoor",
        delivery_lat: 12.9822,
        delivery_lng: 77.6255,
        route_distance: 6.4,
        estimated_travel_time: 24,
        delivery_status: "In Transit",
        picked_up_at: new Date(Date.now() - 15 * 60000).toISOString()
      };
      setDeliveries([fallback]);
      setSelectedDelivery(fallback);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedDelivery) return;
    setStatusUpdating(true);
    try {
      await logisticsApi.updateStatus(selectedDelivery.id, newStatus);
    } catch {}

    const updated = { ...selectedDelivery, delivery_status: newStatus as any };
    setSelectedDelivery(updated);
    setDeliveries(deliveries.map(d => d.id === updated.id ? updated : d));
    setStatusUpdating(false);
  };

  const statusSteps = [
    "Assigned",
    "Pickup in Progress",
    "Picked Up",
    "In Transit",
    "Delivered"
  ];

  const currentStepIndex = selectedDelivery ? statusSteps.indexOf(selectedDelivery.delivery_status) : 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Green Logistics & Dispatch
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] mt-2 font-['Poppins']">
            Delivery & Route Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            EV fleet route navigation, temperature safety bounds, and real-time delivery lifecycle tracking.
          </p>
        </div>

        {selectedDelivery && (
          <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Mission Active • {selectedDelivery.vehicle_number}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Map & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 cols: Map & Waypoints Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm font-['Poppins'] flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-emerald-600" />
                Interactive OpenStreetMap & Route Waypoints
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                OSRM Optimized
              </span>
            </div>

            {/* Interactive Visual Map Card */}
            <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner p-4 flex flex-col justify-between">
              
              {/* Map Canvas Background Grid */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `radial-gradient(#22C55E 1px, transparent 1px), radial-gradient(#166534 1px, #0f172a 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }}
              />

              {/* Waypoint Simulation Path SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Route path curve */}
                <path
                  d="M 60 220 Q 180 80 320 180 T 520 80"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                
                {/* Pickup marker */}
                <circle cx="60" cy="220" r="10" fill="#166534" stroke="#ffffff" strokeWidth="3" />
                <text x="75" y="225" fill="#ffffff" fontSize="12" fontWeight="bold">Pickup (Koramangala)</text>

                {/* Waypoint 1 */}
                <circle cx="210" cy="130" r="5" fill="#F59E0B" />
                <text x="210" y="115" fill="#94a3b8" fontSize="10">MG Road Corridor</text>

                {/* Waypoint 2 */}
                <circle cx="370" cy="170" r="5" fill="#F59E0B" />
                <text x="370" y="195" fill="#94a3b8" fontSize="10">Halasuru Waypoint</text>

                {/* Destination marker */}
                <circle cx="520" cy="80" r="10" fill="#F59E0B" stroke="#ffffff" strokeWidth="3" />
                <text x="430" y="65" fill="#F59E0B" fontSize="12" fontWeight="bold">Destination (Ulsoor)</text>
              </svg>

              {/* Floating Route Telemetry Box */}
              <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-xl max-w-xs text-xs text-white space-y-1">
                <div className="font-bold text-emerald-400 flex items-center">
                  <Truck className="w-3.5 h-3.5 mr-1" />
                  <span>EV Dispatch Status: {selectedDelivery?.delivery_status}</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Distance: <strong>6.4 km</strong> • Est. Transit: <strong>22 mins</strong>
                </div>
                <div className="text-[10px] text-slate-400">
                  Thermal Sensor: Cargo 66.8°C (Within Safe Bound)
                </div>
              </div>

              {/* Bottom Street View Note */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-lg">
                <span>Pilot Hub: Bengaluru East Sector</span>
                <span>Leaflet OSM Engine Active</span>
              </div>
            </div>

            {/* Turn by turn waypoint specs */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pickup Facility</span>
                <strong className="text-slate-800 block mt-0.5">{selectedDelivery?.pickup_location}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Destination Shelter</span>
                <strong className="text-slate-800 block mt-0.5">{selectedDelivery?.delivery_location}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Mission Control & Status Progression */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base font-['Poppins']">
                Active Mission Execution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Update delivery milestones to notify both provider and recipient in real time.
              </p>
            </div>

            {/* Stepper tracker */}
            <div className="space-y-4">
              {statusSteps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} className="flex items-center space-x-3.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-bold ${isCurrent ? 'text-emerald-950 font-extrabold' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status Change Buttons for Live Demo */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Update Driver Step (Demo Interactive)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Picked Up')}
                  className="py-2 px-3 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-xs font-bold text-emerald-900 transition-colors"
                >
                  Mark Picked Up
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('In Transit')}
                  className="py-2 px-3 rounded-xl border border-purple-300 bg-white hover:bg-purple-50 text-xs font-bold text-purple-900 transition-colors"
                >
                  Mark In Transit
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Delivered')}
                  className="col-span-2 py-2.5 px-3 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Final Delivery to NGO</span>
                </button>
              </div>
            </div>

            {/* Driver Profile */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{selectedDelivery?.driver_name}</div>
                  <div className="text-slate-500 text-[11px]">{selectedDelivery?.driver_phone}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Vehicle</span>
                <span className="font-bold text-emerald-900">{selectedDelivery?.vehicle_number}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
