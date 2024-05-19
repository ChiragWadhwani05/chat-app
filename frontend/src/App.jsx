import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from '@mui/material/colors';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    secondary: {
      main: '#757575',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#b0bec5',
      disabled: '#757575',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    divider: '#b0bec5',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      color: '#212121',
    },
    h2: {
      color: '#212121',
    },
  },
});

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: purple,
//     secondary: {
//       main: '#8687E780',
//       contrastText: '#ffffff',
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: '#b0bec5',
//       disabled: '#757575',
//     },
//     error: {
//       main: '#f44336',
//     },
//     warning: {
//       main: '#ffa726',
//     },
//     info: {
//       main: '#29b6f6',
//     },
//     success: {
//       main: '#66bb6a',
//     },
//     divider: '#b0bec5',
//   },
//   typography: {
//     fontFamily: 'Quicksand',
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//     h1: {
//       color: '#ffffff',
//     },
//     h2: {
//       color: '#ffffff',
//     },
//   },
// });

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default App;
