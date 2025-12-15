'use client';
import { createTheme } from '@mui/material/styles';
import localFont from 'next/font/local';

const minhaFonte = localFont({
  src: [
     {
      path: '../../public/fonts/SF-Pro-Rounded-Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-Medium.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#bceed9',
      main: '#00cf96',
      dark: '#00915b',
      contrastText: '#111111',
    },
    secondary: {
      light: '#f0bdd1',
      main: '#d95080',
      dark: '#ad3460',
      contrastText: '#111111',
    },
  },
  colorSchemes: { dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: minhaFonte.style.fontFamily,
    button: { textTransform: 'none', fontSize: '18px' },
  },
  components: {},
});

export default theme;
