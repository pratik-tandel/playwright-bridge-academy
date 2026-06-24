import {
  Stack,
  Text,
  Group,
  Badge,
  Button,
  Card,
  Progress,
  RingProgress,
  Accordion,
  Alert,
  ScrollArea,
  Flex,
  Box,
  ActionIcon,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Table,
  Modal,
  Paper,
  Radio,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconClipboardCheck,
  IconTrophy,
  IconClock,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconChevronLeft,
  IconArrowRight,
  IconTarget,
  IconFlame,
  IconStar,
  IconRefresh,
} from '@tabler/icons-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { EXAM_SETS, type IExamSet } from '../../data/exam.sets';
import { CATEGORY_COLORS } from '../../data/exam.questions';
import type { IExamQuestion, ExamCategory } from '../../data/exam.questions';
import { useProgressStore } from '../../stores/progress.store';
import type { IExamAttempt } from '../../types';

// ── View routing ─────────────────────────────────────────────────────────────

type ExamView = 'hub' | 'session' | 'results';

/** Root component — manages which view is visible. */
export default function ExamHub(): React.JSX.Element {
  /** Which top-level view is active. */
  const [view, setView] = useState<ExamView>('hub');
  /** The exam set currently being taken or reviewed. */
  const [activeSet, setActiveSet] = useState<IExamSet | null>(null);
  /** The completed attempt to display in the results view. */
  const [latestAttempt, setLatestAttempt] = useState<IExamAttempt | null>(null);

  /** Kick off an exam session for a given set. */
  const handleStartExam = useCallback((set: IExamSet) => {
    setActiveSet(set);
    setView('session');
  }, []);

  /** Called by ExamSession when the user submits. */
  const handleSessionComplete = useCallback((attempt: IExamAttempt) => {
    setLatestAttempt(attempt);
    setView('results');
  }, []);

  /** Return to the hub from results or mid-session. */
  const handleReturnToHub = useCallback(() => {
    setActiveSet(null);
    setLatestAttempt(null);
    setView('hub');
  }, []);

  /** Retry the same exam directly from the results screen. */
  const handleRetakeExam = useCallback(() => {
    setLatestAttempt(null);
    setView('session');
  }, []);

  if (view === 'session' && activeSet) {
    return <ExamSession examSet={activeSet} onComplete={handleSessionComplete} onAbort={handleReturnToHub} />;
  }

  if (view === 'results' && latestAttempt && activeSet) {
    return <ExamResults attempt={latestAttempt} examSet={activeSet} onRetake={handleRetakeExam} onBack={handleReturnToHub} />;
  }

  return <ExamHubHome onStartExam={handleStartExam} />;
}

// ── Hub home — exam selection ─────────────────────────────────────────────────

interface IExamHubHomeProps {
  /** Called when the user picks an exam to start. */
  readonly onStartExam: (set: IExamSet) => void;
}

