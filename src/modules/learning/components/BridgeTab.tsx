import { Stack, Card, Title, Text, Group, Box, Badge, Timeline } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import type { ILesson } from '../../../types';

const STEP_COLORS: Record<string, string> = {
  red: 'var(--mantine-color-red-6)',
  yellow: 'var(--mantine-color-yellow-6)',
  green: 'var(--mantine-color-green-6)',
  blue: 'var(--mantine-color-blue-6)',
  violet: 'var(--mantine-color-violet-6)',
};

interface IBridgeTabProps {
  lesson: ILesson;
}

export default function BridgeTab({ lesson }: IBridgeTabProps) {
  const { content } = lesson;

  return (
    <Stack gap="lg">
      {/* Bridge Explanation */}
      <Card p="lg" withBorder style={{ background: 'var(--mantine-color-violet-0)' }}>
        <Group gap="sm" mb="sm">
          <Text size="xl">🌉</Text>
          <Title order={5} c="violet">The Bridge</Title>
        </Group>
        <Text size="sm">{content.bridgeExplanation}</Text>
      </Card>

      {/* Bridge Steps */}
      <Card p="lg" withBorder>
        <Title order={5} mb="lg">From Manual → JavaScript → Playwright</Title>

        <Timeline active={content.bridgeSteps.length} bulletSize={28} lineWidth={2}>
          {content.bridgeSteps.map((step, index) => (
            <Timeline.Item
              key={step.step}
              bullet={
                <Text size="xs" fw={700} c="white">
                  {step.step}
                </Text>
              }
              title={
                <Group gap="sm">
                  <Badge color={step.color} variant="filled" size="sm">
                    {step.label}
                  </Badge>
                  <Text size="sm" fw={600}>{step.description}</Text>
                </Group>
              }
            >
              <Box
                mt="xs"
                p="sm"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  background: 'var(--mantine-color-dark-7)',
                  color: '#e2e8f0',
                  borderRadius: 6,
                  whiteSpace: 'pre',
                  overflow: 'auto',
                  borderLeft: `3px solid ${STEP_COLORS[step.color] ?? STEP_COLORS.blue}`,
                }}
              >
                {step.code}
              </Box>
              {index < content.bridgeSteps.length - 1 && (
                <Group gap="xs" mt="xs" c="dimmed">
                  <IconArrowRight size={14} />
                  <Text size="xs">transforms into</Text>
                </Group>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      {/* Visual Mapping */}
      <Card p="lg" withBorder>
        <Title order={5} mb="md">Concept Mapping</Title>
        <Group gap="md" justify="center" wrap="wrap">
          <Box style={{ textAlign: 'center', minWidth: 140 }}>
            <Text size="2rem" mb={4}>🔍</Text>
            <Text fw={600} size="sm">Manual Testing</Text>
            <Text size="xs" c="dimmed">What you already know</Text>
          </Box>
          <IconArrowRight size={24} color="var(--mantine-color-violet-5)" />
          <Box style={{ textAlign: 'center', minWidth: 140 }}>
            <Text size="2rem" mb={4}>⚡</Text>
            <Text fw={600} size="sm">JavaScript</Text>
            <Text size="xs" c="dimmed">The language bridge</Text>
          </Box>
          <IconArrowRight size={24} color="var(--mantine-color-violet-5)" />
          <Box style={{ textAlign: 'center', minWidth: 140 }}>
            <Text size="2rem" mb={4}>🎭</Text>
            <Text fw={600} size="sm">Playwright</Text>
            <Text size="xs" c="dimmed">Automation in code</Text>
          </Box>
        </Group>
      </Card>

      {/* Key Insight */}
      <Card p="lg" withBorder style={{ borderLeft: '4px solid var(--mantine-color-violet-5)' }}>
        <Group gap="sm" mb="sm">
          <Text size="xl">💡</Text>
          <Title order={5}>Key Insight</Title>
        </Group>
        <Text size="sm" c="dimmed">
          Every Playwright action maps directly to something you already do as a manual tester. The code is just a precise, repeatable way to express those same testing steps.
        </Text>
      </Card>
    </Stack>
  );
}
