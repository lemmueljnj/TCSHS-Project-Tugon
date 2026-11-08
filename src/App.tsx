/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TugonProvider, useTugon } from './context/TugonContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { QrPosterModal } from './components/common/QrPosterModal';
import { TrackReportModal } from './components/common/TrackReportModal';
import { SchoolConfigModal } from './components/modals/SchoolConfigModal';
import { AuthModal } from './components/auth/AuthModal';
import { HomeView } from './components/modules/HomeView';
import { ReportModule } from './components/modules/ReportModule';
import { RespondModule } from './components/modules/RespondModule';
import { PreventModule } from './components/modules/PreventModule';
import { SupportModule } from './components/modules/SupportModule';
import { MonitorModule } from './components/modules/MonitorModule';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { activeTab } = useTugon();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar with Theme Switcher & Role Navigation */}
      <Navbar />

      {/* Prominent Emergency Warning Strip */}
      <EmergencyBanner />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'report' && <ReportModule />}
        {activeTab === 'respond' && <RespondModule />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'prevent' && <PreventModule />}
        {activeTab === 'support' && <SupportModule />}
        {activeTab === 'monitor' && <MonitorModule />}
      </main>

      {/* Modals & Dialogs */}
      <AuthModal />
      <QrPosterModal />
      <TrackReportModal />
      <SchoolConfigModal />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <TugonProvider>
      <AppContent />
    </TugonProvider>
  );
}
