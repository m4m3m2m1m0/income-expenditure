import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={(routeComponentProps) => (
        // <PublicLayout>
        <Component {...routeComponentProps} />
        // </PublicLayout>
      )}
    />
  );
};

export default PublicRoute;
