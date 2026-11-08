import React, { useEffect, useState, useRef } from 'react';
import { QrCode, X, Printer, Copy, Check, ShieldCheck, Download, Share2 } from 'lucide-react';
import QRCode from 'qrcode';
import { useTugon } from '../../context/TugonContext';

export const QrPosterModal: React.FC = () => {
  const { isQrModalOpen, setIsQrModalOpen, schoolConfig, setActiveTab } = useTugon();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const reportUrl = `${window.location.origin}/#report`;

  useEffect(() => {
    if (isQrModalOpen) {
      QRCode.toDataURL(reportUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error(err));
    }
  }, [isQrModalOpen, reportUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isQrModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-500/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                School Reporting QR Code & Poster
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Print or share for school corridors, classrooms, guidance bulletins, and ID lanyards
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsQrModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Poster Container */}
        <div className="mt-5 p-6 bg-gradient-to-b from-slate-50 to-white text-slate-900 rounded-2xl border border-slate-300 shadow-inner text-center print:shadow-none print:m-0" ref={posterRef}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-700 tracking-wider uppercase">
                {schoolConfig.schoolName}
              </div>
              <div className="text-[10px] text-slate-500">Child Protection Committee</div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-blue-950 tracking-tight font-['Space_Grotesk'] mt-1">
            PROJECT TUGON
          </h2>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-widest mt-0.5">
            Technology-Enabled Unified Grievance & Observation Network
          </p>

          <div className="my-3 py-1.5 px-3 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
            <p className="text-xs font-medium text-blue-900">
              <em>From Silence to Solutions. Every Concern Heard. Every Learner Protected.</em>
            </p>
          </div>

          {/* QR Code image display */}
          <div className="inline-block p-4 bg-white rounded-2xl shadow-md border-2 border-slate-200 my-2">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Report via Project Tugon QR Code" className="w-52 h-52 mx-auto" />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center bg-slate-100 text-xs text-slate-500">
                Generating QR...
              </div>
            )}
            <p className="text-[11px] font-bold text-slate-700 mt-2">
              Scan with your phone camera to report safely
            </p>
          </div>

          <div className="max-w-md mx-auto text-left bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-950">
              <span>&#10003; 100% Confidential or Anonymous Option</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>&#10003; Directly routed to School Child Protection Committee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>&#10003; Tracks Bullying, Cyberbullying, Harassment, & Safety hazards</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-3">
            In compliance with Republic Act No. 10627 (Anti-Bullying Act) & DepEd Order No. 40, s. 2012
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Reporting Link'}</span>
            </button>
            <button
              onClick={() => {
                setIsQrModalOpen(false);
                setActiveTab('report');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-50 dark:bg-teal-600/20 text-teal-800 dark:text-teal-300 hover:bg-teal-100 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Open Form in Browser</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Poster</span>
          </button>
        </div>
      </div>
    </div>
  );
};
