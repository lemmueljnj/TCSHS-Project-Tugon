import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  Play,
  Heart,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTugon } from '../../context/TugonContext';
import { PREVENTION_MODULES } from '../../data/initialData';
import { PreventionModule, QuizQuestion, ScenarioChoice } from '../../types';

export const PreventModule: React.FC = () => {
  const { progress, markModuleCompleted, recordQuizScore, saveCertificateName, schoolConfig } = useTugon();

  const [activeModuleId, setActiveModuleId] = useState<string>(PREVENTION_MODULES[0].id);
  const [selectedScenarioChoice, setSelectedScenarioChoice] = useState<number | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate Modal
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [learnerNameInput, setLearnerNameInput] = useState(progress.certificateName || '');

  const activeModule = PREVENTION_MODULES.find((m) => m.id === activeModuleId) || PREVENTION_MODULES[0];

  const totalModules = PREVENTION_MODULES.length;
  const completedCount = progress.completedModuleIds.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleGradeQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;
    activeModule.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const scorePercentage = Math.round((correct / activeModule.quiz.length) * 100);
    setQuizScore(scorePercentage);
    setQuizSubmitted(true);
    recordQuizScore(activeModule.id, scorePercentage);

    if (scorePercentage >= 70) {
      markModuleCompleted(activeModule.id);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerNameInput.trim()) return;
    saveCertificateName(learnerNameInput.trim());
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch (err) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/10 border border-teal-300 dark:border-teal-500/20 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-3">
          <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>TUGON: PREVENT &bull; Child Protection Awareness & Skills Curriculum</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
          Safe School Learning & Upstander Academy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Empowering every student with actionable knowledge on RA 10627 anti-bullying laws, positive digital citizenship, safe bystander interventions, and restorative peacemaking.
        </p>

        {/* Learner Progress Bar */}
        <div className="mt-6 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 mb-2 font-semibold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Your Curriculum Progress: {completedCount} of {totalModules} Modules Mastered</span>
            </span>
            <span className="text-teal-600 dark:text-teal-400 font-mono font-bold">{progressPercent}%</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-teal-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Complete all modules to earn your personalized Certificate of Safe School Advocacy!
            </span>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>View Champion Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PREVENTION_MODULES.map((mod, index) => {
          const isSelected = activeModuleId === mod.id;
          const isCompleted = progress.completedModuleIds.includes(mod.id);
          const score = progress.quizScores[mod.id];

          return (
            <button
              key={mod.id}
              onClick={() => {
                setActiveModuleId(mod.id);
                setSelectedScenarioChoice(null);
                handleResetQuiz();
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative shadow-sm ${
                isSelected
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-teal-500 ring-2 ring-teal-500/30'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Module 0{index + 1}
                </span>
                {isCompleted ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> Mastered
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {mod.duration.split(' ')[0]}m
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 mb-1 font-['Space_Grotesk']">
                {mod.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{mod.category}</p>

              {score !== undefined && (
                <div className="mt-2 text-[10px] text-teal-700 dark:text-teal-300 font-mono">
                  Best Score: {score}%
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Module Content & Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Educational Reading Content (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
                  {activeModule.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] mt-1">
                  {activeModule.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {activeModule.duration}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-900/30">
              "{activeModule.summary}"
            </p>

            {/* Content Sections */}
            <div className="space-y-6">
              {activeModule.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <span>{sec.heading}</span>
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sec.body.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {sec.tips && sec.tips.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-teal-200 space-y-1">
                      <strong className="text-teal-700 dark:text-teal-400 flex items-center gap-1.5 font-semibold">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Key Safety Takeaways:</span>
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300">
                        {sec.tips.map((tip, tIdx) => (
                          <li key={tIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Scenario Dilemma */}
            {activeModule.scenario && (
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                    Interactive Upstander Dilemma: {activeModule.scenario.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                  <strong>The Situation:</strong> {activeModule.scenario.premise}
                </p>

                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">What would you choose to do?</span>
                  {activeModule.scenario.choices.map((choice, cIdx) => {
                    const isSelected = selectedScenarioChoice === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => setSelectedScenarioChoice(cIdx)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? choice.isUpstander
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                            : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="font-semibold">{choice.text}</div>
                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/60 text-[11px] leading-relaxed">
                            <strong className={choice.isUpstander ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}>
                              {choice.isUpstander ? '✓ Restorative Upstander Outcome: ' : '⚠️ Constructive Feedback: '}
                            </strong>
                            {choice.feedback}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Knowledge Check Quiz (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Knowledge Assessment
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activeModule.quiz.length} Questions
              </span>
            </div>

            <form onSubmit={handleGradeQuiz} className="space-y-6">
              {activeModule.quiz.map((q, qIndex) => {
                const selectedOption = quizAnswers[q.id];
                const isCorrect = selectedOption === q.correctAnswerIndex;

                return (
                  <div key={q.id} className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                      {qIndex + 1}. {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, oIndex) => {
                        const isChosen = selectedOption === oIndex;
                        let optionStyle = 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60';

                        if (quizSubmitted) {
                          if (oIndex === q.correctAnswerIndex) {
                            optionStyle = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
                          }
                        } else if (isChosen) {
                          optionStyle = 'bg-blue-50 dark:bg-blue-600/30 border-blue-500 text-blue-900 dark:text-white font-semibold ring-1 ring-blue-500';
                        }

                        return (
                          <button
                            key={oIndex}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, oIndex)}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${optionStyle}`}
                          >
                            <span className="mr-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                        <strong className="text-teal-700 dark:text-teal-400 block mb-0.5">Explanation:</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quiz Results and Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                {quizSubmitted ? (
                  <div className="space-y-3 text-center">
                    <div
                      className={`p-4 rounded-2xl ${
                        (quizScore ?? 0) >= 70
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 dark:border-emerald-500/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-400 dark:border-amber-500/60 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      <div className="text-2xl font-black font-mono">{quizScore}%</div>
                      <div className="text-xs font-bold mt-1">
                        {(quizScore ?? 0) >= 70
                          ? '🎉 Module Passed! Module Recorded to Your Profile.'
                          : 'Keep trying! Review the concepts and retake.'}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleResetQuiz}
                        className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Quiz</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowCertificateModal(true)}
                        className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Claim Certificate</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={Object.keys(quizAnswers).length < activeModule.quiz.length}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      Object.keys(quizAnswers).length >= activeModule.quiz.length
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Check Answers</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Safe School Champion Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  Safe School Champion Certificate
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Name Input Form */}
            <form onSubmit={handleGenerateCertificate} className="my-4 flex gap-2">
              <input
                type="text"
                value={learnerNameInput}
                onChange={(e) => setLearnerNameInput(e.target.value)}
                placeholder="Enter your full name for certificate (e.g. Maria Clara Santos)"
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Update Name
              </button>
            </form>

            {/* Printable Certificate Frame */}
            <div className="p-8 bg-gradient-to-b from-amber-50/95 via-white to-amber-50/95 text-slate-900 rounded-2xl border-4 border-double border-amber-600/60 shadow-lg text-center relative print:m-0 print:border-none">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    Republic of the Philippines &bull; Department of Education
                  </span>
                  <span className="text-xs font-extrabold text-blue-950">
                    {schoolConfig.schoolName}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center font-bold text-xs ring-4 ring-amber-400/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <span className="text-xs font-bold text-teal-800 tracking-widest uppercase">
                CERTIFICATE OF ACHIEVEMENT
              </span>
              <h2 className="text-2xl font-black text-blue-950 font-['Space_Grotesk'] mt-1">
                SAFE SCHOOL ADVOCATE & CHAMPION
              </h2>

              <p className="text-xs text-slate-600 mt-3">This honor is proudly awarded to:</p>
              <div className="text-xl font-black text-blue-900 border-b-2 border-slate-400 inline-block px-6 py-1 my-2">
                {progress.certificateName || 'Dedicated Learner'}
              </div>

              <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed mt-2">
                For demonstrating commendable dedication to campus safety, anti-bullying awareness under Republic Act No. 10627, active bystander upstander strategies, and positive digital citizenship in Project Tugon.
              </p>

              <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-2 text-xs">
                <div>
                  <div className="font-bold text-slate-800">{schoolConfig.cpcChairperson.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-500">Child Protection Committee Chairperson</div>
                </div>
                <div>
                  <div className="font-bold text-slate-800">{schoolConfig.guidanceCounselor.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-500">Registered Guidance Counselor</div>
                </div>
              </div>

              <div className="mt-3 text-[9px] text-slate-400 font-mono">
                Issued via Project Tugon Unified Platform &bull; Date: {progress.certificateEarnedDate || '2026-11-05'}
              </div>
            </div>

            {/* Certificate Footer Buttons */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Ready to frame, present for homeroom credits, or share with your portfolio
              </span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
