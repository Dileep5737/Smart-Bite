import axios from 'axios';
import {
  User, FoodItem, ForecastResult, RecipientMatch,
  DonationRequest, Donation, Delivery, Notification, ImpactMetrics
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartbite_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    return res.data;
  },
  register: async (data: any) => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  },
  getMe: async (): Promise<User> => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {}
    localStorage.removeItem('smartbite_token');
    localStorage.removeItem('smartbite_user');
  }
};

export const foodApi = {
  getItems: async (params?: { category?: string; status?: string; search?: string; provider_id?: number }): Promise<FoodItem[]> => {
    const res = await apiClient.get('/food', { params });
    return res.data;
  },
  getItem: async (id: number): Promise<FoodItem> => {
    const res = await apiClient.get(`/food/${id}`);
    return res.data;
  },
  createItem: async (data: Partial<FoodItem>): Promise<FoodItem> => {
    const res = await apiClient.post('/food', data);
    return res.data;
  },
  updateItem: async (id: number, data: Partial<FoodItem>): Promise<FoodItem> => {
    const res = await apiClient.put(`/food/${id}`, data);
    return res.data;
  },
  deleteItem: async (id: number) => {
    const res = await apiClient.delete(`/food/${id}`);
    return res.data;
  }
};

export const forecastApi = {
  predict: async (data: {
    food_item: string;
    food_category: string;
    historical_prep_quantity: number;
    historical_consumption: number;
    historical_waste: number;
    expected_customer_count: number;
    day_of_week: string;
    season: string;
    special_events: string;
    weather?: string;
  }): Promise<ForecastResult> => {
    const res = await apiClient.post('/forecast/predict', data);
    return res.data;
  },
  getMetrics: async () => {
    const res = await apiClient.get('/forecast/metrics');
    return res.data;
  },
  getHistory: async () => {
    const res = await apiClient.get('/forecast/history');
    return res.data;
  }
};

export const matchingApi = {
  getMatchesForFood: async (foodId: number): Promise<RecipientMatch[]> => {
    const res = await apiClient.get(`/matching/food/${foodId}`);
    return res.data;
  }
};

export const donationApi = {
  createRequest: async (data: {
    food_item_id: number;
    requested_quantity: number;
    beneficiary_count: number;
    pickup_availability?: string;
  }): Promise<DonationRequest> => {
    const res = await apiClient.post('/requests', data);
    return res.data;
  },
  getRequests: async (recipientId?: number): Promise<DonationRequest[]> => {
    const res = await apiClient.get('/requests', { params: { recipient_id: recipientId } });
    return res.data;
  },
  updateRequestStatus: async (id: number, status: 'Accepted' | 'Rejected'): Promise<any> => {
    const res = await apiClient.put(`/requests/${id}/status?status=${status}`);
    return res.data;
  },
  getDonations: async (params?: { provider_id?: number; recipient_id?: number }): Promise<Donation[]> => {
    const res = await apiClient.get('/donations', { params });
    return res.data;
  },
  updateDonationStatus: async (id: number, status: string): Promise<any> => {
    const res = await apiClient.put(`/donations/${id}/status?status=${status}`);
    return res.data;
  }
};

export const logisticsApi = {
  getDeliveries: async (status?: string): Promise<Delivery[]> => {
    const res = await apiClient.get('/deliveries', { params: { status } });
    return res.data;
  },
  getDelivery: async (id: number): Promise<Delivery> => {
    const res = await apiClient.get(`/deliveries/${id}`);
    return res.data;
  },
  updateStatus: async (id: number, status: string): Promise<any> => {
    const res = await apiClient.put(`/deliveries/${id}/status?status=${status}`);
    return res.data;
  },
  getRoute: async (id: number) => {
    const res = await apiClient.get(`/deliveries/${id}/route`);
    return res.data;
  }
};

export const safetyApi = {
  submitCheck: async (data: {
    food_item_id: number;
    storage_temp_celsius?: number;
    packaging_intact: boolean;
    odor_appearance_normal: boolean;
    within_safe_window: boolean;
    hygiene_standards_met: boolean;
    remarks?: string;
  }) => {
    const res = await apiClient.post('/safety/checks', data);
    return res.data;
  },
  getChecksForFood: async (foodId: number) => {
    const res = await apiClient.get(`/safety/food/${foodId}`);
    return res.data;
  },
  getAllChecks: async () => {
    const res = await apiClient.get('/safety/all');
    return res.data;
  }
};

export const analyticsApi = {
  getOverview: async (): Promise<ImpactMetrics> => {
    const res = await apiClient.get('/analytics/overview');
    return res.data;
  },
  getWasteTrends: async () => {
    const res = await apiClient.get('/analytics/waste');
    return res.data;
  },
  getCategories: async () => {
    const res = await apiClient.get('/analytics/categories');
    return res.data;
  },
  getCities: async () => {
    const res = await apiClient.get('/analytics/cities');
    return res.data;
  },
  getImpact: async () => {
    const res = await apiClient.get('/analytics/impact');
    return res.data;
  }
};

export const notificationsApi = {
  getNotifications: async (userId?: number): Promise<Notification[]> => {
    const res = await apiClient.get('/notifications', { params: { user_id: userId } });
    return res.data;
  },
  markAsRead: async (id: number) => {
    const res = await apiClient.put(`/notifications/${id}/read`);
    return res.data;
  },
  markAllAsRead: async () => {
    const res = await apiClient.put('/notifications/read-all');
    return res.data;
  }
};

export const adminApi = {
  getDashboard: async () => {
    const res = await apiClient.get('/admin/dashboard');
    return res.data;
  },
  getUsers: async (): Promise<User[]> => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },
  getOrganizations: async () => {
    const res = await apiClient.get('/admin/organizations');
    return res.data;
  },
  verifyOrganization: async (id: number, status: 'Verified' | 'Rejected' | 'Pending') => {
    const res = await apiClient.put(`/admin/organizations/${id}/verification?status=${status}`);
    return res.data;
  },
  seedDemo: async () => {
    const res = await apiClient.post('/admin/seed-demo');
    return res.data;
  }
};
