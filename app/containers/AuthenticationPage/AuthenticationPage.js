import React from 'react';

// Components.
import Authentication from '../../components/Authentication/Authentication';

class AuthenticationPage extends React.Component {
  render() {
    return <Authentication {...this.props} />;
  }
}

export default AuthenticationPage;
