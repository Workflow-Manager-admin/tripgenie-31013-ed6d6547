/**
 * ============================================================================
 *  Generated/curated by Kavia AI: App.jsx - Main Root Application Component
 *  Handles the overall page styling, theme switch, and launches the Hero section.
 *  Fully commented for developer clarity.
 * ============================================================================
 */

import Hero from "./pages/Hero";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

/**
 * The App component sets dark/light theme and renders the home/landing section.
 * Theming is handled reactively via context (ThemeContext).
 */
function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Hero />
    </div>
  );
}

export default App;
