import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, HeartHandshake, Truck,
  BarChart3, ChevronRight, X, Play, RotateCcw, Package
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const DemoBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { switchRoleDemo, role } = useAuth();

  const steps = [
    {
      num: 1,
      title: "1. Demand Forecast",
      path: "/forecast",
      role: "Provider" as const,
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: "ML predicts covers & optimal prep quantity"
    },
    {
      num: 2,
      title: "2. Record Surplus",
      path: "/surplus",
      role: "Provider" as const,
      icon: <Package className="w-3.5 h-3.5" />,
      desc: "List surplus meal batches with safe deadlines"
    },
    {
      num: 3,
      title: "3. Verify Safety",
      path: "/safety",
      role: "Provider" as const,
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: "Inspect temperature & packaging standards"
    },
    {
      num: 4,
      title: "4. Match Recipients",
      path: "/matching",
      role: "Recipient" as const,
      icon: <HeartHandshake className="w-3.5 h-3.5" />,
      desc: "Match score based on proximity & pantry capacity"
    },
    {
      num: 5,
      title: "5. Route & Deliver",
      path: "/routes",
      role: "Logistics" as const,
      icon: <Truck className="w-3.5 h-3.5" />,
      desc: "Track EV route with Leaflet interactive waypoints"
    },
    {
      num: 6,
      title: "6. Measure Impact",
      path: "/impact",
      role: "Administrator" as const,
      icon: <BarChart3 className="w-3.5 h-3.5" />,
      desc: "Calculate CO2 prevented & meals served"
    }
  ];

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setCollapsed(false)}
          className="bg-[#166534] text-white px-3.5 py-2 rounded-full shadow-md hover:bg-[#14532d] transition-all flex items-center space-x-2 text-xs font-semibold"
        >
          <Play className="w-3.5 h-3.5 text-emerald-200" />
          <span>Demo Lifecycle (6 Steps)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F0FDF4] text-[#0f3d20] border-b border-emerald-200/80 text-xs py-2 px-3 sm:px-6 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Left Label */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="bg-[#166534] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wide">
            Demo Workflow
          </span>
          <span className="text-slate-600 hidden xl:inline text-[11px]">
            Follow the 6-step zero-waste redistribution cycle:
          </span>
        </div>

        {/* Steps */}
        <div className="flex items-center overflow-x-auto max-w-full space-x-1.5 pb-1 md:pb-0 scrollbar-none">
          {steps.map((s, idx) => {
            const isCurrent = location.pathname === s.path;
            return (
              <React.Fragment key={s.num}>
                <Link
                  to={s.path}
                  onClick={() => {
                    if (role !== s.role) {
                      switchRoleDemo(s.role);
                    }
                  }}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all shrink-0 text-xs ${
                    isCurrent
                      ? 'bg-[#166534] text-white font-semibold shadow-2xs'
                      : 'bg-white hover:bg-emerald-100/60 text-slate-700 hover:text-slate-900 border border-emerald-200/60'
                  }`}
                  title={`${s.desc} (Switches role to ${s.role})`}
                >
                  <span className={isCurrent ? 'text-emerald-200' : 'text-[#166534]'}>
                    {s.icon}
                  </span>
                  <span>{s.title}</span>
                </Link>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 hidden sm:inline" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setCollapsed(true)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
