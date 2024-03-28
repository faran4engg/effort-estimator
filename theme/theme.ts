'use client';

import { createTheme } from '@mantine/core';
import { brandPrimary, brandSecondary } from './colors';

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    brandPrimary,
    brandSecondary,
  },

  primaryColor: 'brandPrimary',
  // primaryShade: 7,
});
