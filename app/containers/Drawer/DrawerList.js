import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { withRouter } from 'react-router';
import Divider from '@material-ui/core/Divider';
import UserProfileItem from './UserProfileItem';
import AppDrawerList from './AppDrawerList';
import UserDrawerList from './UserDrawerList';

class DrawerList extends React.Component {
  constructor(props) {
    super(props);
    const {
      history: {
        location: { pathname }
      }
    } = this.props;
    this.state = {
      selectedItem: pathname
    };
  }

  handleListItemClick = option => {
    if (option.action !== undefined) {
      option.action();
    } else {
      this.setState({ selectedItem: option.path });
      const { history, changeTitle } = this.props;
      history.push(option.path);
      changeTitle(option.name);
    }
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <List>
        <UserProfileItem
          name="Manolo Alvarez"
          selectedItem={selectedItem}
          handleListItemClick={this.handleListItemClick}
        />
        <Divider />
        <AppDrawerList
          selectedItem={selectedItem}
          handleListItemClick={this.handleListItemClick}
        />
        <Divider />
        <UserDrawerList
          selectedItem={selectedItem}
          handleListItemClick={this.handleListItemClick}
        />
      </List>
    );
  }
}

DrawerList.propTypes = {
  history: PropTypes.instanceOf(Object),
  changeTitle: PropTypes.func
};

DrawerList.defaultProps = {
  history: {},
  changeTitle: () => {}
};

export default withRouter(DrawerList);
