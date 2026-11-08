import React from 'react';
import { ShieldCheck, Lock, HeartHandshake, Phone, Mail, MapPin, ExternalLink, School } from 'lucide-react';
import { useTugon } from '../../context/TugonContext';

export const Footer: React.FC = () => {
  const { setActiveTab, schoolConfig, setIsEmergencyModalOpen, setIsQrModalOpen, setIsTrackModalOpen } = useTugon();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & DepEd Mandate */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-600/30 text-blue-600 dark:text-teal-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base font-['Space_Grotesk'] tracking-wide">
                PROJECT TUGON
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              <strong>Technology-Enabled Unified Grievance & Observation Network.</strong>
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] italic">
              "From Silence to Solutions. Every Concern Heard. Every Learner Protected."
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] text-teal-700 dark:text-teal-300 font-medium">
                Philippine Public Secondary Schools Edition
              </span>
            </div>
          </div>

          {/* Column 2: The 5 Modules Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-xs font-['Space_Grotesk']">
              Core Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('report')}
                  className="hover:text-blue-600 dark:hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  &bull; <strong>TUGON: REPORT</strong> &mdash; Confidential Incident Reporting
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('respond')}
                  className="hover:text-blue-600 dark:hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  &bull; <strong>TUGON: RESPOND</strong> &mdash; Authorized Case Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('prevent')}
                  className="hover:text-blue-600 dark:hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  &bull; <strong>TUGON: PREVENT</strong> &mdash; Interactive Anti-Bullying Lessons
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('support')}
                  className="hover:text-blue-600 dark:hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  &bull; <strong>TUGON: SUPPORT</strong> &mdash; Child Protection Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('monitor')}
                  className="hover:text-blue-600 dark:hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  &bull; <strong>TUGON: MONITOR</strong> &mdash; Non-Identifying Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Child Protection Framework */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-xs font-['Space_Grotesk']">
              Child Protection Compliance
            </h4>
            <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-slate-200 block">Republic Act No. 10627</strong>
                Anti-Bullying Act of 2013 mandating policies, safe reporting, and intervention for all basic education schools.
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-slate-200 block">DepEd Order No. 40, s. 2012</strong>
                DepEd Child Protection Policy establishing zero tolerance for abuse, violence, discrimination, and bullying.
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-slate-200 block">Republic Act No. 10173</strong>
                Data Privacy Act of 2012 protecting student privacy, anonymity, and secure handling of sensitive disclosures.
              </div>
            </div>
          </div>

          {/* Column 4: School Contact & Hotline */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-xs font-['Space_Grotesk']">
              School Directory
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <School className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-white block">{schoolConfig.schoolName}</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{schoolConfig.division} &bull; {schoolConfig.region}</span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">{schoolConfig.schoolAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-[11px] text-slate-700 dark:text-slate-200">{schoolConfig.contactNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-[11px] text-slate-700 dark:text-slate-200">{schoolConfig.schoolEmail}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setIsTrackModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 text-teal-700 dark:text-teal-300 text-[11px] border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
              >
                Track Submitted Report
              </button>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 text-blue-700 dark:text-blue-300 text-[11px] border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
              >
                Get School Poster QR
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Non-punitive Disclaimers */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400 space-y-2">
          <p className="bg-white dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 leading-relaxed shadow-sm">
            <strong className="text-amber-600 dark:text-amber-400">Child-Centered & Restorative Notice:</strong> Anonymous and confidential submissions received through Project Tugon are treated as information requiring assessment, factual verification, and restorative intervention by the Child Protection Committee and Guidance Office. They do not constitute automatic grounds for disciplinary action or punishment. The platform assists school personnel in fulfilling positive discipline and restorative child protection duties.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 dark:text-slate-400 pt-2 gap-2 text-[10px]">
            <div>
              &copy; {new Date().getFullYear()} Project Tugon &bull; Technology-Enabled Unified Grievance & Observation Network.
            </div>
            <div className="flex items-center gap-4">
              <span>National High School Child Protection Committee</span>
              <button onClick={() => setIsEmergencyModalOpen(true)} className="text-rose-600 dark:text-rose-400 hover:underline cursor-pointer">
                Emergency Hotlines (1553 / 911)
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
