import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { COURSE_MODULES } from '../data/courseModules';
import { QUESTION_BANK } from '../data/questionBank';
import { FORMULA_INVENTORY } from '../data/formulaInventory';
import { MathText } from '../components/MathText';
import {
  Sparkles,
  Clock,
  Sigma,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Search,
  BookOpen,
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    navigateTo,
    startNewQuiz,
    attemptedAnswers,
    incorrectQuestionIds,
    bookmarkedIds,
    setIsSearchOpen,
  } = useQuiz();

  const totalQuestions = QUESTION_BANK.length;
  const totalFormulas = FORMULA_INVENTORY.length;
  const attemptedCount = Object.keys(attemptedAnswers).length;
  const correctCount = Object.values(attemptedAnswers).filter((a) => a.isCorrect).length;
  const overallAccuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>VIT Chennai • BECE302L Control Systems</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Theory-First & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-400">Formula-Focused</span> Quiz Platform
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Master university examination concepts, equations, and tricky traps. Verified question bank derived directly from academic materials by{' '}
            <strong className="text-slate-100 font-semibold">Dr. Raju Patel</strong> (SENSE, VIT Chennai).
          </p>

          {/* Quick Search Trigger Bar */}
          <div className="pt-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full sm:max-w-md flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 shadow-inner text-sm transition group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
                <span>Search {totalQuestions} questions & {totalFormulas} formulas...</span>
              </div>
              <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() =>
                startNewQuiz({
                  mode: 'exam',
                  questionCount: 25,
                  timeLimitMinutes: 30,
                })
              }
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-indigo-600/30 text-sm transition"
            >
              <Clock className="w-4 h-4" />
              <span>Full-Length Mock Exam (25 Qs)</span>
            </button>

            <button
              onClick={() => navigateTo('formula-hub')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 text-sm transition"
            >
              <Sigma className="w-4 h-4 text-emerald-400" />
              <span>Formula Hub & Cheat Sheet</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Stats Counter */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">{totalQuestions}</span>
            <span className="text-xs text-slate-400">Verified Questions</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-emerald-400">{totalFormulas}</span>
            <span className="text-xs text-slate-400">Formula Inventory (100% covered)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-cyan-400">{attemptedCount}</span>
            <span className="text-xs text-slate-400">Questions Attempted</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-indigo-400">{overallAccuracy}%</span>
            <span className="text-xs text-slate-400">Current Accuracy</span>
          </div>
        </div>
      </section>

      {/* Primary Study Modes Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Specialized Practice Modes</span>
          </h2>
          <span className="text-xs text-slate-400">Choose your study style</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Practice Mode */}
          <div
            onClick={() =>
              startNewQuiz({
                mode: 'practice',
                questionCount: 15,
              })
            }
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 cursor-pointer transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-1">Instant Feedback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn as you go. View correct answers, distractor traps, and in-depth LaTeX mathematical explanations immediately after answering.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition">
              <span>Start Practice (15 Qs)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Formula Recognition & Drill */}
          <div
            onClick={() =>
              startNewQuiz({
                mode: 'formula',
                category: 'formula-only',
                questionCount: 15,
              })
            }
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 cursor-pointer transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition">
                <Sigma className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-1">Formula Drill</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated equation recognition mode. Differentiate correct transfer functions, specifications ($t_r, M_p, \\omega_r, GM, PM$), and assumptions.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition">
              <span>Start Formula Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Full-Length Exam */}
          <div
            onClick={() => navigateTo('exam')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 cursor-pointer transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-1">Mock Exam Simulator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Timed examination condition with question grid navigation, review bookmarks, and zero answer reveals until final submission.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition">
              <span>Configure Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Mistake Bank */}
          <div
            onClick={() => navigateTo('mistakes')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-850 cursor-pointer transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3 group-hover:scale-110 transition">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-100 text-base mb-1">Mistake Bank</h3>
                {incorrectQuestionIds.length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {incorrectQuestionIds.length} to fix
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically isolates questions answered incorrectly across all practice and exam sessions for focused mastery.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition">
              <span>Retest Mistakes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Module Navigation Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Course Modules (BECE302L)</h2>
            <p className="text-xs text-slate-400">Structured according to academic syllabus & lecture slides</p>
          </div>
          <button
            onClick={() => navigateTo('modules')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_MODULES.map((module) => {
            const moduleQuestions = QUESTION_BANK.filter((q) => q.module === module.id);
            const moduleFormulas = FORMULA_INVENTORY.filter((f) => f.module === module.id);
            const theoryCount = moduleQuestions.filter(
              (q) => q.category === 'theory' || q.category === 'comparison' || q.category === 'assertion-reason'
            ).length;
            const formulaCount = moduleQuestions.filter(
              (q) => q.category === 'formula-id' || q.category === 'formula-interpretation'
            ).length;

            return (
              <div
                key={module.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/5 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">
                      Module {module.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {moduleQuestions.length} Questions
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition mb-2">
                    {module.shortTitle}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {module.description}
                  </p>

                  {/* Module Breakdown Tags */}
                  <div className="flex flex-wrap gap-2 text-[11px] mb-5">
                    <span className="px-2 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      <strong className="text-emerald-400">{moduleFormulas.length}</strong> Formulas
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      <strong className="text-blue-400">{theoryCount}</strong> Theory
                    </span>
                    <span className="px-2 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      <strong className="text-purple-400">{formulaCount}</strong> Formula MCQs
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigateTo('module-detail', { moduleId: module.id })}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      startNewQuiz({
                        moduleId: module.id,
                        mode: 'practice',
                        questionCount: 15,
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold border border-indigo-500/30 transition"
                  >
                    <span>Practice Mod {module.id}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rationale Section: Why Theory & Formula first? */}
      <section className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Why a Theory-First & Formula-Focused Platform?</span>
        </h3>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <MathText text="In university control engineering examinations, students routinely lose marks not from arithmetic errors, but from conceptual confusion: confusing $\zeta > 1$ with $\zeta = 1$, using positive feedback formulas for negative feedback systems, misunderstanding the meaning of $M_r$ validity boundaries ($\zeta \le 0.707$), or misplacing lead versus lag compensator poles and zeros." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-indigo-300 mb-1">Equation Recognition</h4>
            <p className="text-xs text-slate-400">
              MCQ options feature full LaTeX mathematical formulas, testing equation memory, signs, subscripts, and variables.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-emerald-300 mb-1">Physical Interpretation</h4>
            <p className="text-xs text-slate-400">
              Questions focus on parameter relationships, validity conditions, and qualitative consequences of changing parameters.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-cyan-300 mb-1">Zero Calculation Fatigue</h4>
            <p className="text-xs text-slate-400">
              No lengthy arithmetic problems. 100% focused on theoretical principles, block diagram reduction, and stability criteria.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
