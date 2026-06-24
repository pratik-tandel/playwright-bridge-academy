import { Group, Text, ActionIcon, useMantineColorScheme, Box } from '@mantine/core';
import { IconMenu2, IconSun, IconMoon } from '@tabler/icons-react';

interface IAppHeaderProps {
  onToggleSidebar: () => void;
}

export default function AppHeader({ onToggleSidebar }: IAppHeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="sm">
        <ActionIcon variant="subtle" color="gray" size="lg" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <IconMenu2 size={20} />
        </ActionIcon>
        <Group gap="xs">
          <Text size="xl" fw={700} style={{ lineHeight: 1 }}>
            🎭
          </Text>
          <Box>
            <Text size="sm" fw={700} lh={1.2} c="violet">
              Playwright Bridge Academy
            </Text>
            <Text size="xs" c="dimmed" lh={1.2}>
              Manual QA → Automation Engineer
            </Text>
          </Box>
        </Group>
      </Group>

      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        onClick={() => toggleColorScheme()}
        aria-label="Toggle color scheme"
      >
        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Group>
  );
}
