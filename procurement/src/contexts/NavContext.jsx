import React, { createContext, useContext } from 'react';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { MdOutlineDataSaverOff } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoChatbubble } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

// Create a Context for the navigation
const NavContext = createContext();

// Navigation items with icon as a React component
const navItems = [
  { name: 'Dashboard', path: '/', icon: RiDashboardHorizontalFill },
  { name: 'Master', path: '/', icon: MdOutlineDataSaverOff },
  { name: 'Report', path: '/', icon: FaBookOpen },
  { name: 'Mail', path: '/', icon: MdEmail },
  { name: 'Chat', path: '/', icon: IoChatbubble },
  { name: 'Settings', path: '/', icon: IoSettings }
];

// Context Provider component
export const NavProvider = ({ children }) => {
  return (
    <NavContext.Provider value={navItems}>
      {children}
    </NavContext.Provider>
  );
};

// Custom hook to use the NavContext
export const useNav = () => useContext(NavContext);
