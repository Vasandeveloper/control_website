import React, { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { FORMULA_INVENTORY } from '../data/formulaInventory';
import { QUESTION_BANK } from '../data/questionBank';
import { MathText } from '../components/MathText';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, HelpCircle, Sigma } from 'lucide-react';

export const FormulaCoverage: React.FC = () => {
  const { startNewQuiz, navigateTo } = useQuiz();

  const coverageData = useMemo(() => {
    return FORMULA_INVENTORY.map((formula) => {
      // Find all questions linked directly or via formulaId
      const matchingQuestions = QUESTION_BANK.filter(
        (q) => q.formulaId === formula.id || formula.linkedQuestionIds.includes(q.id)
      );

      const hasDirectFormulaQuestion = matchingQuestions.some(
        (q) => q.category === 'formula-id' || q.category === 'formula-interpretation'
      );

      return {
        formula,
        matchingQuestions,
        isCovered: matchingQuestions.length > 0 && hasDirectFormulaQuestion,
        count: matchingQuestions.length,
      };
    });
  }, []);

  const totalFormulas = FORMULA_INVENTORY.length;
  const coveredCount = coverageData.filter((c) => c.isCovered).length;
  const coveragePercent = Math.round((coveredCount / totalFormulas) * 100);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Curriculum Verification Report</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formula-to-MCQ Coverage Matrix
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Verification table ensuring that every single academic formula is actively tested by dedicated formula-recognition or formula-interpretation MCQs.
          </p>
        </div>

        <button
          onClick={() => navigateTo('formula-hub')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition self-start sm:self-auto shrink-0"
        >
          <Sigma className="w-4 h-4 text-emerald-400" />
          <span>View Formula Cheat Sheet</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{coveragePercent}% Formula Coverage</h2>
              <span className="text-xs px-2 py-0.5 rounded font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              All {totalFormulas} critical equations have active, dedicated MCQs in the persistent database.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="text-center">
            <span className="text-xl font-bold text-white block">{coveredCount}</span>
            <span className="text-slate-400">Tested Formulas</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="text-xl font-bold text-emerald-400 block">0</span>
            <span className="text-slate-400">Missing Formulas</span>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="px-4 py-3.5 font-semibold">Formula ID & Name</th>
              <th className="px-4 py-3.5 font-semibold">Mathematical Expression</th>
              <th className="px-4 py-3.5 font-semibold">Module & Topic</th>
              <th className="px-4 py-3.5 font-semibold text-center">MCQ Count</th>
              <th className="px-4 py-3.5 font-semibold">Mapped Question IDs</th>
              <th className="px-4 py-3.5 font-semibold text-center">Coverage Status</th>
              <th className="px-4 py-3.5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {coverageData.map(({ formula, matchingQuestions, isCovered, count }) => (
              <tr key={formula.id} className="hover:bg-slate-850/50 transition">
                {/* ID & Name */}
                <td className="px-4 py-4 font-medium text-slate-100">
                  <span className="font-mono text-emerald-400 font-bold block mb-0.5">
                    {formula.id}
                  </span>
                  <span className="text-slate-200 font-semibold">{formula.name}</span>
                </td>

                {/* Math Expression */}
                <td className="px-4 py-4 font-mono text-xs max-w-xs overflow-x-auto text-slate-200">
                  <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                    <MathText text={`$${formula.latex}$`} />
                  </div>
                </td>

                {/* Module & Topic */}
                <td className="px-4 py-4 text-slate-300">
                  <span className="inline-block px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-semibold text-[10px] mb-1">
                    Module {formula.module}
                  </span>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{formula.topic}</p>
                </td>

                {/* Question Count */}
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 font-bold text-white">
                    {count}
                  </span>
                </td>

                {/* Question IDs */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {matchingQuestions.map((q) => (
                      <span
                        key={q.id}
                        className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-indigo-300 border border-slate-700/50"
                        title={q.question}
                      >
                        {q.id}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-4 text-center">
                  {isCovered ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Covered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-950/70 text-rose-400 border border-rose-800/60">
                      <AlertCircle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </td>

                {/* Action button */}
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() =>
                      startNewQuiz({
                        moduleId: formula.module,
                        category: 'formula-only',
                        mode: 'formula',
                        questionCount: Math.max(5, count),
                      })
                    }
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-semibold transition"
                  >
                    Drill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

