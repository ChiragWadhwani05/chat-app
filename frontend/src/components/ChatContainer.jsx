import { Box, Typography } from '@mui/material';

const ChatContainer = () => {
  return (
    <Box
      bgcolor="white"
      padding="16px"
      flexGrow={1}
      sx={{ backgroundColor: '#f0f0f0' }}
    >
      <Typography variant="h6">Chat Container</Typography>
      {/* Add your chat container content here */}
    </Box>
  );
};

export default ChatContainer;
