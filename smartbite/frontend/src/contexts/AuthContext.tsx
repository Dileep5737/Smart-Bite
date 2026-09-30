import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  switchRoleDemo: (role: UserRole) => Promise<void>;
  loading: boolean;
}

const DEMO_USERS: Record<UserRole, { email: string; pass: string; user: Partial<User> }> = {
  Provider: {
    email: 'provider@greenleaf.com',
    pass: 'password123',
    user: {
      id: 1,
      full_name: 'Rajesh Sharma',
      email: 'provider@greenleaf.com',
      role: 'Provider',
      organization_id: 1,
      account_status: 'Active',
      organization: {
        id: 1,
        organization_name: 'Green Leaf Fine Dining',
        organization_type: 'Restaurant',
        address: '102, 100 Feet Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560038',
        verification_status: 'Verified',
        capacity_daily_meals: 350
      }
    }
  },
  Recipient: {
    email: 'ngo@helpinghands.org',
    pass: 'password123',
    user: {
      id: 2,
      full_name: 'Sunita Deshmukh',
      email: 'ngo@helpinghands.org',
      role: 'Recipient',
      organization_id: 4,
      account_status: 'Active',
      organization: {
        id: 4,
        organization_name: 'Helping Hands NGO',
        organization_type: 'NGO',
        address: '14, Queens Road, Tasker Town, Shivajinagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560051',
        verification_status: 'Verified',
        capacity_daily_meals: 250
      }
    }
  },
  Logistics: {
    email: 'driver@greenpulse.com',
    pass: 'password123',
    user: {
      id: 3,
      full_name: 'Amit Verma',
      email: 'driver@greenpulse.com',
      role: 'Logistics',
      organization_id: 7,
      account_status: 'Active',
      organization: {
        id: 7,
        organization_name: 'GreenPulse Eco-Logistics',
        organization_type: 'Logistics',
        address: 'Logistics Hub, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560001',
        verification_status: 'Verified',
        capacity_daily_meals: 1000
      }
    }
  },
  Administrator: {
    email: 'admin@smartbite.org',
    pass: 'admin123',
    user: {
      id: 4,
      full_name: 'Dr. Ananya Roy',
      email: 'admin@smartbite.org',
      role: 'Administrator',
      organization_id: 8,
      account_status: 'Active',
      organization: {
        id: 8,
        organization_name: 'SmartBite Governance Board',
        organization_type: 'Administration',
        address: 'SmartBite Pilot Center, Bengaluru',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560001',
        verification_status: 'Verified',
        capacity_daily_meals: 1000
      }
    }
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smartbite_user');
    return saved ? JSON.parse(saved) : (DEMO_USERS.Provider.user as User);
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('smartbite_token') || 'demo_token_provider');
  const [loading, setLoading] = useState<boolean>(false);

  const role: UserRole = user?.role || 'Provider';

  useEffect(() => {
    // If not set, initialize default demo session
    if (!localStorage.getItem('smartbite_user')) {
      localStorage.setItem('smartbite_user', JSON.stringify(DEMO_USERS.Provider.user));
      localStorage.setItem('smartbite_token', 'demo_token_provider');
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, pass);
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem('smartbite_user', JSON.stringify(data.user));
      localStorage.setItem('smartbite_token', data.access_token);
    } catch (err) {
      // Fallback check demo users
      const match = Object.values(DEMO_USERS).find(d => d.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setUser(match.user as User);
        setToken(`demo_token_${match.user.role?.toLowerCase()}`);
        localStorage.setItem('smartbite_user', JSON.stringify(match.user));
        localStorage.setItem('smartbite_token', `demo_token_${match.user.role?.toLowerCase()}`);
      } else {
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  const switchRoleDemo = async (newRole: UserRole) => {
    setLoading(true);
    const demo = DEMO_USERS[newRole];
    try {
      const res = await authApi.login(demo.email, demo.pass);
      setUser(res.user);
      setToken(res.access_token);
      localStorage.setItem('smartbite_user', JSON.stringify(res.user));
      localStorage.setItem('smartbite_token', res.access_token);
    } catch {
      setUser(demo.user as User);
      const fakeToken = `demo_token_${newRole.toLowerCase()}`;
      setToken(fakeToken);
      localStorage.setItem('smartbite_user', JSON.stringify(demo.user));
      localStorage.setItem('smartbite_token', fakeToken);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        switchRoleDemo,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
