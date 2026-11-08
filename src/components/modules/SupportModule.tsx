import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  ExternalLink,
  BookOpen,
  FileCheck2,
  Calendar,
  AlertCircle,
  HelpCircle,
  Settings,
  ChevronRight,
  Shield,
  Heart,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { useTugon } from '../../context/TugonContext';

export const SupportModule: React.FC = () => {
  const { schoolConfig, supportContacts, userRole, setIsConfigModalOpen, setIsEmergencyModalOpen, setActiveTab } = useTugon();

  const [guidanceSessionBooked, setGuidanceSessionBooked] = useState(false);
  const [preferredDate, setPreferredDate] = useState('');
  const [contactMethod, setContactMethod] = useState('in_person');
  const [requestNotes, setRequestNotes] = useState('');

  const handleBookGuidance = (e: React.FormEvent) => {
    e.preventDefault();
    setGuidanceSessionBooked(true);
    setTimeout(() => {
      setGuidanceSessionBooked(false);
      setPreferredDate('');
      setRequestNotes('');
    }, 4000);
  };

  const nationalHotlines = [
    {
      name: 'NCMH Mental Health Crisis Helpline',
      agency: 'National Center for Mental Health',
      hotline: 'Dial 1553 (Luzon Toll-Free) / 0917-899-8727',
      desc: '24/7 free, confidential psychological triage and emotional crisis assistance for learners.',
      type: 'Psychosocial',
      color: 'border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300',
    },
    {
      name: 'DepEd Learner TeleSafe Contact Center',
      agency: 'DepEd Learner Rights and Protection Office (LRPO)',
      hotline: '(02) 8632-1372 / 8637-2306 / lrpo@deped.gov.ph',
      desc: 'Official direct escalation hotline of the Department of Education for child protection concerns.',
      type: 'Official DepEd',
      color: 'border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300',
    },
    {
      name: 'PNP Women and Children Protection Center',
      agency: 'Philippine National Police (WCPC)',
      hotline: 'Dial 911 / (02) 8532-6690 / 177',
      desc: 'Immediate protective law enforcement response for cases of severe child abuse or violence.',
      type: 'Law Enforcement',
      color: 'border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300',
    },
    {
      name: 'DSWD Child Protection Crisis Center',
      agency: 'Department of Social Welfare and Development',
      hotline: 'Dial 1373 / (02) 8931-8101',
      desc: 'Comprehensive protective social welfare services, case management, and family support.',
      type: 'Social Welfare',
      color: 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/20 text-blue-800 dark:text-blue-300 text-xs font-semibold mb-2">
            <HeartHandshake className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>TUGON: SUPPORT &bull; Comprehensive School Care & Child Protection Network</span>
          </div>
          <h1 className="text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white tracking-tight">
            School Support Directory & Learner Rights
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            You are not alone. Discover designated school personnel, guidance counseling services, learner rights guarantees, and emergency response partners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {userRole === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('admin')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span>Manage Directory in Admin</span>
            </button>
          )}

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>24/7 Crisis Call</span>
          </button>
        </div>
      </div>

      {/* Section 1: School Child Protection Personnel Directory (Managed by Admin) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-teal-400" />
              <span>School Child Protection Committee & Designated Personnel</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Formally instituted under DepEd Order No. 40, s. 2012 at {schoolConfig.schoolName}
            </p>
          </div>
          <span className="text-[11px] text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 px-3 py-1 rounded-full font-medium">
            Active School Year 2026–2027
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-teal-400">
                    {contact.department}
                  </span>
                  {contact.isCPC && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      CPC Committee
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{contact.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{contact.roleTitle}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>{contact.roomLocation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Guidance Office & Private Appointment Request */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <Heart className="w-5 h-5" />
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
              School Guidance & Counseling Office
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The Guidance Center is a safe, non-judgmental space dedicated to helping learners with academic stress, emotional challenges, relationship conflicts, or grief. Everything discussed is safeguarded with strict professional ethics.
          </p>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block">Office Location:</strong>
                <span>{schoolConfig.guidanceOfficeLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block">Consultation Hours:</strong>
                <span>Monday &ndash; Friday: 7:30 AM &ndash; 4:30 PM (Walk-ins welcomed during recess & dismissal)</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block">Direct Line:</strong>
                <span>{schoolConfig.contactNumber}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs text-blue-900 dark:text-blue-200">
            <strong>Counseling Pledge:</strong> No learner is forced into disciplinary punishment during voluntary counseling sessions. Our focus is personal healing, safety planning, and emotional well-being.
          </div>
        </div>

        {/* Confidential Guidance Check-in Form */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
              Request a Confidential Check-In
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300">
              Private Request
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Would you like to speak privately with Mr. Rafael Alonzo (Guidance Counselor)? Send an appointment request here:
          </p>

          {guidanceSessionBooked ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/50 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Check-in Request Sent</h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-200">
                The Guidance Counselor has received your request and will reach out with care during school hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookGuidance} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Date & Time Window
                </label>
                <input
                  type="text"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="e.g. Tomorrow during morning recess (9:30 AM)"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  How would you prefer to connect?
                </label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="in_person">In-person visit to Guidance Room 204</option>
                  <option value="call">Phone Call to my mobile number</option>
                  <option value="peer_companion">I want a trusted peer/friend to accompany me</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Note / Topic (Optional)
                </label>
                <textarea
                  rows={3}
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="Anything you'd like the counselor to know before your conversation..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Send Confidential Appointment Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Section 3: Legal Rights & DepEd Child Protection Framework */}
      <section className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-teal-400">
            Philippine Statutory Framework
          </span>
          <h2 className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
            Learner Rights & Protections Explained
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Every child in school is protected by comprehensive Philippine laws and Department of Education policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Anti-Bullying Act (RA 10627)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mandates that all elementary and secondary schools adopt anti-bullying policies, educate all learners, provide clear reporting channels, and institute child-centered, restorative rehabilitation for students.
            </p>
            <div className="text-[11px] text-teal-700 dark:text-teal-300 pt-1">
              &#10003; Right to a safe campus free from fear
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>DepEd Order No. 40, s. 2012</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              DepEd's Zero-Tolerance Child Protection Policy protecting learners from bullying, violence, exploitation, and discrimination. Prohibits corporal punishment and emphasizes positive discipline.
            </p>
            <div className="text-[11px] text-teal-700 dark:text-teal-300 pt-1">
              &#10003; Positive discipline & active CPC
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
              <FileCheck2 className="w-4 h-4" />
              <span>Data Privacy Act (RA 10173)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Guarantees the strict confidentiality of student disclosures, anonymous reporting records, and counseling notes. Unlawful publication or public shaming is legally prohibited.
            </p>
            <div className="text-[11px] text-teal-700 dark:text-teal-300 pt-1">
              &#10003; 100% Confidentiality & Data Protection
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: National Assistance Hotlines Directory */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
            National Child Protection & Emergency Partners
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Direct coordination channels with government and non-government child-welfare agencies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nationalHotlines.map((hotline, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${hotline.color} flex flex-col justify-between shadow-sm`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {hotline.type}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{hotline.agency}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{hotline.name}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{hotline.desc}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 font-mono text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                {hotline.hotline}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
