import React, { useState } from "react";
import { TextField, Button, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

type Props = {
  setGeneralSelectedIDE: (data: string) => string;
}
const SearchBar = ({ setGeneralSelectedIDE }: Props) => {
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
    <div>
      <div style={{ color: "black" }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '25px',
        }}>Find extensions to build an <br />app quickly and easily</h1>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'normal',
          marginBottom: '25px',
          color: 'grey',
        }}>Personalize your developer experience with DEV/GEM Marketplace plugins adding even more features to your favorite DEV/GEM IDE and team tools.</h3>
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
                    <SearchIcon style={{ color: '#1b74e4' }} />
                  </Button>
                </InputAdornment>
              ),
              startAdornment: (
                <Select
                  value={searchSelectedIDE}
                  onChange={(e) => {setSelectedIDE(e.target.value)
                  setGeneralSelectedIDE(e.target.value)}}
                style={{border: 'none', color: 'white', backgroundColor: '#1b74e4', marginTop: '5px' , marginBottom: '5px', marginRight: '10px'}}>
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
            style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
