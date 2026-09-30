import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { ImpactPage } from './pages/ImpactPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { StudioFooter } from './components/studio-footer/StudioFooter';

// Authenticated Pages
import { ProviderDashboard } from './pages/ProviderDashboard';
import { RecipientDashboard } from './pages/RecipientDashboard';
import { LogisticsDashboard } from './pages/LogisticsDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { DemandForecastingPage } from './pages/DemandForecastingPage';
import { InventoryManagementPage } from './pages/InventoryManagementPage';
import { SurplusManagementPage } from './pages/SurplusManagementPage';
import { MatchingEnginePage } from './pages/MatchingEnginePage';
import { DeliveryRoutePage } from './pages/DeliveryRoutePage';
import { FoodSafetyPage } from './pages/FoodSafetyPage';
import { AnalyticsReportsPage } from './pages/AnalyticsReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages with Top Nav & Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/studio" element={<StudioFooter />} />
          </Route>

          {/* Standalone Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Dashboard Pages with Sidebar */}
          <Route element={<DashboardLayout />}>
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/recipient" element={<RecipientDashboard />} />
            <Route path="/logistics" element={<LogisticsDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/forecast" element={<DemandForecastingPage />} />
            <Route path="/inventory" element={<InventoryManagementPage />} />
            <Route path="/surplus" element={<SurplusManagementPage />} />
            <Route path="/matching" element={<MatchingEnginePage />} />
            <Route path="/routes" element={<DeliveryRoutePage />} />
            <Route path="/safety" element={<FoodSafetyPage />} />
            <Route path="/analytics-reports" element={<AnalyticsReportsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfileSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
