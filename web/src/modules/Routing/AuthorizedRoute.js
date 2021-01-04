import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import { LOGIN_ROUTE } from '../../shared/const/routes.const';

const AuthorizedRoute = ({ component: Component, ...routeProps }) => {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  if (!authContext.isAuth) {
    return (
      <Redirect
        to={{
          pathname: LOGIN_ROUTE,
        }}
      />
    );
  }
  return (
    <Route
      {...routeProps}
      render={(routeComponentProps) => (
        // <AuthorizedLayout>
        <Component {...routeComponentProps} />
        // </AuthorizedLayout>
      )}
    />
  );
};

export default AuthorizedRoute;
