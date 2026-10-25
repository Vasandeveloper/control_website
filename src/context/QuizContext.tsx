import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Question, QuizAttemptRecord, UserProgressState } from '../types';
import { QUESTION_BANK } from '../data/questionBank';

interface QuizFilterOptions {
  moduleId?: number;
  topic?: string;
  category?: string;
  difficulty?: string;
  mode: 'practice' | 'exam' | 'formula';
  questionCount?: number;
  timeLimitMinutes?: number;
  shuffleOptions?: boolean;
}

interface QuizContextType {
  // Navigation
  currentPage: string;
  navigateTo: (page: string, params?: { moduleId?: number; topic?: string }) => void;
  selectedModuleId: number | null;
  selectedTopic: string | null;

  // Active Quiz / Exam State
  activeQuestions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, number>;
  flaggedQuestionIds: string[];
  isSubmitted: boolean;
  timeRemaining: number;
  initialTime: number;
  quizMode: 'practice' | 'exam' | 'formula';
  quizTitle: string;
  showImmediateFeedback: boolean;

  // Actions
  startNewQuiz: (options: QuizFilterOptions) => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  toggleFlagQuestion: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitCurrentQuiz: () => void;
  restartQuiz: () => void;

  // Bookmarking & Mistakes
  bookmarkedIds: string[];
  toggleBookmark: (questionId: string) => void;
  incorrectQuestionIds: string[];
  attemptedAnswers: Record<string, { selectedOption: number; isCorrect: boolean; timestamp: number }>;
  
