import ThemeContext from './ThemeContext'
import { useState } from 'react'
import PropTypes from 'prop-types';

const ThemeContextProvider = ({children}) => {

    const [theme, setTheme] = useState(false);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      );

}

ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContextProvider