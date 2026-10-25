import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Home } from './pages/Home';
import { ModulesPage } from './pages/ModulesPage';
import { ModuleDetail } from './pages/ModuleDetail';
import { FormulaHub } from './pages/FormulaHub';
import { FormulaCoverage } from './pages/FormulaCoverage';
import { PracticeQuiz } from './pages/PracticeQuiz';
import { ExamSimulator } from './pages/ExamSimulator';
import { ExamResults } from './pages/ExamResults';
import { SavedQuestions } from './pages/SavedQuestions';
import { MistakeBank } from './pages/MistakeBank';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useQuiz();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'modules':
        return <ModulesPage />;
      case 'module-detail':
        return <ModuleDetail />;
      case 'formula-hub':
        return <FormulaHub />;
      case 'formula-coverage':
        return <FormulaCoverage />;
      case 'practice':
        return <PracticeQuiz />;
      case 'exam':
        return <ExamSimulator />;
      case 'results':
        return <ExamResults />;
      case 'saved':
        return <SavedQuestions />;
      case 'mistakes':
        return <MistakeBank />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {renderCurrentPage()}
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
};

export function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

export default App;
