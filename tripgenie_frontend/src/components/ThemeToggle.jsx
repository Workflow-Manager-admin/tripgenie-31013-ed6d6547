// components/ThemeToggle.jsx

import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

/**
 * PUBLIC_INTERFACE
 * ThemeToggle
 * Toggles between dark/light themes using ThemeContext globally, 
 * and displays current mode for accessibility.
 *
 * @returns {JSX.Element} Theme toggle button
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={theme}
          onChange={() => setTheme(!theme)}
          aria-label="Toggle Dark Mode"
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-[#21BCBE] peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300"></div>
        <span className="ml-3 text-sm font-medium">
          {theme ? "Dark" : "Light"}
        </span>
      </label>
    </div>
  );
};

// ThemeToggle does not take props (theme comes from Context), 
// but PropTypes added here for possible future extension.
ThemeToggle.propTypes = {};

export default ThemeToggle;
