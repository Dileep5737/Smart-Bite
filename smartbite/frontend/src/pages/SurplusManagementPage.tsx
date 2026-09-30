import React, { useState, useEffect } from 'react';
import { foodApi } from '../services/api';
import { FoodItem } from '../types';
import {
  PlusCircle, Search, Filter, ShieldCheck, Clock,
  MapPin, AlertTriangle, CheckCircle2, Trash2, Edit3, Sparkles
} from 'lucide-react';

export const SurplusManagementPage: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // New listing form state
  const [formData, setFormData] = useState({
    food_name: '',
    category: 'Cooked Meals',
    description: '',
    quantity: 40,
    unit: 'servings',
    storage_information: 'Hot Holding (>65°C)',
    storage_temperature: 68.0,
    safe_use_hours: 4,
    pickup_hours: 2,
    allergen_information: 'None specified',
    safety_temp_ok: true,
    safety_hygiene_ok: true,
    safety_packaging_ok: true
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await foodApi.getItems();
      setItems(data);
    } catch {
      // Demo fallback
      setItems([
        {
          id: 1,
          provider_id: 1,
          food_name: "Hyderabadi Vegetable Dum Biryani & Mirchi Ka Salan",
          category: "Cooked Meals",
          description: "Freshly prepared aromatic basmati rice with vegetables and saffron.",
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
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          provider_id: 1,
          food_name: "Soft Phulka Chapati & Dal Tadka with Paneer",
          category: "Cooked Meals",
          description: "Warm whole wheat rotis paired with lentil dal and fresh cottage cheese.",
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
          created_at: new Date().toISOString()
        }
      ]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const safeDeadline = new Date(now.getTime() + formData.safe_use_hours * 3600000);
    const pickupDeadline = new Date(now.getTime() + formData.pickup_hours * 3600000);

    const newItemPayload = {
      food_name: formData.food_name,
      category: formData.category,
      description: formData.description,
      quantity: formData.quantity,
      unit: formData.unit,
      storage_information: formData.storage_information,
      storage_temperature: formData.storage_temperature,
      safe_use_deadline: safeDeadline.toISOString(),
      pickup_deadline: pickupDeadline.toISOString(),
      allergen_information: formData.allergen_information,
      safety_status: (formData.safety_temp_ok && formData.safety_hygiene_ok && formData.safety_packaging_ok) ? "Verified" : "Requires Manual Review",
      listing_status: "Available"
    };

    try {
      const created = await foodApi.createItem(newItemPayload as any);
      setItems([created, ...items]);
    } catch {
      const mockCreated: FoodItem = {
        id: Date.now(),
        provider_id: 1,
        ...newItemPayload,
        created_at: new Date().toISOString(),
        preparation_time: new Date().toISOString()
      } as FoodItem;
      setItems([mockCreated, ...items]);
    }

    setShowAddModal(false);
  };

  const handleStatusChange = async (id: number, status: any) => {
    try {
      await foodApi.updateItem(id, { listing_status: status });
    } catch {}
    setItems(items.map(item => item.id === id ? { ...item, listing_status: status } : item));
  };

  const handleDelete = async (id: number) => {
    try {
      await foodApi.deleteItem(id);
    } catch {}
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.food_name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Provider Kitchen Module
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] mt-2 font-['Poppins']">
            Surplus Food Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Log remaining meal batches, enforce FSSAI food safety criteria, and broadcast to nearby NGOs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Surplus Food Listing</span>
        </button>
      </div>

      {/* Safety Compliance Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Mandatory Food Safety Warning (FSSAI Protocol):</strong>
          Do not label food as safe based only on appearance or AI imagery. Hot-held food must be kept above 65°C and refrigerated food below 4°C with certified allergen declarations.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search surplus listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="All">All Categories</option>
            <option value="Cooked Meals">Cooked Meals</option>
            <option value="Bakery Products">Bakery Products</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy Products">Dairy Products</option>
            <option value="Packaged Foods">Packaged Foods</option>
          </select>
        </div>
      </div>

      {/* Listings Table / Cards */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Food Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Available Qty</th>
                <th className="py-3 px-4">Storage Info</th>
                <th className="py-3 px-4">Safe-Use Deadline</th>
                <th className="py-3 px-4">Safety Status</th>
                <th className="py-3 px-4">Listing Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs">
                    <div className="flex items-center space-x-2.5">
                      {item.image_url ? (
                        <img src={item.image_url} alt="" className="w-9 h-9 rounded-lg object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center font-bold text-emerald-800">
                          🍲
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 truncate">{item.food_name}</div>
                        <div className="text-[10px] text-slate-400">{item.allergen_information}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div>{item.storage_information}</div>
                    {item.storage_temperature && (
                      <span className="text-[10px] font-mono text-slate-500">{item.storage_temperature}°C</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-amber-700">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{new Date(item.safe_use_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ {item.safety_status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={item.listing_status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`text-[10px] font-bold rounded-lg px-2 py-1 border ${
                        item.listing_status === 'Available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : item.listing_status === 'Accepted'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : item.listing_status === 'In Transit'
                          ? 'bg-purple-50 text-purple-800 border-purple-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Accepted">Accepted</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-1">
              Add New Surplus Food Batch
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter preparation timestamps, temperature bounds, and safe consumption cutoffs.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Food Item Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.food_name}
                  onChange={(e) => setFormData({ ...formData, food_name: e.target.value })}
                  placeholder="e.g. Mixed Vegetable Pulao & Raita"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Cooked Meals">Cooked Meals</option>
                    <option value="Bakery Products">Bakery Products</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Packaged Foods">Packaged Foods</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="servings">servings</option>
                    <option value="kg">kg</option>
                    <option value="packets">packets</option>
                    <option value="liters">liters</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Storage Type</label>
                  <select
                    value={formData.storage_information}
                    onChange={(e) => setFormData({ ...formData, storage_information: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Hot Holding (>65°C)">Hot Holding (&gt;65°C)</option>
                    <option value="Refrigerated (<4°C)">Refrigerated (&lt;4°C)</option>
                    <option value="Ambient Air Sealed">Ambient Air Sealed</option>
                    <option value="Frozen (< -18°C)">Frozen (&lt; -18°C)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Measured Temp (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.storage_temperature}
                    onChange={(e) => setFormData({ ...formData, storage_temperature: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Safe-Use Window (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="72"
                    value={formData.safe_use_hours}
                    onChange={(e) => setFormData({ ...formData, safe_use_hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Pickup Deadline (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={formData.pickup_hours}
                    onChange={(e) => setFormData({ ...formData, pickup_hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Allergen Declarations</label>
                <input
                  type="text"
                  value={formData.allergen_information}
                  onChange={(e) => setFormData({ ...formData, allergen_information: e.target.value })}
                  placeholder="e.g. Dairy, Gluten, Nuts, Mustard seeds"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Safety Checklist Checkboxes */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-2 text-xs">
                <span className="font-bold text-emerald-950 block">FSSAI Safety Self-Verification:</span>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.safety_temp_ok}
                    onChange={(e) => setFormData({ ...formData, safety_temp_ok: e.target.checked })}
                    className="rounded text-emerald-600"
                  />
                  <span>Food held within regulatory thermal bounds (&gt;65°C or &lt;4°C)</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.safety_hygiene_ok}
                    onChange={(e) => setFormData({ ...formData, safety_hygiene_ok: e.target.checked })}
                    className="rounded text-emerald-600"
                  />
                  <span>Sanitized commercial containers and clean utensils used</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.safety_packaging_ok}
                    onChange={(e) => setFormData({ ...formData, safety_packaging_ok: e.target.checked })}
                    className="rounded text-emerald-600"
                  />
                  <span>Packaging sealed and protected from contamination during transit</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-md"
                >
                  Publish Surplus Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
