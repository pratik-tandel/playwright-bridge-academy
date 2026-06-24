import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUserProgress, IQuizAttempt, ICertificateRecord, IUserPreferences, IExamAttempt } from '../types';
import { DEFAULT_PROGRESS } from '../types';

interface IProgressStore extends IUserProgress {
  completeLesson: (lessonId: string) => void;
  saveQuizAttempt: (attempt: IQuizAttempt) => void;
  completePlayground: (lessonId: string) => void;
  earnCertificate: (cert: ICertificateRecord) => void;
  saveExamAttempt: (attempt: IExamAttempt) => void;
  getBestExamAttempt: (examSetId: string) => IExamAttempt | null;
  updatePreferences: (prefs: Partial<IUserPreferences>) => void;
  resetProgress: () => void;
  getLessonProgress: (lessonId: string) => { completed: boolean; quizScore?: IQuizAttempt };
  getModuleProgress: (lessonIds: string[]) => { completed: number; total: number; percentage: number };
}

export const useProgressStore = create<IProgressStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PROGRESS,

      completeLesson: (lessonId) => {
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
          lastActivity: new Date().toISOString(),
        }));
      },

      saveQuizAttempt: (attempt) => {
        set((state) => ({
          quizScores: { ...state.quizScores, [attempt.lessonId]: attempt },
          lastActivity: new Date().toISOString(),
        }));
      },

      completePlayground: (lessonId) => {
        set((state) => ({
          playgroundCompletions: state.playgroundCompletions.includes(lessonId)
            ? state.playgroundCompletions
            : [...state.playgroundCompletions, lessonId],
        }));
      },

      earnCertificate: (cert) => {
        set((state) => ({
          certificates: { ...state.certificates, [cert.id]: cert },
        }));
      },

      saveExamAttempt: (attempt) => {
        set((state) => ({
          examAttempts: [...state.examAttempts, attempt],
          lastActivity: new Date().toISOString(),
        }));
      },

      getBestExamAttempt: (examSetId) => {
        const { examAttempts } = get();
        const setAttempts = examAttempts.filter((a) => a.examSetId === examSetId);
        if (setAttempts.length === 0) return null;
        return setAttempts.reduce((best, attempt) =>
          attempt.percentage > best.percentage ? attempt : best,
        );
      },

      updatePreferences: (prefs) => {
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        }));
      },

      resetProgress: () => {
        set({ ...DEFAULT_PROGRESS, lastActivity: new Date().toISOString() });
      },

      getLessonProgress: (lessonId) => {
        const state = get();
        return {
          completed: state.completedLessons.includes(lessonId),
          quizScore: state.quizScores[lessonId],
        };
      },

      getModuleProgress: (lessonIds) => {
        const state = get();
        const completed = lessonIds.filter((id) => state.completedLessons.includes(id)).length;
        return {
          completed,
          total: lessonIds.length,
          percentage: lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0,
        };
      },
    }),
    {
      name: 'pba-progress-v1',
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<IUserProgress>),
        examAttempts: (persisted as Partial<IUserProgress>).examAttempts ?? [],
      }),
    },
  ),
);
