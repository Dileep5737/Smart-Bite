import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import { ImpactMetrics } from '../types';
import {
  Globe, ShieldCheck, TrendingDown, Heart, Award,
  ArrowRight, BarChart3, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ImpactPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);

  useEffect(() => {
    analyticsApi.getOverview().then(d => setMetrics(d)).catch(() => {});
  }, []);

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#166534] tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Sustainability & ESG Metrics
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f3d20] font-['Poppins']">
            National Environmental & Social Impact
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Measuring verified food preservation, greenhouse gas reduction, and community nutrition.
          </p>
        </div>

        {/* Big Metric Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 text-center space-y-2">
            <span className="text-3xl">🌱</span>
            <div className="text-4xl font-extrabold text-[#166534] font-['Poppins']">
              {metrics?.co2_emissions_prevented_kg.toLocaleString() || "6,125"} kg
            </div>
            <h3 className="font-bold text-slate-800 text-base">Carbon Footprint Avoided</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Based on the UNEP calculation standard of 2.5 kg CO₂e greenhouse gas emissions prevented per 1 kg food waste diverted.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 text-center space-y-2">
            <span className="text-3xl">💧</span>
            <div className="text-4xl font-extrabold text-blue-600 font-['Poppins']">
              {((metrics?.water_saved_liters || 588000) / 1000).toFixed(0)}k Liters
            </div>
            <h3 className="font-bold text-slate-800 text-base">Agricultural Freshwater Saved</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Conserves the irrigation water embedded in wheat, rice, legumes, and fresh farm produce.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 text-center space-y-2">
            <span className="text-3xl">🍲</span>
            <div className="text-4xl font-extrabold text-amber-600 font-['Poppins']">
              {metrics?.meals_redistributed.toLocaleString() || "5,440"}
            </div>
            <h3 className="font-bold text-slate-800 text-base">Nutritious Meals Served</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Directly handed over to vetted orphanages, homeless shelters, and community kitchens.
            </p>
          </div>
        </div>

        {/* UN SDG Cards */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-['Poppins']">
              United Nations Sustainable Development Goals (SDG) Alignment
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              How SmartBite contributes directly to global 2030 targets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
              <div className="inline-block bg-[#D3A029] text-white text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                SDG 2: Zero Hunger
              </div>
              <h4 className="font-bold text-slate-900 text-base">Target 2.1 – Universal Access to Safe, Nutritious Food</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                By redistributing commercial hotel, banquet, and corporate cafeteria surpluses within regulated safety windows, SmartBite turns surplus food into a dependable hunger safety net for urban shelters.
              </p>
            </div>

            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="inline-block bg-[#BF8B2E] text-white text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                SDG 12: Responsible Consumption
              </div>
              <h4 className="font-bold text-slate-900 text-base">Target 12.3 – Halve Per Capita Global Food Waste</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                SmartBite tackles the root cause of food waste: overproduction. By applying Random Forest and Gradient Boosting regressors, kitchens prepare precisely what will be eaten, preventing waste before cooking starts.
              </p>
            </div>
          </div>
        </div>

        {/* Transparency note */}
        <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-600 flex items-start space-x-3">
          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <strong>Calculation & Methodology Disclosure:</strong>
            Environmental and waste diversion calculations are derived from verified pilot records in Bengaluru, Mumbai, and Delhi NCR using FAO guidelines. Clearly labeled as DEMO DATA for initial national pilot demonstration.
          </div>
        </div>

      </div>
    </div>
  );
};
