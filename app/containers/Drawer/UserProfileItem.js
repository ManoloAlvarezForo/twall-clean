import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

class UserProfileItem extends React.Component {
  state = {
    option: {
      name: 'Profile',
      variant: 'profile',
      path: '/profile'
      // action: () => {
      //     console.log('Profile');
      // }
    }
  };

  handleClick = () => {
    const { handleListItemClick } = this.props;
    const { option } = this.state;
    handleListItemClick(option);
  };

  render() {
    const { name, selectedItem } = this.props;
    const { option } = this.state;
    return (
      <ListItem
        selected={selectedItem === option.path}
        style={{ paddingLeft: '9px' }}
        button
        onClick={this.handleClick}
      >
        <ListItemAvatar>
          <Avatar src="">u</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
    );
  }
}

UserProfileItem.propTypes = {
  handleListItemClick: PropTypes.func,
  name: PropTypes.string,
  selectedItem: PropTypes.string
};

UserProfileItem.defaultProps = {
  handleListItemClick: () => {},
  name: '',
  selectedItem: ''
};

export default UserProfileItem;
