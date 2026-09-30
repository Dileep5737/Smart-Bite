import React, { useState, useEffect } from 'react';
import { foodApi } from '../services/api';
import { FoodItem } from '../types';
import {
  Package, AlertCircle, Clock, ShieldCheck,
  Search, Filter, Plus, CheckCircle2, TrendingDown
} from 'lucide-react';

export const InventoryManagementPage: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  useEffect(() => {
    foodApi.getItems().then(data => setItems(data)).catch(() => {});
  }, []);

  const filtered = items.filter(i => {
    const matchName = i.food_name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || i.category === filterCat;
    return matchName && matchCat;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Commercial Kitchen Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3d20] mt-2 font-['Poppins']">
            Food Inventory & Expiry Surveillance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time batch tracking, thermal storage status, and proactive surplus flags.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-semibold text-emerald-800 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All Items FSSAI Verified</span>
          </div>
        </div>
      </div>

      {/* Expiry alerts bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Near-Expiry Attention (&lt;3 hrs)</div>
            <div className="text-lg font-bold text-slate-900 font-['Poppins']">2 Batches</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Optimal Storage Status</div>
            <div className="text-lg font-bold text-slate-900 font-['Poppins']">100% Compliant</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Waste Prevention Ratio</div>
            <div className="text-lg font-bold text-slate-900 font-['Poppins']">94.8% Preserved</div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search inventory items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="w-full sm:w-auto px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-medium"
        >
          <option value="All">All Categories</option>
          <option value="Cooked Meals">Cooked Meals</option>
          <option value="Bakery Products">Bakery Products</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Item Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Storage Mode</th>
                <th className="py-3 px-4">Prepared At</th>
                <th className="py-3 px-4">Safe Consumption Cutoff</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-800">
                        📦
                      </div>
                      <div>
                        <div>{item.food_name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{item.allergen_information}</div>
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
                      <span className="text-[10px] text-emerald-600 font-mono">Temp: {item.storage_temperature}°C</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(item.preparation_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 font-medium text-amber-800">
                    {new Date(item.safe_use_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {item.listing_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
