import React from 'react';
import Searchbar from "./searchbar";
import Profile from "./profile";

const Navbar = () => {
    return (
        <div className='flex justify-between h-auto'>
            <Searchbar />
            <Profile />
        </div>
    )
}

export default Navbar