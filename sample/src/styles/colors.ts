import { Platform, PlatformColor } from 'react-native';

// Custom colors (fallback for when system colors are not available)
export const customColors = {
  background: '#FFFFFF',
  secondaryBackground: '#FFFFFF',
  label: '#000000',
  secondaryLabel: '#3C3C43',
  tertiaryLabel: '#8E8E93',
  separator: '#C6C6C8',
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',
  destructive: '#FF3B30',
};

// System colors
export const systemColors = {
  // iOS system colors
  ...(Platform.OS === 'ios' && {
    background: PlatformColor('systemBackground'),
    secondaryBackground: PlatformColor('secondarySystemBackground'),
    label: PlatformColor('label'),
    secondaryLabel: PlatformColor('secondaryLabel'),
    tertiaryLabel: PlatformColor('tertiaryLabel'),
    separator: PlatformColor('separator'),
    systemGray: PlatformColor('systemGray'),
    systemGray2: PlatformColor('systemGray2'),
    systemGray3: PlatformColor('systemGray3'),
    systemGray4: PlatformColor('systemGray4'),
    systemGray5: PlatformColor('systemGray5'),
    systemGray6: PlatformColor('systemGray6'),
    destructive: PlatformColor('systemRed'),
  }),
  // Android system colors
  ...(Platform.OS === 'android' && customColors),
};

// Export the appropriate colors based on platform
export const colors = Platform.OS === 'ios' || Platform.OS === 'android' ? systemColors : customColors;
