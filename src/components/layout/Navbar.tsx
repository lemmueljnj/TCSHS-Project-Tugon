import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  ShieldAlert,
  GraduationCap,
  HeartHandshake,
  BarChart3,
  Search,
  QrCode,
  AlertTriangle,
  Menu,
  X,
  Lock,
  School,
  Settings,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserCheck,
  KeyRound,
  LayoutDashboard,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';
import { ActiveTab } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    authSession,
    userRole,
    logout,
    setIsAuthModalOpen,
    setIsQrModalOpen,
    setIsTrackModalOpen,
    setIsEmergencyModalOpen,
    schoolConfig,
    reports,
    themeMode,
    toggleThemeMode,
  } = useTugon();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newReportsCount = reports.filter((r) => r.status === 'new').length;

  // Role-based Nav Items
  const getNavItems = () => {
    if (userRole === 'ADMIN') {
      return [
        { id: 'admin' as ActiveTab, label: 'Admin Dashboard', icon: <KeyRound className="w-4 h-4" />, badge: 'Full Control', badgeColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-300' },
        { id: 'respond' as ActiveTab, label: 'Case Queue', icon: <ShieldAlert className="w-4 h-4" />, badge: newReportsCount > 0 ? `${newReportsCount} New` : undefined, badgeColor: 'bg-rose-500 text-white' },
        { id: 'monitor' as ActiveTab, label: 'TUGON: MONITOR', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'support' as ActiveTab, label: 'TUGON: SUPPORT', icon: <HeartHandshake className="w-4 h-4" /> },
        { id: 'prevent' as ActiveTab, label: 'TUGON: PREVENT', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'home' as ActiveTab, label: 'Public Home', icon: <School className="w-4 h-4" /> },
      ];
    }

    if (userRole === 'CPC') {
      return [
        { id: 'respond' as ActiveTab, label: 'CPC Dashboard (RESPOND)', icon: <ShieldAlert className="w-4 h-4" />, badge: newReportsCount > 0 ? `${newReportsCount} New` : 'Cases', badgeColor: 'bg-blue-600 text-white' },
        { id: 'monitor' as ActiveTab, label: 'TUGON: MONITOR', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'support' as ActiveTab, label: 'TUGON: SUPPORT', icon: <HeartHandshake className="w-4 h-4" /> },
        { id: 'prevent' as ActiveTab, label: 'TUGON: PREVENT', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'home' as ActiveTab, label: 'Home View', icon: <School className="w-4 h-4" /> },
      ];
    }

    // STUDENT (Public Learner) Nav Items
    return [
      { id: 'home' as ActiveTab, label: 'Home', icon: <School className="w-4 h-4" /> },
      { id: 'report' as ActiveTab, label: 'TUGON: REPORT', icon: <FileText className="w-4 h-4" />, badge: 'Confidential', badgeColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
      { id: 'prevent' as ActiveTab, label: 'TUGON: PREVENT', icon: <GraduationCap className="w-4 h-4" />, badge: '4 Modules', badgeColor: 'bg-teal-500/20 text-teal-700 dark:text-teal-300' },
      { id: 'support' as ActiveTab, label: 'TUGON: SUPPORT', icon: <HeartHandshake className="w-4 h-4" /> },
      { id: 'monitor' as ActiveTab, label: 'Safety Overview', icon: <BarChart3 className="w-4 h-4" /> },
    ];
  };

  const navItems = getNavItems();

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-sm transition-colors duration-200">
      {/* Top Strip: Compliance, Tracking, Hotlines, Theme */}
      <div className="bg-slate-50 dark:bg-slate-950 px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800/80 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700/50">
            DepEd DO 40, s. 2012 & RA 10627 Compliant
          </span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
            {schoolConfig.schoolName} &bull; Pasig City
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-xs"
            title="Track submitted report by reference code"
          >
            <Search className="w-3.5 h-3.5 text-teal-500" />
            <span>Track My Report</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          <button
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer text-xs"
            title="Generate QR code poster for school bulletin"
          >
            <QrCode className="w-3.5 h-3.5 text-blue-500" />
            <span>School QR Poster</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex items-center gap-1 text-rose-600 dark:text-rose-300 hover:underline font-medium cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden xs:inline">Crisis Hotlines</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-slate-900 dark:text-white font-['Space_Grotesk']">
                  PROJECT TUGON
                </span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 hidden md:inline">
                  SAFE SCHOOL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 hidden sm:block">
                Unified Grievance and Observation Network
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        item.badgeColor || 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Theme Toggle & Role Portal */}
          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle Button with Sun / Moon Icons */}
            <button
              onClick={toggleThemeMode}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle theme mode"
            >
              {themeMode === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Auth Session / Role Portal Button */}
            {authSession.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {userRole === 'ADMIN' ? 'Administrator' : 'CPC Officer'}
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
                    {authSession.user?.name.split(',')[0]}
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Sign out to return to student mode"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                title="Sign in with your CPC access code or admin credentials"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Personnel Sign In</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.badgeColor || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsTrackModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
            >
              <Search className="w-4 h-4 text-teal-500" />
              <span>Track My Report (Reference Code)</span>
            </button>
            <button
              onClick={() => {
                setIsQrModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
            >
              <QrCode className="w-4 h-4 text-blue-500" />
              <span>School Reporting QR Code Poster</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
