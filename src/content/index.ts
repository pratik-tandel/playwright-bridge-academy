import type { IModule, ICertificateDefinition } from '../types';
import { module1 } from './module1.content';
import { module2 } from './module2.content';
import { module3 } from './module3.content';
import { module4 } from './module4.content';

export const modules: IModule[] = [module1, module2, module3, module4];

export const certificateDefinitions: ICertificateDefinition[] = [
  {
    id: 'explorer',
    title: 'JavaScript Explorer',
    subtitle: 'Foundations of JavaScript for QA',
    description: 'Awarded for mastering JavaScript fundamentals — variables, functions, async/await, and all core concepts needed for automation.',
    requirements: {
      moduleId: 'module-2',
      minQuizScore: 80,
    },
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: '🌟',
    level: 1,
  },
  {
    id: 'practitioner',
    title: 'Playwright Practitioner',
    subtitle: 'Playwright Core Competency',
    description: 'Awarded for completing Playwright Fundamentals — locators, actions, assertions, Page Object Model, and CI integration.',
    requirements: {
      moduleId: 'module-3',
      minQuizScore: 80,
    },
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: '🎭',
    level: 2,
  },
  {
    id: 'certified',
    title: 'Certified QA Automation Engineer',
    subtitle: 'Professional Framework Developer',
    description: 'The highest credential — awarded for completing the full Playwright Bridge Academy curriculum and demonstrating production-ready automation skills.',
    requirements: {
      moduleId: 'module-4',
      minQuizScore: 80,
    },
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    icon: '🏆',
    level: 3,
  },
];

export function getModuleById(moduleId: string): IModule | undefined {
  return modules.find((m) => m.id === moduleId);
}

export function getLessonById(moduleId: string, lessonId: string) {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}

export function getAllLessons() {
  return modules.flatMap((m) => m.lessons);
}

export function getCertificateById(certId: string): ICertificateDefinition | undefined {
  return certificateDefinitions.find((c) => c.id === certId);
}
