import { alpha } from '@mui/material';

import { colors } from '@/theme/colors.theme';

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect rx="20" ry="20" width="${w}" height="${h}" fill="${alpha(
    colors.purple,
    0.2,
  )}" />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const decodeBase64 = (str: string) =>
  Buffer.from(str, 'base64').toString('utf8');
