import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
    >
      <Typography variant="h1" color="textPrimary">
        404
      </Typography>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Ooops!!
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        THAT PAGE DOESN’T EXIST OR IS UNAVAILABLE.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToHome}>
        Back To Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
