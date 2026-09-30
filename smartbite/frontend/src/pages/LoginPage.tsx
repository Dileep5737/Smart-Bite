import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import {
  ChefHat, HeartHandshake, Truck, ShieldCheck,
  Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2
} from 'lucide-react';
import { FooterBackground } from '../components/studio-footer/FooterBackground';
import '../components/studio-footer/studio-footer.css';

interface RoleOption {
  role: UserRole;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  defaultEmail: string;
  defaultPass: string;
  redirectPath: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'Provider',
    label: 'Food Provider',
    sublabel: 'Restaurants & Caterers',
    icon: <ChefHat className="w-5 h-5" />,
    defaultEmail: 'provider@greenleaf.com',
    defaultPass: 'password123',
    redirectPath: '/provider'
  },
  {
    role: 'Recipient',
    label: 'NGO Recipient',
    sublabel: 'Shelters & Food Banks',
    icon: <HeartHandshake className="w-5 h-5" />,
    defaultEmail: 'ngo@helpinghands.org',
    defaultPass: 'password123',
    redirectPath: '/recipient'
  },
  {
    role: 'Logistics',
    label: 'Logistics Fleet',
    sublabel: 'Drivers & Transport',
    icon: <Truck className="w-5 h-5" />,
    defaultEmail: 'driver@greenpulse.com',
    defaultPass: 'password123',
    redirectPath: '/logistics'
  },
  {
    role: 'Administrator',
    label: 'Administrator',
    sublabel: 'Oversight & Verification',
    icon: <ShieldCheck className="w-5 h-5" />,
    defaultEmail: 'admin@smartbite.org',
    defaultPass: 'admin123',
    redirectPath: '/admin'
  }
];

export const LoginPage: React.FC = () => {
  const { login, switchRoleDemo, loading } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('Provider');
  const [email, setEmail] = useState('provider@greenleaf.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = (option: RoleOption) => {
    setSelectedRole(option.role);
    setEmail(option.defaultEmail);
    setPassword(option.defaultPass);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      const roleConfig = ROLE_OPTIONS.find(r => r.role === selectedRole);
      navigate(roleConfig ? roleConfig.redirectPath : '/provider');
    } catch (err: any) {
      // Fallback for seamless demo
      try {
        await switchRoleDemo(selectedRole);
        const roleConfig = ROLE_OPTIONS.find(r => r.role === selectedRole);
        navigate(roleConfig ? roleConfig.redirectPath : '/provider');
      } catch {
        setError(err?.response?.data?.detail || 'Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div className="studio-footer-wrap relative min-h-screen overflow-x-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Video Background with Real-Time Pupil Tracking */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <FooterBackground />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto">
        {/* SmartBite Brand Header (Logoipsum removed) */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3 group" title="SmartBite Home">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#166534] to-[#22c55e] flex items-center justify-center shadow-lg shadow-emerald-950/20 group-hover:scale-105 transition-transform text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#080909] font-['Poppins']">
              Smart<span className="text-[#166534]">Bite</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#080909] font-['Poppins']">
            Sign in to your account
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-700 font-medium">
            Select your role and sign in to access your redistribution dashboard
          </p>
        </div>

        {/* Main Glassmorphic Card Container */}
        <div className="bg-white/35 backdrop-blur-2xl py-8 px-6 sm:px-10 rounded-3xl border border-white/60 shadow-[0_16px_48px_rgba(0,0,0,0.12)] ring-1 ring-white/50">
          
          {/* Step 1: Four Glassy Role Selection Cards */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((option) => {
                const isSelected = selectedRole === option.role;
                return (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => handleSelectRole(option)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600/80 bg-white/80 backdrop-blur-xl ring-2 ring-emerald-600/30 shadow-md text-emerald-950 font-semibold'
                        : 'border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/65 hover:border-white/90 shadow-xs text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className={`p-2 rounded-xl transition-colors ${
                        isSelected ? 'bg-[#166534] text-white shadow-xs' : 'bg-white/60 text-slate-700'
                      }`}>
                        {option.icon}
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#166534]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-400/60 bg-white/40" />
                      )}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${
                        isSelected ? 'text-[#0f3d20]' : 'text-slate-900'
                      }`}>
                        {option.label}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                        {option.sublabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50/90 backdrop-blur-sm border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-white/70 bg-white/50 backdrop-blur-md text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#166534]/40 focus:border-[#166534] focus:bg-white/80 transition-all shadow-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <span className="text-xs text-slate-600 font-medium">
                  Default: <span className="font-mono text-slate-900 font-bold">{selectedRole === 'Administrator' ? 'admin123' : 'password123'}</span>
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-white/70 bg-white/50 backdrop-blur-md text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#166534]/40 focus:border-[#166534] focus:bg-white/80 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-700 p-0.5 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button (Dark Green) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#166534] to-[#15803d] hover:from-[#14532d] hover:to-[#166534] text-white font-semibold text-sm shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2 mt-2 cursor-pointer active:scale-[0.99]"
            >
              <span>{loading ? 'Signing in...' : `Sign In as ${ROLE_OPTIONS.find(r => r.role === selectedRole)?.label || 'User'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 pt-5 border-t border-white/50 text-center">
            <p className="text-xs text-slate-700 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-[#166534] hover:text-[#14532d] hover:underline">
                Register New Organization
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
