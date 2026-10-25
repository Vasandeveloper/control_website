import React, { useRef } from 'react';
import { useQuiz } from '../context/QuizContext';
import { BookOpen, Sigma, ShieldCheck, Download, Upload, RefreshCw, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, exportBackupJSON, importBackupJSON, resetAllProgress } = useQuiz();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          importBackupJSON(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Course Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>BECE302L Control Systems</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Complete theory-first & formula-focused examination preparation platform. Based on academic lecture curriculum by{' '}
              <strong className="text-slate-300">Dr. Raju Patel</strong>, Associate Professor, SENSE, VIT Chennai.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>89 Verified Conceptual MCQs • 35 Formulas</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Exam Prep</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('modules')}
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Course Syllabus & Modules
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('formula-hub')}
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <Sigma className="w-3.5 h-3.5" /> Formula Hub & Cheat Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('formula-coverage')}
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Formula-to-MCQ Coverage Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('exam')}
                  className="hover:text-indigo-400 transition"
                >
                  Full-Length Examination Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice & Review */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Study Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('mistakes')}
                  className="hover:text-rose-400 transition"
                >
                  Mistake Bank (Targeted Retest)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('saved')}
                  className="hover:text-amber-400 transition"
                >
                  Bookmarked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('analytics')}
                  className="hover:text-cyan-400 transition"
                >
                  Analytics & Weak Area Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('practice')}
                  className="hover:text-indigo-400 transition"
                >
                  Instant Feedback Practice Mode
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Data Management & Backup */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Data & Backup</h4>
            <p className="text-xs text-slate-400 mb-3">
              Progress is stored locally in your browser. Export your quiz records or restore backups anytime.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={exportBackupJSON}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" /> Backup JSON
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Restore
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={resetAllProgress}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 ControlPrep Portal. All formulas and questions strictly aligned with university curriculum.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Client-side KaTeX Rendering</span>
            <span>•</span>
            <span>Cloudflare Pages Deployable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

