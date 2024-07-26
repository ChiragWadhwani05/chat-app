import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../redux-slices/chats';
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    margin: '10px 10px',
    '& fieldset': {
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 10px',
  },
});

const GlassEffectListItem = styled(ListItem)({
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.1)',
  transition: 'background 0.3s, backdrop-filter 0.3s',
  '&:hover': {
    background: '#e5e5e5',
    backdropFilter: 'blur(10px)',
  },
});
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 40,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const messages = [
  {
    id: 1,
    avatar: 'path-to-avatar1.png',
    title: 'Offer Box 2.0',
    subtitle: 'Loot 301 https://amzn.to/3W0b1og',
    timestamp: '16:48',
    badgeCount: 926,
  },
  {
    id: 2,
    avatar: 'path-to-avatar2.png',
    title: 'Offerzone 3.0',
    subtitle: 'Vega Hair Dryer at 415. https://fkrt.co/abcd',
    timestamp: '16:46',
    badgeCount: 445,
  },
  {
    id: 3,
    avatar: 'path-to-avatar3.png',
    title: 'DealsClub Loot Deals (Offers) DealsClub Loot Deals (Offers)',
    subtitle:
      'Myntra | Shirts From Rs 179 https://myntra.com/efgh DealsClub Loot Deals (Offers)',
    timestamp: '12:29',
    badgeCount: 73,
  },
  {
    id: 4,
    avatar: 'path-to-avatar4.png',
    title: 'Offerzone 2.0',
    subtitle: 'Medibuddy Loot 🔥 70% Off On Full',
    timestamp: '00:37',
    badgeCount: 9,
  },
];

export default function ChatsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  const [selectedChatId, setSelectedChatId] = useState(null);
  const { chats } = useSelector((state) => state.chat);

  return (
    <Box sx={{ flexGrow: 1, margin: 0 }}>
      <StyledTextField
        placeholder="Search"
        variant="outlined"
        sx={{ width: '100%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List>
        {chats && chats.length > 0 ? (
          chats.map((message) => (
            <GlassEffectListItem
              key={message.id}
              alignItems="flex-start"
              onClick={() => setSelectedChatId(message.id)}
            >
              <ListItemAvatar>
                <Avatar alt={message.title} src={message.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" noWrap sx={{ width: '80%' }}>
                      {message.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 'auto' }}
                    >
                      {message.timeStamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    noWrap
                    sx={{ width: '80%' }}
                  >
                    {message.lastMessage}
                  </Typography>
                }
              />
              <StyledBadge badgeContent={message.badgeCount} color="primary" />
            </GlassEffectListItem>
          ))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            No Chats Available
          </Typography>
        )}
      </List>
    </Box>
  );
}
