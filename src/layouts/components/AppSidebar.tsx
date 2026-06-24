import { Stack, Text, NavLink, Progress, Badge, Group, ScrollArea, Divider, Box } from '@mantine/core';
import { IconLayoutDashboard, IconAward, IconChevronRight, IconCheck } from '@tabler/icons-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { modules } from '../../content';
import { useProgressStore } from '../../stores/progress.store';

const MODULE_ICONS: Record<string, string> = {
  'module-1': '🧱',
  'module-2': '⚡',
  'module-3': '🎭',
  'module-4': '🏛️',
};

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lessonId: activeLessonId } = useParams();
  const { getModuleProgress, getLessonProgress } = useProgressStore();

  return (
    <ScrollArea h="100%" type="auto">
      <Stack gap={0} p="xs">
        <NavLink
          label="Dashboard"
          leftSection={<IconLayoutDashboard size={16} />}
          active={location.pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
          style={{ borderRadius: 8 }}
          mb={4}
        />

        <Divider my="xs" label="Modules" labelPosition="left" />

        {modules.map((module) => {
          const lessonIds = module.lessons.map((l) => l.id);
          const { completed, total, percentage } = getModuleProgress(lessonIds);

          return (
            <Box key={module.id} mb={8}>
              <NavLink
                label={
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="xs" wrap="nowrap">
                      <Text size="sm">{MODULE_ICONS[module.id] ?? '📚'}</Text>
                      <Text size="sm" fw={600} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {module.title}
                      </Text>
                    </Group>
                    <Badge size="xs" variant="light" color={module.color} style={{ flexShrink: 0 }}>
                      {completed}/{total}
                    </Badge>
                  </Group>
                }
                rightSection={<IconChevronRight size={14} />}
                childrenOffset={8}
                defaultOpened={module.lessons.some((l) => l.id === activeLessonId)}
                style={{ borderRadius: 8 }}
              >
                {percentage > 0 && (
                  <Progress value={percentage} size="xs" color={module.color} mb={4} ml={8} mr={8} />
                )}
                {module.lessons.map((lesson) => {
                  const { completed: lessonDone } = getLessonProgress(lesson.id);
                  const isActive = lesson.id === activeLessonId;

                  return (
                    <NavLink
                      key={lesson.id}
                      label={
                        <Group gap="xs" wrap="nowrap">
                          {lessonDone ? (
                            <IconCheck size={12} color="var(--mantine-color-green-6)" style={{ flexShrink: 0 }} />
                          ) : (
                            <Text size="xs" c="dimmed" style={{ flexShrink: 0, width: 12, textAlign: 'center' }}>
                              {lesson.number}
                            </Text>
                          )}
                          <Text size="xs" style={{ lineHeight: 1.3 }}>
                            {lesson.title}
                          </Text>
                        </Group>
                      }
                      active={isActive}
                      onClick={() => navigate(`/lesson/${module.id}/${lesson.id}`)}
                      style={{ borderRadius: 6, paddingTop: 4, paddingBottom: 4 }}
                    />
                  );
                })}
              </NavLink>
            </Box>
          );
        })}

        <Divider my="xs" />

        <NavLink
          label="Certifications"
          leftSection={<IconAward size={16} />}
          active={location.pathname === '/certification'}
          onClick={() => navigate('/certification')}
          style={{ borderRadius: 8 }}
        />
      </Stack>
    </ScrollArea>
  );
}
