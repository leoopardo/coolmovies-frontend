'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#bceed9',
      main: '#00cf96',
      dark: '#00915b',
      contrastText: '#2f2f2f',
    },
    secondary: {
      light: '#f0bdd1',
      main: '#d95080',
      dark: '#ad3460',
      contrastText: '#fff',
    },
  },
  colorSchemes: { dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    button: { textTransform: 'none', fontSize: '18px' },
  },
  components: {},
});

export default theme;
