import { useState } from 'react';
import {
  Stack, Card, Text, Title, Button, Group, Badge, Box, Progress,
  Alert, Radio, Code, Divider,
} from '@mantine/core';
import { IconCheck, IconX, IconRefresh, IconTrophy } from '@tabler/icons-react';
import type { ILesson, IQuizQuestion } from '../../../types';
import { useProgressStore } from '../../../stores/progress.store';
import { notifications } from '@mantine/notifications';
import { certificateDefinitions, getModuleById } from '../../../content';

interface IQuizTabProps {
  lesson: ILesson;
  moduleId: string;
}

export default function QuizTab({ lesson, moduleId }: IQuizTabProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { saveQuizAttempt, completeLesson, earnCertificate, getModuleProgress, quizScores } = useProgressStore();

  const previousAttempt = quizScores[lesson.id];
  const [showPrevious, setShowPrevious] = useState(!previousAttempt ? false : true);

  const totalPoints = lesson.quiz.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = submitted
    ? lesson.quiz.reduce((sum, q) => (answers[q.id] === q.correctIndex ? sum + q.points : sum), 0)
    : 0;
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  function handleSubmit() {
    if (Object.keys(answers).length < lesson.quiz.length) {
      notifications.show({ title: 'Answer all questions', message: `${lesson.quiz.length - Object.keys(answers).length} question(s) remaining.`, color: 'orange' });
      return;
    }

    setSubmitted(true);
    setShowPrevious(false);

    const attempt = {
      lessonId: lesson.id,
      score: earnedPoints,
      maxScore: totalPoints,
      percentage,
      completedAt: new Date().toISOString(),
      answers: Object.entries(answers).map(([qId, selectedIndex]) => ({ questionId: qId, selectedIndex })),
    };

    saveQuizAttempt(attempt);
    completeLesson(lesson.id);

    // Check certificate eligibility
    const module = getModuleById(moduleId);
    if (module?.certificateId && percentage >= 80) {
      const cert = certificateDefinitions.find((c) => c.id === module.certificateId);
      if (cert) {
        const lessonIds = module.lessons.map((l) => l.id);
        const { percentage: modulePercent } = getModuleProgress(lessonIds);
        if (modulePercent >= 80) {
          earnCertificate({
            id: cert.id,
            title: cert.title,
            earnedAt: new Date().toISOString(),
            score: percentage,
          });
          notifications.show({
            title: `🏆 Certificate Earned: ${cert.title}!`,
            message: cert.subtitle,
            color: 'yellow',
            autoClose: 8000,
          });
        }
      }
    }
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
  }

  if (showPrevious && previousAttempt) {
    return (
      <Stack gap="md">
        <Alert icon={<IconTrophy size={16} />} color={previousAttempt.percentage >= 80 ? 'green' : 'orange'} title="Previous Attempt">
          <Group justify="space-between" align="center">
            <Text size="sm">Score: <strong>{previousAttempt.percentage}%</strong> ({previousAttempt.score}/{previousAttempt.maxScore} points)</Text>
            <Button size="xs" leftSection={<IconRefresh size={14} />} variant="subtle" onClick={() => setShowPrevious(false)}>
              Retake Quiz
            </Button>
          </Group>
        </Alert>
        <QuizQuestions
          questions={lesson.quiz}
          answers={previousAttempt.answers.reduce((acc, a) => ({ ...acc, [a.questionId]: a.selectedIndex }), {})}
          submitted
          onAnswer={() => {}}
        />
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between">
        <Box>
          <Text fw={600}>Knowledge Check</Text>
          <Text size="sm" c="dimmed">{lesson.quiz.length} questions · {totalPoints} points</Text>
        </Box>
        {submitted && (
          <Badge size="lg" color={percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red'} variant="light">
            {percentage}% — {earnedPoints}/{totalPoints} pts
          </Badge>
        )}
      </Group>

      {submitted && (
        <>
          <Progress value={percentage} size="md" color={percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red'} />
          {percentage >= 80 ? (
            <Alert icon={<IconCheck size={16} />} color="green" title="Excellent work!">
              You passed with {percentage}%! The lesson is now marked as complete.
            </Alert>
          ) : (
            <Alert icon={<IconX size={16} />} color="orange" title="Keep practicing">
              You scored {percentage}%. Review the Theory tab and try again — 80% needed for certification.
              <Button size="xs" mt="sm" leftSection={<IconRefresh size={14} />} onClick={handleRetry}>Retry Quiz</Button>
            </Alert>
          )}
        </>
      )}

      <QuizQuestions
        questions={lesson.quiz}
        answers={answers}
        submitted={submitted}
        onAnswer={(qId, idx) => !submitted && setAnswers((prev) => ({ ...prev, [qId]: idx }))}
      />

      {!submitted && (
        <Button
          fullWidth
          size="md"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < lesson.quiz.length}
        >
          Submit Quiz ({Object.keys(answers).length}/{lesson.quiz.length} answered)
        </Button>
      )}

      {submitted && (
        <Button variant="subtle" leftSection={<IconRefresh size={16} />} onClick={handleRetry}>
          Retake Quiz
        </Button>
      )}
    </Stack>
  );
}

interface IQuizQuestionsProps {
  questions: IQuizQuestion[];
  answers: Record<string, number>;
  submitted: boolean;
  onAnswer: (questionId: string, index: number) => void;
}

function QuizQuestions({ questions, answers, submitted, onAnswer }: IQuizQuestionsProps) {
  return (
    <Stack gap="md">
      {questions.map((question, qIndex) => {
        const selectedIndex = answers[question.id];
        const isCorrect = submitted && selectedIndex === question.correctIndex;
        const isWrong = submitted && selectedIndex !== undefined && selectedIndex !== question.correctIndex;

        return (
          <Card
            key={question.id}
            p="lg"
            withBorder
            style={{
              borderColor: submitted
                ? isCorrect
                  ? 'var(--mantine-color-green-5)'
                  : isWrong
                  ? 'var(--mantine-color-red-5)'
                  : undefined
                : undefined,
            }}
          >
            <Group gap="xs" mb="sm">
              <Badge size="sm" variant="light" color="violet">Q{qIndex + 1}</Badge>
              <Badge size="sm" variant="light" color="gray">{question.points} pts</Badge>
              {submitted && (
                isCorrect
                  ? <Badge size="sm" color="green" leftSection={<IconCheck size={10} />}>Correct</Badge>
                  : isWrong
                  ? <Badge size="sm" color="red" leftSection={<IconX size={10} />}>Incorrect</Badge>
                  : null
              )}
            </Group>

            <Text fw={600} mb={question.code ? 'sm' : 'md'} size="sm">{question.question}</Text>

            {question.code && (
              <Box
                mb="md"
                p="sm"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  background: 'var(--mantine-color-dark-7)',
                  color: '#e2e8f0',
                  borderRadius: 6,
                  whiteSpace: 'pre',
                  overflow: 'auto',
                }}
              >
                {question.code}
              </Box>
            )}

            <Radio.Group value={selectedIndex?.toString() ?? ''} onChange={(val) => onAnswer(question.id, parseInt(val))}>
              <Stack gap="xs">
                {question.options.map((option, optIndex) => {
                  const isOptionCorrect = submitted && optIndex === question.correctIndex;
                  const isOptionWrong = submitted && optIndex === selectedIndex && optIndex !== question.correctIndex;
                  return (
                    <Radio
                      key={optIndex}
                      value={optIndex.toString()}
                      label={option}
                      disabled={submitted}
                      styles={{
                        label: {
                          color: isOptionCorrect
                            ? 'var(--mantine-color-green-6)'
                            : isOptionWrong
                            ? 'var(--mantine-color-red-6)'
                            : undefined,
                          fontWeight: isOptionCorrect ? 600 : undefined,
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Radio.Group>

            {submitted && (
              <>
                <Divider my="sm" />
                <Group gap="xs" align="flex-start">
                  <Text size="xs" fw={600} c={isCorrect ? 'green' : 'orange'}>
                    {isCorrect ? '✓ Correct!' : '✗ Explanation:'}
                  </Text>
                  <Text size="xs" c="dimmed" style={{ flex: 1 }}>{question.explanation}</Text>
                </Group>
              </>
            )}
          </Card>
        );
      })}
    </Stack>
  );
}
