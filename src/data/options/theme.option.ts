import type { Option } from '@/utils/option';

export type Theme = 'dark' | 'light' | 'system';

export const Themes: Record<Theme, Option<Theme>> = {
  dark: { value: 'dark', label: 'Dark' },
  light: { value: 'light', label: 'Light' },
  system: { value: 'system', label: 'System' },
};

export const ThemesList = Object.values(Themes);
