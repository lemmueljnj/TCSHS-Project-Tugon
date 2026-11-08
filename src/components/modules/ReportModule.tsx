import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Lock,
  EyeOff,
  User,
  Calendar,
  Clock,
  MapPin,
  Upload,
  CheckCircle2,
  Copy,
  Printer,
  Search,
  Sparkles,
  Info,
  HelpCircle,
  X,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTugon } from '../../context/TugonContext';
import { ReportCategory, UrgencyLevel } from '../../types';

export const ReportModule: React.FC = () => {
  const { addReport, schoolConfig, setIsEmergencyModalOpen, setIsTrackModalOpen, setIsQrModalOpen } = useTugon();

  // Form State
  const [category, setCategory] = useState<ReportCategory>('bullying');
  const [urgency, setUrgency] = useState<UrgencyLevel>('medium');
  const [incidentDate, setIncidentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState('12:00');
  const [location, setLocation] = useState('Classroom');
  const [customLocation, setCustomLocation] = useState('');
  const [description, setDescription] = useState('');
  const [personsInvolved, setPersonsInvolved] = useState('');
  const [witnesses, setWitnesses] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Non-anonymous reporter details
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [reporterGradeSection, setReporterGradeSection] = useState('');
  const [reporterRole, setReporterRole] = useState<'victim' | 'bystander' | 'parent_guardian' | 'concerned_peer'>('bystander');

  // Evidence files simulation
  const [evidenceFiles, setEvidenceFiles] = useState<string[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Submission result modal
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const categories: { id: ReportCategory; title: string; desc: string; icon: string }[] = [
    {
      id: 'bullying',
      title: 'Bullying (Face-to-Face)',
      desc: 'Repeated physical or relational actions, intimidating behavior, or deliberate exclusion at school.',
      icon: '🛡️',
    },
    {
      id: 'cyberbullying',
      title: 'Cyberbullying',
      desc: 'Hurtful posts, leaked group chats, unauthorized memes, parody accounts, or social media harassment.',
      icon: '📱',
    },
    {
      id: 'physical_violence',
      title: 'Physical Violence / Altercation',
      desc: 'Hitting, pushing, physical extortion, aggressive threats, or bodily harm on campus.',
      icon: '⚠️',
    },
    {
      id: 'verbal_harassment',
      title: 'Verbal Harassment / Slander',
      desc: 'Persistent name-calling, discriminatory remarks regarding appearance, gender, accent, or family.',
      icon: '🗣️',
    },
    {
      id: 'school_safety',
      title: 'Other School Safety Concerns',
      desc: 'Campus hazards, perimeter gate security issues, loitering outsiders, or environmental risks.',
      icon: '🏫',
    },
  ];

  const commonLocations = [
    'Classroom / Section Room',
    'Hallway / Corridor (Specify floor below)',
    'School Canteen / Cafeteria',
    'Covered Court / Gymnasium',
    'Comfort Rooms / Restrooms',
    'School Gate / Perimeter Boundary',
    'Library / Laboratory',
    'Online / Social Media (Messenger, Discord, TikTok, etc.)',
    'Commute / Street to and from school',
    'Other Location',
  ];

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setEvidenceFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      alert('Please review and check the Data Privacy & Verification consent checkbox to continue.');
      return;
    }

    const finalLocation = location === 'Other Location' ? customLocation : location;

    const ref = addReport({
      category,
      urgency,
      incidentDate,
      incidentTime,
      location: finalLocation || 'School Campus',
      description,
      personsInvolved: personsInvolved.trim() || undefined,
      witnesses: witnesses.trim() || undefined,
      isAnonymous,
      reporterName: !isAnonymous ? reporterName : undefined,
      reporterContact: !isAnonymous ? reporterContact : undefined,
      reporterGradeSection: !isAnonymous ? reporterGradeSection : undefined,
      reporterRole: !isAnonymous ? reporterRole : undefined,
      evidenceFiles: evidenceFiles.length > 0 ? evidenceFiles : undefined,
    });

    setSubmittedRef(ref);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {}
  };

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setDescription('');
    setPersonsInvolved('');
    setWitnesses('');
    setEvidenceFiles([]);
    setSubmittedRef(null);
    setPrivacyConsent(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>TUGON: REPORT &bull; Safe, Unified Digital Grievance Intake</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
          Report a School Safety or Bullying Concern
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
          Every report is taken seriously and reviewed by the Child Protection Committee (CPC) and Guidance Counselor under Republic Act No. 10627 and DepEd Order No. 40, s. 2012.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
          >
            <span>Scan via Mobile QR Poster</span>
          </button>
          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="text-xs text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
          >
            <span>Already have a Reference Code? Track here</span>
          </button>
        </div>
      </div>

      {/* Visible Emergency Notice Bar */}
      <div className="mb-8 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 animate-pulse" />
          <div>
            <strong className="text-rose-950 dark:text-white block font-semibold">Immediate Assistance Notice:</strong>
            If this incident involves acute physical danger, self-harm, medical injury, or an ongoing crisis, please notify the School Clinic, Security Guard, or Guidance Office immediately in person or call <button type="button" onClick={() => setIsEmergencyModalOpen(true)} className="underline text-rose-700 dark:text-amber-300 font-bold">Crisis Hotlines (1553 / 911)</button>. Project Tugon does not replace immediate emergency rescue.
          </div>
        </div>
      </div>

      {/* Main Reporting Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        {/* Section 1: Anonymity Preference */}
        <div>
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3 font-['Space_Grotesk']">
            <span>1. Reporting Identity & Confidentiality</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIsAnonymous(true)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isAnonymous
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30 ring-2 ring-teal-500/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-300">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Submit Anonymously</span>
                </div>
                {isAnonymous && <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your name, email, and phone will NOT be collected. You will receive a unique Reference Number to check status safely.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                !isAnonymous
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Provide Contact Details</span>
                </div>
                {!isAnonymous && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Allows the Guidance Counselor to contact you directly for supportive follow-up. Kept strictly confidential under RA 10173.
              </p>
            </button>
          </div>

          {/* Conditional Reporter Info Fields */}
          {!isAnonymous && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name / Alias <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="e.g. Maria Santos (or prefer alias)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!isAnonymous}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number or DepEd Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reporterContact}
                    onChange={(e) => setReporterContact(e.target.value)}
                    placeholder="0917-xxx-xxxx or email@deped.gov.ph"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!isAnonymous}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Grade & Section (if student)
                  </label>
                  <input
                    type="text"
                    value={reporterGradeSection}
                    onChange={(e) => setReporterGradeSection(e.target.value)}
                    placeholder="e.g. Grade 10 - Rizal"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Role in this Incident
                  </label>
                  <select
                    value={reporterRole}
                    onChange={(e) => setReporterRole(e.target.value as any)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="victim">I am the affected learner (Victim)</option>
                    <option value="bystander">I am a bystander / witness</option>
                    <option value="concerned_peer">I am a concerned friend / classmate</option>
                    <option value="parent_guardian">I am a parent or guardian</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Incident Category */}
        <div>
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-3 font-['Space_Grotesk']">
            <span>2. Select Incident Category</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Choose primary nature of concern</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{cat.icon}</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{cat.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Time & Location */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>3. Incident Time & Location</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>Date of Incident</span>
              </label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Approximate Time</span>
              </label>
              <input
                type="time"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Concern Severity / Urgency</span>
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low &mdash; Minor peer tension / First occurrence</option>
                <option value="medium">Medium &mdash; Repeated taunting / Distress</option>
                <option value="high">High &mdash; Aggressive threats / Fear of school</option>
                <option value="urgent">Urgent &mdash; Physical safety hazard / Severe distress</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-500" />
              <span>Location of Incident</span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {commonLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {location === 'Other Location' && (
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Specify location details (e.g., Near pedestrian bridge, Science lab 2)"
                className="w-full mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>
        </div>

        {/* Section 4: Narrative Description */}
        <div>
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-2 font-['Space_Grotesk']">
            <span>4. Incident Description</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Please describe clearly</span>
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what occurred. Helpful prompts: What was said or done? How did it start? Has this happened before? What emotional or physical impact did it cause?"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            required
          />
        </div>

        {/* Section 5: Persons Involved and Witnesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Persons Involved (if known or appropriate)
            </label>
            <input
              type="text"
              value={personsInvolved}
              onChange={(e) => setPersonsInvolved(e.target.value)}
              placeholder="e.g. Grade 9 students, or nickname/section if known"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Witnesses or Other Observers (optional)
            </label>
            <input
              type="text"
              value={witnesses}
              onChange={(e) => setWitnesses(e.target.value)}
              placeholder="e.g. Classmates present, teacher-on-duty, canteen staff"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Section 6: Evidence Attachment Simulator */}
        <div>
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-2 font-['Space_Grotesk']">
            <span>5. Supporting Evidence (Optional)</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Screenshots, photos, or message exports</span>
          </label>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-dashed border-slate-300 dark:border-slate-700 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Click to attach screenshots, photos, or document logs
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Supported: PNG, JPG, PDF (Max 10MB per file). Strictly no sensitive or inappropriate imagery.
            </p>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.txt"
              onChange={handleSimulatedFileUpload}
              className="mt-3 text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-200 dark:file:bg-slate-800 file:text-blue-700 dark:file:text-teal-300 hover:file:bg-slate-300 cursor-pointer"
            />
          </div>

          {evidenceFiles.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {evidenceFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200"
                >
                  <FileCheck className="w-3.5 h-3.5 text-blue-600 dark:text-teal-400" />
                  <span className="truncate max-w-[180px]">{file}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Notice & Non-Punitive Legal Consent */}
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-3">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-semibold">
                Philippine Child Protection & Privacy Framework
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                In compliance with the Data Privacy Act of 2012 (RA 10173) and the Anti-Bullying Act (RA 10627), all information provided will be treated with confidentiality. Anonymous submissions will be investigated factually by authorized school personnel to ensure safety and restorative care. Anonymous reports are never used as automatic grounds for punitive actions without due assessment and verification.
              </p>
            </div>
          </div>

          <label className="flex items-start gap-2.5 pt-2 border-t border-blue-200 dark:border-slate-800/80 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4"
              required
            />
            <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">
              I certify that this report is submitted in good faith to protect school safety and learner well-being, and I understand how it will be processed under DepEd child protection policies.
            </span>
          </label>
        </div>

        {/* Submit Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-teal-400" />
            <span>Encrypted internal school processing</span>
          </div>

          <button
            type="submit"
            disabled={!privacyConsent}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              privacyConsent
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white shadow-blue-500/20'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Submit Report Confidentially</span>
          </button>
        </div>
      </form>

      {/* Submission Confirmation Modal */}
      {submittedRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 dark:text-slate-100 shadow-2xl relative">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                Report Successfully Logged
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                Thank you for speaking up. Your report has been securely registered in the Project Tugon network for review by {schoolConfig.schoolName}'s Child Protection Committee.
              </p>

              {/* Reference Code Box */}
              <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">
                  Your Confidential Reference Code
                </span>
                <div className="font-mono text-2xl font-black text-blue-600 dark:text-teal-400 tracking-wider">
                  {submittedRef}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  Save this code! You can use it anytime to track the progress of your grievance anonymously without needing a username or password.
                </p>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-teal-400" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Reference Code'}</span>
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    setIsTrackModalOpen(true);
                  }}
                  className="w-full sm:flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shadow cursor-pointer"
                >
                  Track This Report Now
                </button>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
