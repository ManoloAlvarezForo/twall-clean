import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

const CustomMenuItem = ({
  suggestion,
  itemAvatar: ItemWithAvatar,
  getItemProps
}) => {
  return (
    <MenuItem
      {...getItemProps({
        item: {
          name: `${suggestion.name} ${suggestion.lastName}`,
          id: suggestion.id
        }
      })}
      component="div"
    >
      <ItemWithAvatar
        avatar={suggestion.avatar}
        title={`${suggestion.name} ${suggestion.lastName}`}
      />
    </MenuItem>
  );
};

CustomMenuItem.propTypes = {
  suggestion: PropTypes.instanceOf(Object),
  itemAvatar: PropTypes.instanceOf(Object),
  getItemProps: PropTypes.func
};

CustomMenuItem.defaultProps = {
  suggestion: {},
  itemAvatar: {},
  getItemProps: () => {}
};

export default CustomMenuItem;
