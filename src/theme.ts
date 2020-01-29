export const FontWeight = {
  default: 'normal',
  thin: 300,
  bold: 800,
};

export const FontSize = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 22,
  xl: 24,
};

export const LineHeight = {
  xs: '16px',
  sm: '18px',
  md: '19px',
  lg: '22px',
};

export const Palette = {
  default: '#27AE60',
  primary: '#638EFF',
  secondary: '#EB5757',
  gray: '#9E9E9E',
  white: '#FFFFFF',
  gold: '#FAF2BF',
  black: '#111111',
};

export const DefaultTheme = {
  palette: Palette,
  fontSize: FontSize,
  fontWeight: FontWeight,
  lineHeight: LineHeight,
} as {
  fontSize: typeof FontSize;
  fontWeight: typeof FontWeight;
  lineHeight: typeof LineHeight;
  palette: Record<keyof typeof Palette, string>;
};

export enum ThemeColor {
  Unset = 'gray',
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}

export interface ThemeProps {
  themeColor?: ThemeColor;
  theme: typeof DefaultTheme;
}
