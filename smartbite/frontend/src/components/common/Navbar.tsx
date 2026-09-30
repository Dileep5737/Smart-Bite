import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { notificationsApi } from '../../services/api';
import { Notification, UserRole } from '../../types';
import {
  Bell, ChefHat, HeartHandshake, Truck, ShieldAlert,
  ChevronDown, CheckCircle, LogOut, User as UserIcon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, switchRoleDemo, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const loadNotifications = async () => {
    try {
      const data = await notificationsApi.getNotifications(user?.id);
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    } catch {
      // Demo notifications
      const demoNotifs: Notification[] = [
        {
          id: 101,
          title: "AI Demand Alert: Friday Surge Expected",
          message: "Demand forecasting predicts an 18% surge today due to local tech events.",
          notification_type: "Forecast Update",
          is_read: false,
          created_at: new Date().toISOString()
        },
        {
          id: 102,
          title: "New Surplus Food Matched Nearby",
          message: "45 servings of freshly prepared Biryani listed within 2.8 km.",
          notification_type: "New Food Available Nearby",
          is_read: false,
          created_at: new Date().toISOString()
        }
      ];
      setNotifications(demoNotifs);
      setUnreadCount(2);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
    } catch {}
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const roleColors: Record<UserRole, string> = {
    Provider: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Recipient: 'bg-amber-100 text-amber-800 border-amber-300',
    Logistics: 'bg-blue-100 text-blue-800 border-blue-300',
    Administrator: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  const roleIcons: Record<UserRole, React.ReactNode> = {
    Provider: <ChefHat className="w-3.5 h-3.5 mr-1 text-emerald-700" />,
    Recipient: <HeartHandshake className="w-3.5 h-3.5 mr-1 text-amber-700" />,
    Logistics: <Truck className="w-3.5 h-3.5 mr-1 text-blue-700" />,
    Administrator: <ShieldAlert className="w-3.5 h-3.5 mr-1 text-purple-700" />
  };

  const getDashboardPath = (userRole: UserRole) => {
    switch (userRole) {
      case 'Provider': return '/provider';
      case 'Recipient': return '/recipient';
      case 'Logistics': return '/logistics';
      case 'Administrator': return '/admin';
      default: return '/';
    }
  };


  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to={user ? getDashboardPath(role) : "/"} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#166534] to-[#22C55E] flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#166534] font-['Poppins'] leading-none">
                Smart<span className="text-[#22C55E]">Bite</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                AI Food Redistribution
              </span>
            </div>
          </Link>



          {/* Right actions: Demo Persona Switcher + Notifications + Dashboard Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-2xs transition-all ${roleColors[role]}`}
                title="Switch persona to test role-specific workflows"
              >
                {roleIcons[role]}
                <span className="hidden md:inline">{role}:</span>
                <span className="ml-1 truncate max-w-[90px] sm:max-w-[120px]">
                  {user?.organization?.organization_name || user?.full_name || role}
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Demo Persona (1-Click)
                    </p>
                  </div>
                  {(['Provider', 'Recipient', 'Logistics', 'Administrator'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRoleDemo(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        role === r ? 'font-bold text-[#166534] bg-emerald-50/60' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {roleIcons[r]}
                        <span className="ml-1.5">{r}</span>
                      </div>
                      {role === r && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                  <div className="px-3 pt-2 mt-1 border-t border-slate-100">
                    <Link
                      to="/profile"
                      onClick={() => setShowRoleDropdown(false)}
                      className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center"
                    >
                      <UserIcon className="w-3 h-3 mr-1" /> View Profile & Settings
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative p-2 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-800">Notifications ({unreadCount} unread)</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No new notifications</div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs transition-colors hover:bg-slate-50 ${!n.is_read ? 'bg-emerald-50/40' : ''}`}
                        >
                          <div className="font-semibold text-slate-900">{n.title}</div>
                          <p className="text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      View all notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard CTA */}
            <Link
              to={getDashboardPath(role)}
              className="px-3 sm:px-4 py-2 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center"
            >
              <span>Dashboard</span>
            </Link>

            {/* Logout button */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors hidden sm:block"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
