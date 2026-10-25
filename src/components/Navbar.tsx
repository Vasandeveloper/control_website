import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  Compass,
  BookOpen,
  Sigma,
  CheckCircle,
  HelpCircle,
  Clock,
  Bookmark,
  AlertTriangle,
  BarChart3,
  Search,
  Menu,
  X,
  FileCheck2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    bookmarkedIds,
    incorrectQuestionIds,
    setIsSearchOpen,
  } = useQuiz();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'formula-hub', label: 'Formula Hub', icon: Sigma },
    { id: 'formula-coverage', label: 'Formula Coverage', icon: FileCheck2 },
    { id: 'practice', label: 'Practice Mode', icon: HelpCircle },
    { id: 'exam', label: 'Mock Exam', icon: Clock },
    {
      id: 'mistakes',
      label: 'Mistakes',
      icon: AlertTriangle,
      badge: incorrectQuestionIds.length > 0 ? incorrectQuestionIds.length : null,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: Bookmark,
      badge: bookmarkedIds.length > 0 ? bookmarkedIds.length : null,
      badgeColor: 'bg-indigo-500 text-white',
    },
    { id: 'analytics', label: 'My Progress', icon: BarChart3 },
  ];

  const handleNavClick = (pageId: string) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                CS
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-cyan-400 transition">
                ControlPrep
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                BECE302L
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Theory & Formula Exam Prep Portal</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition relative ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    className={`ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${link.badgeColor}`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-sm border border-slate-700/60 hover:border-slate-600 transition"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline text-xs text-slate-400">Search questions & formulas...</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
              Ctrl K
            </kbd>
          </button>

          {/* Quick Mock Exam Trigger */}
          <button
            onClick={() => handleNavClick('exam')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Test Mode</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${link.badgeColor}`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

