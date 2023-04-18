import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import configContext from '../utils/helpers/configHelper';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import LightTheme, { createLightTheme } from './themes/light-theme';
import DarkTheme, { createDarkTheme } from './themes/dark-theme';
import themeContext from '../utils/helpers/themeHelper';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(true);
  const changeTheme = val => {
    if (val !== undefined) {
      setTheme(val);
    } else {
      setTheme(!theme);
    }
  };
  const { config } = React.useContext(configContext);
  const lightTheme =
    config && config.customization
      ? createLightTheme(config.customization)
      : LightTheme;
  const darkTheme =
    config && config.customization
      ? createDarkTheme(config.customization)
      : DarkTheme;
  return (
    <themeContext.Provider value={{ changeTheme: changeTheme }}>
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={theme ? lightTheme : darkTheme}>
          <MuiThemeProvider theme={theme ? lightTheme : darkTheme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    </themeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default ThemeProvider;
