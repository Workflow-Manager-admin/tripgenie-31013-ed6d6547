/**
 * Kavia AI Documentation:
 * App.jsx - Main application entry point.
 * - Applies theming (light/dark mode) using ThemeContext.
 * - Renders the Hero section (landing front page).
 */

import Hero from "./pages/Hero";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

// PUBLIC_INTERFACE
function App() {
  // Access the global theme mode from the ThemeContext.
  // 'theme' is boolean: true = dark mode, false = light mode
  const { theme } = useContext(ThemeContext);

  // Root container applies color style depending on theme.
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
      }`}
    >
      {/* The Hero section is the core landing/marketing UI */}
      <Hero />
    </div>
  );
}

export default App;
