import { createMuiTheme } from '@material-ui/core/styles';
import KenColors from './KenColors';
import { typography } from './base-theme';

export const overridings = {
  // for RTL
  // direction: 'rtl',
  name: 'Light Theme',
  KenColors,
  palette: {
    KenColors,
    primary: {
      light: KenColors.neutral700,
      main: KenColors.primary,
      dark: KenColors.neutral900,
      contrastText: '#fff',
    },
    secondary: {
      light: KenColors.shadowColor,
      main: KenColors.primary,
      dark: KenColors.secondaryPrime,
      contrastText: '#fff',
    },
  },
  typography,
};

export const createLightTheme = customization => {
  console.log(
    '==== ',
    customization?.palette?.primary || KenColors.primary,
    KenColors
  );
  const overrideTheme = {
    name: 'Light Theme',
    palette: {
      KenColors: { ...KenColors, ...(customization?.palette || {}) },
      primary: {
        light: KenColors.neutral700,
        main: customization?.palette?.primary || KenColors.primary,
        dark: KenColors.neutral900,
        contrastText: '#fff',
      },
      type: 'light',
      secondary: {
        light: KenColors.shadowColor,
        main: customization?.palette?.secondary || KenColors.secondaryPink1,
        dark: KenColors.secondaryPrime,
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: customization.fontFamily
        ? customization.fontFamily.join(',')
        : null,
    },
  };
  return createMuiTheme(overrideTheme);
};

export default createMuiTheme(overridings);
