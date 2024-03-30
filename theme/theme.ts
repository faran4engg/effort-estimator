'use client';

import { createTheme } from '@mantine/core';
import { brandPrimary, brandSecondary } from './colors';

export const theme = createTheme({
  /* Put your mantine theme override here */
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
    '2xl': '100em',
    '3xl': '120em',
  },
  colors: {
    brandPrimary,
    brandSecondary,
  },

  primaryColor: 'brandPrimary',
  // primaryShade: 7,
});
