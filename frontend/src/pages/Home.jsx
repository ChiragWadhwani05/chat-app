import { useSelector } from 'react-redux';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ChatList from '../components/ChatsList';
import ChatContainer from '../components/ChatContainer';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Home() {
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(user);
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100dvh',
        backgroundColor: 'black',
      }}
    >
      <Box sx={{ width: 370, backgroundColor: '#fff' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleClose}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Chats
              </Typography>
            </Toolbar>
          </AppBar>
          <ChatList />
        </Box>
      </Box>
      <ChatContainer />
    </Box>
  );
}

export default Home;
