import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
    secondary: { main: '#ef3f40' },
    text: {
      primary: 'black',
      secondary: 'lightgrey',
    },
    background: { default: 'rgb(240,69,69)' },
  },
  shape: {
    borderRadius: 5,
  },
});
