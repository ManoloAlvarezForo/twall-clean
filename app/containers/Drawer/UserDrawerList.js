import React from 'react';
// Icons
import { FiUsers, FiLogOut, FiCalendar } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';
import PropTypes from 'prop-types';
import ListItemWithIcon from './ListItemWithIcon';

const styles = {
  fontSize: {
    fontSize: '22px'
  }
};

const iconList = {
  users: FiUsers,
  events: FiCalendar,
  notifications: MdNotificationsNone,
  logout: FiLogOut
};

const options = [
  {
    name: 'Eventos',
    variant: 'events',
    path: '/scheduler'
  },
  {
    name: 'Logout',
    variant: 'logout',
    path: '/logout',
    action: () => {
      console.log('Logout');
    }
  }
];

class UserDrawerList extends React.Component {
  handleClick = option => {
    const { handleListItemClick } = this.props;
    handleListItemClick(option);
  };

  render() {
    const { selectedItem } = this.props;
    return (
      <React.Fragment>
        {options.map(option => (
          <ListItemWithIcon
            iconStyles={styles.fontSize}
            iconList={iconList}
            key={`${option.name}${option.variant}`}
            name={option.name}
            variant={option.variant}
            selectedItem={selectedItem}
            path={option.path}
            handleListItemClick={() => this.handleClick(option)}
          />
        ))}
      </React.Fragment>
    );
  }
}

UserDrawerList.propTypes = {
  handleListItemClick: PropTypes.func,
  selectedItem: PropTypes.string
};

UserDrawerList.defaultProps = {
  handleListItemClick: () => {},
  selectedItem: ''
};

export default UserDrawerList;
