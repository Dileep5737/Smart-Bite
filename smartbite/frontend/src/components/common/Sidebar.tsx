import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Sparkles, Package, PlusCircle,
  ShoppingBag, HeartHandshake, Truck, ShieldCheck,
  BarChart3, Settings, Bell, ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, role } = useAuth();

  // Primary minimal navigation per role
  const providerLinks = [
    { name: 'Dashboard', path: '/provider', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Surplus Management', path: '/surplus', icon: <PlusCircle className="w-4 h-4" /> },
    { name: 'AI Demand Forecast', path: '/forecast', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Food Inventory', path: '/inventory', icon: <Package className="w-4 h-4" /> },
    { name: 'Recipient Matching', path: '/matching', icon: <HeartHandshake className="w-4 h-4" /> },
    { name: 'Safety Verification', path: '/safety', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const recipientLinks = [
    { name: 'Dashboard', path: '/recipient', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Food Marketplace', path: '/marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Incoming Deliveries', path: '/routes', icon: <Truck className="w-4 h-4" /> },
  ];

  const logisticsLinks = [
    { name: 'Dashboard', path: '/logistics', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Route Map', path: '/routes', icon: <Truck className="w-4 h-4" /> },
    { name: 'Safety Transport Logs', path: '/safety', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Fleet Impact', path: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Safety & Compliance', path: '/safety', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'National Analytics', path: '/analytics-reports', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Environmental Impact', path: '/impact', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  let links = providerLinks;
  if (role === 'Recipient') links = recipientLinks;
  else if (role === 'Logistics') links = logisticsLinks;
  else if (role === 'Administrator') links = adminLinks;

  return (
    <aside className="w-60 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        
        {/* Minimal User / Organization Card */}
        <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded">
              {role}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active" />
          </div>
          <div className="font-bold text-slate-800 text-xs mt-2 truncate font-['Poppins']">
            {user?.organization?.organization_name || user?.full_name || 'Pilot User'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 truncate">
            {user?.organization?.city || 'Bengaluru Pilot'}
          </div>
        </div>

        {/* Minimal Navigation List */}
        <div className="space-y-1">
          <div className="px-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/provider' || link.path === '/recipient' || link.path === '/logistics' || link.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-[#166534] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#F0FDF4]'
                }`
              }
            >
              <div className="flex items-center space-x-2.5">
                {link.icon}
                <span>{link.name}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Utility Links */}
      <div className="pt-3 border-t border-slate-100 space-y-1">
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive ? 'text-[#166534] bg-emerald-50 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`
          }
        >
          <Bell className="w-4 h-4 text-slate-400" />
          <span>Notifications</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
              isActive ? 'text-[#166534] bg-emerald-50 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`
          }
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};
