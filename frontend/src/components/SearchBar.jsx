import { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: '8px',
        backgroundColor: 'background.paper',
        borderRadius: '4px',
        boxShadow: 1,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchText && (
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default SearchBar;
