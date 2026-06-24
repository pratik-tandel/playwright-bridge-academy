import { Stack, Card, Text, Title, Box, Group, Code, Divider, Badge } from '@mantine/core';
import { IconEye, IconCode, IconBrandJavascript, IconBrandTypescript } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { ILesson } from '../../../types';

interface ITheoryTabProps {
  lesson: ILesson;
}

export default function TheoryTab({ lesson }: ITheoryTabProps) {
  const { content } = lesson;

  return (
    <Stack gap="lg">
      {/* Manual Scenario */}
      <Card p="lg" withBorder style={{ borderLeft: '4px solid var(--mantine-color-blue-5)' }}>
        <Group gap="sm" mb="sm">
          <IconEye size={18} color="var(--mantine-color-blue-6)" />
          <Title order={5} c="blue">Manual Testing Scenario</Title>
        </Group>
        <Box>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content.manualScenario}</ReactMarkdown>
        </Box>
      </Card>

      {/* Why JavaScript */}
      <Card p="lg" withBorder style={{ borderLeft: '4px solid var(--mantine-color-yellow-5)' }}>
        <Group gap="sm" mb="sm">
          <IconBrandJavascript size={18} color="var(--mantine-color-yellow-6)" />
          <Title order={5} c="yellow">Why JavaScript?</Title>
        </Group>
        <Text size="sm">{content.whyJavaScript}</Text>
      </Card>

      {/* Theory Content */}
      <Card p="lg" withBorder>
        <Group gap="sm" mb="md">
          <IconBrandTypescript size={18} color="var(--mantine-color-blue-6)" />
          <Title order={5}>Theory</Title>
        </Group>
        <Box className="markdown-content">
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>{content.theory}</ReactMarkdown>
        </Box>
      </Card>

      <Divider label="Code Examples" labelPosition="left" />

      {/* JavaScript Code */}
      <Card p="lg" withBorder>
        <Group gap="sm" mb="md">
          <Badge color="yellow" variant="light" leftSection={<IconCode size={12} />}>JavaScript</Badge>
          <Text size="sm" c="dimmed">Core concept</Text>
        </Group>
        <Box
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            background: 'var(--mantine-color-dark-8)',
            color: '#e2e8f0',
            borderRadius: 8,
            padding: '16px',
            overflow: 'auto',
            whiteSpace: 'pre',
          }}
        >
          {content.jsCode}
        </Box>
      </Card>

      {/* Playwright Code */}
      <Card p="lg" withBorder>
        <Group gap="sm" mb="md">
          <Badge color="green" variant="light" leftSection={<Code style={{ fontSize: 11 }}>🎭</Code>}>Playwright</Badge>
          <Text size="sm" c="dimmed">In a real test</Text>
        </Group>
        <Box
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            background: 'var(--mantine-color-dark-8)',
            color: '#e2e8f0',
            borderRadius: 8,
            padding: '16px',
            overflow: 'auto',
            whiteSpace: 'pre',
          }}
        >
          {content.playwrightCode}
        </Box>
      </Card>
    </Stack>
  );
}
