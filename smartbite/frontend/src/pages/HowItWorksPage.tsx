import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ChefHat, HeartHandshake, Truck, ShieldCheck,
  BarChart3, CheckCircle, ArrowRight
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#166534] tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Detailed Lifecycle
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f3d20] mt-3 font-['Poppins']">
            How SmartBite Solves Food Waste
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            From machine learning in commercial kitchens to automated logistics with verified food safety checklists.
          </p>
        </div>

        {/* 6 Steps in deep view */}
        <div className="space-y-12">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#166534] uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Step 1: Predictive Modeling</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Poppins']">
                AI Demand Forecasting
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before cooking begins, the chef or kitchen manager logs expected covers, day of the week, and special banqueting events. SmartBite runs trained Random Forest and Gradient Boosting Regressors to compute the exact expected consumption.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 shrink-0" /> Evaluates 7 key commercial kitchen features</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 shrink-0" /> Compares MAE and RMSE metrics dynamically</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 shrink-0" /> Prevents 15–35% of traditional overproduction</li>
              </ul>
              <Link
                to="/forecast"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#166534] hover:text-emerald-800 pt-2"
              >
                <span>Launch Interactive Forecast Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="lg:col-span-7 bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 font-mono text-xs">
              <div className="text-slate-500 font-semibold mb-2 flex items-center justify-between">
                <span>// ML REGRESSION PIPELINE PREVIEW</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">R² Score: 0.948</span>
              </div>
              <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl space-y-1.5 overflow-x-auto">
                <p>Input: [420 diners, Friday, Corporate Conference, 450 hist_prep]</p>
                <p className="text-amber-300">Model: Ensemble (GradientBoosting + RandomForest)</p>
                <p>Calculated Base Demand: 438.4 servings</p>
                <p className="text-white">Recommended Prep with 5% Safety Buffer: 460 servings</p>
                <p className="text-emerald-300">Overproduction Waste Avoided: ~30 servings</p>
              </div>
            </div>
          </div>

          {/* Step 2 & 3: Kitchen Inventory & Safety */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-800 mb-3">Sample Food Safety Checklist Data</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-700">Storage Temperature Verification</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">68.5°C (Passed Hot-Holding)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-700">Sensory & Packaging Integrity</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Inspected & Sealed</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-700">Safe-Use Window</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">4.0 Hours Remaining</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#166534] uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Steps 2 & 3: Safety & Surplus</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Poppins']">
                Surplus Identification & Safety Audits
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Any safe surplus remaining from events or restaurant service is catalogued with allergens, storage mode, and prep timestamps. Food safety verification is mandatory before listing.
              </p>
              <Link
                to="/safety"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#166534] hover:text-emerald-800"
              >
                <span>View Food Safety Protocols</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Step 4 & 5: Matching & Logistics */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#166534] uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <HeartHandshake className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Steps 4 & 5: Match & Dispatch</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Poppins']">
                Algorithmic Matching & EV Routing
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                SmartBite calculates great-circle haversine distances, recipient daily capacity, and estimated traffic transit duration to ensure the food reaches the recipient well before the safety deadline expires.
              </p>
              <Link
                to="/routes"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#166534] hover:text-emerald-800"
              >
                <span>Explore Live Logistics & Route Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="lg:col-span-7 bg-amber-50/50 rounded-2xl p-6 border border-amber-100 space-y-3">
              <div className="font-bold text-sm text-amber-900">Matching Engine Scoring Weights:</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <div className="font-bold text-slate-800">Proximity Radius (&lt;10km)</div>
                  <div className="text-slate-500 mt-0.5">35% Match Weight</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <div className="font-bold text-slate-800">Safe-Window Feasibility</div>
                  <div className="text-slate-500 mt-0.5">30% Match Weight</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <div className="font-bold text-slate-800">Recipient Meal Capacity</div>
                  <div className="text-slate-500 mt-0.5">20% Match Weight</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <div className="font-bold text-slate-800">FSSAI / NGO Darpan Status</div>
                  <div className="text-slate-500 mt-0.5">15% Match Weight</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
