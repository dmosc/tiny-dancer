import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';

const Auth = Loadable({
  loader: () => import('./views/auth'),
  loading: TopBarProgress,
});

const Main = Loadable({
  loader: () => import('./views/main'),
  loading: TopBarProgress,
});

const App = () => {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/main" component={Main} />
    </Switch>
  );
};

export default App;
