import React, { useEffect, useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { QUESTION_BANK } from '../data/questionBank';
import { MathText } from '../components/MathText';
import { DiagramViewer } from '../components/DiagramViewer';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Filter,
} from 'lucide-react';

export const ExamResults: React.FC = () => {
  const {
    lastCompletedQuiz,
    restartQuiz,
    startNewQuiz,
    navigateTo,
    bookmarkedIds,
    toggleBookmark,
  } = useQuiz();

  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct' | 'bookmarked'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Trigger celebration confetti for high scores!
  useEffect(() => {
    if (lastCompletedQuiz && lastCompletedQuiz.percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [lastCompletedQuiz]);

  if (!lastCompletedQuiz) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Results to Display</h2>
        <p className="text-xs text-slate-400">Complete an exam or practice session to review your score.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Map question objects
  const quizQuestions = useMemo(() => {
    return lastCompletedQuiz.questionIds
      .map((id) => QUESTION_BANK.find((q) => q.id === id))
      .filter((q): q is typeof QUESTION_BANK[0] => q !== undefined);
  }, [lastCompletedQuiz.questionIds]);

  const incorrectList = useMemo(() => {
    return quizQuestions.filter((q) => lastCompletedQuiz.userAnswers[q.id] !== q.correctAnswer);
  }, [quizQuestions, lastCompletedQuiz.userAnswers]);

  // Breakdown metrics
  const moduleBreakdown = useMemo(() => {
    const stats: Record<number, { correct: number; total: number }> = {};
    quizQuestions.forEach((q) => {
      if (!stats[q.module]) stats[q.module] = { correct: 0, total: 0 };
      stats[q.module].total += 1;
      if (lastCompletedQuiz.userAnswers[q.id] === q.correctAnswer) {
        stats[q.module].correct += 1;
      }
    });
    return stats;
  }, [quizQuestions, lastCompletedQuiz.userAnswers]);

  const formulaQuestions = quizQuestions.filter(
    (q) => q.category === 'formula-id' || q.category === 'formula-interpretation'
  );
  const formulaCorrect = formulaQuestions.filter(
    (q) => lastCompletedQuiz.userAnswers[q.id] === q.correctAnswer
  ).length;

  const theoryQuestions = quizQuestions.filter(
    (q) => q.category === 'theory' || q.category === 'comparison' || q.category === 'assertion-reason'
  );
  const theoryCorrect = theoryQuestions.filter(
    (q) => lastCompletedQuiz.userAnswers[q.id] === q.correctAnswer
  ).length;

  const filteredQuestions = useMemo(() => {
    if (filterMode === 'incorrect') {
      return quizQuestions.filter((q) => lastCompletedQuiz.userAnswers[q.id] !== q.correctAnswer);
    }
    if (filterMode === 'correct') {
      return quizQuestions.filter((q) => lastCompletedQuiz.userAnswers[q.id] === q.correctAnswer);
    }
    if (filterMode === 'bookmarked') {
      return quizQuestions.filter((q) => bookmarkedIds.includes(q.id));
    }
    return quizQuestions;
  }, [quizQuestions, filterMode, lastCompletedQuiz.userAnswers, bookmarkedIds]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Score Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 uppercase">
              {lastCompletedQuiz.mode} Completed
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lastCompletedQuiz.title}
            </h1>
            <p className="text-xs text-slate-400">
              Submitted on {lastCompletedQuiz.date} • Time spent: {formatSeconds(lastCompletedQuiz.timeSpentSeconds)}
            </p>
          </div>

          {/* Big Circular/Pill Score Badge */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shrink-0 self-start sm:self-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white">{lastCompletedQuiz.score}</span>
                <span className="text-sm text-slate-400 font-semibold">/ {lastCompletedQuiz.totalQuestions}</span>
              </div>
              <span
                className={`text-xs font-bold ${
                  lastCompletedQuiz.percentage >= 70
                    ? 'text-emerald-400'
                    : lastCompletedQuiz.percentage >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {lastCompletedQuiz.percentage}% Final Grade
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-3">
          {incorrectList.length > 0 && (
            <button
              onClick={() =>
                startNewQuiz({
                  topic: '__mistakes__',
                  mode: 'practice',
                  questionCount: incorrectList.length,
                })
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Retry {incorrectList.length} Mistakes</span>
            </button>
          )}

          <button
            onClick={restartQuiz}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake This Quiz</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition ml-auto"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Performance Breakdown: Theory vs Formula */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Formula Performance:</span>
              <span className="text-emerald-400">
                {formulaCorrect} / {formulaQuestions.length} ({formulaQuestions.length > 0 ? Math.round((formulaCorrect / formulaQuestions.length) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{
                  width: `${formulaQuestions.length > 0 ? (formulaCorrect / formulaQuestions.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Theory & Principles:</span>
              <span className="text-blue-400">
                {theoryCorrect} / {theoryQuestions.length} ({theoryQuestions.length > 0 ? Math.round((theoryCorrect / theoryQuestions.length) * 100) : 0}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${theoryQuestions.length > 0 ? (theoryCorrect / theoryQuestions.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Module-Wise Score Bars */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Module-wise Accuracy:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(moduleBreakdown).map(([modNum, { correct, total }]) => {
              const pct = Math.round((correct / total) * 100);
              return (
                <div key={modNum} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-300">Module {modNum}</span>
                    <span className="font-bold text-slate-200">{correct}/{total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question-by-Question Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Detailed Question Review</span>
            <span className="text-xs text-slate-400">({filteredQuestions.length})</span>
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg transition ${
                filterMode === 'all' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All ({quizQuestions.length})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1 rounded-lg transition ${
                filterMode === 'incorrect' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mistakes ({incorrectList.length})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1 rounded-lg transition ${
                filterMode === 'correct' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Correct ({quizQuestions.length - incorrectList.length})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAns = lastCompletedQuiz.userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isExpanded = expandedId === q.id || filteredQuestions.length <= 5;
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-5 sm:p-6 transition shadow-sm ${
                  isCorrect
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-slate-900 border-rose-900/50'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 text-xs mb-3">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                    <span className="text-slate-400 font-mono font-bold">{q.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">Mod {q.module}: {q.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        isBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                      title="Bookmark question"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-sm sm:text-base font-bold text-white mb-4">
                  <MathText text={q.question} />
                </div>

                {/* Optional Diagram */}
                {q.diagram && (
                  <DiagramViewer type={q.diagram} caption={`Diagram: ${q.topic}`} />
                )}

                {/* Options Review */}
                <div className="space-y-2 mb-4 text-xs sm:text-sm">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswer;
                    const isUserChoice = optIdx === userAns;
                    const letter = ['A', 'B', 'C', 'D'][optIdx];

                    let style = 'bg-slate-950/40 border-slate-800 text-slate-300';
                    if (isOptionCorrect) {
                      style = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold';
                    } else if (isUserChoice && !isOptionCorrect) {
                      style = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-start gap-3 ${style}`}
                      >
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                            isOptionCorrect
                              ? 'bg-emerald-500 text-white'
                              : isUserChoice
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {letter}
                        </span>
                        <div className="flex-1">
                          <MathText text={opt} />
                        </div>
                        {isOptionCorrect && (
                          <span className="text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950">
                            Correct Option
                          </span>
                        )}
                        {isUserChoice && !isOptionCorrect && (
                          <span className="text-[11px] font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950">
                            Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Expanded Detailed Mathematical & Conceptual Explanation */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs animate-fade-in">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                        Detailed Explanation:
                      </span>
                      <div className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                        <MathText text={q.explanation} />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-slate-300">
                      <strong className="text-emerald-400 block mb-1">Why this option is correct:</strong>
                      <MathText text={q.whyCorrect} />
                    </div>

                    <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1">
                      <span>Source: <strong className="text-slate-400">{q.sourceRef}</strong></span>
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

