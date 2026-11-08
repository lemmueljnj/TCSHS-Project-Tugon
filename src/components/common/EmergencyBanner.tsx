import React from 'react';
import { AlertCircle, PhoneCall, ShieldAlert, X, HeartPulse, Building2, User } from 'lucide-react';
import { useTugon } from '../../context/TugonContext';

export const EmergencyBanner: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, schoolConfig } = useTugon();

  return (
    <>
      {/* Prominent Emergency Warning Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-rose-100 border-b border-rose-800/60 px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 animate-bounce" />
            <span>
              <strong className="font-bold text-white tracking-wide uppercase">Urgent Emergency Notice:</strong>{' '}
              If you or a peer are in immediate physical danger, severe emotional distress, or facing an active crisis,
              do not wait for an online reply. Please reach out directly to school authorities or emergency hotlines.
            </span>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-md font-semibold text-xs shadow-sm transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Immediate Hotlines</span>
          </button>
        </div>
      </div>

      {/* Emergency Crisis Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative overflow-hidden">
            {/* Top red glow accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500"></div>

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <HeartPulse className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                    Emergency Crisis & Child Protection Hotlines
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    24/7 Free, Confidential Assistance for Philippine Learners
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-1">
              {/* School Guidance Office */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 font-semibold text-teal-700 dark:text-teal-300 text-sm mb-1">
                  <User className="w-4 h-4" />
                  <span>{schoolConfig.schoolName} — Guidance Office</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                  Location: <span className="text-slate-900 dark:text-white font-medium">{schoolConfig.guidanceOfficeLocation}</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Counselor: <span className="text-slate-900 dark:text-white font-medium">{schoolConfig.guidanceCounselor}</span>
                </p>
                <div className="mt-2 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 bg-white dark:bg-slate-900/80 px-2.5 py-1 rounded-lg inline-block border border-slate-200 dark:border-slate-800">
                  School Phone: {schoolConfig.contactNumber}
                </div>
              </div>

              {/* National Center for Mental Health */}
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-rose-800 dark:text-rose-200 text-sm flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>NCMH Crisis Helpline (Toll-Free Nationwide)</span>
                  </div>
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded font-bold">24/7 Free</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Immediate, confidential mental health and psychological support for learners in distress.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono font-bold">
                  <span className="bg-rose-100 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 px-2 py-1 rounded-lg border border-rose-200 dark:border-rose-700/60">
                    Dial 1553 (Luzon toll-free landline)
                  </span>
                  <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                    0917-899-8727 / 0966-351-4518
                  </span>
                </div>
              </div>

              {/* DepEd Learner Rights and Protection Office (LRPO) Telesafe */}
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-blue-800 dark:text-blue-200 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>DepEd Learner TeleSafe Contact Center</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-bold">DepEd Official</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Official reporting channel of the Department of Education Learner Rights and Protection Office.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="bg-blue-100 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-lg">
                    (02) 8632-1372 / 8637-2306
                  </span>
                  <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                    lrpo@deped.gov.ph
                  </span>
                </div>
              </div>

              {/* PNP Women and Children Protection Center */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>PNP Women and Children Protection Center (WCPC)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Immediate law enforcement response for cases of severe child abuse, exploitation, or assault.
                </p>
                <div className="mt-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-white dark:bg-slate-900/80 px-2.5 py-1 rounded-lg inline-block border border-slate-200 dark:border-slate-800">
                  Hotline: (02) 8532-6690 / Dial 911 / 177
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-300">Important Reminders:</strong> Reports filed via Project Tugon are reviewed during official school hours by designated Child Protection Committee personnel. Always alert trusted adults or clinic personnel directly for urgent medical or safety incidents.
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Emergency Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
