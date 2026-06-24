import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingOverlay } from '@mantine/core';
import AppLayout from '../layouts/AppLayout';

const Dashboard = lazy(() => import('../modules/dashboard/Dashboard'));
const LessonViewer = lazy(() => import('../modules/learning/LessonViewer'));
const Certification = lazy(() => import('../modules/certification/Certification'));
const ExamHub = lazy(() => import('../modules/exam/ExamHub'));

function PageLoader() {
  return <LoadingOverlay visible loaderProps={{ size: 'lg', color: 'violet' }} />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'lesson/:moduleId/:lessonId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LessonViewer />
          </Suspense>
        ),
      },
      {
        path: 'certification',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Certification />
          </Suspense>
        ),
      },
      {
        path: 'exam',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExamHub />
          </Suspense>
        ),
      },
    ],
  },
]);
