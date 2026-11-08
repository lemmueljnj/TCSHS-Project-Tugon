import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  UserCheck,
  Lock,
  Clock,
  Calendar,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  User,
  ShieldCheck,
  PlusCircle,
  Eye,
  History,
  FileSpreadsheet,
  Printer,
  ChevronRight,
  Tag,
  Paperclip,
  LogIn,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';
import { IncidentReport, ReportCategory, ReportStatus, UrgencyLevel } from '../../types';

export const RespondModule: React.FC = () => {
  const {
    reports,
    authSession,
    userRole,
    setIsAuthModalOpen,
    updateReportStatus,
    addInterventionNote,
    assignReport,
    schoolConfig,
  } = useTugon();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');

  // Active report in detail drawer
  const [selectedReportId, setSelectedReportId] = useState<string | null>(() => {
    return reports.length > 0 ? reports[0].id : null;
  });

  // New intervention note input state
  const [newNoteText, setNewNoteText] = useState('');
  const [newActionType, setNewActionType] = useState<
    'assessment' | 'counseling' | 'parent_conference' | 'peer_mediation' | 'referral' | 'safety_plan' | 'resolution'
  >('assessment');

  // Assignee state
  const [assigneeName, setAssigneeName] = useState(schoolConfig.guidanceCounselor);
  const [assigneeRole, setAssigneeRole] = useState('Guidance Counselor');

  const selectedReport = reports.find((r) => r.id === selectedReportId) || null;

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'all' || r.urgency === selectedUrgency;

    return matchesSearch && matchesStatus && matchesCategory && matchesUrgency;
  });

  // Strict Role Access Gate: Students and unauthenticated visitors cannot access confidential records
  if (userRole === 'STUDENT') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4 ring-8 ring-amber-500/10">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            Confidential Case Management (CPC Only)
          </h2>
          <p className="text-xs font-semibold text-blue-600 dark:text-teal-400 uppercase tracking-widest mt-1">
            TUGON: RESPOND &bull; Authorized Child Protection Committee Dashboard
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            In compliance with the <strong>Data Privacy Act of 2012 (RA 10173)</strong> and the <strong>DepEd Child Protection Policy (DO 40, s. 2012)</strong>, incident reports, investigation notes, and student disclosures are restricted strictly to authorized CPC members and the Guidance Office.
          </p>

          <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-teal-400" />
              <span>CPC Member or Administrator Sign In</span>
            </div>
            <p className="text-[11px]">
              If you are a designated CPC officer, guidance counselor, or school head, please authenticate with your registered email and access code:
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with CPC Access Code</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport || !newNoteText.trim()) return;

    const authorName = authSession.user?.name || schoolConfig.guidanceCounselor;

    addInterventionNote(selectedReport.id, {
      author: authorName,
      authorRole: userRole,
      actionType: newActionType,
      note: newNoteText.trim(),
    });

    setNewNoteText('');
  };

  const handleAssign = () => {
    if (!selectedReport) return;
    assignReport(selectedReport.id, assigneeName, assigneeRole);
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30">New Report</span>;
      case 'under_assessment':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">Under Assessment</span>;
      case 'referred':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">Referred</span>;
      case 'for_followup':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">For Follow-up</span>;
      case 'resolved':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">Resolved</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600">Closed</span>;
    }
  };

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'urgent':
        return <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-800">URGENT</span>;
      case 'high':
        return <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">HIGH</span>;
      case 'medium':
        return <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-300 dark:border-blue-800">MEDIUM</span>;
      case 'low':
        return <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">LOW</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Role Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider border border-blue-300 dark:border-blue-500/30">
              CPC CASE MANAGEMENT WORKSPACE
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Child Protection Committee (DO 40, s. 2012)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
            Grievance Intake & Case Triage Desk
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Active Officer: <strong className="text-slate-900 dark:text-white">{authSession.user?.name}</strong> &bull; {schoolConfig.schoolName}
          </p>
        </div>

        {/* System Safeguard Notice */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 max-w-md shadow-sm">
          <strong className="text-teal-600 dark:text-teal-400 block font-semibold mb-0.5">Procedural Safeguard:</strong>
          This system aids authorized personnel in documentation and restorative referrals. It does not automatically determine guilt or substitute for formal due process.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ref #, location, or keyword..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses ({reports.length})</option>
            <option value="new">New ({reports.filter((r) => r.status === 'new').length})</option>
            <option value="under_assessment">Under Assessment ({reports.filter((r) => r.status === 'under_assessment').length})</option>
            <option value="referred">Referred ({reports.filter((r) => r.status === 'referred').length})</option>
            <option value="for_followup">For Follow-up ({reports.filter((r) => r.status === 'for_followup').length})</option>
            <option value="resolved">Resolved ({reports.filter((r) => r.status === 'resolved').length})</option>
            <option value="closed">Closed ({reports.filter((r) => r.status === 'closed').length})</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Incident Categories</option>
            <option value="bullying">Bullying</option>
            <option value="cyberbullying">Cyberbullying</option>
            <option value="physical_violence">Physical Violence</option>
            <option value="verbal_harassment">Verbal Harassment</option>
            <option value="school_safety">School Safety Concerns</option>
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Urgency Levels</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Main 2-Column Split View: List on left, Selected Report details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Report List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing <strong>{filteredReports.length}</strong> reports
            </span>
            <span className="text-[11px] text-blue-600 dark:text-teal-400">Click to inspect case</span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredReports.map((report) => {
              const isSelected = selectedReportId === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-slate-800/90 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                      : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-teal-400">
                      {report.referenceNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {getUrgencyBadge(report.urgency)}
                      {getStatusBadge(report.status)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed mb-2.5">
                    {report.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80 gap-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{report.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="capitalize text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {report.category.replace('_', ' ')}
                      </span>
                      <span>{report.createdAt.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredReports.length === 0 && (
              <div className="p-8 text-center bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 text-xs shadow-sm">
                No reports found matching your active filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Case Workspace (7 cols) */}
        <div className="lg:col-span-7">
          {selectedReport ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-base font-black text-blue-600 dark:text-teal-400">
                      {selectedReport.referenceNumber}
                    </span>
                    {getStatusBadge(selectedReport.status)}
                    {getUrgencyBadge(selectedReport.urgency)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Logged: {selectedReport.createdAt} &bull; Updated: {selectedReport.updatedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                    title="Print Case Summary"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Print Case</span>
                  </button>
                </div>
              </div>

              {/* Status Transition Control Buttons */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Workflow Status Progression:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    ['new', 'under_assessment', 'referred', 'for_followup', 'resolved', 'closed'] as ReportStatus[]
                  ).map((st) => {
                    const isCurrent = selectedReport.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => updateReportStatus(selectedReport.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/40'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Incident Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">Category & Nature:</span>
                  <span className="text-slate-900 dark:text-white font-bold capitalize">
                    {selectedReport.category.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">Reported Location:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedReport.location}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">Incident Date & Time:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {selectedReport.incidentDate} at {selectedReport.incidentTime}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">Reporter Identity:</span>
                  {selectedReport.isAnonymous ? (
                    <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Anonymous Submission
                    </span>
                  ) : (
                    <span className="text-slate-900 dark:text-white font-bold">
                      {selectedReport.reporterName} ({selectedReport.reporterContact || 'Contact on file'}) &bull; {selectedReport.reporterGradeSection || 'Student'}
                    </span>
                  )}
                </div>
              </div>

              {/* Full Narrative */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Reported Narrative & Description
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedReport.description}
                </div>
              </div>

              {/* Persons Involved & Witnesses */}
              {(selectedReport.personsInvolved || selectedReport.witnesses) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {selectedReport.personsInvolved && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">Persons Involved:</span>
                      <span className="text-slate-700 dark:text-slate-200">{selectedReport.personsInvolved}</span>
                    </div>
                  )}
                  {selectedReport.witnesses && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">Witnesses / Observers:</span>
                      <span className="text-slate-700 dark:text-slate-200">{selectedReport.witnesses}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Supporting Evidence Attachments */}
              {selectedReport.evidenceFiles && selectedReport.evidenceFiles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Supporting Evidence Attachments ({selectedReport.evidenceFiles.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.evidenceFiles.map((f, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-blue-700 dark:text-teal-300 flex items-center gap-1.5"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Referral & Assignment Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Assigned Case Officer & Referral
                  </h4>
                  {selectedReport.assignedTo && (
                    <span className="text-xs text-blue-600 dark:text-teal-300 font-semibold">
                      Current: {selectedReport.assignedTo} ({selectedReport.assignedRole})
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={assigneeName}
                    onChange={(e) => {
                      setAssigneeName(e.target.value);
                      if (e.target.value.includes('Alonzo')) setAssigneeRole('Guidance Counselor');
                      else if (e.target.value.includes('Santos')) setAssigneeRole('CPC Chairperson');
                      else if (e.target.value.includes('Bautista')) setAssigneeRole('Prefect of Discipline');
                      else setAssigneeRole('Assigned Personnel');
                    }}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={schoolConfig.guidanceCounselor}>
                      {schoolConfig.guidanceCounselor} (Guidance)
                    </option>
                    <option value={schoolConfig.cpcChairperson}>
                      {schoolConfig.cpcChairperson} (CPC Chair)
                    </option>
                    <option value={schoolConfig.prefectOfDiscipline}>
                      {schoolConfig.prefectOfDiscipline} (Discipline)
                    </option>
                    <option value="Class Adviser / Grade Level Coordinator">
                      Class Adviser / Grade Level Coordinator
                    </option>
                    <option value="External Child Protection Specialist / LGU SWDO">
                      External Child Protection Specialist / LGU SWDO
                    </option>
                  </select>

                  <button
                    onClick={handleAssign}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Assign Case
                  </button>
                </div>
              </div>

              {/* Chronological Intervention Notes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Case Intervention Log & Follow-up Actions ({selectedReport.interventionNotes.length})
                </h4>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {selectedReport.interventionNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {note.author} ({note.authorRole.toUpperCase()})
                        </span>
                        <span>{note.timestamp}</span>
                      </div>
                      <div className="text-[10px] inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-semibold uppercase">
                        {note.actionType.replace('_', ' ')}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1">{note.note}</p>
                    </div>
                  ))}

                  {selectedReport.interventionNotes.length === 0 && (
                    <div className="p-4 text-center rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                      No intervention notes recorded yet. Add an intake observation or counseling record below.
                    </div>
                  )}
                </div>

                {/* New Intervention Note Input Form */}
                <form onSubmit={handleAddNote} className="pt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={newActionType}
                      onChange={(e) => setNewActionType(e.target.value as any)}
                      className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="assessment">Assessment & Triage</option>
                      <option value="counseling">Guidance Counseling Session</option>
                      <option value="parent_conference">Parent-Teacher Conference</option>
                      <option value="peer_mediation">Restorative Peer Mediation</option>
                      <option value="referral">Disciplinary / External Referral</option>
                      <option value="safety_plan">Individual Safety Plan</option>
                      <option value="resolution">Case Resolution & Agreement</option>
                    </select>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Log new supportive intervention</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Enter documented intervention action or counseling findings..."
                      className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Record Note
                    </button>
                  </div>
                </form>
              </div>

              {/* Audit Logs Accordion */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <details className="group">
                  <summary className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 cursor-pointer font-semibold hover:text-slate-900 dark:hover:text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>Security Audit Log & Activity Trail ({selectedReport.auditLogs.length})</span>
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-teal-400 group-open:rotate-90 transition-transform">
                      ▸
                    </span>
                  </summary>
                  <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono">
                    {selectedReport.auditLogs.map((log, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>&bull; {log.action} ({log.user})</span>
                        <span className="text-slate-400 dark:text-slate-500">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 dark:text-slate-400 shadow-sm">
              Select a report from the left panel to inspect details and document interventions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
