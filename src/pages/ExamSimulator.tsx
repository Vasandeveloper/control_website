import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { MathText } from '../components/MathText';
import { DiagramViewer } from '../components/DiagramViewer';
import { COURSE_MODULES } from '../data/courseModules';
import {
  Clock,
  Flag,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const ExamSimulator: React.FC = () => {
  const {
    activeQuestions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    flaggedQuestionIds,
    toggleFlagQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitCurrentQuiz,
    timeRemaining,
    initialTime,
    quizMode,
    quizTitle,
    startNewQuiz,
  } = useQuiz();

  // Configuration modal state when exam not active
  const [configCount, setConfigCount] = useState<number>(25);
  const [configTime, setConfigTime] = useState<number>(30);
  const [configModule, setConfigModule] = useState<number | 'all'>('all');
  const [configDifficulty, setConfigDifficulty] = useState<string>('All');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // If no active exam or in practice mode, display configuration starter
  if (!activeQuestions || activeQuestions.length === 0 || quizMode !== 'exam') {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-6">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Control Systems Exam Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Simulate actual university examination conditions for BECE302L. Answers and explanations are strictly hidden until submission.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
            {/* Question Count */}
            <div>
              <label className="font-semibold text-slate-300 block mb-2">Question Count:</label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 25, 40].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => {
                      setConfigCount(cnt);
                      setConfigTime(Math.round(cnt * 1.2));
                    }}
                    className={`py-2 rounded-xl font-bold border transition ${
                      configCount === cnt
                        ? 'bg-cyan-600 border-cyan-500 text-white shadow-md shadow-cyan-600/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label className="font-semibold text-slate-300 block mb-2">Time Limit (Minutes):</label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 30, 45].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setConfigTime(mins)}
                    className={`py-2 rounded-xl font-bold border transition ${
                      configTime === mins
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {mins} Mins
                  </button>
                ))}
              </div>
            </div>

            {/* Module Coverage */}
            <div>
              <label className="font-semibold text-slate-300 block mb-2">Module Coverage:</label>
              <select
                value={configModule}
                onChange={(e) =>
                  setConfigModule(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Modules (Full Comprehensive Syllabus)</option>
                {COURSE_MODULES.map((m) => (
                  <option key={m.id} value={m.id}>
                    Module {m.id}: {m.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="font-semibold text-slate-300 block mb-2">Difficulty Filter:</label>
              <select
                value={configDifficulty}
                onChange={(e) => setConfigDifficulty(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">Balanced Exam (Mixed Easy, Medium, Hard)</option>
                <option value="Easy">Standard Conceptual (Easy)</option>
                <option value="Medium">Intermediate Analysis (Medium)</option>
                <option value="Hard">Tricky & Advanced (Hard)</option>
              </select>
            </div>
          </div>

          <button
            onClick={() =>
              startNewQuiz({
                mode: 'exam',
                moduleId: configModule === 'all' ? undefined : configModule,
                difficulty: configDifficulty,
                questionCount: configCount,
                timeLimitMinutes: configTime,
              })
            }
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/20 transition flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Launch Examination ({configCount} Questions • {configTime} Mins)</span>
          </button>
        </div>
      </div>
    );
  }

  const currentQ = activeQuestions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQ.id];
  const isFlagged = flaggedQuestionIds.includes(currentQ.id);

  // Format time mm:ss
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isTimeCritical = timeRemaining < 300; // less than 5 minutes

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = activeQuestions.length - answeredCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Exam Header: Timer & Status */}
      <div className="sticky top-18 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
            Q {currentQuestionIndex + 1} of {activeQuestions.length}
          </span>
          <span className="text-sm font-bold text-white line-clamp-1">{quizTitle}</span>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition ${
              isTimeCritical
                ? 'bg-rose-950/70 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-cyan-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          {/* Finish Button */}
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400">
              Module {currentQ.module} • {currentQ.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mark for Review Button */}
            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                isFlagged
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400' : ''}`} />
              <span>{isFlagged ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-xl font-bold text-white leading-relaxed pt-1">
          <MathText text={currentQ.question} />
        </div>

        {/* Optional Interactive Diagram */}
        {currentQ.diagram && (
          <DiagramViewer
            type={currentQ.diagram}
            caption={`Diagram corresponding to question`}
          />
        )}

        {/* 4 Answer Options (Hides right answer until exam submission!) */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const optionLetter = ['A', 'B', 'C', 'D'][idx];

            return (
              <button
                key={idx}
                onClick={() => selectAnswer(currentQ.id, idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition group ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-100 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition ${
                    isSelected
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-800 group-hover:bg-cyan-600 text-slate-300 group-hover:text-white'
                  }`}
                >
                  {optionLetter}
                </div>
                <div className="flex-1 text-sm sm:text-base font-medium pt-0.5">
                  <MathText text={option} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-400">
            {answeredCount} of {activeQuestions.length} answered
          </span>

          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === activeQuestions.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 transition"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Navigation Palette */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">Question Palette</span>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> Unanswered
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeQuestions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const flagged = flaggedQuestionIds.includes(q.id);
            const isCurrent = idx === currentQuestionIndex;

            let badgeClass = 'bg-slate-800 text-slate-400 hover:bg-slate-700';
            if (flagged) {
              badgeClass = 'bg-amber-500 text-slate-950 font-black';
            } else if (isAnswered) {
              badgeClass = 'bg-cyan-600 text-white';
            }

            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center relative ${badgeClass} ${
                  isCurrent ? 'ring-2 ring-white scale-105' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal before Submit */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-cyan-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Confirm Final Submission</h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-bold text-white">{activeQuestions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Answered:</span>
                <span className="font-bold text-cyan-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <span className="font-bold text-rose-400">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Marked for Review:</span>
                <span className="font-bold text-amber-400">{flaggedQuestionIds.length}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Once submitted, your examination answers will be finalized and full mathematical explanations will be displayed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Keep Reviewing
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  submitCurrentQuiz();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

