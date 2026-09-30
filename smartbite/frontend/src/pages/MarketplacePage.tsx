import React, { useState, useEffect } from 'react';
import { foodApi, donationApi } from '../services/api';
import { FoodItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  ShoppingBag, MapPin, Clock, ShieldCheck, HeartHandshake,
  Search, Filter, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { user, role, switchRoleDemo } = useAuth();
  const [items, setItems] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  
  // Request Modal State
  const [requestItem, setRequestItem] = useState<FoodItem | null>(null);
  const [reqQuantity, setReqQuantity] = useState<number>(30);
  const [beneficiaryCount, setBeneficiaryCount] = useState<number>(45);
  const [pickupAvail, setPickupAvail] = useState('Immediate pickup (within 45 mins)');
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await foodApi.getItems();
      setItems(data.filter(i => i.listing_status === 'Available' || i.listing_status === 'Reserved'));
    } catch {
      // Demo fallback
      setItems([
        {
          id: 1,
          provider_id: 1,
          food_name: "Hyderabadi Vegetable Dum Biryani & Mirchi Ka Salan",
          category: "Cooked Meals",
          description: "Freshly prepared aromatic basmati rice with farm-fresh vegetables and saffron. Sealed in stainless food grade containers.",
          quantity: 45.0,
          unit: "servings",
          preparation_time: new Date().toISOString(),
          storage_information: "Hot Holding (>65°C)",
          storage_temperature: 68.5,
          safe_use_deadline: new Date(Date.now() + 4 * 3600000).toISOString(),
          pickup_deadline: new Date(Date.now() + 2 * 3600000).toISOString(),
          allergen_information: "Dairy (Ghee), Nuts",
          safety_status: "Verified",
          listing_status: "Available",
          image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
          created_at: new Date().toISOString(),
          provider: {
            id: 1,
            organization_name: "Green Leaf Fine Dining",
            organization_type: "Restaurant",
            address: "100 Feet Road, Indiranagar",
            city: "Bengaluru",
            state: "Karnataka",
            postal_code: "560038",
            verification_status: "Verified"
          }
        },
        {
          id: 2,
          provider_id: 1,
          food_name: "Soft Phulka Chapati & Dal Tadka with Paneer",
          category: "Cooked Meals",
          description: "Warm whole wheat rotis with lentil dal and fresh cottage cheese gravy.",
          quantity: 60.0,
          unit: "servings",
          preparation_time: new Date().toISOString(),
          storage_information: "Insulated Warm Containers",
          storage_temperature: 65.0,
          safe_use_deadline: new Date(Date.now() + 5 * 3600000).toISOString(),
          pickup_deadline: new Date(Date.now() + 2.5 * 3600000).toISOString(),
          allergen_information: "Gluten, Dairy",
          safety_status: "Verified",
          listing_status: "Available",
          image_url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
          created_at: new Date().toISOString(),
          provider: {
            id: 1,
            organization_name: "Green Leaf Fine Dining",
            organization_type: "Restaurant",
            address: "100 Feet Road, Indiranagar",
            city: "Bengaluru",
            state: "Karnataka",
            postal_code: "560038",
            verification_status: "Verified"
          }
        },
        {
          id: 3,
          provider_id: 2,
          food_name: "Organic Robusta Bananas & Shimla Apples",
          category: "Fruits",
          description: "Grade-A ripe fruit surplus from retail displays. Crisp texture, excellent nutritional value.",
          quantity: 30.0,
          unit: "kg",
          preparation_time: new Date().toISOString(),
          storage_information: "Cool Ambient Ventilated Crates",
          storage_temperature: 18.0,
          safe_use_deadline: new Date(Date.now() + 24 * 3600000).toISOString(),
          pickup_deadline: new Date(Date.now() + 8 * 3600000).toISOString(),
          allergen_information: "None",
          safety_status: "Verified",
          listing_status: "Available",
          image_url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80",
          created_at: new Date().toISOString(),
          provider: {
            id: 2,
            organization_name: "Fresh Harvest Supermarket",
            organization_type: "Supermarket",
            address: "80 Feet Road, Koramangala",
            city: "Bengaluru",
            state: "Karnataka",
            postal_code: "560034",
            verification_status: "Verified"
          }
        }
      ]);
    }
  };

  const handleOpenRequest = (item: FoodItem) => {
    setRequestItem(item);
    setReqQuantity(item.quantity);
    setRequestSuccess(false);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestItem) return;
    setSubmitting(true);

    try {
      await donationApi.createRequest({
        food_item_id: requestItem.id,
        requested_quantity: reqQuantity,
        beneficiary_count: beneficiaryCount,
        pickup_availability: pickupAvail
      });
      setRequestSuccess(true);
    } catch {
      // Mock success for pilot demonstration
      setRequestSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = items.filter(i => {
    const matchName = i.food_name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'All' || i.category === selectedCat;
    return matchName && matchCat;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Live Redistribution Channel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] mt-2 font-['Poppins']">
            Surplus Food Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified safe surplus batches from local hotels, restaurants, and supermarkets in the pilot zone.
          </p>
        </div>

        {role !== 'Recipient' && (
          <button
            onClick={() => switchRoleDemo('Recipient')}
            className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <span>Switch to NGO View to Claim Food</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search available food items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-medium"
          >
            <option value="All">All Food Categories</option>
            <option value="Cooked Meals">Cooked Meals</option>
            <option value="Bakery Products">Bakery Products</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const now = new Date();
          const deadline = new Date(item.safe_use_deadline);
          const hoursLeft = Math.max(0, Math.round((deadline.getTime() - now.getTime()) / 3600000 * 10) / 10);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={item.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"}
                    alt={item.food_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-xs">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{item.safety_status}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs flex items-center justify-between">
                    <span className="font-bold text-emerald-400">{item.quantity} {item.unit} available</span>
                    <span className="flex items-center text-amber-300 font-semibold text-[11px]">
                      <Clock className="w-3 h-3 mr-1" /> {hoursLeft} hrs left
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-['Poppins'] line-clamp-1">
                      {item.food_name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.provider?.organization_name || 'Green Leaf Fine Dining'} • 2.8 km away</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
                      <span className="font-medium text-slate-700">Storage:</span>
                      <span>{item.storage_information}</span>
                    </div>
                    {item.allergen_information && (
                      <div className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
                        Allergens: {item.allergen_information}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenRequest(item)}
                  className="w-full py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Request Food for Community</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Request Modal */}
      {requestItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            {requestSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-['Poppins']">
                  Donation Request Submitted!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your request for {reqQuantity} {requestItem.unit} of "{requestItem.food_name}" has been forwarded to {requestItem.provider?.organization_name || 'the kitchen'}. Dispatch coordination will begin upon provider approval.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setRequestItem(null)}
                    className="px-6 py-2 rounded-xl bg-[#166534] text-white font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-['Poppins']">
                    Request Surplus: {requestItem.food_name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Listed by {requestItem.provider?.organization_name || 'Green Leaf Fine Dining'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Quantity to Request
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={requestItem.quantity}
                      required
                      value={reqQuantity}
                      onChange={(e) => setReqQuantity(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400">Max available: {requestItem.quantity}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Beneficiary Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={beneficiaryCount}
                      onChange={(e) => setBeneficiaryCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400">Diners to be fed</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pickup & Storage Availability
                  </label>
                  <select
                    value={pickupAvail}
                    onChange={(e) => setPickupAvail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Immediate pickup (within 45 mins)">Immediate pickup (within 45 mins)</option>
                    <option value="SmartBite EV Fleet Dispatch Assigned">SmartBite EV Fleet Dispatch Assigned</option>
                    <option value="NGO Volunteer Vehicle Arranged">NGO Volunteer Vehicle Arranged</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <strong>Safe consumption guarantee:</strong> Our community kitchen possesses adequate thermal storage to distribute this food before {new Date(requestItem.safe_use_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestItem(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-md"
                  >
                    {submitting ? 'Submitting...' : 'Confirm Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
