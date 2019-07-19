import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';

class CustomToolBar extends React.Component {
  openContentDialog = () => {
    const { openDialog, handleDialog } = this.props;
    openDialog('content', true);
    handleDialog('isNewApplicant', true);
  };

  render() {
    const { additional, title } = this.props;
    return (
      <Toolbar
        className="box-shadow-default"
        style={{ width: '100%', backgroundColor: '#6a738a' }}
      >
        <Typography variant="h6" style={{ color: 'white' }} noWrap>
          {title}
        </Typography>
        {additional}
      </Toolbar>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    overflow: 'hidden'
  },
  content: {
    flexGrow: 1,
    // padding: '0 24px',
    overflow: 'hidden'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
});

CustomToolBar.propTypes = {
  openDialog: PropTypes.func,
  handleDialog: PropTypes.func,
  title: PropTypes.string,
  additional: PropTypes.string
};

CustomToolBar.defaultProps = {
  openDialog: () => {},
  handleDialog: () => {},
  title: '',
  additional: ''
};

export default withStyles(styles, { withTheme: true })(CustomToolBar);
