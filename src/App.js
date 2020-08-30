import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useUser} from 'providers/user';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';
import Main from 'views/main';

const Auth = Loadable({
  loader: () => import('./views/auth'),
  loading: TopBarProgress,
});

const Login = Loadable({
  loader: () => import('./views/login'),
  loading: TopBarProgress,
});

const App = () => {
  const {token} = useUser();

  return (
    <>
      {!token ? (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/login" />
        </Switch>
      ) : (
        <Main />
      )}
    </>
  );
};

export default App;
