import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import AppSidebar from './components/AppSidebar';
import AppHeader from './components/AppHeader';

export default function AppLayout() {
  const [sidebarOpen, { toggle: toggleSidebar }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !sidebarOpen },
      }}
      padding={0}
    >
      <AppShell.Header>
        <AppHeader onToggleSidebar={toggleSidebar} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="md" mih="100%">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
