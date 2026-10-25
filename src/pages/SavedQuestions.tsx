import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { QUESTION_BANK } from '../data/questionBank';
import { MathText } from '../components/MathText';
import { Bookmark, HelpCircle, ArrowRight, Trash2 } from 'lucide-react';

export const SavedQuestions: React.FC = () => {
  const { bookmarkedIds, toggleBookmark, startNewQuiz, navigateTo } = useQuiz();

  const savedList = QUESTION_BANK.filter((q) => bookmarkedIds.includes(q.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4 fill-amber-400" />
            <span>Personal Bookmarks</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Saved Questions ({savedList.length})
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review and practice the questions you've saved for quick revision before exams.
          </p>
        </div>

        {savedList.length > 0 && (
          <button
            onClick={() =>
              startNewQuiz({
                topic: '__saved__',
                mode: 'practice',
                questionCount: savedList.length,
              })
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/20 transition self-start sm:self-auto shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Practice All Saved ({savedList.length} Qs)</span>
          </button>
        )}
      </div>

      {/* List */}
      {savedList.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-3xl bg-slate-900 border border-slate-800 p-8">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Saved Questions Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the bookmark icon on any question during practice or exam review to save it here for future study.
          </p>
          <button
            onClick={() => navigateTo('modules')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            Explore Question Banks
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedList.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                    {q.id}
                  </span>
                  <span className="font-semibold text-slate-300">
                    Module {q.module} • {q.topic}
                  </span>
                  <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {q.category}
                  </span>
                </div>

                <button
                  onClick={() => toggleBookmark(q.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
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

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80">
                <span>Source: {q.sourceRef}</span>
                <button
                  onClick={() =>
                    startNewQuiz({
                      moduleId: q.module,
                      mode: 'practice',
                      questionCount: 5,
                    })
                  }
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Practice this module</span>
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

