import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

export default class CustomToolBar extends React.Component {
  render() {
    const { additional, title } = this.props;
    return (
      <AppBar position="static" style={{ background: 'none' }}>
        <Toolbar style={{ width: '100%' }}>
          <Typography
            variant="h6"
            style={{ color: 'white', width: '20%' }}
            noWrap
          >
            {title}
          </Typography>
          {additional}
        </Toolbar>
      </AppBar>
    );
  }
}

CustomToolBar.propTypes = {
  additional: PropTypes.string,
  title: PropTypes.string
};

CustomToolBar.defaultProps = {
  additional: '',
  title: ''
};
