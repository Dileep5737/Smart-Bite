import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User, Building2, ShieldCheck, Mail, Phone, MapPin,
  Save, CheckCircle2, Lock, Bell
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { user, role } = useAuth();
  const [saved, setSaved] = useState(false);

  const [fullName, setFullName] = useState(user?.full_name || 'Rajesh Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98450 11223');
  const [address, setAddress] = useState(user?.organization?.address || '102, 100 Feet Road, Indiranagar');
  const [city, setCity] = useState(user?.organization?.city || 'Bengaluru');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-2xl font-extrabold text-[#0f3d20] font-['Poppins']">
          User Profile & Organization Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your contact credentials, organization facility addresses, and notification preferences.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        
        {/* Org Banner */}
        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold text-xl">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 font-['Poppins']">
              {user?.organization?.organization_name || "Green Leaf Fine Dining"}
            </div>
            <div className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
              <span>Role: <strong>{role}</strong></span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">FSSAI Status: Verified</span>
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile and facility parameters updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'provider@greenleaf.com'}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Pilot City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Facility Address (Pickup / Delivery Location)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};
