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
      <div style={{ color: "black"}}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '25px', fontFamily: 'Roboto, sans-serif' }}>Find extensions to build an <br />app quickly and easily</h1>
        <h3 style={{ fontSize: '18px', fontWeight: 'normal', marginBottom: '25px', color: 'grey', fontFamily: 'Roboto, sans-serif' }}>Personalize your developer experience with CrafterKit Marketplace plugins adding even more features to your favorite CrafterKit IDE and team tools.</h3>
      </div>
      <div className="search-bar-container">
        <div className="search-bar" >
          <TextField
            label="Search extensions"
            variant="outlined"
            fullWidth
            size="medium" // Set size to small
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
            style={{ width: '75%', marginLeft: '12.5%' }}/>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
