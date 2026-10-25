import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { QUESTION_BANK } from '../data/questionBank';
import { MathText } from '../components/MathText';
import { AlertTriangle, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export const MistakeBank: React.FC = () => {
  const { incorrectQuestionIds, startNewQuiz, navigateTo } = useQuiz();

  const mistakeQuestions = QUESTION_BANK.filter((q) =>
    incorrectQuestionIds.includes(q.id)
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Targeted Error Isolation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mistake Bank ({mistakeQuestions.length})
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Questions answered incorrectly during practice or exams are automatically tracked here. Answering a question correctly removes it from this bank!
          </p>
        </div>

        {mistakeQuestions.length > 0 && (
          <button
            onClick={() =>
              startNewQuiz({
                topic: '__mistakes__',
                mode: 'practice',
                questionCount: mistakeQuestions.length,
              })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition self-start sm:self-auto shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retest All Mistakes ({mistakeQuestions.length} Qs)</span>
          </button>
        )}
      </div>

      {mistakeQuestions.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Mistake Bank is Clean!</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            You currently have zero active mistakes. All attempted questions have been mastered or you haven't taken a quiz yet.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() =>
                startNewQuiz({
                  mode: 'exam',
                  questionCount: 20,
                })
              }
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
            >
              Take a Mock Exam
            </button>
            <button
              onClick={() => navigateTo('modules')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              Browse Modules
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakeQuestions.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-slate-900 border border-rose-900/40 space-y-4 hover:border-rose-700/60 transition shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">
                    {q.id}
                  </span>
                  <span className="font-semibold text-slate-300">
                    Module {q.module} • {q.topic}
                  </span>
                  <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {q.category}
                  </span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    q.difficulty === 'Easy'
                      ? 'text-emerald-400 bg-emerald-950/60'
                      : q.difficulty === 'Medium'
                      ? 'text-amber-400 bg-amber-950/60'
                      : 'text-rose-400 bg-rose-950/60'
                  }`}
                >
                  {q.difficulty}
                </span>
              </div>

              <div className="text-sm sm:text-base font-bold text-white">
                <MathText text={q.question} />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                      i === q.correctAnswer
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-semibold'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="font-mono font-bold">
                      {['A', 'B', 'C', 'D'][i]}:
                    </span>
                    <div className="truncate">
                      <MathText text={opt} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Explanation Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Concept Recall:
                </span>
                <MathText text={q.whyCorrect} />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80">
                <span>Source: {q.sourceRef}</span>
                <button
                  onClick={() =>
                    startNewQuiz({
                      topic: '__mistakes__',
                      mode: 'practice',
                      questionCount: 1,
                    })
                  }
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                >
                  <span>Retest now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

