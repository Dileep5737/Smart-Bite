import React from 'react';
import { Leaf, Award, Globe, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#166534] tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Our Vision
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f3d20] mt-3 font-['Poppins']">
            About SmartBite
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            "Predict Smart. Waste Less. Feed More."
            <br />
            An engineering initiative designed to bridge AI forecasting with compassionate redistribution at national scale.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 mb-12">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-['Poppins']">
              The Mission: Zero Food to Landfills
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Global food systems face a cruel paradox: millions suffer from food insecurity while commercial hospitality, institutional cafeterias, and retail outlets discard tons of edible, high-quality nutrition daily due to logistical barriers and fear of liability.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              SmartBite was conceived to solve both ends of this challenge: first, by deploying machine learning to prevent kitchens from cooking excess in the first place, and second, by creating a transparent, temperature-monitored, algorithmic bridge that transfers inevitable surplus into orphanages and community kitchens within safe windows.
            </p>
          </div>
        </div>

        {/* Pilot Implementation Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <Globe className="w-8 h-8 text-[#166534] mb-3" />
            <h3 className="font-bold text-base text-slate-900 font-['Poppins']">National Vision</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Designed for nationwide rollout across Indian urban centers, initially demonstrating a pilot implementation in Bengaluru, Mumbai, and Delhi NCR.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <ShieldCheck className="w-8 h-8 text-[#22C55E] mb-3" />
            <h3 className="font-bold text-base text-slate-900 font-['Poppins']">Regulatory Compliance</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Strictly adheres to FSSAI Surplus Food Regulations and NGO Darpan verification guidelines to guarantee safety and accountability.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <Award className="w-8 h-8 text-[#F59E0B] mb-3" />
            <h3 className="font-bold text-base text-slate-900 font-['Poppins']">UN SDG Alignment</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Directly contributes to United Nations Sustainable Development Goals SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption & Production).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
