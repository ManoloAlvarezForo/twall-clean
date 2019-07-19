import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

class ListItemWithAvatar extends React.Component {
  render() {
    const { name, handleListItemClick } = this.props;
    return (
      <ListItem
        style={{ paddingLeft: '9px' }}
        button
        onClick={handleListItemClick}
      >
        <ListItemAvatar>
          <Avatar src="">u</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
    );
  }
}

ListItemWithAvatar.propTypes = {
  name: PropTypes.string,
  handleListItemClick: PropTypes.func
};

ListItemWithAvatar.defaultProps = {
  name: '',
  handleListItemClick: () => {}
};

export default ListItemWithAvatar;
