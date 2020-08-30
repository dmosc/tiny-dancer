import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';
import MainLayout from 'layouts/main';

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
    <MainLayout>
      <Switch>
        <Route path="/new-document" component={NewDocument} />
        <Route path="/sign-document" component={SignDocument} />
        <Redirect to="/new-document" />
      </Switch>
    </MainLayout>
  );
};

export default Main;
