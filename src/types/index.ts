export type QuestionCategory =
  | 'theory'
  | 'formula-id'
  | 'formula-interpretation'
  | 'comparison'
  | 'assertion-reason'
  | 'conceptual-app'
  | 'diagram';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  module: 1 | 2 | 3 | 4 | 5 | 6;
  moduleName: string;
  topic: string;
  subtopic: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  question: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3; // Index 0-3
  explanation: string;
  whyCorrect: string;
  distractorAnalysis?: [string, string, string]; // Breakdown of why the 3 incorrect options are traps
  formulaId?: string;
  sourceRef: string;
  diagram?: string;
  keywords: string[];
  isVerified: boolean;
}

export interface FormulaSymbol {
  symbol: string;
  meaning: string;
}

export interface FormulaRecord {
  id: string;
  name: string;
  latex: string;
  description: string;
  module: 1 | 2 | 3 | 4 | 5 | 6;
  topic: string;
  subtopic: string;
  symbols: FormulaSymbol[];
  assumptions: string[];
  sourceRef: string;
  linkedQuestionIds: string[];
  category: 'transfer-function' | 'reduction' | 'time-spec' | 'stability' | 'frequency' | 'controller-compensator';
}

export interface CourseModule {
  id: 1 | 2 | 3 | 4 | 5 | 6;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  topics: string[];
  icon: string;
  color: string;
}

export interface QuizAttemptRecord {
  id: string;
  date: string;
  mode: 'practice' | 'exam' | 'formula';
  title: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  questionIds: string[];
  userAnswers: Record<string, number>;
  isCompleted: boolean;
}

export interface UserProgressState {
  attemptedAnswers: Record<string, { selectedOption: number; isCorrect: boolean; timestamp: number }>;
  bookmarkedQuestionIds: string[];
  incorrectQuestionIds: string[];
  quizHistory: QuizAttemptRecord[];
  activeExamSession?: {
    quizId: string;
    mode: 'practice' | 'exam' | 'formula';
    title: string;
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: Record<string, number>;
    flaggedQuestionIds: string[];
    timeRemainingSeconds: number;
    initialTimeSeconds: number;
    showImmediateFeedback: boolean;
  };
}

