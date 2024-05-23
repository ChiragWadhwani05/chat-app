import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getSelf } from './redux-slices/auth';
import ProtectRoute from './components/Protectroute';
import { useEffect } from 'react';
import { lightTheme } from './constants/themes';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Loader from './components/Loader';
import Home from './pages/Home';
function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getSelf());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute redirectTo="/signin">
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectRoute isPublic={true} redirectTo="/">
                <SignIn />
              </ProtectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectRoute isPublic={true} redirectTo="/">
                <SignUp />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default App;
