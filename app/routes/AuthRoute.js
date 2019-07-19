import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { AUTH_TOKEN } from '../constants/communication';
import IS_VALID_TOKEN from './AuthQueries';

const AuthRoute = ({
  component: Component,
  container: CustomContainer,
  ...rest
}) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const preValidation = (isAuth, props) => {
    if (!Component || !CustomContainer) {
      return <Redirect to="/" />;
    }
    if (isAuth === true) {
      return <CustomContainer {...props} body={Component} />;
    }
    return <Redirect to="/access" />;
  };
  return token ? (
    <Query
      query={IS_VALID_TOKEN}
      variables={{ token }}
      skipe={token === ''}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading) return <div />;
        if (error) return `Error to verify token!: ${error}`;
        const isAuth = data.isValidToken.isValid;
        return (
          <Route {...rest} render={props => preValidation(isAuth, props)} />
        );
      }}
    </Query>
  ) : (
    <Redirect to="/access" />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.instanceOf(Object),
  container: PropTypes.instanceOf(Object)
};

AuthRoute.defaultProps = {
  component: undefined,
  container: undefined
};

export default AuthRoute;
