import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {useUser} from 'providers/user';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';
import MainLayout from 'layouts/main';

const Auth = Loadable({
  loader: () => import('./views/auth'),
  loading: TopBarProgress,
});

const Login = Loadable({
  loader: () => import('./views/login'),
  loading: TopBarProgress,
});

const Pending = Loadable({
  loader: () => import('./views/pending'),
  loading: TopBarProgress,
});

const Signed = Loadable({
  loader: () => import('./views/signed'),
  loading: TopBarProgress,
});

const MyDocuments = Loadable({
  loader: () => import('./views/my-documents'),
  loading: TopBarProgress,
});

const NewDocument = Loadable({
  loader: () => import('./views/new-document'),
  loading: TopBarProgress,
});

const Document = Loadable({
  loader: () => import('./views/document'),
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
        <MainLayout>
          <Switch>
            <Route path="/pending" component={Pending} />
            <Route path="/signed" component={Signed} />
            <Route path="/my-documents" component={MyDocuments} />
            <Route path="/new-document" component={NewDocument} />
            <Route path="/documents/:documentId" component={Document} />
            <Redirect to="/new-document" />
          </Switch>
        </MainLayout>
      )}
    </>
  );
};

export default App;
