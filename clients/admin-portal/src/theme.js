// src/theme.js
// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9A8C98', // purple-1
    },
    secondary: {
      main: '#D81159', // accent-pink
    },
    background: {
      default: '#F9F5E3', // body color of app
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A4E69', // purple-2
      secondary: '#22223B', // purple-3
    },
    error: {
      main: '#D81159', // accent-pink
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#4A4E69',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#4A4E69',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      color: '#4A4E69',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      color: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#9A8C98',
          '&:hover': {
            backgroundColor: '#4A4E69',
          },
        },
        containedSecondary: {
          backgroundColor: '#D81159',
          '&:hover': {
            backgroundColor: '#4A4E69',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#9A8C98',
            },
            '&:hover fieldset': {
              borderColor: '#4A4E69',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22223B',
            },
          },
        },
      },
    },
  },
});

export default theme;
