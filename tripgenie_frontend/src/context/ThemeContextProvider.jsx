/**
 * Kavia AI Documentation:
 * ThemeContextProvider.jsx - React context provider for theme state.
 * 
 * Purpose:
 * - Manages global dark/light mode across the app via React Context.
 * - Modifies the HTML root's class for Tailwind-based theming when the state changes.
 * - Provides 'theme' boolean and 'setTheme' toggle function to descendants.
 * 
 * Usage:
 * - Wraps app root; any child can access or change the theme.
 */
import ThemeContext from './ThemeContext';
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
const ThemeContextProvider = ({ children }) => {
  // State: false = light, true = dark
  const [theme, setTheme] = useState(false);

  // Effect: when theme changes add/remove Tailwind 'dark' class on <html>
  useEffect(() => {
    const root = document.documentElement;

    if (theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// PropTypes for children node
ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContextProvider;
