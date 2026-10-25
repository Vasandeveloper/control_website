import React, { useMemo, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { COURSE_MODULES } from '../data/courseModules';
import { QUESTION_BANK } from '../data/questionBank';
import { FORMULA_INVENTORY } from '../data/formulaInventory';
import { MathText } from '../components/MathText';
import { DiagramViewer } from '../components/DiagramViewer';
import {
  ArrowLeft,
  BookOpen,
  Sigma,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export const ModuleDetail: React.FC = () => {
  const { selectedModuleId, navigateTo, startNewQuiz, incorrectQuestionIds } = useQuiz();
  const [selectedTab, setSelectedTab] = useState<'topics' | 'formulas' | 'questions'>('topics');

  const moduleId = selectedModuleId || 1;
  const moduleInfo = COURSE_MODULES.find((m) => m.id === moduleId) || COURSE_MODULES[0];

  const questions = useMemo(() => {
    return QUESTION_BANK.filter((q) => q.module === moduleId);
  }, [moduleId]);

  const formulas = useMemo(() => {
    return FORMULA_INVENTORY.filter((f) => f.module === moduleId);
  }, [moduleId]);

  const moduleMistakesCount = useMemo(() => {
    return questions.filter((q) => incorrectQuestionIds.includes(q.id)).length;
  }, [questions, incorrectQuestionIds]);

  const theoryCount = questions.filter(
    (q) => q.category === 'theory' || q.category === 'comparison' || q.category === 'assertion-reason'
  ).length;

  const formulaCount = questions.filter(
    (q) => q.category === 'formula-id' || q.category === 'formula-interpretation'
  ).length;

  const easyCount = questions.filter((q) => q.difficulty === 'Easy').length;
  const medCount = questions.filter((q) => q.difficulty === 'Medium').length;
  const hardCount = questions.filter((q) => q.difficulty === 'Hard').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('modules')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Modules</span>
        </button>
      </div>

      {/* Module Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                Module {moduleInfo.id}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{moduleInfo.code}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {moduleInfo.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {moduleInfo.description}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={() =>
                startNewQuiz({
                  moduleId: moduleInfo.id,
                  mode: 'practice',
                  questionCount: questions.length,
                })
              }
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice All ({questions.length} Qs)</span>
            </button>

            <button
              onClick={() =>
                startNewQuiz({
                  moduleId: moduleInfo.id,
                  category: 'formula-only',
                  mode: 'formula',
                })
              }
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold text-xs border border-slate-700 transition"
            >
              <Sigma className="w-4 h-4" />
              <span>Formula Practice ({formulaCount} Qs)</span>
            </button>

            {moduleMistakesCount > 0 && (
              <button
                onClick={() =>
                  startNewQuiz({
                    moduleId: moduleInfo.id,
                    topic: '__mistakes__',
                    mode: 'practice',
                  })
                }
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-semibold text-xs border border-rose-800/50 transition"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Fix Mistakes ({moduleMistakesCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Stats Row */}
        <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-slate-400 block mb-1">Total Questions</span>
            <span className="text-xl font-bold text-white">{questions.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-slate-400 block mb-1">Formulas Covered</span>
            <span className="text-xl font-bold text-emerald-400">{formulas.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-slate-400 block mb-1">Theory MCQs</span>
            <span className="text-xl font-bold text-blue-400">{theoryCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="text-slate-400 block mb-1">Formula MCQs</span>
            <span className="text-xl font-bold text-purple-400">{formulaCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-400 block mb-1">Difficulty (E/M/H)</span>
            <span className="text-sm font-semibold text-slate-200">
              <span className="text-emerald-400">{easyCount}</span> /{' '}
              <span className="text-amber-400">{medCount}</span> /{' '}
              <span className="text-rose-400">{hardCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setSelectedTab('topics')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            selectedTab === 'topics'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Syllabus Topics ({moduleInfo.topics.length})
        </button>
        <button
          onClick={() => setSelectedTab('formulas')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            selectedTab === 'formulas'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Formulas ({formulas.length})
        </button>
        <button
          onClick={() => setSelectedTab('questions')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            selectedTab === 'questions'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Question List ({questions.length})
        </button>
      </div>

      {/* Tab 1: Topics */}
      {selectedTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleInfo.topics.map((topic, idx) => {
            const topicQuestions = questions.filter((q) =>
              q.topic.toLowerCase().includes(topic.toLowerCase())
            );
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-3 transition shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-indigo-400">
                    Topic {idx + 1}
                  </span>
                  <span className="text-xs text-slate-400">
                    {topicQuestions.length > 0 ? `${topicQuestions.length} Questions` : 'Core Concept'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{topic}</h3>
                <p className="text-xs text-slate-400">
                  Comprehensive conceptual and formula testing derived from course slides.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() =>
                      startNewQuiz({
                        moduleId: moduleInfo.id,
                        topic,
                        mode: 'practice',
                        questionCount: Math.max(5, topicQuestions.length),
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
                  >
                    <span>Practice this topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Formulas */}
      {selectedTab === 'formulas' && (
        <div className="space-y-4">
          {formulas.map((formula) => (
            <div
              key={formula.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                      {formula.id}
                    </span>
                    <span className="text-xs text-slate-400">{formula.subtopic}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{formula.name}</h3>
                </div>

                <button
                  onClick={() =>
                    startNewQuiz({
                      moduleId: moduleInfo.id,
                      category: 'formula-only',
                      mode: 'formula',
                    })
                  }
                  className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-800/50 transition flex items-center gap-1"
                >
                  <Sigma className="w-3.5 h-3.5" />
                  <span>Test this Equation</span>
                </button>
              </div>

              {/* Equation Box with KaTeX */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-center overflow-x-auto">
                <MathText text={`$$${formula.latex}$$`} block />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{formula.description}</p>

              {/* Symbols Table */}
              <div className="text-xs bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Symbol Definitions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formula.symbols.map((sym, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 shrink-0 font-bold">
                        <MathText text={`$${sym.symbol}$`} />:
                      </span>
                      <span className="text-slate-300">{sym.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assumptions & Validity */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500 font-semibold">Conditions:</span>
                {formula.assumptions.map((assump, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/50 text-slate-300 text-[11px]"
                  >
                    {assump}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Questions List preview */}
      {selectedTab === 'questions' && (
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-400">{q.id}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 capitalize">
                    {q.category}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-semibold ${
                      q.difficulty === 'Easy'
                        ? 'text-emerald-400 bg-emerald-950/50'
                        : q.difficulty === 'Medium'
                        ? 'text-amber-400 bg-amber-950/50'
                        : 'text-rose-400 bg-rose-950/50'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <div className="text-slate-200 font-medium text-sm">
                  <MathText text={q.question} />
                </div>
                <div className="text-[11px] text-slate-400">
                  Topic: {q.topic} • Source: {q.sourceRef}
                </div>
              </div>

              <button
                onClick={() =>
                  startNewQuiz({
                    moduleId: moduleInfo.id,
                    mode: 'practice',
                    questionCount: 10,
                  })
                }
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-semibold transition shrink-0"
              >
                Practice
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

