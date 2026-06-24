import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Title, Text, Group, Badge, Button, Tabs, Box, Breadcrumbs, Anchor, Alert } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconCheck, IconBook, IconBrandJavascript, IconTerminal, IconQuestionMark } from '@tabler/icons-react';
import { getModuleById, getLessonById, modules } from '../../content';
import { useProgressStore } from '../../stores/progress.store';
import TheoryTab from './components/TheoryTab';
import BridgeTab from './components/BridgeTab';
import PlaygroundTab from './components/PlaygroundTab';
import QuizTab from './components/QuizTab';

export default function LessonViewer() {
  const { moduleId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const { getLessonProgress } = useProgressStore();

  const module = getModuleById(moduleId);
  const lesson = getLessonById(moduleId, lessonId);

  if (!module || !lesson) {
    return (
      <Alert color="red" title="Lesson not found">
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </Alert>
    );
  }

  const { completed, quizScore } = getLessonProgress(lessonId);

  // Navigation between lessons
  const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ moduleId: m.id, lessonId: l.id })));
  const currentIndex = allLessons.findIndex((l) => l.moduleId === moduleId && l.lessonId === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <Stack gap="md">
      {/* Breadcrumbs */}
      <Breadcrumbs>
        <Anchor size="sm" onClick={() => navigate('/dashboard')}>Dashboard</Anchor>
        <Anchor size="sm" onClick={() => navigate(`/lesson/${moduleId}/${module.lessons[0].id}`)}>{module.title}</Anchor>
        <Text size="sm" c="dimmed">{lesson.title}</Text>
      </Breadcrumbs>

      {/* Lesson Header */}
      <Box>
        <Group gap="sm" mb={4}>
          <Badge color={module.color} variant="light" size="sm">Module {module.number} · Lesson {lesson.number}</Badge>
          <Badge color="gray" variant="light" size="sm">{lesson.durationMinutes} min</Badge>
          {completed && <Badge color="green" leftSection={<IconCheck size={12} />} variant="light" size="sm">Completed</Badge>}
          {quizScore && <Badge color="blue" variant="light" size="sm">Quiz: {quizScore.percentage}%</Badge>}
        </Group>
        <Title order={2} mb={4}>{lesson.title}</Title>
        <Text c="dimmed">{lesson.subtitle}</Text>
      </Box>

      {/* Content Tabs */}
      <Tabs defaultValue="theory" keepMounted={false}>
        <Tabs.List mb="md">
          <Tabs.Tab value="theory" leftSection={<IconBook size={14} />}>Theory</Tabs.Tab>
          <Tabs.Tab value="bridge" leftSection={<IconBrandJavascript size={14} />}>Bridge</Tabs.Tab>
          <Tabs.Tab value="playground" leftSection={<IconTerminal size={14} />}>Playground</Tabs.Tab>
          <Tabs.Tab value="quiz" leftSection={<IconQuestionMark size={14} />}>
            Quiz {quizScore ? `(${quizScore.percentage}%)` : ''}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="theory">
          <TheoryTab lesson={lesson} />
        </Tabs.Panel>

        <Tabs.Panel value="bridge">
          <BridgeTab lesson={lesson} />
        </Tabs.Panel>

        <Tabs.Panel value="playground">
          <PlaygroundTab lesson={lesson} moduleId={moduleId} />
        </Tabs.Panel>

        <Tabs.Panel value="quiz">
          <QuizTab lesson={lesson} moduleId={moduleId} />
        </Tabs.Panel>
      </Tabs>

      {/* Navigation */}
      <Group justify="space-between" pt="md">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          disabled={!prevLesson}
          onClick={() => prevLesson && navigate(`/lesson/${prevLesson.moduleId}/${prevLesson.lessonId}`)}
        >
          Previous
        </Button>

        <Button
          rightSection={<IconArrowRight size={16} />}
          disabled={!nextLesson}
          onClick={() => nextLesson && navigate(`/lesson/${nextLesson.moduleId}/${nextLesson.lessonId}`)}
        >
          Next Lesson
        </Button>
      </Group>
    </Stack>
  );
}
