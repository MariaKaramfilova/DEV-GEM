import React, { useState } from "react";
import { TextField, Button, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

type Props = {
  setGeneralSelectedIDE: (data: string) => string;
}
const SearchBar = ({ setGeneralSelectedIDE }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSelectedIDE, setSelectedIDE] = useState("All platforms");
  const navigate = useNavigate();
  

const handleSearch = () => {
  if (searchQuery.length > 0) {
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const encodedSearchSelectedIDE = encodeURIComponent(searchSelectedIDE);
    navigate(`/addons/search?search=${encodedSearchQuery}&searchSelectedIDE=${encodedSearchSelectedIDE}`);
    setSearchQuery("");
  }
};


  return (
    <>
      <div style={{ color: "black" }}>
        <h1 style={{ fontSize: '34px', fontWeight: 'normal', marginBottom: '25px', fontFamily: 'Roboto, sans-serif' }}>Find extensions to build an <br />app quickly and easily</h1>
        <h3 style={{ fontSize: '15px', fontWeight: 'normal', marginBottom: '25px', color: 'gray', fontFamily: 'Roboto, sans-serif' }}>Personalize your developer experience with CrafterKit Marketplace plugins adding even more features to your favorite CrafterKit IDE and team tools.</h3>
      </div>
      <div className="search-bar-container">
        <div className="search-bar" >
          <TextField
            variant="outlined"
            fullWidth
            size="medium"
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
              startAdornment: (
                <Select
                  value={searchSelectedIDE}
                  onChange={(e) => {setSelectedIDE(e.target.value)
                  setGeneralSelectedIDE(e.target.value)}}
                style={{border: 'none', color: 'white', backgroundColor: '#187bcd', marginTop: '5px' , marginBottom: '5px', marginRight: '10px'}}>
                  <MenuItem value="All platforms">All platforms</MenuItem>
                  <MenuItem value="IntelliJ-based IDEs">IntelliJ-based IDEs</MenuItem>
                  <MenuItem value="Visual Studio">Visual Studio</MenuItem>
                  <MenuItem value="Eclipse">Eclipse</MenuItem>
                  <MenuItem value="PyCharm<">PyCharm</MenuItem>
                  <MenuItem value="Visual Studio Code">
                    Visual Studio Code
                  </MenuItem>
                  <MenuItem value="Xcode">Xcode</MenuItem>
                </Select>
                ),
            }}
            style={{ width: '75%', marginLeft: '12.5%' }}/>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
