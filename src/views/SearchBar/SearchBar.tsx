import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <>
      <div style={{ color: "black" }}>
        <h1 style={{ fontSize: '34px', fontWeight: 'normal', marginBottom: '25px', fontFamily: 'Roboto, sans-serif' }}>Find extensions to build an <br />app quickly and easily</h1>
        <h3 style={{ fontSize: '15px', fontWeight: 'normal', marginBottom: '25px', color: 'gray', fontFamily: 'Roboto, sans-serif' }}>Personalize your developer experience with CrafterKit Marketplace plugins adding even more features to your favorite CrafterKit IDE and team tools.</h3>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <TextField
            label="Search extensions"
            variant="outlined"
            fullWidth
            size="small" // Set size to small
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleSearch}>
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
            style={{ width: '1100px', marginLeft: '90px' }}/>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
