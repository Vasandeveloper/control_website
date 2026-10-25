import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { QUESTION_BANK } from '../data/questionBank';
import { FORMULA_INVENTORY } from '../data/formulaInventory';
import { COURSE_MODULES } from '../data/courseModules';
import { MathText } from './MathText';
import { Search, X, BookOpen, Sigma, HelpCircle, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, startNewQuiz } = useQuiz();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return { questions: [], formulas: [], modules: [] };

    const matchedQuestions = QUESTION_BANK.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q)) ||
        item.explanation.toLowerCase().includes(q)
    ).slice(0, 8);

    const matchedFormulas = FORMULA_INVENTORY.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.latex.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    ).slice(0, 6);

    const matchedModules = COURSE_MODULES.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.topics.some((t) => t.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q)
    );

    return {
      questions: matchedQuestions,
      formulas: matchedFormulas,
      modules: matchedModules,
    };
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, equations, topics (e.g. Nyquist, Routh, zeta, Bode, Lead)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query.trim() && (
            <div className="py-8 text-center text-slate-400 text-sm">
              <p>Type at least 2 characters to search across 89 questions, 35 formulas, and 6 modules.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Mason formula', 'Peak overshoot', 'Nyquist criterion', 'Lead compensator', 'Routh Hurwitz', 'Damping ratio'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded-full bg-slate-800 hover:bg-slate-700 text-indigo-300 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modules Match */}
          {searchResults.modules.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Modules
              </div>
              <div className="space-y-1.5">
                {searchResults.modules.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      navigateTo('module-detail', { moduleId: m.id });
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 cursor-pointer flex items-center justify-between text-sm group transition"
                  >
                    <div>
                      <span className="font-medium text-slate-200">{m.title}</span>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{m.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas Match */}
          {searchResults.formulas.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sigma className="w-3.5 h-3.5" /> Formulas ({searchResults.formulas.length})
              </div>
              <div className="space-y-2">
                {searchResults.formulas.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      navigateTo('formula-hub');
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 cursor-pointer text-sm group transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-200">{f.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                        Mod {f.module}
                      </span>
                    </div>
                    <div className="my-1.5 text-slate-300 font-mono text-xs overflow-x-auto bg-slate-900/60 p-2 rounded">
                      <MathText text={`$${f.latex}$`} />
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions Match */}
          {searchResults.questions.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Practice Questions ({searchResults.questions.length})
              </div>
              <div className="space-y-2">
                {searchResults.questions.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => {
                      startNewQuiz({
                        moduleId: q.module,
                        mode: 'practice',
                        questionCount: 10,
                      });
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 cursor-pointer text-sm group transition"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-indigo-400">Mod {q.module} • {q.topic}</span>
                      <span className="capitalize px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                        {q.category}
                      </span>
                    </div>
                    <div className="text-slate-200 font-medium line-clamp-2">
                      <MathText text={q.question} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.trim().length >= 2 &&
            searchResults.modules.length === 0 &&
            searchResults.formulas.length === 0 &&
            searchResults.questions.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">
                No matching results found for "{query}". Try checking your spelling or searching for another term.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