  // History & Metrics
  quizHistory: QuizAttemptRecord[];
  lastCompletedQuiz: QuizAttemptRecord | null;
  resetAllProgress: () => void;
  exportBackupJSON: () => void;
  importBackupJSON: (jsonString: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'control_prep_progress_v2';

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Persistent user progress
  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return {
      attemptedAnswers: {},
      bookmarkedQuestionIds: [],
      incorrectQuestionIds: [],
      quizHistory: [],
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Active Quiz Session State
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [quizMode, setQuizMode] = useState<'practice' | 'exam' | 'formula'>('practice');
  const [quizTitle, setQuizTitle] = useState<string>('Practice Session');
  const [showImmediateFeedback, setShowImmediateFeedback] = useState<boolean>(true);
  const [lastCompletedQuiz, setLastCompletedQuiz] = useState<QuizAttemptRecord | null>(null);

  // Timer countdown for exam mode
  useEffect(() => {
    if (quizMode !== 'exam' || isSubmitted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time expires
          submitCurrentQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizMode, isSubmitted, timeRemaining]);

  const navigateTo = (page: string, params?: { moduleId?: number; topic?: string }) => {
    if (params?.moduleId !== undefined) {
      setSelectedModuleId(params.moduleId);
    }
    if (params?.topic !== undefined) {
      setSelectedTopic(params.topic);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (questionId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      const updated = exists
        ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
        : [...prev.bookmarkedQuestionIds, questionId];
      return { ...prev, bookmarkedQuestionIds: updated };
    });
  };

  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestionIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (isSubmitted && quizMode === 'exam') return;

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    // In practice mode or formula mode, record progress immediately
    const question = QUESTION_BANK.find((q) => q.id === questionId);
    if (question && (quizMode === 'practice' || quizMode === 'formula')) {
      const isCorrect = optionIndex === question.correctAnswer;
      setProgress((prev) => {
        const attempted = {
          ...prev.attemptedAnswers,
          [questionId]: {
            selectedOption: optionIndex,
            isCorrect,
            timestamp: Date.now(),
          },
        };
        let incorrect = prev.incorrectQuestionIds;
        if (!isCorrect && !incorrect.includes(questionId)) {
          incorrect = [...incorrect, questionId];
        } else if (isCorrect && incorrect.includes(questionId)) {
          // Mastered!
          incorrect = incorrect.filter((id) => id !== questionId);
        }
        return {
          ...prev,
          attemptedAnswers: attempted,
          incorrectQuestionIds: incorrect,
        };
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const startNewQuiz = (options: QuizFilterOptions) => {
    let pool = [...QUESTION_BANK];

    // Filter by module
    if (options.moduleId) {
      pool = pool.filter((q) => q.module === options.moduleId);
    }

    // Filter by topic
    if (options.topic) {
      pool = pool.filter((q) => q.topic.toLowerCase().includes(options.topic!.toLowerCase()));
    }

    // Filter by category
    if (options.category) {
      if (options.category === 'formula-only') {
        pool = pool.filter((q) => q.category === 'formula-id' || q.category === 'formula-interpretation');
      } else if (options.category === 'theory-only') {
        pool = pool.filter((q) => q.category === 'theory' || q.category === 'comparison' || q.category === 'assertion-reason');
      } else {
        pool = pool.filter((q) => q.category === options.category);
      }
    }

    // Filter by difficulty
    if (options.difficulty && options.difficulty !== 'All') {
      pool = pool.filter((q) => q.difficulty === options.difficulty);
    }

    // Special modes: mistakes or saved
    if (options.topic === '__mistakes__') {
      pool = QUESTION_BANK.filter((q) => progress.incorrectQuestionIds.includes(q.id));
    } else if (options.topic === '__saved__') {
      pool = QUESTION_BANK.filter((q) => progress.bookmarkedQuestionIds.includes(q.id));
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const targetCount = options.questionCount || (options.mode === 'exam' ? 25 : 15);
    const selected = shuffled.slice(0, Math.min(targetCount, shuffled.length));

    if (selected.length === 0) {
      alert('No questions match the selected criteria.');
      return;
    }

    const calculatedTime = (options.timeLimitMinutes || selected.length * 1.5) * 60;

    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestionIds([]);
    setIsSubmitted(false);
    setTimeRemaining(calculatedTime);
    setInitialTime(calculatedTime);
    setQuizMode(options.mode);
    setShowImmediateFeedback(options.mode !== 'exam');

    let title = 'Practice Quiz';
    if (options.mode === 'exam') {
      title = options.moduleId ? `Module ${options.moduleId} Mock Exam` : 'Full-Length Control Systems Exam';
    } else if (options.mode === 'formula') {
      title = 'Formula Recognition & Selection Drill';
    } else if (options.topic === '__mistakes__') {
      title = 'Mistake Bank Retest';
    } else if (options.topic === '__saved__') {
      title = 'Bookmarked Questions Practice';
    } else if (options.moduleId) {
      title = `Module ${options.moduleId} Practice`;
    }
    setQuizTitle(title);

    navigateTo(options.mode === 'exam' ? 'exam' : 'practice');
  };

  const submitCurrentQuiz = () => {
    setIsSubmitted(true);

    let score = 0;
    const moduleScores: Record<number, { correct: number; total: number }> = {};
    let formulaCorrect = 0;
    let formulaTotal = 0;
    let theoryCorrect = 0;
    let theoryTotal = 0;

    const newAttempted = { ...progress.attemptedAnswers };
    let newIncorrect = [...progress.incorrectQuestionIds];

    activeQuestions.forEach((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) score += 1;

      // Track by module
      if (!moduleScores[q.module]) {
        moduleScores[q.module] = { correct: 0, total: 0 };
      }
      moduleScores[q.module].total += 1;
      if (isCorrect) moduleScores[q.module].correct += 1;

      // Track by category
      const isFormula = q.category === 'formula-id' || q.category === 'formula-interpretation';
      if (isFormula) {
        formulaTotal += 1;
        if (isCorrect) formulaCorrect += 1;
      } else {
        theoryTotal += 1;
        if (isCorrect) theoryCorrect += 1;
      }

      // Update global attempted & incorrect records
      if (selected !== undefined) {
        newAttempted[q.id] = {
          selectedOption: selected,
          isCorrect,
          timestamp: Date.now(),
        };
      }

      if (!isCorrect && !newIncorrect.includes(q.id)) {
        newIncorrect.push(q.id);
      } else if (isCorrect && newIncorrect.includes(q.id)) {
        newIncorrect = newIncorrect.filter((id) => id !== q.id);
      }
    });

    const timeSpent = Math.max(1, initialTime - timeRemaining);
    const percentage = Math.round((score / activeQuestions.length) * 100);

    const record: QuizAttemptRecord = {
      id: `attempt-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      mode: quizMode,
      title: quizTitle,
      totalQuestions: activeQuestions.length,
      score,
      percentage,
      timeSpentSeconds: timeSpent,
      questionIds: activeQuestions.map((q) => q.id),
      userAnswers,
      isCompleted: true,
    };

    setLastCompletedQuiz(record);
    setProgress((prev) => ({
      ...prev,
      attemptedAnswers: newAttempted,
      incorrectQuestionIds: newIncorrect,
      quizHistory: [record, ...prev.quizHistory],
    }));

    navigateTo('results');
  };

  const restartQuiz = () => {
    setUserAnswers({});
    setFlaggedQuestionIds([]);
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeRemaining(initialTime);
    navigateTo(quizMode === 'exam' ? 'exam' : 'practice');
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset all your practice progress, scores, and mistake bank?')) {
      setProgress({
        attemptedAnswers: {},
        bookmarkedQuestionIds: [],
        incorrectQuestionIds: [],
        quizHistory: [],
      });
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportBackupJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `control_prep_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackupJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setProgress(parsed);
        alert('Backup successfully restored!');
        return true;
      }
    } catch (e) {
      alert('Invalid JSON file format.');
    }
    return false;
  };

  const value = useMemo(
    () => ({
      currentPage,
      navigateTo,
      selectedModuleId,
      selectedTopic,
      activeQuestions,
      currentQuestionIndex,
      userAnswers,
      flaggedQuestionIds,
      isSubmitted,
      timeRemaining,
      initialTime,
      quizMode,
      quizTitle,
      showImmediateFeedback,
      startNewQuiz,
      selectAnswer,
      toggleFlagQuestion,
      nextQuestion,
      previousQuestion,
      goToQuestion,
      submitCurrentQuiz,
      restartQuiz,
      bookmarkedIds: progress.bookmarkedQuestionIds,
      toggleBookmark,
      incorrectQuestionIds: progress.incorrectQuestionIds,
      attemptedAnswers: progress.attemptedAnswers,
      quizHistory: progress.quizHistory,
      lastCompletedQuiz,
      resetAllProgress,
      exportBackupJSON,
      importBackupJSON,
      searchQuery,
      setSearchQuery,
      isSearchOpen,
      setIsSearchOpen,
    }),
    [
      currentPage,
      selectedModuleId,
      selectedTopic,
      activeQuestions,
      currentQuestionIndex,
      userAnswers,
      flaggedQuestionIds,
      isSubmitted,
      timeRemaining,
      initialTime,
      quizMode,
      quizTitle,
      showImmediateFeedback,
      progress,
      lastCompletedQuiz,
      searchQuery,
      isSearchOpen,
    ]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

