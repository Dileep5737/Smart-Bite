import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logisticsApi } from '../services/api';
import { Delivery } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  Truck, Navigation, MapPin, Clock, ArrowRight,
  CheckCircle2, ShieldCheck, User
} from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    logisticsApi.getDeliveries()
      .then(data => {
        if (data && data.length > 0) {
          setDeliveries(data);
        } else {
          // Provide default realistic demo deliveries
          setDeliveries([
            {
              id: 104,
              donation_id: 1,
              driver_name: "Amit Verma",
              driver_phone: "+91 98450 12345",
              vehicle_number: "KA-05-EV-4029",
              pickup_location: "Fresh Harvest Supermarket, Koramangala",
              delivery_location: "Hope Community Kitchen, Ulsoor",
              route_distance: 6.4,
              estimated_travel_time: 22,
              delivery_status: "In Transit"
            },
            {
              id: 103,
              donation_id: 2,
              driver_name: "Ravi Shankar",
              driver_phone: "+91 98450 67890",
              vehicle_number: "KA-01-EV-8821",
              pickup_location: "Green Leaf Fine Dining, Indiranagar",
              delivery_location: "Helping Hands NGO, Shivajinagar",
              route_distance: 4.8,
              estimated_travel_time: 18,
              delivery_status: "Delivered"
            },
            {
              id: 102,
              donation_id: 3,
              driver_name: "Karan Patel",
              driver_phone: "+91 98450 24680",
              vehicle_number: "KA-03-EV-1102",
              pickup_location: "Grand Palace Hotel, MG Road",
              delivery_location: "Sneha Care Home, Shanthi Nagar",
              route_distance: 3.5,
              estimated_travel_time: 15,
              delivery_status: "Assigned"
            }
          ]);
        }
      })
      .catch(() => {
        // Fallback demo data
        setDeliveries([
          {
            id: 104,
            donation_id: 1,
            driver_name: "Amit Verma",
            driver_phone: "+91 98450 12345",
            vehicle_number: "KA-05-EV-4029",
            pickup_location: "Fresh Harvest Supermarket, Koramangala",
            delivery_location: "Hope Community Kitchen, Ulsoor",
            route_distance: 6.4,
            estimated_travel_time: 22,
            delivery_status: "In Transit"
          },
          {
            id: 103,
            donation_id: 2,
            driver_name: "Ravi Shankar",
            driver_phone: "+91 98450 67890",
            vehicle_number: "KA-01-EV-8821",
            pickup_location: "Green Leaf Fine Dining, Indiranagar",
            delivery_location: "Helping Hands NGO, Shivajinagar",
            route_distance: 4.8,
            estimated_travel_time: 18,
            delivery_status: "Delivered"
          },
          {
            id: 102,
            donation_id: 3,
            driver_name: "Karan Patel",
            driver_phone: "+91 98450 24680",
            vehicle_number: "KA-03-EV-1102",
            pickup_location: "Grand Palace Hotel, MG Road",
            delivery_location: "Sneha Care Home, Shanthi Nagar",
            route_distance: 3.5,
            estimated_travel_time: 15,
            delivery_status: "Assigned"
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Logistics Fleet Portal
            </span>
            <span className="text-xs text-slate-400">EV Fleet Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] mt-1 font-['Poppins']">
            {user?.organization?.organization_name || "GreenPulse Eco-Logistics"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time delivery dispatch, route optimization, and temperature-controlled food transport
          </p>
        </div>

        <Link
          to="/routes"
          className="px-5 py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold shadow-sm transition-all flex items-center space-x-2 shrink-0 self-start sm:self-auto"
        >
          <Navigation className="w-4 h-4" />
          <span>Interactive Route Map</span>
        </Link>
      </div>

      {/* KEY STATISTICS (Only the 4 required metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Available Pickups */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Available Pickups
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#166534] font-['Poppins'] mt-2">
            4 <span className="text-sm font-normal text-slate-500">pickups</span>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Ready at donor kitchens
          </div>
        </div>

        {/* 2. Assigned Deliveries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Assigned Deliveries
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-['Poppins'] mt-2">
            2 <span className="text-sm font-normal text-slate-500">active</span>
          </div>
          <div className="text-xs text-amber-700 font-medium mt-1">
            Assigned to EV drivers
          </div>
        </div>

        {/* 3. Completed Deliveries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Completed Deliveries
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#22c55e] font-['Poppins'] mt-2">
            128 <span className="text-sm font-normal text-slate-500">delivered</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">
            100% on-time delivery rate
          </div>
        </div>

        {/* 4. Active Drivers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Drivers
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] font-['Poppins'] mt-2">
            6 <span className="text-sm font-normal text-slate-500">online</span>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Electric vans & two-wheelers
          </div>
        </div>
      </div>

      {/* CLEAN DELIVERY TABLE (Pickup Location, Destination, Driver, Delivery Status, Track Route button) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0f3d20] font-['Poppins'] flex items-center">
              <Truck className="w-4 h-4 mr-2 text-[#166534]" />
              Active Delivery Missions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status of surplus food pickups and shelter drop-offs
            </p>
          </div>
          <Link
            to="/routes"
            className="text-xs font-semibold text-[#166534] hover:text-[#14532d] hover:underline flex items-center"
          >
            <span>Live GPS Map</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF8] text-slate-600 font-semibold border-b border-slate-200/80 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-5">Pickup Location</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((delivery) => {
                const isDelivered = delivery.delivery_status === 'Delivered';
                const isInTransit = delivery.delivery_status === 'In Transit';
                const isAssigned = delivery.delivery_status === 'Assigned' || delivery.delivery_status === 'Pending';

                return (
                  <tr key={delivery.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Pickup Location */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900 text-sm">
                        {delivery.pickup_location}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                        Donor Kitchen
                      </div>
                    </td>

                    {/* Destination */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {delivery.delivery_location}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                        Recipient Shelter
                      </div>
                    </td>

                    {/* Driver */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 text-xs">
                        {delivery.driver_name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {delivery.vehicle_number}
                      </div>
                    </td>

                    {/* Delivery Status */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInTransit
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          isDelivered ? 'bg-emerald-600' : isInTransit ? 'bg-purple-600 animate-pulse' : 'bg-amber-600'
                        }`} />
                        {delivery.delivery_status}
                      </span>
                    </td>

                    {/* Simple Track Route Button */}
                    <td className="py-4 px-5 text-right">
                      <Link
                        to="/routes"
                        className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        <Navigation className="w-3 h-3 mr-1.5" />
                        <span>Track Route</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#F8FAF8] border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5 text-emerald-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All vehicles equipped with GPS and insulated temperature loggers.</span>
          </div>
          <Link to="/routes" className="text-[#166534] font-semibold hover:underline">
            View Live Route Map →
          </Link>
        </div>
      </div>

    </div>
  );
};
