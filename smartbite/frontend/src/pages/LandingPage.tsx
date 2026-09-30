import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ChefHat, HeartHandshake, Truck, ShieldCheck,
  BarChart3, ArrowRight, CheckCircle2, ChevronRight,
  TrendingDown, Globe, Users, Utensils, AlertTriangle, Layers
} from 'lucide-react';
import { analyticsApi } from '../services/api';
import { ImpactMetrics } from '../types';

export const LandingPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    total_food_saved_kg: 2450,
    meals_redistributed: 5440,
    total_donations_completed: 142,
    total_food_waste_prevented_kg: 2810,
    active_providers: 18,
    partner_ngos: 14,
    successful_deliveries: 128,
    estimated_waste_reduction_pct: 34.8,
    co2_emissions_prevented_kg: 6125,
    water_saved_liters: 588000,
    data_mode: 'DEMO_PILOT_VERIFIED'
  });

  useEffect(() => {
    analyticsApi.getOverview()
      .then(data => setMetrics(data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0FDF4] via-white to-[#F8FAF8] pt-12 sm:pt-20 pb-16 sm:pb-28 border-b border-emerald-100">
        
        {/* Background decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-200/40 via-green-100/30 to-amber-100/40 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#166534] text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>AI-Powered Food Waste Reduction & Redistribution Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f3d20] tracking-tight leading-[1.12] font-['Poppins']">
                Turn Surplus Food Into a <span className="text-[#22C55E] underline decoration-amber-400 decoration-wavy decoration-2">Powerful Solution</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SmartBite uses AI-powered demand forecasting, intelligent food redistribution, and smart logistics to prevent food waste and connect surplus food with communities in need.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-900/15 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/provider"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm sm:text-base shadow-2xs hover:shadow transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explore Dashboard</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Trust pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-1.5" /> FSSAI Safety Checklist
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-1.5" /> Random Forest & XGBoost ML
                </span>
                <span className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] mr-1.5" /> Route Time & Temp Bounds
                </span>
              </div>
            </div>

            {/* Right illustration & live card preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Glass Container */}
                <div className="relative rounded-3xl bg-white/90 p-4 sm:p-6 shadow-2xl border border-emerald-100 backdrop-blur-xl">
                  
                  {/* Food visual image */}
                  <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-inner group">
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
                      alt="Nutritious Fresh Prepared Surplus Food"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                      <div>
                        <span className="bg-[#22C55E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Verified Safe Surplus
                        </span>
                        <h3 className="text-white text-base font-bold mt-1 font-['Poppins']">
                          Hyderabadi Vegetable Biryani & Meals
                        </h3>
                        <p className="text-slate-200 text-xs">Green Leaf Fine Dining • 45 Servings Available</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected mini overlay cards */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-800">
                        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>AI Forecast</span>
                      </div>
                      <div className="text-lg font-bold text-[#166534] mt-1 font-['Poppins']">460 Meals</div>
                      <p className="text-[10px] text-slate-500">Overproduction prevented: 18%</p>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-800">
                        <Truck className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Fast Dispatch</span>
                      </div>
                      <div className="text-lg font-bold text-amber-900 mt-1 font-['Poppins']">22 Mins</div>
                      <p className="text-[10px] text-slate-500">To Hope Community Kitchen</p>
                    </div>
                  </div>

                  {/* Redirection indicator */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping"></span>
                      Active Pilot Dispatch Network
                    </span>
                    <span className="font-semibold text-[#166534]">Bengaluru Hub</span>
                  </div>

                </div>

                {/* Floating decorative badge */}
                <div className="absolute -top-4 -right-4 bg-white/95 border border-emerald-200 rounded-2xl p-3 shadow-xl flex items-center space-x-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    🍲
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Redistributed</div>
                    <div className="text-sm font-bold text-slate-800">5,440+ Meals</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEMO IMPACT METRIC CARDS */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Poppins']">
                Pilot Impact Overview
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Measurable outcomes across active city hubs
              </p>
            </div>
            <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded text-xs font-semibold">
              DEMO DATA (Pilot Phase)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#166534] font-['Poppins']">
                {metrics.total_food_saved_kg.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Total Food Saved (kg)</div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#22C55E] font-['Poppins']">
                {metrics.meals_redistributed.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Meals Redistributed</div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#166534] font-['Poppins']">
                {metrics.active_providers}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Active Food Providers</div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] font-['Poppins']">
                {metrics.partner_ngos}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Partner NGOs & Shelters</div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-['Poppins']">
                {metrics.successful_deliveries}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Successful Deliveries</div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-['Poppins']">
                {metrics.estimated_waste_reduction_pct}%
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Estimated Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW SMARTBITE WORKS (THE 6 MANDATORY STEPS) */}
      <section className="py-16 sm:py-24 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#166534] tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
              End-To-End Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f3d20] mt-3 font-['Poppins']">
              How SmartBite Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              A closed-loop system connecting kitchen intelligence, safety validation, algorithmic matching, and swift redistribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-bold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2 flex items-center">
                Predict Demand
                <Sparkles className="w-4 h-4 ml-2 text-[#F59E0B]" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                AI estimates future food demand using historical consumption, bookings, weather patterns, and calendar holidays.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#166534] flex items-center">
                <Link to="/forecast" className="hover:underline flex items-center">
                  Try Forecasting Simulator <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-bold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2 flex items-center">
                Plan Production
                <ChefHat className="w-4 h-4 ml-2 text-[#166534]" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Recommend precisely how much food to prepare to eliminate unnecessary overproduction before the stove turns on.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#166534] flex items-center">
                <Link to="/inventory" className="hover:underline flex items-center">
                  Explore Kitchen Inventory <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-bold text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2 flex items-center">
                Identify Surplus
                <Utensils className="w-4 h-4 ml-2 text-[#22C55E]" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track available surplus food with quantity, preparation time, storage conditions, and strict safe-use deadlines.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#166534] flex items-center">
                <Link to="/surplus" className="hover:underline flex items-center">
                  Manage Surplus Listings <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-bold text-lg flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2 flex items-center">
                Match Recipients
                <HeartHandshake className="w-4 h-4 ml-2 text-[#F59E0B]" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect available food with nearby eligible NGOs, food banks, shelters, and community kitchens using multi-factor scores.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#166534] flex items-center">
                <Link to="/matching" className="hover:underline flex items-center">
                  View Matching Engine <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-bold text-lg flex items-center justify-center mb-4">
                5
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2 flex items-center">
                Optimize Delivery
                <Truck className="w-4 h-4 ml-2 text-blue-600" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Help logistics partners coordinate pickup and delivery using distance, transit time, vehicle capacity, and safety deadlines.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#166534] flex items-center">
                <Link to="/routes" className="hover:underline flex items-center">
                  Track Delivery Routes <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-bold text-lg flex items-center justify-center mb-4">
                6
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Poppins'] mb-2 flex items-center">
                Measure Impact
                <BarChart3 className="w-4 h-4 ml-2 text-teal-600" />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track food saved, donations completed, carbon emissions prevented, and water preserved across city hubs.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#166534] flex items-center">
                <Link to="/impact" className="hover:underline flex items-center">
                  Review Impact Dashboard <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PLATFORM PILLARS & FEATURES */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Core Mission & Innovation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f3d20] font-['Poppins']">
                A Unified National Ecosystem to Prevent Food Insecurity and Landfill Waste
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Over 40% of food produced commercially is wasted due to unpredictable footfall, poor shelf-life tracking, and fragmented redistribution channels. SmartBite replaces guesswork with data-driven predictive models and verified logistics channels.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#166534] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Dual AI Regression Engine</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Combines Random Forest and Gradient Boosting to benchmark demand forecasts against historical waste patterns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Strict Food Safety Protocol</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Mandatory storage temperatures (&lt;4°C or &gt;65°C), sensory audit logs, allergen labels, and safe consumption cutoffs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Dynamic EV Logistics Routing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Optimizes driver pickups and dispatches based on transit time constraints, capacity, and recipient urgency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAF8] border border-emerald-100 rounded-2xl p-5 hover:border-emerald-300 transition-colors">
                <span className="text-3xl">🏨</span>
                <h4 className="font-bold text-slate-900 text-base mt-3 font-['Poppins']">Hotels & Restaurants</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Reduce buffet and banquet overages with automated demand curve insights and instant surplus listing.
                </p>
              </div>

              <div className="bg-[#F8FAF8] border border-emerald-100 rounded-2xl p-5 hover:border-emerald-300 transition-colors">
                <span className="text-3xl">🎓</span>
                <h4 className="font-bold text-slate-900 text-base mt-3 font-['Poppins']">University Canteens</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Anticipate student footfall changes around exam seasons and holidays to calibrate bulk cooking.
                </p>
              </div>

              <div className="bg-[#F8FAF8] border border-emerald-100 rounded-2xl p-5 hover:border-emerald-300 transition-colors">
                <span className="text-3xl">🏢</span>
                <h4 className="font-bold text-slate-900 text-base mt-3 font-['Poppins']">Corporate Cafeterias</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sync with corporate hybrid attendance forecasts to prevent massive end-of-day office food waste.
                </p>
              </div>

              <div className="bg-[#F8FAF8] border border-emerald-100 rounded-2xl p-5 hover:border-emerald-300 transition-colors">
                <span className="text-3xl">🛒</span>
                <h4 className="font-bold text-slate-900 text-base mt-3 font-['Poppins']">Supermarkets & Retail</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Redistribute fresh bakery and produce items nearing shelf dates to community kitchens safely.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ENVIRONMENTAL & SOCIAL IMPACT HIGHLIGHTS */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Ecological Responsibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 font-['Poppins']">
              Every Kilogram Saved Reduces Carbon & Water Footprints
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Food rotting in landfills generates potent methane gas. SmartBite converts surplus into meals while safeguarding the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#22C55E] font-['Poppins']">
                {metrics.co2_emissions_prevented_kg.toLocaleString()} kg
              </div>
              <h4 className="font-bold text-lg mt-2 font-['Poppins']">CO₂e Emissions Prevented</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Calculated using UNEP standard conversion factor of 2.5 kg CO₂e avoided per 1 kg food waste diverted.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 font-['Poppins']">
                {(metrics.water_saved_liters / 1000).toFixed(0)}k Liters
              </div>
              <h4 className="font-bold text-lg mt-2 font-['Poppins']">Embedded Water Preserved</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Conserves the agricultural and processing water required to grow, harvest, and cook meals.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-['Poppins']">
                100%
              </div>
              <h4 className="font-bold text-lg mt-2 font-['Poppins']">Landfill Diversion</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Every verified collected batch is directly delivered to registered shelters and orphanages.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center text-xs text-slate-400">
            *Environmental impact values are estimates based on documented pilot data in Bengaluru, Mumbai, and Delhi NCR.
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 font-['Poppins']">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Common questions about food safety, algorithms, and NGO eligibility
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5">
              <h4 className="font-bold text-slate-900 text-sm">
                How does SmartBite ensure food safety before redistribution?
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                We enforce strict safety parameters: hot-held food must be kept above 65°C and cold food below 4°C. Providers must log preparation timestamps, safe-use deadlines, and sensory checks. Expired or unverified food is automatically delisted.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5">
              <h4 className="font-bold text-slate-900 text-sm">
                How does the AI Demand Forecasting model work?
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                The platform trains Random Forest and Gradient Boosting Regressors on historical customer counts, past waste quantities, day of the week, and special event tags to recommend an optimal production batch with a minimal 5% safety margin.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5">
              <h4 className="font-bold text-slate-900 text-sm">
                Who coordinates the pickup and delivery?
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Verified logistics partners and electric delivery vans are assigned through the platform. The system optimizes travel routes to ensure delivery completes well before the food's safe-consumption cutoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="bg-gradient-to-r from-[#166534] to-[#15803d] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Poppins']">
            Join the Zero Food Waste Movement
          </h2>
          <p className="text-emerald-100 text-base max-w-2xl mx-auto">
            Whether you are a commercial kitchen, an NGO providing meals, or an eco-logistics partner, SmartBite provides the technology to nourish communities and eliminate food waste.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-white text-[#166534] font-bold text-sm shadow-md hover:bg-emerald-50 transition-all"
            >
              Register Your Organization
            </Link>
            <Link
              to="/marketplace"
              className="px-8 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold text-sm border border-emerald-600 transition-all"
            >
              Browse Surplus Marketplace
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
