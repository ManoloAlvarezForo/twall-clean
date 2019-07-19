import React from 'react';
// Icons
import PropTypes from 'prop-types';
import ListItemWithIcon from './ListItemWithIcon';
import { drawerAppIconList, drawerAppOptions } from './DrawerAppListUtil';

const styles = {
  fontSize: {
    fontSize: '22px'
  }
};

export default class AppDrawerList extends React.Component {
  handleClick = option => {
    const { handleListItemClick } = this.props;
    handleListItemClick(option);
  };

  render() {
    const { selectedItem } = this.props;
    return (
      <React.Fragment>
        {drawerAppOptions.map(option => (
          <ListItemWithIcon
            iconStyles={styles.fontSize}
            iconList={drawerAppIconList}
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

AppDrawerList.propTypes = {
  selectedItem: PropTypes.string,
  handleListItemClick: PropTypes.func
};

AppDrawerList.defaultProps = {
  selectedItem: '',
  handleListItemClick: () => {}
};
