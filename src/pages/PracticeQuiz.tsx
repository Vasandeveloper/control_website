import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { MathText } from '../components/MathText';
import { DiagramViewer } from '../components/DiagramViewer';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const PracticeQuiz: React.FC = () => {
  const {
    activeQuestions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    bookmarkedIds,
    toggleBookmark,
    quizTitle,
    restartQuiz,
    navigateTo,
    startNewQuiz,
  } = useQuiz();

  // If no active questions loaded, offer quick practice starters
  if (!activeQuestions || activeQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Active Practice Session</h2>
        <p className="text-sm text-slate-400">
          Select an exam topic or choose a practice mode below to start testing your knowledge.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() =>
              startNewQuiz({
                mode: 'practice',
                questionCount: 15,
              })
            }
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            Start Mixed Practice (15 Qs)
          </button>
          <button
            onClick={() =>
              startNewQuiz({
                mode: 'formula',
                category: 'formula-only',
                questionCount: 15,
              })
            }
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold border border-slate-700 transition"
          >
            Formula Recognition Drill
          </button>
          <button
            onClick={() => navigateTo('modules')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            Browse by Module
          </button>
        </div>
      </div>
    );
  }

  const currentQ = activeQuestions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQ.id];
  const hasAnswered = selectedOption !== undefined;
  const isBookmarked = bookmarkedIds.includes(currentQ.id);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'n') {
        nextQuestion();
      } else if (e.key === 'ArrowLeft' || e.key === 'p') {
        previousQuestion();
      } else if (['1', '2', '3', '4'].includes(e.key) && !hasAnswered) {
        selectAnswer(currentQ.id, parseInt(e.key) - 1);
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase()) && !hasAnswered) {
        const mapping: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
        selectAnswer(currentQ.id, mapping[e.key.toLowerCase()]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ.id, hasAnswered, nextQuestion, previousQuestion, selectAnswer]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Bar with Title, Progress, and Bookmark */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
            Q {currentQuestionIndex + 1} of {activeQuestions.length}
          </span>
          <span className="text-sm font-semibold text-slate-200 line-clamp-1">{quizTitle}</span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isBookmarked
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Bookmark question for review"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Save'}</span>
          </button>

          {/* Restart Session */}
          <button
            onClick={restartQuiz}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs transition"
            title="Restart quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-indigo-400">
              Module {currentQ.module} • {currentQ.topic}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{currentQ.subtopic}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
              {currentQ.category.replace('-', ' ')}
            </span>
            <span
              className={`px-2 py-0.5 rounded font-bold ${
                currentQ.difficulty === 'Easy'
                  ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/40'
                  : currentQ.difficulty === 'Medium'
                  ? 'text-amber-400 bg-amber-950/60 border border-amber-800/40'
                  : 'text-rose-400 bg-rose-950/60 border border-rose-800/40'
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-xl font-bold text-white leading-relaxed pt-1">
          <MathText text={currentQ.question} />
        </div>

        {/* Optional Interactive Vector SVG Diagram */}
        {currentQ.diagram && (
          <DiagramViewer
            type={currentQ.diagram}
            caption={`Schematic representation: ${currentQ.topic}`}
          />
        )}

        {/* 4 Answer Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;
            const optionLetter = ['A', 'B', 'C', 'D'][idx];

            let buttonStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850';

            if (hasAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10';
              } else {
                buttonStyle = 'opacity-50 bg-slate-950/40 border-slate-800';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => selectAnswer(currentQ.id, idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition group ${buttonStyle}`}
              >
                {/* Option Letter Indicator */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition ${
                    hasAnswered
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                      : 'bg-slate-800 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white'
                  }`}
                >
                  {optionLetter}
                </div>

                {/* Option Text with KaTeX */}
                <div className="flex-1 text-sm sm:text-base font-medium text-slate-100 pt-0.5">
                  <MathText text={option} />
                </div>

                {/* Status icon if answered */}
                {hasAnswered && (
                  <div className="shrink-0 mt-1">
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback & Comprehensive Explanation Reveal */}
        {hasAnswered && (
          <div className="pt-6 border-t border-slate-800 space-y-4 animate-fade-in">
            {/* Correct/Incorrect Banner */}
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 border ${
                selectedOption === currentQ.correctAnswer
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {selectedOption === currentQ.correctAnswer ? (
                <>
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
                  <div>
                    <span className="font-bold text-sm block text-emerald-200">Correct Answer!</span>
                    <span className="text-xs text-emerald-300/90">
                      Great job identifying the underlying control principle.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 shrink-0 text-rose-400" />
                  <div>
                    <span className="font-bold text-sm block text-rose-200">
                      Incorrect. The correct option is Option {['A', 'B', 'C', 'D'][currentQ.correctAnswer]}.
                    </span>
                    <span className="text-xs text-rose-300/90">
                      This question has been added to your Mistake Bank for review.
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* In-depth Conceptual Explanation */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Comprehensive Explanation:
              </h4>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <MathText text={currentQ.explanation} />
              </div>

              {/* Why Correct is Correct */}
              <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                <strong className="text-emerald-400 block mb-1">Why this option is correct:</strong>
                <MathText text={currentQ.whyCorrect} />
              </div>

              {/* Source traceability */}
              <div className="pt-2 text-slate-500 text-xs flex items-center justify-between">
                <span>Source: <strong className="text-slate-400">{currentQ.sourceRef}</strong></span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-4 flex items-center justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick Palette Jump Indicator */}
          <div className="text-xs text-slate-400 hidden sm:block">
            Use keyboard <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-300">1..4</kbd> to select, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-300">→</kbd> to advance
          </div>

          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === activeQuestions.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Grid Quick Palette */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">Question Navigation Palette</span>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Incorrect
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> Unanswered
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeQuestions.map((q, idx) => {
            const ans = userAnswers[q.id];
            const isCurrent = idx === currentQuestionIndex;
            let dotColor = 'bg-slate-800 text-slate-400 hover:bg-slate-700';

            if (ans !== undefined) {
              dotColor = ans === q.correctAnswer ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
            }

            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center relative ${dotColor} ${
                  isCurrent ? 'ring-2 ring-indigo-400 scale-105' : ''
                }`}
              >
                {idx + 1}
                {bookmarkedIds.includes(q.id) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

