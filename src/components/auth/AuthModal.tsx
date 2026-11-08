import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  Mail,
  ShieldCheck,
  UserCheck,
  X,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  School,
  ArrowRight,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';
import { ADMIN_CREDENTIALS } from '../../data/initialData';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAsAdmin, loginAsCPC, accessCodes } = useTugon();

  const [activeTab, setActiveTab] = useState<'CPC' | 'ADMIN'>('CPC');

  // CPC form
  const [cpcEmail, setCpcEmail] = useState('');
  const [cpcAccessCode, setCpcAccessCode] = useState('');

  // Admin form
  const [adminEmail, setAdminEmail] = useState(ADMIN_CREDENTIALS.email);
  const [adminPassword, setAdminPassword] = useState('');

  // Error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleCpcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = loginAsCPC(cpcEmail, cpcAccessCode);
    if (!res.success) {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = loginAsAdmin(adminPassword, adminEmail);
    if (!res.success) {
      setErrorMessage(res.error || 'Invalid administrator password.');
    }
  };

  const fillCpcDemo = (email: string, code: string) => {
    setCpcEmail(email);
    setCpcAccessCode(code);
    setErrorMessage(null);
  };

  const fillAdminDemo = () => {
    setAdminEmail(ADMIN_CREDENTIALS.email);
    setAdminPassword(ADMIN_CREDENTIALS.password);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 dark:text-slate-100 shadow-2xl relative my-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Authorized Personnel Portal
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secure access for CPC Officers and System Administrators
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setErrorMessage(null);
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="mt-5 grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('CPC');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'CPC'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            CPC Member Login
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ADMIN');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'ADMIN'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            System Administrator
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* CPC Form */}
        {activeTab === 'CPC' ? (
          <form onSubmit={handleCpcSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>Registered DepEd Email Address</span>
              </label>
              <input
                type="email"
                value={cpcEmail}
                onChange={(e) => setCpcEmail(e.target.value)}
                placeholder="e.g. guidance.alonzo@deped.gov.ph"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span>Assigned Access Code</span>
              </label>
              <input
                type="text"
                value={cpcAccessCode}
                onChange={(e) => setCpcAccessCode(e.target.value.toUpperCase())}
                placeholder="CPC-XXXX-RNHS-2026"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Access codes are uniquely issued by the System Administrator and linked to your DepEd email.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify & Access CPC Dashboard</span>
            </button>

            {/* Quick Demo Pre-seed Buttons for Proposal Evaluators */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Evaluation Demo Accounts (Click to Fill):
              </span>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => fillCpcDemo('guidance.alonzo@deped.gov.ph', 'CPC-9481-RNHS-2026')}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-semibold block text-[11px]">Mr. Rafael Alonzo, RGC (Guidance)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">guidance.alonzo@deped.gov.ph</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400">CPC-9481</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillCpcDemo('discipline.bautista@deped.gov.ph', 'CPC-7724-RNHS-2026')}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-semibold block text-[11px]">Mrs. Cristina Bautista (Discipline)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">discipline.bautista@deped.gov.ph</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400">CPC-7724</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Administrator Email</span>
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@rizalnhs.deped.gov.ph"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Administrator Password</span>
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Log In as System Administrator</span>
            </button>

            {/* Quick Demo Pre-seed Button for Admin */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={fillAdminDemo}
                className="w-full py-2 px-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Default Admin Credentials (Auto-fill)</span>
              </button>
            </div>
          </form>
        )}

        {/* Student Notice */}
        <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <strong className="text-slate-700 dark:text-slate-300">Are you a Student?</strong> Learners do not require login credentials. You can access reporting, anti-bullying lessons, and track reports using reference numbers directly.
        </div>
      </div>
    </div>
  );
};
