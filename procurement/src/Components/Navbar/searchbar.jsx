import React from "react";
import TextField from '@mui/material/TextField';
import { useVendor } from '../../contexts/VendorContext.jsx';

const SearchBar = () => {
    const { setSearchTerm } = useVendor();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <TextField 
            id="filled-basic" 
            label="Search Item" 
            variant="filled" 
            className="w-3/4"
            onChange={handleSearchChange}
        />
    );
}

export default SearchBar;
