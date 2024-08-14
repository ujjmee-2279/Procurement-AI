import React, { createContext, useContext } from 'react';
import { FaUserGroup } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { IoMailOpenSharp } from "react-icons/io5";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const NumberCardContext = createContext();

// Number Card data with icon as a React component
const numberCardData = [
  { name: 'Vendors Available', count: 10000, icon: FaUserGroup, trendicon : FaArrowTrendDown },
  { name: 'Items Available', count: 15000, icon: FaBoxArchive, trendicon : FaArrowTrendUp },
  { name: 'Quotations Requested', count: 26, icon: IoMailOpenSharp, trendicon : FaArrowTrendDown }
];

// Context Provider component
export const NumberCardProvider = ({ children }) => {
  return (
    <NumberCardContext.Provider value={numberCardData}>
      {children}
    </NumberCardContext.Provider>
  );
};

// Custom hook to use the NumberCardContext
export const useNumbarCard = () => useContext(NumberCardContext);
