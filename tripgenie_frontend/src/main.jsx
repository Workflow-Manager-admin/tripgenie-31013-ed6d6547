/**
 * Kavia AI Documentation:
 * main.jsx - Project root entrypoint for React/Vite.
 * 
 * Purpose:
 * - Bootstraps the React DOM into the #root element.
 * - Composes all top-level providers required by the app:
 *    - GoogleOAuthProvider: For Google sign-in integration.
 *    - ThemeContextProvider: For dark/light theming.
 *    - BrowserRouter: Manages SPA routes.
 *    - Toaster: For global notification popups.
 *    - Navbar/Footer: Shared navigation.
 * - Defines the core page routes: Home, Create Trip, View Trip, My Trips.
 */

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CreateTrip from "./pages/CreateTrip.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./pages/ViewTrip.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Footer from "./components/Footer.jsx";
import ThemeContextProvider from './context/ThemeContextProvider.jsx';

// PUBLIC_INTERFACE
createRoot(document.getElementById("root")).render(
    // Google sign-in provider (wraps the whole app)
    <GoogleOAuthProvider clientId="321384121089-6b9mq17pieeahi03ngj3dub106pf8asl.apps.googleusercontent.com">
      {/* Theme context for dark/light mode */}
      <ThemeContextProvider>
        {/* SPA router handles all views in client-side app */}
        <BrowserRouter>
          <Toaster />
          <Navbar />
          {/* App main content area and routing */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/view-trip/:tripId" element={<ViewTrip />} />
            <Route path="/my-trips" element={<MyTrips />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeContextProvider>
    </GoogleOAuthProvider>
);
