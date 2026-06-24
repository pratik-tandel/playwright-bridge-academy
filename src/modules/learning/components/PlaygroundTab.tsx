import { useState, useRef, useEffect } from 'react';
import { Stack, Card, Text, Group, Button, Box, Badge, ScrollArea, Alert, Divider } from '@mantine/core';
import { IconPlayerPlay, IconRefresh, IconCheck, IconBulb } from '@tabler/icons-react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import type { ILesson } from '../../../types';
import { simulatePlayground, type IOutputLine } from '../../../utils/playground.simulator';
import { useProgressStore } from '../../../stores/progress.store';
import { useMantineColorScheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';

interface IPlaygroundTabProps {
  lesson: ILesson;
  moduleId: string;
}

export default function PlaygroundTab({ lesson, moduleId }: IPlaygroundTabProps) {
  const { colorScheme } = useMantineColorScheme();
  const { completePlayground, completeLesson, getLessonProgress } = useProgressStore();
  const { playground } = lesson;

  const [code, setCode] = useState(playground.defaultCode);
  const [outputLines, setOutputLines] = useState<IOutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { playgroundCompletions } = getLessonProgress(lesson.id) as any;

  const alreadyCompleted = useProgressStore((s) => s.playgroundCompletions.includes(lesson.id));

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function handleRun() {
    clearTimeouts();
    setOutputLines([]);
    setIsRunning(true);
    setHasSucceeded(false);

    const result = simulatePlayground(code, playground);

    result.lines.forEach((line) => {
      const t = setTimeout(() => {
        setOutputLines((prev) => [...prev, line]);
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    const totalTime = result.lines.length > 0 ? Math.max(...result.lines.map((l) => l.delay)) + 400 : 500;

    const finishT = setTimeout(() => {
      setIsRunning(false);
      if (result.success) {
        setHasSucceeded(true);
        if (!alreadyCompleted) {
          completePlayground(lesson.id);
          completeLesson(lesson.id);
          notifications.show({
            title: 'Playground Complete! 🎉',
            message: 'Lesson marked as completed.',
            color: 'green',
          });
        }
      }
    }, totalTime);
    timeoutsRef.current.push(finishT);
  }

  function handleReset() {
    clearTimeouts();
    setCode(playground.defaultCode);
    setOutputLines([]);
    setIsRunning(false);
    setHasSucceeded(false);
  }

  useEffect(() => () => clearTimeouts(), []);

  const editorTheme = colorScheme === 'dark' ? 'vs-dark' : 'light';

  return (
    <Stack gap="md">
      {alreadyCompleted && (
        <Alert icon={<IconCheck size={16} />} color="green" variant="light">
          You completed this playground! Feel free to experiment further.
        </Alert>
      )}

      <Group justify="space-between" align="flex-start">
        <Box>
          <Text fw={600}>Interactive Playground</Text>
          <Text size="sm" c="dimmed">Edit the code and click Run to see the output</Text>
        </Box>
        <Group gap="xs">
          <Button
            variant="subtle"
            size="xs"
            leftSection={<IconBulb size={14} />}
            onClick={() => setShowHints((v) => !v)}
          >
            Hints
          </Button>
          <Button variant="subtle" size="xs" leftSection={<IconRefresh size={14} />} onClick={handleReset}>
            Reset
          </Button>
          <Button
            size="xs"
            leftSection={<IconPlayerPlay size={14} />}
            onClick={handleRun}
            loading={isRunning}
            color={hasSucceeded ? 'green' : 'violet'}
          >
            {isRunning ? 'Running...' : hasSucceeded ? 'Run Again' : 'Run Code'}
          </Button>
        </Group>
      </Group>

      {showHints && (
        <Card p="sm" withBorder bg="var(--mantine-color-yellow-0)">
          <Text size="xs" fw={600} c="yellow.7" mb={4}>💡 Hints</Text>
          <Stack gap={4}>
            {playground.hints.map((hint, i) => (
              <Text key={i} size="xs" c="dimmed">• {hint}</Text>
            ))}
          </Stack>
        </Card>
      )}

      {/* Editor */}
      <Card p={0} withBorder style={{ overflow: 'hidden' }}>
        <Editor
          height="320px"
          defaultLanguage={playground.language}
          value={code}
          onChange={(val) => setCode(val ?? '')}
          theme={editorTheme}
          options={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            padding: { top: 12, bottom: 12 },
          }}
        />
      </Card>

      {/* Output */}
      <Card p={0} withBorder>
        <Group px="sm" py="xs" justify="space-between" style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
          <Text size="xs" fw={600} c="dimmed">OUTPUT</Text>
          {outputLines.length > 0 && (
            <Badge size="xs" variant="light" color={hasSucceeded ? 'green' : 'gray'}>
              {outputLines.length} line{outputLines.length > 1 ? 's' : ''}
            </Badge>
          )}
        </Group>
        <ScrollArea h={180}>
          <Box
            p="sm"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              minHeight: 180,
              background: colorScheme === 'dark' ? 'var(--mantine-color-dark-8)' : '#1e1e1e',
              color: '#e2e8f0',
            }}
          >
            {outputLines.length === 0 ? (
              <Text size="xs" c="dimmed" style={{ fontFamily: 'inherit' }}>
                {isRunning ? '⟳ Running...' : '// Click Run Code to execute'}
              </Text>
            ) : (
              outputLines.map((line, index) => (
                <Box
                  key={index}
                  mb={2}
                  style={{
                    color: line.type === 'success' ? '#4ade80' : line.type === 'error' ? '#f87171' : line.type === 'info' ? '#93c5fd' : '#e2e8f0',
                  }}
                >
                  {line.text}
                </Box>
              ))
            )}
          </Box>
        </ScrollArea>
      </Card>
    </Stack>
  );
}