/** Landing screen listing all four exam sets with best scores and start CTAs. */
function ExamHubHome({ onStartExam }: IExamHubHomeProps): React.JSX.Element {
  const { examAttempts, getBestExamAttempt } = useProgressStore();

  /** Total attempts taken across all exam sets. */
  const totalAttempts = examAttempts.length;
  /** Number of distinct exam sets where the user has at least one passing attempt. */
  const examsPassed = EXAM_SETS.filter((s) => getBestExamAttempt(s.id)?.passed).length;
  /** Overall best percentage across all exams. */
  const overallBest = examAttempts.length > 0 ? Math.max(...examAttempts.map((a) => a.percentage)) : null;

  return (
    <ScrollArea h="100%">
      <Stack gap="xl" p="md" maw={900} mx="auto">
        {/* Header */}
        <Stack gap="xs">
          <Group gap="sm">
            <ThemeIcon size="xl" variant="light" color="violet" radius="md">
              <IconClipboardCheck size={24} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={700} fz={22}>
                Practice Exam Centre
              </Text>
              <Text c="dimmed" fz="sm">
                Four 60-question exams — 240 unique questions covering the full Playwright certification syllabus
              </Text>
            </Stack>
          </Group>
          <Group gap="xs" mt={4}>
            <Badge variant="light" color="violet" size="sm">240 total questions</Badge>
            <Badge variant="light" color="gray" size="sm">60 min per exam</Badge>
            <Badge variant="light" color="green" size="sm">70% to pass</Badge>
          </Group>
        </Stack>

        {/* Overall stats (shown after first attempt) */}
        {totalAttempts > 0 && (
          <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
            <StatCard label="Attempts taken" value={String(totalAttempts)} color="violet" icon={<IconFlame size={18} />} />
            <StatCard label="Exams passed" value={`${examsPassed} / ${EXAM_SETS.length}`} color="green" icon={<IconTrophy size={18} />} />
            <StatCard label="Best score" value={overallBest !== null ? `${overallBest}%` : '—'} color="blue" icon={<IconStar size={18} />} />
          </SimpleGrid>
        )}

        {/* Exam set cards */}
        <Stack gap="md">
          {EXAM_SETS.map((set, index) => (
            <ExamSetCard
              key={set.id}
              set={set}
              index={index + 1}
              attempts={examAttempts.filter((a) => a.examSetId === set.id)}
              best={getBestExamAttempt(set.id)}
              onStart={() => onStartExam(set)}
            />
          ))}
        </Stack>

        {/* Tips card */}
        <Card withBorder radius="md" p="md">
          <Text fw={600} mb="xs">Exam tips</Text>
          <Stack gap={4}>
            {[
              'Each question is unique — no question appears in more than one exam.',
              'Flag questions you are unsure about using the navigator and review them before submitting.',
              'The timer badge turns red when fewer than 5 minutes remain.',
              'Review wrong answers with detailed explanations after submitting.',
              'Use the category breakdown to identify weak areas and focus revision.',
            ].map((tip) => (
              <Group key={tip} gap="xs" align="flex-start">
                <IconCheck size={14} color="var(--mantine-color-green-6)" style={{ marginTop: 2, flexShrink: 0 }} />
                <Text fz="sm" c="dimmed">{tip}</Text>
              </Group>
            ))}
          </Stack>
        </Card>
      </Stack>
    </ScrollArea>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

interface IStatCardProps {
  readonly label: string;
  readonly value: string;
  readonly color: string;
  readonly icon: React.ReactNode;
}

/** Small metric tile used on the hub home overview. */
function StatCard({ label, value, color, icon }: IStatCardProps): React.JSX.Element {
  return (
    <Card withBorder radius="md" p="sm">
      <Group gap="xs" mb={4}>
        <ThemeIcon size="sm" variant="light" color={color} radius="sm">{icon}</ThemeIcon>
        <Text fz="xs" c="dimmed">{label}</Text>
      </Group>
      <Text fw={700} fz={20} c={color}>{value}</Text>
    </Card>
  );
}

// ── Exam set card ─────────────────────────────────────────────────────────────

interface IExamSetCardProps {
  readonly set: IExamSet;
  readonly index: number;
  readonly attempts: IExamAttempt[];
  readonly best: IExamAttempt | null;
  readonly onStart: () => void;
}

/** Card for a single exam set showing description, difficulty, best score, and start CTA. */
function ExamSetCard({ set, index, attempts, best, onStart }: IExamSetCardProps): React.JSX.Element {
  const difficultyColor: Record<string, string> = {
    Beginner: 'green',
    Intermediate: 'blue',
    Advanced: 'orange',
    Expert: 'red',
  };

  return (
    <Card withBorder radius="md" p="md">
      <Flex gap="md" align="flex-start" wrap="wrap">
        {/* Number badge */}
        <ThemeIcon size={48} radius="md" color={set.color} variant="light">
          <Text fw={700} fz={18}>{index}</Text>
        </ThemeIcon>

        {/* Info */}
        <Stack gap={6} style={{ flex: 1, minWidth: 200 }}>
          <Group gap="xs" wrap="nowrap">
            <Text fw={700} fz={16}>{set.title} — {set.subtitle}</Text>
            <Badge size="xs" color={difficultyColor[set.difficulty] ?? 'gray'} variant="light">
              {set.difficulty}
            </Badge>
          </Group>
          <Text fz="sm" c="dimmed">{set.description}</Text>
          <Group gap="xs" mt={2}>
            <Badge size="xs" variant="outline" color="gray">{set.totalQuestions} questions</Badge>
            <Badge size="xs" variant="outline" color="gray">{set.timeMinutes} min</Badge>
            {attempts.length > 0 && (
              <Badge size="xs" variant="outline" color="gray">
                {attempts.length} attempt{attempts.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </Group>

          {/* Best score progress bar */}
          {best && (
            <Box mt={4}>
              <Group justify="space-between" mb={4}>
                <Text fz="xs" c="dimmed">Best score</Text>
                <Group gap={4}>
                  <Text fz="xs" fw={600} c={best.passed ? 'green' : 'red'}>{best.percentage}%</Text>
                  <Badge size="xs" color={best.passed ? 'green' : 'red'} variant="light">
                    {best.passed ? 'Passed' : 'Failed'}
                  </Badge>
                </Group>
              </Group>
              <Progress value={best.percentage} color={best.passed ? 'green' : 'red'} size="sm" radius="xl" />
            </Box>
          )}
        </Stack>

        {/* CTA */}
        <Button
          variant={best?.passed ? 'light' : 'filled'}
          color={set.color}
          rightSection={<IconArrowRight size={16} />}
          onClick={onStart}
          style={{ flexShrink: 0 }}
        >
          {attempts.length === 0 ? 'Start' : best?.passed ? 'Retake' : 'Try Again'}
        </Button>
      </Flex>
    </Card>
  );
}

// ── Exam session ──────────────────────────────────────────────────────────────

interface IExamSessionProps {
  readonly examSet: IExamSet;
  readonly onComplete: (attempt: IExamAttempt) => void;
  readonly onAbort: () => void;
}

/** Full exam experience: countdown timer, question navigator, question area. */
function ExamSession({ examSet, onComplete, onAbort }: IExamSessionProps): React.JSX.Element {
  const { saveExamAttempt } = useProgressStore();

  /** Current question index (0-based). */
  const [currentIndex, setCurrentIndex] = useState(0);
  /** Map of questionId → selectedOptionIndex. */
  const [answers, setAnswers] = useState<Record<string, number>>({});
  /** Ref copy to avoid stale closure in the timer auto-submit callback. */
  const answersRef = useRef<Record<string, number>>({});
  /** Seconds remaining on the countdown. */
  const [secondsLeft, setSecondsLeft] = useState(examSet.timeMinutes * 60);
  /** ISO timestamp when the exam started. */
  const startedAtRef = useRef<string>(new Date().toISOString());
  /** Epoch ms when the exam started — for computing timeTakenSeconds. */
  const startEpochRef = useRef<number>(Date.now());

  const [isQuitModalOpen, { open: openQuitModal, close: closeQuitModal }] = useDisclosure(false);
  const [isSubmitModalOpen, { open: openSubmitModal, close: closeSubmitModal }] = useDisclosure(false);

  const questions = examSet.questions;
  const currentQuestion = questions[currentIndex];

  /** Record an answer, keeping the ref in sync for the timer callback. */
  const handleSelectAnswer = useCallback((questionId: string, selectedIndex: number) => {
    const next = { ...answersRef.current, [questionId]: selectedIndex };
    answersRef.current = next;
    setAnswers(next);
  }, []);

  /** Tally scores, persist the attempt, and hand off to the results view. */
  const submitExam = useCallback(
    (finalAnswers: Record<string, number>) => {
      let score = 0;
      let maxScore = 0;
      const categoryScores: Record<string, { score: number; maxScore: number }> = {};

      for (const q of questions) {
        maxScore += q.points;
        if (!categoryScores[q.category]) categoryScores[q.category] = { score: 0, maxScore: 0 };
        categoryScores[q.category].maxScore += q.points;
        if (finalAnswers[q.id] === q.correctIndex) {
          score += q.points;
          categoryScores[q.category].score += q.points;
        }
      }

      const percentage = Math.round((score / maxScore) * 100);
      const timeTakenSeconds = Math.round((Date.now() - startEpochRef.current) / 1000);

      const attempt: IExamAttempt = {
        id: `${examSet.id}-${Date.now()}`,
        examSetId: examSet.id,
        startedAt: startedAtRef.current,
        completedAt: new Date().toISOString(),
        score,
        maxScore,
        percentage,
        passed: percentage >= examSet.passThreshold,
        timeTakenSeconds,
        answers: finalAnswers,
        categoryScores,
      };

      saveExamAttempt(attempt);
      onComplete(attempt);
    },
    [questions, examSet, saveExamAttempt, onComplete],
  );

  /** Countdown timer — auto-submits when time reaches zero. */
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitExam(answersRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitExam]);

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const timerColor = secondsLeft < 300 ? 'red' : 'blue';

  return (
    <>
      <Stack h="100%" gap={0}>
        {/* Header bar */}
        <Paper withBorder p="xs" radius={0}>
          <Flex justify="space-between" align="center" gap="md" wrap="wrap">
            <Group gap="xs">
              <ActionIcon variant="subtle" onClick={openQuitModal} title="Quit exam">
                <IconChevronLeft size={18} />
              </ActionIcon>
              <Text fw={600} fz="sm">{examSet.title} — {examSet.subtitle}</Text>
            </Group>
            <Group gap="xs">
              <Badge color={timerColor} variant="filled" size="lg" leftSection={<IconClock size={12} />}>
                {formatTime(secondsLeft)}
              </Badge>
              <Badge color="gray" variant="light" size="lg">
                {answeredCount}/{questions.length} answered
              </Badge>
              <Button size="xs" color="green" onClick={openSubmitModal}>Submit</Button>
            </Group>
          </Flex>
          <Progress value={(answeredCount / questions.length) * 100} size="xs" mt={6} color={examSet.color} animated />
        </Paper>

        {/* Body */}
        <Flex gap={0} style={{ flex: 1, overflow: 'hidden' }}>
          {/* Question navigator */}
          <ScrollArea w={200} style={{ flexShrink: 0, borderRight: '1px solid var(--mantine-color-default-border)' }} p="xs">
            <Text fz="xs" c="dimmed" mb="xs" fw={600}>Questions</Text>
            <SimpleGrid cols={4} spacing={4}>
              {questions.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = i === currentIndex;
                return (
                  <ActionIcon
                    key={q.id}
                    size="sm"
                    radius="sm"
                    variant={isCurrent ? 'filled' : isAnswered ? 'light' : 'subtle'}
                    color={isCurrent ? examSet.color : isAnswered ? 'green' : 'gray'}
                    onClick={() => setCurrentIndex(i)}
                    title={`Q${i + 1}`}
                  >
                    <Text fz={10}>{i + 1}</Text>
                  </ActionIcon>
                );
              })}
            </SimpleGrid>
            <Divider my="xs" />
            <Stack gap={4}>
              <Group gap={4}>
                <Box w={10} h={10} style={{ borderRadius: 2, backgroundColor: 'var(--mantine-color-green-5)' }} />
                <Text fz="xs" c="dimmed">Answered ({answeredCount})</Text>
              </Group>
              <Group gap={4}>
                <Box w={10} h={10} style={{ borderRadius: 2, backgroundColor: 'var(--mantine-color-gray-4)' }} />
                <Text fz="xs" c="dimmed">Not yet ({unansweredCount})</Text>
              </Group>
            </Stack>
          </ScrollArea>

          {/* Question area */}
          <ScrollArea style={{ flex: 1 }} p="md">
            <QuestionArea
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentQuestion.id]}
              onSelect={(idx) => handleSelectAnswer(currentQuestion.id, idx)}
              onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            />
          </ScrollArea>
        </Flex>
      </Stack>

      {/* Quit confirmation modal */}
      <Modal opened={isQuitModalOpen} onClose={closeQuitModal} title="Quit exam?" centered size="sm">
        <Text fz="sm" mb="md">Your progress will be lost if you quit now. Are you sure?</Text>
        <Group justify="flex-end">
          <Button variant="subtle" onClick={closeQuitModal}>Continue exam</Button>
          <Button color="red" onClick={onAbort}>Quit</Button>
        </Group>
      </Modal>

      {/* Submit confirmation modal */}
      <Modal opened={isSubmitModalOpen} onClose={closeSubmitModal} title="Submit exam?" centered size="sm">
        {unansweredCount > 0 && (
          <Alert color="yellow" icon={<IconAlertTriangle size={16} />} mb="md">
            You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}. Unanswered questions score 0 points.
          </Alert>
        )}
        <Text fz="sm" mb="md">Ready to submit your {answeredCount} answer{answeredCount !== 1 ? 's' : ''}?</Text>
        <Group justify="flex-end">
          <Button variant="subtle" onClick={closeSubmitModal}>Review first</Button>
          <Button color="green" onClick={() => submitExam(answersRef.current)}>Submit exam</Button>
        </Group>
      </Modal>
    </>
  );
}

