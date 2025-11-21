import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { COURSE_CONTENT } from './constants';
import { getProgress } from './services/storageService';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { LessonView } from './components/LessonView';
import { AITutor } from './components/AITutor';
import { UserProgress } from './types';
import { Menu } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProgressUpdate = (newProgress: UserProgress) => {
    setProgress(newProgress);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex h-screen bg-white text-slate-900 font-sans overflow-hidden">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar 
          data={COURSE_CONTENT} 
          progress={progress} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white shrink-0">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <span className="font-bold text-indigo-900">Monday.Dev</span>
            </div>
          </header>

          {/* Main Scrollable Content */}
          <main className="flex-1 overflow-y-auto bg-white scroll-smooth">
            <Routes>
              <Route 
                path="/" 
                element={<HomePage data={COURSE_CONTENT} progress={progress} />} 
              />
              <Route 
                path="/lesson/:lessonId" 
                element={
                  <LessonView 
                    data={COURSE_CONTENT} 
                    progress={progress} 
                    onProgressUpdate={handleProgressUpdate} 
                  />
                } 
              />
            </Routes>
          </main>
        </div>

        <AITutor />
      </div>
    </Router>
  );
}