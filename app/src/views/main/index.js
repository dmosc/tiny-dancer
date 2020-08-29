import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';

const NewDocument = Loadable({
  loader: () => import('./components/new-document'),
  loading: TopBarProgress,
});

const SignDocument = Loadable({
  loader: () => import('./components/sign-document'),
  loading: TopBarProgress,
});

const Main = () => {
  return (
      <Switch>
        <Route exact path='/main/new-document' component={NewDocument}/>
        <Route exact path='/main/sign-document' component={SignDocument}/>
        <Redirect to='/main/new-document'/>
      </Switch>
  );
};

export default Main;