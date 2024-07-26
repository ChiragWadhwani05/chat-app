import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const listItems = {
    Profile: <PersonIcon />,
    Chats: <ChatIcon />,
    Requests: <PersonAddAlt1Icon />,
    Settings: <SettingsIcon />,
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        width: isOpen ? 200 : 60,
        flexShrink: 0,
        bgcolor: 'background.paper',
        padding: isOpen ? '16px' : '8px',
        transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out',
        overflowX: 'hidden',
      }}
    >
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsOpen(!isOpen)}
        sx={{ marginLeft: isOpen ? 'auto' : 0 }}
      >
        <MenuIcon />
      </IconButton>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {Object.keys(listItems).map((key, index) => (
          <ListItemButton
            key={key}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            sx={{
              minHeight: '48px', // Set a fixed height for each list item
              justifyContent: isOpen ? 'initial' : 'center',
              px: 2.5,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {listItems[key]}
            </ListItemIcon>
            {isOpen && <ListItemText primary={key} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
