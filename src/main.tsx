import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'highlight.js/styles/github-dark.css';
import { router } from './routes/app.routes';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, monospace',
  primaryColor: 'violet',
  defaultRadius: 'md',
  cursorType: 'pointer',
  colors: {
    violet: [
      '#f5f0ff',
      '#e9dfff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7c3aed',
      '#6d28d9',
      '#5b21b6',
      '#4c1d95',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
    },
    Badge: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
