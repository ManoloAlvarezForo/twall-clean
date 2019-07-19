import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const ItemWithAvatar = ({ avatar, title }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      {avatar.length === 1 ? (
        <Avatar style={{ width: 35, height: 35 }}>
          {avatar === '' && title[0]}
        </Avatar>
      ) : (
        <Avatar src={avatar} style={{ margin: 10, width: 35, height: 35 }} />
      )}
      <Typography style={{ margin: '0px 10px' }} variant="body1">
        {title}
      </Typography>
    </div>
  );
};

ItemWithAvatar.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string
};

ItemWithAvatar.defaultProps = {
  title: 'None',
  avatar: ''
};

export default ItemWithAvatar;
