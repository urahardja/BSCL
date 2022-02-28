import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../../hooks/use-auth';

const PrivateRoute = ({ component: Component, redirectTo, ...restOfProps }) => {
  const auth = useAuth();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        auth.state ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func
  ]),
  redirectTo: PropTypes.string
};

PrivateRoute.defaultProps = {
  redirectTo: '/'
};

export default PrivateRoute;
