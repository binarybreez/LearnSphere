import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6600', // Orange
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 8,
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000', // Black background for sidebar
          color: '#FFFFFF', // White text for sidebar
        },
      },
    },
  },
});

export default theme;

