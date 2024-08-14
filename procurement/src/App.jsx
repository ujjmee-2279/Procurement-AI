import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FrappeProvider } from 'frappe-react-sdk';
import PrivateRoutes from "./routes/private-routes";
import Login from "./auth/login";
import Register from "./auth/register";
import ForgetPassword from "./auth/forgot-password";
import Dashboard from "./dashboard";
import { Toaster } from "@/components/ui/toaster";

// ? EXPORT THE SITE URL 
export const SITE_URL = import.meta.env.VITE_FRAPPE_PATH || window.location.origin;



const App = () => {

	//? GET SITE NAME
	const getSiteName = () => {
		if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
			return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
		}
		return import.meta.env.VITE_SITE_NAME
	}


	return (
		<>
			<FrappeProvider
				socketPort={import.meta.env.VITE_SOCKET_PORT}
				siteName={getSiteName()}
				enableSocket={true}
				url={SITE_URL}
			>
				<Router>
					<Routes>

						{/* UNRESTRICTED ROUTES */}
						<Route path="/auth/login" element={<Login />} />
						<Route path="/auth/register" element={<Register />} />
						<Route path="/dashboard" element={<Dashboard />} />

					</Routes>
				</Router>
				<Toaster />
			</FrappeProvider>
		</>
	);
};

export default App;
