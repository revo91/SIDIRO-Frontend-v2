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

const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#41aaaa',
      main: '#009999',
      dark: '#00646e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
});

export const App = () => {
  const { i18n } = useTranslation();
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={i18n.language === 'pl' ? pl : enUS}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <MiniDrawer />
            </Router>
            {/* temporary appearing components (popups) */}
            <LanguageDialog />
            <DeviceDataDialog/>
            <SimpleBackdrop />
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}

export default App;
