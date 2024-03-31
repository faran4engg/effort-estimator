'use client';

import { createTheme } from '@mantine/core';
import { brandPrimary, brandSecondary } from './colors';

export const theme = createTheme({
  /* Put your mantine theme override here */
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    '3xl': '1600px',
  },
  colors: {
    brandPrimary,
    brandSecondary,
  },

  primaryColor: 'brandPrimary',
  // primaryShade: 7,
});
