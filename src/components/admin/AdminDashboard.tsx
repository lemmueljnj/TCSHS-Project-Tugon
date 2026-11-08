import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Users,
  Building2,
  Bell,
  History,
  Settings,
  PlusCircle,
  Copy,
  Check,
  Trash2,
  Lock,
  Unlock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';
import { AccessCode, SchoolSupportContact, SystemAnnouncement } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    authSession,
    logout,
    accessCodes,
    generateAccessCode,
    updateAccessCodeStatus,
    deleteAccessCode,
    supportContacts,
    addSupportContact,
    deleteSupportContact,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    activityLogs,
    reports,
    schoolConfig,
    setIsConfigModalOpen,
    resetDemoData,
  } = useTugon();

  // Tabs inside Admin Dashboard
  const [activeAdminTab, setActiveAdminTab] = useState<'codes' | 'contacts' | 'announcements' | 'logs'>('codes');

  // New Access Code Form State
  const [newHolderName, setNewHolderName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'CPC' | 'SSLG'>('CPC');
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [generatedSuccessCode, setGeneratedSuccessCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Support Contact Form State
  const [newContactName, setNewContactName] = useState('');
  const [newContactTitle, setNewContactTitle] = useState('');
  const [newContactDept, setNewContactDept] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRoom, setNewContactRoom] = useState('');
  const [newContactIsCPC, setNewContactIsCPC] = useState(true);

  // New Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<'advisory' | 'training' | 'alert'>('advisory');
  const [newAnnBody, setNewAnnBody] = useState('');
  const [newAnnAuthor, setNewAnnAuthor] = useState('Child Protection Committee');

  // Search Filter
  const [codeSearch, setCodeSearch] = useState('');

  // Enforce Admin guard
  if (authSession.role !== 'ADMIN') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Administrator Access Required</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            You do not have permission to view this system administration workspace.
          </p>
        </div>
      </div>
    );
  }

  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolderName.trim() || !newEmail.trim() || !newTitle.trim()) return;

    const code = generateAccessCode({
      holderName: newHolderName,
      registeredEmail: newEmail,
      role: newRole,
      assignedTitle: newTitle,
      notes: newNotes,
    });

    setGeneratedSuccessCode(code);
    setNewHolderName('');
    setNewEmail('');
    setNewTitle('');
    setNewNotes('');

    setTimeout(() => {
      setGeneratedSuccessCode(null);
    }, 8000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactEmail.trim()) return;

    addSupportContact({
      name: newContactName,
      roleTitle: newContactTitle,
      department: newContactDept || 'School Staff',
      email: newContactEmail,
      phone: newContactPhone || '(02) 8641-0987',
      roomLocation: newContactRoom || 'Main Campus',
      isCPC: newContactIsCPC,
    });

    setNewContactName('');
    setNewContactTitle('');
    setNewContactDept('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewContactRoom('');
  };

  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnBody.trim()) return;

    addAnnouncement({
      title: newAnnTitle,
      category: newAnnCategory,
      body: newAnnBody,
      author: newAnnAuthor,
      isPinned: false,
    });

    setNewAnnTitle('');
    setNewAnnBody('');
  };

  const filteredCodes = accessCodes.filter(
    (c) =>
      c.code.toLowerCase().includes(codeSearch.toLowerCase()) ||
      c.registeredEmail.toLowerCase().includes(codeSearch.toLowerCase()) ||
      c.holderName.toLowerCase().includes(codeSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              ADMINISTRATIVE CONTROL CENTER
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Full System Oversight & Security Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
            System Administrator Workspace
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Logged in as <strong className="text-slate-900 dark:text-white">{authSession.user?.name}</strong> ({authSession.user?.email})
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsConfigModalOpen(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Settings className="w-3.5 h-3.5 text-amber-500" />
            <span>School Setup</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-rose-200 dark:border-rose-900"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Admin Quick Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400">Active Access Codes</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {accessCodes.filter((c) => c.status === 'active').length}
          </div>
          <span className="text-[10px] text-teal-600 dark:text-teal-400">CPC & SSLG accounts</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total Grievances Logged</span>
          <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400 mt-0.5">
            {reports.length}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Under Child Protection Committee</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400">Support Personnel Listed</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {supportContacts.length}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Official Campus Directory</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400">Audit Trail Events</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {activityLogs.length}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Security actions tracked</span>
        </div>
      </div>

      {/* Main Admin Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveAdminTab('codes')}
          className={`py-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'codes'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Access Codes & Account Management ({accessCodes.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('contacts')}
          className={`py-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'contacts'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Support Contacts Directory ({supportContacts.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('announcements')}
          className={`py-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'announcements'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Announcements & Advisories ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`py-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'logs'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>System Security Activity Logs</span>
        </button>
      </div>

      {/* TAB 1: ACCESS CODES & AUTHORIZATION */}
      {activeAdminTab === 'codes' && (
        <div className="space-y-6">
          {/* Generation Success Callout */}
          {generatedSuccessCode && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <strong className="block text-xs font-bold">New Access Code Successfully Generated & Registered:</strong>
                  <div className="font-mono text-base font-black text-emerald-800 dark:text-emerald-300 tracking-wider">
                    {generatedSuccessCode}
                  </div>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Securely associate this code with the authorized recipient. It is now active.
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopyCode(generatedSuccessCode)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === generatedSuccessCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === generatedSuccessCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          )}

          {/* Generator Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-bold font-['Space_Grotesk']">
                Issue & Authorize New Access Code
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Only the Administrator can create access codes and authorize new CPC and SSLG accounts. Codes are linked to the user's registered DepEd email.
            </p>

            <form onSubmit={handleGenerateCode} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newHolderName}
                  onChange={(e) => setNewHolderName(e.target.value)}
                  placeholder="e.g. Ms. Liza Dela Cruz, RGC"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="liza.delacruz@deped.gov.ph"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned User Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CPC">CPC — Child Protection Committee (Case Triage)</option>
                  <option value="SSLG">SSLG — Learner Representative (Advocacy Only, No Confidential Case Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official Title / Designation <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Guidance Counselor II"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Optional administrative notes (e.g. Assigned to Grade 8 & 9 intake triage)"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Generate Code</span>
                </button>
              </div>
            </form>
          </div>

          {/* Access Codes Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  Active Access Code Registry ({filteredCodes.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Unique, revocable authorization credentials issued to school personnel
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={codeSearch}
                  onChange={(e) => setCodeSearch(e.target.value)}
                  placeholder="Filter by code, email, or name..."
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 px-3">Access Code</th>
                    <th className="py-2.5 px-3">Registered Holder & Email</th>
                    <th className="py-2.5 px-3">Assigned Role</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Issued Date</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredCodes.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-1.5">
                          <span>{c.code}</span>
                          <button
                            onClick={() => handleCopyCode(c.code)}
                            className="text-slate-400 hover:text-blue-500 cursor-pointer"
                            title="Copy Code"
                          >
                            {copiedCode === c.code ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{c.holderName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.registeredEmail}</div>
                        <div className="text-[10px] text-slate-400 italic">{c.assignedTitle}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.role === 'CPC'
                              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                              : 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {c.role} {c.role === 'SSLG' && '(No Case Access)'}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        {c.status === 'active' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        )}
                        {c.status === 'deactivated' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                            Deactivated
                          </span>
                        )}
                        {c.status === 'revoked' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30">
                            Revoked
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                        {c.issuedDate}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {c.status === 'active' ? (
                            <button
                              onClick={() => updateAccessCodeStatus(c.id, 'deactivated')}
                              className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 text-[10px] font-semibold transition-colors cursor-pointer"
                              title="Deactivate account temporarily"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => updateAccessCodeStatus(c.id, 'active')}
                              className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 text-[10px] font-semibold transition-colors cursor-pointer"
                              title="Reactivate code"
                            >
                              Activate
                            </button>
                          )}

                          {c.status !== 'revoked' && (
                            <button
                              onClick={() => updateAccessCodeStatus(c.id, 'revoked')}
                              className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100 text-[10px] font-semibold transition-colors cursor-pointer"
                              title="Revoke code permanently"
                            >
                              Revoke
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Delete access code record for ${c.holderName}?`)) {
                                deleteAccessCode(c.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUPPORT CONTACTS DIRECTORY MANAGEMENT */}
      {activeAdminTab === 'contacts' && (
        <div className="space-y-6">
          {/* Add Contact Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-bold font-['Space_Grotesk']">
                Add School Support & Child Protection Personnel
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Manage the visible support directory shown to students, parents, and teachers on TUGON: SUPPORT.
            </p>

            <form onSubmit={handleAddContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name & Credentials
                </label>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Ms. Angeline Ramos, RN"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={newContactTitle}
                  onChange={(e) => setNewContactTitle(e.target.value)}
                  placeholder="e.g. School Health Section Nurse"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Office
                </label>
                <input
                  type="text"
                  value={newContactDept}
                  onChange={(e) => setNewContactDept(e.target.value)}
                  placeholder="e.g. Medical and Dental Clinic"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  DepEd Email Address
                </label>
                <input
                  type="email"
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                  placeholder="clinic.ramos@deped.gov.ph"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / Extension
                </label>
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="(02) 8641-0987 loc. 104"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Office Location
                </label>
                <input
                  type="text"
                  value={newContactRoom}
                  onChange={(e) => setNewContactRoom(e.target.value)}
                  placeholder="Clinic Building, Room 1"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={newContactIsCPC}
                    onChange={(e) => setNewContactIsCPC(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Member of School Child Protection Committee (CPC)</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Personnel to Directory</span>
                </button>
              </div>
            </form>
          </div>

          {/* Contacts List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportContacts.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {c.department}
                    </span>
                    {c.isCPC && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                        CPC Member
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{c.roleTitle}</p>

                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>Email: <span className="text-slate-700 dark:text-slate-300">{c.email}</span></div>
                    <div>Phone: <span className="text-slate-700 dark:text-slate-300">{c.phone}</span></div>
                    <div>Room: <span className="text-slate-700 dark:text-slate-300">{c.roomLocation}</span></div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${c.name} from directory?`)) {
                        deleteSupportContact(c.id);
                      }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENTS & ADVISORIES */}
      {activeAdminTab === 'announcements' && (
        <div className="space-y-6">
          {/* Add Announcement */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Bell className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold font-['Space_Grotesk']">
                Publish School Child Protection Advisory
              </h3>
            </div>

            <form onSubmit={handleAddAnnouncementSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Advisory Title
                  </label>
                  <input
                    type="text"
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    placeholder="e.g. Guidance Reminder: Cyber Safety During Exam Week"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newAnnCategory}
                    onChange={(e) => setNewAnnCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="advisory">Policy Advisory</option>
                    <option value="training">Training / Orientation</option>
                    <option value="alert">Safety Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Advisory Body
                </label>
                <textarea
                  rows={3}
                  value={newAnnBody}
                  onChange={(e) => setNewAnnBody(e.target.value)}
                  placeholder="Official notice content for learners, educators, and parents..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Publish Advisory</span>
                </button>
              </div>
            </form>
          </div>

          {/* Announcements List */}
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ann.category === 'alert'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : ann.category === 'training'
                          ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {ann.category}
                    </span>
                    <span className="text-xs text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{ann.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ann.body}</p>
                  <span className="text-[10px] text-slate-400 block pt-1">Published by: {ann.author}</span>
                </div>

                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM ACTIVITY LOGS */}
      {activeAdminTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Immutable System Activity Log Stream
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audit trail of access code issuance, logins, case status changes, and administrator events
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {activityLogs.length} events logged
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700 dark:text-slate-300"
              >
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400">[{log.action}]</span>{' '}
                  <span>{log.details}</span>
                  <span className="text-slate-400 dark:text-slate-500 ml-2">by {log.actor}</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex-shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
