import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { FORMULA_INVENTORY } from '../data/formulaInventory';
import { COURSE_MODULES } from '../data/courseModules';
import { MathText } from '../components/MathText';
import { Sigma, Filter, Search, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const FormulaHub: React.FC = () => {
  const { startNewQuiz, navigateTo } = useQuiz();
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredFormulas = useMemo(() => {
    return FORMULA_INVENTORY.filter((f) => {
      const matchModule = selectedModule === 'all' || f.module === selectedModule;
      const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
      const matchQuery =
        !filterQuery.trim() ||
        f.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        f.latex.toLowerCase().includes(filterQuery.toLowerCase()) ||
        f.topic.toLowerCase().includes(filterQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(filterQuery.toLowerCase());
      return matchModule && matchCategory && matchQuery;
    });
  }, [selectedModule, selectedCategory, filterQuery]);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'transfer-function', label: 'Transfer Functions' },
    { id: 'reduction', label: 'Block Diagram & SFG' },
    { id: 'time-spec', label: 'Time Domain Specs' },
    { id: 'stability', label: 'Routh & Root Locus' },
    { id: 'frequency', label: 'Frequency Response' },
    { id: 'controller-compensator', label: 'Controllers & Compensators' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sigma className="w-4 h-4" />
            <span>Comprehensive Equation Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formula Hub & Cheat Sheet
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            All 35 standard control systems formulas derived from BECE302L course materials with 100% verified MCQ test coverage.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('formula-coverage')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Coverage Report</span>
          </button>

          <button
            onClick={() =>
              startNewQuiz({
                mode: 'formula',
                category: 'formula-only',
                questionCount: 15,
              })
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Formula Drill</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by formula name, equation, symbol, or topic..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Module Selector */}
          <select
            value={selectedModule}
            onChange={(e) =>
              setSelectedModule(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Modules (1 - 6)</option>
            {COURSE_MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                Module {m.id}: {m.shortTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between shadow-lg space-y-4 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                  {formula.id}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Mod {formula.module} • {formula.topic}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{formula.name}</h3>

              {/* KaTeX Equation Display Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-center overflow-x-auto text-slate-100 shadow-inner">
                <MathText text={`$$${formula.latex}$$`} block />
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {formula.description}
              </p>

              {/* Symbols Table */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 text-xs space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Symbols & Physical Representation:
                </span>
                <div className="space-y-1">
                  {formula.symbols.map((sym, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="font-mono text-emerald-400 font-bold shrink-0">
                        <MathText text={`$${sym.symbol}$`} />:
                      </span>
                      <span className="text-slate-300">{sym.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions & Assumptions */}
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold text-[11px]">Assumptions:</span>
                {formula.assumptions.map((assump, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
                  >
                    {assump}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer: Source & Test Button */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">
                {formula.sourceRef}
              </span>

              <button
                onClick={() =>
                  startNewQuiz({
                    moduleId: formula.module,
                    category: 'formula-only',
                    mode: 'formula',
                    questionCount: Math.max(5, formula.linkedQuestionIds.length),
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white font-semibold transition"
              >
                <span>Practice ({formula.linkedQuestionIds.length} MCQs)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="py-16 text-center text-slate-400 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-base font-semibold">No formulas match your filters.</p>
          <p className="text-xs mt-1">Try clearing the search query or selecting "All Categories".</p>
        </div>
      )}
    </div>
  );
};

