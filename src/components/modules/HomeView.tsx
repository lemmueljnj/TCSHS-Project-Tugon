import React from 'react';
import {
  ShieldCheck,
  FileText,
  ShieldAlert,
  GraduationCap,
  HeartHandshake,
  BarChart3,
  ArrowRight,
  Lock,
  EyeOff,
  CheckCircle2,
  Users,
  Search,
  QrCode,
  Sparkles,
  PhoneCall,
  Clock,
  HelpCircle,
  Award,
  KeyRound,
  Bell,
  LogIn,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    userRole,
    authSession,
    setIsAuthModalOpen,
    setIsQrModalOpen,
    setIsTrackModalOpen,
    reports,
    schoolConfig,
    announcements,
  } = useTugon();

  const totalReports = reports.length;
  const resolvedReports = reports.filter((r) => r.status === 'resolved' || r.status === 'closed').length;
  const activeCases = reports.filter((r) => r.status !== 'resolved' && r.status !== 'closed').length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 100;

  const modules = [
    {
      id: 'report',
      title: 'TUGON: REPORT',
      subtitle: 'Accessible Digital Grievance Intake',
      desc: 'Submit incident concerns confidentially or 100% anonymously. Includes options for incident details, location, evidence upload, and reference tracking.',
      icon: <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      color: 'border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400 dark:hover:border-emerald-500/60 bg-emerald-50/50 dark:bg-emerald-950/10',
      tag: 'Learner Channel',
      tagColor: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300',
      actionLabel: 'Report an Incident',
    },
    {
      id: 'respond',
      title: 'TUGON: RESPOND',
      subtitle: 'CPC Authorized Case Triage',
      desc: 'Role-based case management for Guidance Counselors and CPC members to triage, record interventions, assign referrals, and monitor follow-ups.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      color: 'border-rose-200 dark:border-rose-500/30 hover:border-rose-400 dark:hover:border-rose-500/60 bg-rose-50/50 dark:bg-rose-950/10',
      tag: userRole === 'STUDENT' ? 'Authorized Access' : 'Active Workspace',
      tagColor: userRole === 'STUDENT' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300',
      actionLabel: userRole === 'STUDENT' ? 'Personnel Access Portal' : 'Open Case Manager',
    },
    {
      id: 'prevent',
      title: 'TUGON: PREVENT',
      subtitle: 'Interactive Education & Awareness',
      desc: 'Anti-bullying lessons, cyberbullying modules, bystander-to-upstander strategies (the 4Ds), scenario dilemmas, and downloadable Safe Champion certificate.',
      icon: <GraduationCap className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      color: 'border-teal-200 dark:border-teal-500/30 hover:border-teal-400 dark:hover:border-teal-500/60 bg-teal-50/50 dark:bg-teal-950/10',
      tag: '4 Learning Modules',
      tagColor: 'bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300',
      actionLabel: 'Start Learning Modules',
    },
    {
      id: 'support',
      title: 'TUGON: SUPPORT',
      subtitle: 'School & Community Directory',
      desc: 'Immediate contact information for the Child Protection Committee, Guidance & Counseling Office, designated personnel, hotlines, and learner rights policies.',
      icon: <HeartHandshake className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: 'border-blue-200 dark:border-blue-500/30 hover:border-blue-400 dark:hover:border-blue-500/60 bg-blue-50/50 dark:bg-blue-950/10',
      tag: 'Help & Rights',
      tagColor: 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300',
      actionLabel: 'View Support Directory',
    },
    {
      id: 'monitor',
      title: 'TUGON: MONITOR',
      subtitle: 'Non-Identifying Safety Analytics',
      desc: 'Aggregated, privacy-compliant safety intelligence with incident category distribution, location heatmaps, intervention rates, and downloadable quarterly reports.',
      icon: <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      color: 'border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-500/60 bg-purple-50/50 dark:bg-purple-950/10',
      tag: 'Executive Analytics',
      tagColor: 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300',
      actionLabel: 'View Safety Statistics',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Role Context Notification Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-blue-950/40 border border-slate-200 dark:border-blue-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                userRole === 'ADMIN'
                  ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300'
                  : userRole === 'CPC'
                  ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300'
                  : 'bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300'
              }`}
            >
              Role: {userRole}
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              {userRole === 'ADMIN' && (
                <span>You have full administrative privileges to generate access codes and configure settings.</span>
              )}
              {userRole === 'CPC' && (
                <span>Authenticated Child Protection Committee member: {authSession.user?.name}.</span>
              )}
              {userRole === 'STUDENT' && (
                <span>Student / Learner public portal. Confidential reporting and education active.</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {userRole === 'STUDENT' ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-blue-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Personnel Sign In</span>
              </button>
            ) : userRole === 'ADMIN' ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Manage Access Codes</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('respond')}
                className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Go to CPC Case Desk</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs text-blue-700 dark:text-teal-300 font-medium mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-teal-400" />
            <span>Republic Act No. 10627 & DepEd Child Protection Policy DO 40, s. 2012</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk'] max-w-4xl mx-auto leading-tight">
            PROJECT TUGON
          </h1>
          <p className="mt-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-700 via-teal-600 to-indigo-700 dark:from-teal-300 dark:via-blue-200 dark:to-sky-300 bg-clip-text text-transparent">
            Your Voice Matters. Your Safety Matters.
          </p>

          <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300 italic tracking-wide">
            From Silence to Solutions. Every Concern Heard. Every Learner Protected.
          </p>

          <p className="mt-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            "An initiative that strengthens our school's commitment to a safe, inclusive, and violence-free learning environment. Through accessible reporting, meaningful education, and coordinated support, every learner is encouraged to speak up and take part in creating a safer school community."
          </p>

          {/* Main Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('report')}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>REPORT A CONCERN</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('prevent')}
              className="px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl shadow-sm flex items-center gap-2 text-sm transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>EXPLORE LEARNING RESOURCES</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className="px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl shadow-sm flex items-center gap-2 text-sm transition-all cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>FIND SCHOOL SUPPORT</span>
            </button>
          </div>

          {/* Core Callout Statement */}
          <div className="mt-10 inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 dark:from-blue-950/80 dark:via-slate-900/90 dark:to-teal-950/80 border border-blue-200 dark:border-teal-500/30">
            <span className="text-sm font-extrabold text-blue-900 dark:text-teal-300 tracking-wide">
              Speak Up. Stand Together. Keep Our School Safe.
            </span>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{totalReports}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Concerns Logged</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1">&#10003; 100% Reviewed by CPC</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{resolutionRate}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Resolution & Care Rate</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">Restorative interventions</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Confidentiality Guard</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">RA 10173 Encrypted Data</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400 font-mono">4</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Interactive Modules</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">Free Champion Certificate</div>
            </div>
          </div>
        </div>
      </section>

      {/* School Child Protection Advisories (Managed by Admin) */}
      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-blue-600 dark:text-teal-400" />
              <h3 className="text-base font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                School Child Protection Advisories & Notices
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {announcements.slice(0, 3).map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-blue-600 dark:text-teal-400 uppercase text-[10px]">
                      {ann.category}
                    </span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">{ann.title}</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {ann.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 Core Interconnected Modules Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Five Interconnected Protection Modules
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            A comprehensive, closed-loop safety architecture uniting learners, educators, guidance counselors, and school administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 shadow-sm ${mod.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    {mod.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${mod.tagColor}`}>
                    {mod.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-teal-300 transition-colors font-['Space_Grotesk']">
                  {mod.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  {mod.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/60">
                <button
                  onClick={() => setActiveTab(mod.id as any)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <span>{mod.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick QR & Poster Card */}
          <div className="p-6 rounded-3xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-slate-900/80 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <QrCode className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  School Physical Assets
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                School Corridor QR Posters
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Accessible Campus Physical Touchpoints
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Generate and print customized QR code posters for classroom boards, the guidance bulletin, canteen pillars, and learner ID cards to ensure every student can report on mobile without typing URLs.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60">
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors shadow cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>View & Print Poster</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How Reporting Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-teal-400">
              Safe & Non-Punitive Child-Protection Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Space_Grotesk'] mt-1">
              How Reporting Works in Project Tugon
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Every submission is treated with the utmost care, confidentiality, and procedural fairness under DepEd Order No. 40, s. 2012.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Confidential Submission</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A learner or bystander submits a report via mobile QR or web portal. You can choose to be anonymous or provide contact details for updates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Triage & Verification</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The Registered Guidance Counselor and CPC Chairperson evaluate the details. Anonymous tips are verified factually before any actions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Safe Intervention</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Learners receive developmental counseling, restorative peer mediation, or safety plans. Parents are engaged in a supportive, constructive setting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Monitoring & Care</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The school checks in over subsequent weeks to verify learner safety, zero retaliation, and healthy campus reintegration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
