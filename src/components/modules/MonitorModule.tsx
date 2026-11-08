import React, { useState } from 'react';
import {
  BarChart3,
  ShieldCheck,
  Download,
  Printer,
  PieChart,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Clock,
  GraduationCap,
  Users,
  Calendar,
  AlertTriangle,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';
import { ReportCategory } from '../../types';

export const MonitorModule: React.FC = () => {
  const { reports, schoolConfig, progress } = useTugon();

  const [timeFilter, setTimeFilter] = useState<'all' | 'q4' | 'q3'>('all');

  // Aggregations
  const totalReports = reports.length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved' || r.status === 'closed').length;
  const inAssessmentCount = reports.filter((r) => r.status === 'under_assessment' || r.status === 'referred' || r.status === 'for_followup').length;
  const newReportsCount = reports.filter((r) => r.status === 'new').length;
  const anonymousCount = reports.filter((r) => r.isAnonymous).length;

  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 100;
  const anonymousPercent = totalReports > 0 ? Math.round((anonymousCount / totalReports) * 100) : 0;

  // Category counts
  const categoryCounts: Record<ReportCategory, number> = {
    bullying: reports.filter((r) => r.category === 'bullying').length,
    cyberbullying: reports.filter((r) => r.category === 'cyberbullying').length,
    physical_violence: reports.filter((r) => r.category === 'physical_violence').length,
    verbal_harassment: reports.filter((r) => r.category === 'verbal_harassment').length,
    school_safety: reports.filter((r) => r.category === 'school_safety').length,
  };

  const categoryLabels: Record<ReportCategory, { label: string; color: string; barColor: string }> = {
    bullying: { label: 'Bullying (Face-to-Face)', color: 'text-blue-600 dark:text-blue-400', barColor: 'bg-blue-500' },
    cyberbullying: { label: 'Cyberbullying & Online Harassment', color: 'text-teal-600 dark:text-teal-400', barColor: 'bg-teal-500' },
    physical_violence: { label: 'Physical Violence / Altercations', color: 'text-rose-600 dark:text-rose-400', barColor: 'bg-rose-500' },
    verbal_harassment: { label: 'Verbal Harassment / Slander', color: 'text-amber-600 dark:text-amber-400', barColor: 'bg-amber-500' },
    school_safety: { label: 'School Safety & Perimeter Hazards', color: 'text-purple-600 dark:text-purple-400', barColor: 'bg-purple-500' },
  };

  // Location aggregations
  const locationMap: Record<string, number> = {};
  reports.forEach((r) => {
    const loc = r.location.split(' (')[0].trim();
    locationMap[loc] = (locationMap[loc] || 0) + 1;
  });

  const sortedLocations = Object.entries(locationMap).sort((a, b) => b[1] - a[1]);

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/20 text-purple-800 dark:text-purple-300 text-xs font-semibold mb-2">
            <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>TUGON: MONITOR &bull; Non-Identifying Aggregate Child Protection Intelligence</span>
          </div>
          <h1 className="text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white tracking-tight">
            School Safety Monitoring Dashboard
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {schoolConfig.schoolName} &bull; Executive analytics and incident trend monitoring to guide institutional safety interventions and Division Office reporting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">School Year 2026&ndash;2027 (All Terms)</option>
            <option value="q4">Quarter 4 (Recent)</option>
            <option value="q3">Quarter 3</option>
          </select>

          <button
            onClick={handlePrintSummary}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Quarterly Report</span>
          </button>
        </div>
      </div>

      {/* RA 10173 Strict Non-Identifying Privacy Seal */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3 shadow-sm">
        <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <strong className="text-slate-900 dark:text-white block font-semibold">Strict Privacy Assurance (RA 10173):</strong>
          This monitoring interface renders only aggregated, statistical, and non-identifying data. No student names, confidential case narratives, or identifying details are ever exposed in public dashboards.
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Reports */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Total Reported Concerns</span>
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">{totalReports}</div>
          <div className="text-[11px] text-teal-600 dark:text-teal-400 pt-1">
            &#10003; 100% Routed to Guidance
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Intervention & Care Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{resolutionRate}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            {resolvedCount} resolved / closed
          </div>
        </div>

        {/* In-Progress Triage */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Active Supportive Cases</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">{inAssessmentCount}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            Under counseling & mediation
          </div>
        </div>

        {/* Anonymous vs Named reporting ratio */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Anonymous Submissions</span>
            <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">{anonymousPercent}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            {anonymousCount} of {totalReports} protected anonymity
          </div>
        </div>
      </div>

      {/* Main Charts & Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Category Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Concern Distribution by Category
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Breakdown of verified school protection categories (RA 10627)
              </p>
            </div>
            <span className="text-xs font-mono text-blue-600 dark:text-teal-400 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {totalReports} Incidents
            </span>
          </div>

          {/* Visual Bars */}
          <div className="space-y-4">
            {(Object.keys(categoryCounts) as ReportCategory[]).map((cat) => {
              const count = categoryCounts[cat];
              const percent = totalReports > 0 ? Math.round((count / totalReports) * 100) : 0;
              const meta = categoryLabels[cat];

              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{meta.label}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-white">{count}</strong> ({percent}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div
                      className={`${meta.barColor} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-blue-600 dark:text-teal-400 block font-semibold">CPC Strategic Insight:</strong>
            Cyberbullying and face-to-face verbal harassment account for the highest proportions of reported distress. Continued roll-out of <em>TUGON: PREVENT</em> Module 2 (Digital Citizenship) is recommended for upcoming Grade 7 to 10 homeroom guidance periods.
          </div>
        </div>

        {/* Right Column: Incident Locations & Safety Hotspots (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
              Reported Incident Locations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Campus areas identified for enhanced teacher-on-duty patrols
            </p>
          </div>

          <div className="space-y-3">
            {sortedLocations.map(([loc, count], idx) => {
              const percent = Math.round((count / totalReports) * 100);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-teal-400 flex-shrink-0" />
                    <span>{loc}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-blue-600 dark:text-teal-300 font-bold">{count}</span>
                    <span className="text-slate-400 text-[10px]">({percent}%)</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200">
            <strong>Active Safety Measure:</strong> Guard visibility increased at Perimeter Gate 3 during 3:30 PM &ndash; 5:30 PM dismissal windows.
          </div>
        </div>
      </div>

      {/* Prevention & Training Participation Metrics */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
              Prevention Curriculum & Upstander Impact
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student engagement in TUGON: PREVENT interactive modules
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full">
            High Engagement
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Quiz Assessments Taken</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">1,428</div>
            <p className="text-[11px] text-teal-600 dark:text-teal-400">Across Junior & Senior High</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Average Knowledge Score</span>
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400 font-mono">92.4%</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">RA 10627 Rights Comprehension</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Safe School Champions Certified</span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">964</div>
            <p className="text-[11px] text-amber-700 dark:text-amber-300">Empowered Student Upstanders</p>
          </div>
        </div>
      </div>
    </div>
  );
};
