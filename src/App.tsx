import React from 'react';
import './App.css';
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MiniDrawer } from './components/Drawer.component';
import './i18n';
import { rootReducer } from './reducers/Root.reducer';
import { LanguageDialog } from './components/LanguageDialog.component';
import { SimpleBackdrop } from './components/Backdrop.component';
import { DeviceDataDialog } from './components/DeviceDataDialog.component';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { pl, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { SiemensAccentTeal, SiemensAccentRed, SiemensAccentYellow, SiemensAccentBlue } from './utilities/SiemensColors.utility';

const store = createStore(rootReducer);

const themeLight = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: SiemensAccentTeal.light3,
      main: SiemensAccentTeal.light1,
      dark: SiemensAccentTeal.dark3,
      contrastText: '#fff',
    },
    secondary: {
      light: SiemensAccentRed.light4,
      main: SiemensAccentRed.light2,
      dark: SiemensAccentRed.dark3,
      contrastText: '#fff',
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: SiemensAccentYellow.light3,
      main: SiemensAccentYellow.dark6,
      dark: SiemensAccentYellow.dark3,
      contrastText: '#fff',
    },
    secondary: {
      light: SiemensAccentBlue.light6,
      main: SiemensAccentBlue.light3,
      dark: SiemensAccentBlue.dark4,
      contrastText: '#fff',
    },
  },
});

export const App = () => {
  const { i18n } = useTranslation();
  const [darkTheme, setDarkTheme] = React.useState<boolean>(localStorage.getItem('theme') === 'dark' ? true : false);

  const handleThemeChange = () => {
    if (darkTheme === true) {
      setDarkTheme(false)
      localStorage.setItem('theme', 'light')
    }
    else {
      setDarkTheme(true)
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={i18n.language === 'pl' ? pl : enUS}>
        <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
          <Provider store={store}>
            <Router>
              <MiniDrawer onThemeChange={handleThemeChange} />
            </Router>
            {/* temporary appearing components (popups) */}
            <LanguageDialog />
            <DeviceDataDialog />
            <SimpleBackdrop />
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}

export default App;
