import React from 'react';
import { Link } from 'react-router-dom';
import { CourseData, UserProgress } from '../types';
import { Button } from './ui/Button';
import { PlayCircle, Code2, Layout, Zap, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  data: CourseData;
  progress: UserProgress;
}

export const HomePage: React.FC<HomePageProps> = ({ data, progress }) => {
  const totalLessons = data.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessonIds.length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Determine Start or Continue button
  const actionLink = progress.lastActiveLessonId 
    ? `/lesson/${progress.lastActiveLessonId}`
    : data.modules.length > 0 && data.modules[0].lessons.length > 0 
      ? `/lesson/${data.modules[0].lessons[0].id}`
      : '/';

  const actionText = progress.lastActiveLessonId ? "Continue Learning" : "Start Learning";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          <Star className="w-4 h-4 fill-indigo-700" />
          <span>The Ultimate Monday.com Guide</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
          Master <span className="text-indigo-600">Monday.com</span> Development
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          From basic board structure to advanced API integrations. Build scalable, automated CRM solutions for any business.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to={actionLink}>
            <Button size="lg" className="gap-2 shadow-lg shadow-indigo-200">
              {actionText} <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Card (if started) */}
      {completedCount > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-50 mb-20 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Your Progress</h3>
                    <p className="text-slate-500 text-sm">Keep up the momentum!</p>
                </div>
                <div className="text-2xl font-bold text-indigo-600">{completionPercentage}%</div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {completedCount} Lessons Completed</span>
                <span className="flex items-center gap-1"><Layout className="w-4 h-4 text-slate-400" /> {totalLessons - completedCount} Remaining</span>
            </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-indigo-600">
             <Layout className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">CRM Mastery</h3>
          <p className="text-slate-600">Deep dive into boards, dashboards, and CRM structure specifically for developers.</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-indigo-600">
             <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">GraphQL API</h3>
          <p className="text-slate-600">Learn to fetch, mutate, and manage Monday.com data programmatically with precision.</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-indigo-600">
             <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">App Framework</h3>
          <p className="text-slate-600">Build native apps, custom views, and widgets using the Monday SDK and React.</p>
        </div>
      </div>

      {/* Modules Preview */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Course Curriculum</h2>
        <div className="grid gap-4">
            {data.modules.map((module, i) => (
                <div key={module.id} className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-all hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">Module {i + 1}</span>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{module.title}</h3>
                            <p className="text-slate-600">{module.description}</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <span className="text-sm text-slate-500 font-medium">{module.lessons.length} Lessons</span>
                            {module.lessons.length > 0 && (
                                <Link to={`/lesson/${module.lessons[0].id}`}>
                                    <Button variant="secondary" size="sm" className="gap-2">
                                        View <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};