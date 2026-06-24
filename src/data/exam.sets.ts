import { examQuestions, EXAM_PASS_THRESHOLD, EXAM_TIME_MINUTES } from './exam.questions';
import { exam2Questions } from './exam2.questions';
import { exam3Questions } from './exam3.questions';
import { exam4Questions } from './exam4.questions';
import type { IExamQuestion } from './exam.questions';

export interface IExamSet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  questions: IExamQuestion[];
  totalQuestions: number;
  timeMinutes: number;
  passThreshold: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export const EXAM_SETS: IExamSet[] = [
  {
    id: 'exam-1',
    title: 'Exam 1',
    subtitle: 'Core Foundations',
    description: 'Covers locators, assertions, basic actions, navigation, and essential configuration.',
    color: 'violet',
    questions: examQuestions,
    totalQuestions: examQuestions.length,
    timeMinutes: EXAM_TIME_MINUTES,
    passThreshold: EXAM_PASS_THRESHOLD,
    difficulty: 'Beginner',
  },
  {
    id: 'exam-2',
    title: 'Exam 2',
    subtitle: 'Core Mastery',
    description: 'Deep-dives into locator combinators, filtering, soft assertions, and advanced actions.',
    color: 'blue',
    questions: exam2Questions,
    totalQuestions: exam2Questions.length,
    timeMinutes: EXAM_TIME_MINUTES,
    passThreshold: EXAM_PASS_THRESHOLD,
    difficulty: 'Intermediate',
  },
  {
    id: 'exam-3',
    title: 'Exam 3',
    subtitle: 'Advanced Patterns',
    description: 'Explores iframes, Shadow DOM, API assertions, HAR mocking, fixtures, and tracing.',
    color: 'green',
    questions: exam3Questions,
    totalQuestions: exam3Questions.length,
    timeMinutes: EXAM_TIME_MINUTES,
    passThreshold: EXAM_PASS_THRESHOLD,
    difficulty: 'Advanced',
  },
  {
    id: 'exam-4',
    title: 'Exam 4',
    subtitle: 'Expert Level',
    description: 'Tackles CSP bypass, CDP sessions, project dependencies, mergeTests, and POM design.',
    color: 'red',
    questions: exam4Questions,
    totalQuestions: exam4Questions.length,
    timeMinutes: EXAM_TIME_MINUTES,
    passThreshold: EXAM_PASS_THRESHOLD,
    difficulty: 'Expert',
  },
];
