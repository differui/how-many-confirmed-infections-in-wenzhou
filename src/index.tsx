import 'normalize.css/normalize.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Async from 'react-async';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './i18n';
import { GlobalStyle } from './components/GlobalStyle';
import { Home } from './webviews/Home';
import { Error } from './webviews/Error';
import { RouteType } from './enums';
import { BASENAME } from './settings';
import { DefaultTheme } from './theme';
import { getLatestStatistics } from './services/isaaclin';
import { IsaaclinProvider } from './providers/isaaclin';
import { Loading } from './webviews/Loading';

function App() {
  const UI = ({ children }: { children?: React.ReactNode }) => {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={DefaultTheme}>{children}</ThemeProvider>
      </>
    );
  };

  return (
    <Async promiseFn={getLatestStatistics}>
      {({ data, error, isLoading }) => {
        if (data) {
          return (
            <IsaaclinProvider value={data!}>
              <UI>
                <Switch>
                  <Route path={RouteType.Home} component={Home} exact />
                  <Route path={RouteType.Error} component={Error} exact />
                </Switch>
              </UI>
            </IsaaclinProvider>
          );
        }
        if (isLoading) {
          return (
            <UI>
              <Loading />
            </UI>
          );
        }
        if (error) {
          return (
            <UI>
              <Error message={error.message} />
            </UI>
          );
        }
        return <UI></UI>;
      }}
    </Async>
  );
}

window.addEventListener('load', () =>
  ReactDOM.render(
    <Suspense fallback={''}>
      <HashRouter basename={BASENAME}>
        <App />
      </HashRouter>
    </Suspense>,
    document.getElementById('root')
  )
);
