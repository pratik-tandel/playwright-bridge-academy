import { Stack, Title, Text, SimpleGrid, Card, Group, Badge, Progress, Button, Box, RingProgress, Center, Divider, Alert } from '@mantine/core';
import { IconArrowRight, IconAward, IconCheck, IconPlayerPlay, IconInfoCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { modules, certificateDefinitions } from '../../content';
import { useProgressStore } from '../../stores/progress.store';

const MODULE_COLORS: Record<string, string> = {
  'module-1': 'blue',
  'module-2': 'yellow',
  'module-3': 'green',
  'module-4': 'violet',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { getModuleProgress, getLessonProgress, completedLessons, certificates } = useProgressStore();

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  // Find recommended next lesson
  function getNextLesson() {
    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        const { completed } = getLessonProgress(lesson.id);
        if (!completed) return { module: mod, lesson };
      }
    }
    return null;
  }

  const nextLesson = getNextLesson();
  const earnedCerts = Object.keys(certificates).length;

  return (
    <Stack gap="lg">
      {/* Welcome */}
      <Box>
        <Title order={2} mb={4}>
          Welcome to Playwright Bridge Academy 🎭
        </Title>
        <Text c="dimmed">Your journey from Manual QA to Automation Engineer</Text>
      </Box>

      {/* Overall Progress */}
      <Card p="lg">
        <Group justify="space-between" align="flex-start">
          <Box>
            <Text fw={600} size="lg" mb={4}>
              Overall Progress
            </Text>
            <Text c="dimmed" size="sm">
              {completedLessons.length} of {totalLessons} lessons completed
            </Text>
            {earnedCerts > 0 && (
              <Group gap="xs" mt={8}>
                <IconAward size={16} color="var(--mantine-color-violet-6)" />
                <Text size="sm" c="violet" fw={600}>
                  {earnedCerts} certificate{earnedCerts > 1 ? 's' : ''} earned!
                </Text>
              </Group>
            )}
          </Box>
          <RingProgress
            size={90}
            thickness={8}
            roundCaps
            sections={[{ value: overallPercentage, color: 'violet' }]}
            label={
              <Center>
                <Text fw={700} size="sm">
                  {overallPercentage}%
                </Text>
              </Center>
            }
          />
        </Group>
      </Card>

      {/* Next Lesson CTA */}
      {nextLesson && (
        <Alert
          icon={<IconPlayerPlay size={16} />}
          color="violet"
          variant="light"
          title="Continue Learning"
        >
          <Group justify="space-between" align="center">
            <Box>
              <Text size="sm">
                Next up: <strong>{nextLesson.lesson.title}</strong>
              </Text>
              <Text size="xs" c="dimmed">
                {nextLesson.module.title} · {nextLesson.lesson.durationMinutes} min
              </Text>
            </Box>
            <Button
              size="xs"
              rightSection={<IconArrowRight size={14} />}
              onClick={() => navigate(`/lesson/${nextLesson.module.id}/${nextLesson.lesson.id}`)}
            >
              Start
            </Button>
          </Group>
        </Alert>
      )}

      {nextLesson === null && (
        <Alert icon={<IconCheck size={16} />} color="green" title="All lessons completed! 🎉">
          <Group justify="space-between" align="center">
            <Text size="sm">You have completed every lesson. Check your certifications!</Text>
            <Button size="xs" color="green" onClick={() => navigate('/certification')}>
              View Certificates
            </Button>
          </Group>
        </Alert>
      )}

      <Divider label="Modules" labelPosition="left" />

      {/* Module Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {modules.map((module) => {
          const lessonIds = module.lessons.map((l) => l.id);
          const { completed, total, percentage } = getModuleProgress(lessonIds);
          const color = MODULE_COLORS[module.id] ?? 'gray';
          const cert = module.certificateId ? certificateDefinitions.find((c) => c.id === module.certificateId) : null;
          const certEarned = cert && certificates[cert.id];

          return (
            <Card key={module.id} p="lg" style={{ cursor: 'pointer' }} onClick={() => {
              const firstLesson = module.lessons[0];
              if (firstLesson) navigate(`/lesson/${module.id}/${firstLesson.id}`);
            }}>
              <Group justify="space-between" mb="sm">
                <Group gap="sm">
                  <Text size="xl">{module.icon}</Text>
                  <Box>
                    <Text fw={700} size="sm">
                      Module {module.number}
                    </Text>
                    <Text fw={600}>{module.title}</Text>
                  </Box>
                </Group>
                <Badge color={color} variant="light">
                  {completed}/{total}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                {module.description}
              </Text>

              <Progress value={percentage} size="sm" color={color} mb="xs" />
              <Text size="xs" c="dimmed">
                {percentage}% complete
              </Text>

              {cert && (
                <Group gap="xs" mt="sm">
                  <IconAward size={14} color={certEarned ? 'var(--mantine-color-yellow-6)' : 'var(--mantine-color-gray-5)'} />
                  <Text size="xs" c={certEarned ? 'yellow' : 'dimmed'}>
                    {cert.title} {certEarned ? '✓' : ''}
                  </Text>
                </Group>
              )}
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Certificate Preview */}
      <Divider label="Certificates" labelPosition="left" />
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        {certificateDefinitions.map((cert) => {
          const earned = certificates[cert.id];
          return (
            <Card
              key={cert.id}
              p="md"
              style={{
                background: earned ? cert.gradient : undefined,
                color: earned ? '#fff' : undefined,
                opacity: earned ? 1 : 0.6,
              }}
            >
              <Group gap="sm" mb="xs">
                <Text size="xl">{cert.icon}</Text>
                <Box>
                  <Text fw={700} size="sm" c={earned ? 'white' : undefined}>
                    {cert.title}
                  </Text>
                  <Text size="xs" c={earned ? 'rgba(255,255,255,0.8)' : 'dimmed'}>
                    {cert.subtitle}
                  </Text>
                </Box>
              </Group>
              {earned ? (
                <Badge color="white" variant="filled" c="violet" size="sm">
                  Earned ✓
                </Badge>
              ) : (
                <Text size="xs" c="dimmed">
                  Complete Module {cert.level + 1} with 80%+ quiz score
                </Text>
              )}
            </Card>
          );
        })}
      </SimpleGrid>

      {/* How it works */}
      <Card p="lg" bg="var(--mantine-color-violet-0)">
        <Group gap="sm" mb="sm">
          <IconInfoCircle size={18} color="var(--mantine-color-violet-6)" />
          <Text fw={600} c="violet">
            How Playwright Bridge Academy Works
          </Text>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 5 }} spacing="xs">
          {[
            { icon: '🔍', label: 'Manual Scenario', desc: 'Start with testing you already know' },
            { icon: '⚡', label: 'JS Concept', desc: 'Learn the JavaScript behind it' },
            { icon: '🎭', label: 'Playwright Code', desc: 'See the automation in action' },
            { icon: '🛝', label: 'Playground', desc: 'Experiment with live code' },
            { icon: '✅', label: 'Quiz', desc: 'Test your understanding' },
          ].map(({ icon, label, desc }) => (
            <Box key={label} style={{ textAlign: 'center' }}>
              <Text size="xl" mb={4}>{icon}</Text>
              <Text size="xs" fw={600}>{label}</Text>
              <Text size="xs" c="dimmed">{desc}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Card>
    </Stack>
  );
}
