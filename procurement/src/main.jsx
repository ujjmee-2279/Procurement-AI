import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SidebarProvider } from './contexts/SidebarContext.jsx';
import { NavProvider } from './contexts/NavContext.jsx';
import { NumberCardProvider } from './contexts/NumberCardContext.jsx';
import { VendorProvider } from './contexts/VendorContext.jsx';
import { CountryProvider } from './contexts/CountryContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NavProvider>
    <NumberCardProvider>
      <VendorProvider>
        <SidebarProvider>
          <CountryProvider>
            <App />
          </CountryProvider>
        </SidebarProvider>
      </VendorProvider>
    </NumberCardProvider>
  </NavProvider>
)