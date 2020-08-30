import React, {useContext} from 'react';
import UserProvider, {userContext} from './provider';

const useUser = () => useContext(userContext);

const withUser = (Component) => {
  const WithUserComponent = (props) => (
    <userContext.Consumer>
      {(state) => <Component {...props} auth={state} />}
    </userContext.Consumer>
  );

  if (Component.getInitialProps) {
    WithUserComponent.getInitialProps = Component.getInitialProps;
  }

  return WithUserComponent;
};

export {useUser, withUser, UserProvider};
