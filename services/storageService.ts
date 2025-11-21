import { UserProgress } from '../types';

const STORAGE_KEY = 'monday_masterclass_progress';

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  lastActiveLessonId: null,
};

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  } catch (e) {
    console.error("Failed to load progress", e);
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const markLessonComplete = (lessonId: string, isComplete: boolean): UserProgress => {
  const current = getProgress();
  let newCompleted = [...current.completedLessonIds];

  if (isComplete) {
    if (!newCompleted.includes(lessonId)) {
      newCompleted.push(lessonId);
    }
  } else {
    newCompleted = newCompleted.filter(id => id !== lessonId);
  }

  const newProgress = { ...current, completedLessonIds: newCompleted };
  saveProgress(newProgress);
  return newProgress;
};

export const setLastActiveLesson = (lessonId: string): UserProgress => {
  const current = getProgress();
  const newProgress = { ...current, lastActiveLessonId: lessonId };
  saveProgress(newProgress);
  return newProgress;
};
