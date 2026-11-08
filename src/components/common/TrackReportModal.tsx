import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, AlertCircle, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { useTugon } from '../../context/TugonContext';
import { IncidentReport, ReportStatus } from '../../types';

export const TrackReportModal: React.FC = () => {
  const { isTrackModalOpen, setIsTrackModalOpen, getReportByRef } = useTugon();
  const [refInput, setRefInput] = useState('');
  const [searchedReport, setSearchedReport] = useState<IncidentReport | null | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;
    const report = getReportByRef(refInput);
    setSearchedReport(report || null);
    setHasSearched(true);
  };

  const resetSearch = () => {
    setRefInput('');
    setSearchedReport(undefined);
    setHasSearched(false);
  };

  const getStatusStepIndex = (status: ReportStatus): number => {
    switch (status) {
      case 'new':
        return 0;
      case 'under_assessment':
        return 1;
      case 'referred':
      case 'for_followup':
        return 2;
      case 'resolved':
      case 'closed':
        return 3;
      default:
        return 0;
    }
  };

  if (!isTrackModalOpen) return null;

  const currentStep = searchedReport ? getStatusStepIndex(searchedReport.status) : 0;

  const statusSteps = [
    { title: 'Received', desc: 'Securely logged in school network' },
    { title: 'Triage & Assessment', desc: 'Reviewed by Guidance / CPC Officer' },
    { title: 'Intervention in Progress', desc: 'Safe counseling or protective action' },
    { title: 'Resolved & Monitored', desc: 'Appropriate support concluded' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-teal-500/10 dark:bg-teal-600/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Confidential Report Status Tracker
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Check progress anonymously using your 12-character Reference Number
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsTrackModalOpen(false);
              resetSearch();
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="mt-5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Enter Reference Number (e.g., TUGON-2026-8841)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value.toUpperCase())}
              placeholder="TUGON-2026-XXXX"
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono uppercase text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shadow cursor-pointer"
            >
              Track Concern
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            Tip: Try sample codes like <button type="button" onClick={() => setRefInput('TUGON-2026-8841')} className="underline text-blue-600 dark:text-teal-400 cursor-pointer">TUGON-2026-8841</button> or <button type="button" onClick={() => setRefInput('TUGON-2026-7319')} className="underline text-blue-600 dark:text-teal-400 cursor-pointer">TUGON-2026-7319</button>
          </p>
        </form>

        {/* Search results */}
        {hasSearched && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            {searchedReport ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-teal-400 px-2 py-0.5 rounded bg-blue-100 dark:bg-teal-950/60 border border-blue-200 dark:border-teal-800">
                      {searchedReport.referenceNumber}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Submitted: {searchedReport.createdAt.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Category:</span>
                    <span className="text-xs font-medium text-slate-800 dark:text-white capitalize bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                      {searchedReport.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 mt-2">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">Status Summary:</span>
                    <p>
                      {searchedReport.status === 'new' &&
                        'Your report has been logged. Our Child Protection Committee and Guidance staff are queued to conduct initial intake and verification.'}
                      {searchedReport.status === 'under_assessment' &&
                        'The incident is actively being assessed by designated guidance personnel. Initial intake procedures are underway to safeguard everyone involved.'}
                      {(searchedReport.status === 'referred' || searchedReport.status === 'for_followup') &&
                        'Support interventions (such as developmental counseling, restorative mediation, or parent check-in) are actively in progress.'}
                      {(searchedReport.status === 'resolved' || searchedReport.status === 'closed') &&
                        'Intervention concluded successfully with mutual understanding and safety measures confirmed.'}
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Resolution Pathway
                  </h4>
                  <div className="space-y-3">
                    {statusSteps.map((step, idx) => {
                      const isPast = idx < currentStep;
                      const isCurrent = idx === currentStep;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                              isPast
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 animate-pulse'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {isPast ? '✓' : idx + 1}
                          </div>
                          <div>
                            <div
                              className={`text-xs font-semibold ${
                                isCurrent
                                  ? 'text-blue-600 dark:text-teal-300'
                                  : isPast
                                  ? 'text-slate-800 dark:text-slate-200'
                                  : 'text-slate-400 dark:text-slate-500'
                              }`}
                            >
                              {step.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{step.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Confidentiality Protection:</strong> Specific details, counselor notes, and personal identities are kept confidential to protect all students involved under Republic Act 10173 and DepEd Child Protection protocols.
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800 dark:text-white">Reference Number Not Found</p>
                <p className="text-xs mt-1">
                  Please verify that the 12-character reference code was typed correctly (e.g. TUGON-2026-XXXX).
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              setIsTrackModalOpen(false);
              resetSearch();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
