import { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, InputAdornment, IconButton, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux-slices/auth';
import axios from 'axios';

export default function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [data, setData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const timeoutRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const checkUsernameAvailability = async (username) => {
    if (username.length < 6 || username.length > 20) {
      return false;
    }
    // Replace with your actual API call
    const response = await axios.get(
      `https://chat-app-production-4500.up.railway.app/api/v1/user/is-username-available?username=${username}`
    );

    return response.data.success;
  };

  useEffect(() => {
    if (data.username === '') {
      setUsernameAvailable(null);
    }
    if (data.username) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(async () => {
        const available = await checkUsernameAvailability(data.username);
        setUsernameAvailable(available);
      }, 2000); // debounce delay
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data.username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(data));
    console.log(user);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHide = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon sx={{ color: 'primary.contrastText' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {usernameAvailable === null ? (
                    ''
                  ) : usernameAvailable ? (
                    <CheckCircleOutlineOutlinedIcon color="success" />
                  ) : (
                    <HighlightOffOutlinedIcon color="error" />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordHide}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 4 }}
            disabled={
              data.username === '' ||
              usernameAvailable === false ||
              data.password === '' ||
              data.email === ''
            }
          >
            Sign Up
          </Button>

          <Divider>OR</Divider>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              mt: 4,
              mb: 2,
              gap: 2,
            }}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </Box>
        <Typography component="h1" variant="body1">
          {'Already have an account? '}
          <Link to="/signin" variant="body1">
            {'Sign In'}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
