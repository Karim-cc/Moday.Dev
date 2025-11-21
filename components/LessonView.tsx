import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CourseData, UserProgress } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { Button } from './ui/Button';
import { CheckCircle2, ChevronRight, ChevronLeft, FileText, ExternalLink, BookOpen, Layout } from 'lucide-react';
import { markLessonComplete, setLastActiveLesson } from '../services/storageService';

interface LessonViewProps {
  data: CourseData;
  progress: UserProgress;
  onProgressUpdate: (p: UserProgress) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ data, progress, onProgressUpdate }) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  
  // Flatten lessons for easy navigation logic
  const allLessons = data.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })));
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);

  // Determine current, previous, and next lessons
  let currentLesson = null;
  let currentModule = null;
  let nextLesson = null;
  let prevLesson = null;

  if (currentIndex !== -1) {
    currentLesson = allLessons[currentIndex];
    currentModule = data.modules.find(m => m.id === currentLesson!.moduleId);
    if (currentIndex > 0) prevLesson = allLessons[currentIndex - 1];
    if (currentIndex < allLessons.length - 1) nextLesson = allLessons[currentIndex + 1];
  }

  // Side effect: Update last active lesson
  useEffect(() => {
    if (lessonId) {
      const newProgress = setLastActiveLesson(lessonId);
      onProgressUpdate(newProgress);
      window.scrollTo(0, 0);
    }
  }, [lessonId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentLesson) {
    return <div className="p-8 text-center text-slate-500">Lesson not found</div>;
  }

  const isCompleted = progress.completedLessonIds.includes(currentLesson.id);

  const toggleCompletion = () => {
    if (currentLesson) {
        const newProgress = markLessonComplete(currentLesson.id, !isCompleted);
        onProgressUpdate(newProgress);
    }
  };

  const renderContent = () => {
    if (currentLesson?.type === 'video' && currentLesson.videoId) {
      return (
        <VideoPlayer 
          videoId={currentLesson.videoId} 
          provider={currentLesson.provider || 'youtube' as any}
          title={currentLesson.title} 
        />
      );
    }

    // UI for Article or Documentation
    return (
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          {currentLesson?.type === 'documentation' ? (
            <BookOpen className="w-8 h-8 text-indigo-600" />
          ) : (
            <Layout className="w-8 h-8 text-indigo-600" />
          )}
        </div>
        <h2 className="text-xl font-semibold text-indigo-900 mb-2">
          {currentLesson?.type === 'documentation' ? 'Documentation Reference' : 'External Article'}
        </h2>
        <p className="text-slate-600 max-w-md mb-6">
          This lesson involves external reading material. Click the button below to access the resource directly.
        </p>
        {currentLesson?.contentUrl && (
          <a href={currentLesson.contentUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              Open Resource <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
        <span>Course</span>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="font-medium text-slate-800">{currentModule?.title}</span>
        <ChevronRight className="w-4 h-4 mx-1 shrink-0" />
        <span className="truncate">{currentLesson.title}</span>
      </div>

      {/* Main Content Area (Video or Article Card) */}
      <div className="mb-8 shadow-sm rounded-xl overflow-hidden bg-white">
        {renderContent()}
      </div>

      {/* Title and Action */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="uppercase tracking-wider text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {currentLesson.type}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center">
              {currentLesson.duration}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{currentLesson.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{currentLesson.description}</p>
        </div>
        <Button 
          onClick={toggleCompletion}
          variant={isCompleted ? "secondary" : "primary"}
          className={isCompleted ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-transparent shrink-0" : "shrink-0"}
          size="lg"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Completed
            </>
          ) : "Mark as Complete"}
        </Button>
      </div>

      {/* Additional Resources Section */}
      {currentLesson.resources && currentLesson.resources.length > 0 && (
        <div className="mb-12 bg-slate-50 rounded-xl p-6 border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-500" />
            Additional Resources
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {currentLesson.resources.map((res, i) => (
              <a 
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-100 transition-colors">
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-indigo-700 text-sm line-clamp-1">
                  {res.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-100">
        {prevLesson ? (
          <Link to={`/lesson/${prevLesson.id}`} className="w-1/2 pr-2">
            <div className="group flex flex-col items-start p-4 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-200 transition-all">
                <div className="flex items-center text-xs text-slate-500 mb-1 group-hover:text-indigo-600">
                    <ChevronLeft className="w-3 h-3 mr-1" /> Previous Lesson
                </div>
                <div className="font-medium text-slate-800 line-clamp-1">{prevLesson.title}</div>
            </div>
          </Link>
        ) : <div className="w-1/2" />}

        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.id}`} className="w-1/2 pl-2 text-right">
            <div className="group flex flex-col items-end p-4 rounded-lg border border-transparent hover:bg-indigo-50 hover:border-indigo-100 transition-all">
                <div className="flex items-center text-xs text-indigo-500 mb-1 font-semibold">
                    Next Lesson <ChevronRight className="w-3 h-3 ml-1" />
                </div>
                <div className="font-medium text-indigo-900 line-clamp-1">{nextLesson.title}</div>
            </div>
          </Link>
        ) : (
           <div className="w-1/2 text-right p-4 text-slate-400 text-sm font-medium">Course Completed</div>
        )}
      </div>
    </div>
  );
};