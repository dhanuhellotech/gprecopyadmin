import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './views/login/Login';
import theme from './themes';
import Routes from './routes';
import Snackbar from './ui-component/extended/Snackbar';
import NavigationScroll from './layout/NavigationScroll';
import Dashboard from './views/dashboard/Default';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

import {create} from 'jss';
import rtl from 'jss-rtl';

const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin]
});

const loadLocaleData = (locale) => {
    switch (locale) {
        default:
            return import('./utils/locals/en.json');
    }
};

const App = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
      // Perform authentication logic here (e.g., API call, validation)
      // For simplicity, we'll set isLoggedIn to true immediately upon login.
      setLoggedIn(true);
      history.push('/dashboard/default');
    };
  
    const customization = useSelector((state) => state.customization);
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(customization.locale).then((d) => {
            setMessages(d.default);
            setLoggedIn(customization)
            console.log(isLoggedIn)
        });
    }, [customization]);

    if (customization.rtlLayout) {
        document.querySelector('body').setAttribute('dir', 'rtl');
    }

    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <CacheProvider value={cacheRtl}>
                    {messages && (
                        <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
                            <StyledEngineProvider injectFirst>
                                <NavigationScroll>
                                    <ThemeProvider theme={theme(customization)}>
                                        <CssBaseline />
          
                                            <Routes />
                                            <Switch>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/dashboard/default">
    {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
</Route>

       
      </Switch>
                                            <Snackbar />
                                    </ThemeProvider>
                                </NavigationScroll>
                            </StyledEngineProvider>
                        </IntlProvider>
                    )}
                </CacheProvider>
            </StylesProvider>
        </React.Fragment>
    );
};

export default App;
