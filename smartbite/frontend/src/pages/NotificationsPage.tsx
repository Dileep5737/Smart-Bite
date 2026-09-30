import React, { useState, useEffect } from 'react';
import { notificationsApi } from '../services/api';
import { Notification } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  Bell, CheckCircle2, Clock, Sparkles, Truck,
  HeartHandshake, ShieldCheck, Check
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationsApi.getNotifications(user?.id)
      .then(data => setNotifications(data))
      .catch(() => {
        setNotifications([
          {
            id: 1,
            title: "AI Demand Alert: Friday Surge Expected",
            message: "Demand forecasting predicts an 18% surge today due to local tech events. Recommended prep adjusted.",
            notification_type: "Forecast Update",
            is_read: false,
            created_at: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 2,
            title: "New Surplus Food Matched Nearby",
            message: "45 servings of freshly prepared Biryani listed within 2.8 km by Green Leaf Fine Dining.",
            notification_type: "New Food Available Nearby",
            is_read: false,
            created_at: new Date(Date.now() - 7200000).toISOString()
          },
          {
            id: 3,
            title: "Dispatch Mission Assigned: #SB-DEL-104",
            message: "Pickup assigned from Koramangala to Ulsoor. EV route calculated.",
            notification_type: "Pickup Assigned",
            is_read: true,
            created_at: new Date(Date.now() - 14400000).toISOString()
          }
        ]);
      });
  }, [user]);

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
    } catch {}
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f3d20] font-['Poppins']">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            System alerts, forecast updates, donation confirmations, and dispatch notifications.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-2xs"
        >
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all ${
              !n.is_read
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {!n.is_read && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
