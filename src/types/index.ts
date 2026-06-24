export interface IModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  lessons: ILesson[];
  certificateId?: string;
}

export interface ILesson {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  content: ILessonContent;
  playground: IPlaygroundConfig;
  quiz: IQuizQuestion[];
}

export interface ILessonContent {
  manualScenario: string;
  whyJavaScript: string;
  theory: string;
  jsCode: string;
  playwrightCode: string;
  bridgeExplanation: string;
  bridgeSteps: IBridgeStep[];
}

export interface IBridgeStep {
  step: number;
  label: string;
  description: string;
  code: string;
  color: string;
}

export interface IPlaygroundConfig {
  defaultCode: string;
  language: 'typescript' | 'javascript';
  hints: string[];
  patterns: IPlaygroundPattern[];
  successMessage: string;
}

export interface IPlaygroundPattern {
  regex: string;
  outputLines: string[];
  delay?: number;
}

export interface IQuizQuestion {
  id: string;
  type: 'multiple-choice' | 'code-reading' | 'true-false';
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface IQuizAnswerRecord {
  questionId: string;
  selectedIndex: number;
}

export interface IUserProgress {
  completedLessons: string[];
  quizScores: Record<string, IQuizAttempt>;
  playgroundCompletions: string[];
  certificates: Record<string, ICertificateRecord>;
  preferences: IUserPreferences;
  lastActivity: string;
}

export interface IQuizAttempt {
  lessonId: string;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
  answers: IQuizAnswerRecord[];
}

export interface ICertificateRecord {
  id: string;
  title: string;
  earnedAt: string;
  score: number;
}

export interface IUserPreferences {
  colorScheme: 'light' | 'dark';
  editorFontSize: number;
}

export interface ICertificateRequirement {
  moduleId: string;
  minQuizScore: number;
}

export interface ICertificateDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requirements: ICertificateRequirement;
  color: string;
  gradient: string;
  icon: string;
  level: 1 | 2 | 3;
}

export const DEFAULT_PROGRESS: IUserProgress = {
  completedLessons: [],
  quizScores: {},
  playgroundCompletions: [],
  certificates: {},
  preferences: {
    colorScheme: 'dark',
    editorFontSize: 14,
  },
  lastActivity: new Date().toISOString(),
};