// ── Question area ─────────────────────────────────────────────────────────────

interface IQuestionAreaProps {
  readonly question: IExamQuestion;
  readonly questionNumber: number;
  readonly totalQuestions: number;
  readonly selectedAnswer: number | undefined;
  readonly onSelect: (index: number) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

/** Renders a single question card with options and prev/next navigation. */
function QuestionArea({
  question, questionNumber, totalQuestions, selectedAnswer, onSelect, onPrev, onNext,
}: IQuestionAreaProps): React.JSX.Element {
  const difficultyColors: Record<string, string> = { easy: 'green', medium: 'orange', hard: 'red' };

  return (
    <Stack gap="md" maw={760}>
      {/* Meta badges */}
      <Group gap="xs">
        <Badge color="gray" variant="outline" size="sm">Q{questionNumber} / {totalQuestions}</Badge>
        <Badge color={CATEGORY_COLORS[question.category as ExamCategory] ?? 'gray'} variant="light" size="sm">
          {question.category}
        </Badge>
        <Badge color={difficultyColors[question.difficulty] ?? 'gray'} variant="light" size="sm">
          {question.difficulty} · {question.points}pt{question.points !== 1 ? 's' : ''}
        </Badge>
      </Group>

      {/* Question text */}
      <Text fw={600} fz={16} style={{ lineHeight: 1.5 }}>{question.question}</Text>

      {/* Optional code block */}
      {question.code && (
        <Box p="sm" style={{ backgroundColor: 'var(--mantine-color-dark-8)', borderRadius: 8, overflowX: 'auto' }}>
          <Text component="pre" fz="sm" c="gray.2" style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {question.code}
          </Text>
        </Box>
      )}

      {/* Answer options */}
      <Stack gap="sm">
        {question.options.map((option, index) => (
          <Card
            key={index}
            withBorder
            radius="md"
            p="sm"
            onClick={() => onSelect(index)}
            style={{
              cursor: 'pointer',
              borderColor: selectedAnswer === index ? 'var(--mantine-color-violet-6)' : undefined,
              backgroundColor: selectedAnswer === index ? 'var(--mantine-color-violet-0)' : undefined,
            }}
          >
            <Group gap="sm">
              <Radio
                checked={selectedAnswer === index}
                onChange={() => onSelect(index)}
                onClick={(e) => e.stopPropagation()}
                color="violet"
              />
              <Text fz="sm">{option}</Text>
            </Group>
          </Card>
        ))}
      </Stack>

      {/* Prev / Next navigation */}
      <Group justify="space-between" mt="sm">
        <Button variant="subtle" onClick={onPrev} disabled={questionNumber === 1} leftSection={<IconChevronLeft size={16} />}>
          Previous
        </Button>
        <Button variant="subtle" onClick={onNext} disabled={questionNumber === totalQuestions} rightSection={<IconArrowRight size={16} />}>
          Next
        </Button>
      </Group>
    </Stack>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

interface IExamResultsProps {
  readonly attempt: IExamAttempt;
  readonly examSet: IExamSet;
  readonly onRetake: () => void;
  readonly onBack: () => void;
}

/** Full results view: score ring, category breakdown, question review accordion. */
function ExamResults({ attempt, examSet, onRetake, onBack }: IExamResultsProps): React.JSX.Element {
  /** Whether to show all questions or only incorrect/unanswered ones. */
  const [showAll, setShowAll] = useState(false);

  const questions = examSet.questions;
  const { percentage, passed, score, maxScore, timeTakenSeconds, categoryScores } = attempt;

  const formatDuration = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const reviewQuestions = showAll
    ? questions
    : questions.filter((q) => attempt.answers[q.id] !== q.correctIndex);

  return (
    <ScrollArea h="100%">
      <Stack gap="xl" p="md" maw={760} mx="auto">
        {/* Back + title */}
        <Group gap="xs">
          <ActionIcon variant="subtle" onClick={onBack} title="Back to hub">
            <IconChevronLeft size={18} />
          </ActionIcon>
          <Text fw={700} fz={18}>{examSet.title} Results</Text>
        </Group>

        {/* Score card */}
        <Card withBorder radius="md" p="xl">
          <Flex gap="xl" align="center" wrap="wrap" justify="center">
            <RingProgress
              size={160}
              thickness={14}
              roundCaps
              sections={[{ value: percentage, color: passed ? 'green' : 'red' }]}
              label={
                <Stack gap={2} align="center">
                  <Text fw={700} fz={28} c={passed ? 'green' : 'red'}>{percentage}%</Text>
                  <Text fz="xs" c="dimmed">score</Text>
                </Stack>
              }
            />
            <Stack gap="sm">
              <Badge
                size="xl"
                color={passed ? 'green' : 'red'}
                variant="light"
                leftSection={passed ? <IconTrophy size={16} /> : <IconX size={16} />}
              >
                {passed ? 'Passed' : 'Failed'}
              </Badge>
              <Stack gap={4}>
                <Group gap="xs">
                  <IconTarget size={14} />
                  <Text fz="sm">{score} / {maxScore} points</Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={14} />
                  <Text fz="sm">Time taken: {formatDuration(timeTakenSeconds)}</Text>
                </Group>
                <Group gap="xs">
                  <IconClipboardCheck size={14} />
                  <Text fz="sm">
                    Pass mark: {examSet.passThreshold}% ({Math.ceil((examSet.passThreshold / 100) * maxScore)} pts needed)
                  </Text>
                </Group>
              </Stack>
              <Group gap="xs" mt={4}>
                <Button size="xs" variant="light" color={examSet.color} leftSection={<IconRefresh size={14} />} onClick={onRetake}>
                  Retake
                </Button>
                <Button size="xs" variant="subtle" onClick={onBack}>All exams</Button>
              </Group>
            </Stack>
          </Flex>
        </Card>

        {/* Category breakdown */}
        <Stack gap="xs">
          <Text fw={600}>Category breakdown</Text>
          {Object.entries(categoryScores).map(([cat, { score: cs, maxScore: cm }]) => {
            const pct = Math.round((cs / cm) * 100);
            return (
              <Box key={cat}>
                <Group justify="space-between" mb={4}>
                  <Badge size="xs" color={CATEGORY_COLORS[cat as ExamCategory] ?? 'gray'} variant="light">{cat}</Badge>
                  <Text fz="xs" fw={600} c={pct >= 70 ? 'green' : 'red'}>
                    {cs}/{cm} pts ({pct}%)
                  </Text>
                </Group>
                <Progress value={pct} color={pct >= 70 ? 'green' : 'red'} size="sm" radius="xl" />
              </Box>
            );
          })}
        </Stack>

        <Divider />

        {/* Question review accordion */}
        <Group justify="space-between">
          <Text fw={600}>
            {showAll ? 'All questions' : `Incorrect / unanswered (${reviewQuestions.length})`}
          </Text>
          <Button size="xs" variant="subtle" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show incorrect only' : 'Show all questions'}
          </Button>
        </Group>

        {reviewQuestions.length === 0 && !showAll ? (
          <Alert color="green" icon={<IconTrophy size={16} />}>
            Perfect score — every question answered correctly!
          </Alert>
        ) : (
          <Accordion variant="separated" radius="md">
            {reviewQuestions.map((q, idx) => {
              const userAnswer = attempt.answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <Accordion.Item key={q.id} value={q.id}>
                  <Accordion.Control>
                    <Group gap="xs" wrap="nowrap">
                      {isCorrect ? (
                        <IconCheck size={16} color="var(--mantine-color-green-6)" style={{ flexShrink: 0 }} />
                      ) : (
                        <IconX size={16} color="var(--mantine-color-red-6)" style={{ flexShrink: 0 }} />
                      )}
                      <Text fz="sm" fw={500} style={{ lineHeight: 1.3 }}>
                        {idx + 1}. {q.question}
                      </Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <QuestionReviewCard question={q} userAnswer={userAnswer} />
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}

        {/* Per-set attempt history */}
        <HistorySection examSetId={examSet.id} />
      </Stack>
    </ScrollArea>
  );
}

// ── Question review card ──────────────────────────────────────────────────────

interface IQuestionReviewCardProps {
  readonly question: IExamQuestion;
  readonly userAnswer: number | undefined;
}

/** Renders answer options colour-coded by correctness plus an explanation alert. */
function QuestionReviewCard({ question, userAnswer }: IQuestionReviewCardProps): React.JSX.Element {
  return (
    <Stack gap="xs">
      {question.code && (
        <Box p="sm" style={{ backgroundColor: 'var(--mantine-color-dark-8)', borderRadius: 6 }}>
          <Text component="pre" fz="xs" c="gray.3" style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {question.code}
          </Text>
        </Box>
      )}
      <Stack gap={6}>
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isUserWrong = i === userAnswer && !isCorrect;
          return (
            <Group
              key={i}
              gap="sm"
              p="xs"
              style={{
                borderRadius: 6,
                borderLeft: `3px solid ${isCorrect ? 'var(--mantine-color-green-6)' : isUserWrong ? 'var(--mantine-color-red-6)' : 'transparent'}`,
                backgroundColor: isCorrect
                  ? 'var(--mantine-color-green-0)'
                  : isUserWrong
                    ? 'var(--mantine-color-red-0)'
                    : undefined,
              }}
            >
              {isCorrect ? (
                <IconCheck size={14} color="var(--mantine-color-green-6)" style={{ flexShrink: 0 }} />
              ) : isUserWrong ? (
                <IconX size={14} color="var(--mantine-color-red-6)" style={{ flexShrink: 0 }} />
              ) : (
                <Box w={14} />
              )}
              <Text fz="sm">{opt}</Text>
            </Group>
          );
        })}
      </Stack>
      {userAnswer === undefined && (
        <Alert color="yellow" icon={<IconAlertTriangle size={14} />} p="xs">Not answered</Alert>
      )}
      <Alert color="blue" icon={<IconClipboardCheck size={14} />} p="xs" mt={4}>
        <Text fz="sm">{question.explanation}</Text>
      </Alert>
    </Stack>
  );
}

// ── History section ───────────────────────────────────────────────────────────

interface IHistorySectionProps {
  readonly examSetId: string;
}

/** Attempt history table for a single exam set — shown only when 2+ attempts exist. */
function HistorySection({ examSetId }: IHistorySectionProps): React.JSX.Element {
  const { examAttempts } = useProgressStore();
  const setAttempts = examAttempts
    .filter((a) => a.examSetId === examSetId)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));

  if (setAttempts.length <= 1) return <></>;

  return (
    <Stack gap="xs">
      <Text fw={600}>Attempt history</Text>
      <Table withBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Score</Table.Th>
            <Table.Th>Result</Table.Th>
            <Table.Th>Time</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {setAttempts.map((a) => (
            <Table.Tr key={a.id}>
              <Table.Td><Text fz="xs">{new Date(a.completedAt).toLocaleString()}</Text></Table.Td>
              <Table.Td>
                <Text fz="xs" fw={600} c={a.passed ? 'green' : 'red'}>
                  {a.percentage}% ({a.score}/{a.maxScore})
                </Text>
              </Table.Td>
              <Table.Td>
                <Badge size="xs" color={a.passed ? 'green' : 'red'} variant="light">
                  {a.passed ? 'Passed' : 'Failed'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text fz="xs">{Math.floor(a.timeTakenSeconds / 60)}m {a.timeTakenSeconds % 60}s</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
