import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CourseData, UserProgress } from '../types';
import { CheckCircle2, Circle, PlayCircle, Lock } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  data: CourseData;
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, progress, isOpen, onClose }) => {
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:h-screen"
      )}
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <span>Monday.Dev</span>
        </Link>
        <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-700">
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {data.modules.map((module, modIndex) => (
          <div key={module.id}>
            <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Module {modIndex + 1}: {module.title}
            </h3>
            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const isCompleted = progress.completedLessonIds.includes(lesson.id);
                const isActive = location.pathname === `/lesson/${lesson.id}`;
                
                return (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${lesson.id}`}
                    onClick={onClose} // Close sidebar on mobile on selection
                    className={clsx(
                      "group flex items-start gap-3 p-2 rounded-lg text-sm transition-colors",
                      isActive 
                        ? "bg-indigo-50 text-indigo-900 font-medium" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                       {isCompleted ? (
                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       ) : isActive ? (
                         <PlayCircle className="w-4 h-4 text-indigo-600" />
                       ) : (
                         <Circle className="w-4 h-4 text-slate-300" />
                       )}
                    </div>
                    <div className="flex-1">
                      <p className="leading-tight">{lesson.title}</p>
                      <span className="text-xs text-slate-400 mt-1 block">{lesson.duration}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Course Progress</p>
          <div className="w-full bg-slate-200 rounded-full h-2">
             <div 
               className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
               style={{ 
                 width: `${(progress.completedLessonIds.length / 
                 data.modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%` 
               }}
             />
          </div>
          <p className="text-xs text-slate-500 mt-2 text-right">
            {progress.completedLessonIds.length} / {data.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Completed
          </p>
        </div>
      </div>
    </aside>
  );
};
