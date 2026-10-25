import React, { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { QUESTION_BANK } from '../data/questionBank';
import { COURSE_MODULES } from '../data/courseModules';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  Clock,
  History,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const {
    attemptedAnswers,
    incorrectQuestionIds,
    quizHistory,
    startNewQuiz,
    navigateTo,
    resetAllProgress,
  } = useQuiz();

  const totalQuestions = QUESTION_BANK.length;
  const attemptedKeys = Object.keys(attemptedAnswers);
  const attemptedCount = attemptedKeys.length;
  const correctCount = Object.values(attemptedAnswers).filter((a) => a.isCorrect).length;
  const overallAccuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Formula vs Theory stats
  const { formulaCorrect, formulaTotal, theoryCorrect, theoryTotal } = useMemo(() => {
    let fCorr = 0;
    let fTot = 0;
    let tCorr = 0;
    let tTot = 0;

    attemptedKeys.forEach((qid) => {
      const q = QUESTION_BANK.find((item) => item.id === qid);
      if (!q) return;
      const isFormula = q.category === 'formula-id' || q.category === 'formula-interpretation';
      const isCorrect = attemptedAnswers[qid].isCorrect;

      if (isFormula) {
        fTot += 1;
        if (isCorrect) fCorr += 1;
      } else {
        tTot += 1;
        if (isCorrect) tCorr += 1;
      }
    });

    return {
      formulaCorrect: fCorr,
      formulaTotal: fTot,
      theoryCorrect: tCorr,
      theoryTotal: tTot,
    };
  }, [attemptedKeys, attemptedAnswers]);

  const formulaAccuracy = formulaTotal > 0 ? Math.round((formulaCorrect / formulaTotal) * 100) : 0;
  const theoryAccuracy = theoryTotal > 0 ? Math.round((theoryCorrect / theoryTotal) * 100) : 0;

  // Module Mastery Breakdown
  const moduleMastery = useMemo(() => {
    return COURSE_MODULES.map((m) => {
      const moduleQs = QUESTION_BANK.filter((q) => q.module === m.id);
      const attemptedInMod = moduleQs.filter((q) => attemptedAnswers[q.id] !== undefined);
      const correctInMod = attemptedInMod.filter((q) => attemptedAnswers[q.id].isCorrect);
      const accuracy =
        attemptedInMod.length > 0 ? Math.round((correctInMod.length / attemptedInMod.length) * 100) : 0;

      return {
        module: m,
        total: moduleQs.length,
        attempted: attemptedInMod.length,
        correct: correctInMod.length,
        accuracy,
      };
    });
  }, [attemptedAnswers]);

  // Identify weak modules
  const weakModules = useMemo(() => {
    return moduleMastery
      .filter((m) => m.attempted >= 3 && m.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [moduleMastery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Real-time Learning Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Examination Progress
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Performance metrics calculated exclusively from your actual practice and mock test activity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() =>
              startNewQuiz({
                mode: 'exam',
                questionCount: 25,
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition self-start sm:self-auto"
          >
            <Clock className="w-4 h-4" />
            <span>Launch Mock Exam</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Attempted */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Questions Attempted</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{attemptedCount}</span>
            <span className="text-xs text-slate-500">/ {totalQuestions}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${(attemptedCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Overall Accuracy */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Overall Accuracy</span>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-black ${
                overallAccuracy >= 70
                  ? 'text-emerald-400'
                  : overallAccuracy >= 50
                  ? 'text-amber-400'
                  : 'text-slate-200'
              }`}
            >
              {overallAccuracy}%
            </span>
            <span className="text-xs text-slate-500 font-medium">{correctCount} correct</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: `${overallAccuracy}%` }}
            />
          </div>
        </div>

        {/* Formula Accuracy */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Formula Accuracy</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-400">{formulaAccuracy}%</span>
            <span className="text-xs text-slate-500 font-medium">
              {formulaCorrect}/{formulaTotal}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-1.5 rounded-full"
              style={{ width: `${formulaAccuracy}%` }}
            />
          </div>
        </div>

        {/* Active Mistakes */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Mistakes to Fix</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-400">
              {incorrectQuestionIds.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">pending</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, (incorrectQuestionIds.length / (attemptedCount || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Weak Areas Recommendation Alert */}
      {weakModules.length > 0 && (
        <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-200 text-sm">Focus Area Detected</h3>
              <p className="text-xs text-amber-300/80 mt-0.5 leading-relaxed">
                Your performance in <strong className="text-amber-100">{weakModules[0].module.title}</strong> is currently at {weakModules[0].accuracy}%. We recommend targeted practice before taking full exams.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              startNewQuiz({
                moduleId: weakModules[0].module.id,
                mode: 'practice',
                questionCount: 15,
              })
            }
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0 transition"
          >
            Practice Weak Module
          </button>
        </div>
      )}

      {/* Module-Wise Mastery Progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Module Mastery Breakdown</h2>
          <span className="text-xs text-slate-400">Progress by unit</span>
        </div>

        <div className="space-y-4">
          {moduleMastery.map(({ module, total, attempted, correct, accuracy }) => {
            const completionPct = Math.round((attempted / total) * 100);

            return (
              <div
                key={module.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="font-bold text-slate-200">
                      Module {module.id}: {module.shortTitle}
                    </span>
                    <span className="text-slate-500 ml-2">
                      ({attempted} / {total} attempted • {completionPct}% complete)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">
                      Accuracy:{' '}
                      <strong
                        className={
                          accuracy >= 70
                            ? 'text-emerald-400'
                            : accuracy >= 50
                            ? 'text-amber-400'
                            : attempted > 0
                            ? 'text-rose-400'
                            : 'text-slate-400'
                        }
                      >
                        {attempted > 0 ? `${accuracy}%` : 'Not attempted'}
                      </strong>
                    </span>

                    <button
                      onClick={() =>
                        startNewQuiz({
                          moduleId: module.id,
                          mode: 'practice',
                          questionCount: 10,
                        })
                      }
                      className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      Practice
                    </button>
                  </div>
                </div>

                {/* Accuracy progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      accuracy >= 70
                        ? 'bg-emerald-500'
                        : accuracy >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz History Log */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <span>Recent Test History ({quizHistory.length})</span>
          </h2>
          {quizHistory.length > 0 && (
            <button
              onClick={resetAllProgress}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Clear Records
            </button>
          )}
        </div>

        {quizHistory.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No completed quizzes recorded yet. Take your first practice quiz or mock exam to generate performance logs!
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {quizHistory.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{item.title}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                      {item.mode}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{item.date}</span>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="font-bold text-white block">
                      {item.score} / {item.totalQuestions} ({item.percentage}%)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {Math.floor(item.timeSpentSeconds / 60)}m {item.timeSpentSeconds % 60}s
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.percentage >= 70
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                        : item.percentage >= 50
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                        : 'bg-rose-950 text-rose-300 border border-rose-800/50'
                    }`}
                  >
                    {item.percentage >= 70 ? 'PASS' : item.percentage >= 50 ? 'AVERAGE' : 'NEEDS WORK'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

