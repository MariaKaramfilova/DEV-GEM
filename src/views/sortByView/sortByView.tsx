import React, { useState } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

export default function SortByView({setSortBy}) {
  const [sortBy, setSortByForForm] = useState('');

  const handleChange = (event) => {
    setSortByForForm(event.target.value);
    setSortBy(event.target.value)
  };

  return (
    <FormControl style={{width: '150px'}}>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortBy}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value={"Name"}>Name</MenuItem>
        <MenuItem value={"Creator"}>Creator</MenuItem>
        <MenuItem value={"Tags"}>Tags</MenuItem>
        <MenuItem value={"Number of downloads(Asc)"}>Number of downloads(Asc)</MenuItem>
        <MenuItem value={"Number of downloads(Desc)"}>Number of downloads(Desc)</MenuItem>
        <MenuItem value={"Upload date(Asc)"}>Upload date(Asc)</MenuItem>
        <MenuItem value={"Upload date(Desc)"}>Upload date(Desc)</MenuItem>
      </Select>
    </FormControl>
  );
}
