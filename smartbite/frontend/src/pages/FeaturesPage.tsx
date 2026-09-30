import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ChefHat, HeartHandshake, Truck, ShieldCheck,
  BarChart3, Database, Layers, CheckCircle2, Award
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      title: "Dual ML Demand Regressors",
      desc: "Compares Random Forest and Gradient Boosting algorithms on customer covers, day-of-week, events, and historical waste.",
      icon: <Sparkles className="w-6 h-6 text-[#F59E0B]" />,
      badge: "AI & ML"
    },
    {
      title: "Strict Food Safety Checklist",
      desc: "Enforces FSSAI-aligned thermal limits (<4°C or >65°C), sensory audit notes, allergen labels, and safe consumption windows.",
      icon: <ShieldCheck className="w-6 h-6 text-[#22C55E]" />,
      badge: "Compliance"
    },
    {
      title: "Recipient Matching Engine",
      desc: "Evaluates distance, NGO daily meal capacity, and transit travel time to recommend eligible recipients transparently.",
      icon: <HeartHandshake className="w-6 h-6 text-[#166534]" />,
      badge: "Redistribution"
    },
    {
      title: "Logistics & Route Optimization",
      desc: "Interactive Leaflet mapping with intermediate road waypoints, driver ETA calculation, and live transit status updates.",
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      badge: "Logistics"
    },
    {
      title: "Waste Prevention Analytics",
      desc: "Daily, weekly, and monthly waste curves comparing prepared vs consumed food, identifying recurrent overproduction patterns.",
      icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
      badge: "Analytics"
    },
    {
      title: "Role-Based Unified Platform",
      desc: "Tailored dashboard views for Food Providers, Recipient NGOs, Logistics Partners, and System Administrators.",
      icon: <Layers className="w-6 h-6 text-purple-600" />,
      badge: "Multi-Role"
    }
  ];

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#166534] tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Cutting-Edge Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f3d20] mt-3 font-['Poppins']">
            Comprehensive Platform Features
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Everything commercial kitchens, food banks, and logistics teams need to eradicate food waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  {f.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
