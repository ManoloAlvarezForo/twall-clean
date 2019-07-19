import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FiLock, FiMail } from 'react-icons/fi';
import { Typography } from '@material-ui/core';
import { APP_NAME_SMALL, PLUS } from '../../constants/constants';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './AuthenticationMutations';
import { AUTH_TOKEN } from '../../constants/communication';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      name: ''
    };
  }

  confirm = async data => {
    const { login } = this.state;
    const { token } = login ? data.login : data.signup;
    const { history } = this.props;
    this.saveUserData(token);
    history.push('/');
  };

  saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    const { login, email, password, name } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <div className="title-logo" style={{ width: '50%' }}>
          <Typography
            style={{
              fontFamily: 'Pacifico',
              fontSize: '5rem',
              fontWeight: 'normal'
            }}
            component="h4"
            variant="h4"
            gutterBottom
          >
            {APP_NAME_SMALL}
          </Typography>
          <Typography
            style={{
              fontFamily: 'Pacifico',
              fontSize: '7rem',
              fontWeight: 'normal',
              color: '#e91e63'
            }}
            component="h4"
            variant="h4"
            gutterBottom
          >
            {PLUS}
          </Typography>
        </div>
        <div
          className="auth-container"
          style={{ height: '100%', width: '50%' }}
        >
          <div className="auth-form-container">
            <div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  margin: '60px 0'
                }}
                className="mv3"
              >
                <Typography
                  component="h4"
                  style={{ fontWeight: 'bold' }}
                  variant="h4"
                  gutterBottom
                >
                  Welcome
                </Typography>
              </div>
              <div
                className="space custom-input"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '20px 0'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      margin: '0 12px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FiMail style={{ fontSize: '24px', color: 'gray' }} />
                  </div>
                  <TextField
                    style={{ margin: '10px 0', width: '100%' }}
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                    label="Email"
                    variant="outlined"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      margin: '0 12px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FiLock style={{ fontSize: '24px', color: 'gray' }} />
                  </div>
                  <TextField
                    style={{
                      margin: '10px 0',
                      width: '100%',
                      borderRadius: '5px'
                    }}
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Mutation
                  mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                  variables={{ email, password, name }}
                  onCompleted={data => this.confirm(data)}
                >
                  {mutation => (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{ marginLeft: 'auto', color: 'white' }}
                      onClick={mutation}
                    >
                      LOGIN
                    </Button>
                  )}
                </Mutation>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 'auto'
              }}
            >
              <div
                style={{
                  marginTop: '30px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <Typography variant="caption">
                  Term of use. Privacy policy
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  history: PropTypes.instanceOf(Object)
};

Authentication.defaultProps = {
  history: {}
};
