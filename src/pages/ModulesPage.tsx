import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { COURSE_MODULES } from '../data/courseModules';
import { QUESTION_BANK } from '../data/questionBank';
import { FORMULA_INVENTORY } from '../data/formulaInventory';
import { BookOpen, Sigma, HelpCircle, ArrowRight, Layers, CheckCircle } from 'lucide-react';

export const ModulesPage: React.FC = () => {
  const { navigateTo, startNewQuiz } = useQuiz();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>BECE302L Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Course Modules & Question Banks
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse through all 6 university curriculum modules and their examinable subtopics.
          </p>
        </div>

        {/* Global Practice Button */}
        <button
          onClick={() =>
            startNewQuiz({
              mode: 'practice',
              questionCount: 20,
            })
          }
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition self-start sm:self-auto shrink-0"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Practice All Modules (20 Qs)</span>
        </button>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {COURSE_MODULES.map((module) => {
          const questions = QUESTION_BANK.filter((q) => q.module === module.id);
          const formulas = FORMULA_INVENTORY.filter((f) => f.module === module.id);
          const easyCount = questions.filter((q) => q.difficulty === 'Easy').length;
          const medCount = questions.filter((q) => q.difficulty === 'Medium').length;
          const hardCount = questions.filter((q) => q.difficulty === 'Hard').length;
          const formulaMCQs = questions.filter(
            (q) => q.category === 'formula-id' || q.category === 'formula-interpretation'
          ).length;
          const theoryMCQs = questions.filter(
            (q) => q.category === 'theory' || q.category === 'comparison' || q.category === 'assertion-reason'
          ).length;

          return (
            <div
              key={module.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 hover:border-slate-700/80 transition shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                      Module {module.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{module.code}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {module.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Question Counts Badge Grid */}
                <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 text-xs">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 flex items-center justify-between gap-3">
                    <span className="text-slate-400">Total Questions:</span>
                    <span className="font-bold text-white text-sm">{questions.length}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 flex items-center justify-between gap-3">
                    <span className="text-slate-400">Key Formulas:</span>
                    <span className="font-bold text-emerald-400 text-sm">{formulas.length}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 flex items-center justify-between gap-3">
                    <span className="text-slate-400">Formula / Theory:</span>
                    <span className="font-bold text-purple-400 text-xs">{formulaMCQs} F / {theoryMCQs} T</span>
                  </div>
                </div>
              </div>

              {/* Topics Breakdown */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" /> Key Topics & Subtopics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {module.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        startNewQuiz({
                          moduleId: module.id,
                          topic,
                          mode: 'practice',
                          questionCount: 10,
                        })
                      }
                      className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-indigo-500/30 text-xs text-slate-300 hover:text-white flex items-center justify-between cursor-pointer group transition"
                    >
                      <span className="line-clamp-1">{topic}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 shrink-0 ml-1.5 transition" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty & Actions Row */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Difficulty:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    Easy: {easyCount}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                    Med: {medCount}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
                    Hard: {hardCount}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => navigateTo('module-detail', { moduleId: module.id })}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    Module Overview
                  </button>

                  <button
                    onClick={() =>
                      startNewQuiz({
                        moduleId: module.id,
                        mode: 'practice',
                        questionCount: 15,
                      })
                    }
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
                  >
                    <span>Start Practice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

