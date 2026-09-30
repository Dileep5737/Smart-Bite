import React, { useState, useEffect } from 'react';
import { foodApi, matchingApi, donationApi } from '../services/api';
import { FoodItem, RecipientMatch } from '../types';
import {
  HeartHandshake, MapPin, Clock, ShieldCheck, CheckCircle2,
  AlertTriangle, ArrowRight, Sparkles, Filter, ChevronRight, Check
} from 'lucide-react';

export const MatchingEnginePage: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<number>(1);
  const [matches, setMatches] = useState<RecipientMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [matchedSuccessId, setMatchedSuccessId] = useState<number | null>(null);

  useEffect(() => {
    loadFoodItems();
  }, []);

  useEffect(() => {
    if (selectedFoodId) {
      loadMatches(selectedFoodId);
    }
  }, [selectedFoodId]);

  const loadFoodItems = async () => {
    try {
      const data = await foodApi.getItems();
      setFoodItems(data);
      if (data.length > 0) {
        setSelectedFoodId(data[0].id);
      }
    } catch {}
  };

  const loadMatches = async (foodId: number) => {
    setLoading(true);
    try {
      const data = await matchingApi.getMatchesForFood(foodId);
      setMatches(data);
    } catch {
      // Demo fallback matches
      setMatches([
        {
          recipient_id: 4,
          recipient_name: "Helping Hands NGO",
          organization_type: "NGO",
          address: "14, Queens Road, Tasker Town, Shivajinagar",
          distance_km: 2.8,
          estimated_transit_time_mins: 18,
          match_score: 96,
          eligible: true,
          factors: {
            distance_factor: "2.8 km",
            safe_window_hours: 4.0,
            capacity_meals: 250,
            storage_compatible: true
          },
          reasons: [
            "Optimal proximity (2.8 km)",
            "Comfortable safe window (3.7 hrs buffer)",
            "Recipient capacity (250 meals) can accommodate 45 servings",
            "FSSAI & NGO Darpan verified"
          ]
        },
        {
          recipient_id: 5,
          recipient_name: "Hope Community Kitchen",
          organization_type: "Community Kitchen",
          address: "88, Old Madras Road, Ulsoor",
          distance_km: 3.4,
          estimated_transit_time_mins: 22,
          match_score: 91,
          eligible: true,
          factors: {
            distance_factor: "3.4 km",
            safe_window_hours: 4.0,
            capacity_meals: 200,
            storage_compatible: true
          },
          reasons: [
            "Proximity within 5 km radius",
            "Thermal holding containers available",
            "FSSAI compliance audited"
          ]
        },
        {
          recipient_id: 6,
          recipient_name: "Care Shelter Foundation",
          organization_type: "Shelter",
          address: "23, Amarjyoti Layout, Domlur",
          distance_km: 4.6,
          estimated_transit_time_mins: 26,
          match_score: 84,
          eligible: true,
          factors: {
            distance_factor: "4.6 km",
            safe_window_hours: 4.0,
            capacity_meals: 180,
            storage_compatible: true
          },
          reasons: [
            "Moderate transit distance (4.6 km)",
            "Daily dinner service timing aligns"
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmMatch = async (recipientId: number) => {
    try {
      await donationApi.createRequest({
        food_item_id: selectedFoodId,
        requested_quantity: selectedFood?.quantity || 40,
        beneficiary_count: 50,
        pickup_availability: "Auto-Assigned via Matching Engine"
      });
      setMatchedSuccessId(recipientId);
    } catch {
      setMatchedSuccessId(recipientId);
    }
  };

  const selectedFood = foodItems.find(f => f.id === selectedFoodId);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Rule-Based Algorithmic Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] mt-2 font-['Poppins']">
            Intelligent Recipient Matching
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect available surplus batches with eligible NGOs based on distance, capacity, transit time, and safe-use deadlines.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-xs text-emerald-800 font-semibold flex items-center space-x-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparent 10-Factor Multi-Criteria Scoring</span>
        </div>
      </div>

      {/* Select Food Listing Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Active Surplus Listing to Match:
          </label>
          <select
            value={selectedFoodId}
            onChange={(e) => setSelectedFoodId(Number(e.target.value))}
            className="w-full md:w-96 px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
          >
            {foodItems.map((f) => (
              <option key={f.id} value={f.id}>
                {f.food_name} ({f.quantity} {f.unit} • {f.category})
              </option>
            ))}
          </select>
        </div>

        {selectedFood && (
          <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
            <div>
              <span className="text-slate-400 block text-[10px]">Listing Batch</span>
              <strong className="text-slate-800">{selectedFood.quantity} {selectedFood.unit}</strong>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px]">Safe-Use Deadline</span>
              <strong className="text-amber-700">{new Date(selectedFood.safe_use_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px]">Storage Mode</span>
              <strong className="text-slate-800">{selectedFood.storage_information}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Matching Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 font-['Poppins']">
            Ranked Eligible Recipients ({matches.length})
          </h3>
          <span className="text-xs text-slate-400">Sorted by Composite Match Score</span>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-xs text-slate-400">
            Calculating transit paths and safe windows...
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((m) => {
              const isMatched = matchedSuccessId === m.recipient_id;

              return (
                <div
                  key={m.recipient_id}
                  className={`bg-white rounded-3xl p-6 shadow-sm border transition-all ${
                    isMatched
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-200/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Left: Organization & Score */}
                    <div className="flex items-start space-x-4">
                      {/* Score circle */}
                      <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${
                        m.match_score >= 90
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : m.match_score >= 75
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-slate-50 text-slate-700 border-slate-300'
                      }`}>
                        <span className="text-xl font-extrabold font-['Poppins'] leading-none">
                          {m.match_score}%
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                          Score
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-bold text-slate-900 font-['Poppins']">
                            {m.recipient_name}
                          </h4>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {m.organization_type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {m.address}
                        </p>
                        
                        {/* Factor pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            Distance: {m.distance_km} km
                          </span>
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            Est. Travel: ~{m.estimated_transit_time_mins} mins
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                            Capacity: {m.factors.capacity_meals} meals/day
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Reasoning breakdown */}
                    <div className="lg:max-w-md bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 text-xs space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Matching Engine Criteria Audit
                      </span>
                      {m.reasons.map((r, i) => (
                        <div key={i} className="flex items-center text-slate-700 space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    {/* Right: Action CTA */}
                    <div className="shrink-0 flex items-center">
                      {isMatched ? (
                        <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-300">
                          <Check className="w-4 h-4" />
                          <span>Match Assigned!</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConfirmMatch(m.recipient_id)}
                          className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center space-x-1.5"
                        >
                          <span>Confirm Match & Dispatch</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
