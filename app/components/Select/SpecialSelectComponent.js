import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { FiImage } from 'react-icons/fi';

const ProductMenuItem = ({ product, selectedItemEvent }) => {
  const onClickItem = newProduct => {
    selectedItemEvent(newProduct);
  };

  return (
    <MenuItem onClick={() => onClickItem(product)}>
      <Avatar>
        <FiImage />
      </Avatar>
      <ListItemText
        primary={`${product.productName} - Precio: ${product.price} Bs.`}
        secondary={`Code: ${product.productId} / ${product.description}`}
      />
    </MenuItem>
  );
};

ProductMenuItem.propTypes = {
  product: PropTypes.instanceOf(Object),
  selectedItemEvent: PropTypes.func
};

ProductMenuItem.defaultProps = {
  product: {},
  selectedItemEvent: () => {}
};

const SpecialSelectComponent = ({
  label,
  placeholder,
  addItems,
  suggestions: Suggestions
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTextField, setSelectedTextField] = useState('');
  const anchorEl = React.useRef(null);

  const onChangeHandle = event => {
    setOpen(true);
    setSelectedTextField(event.target.value);
  };

  const handleClose = () => {
    setSelectedTextField('');
    setOpen(false);
  };

  const clickItemHandle = item => {
    addItems(item);
    setOpen(false);
    setSelectedTextField('');
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <TextField
        onChange={onChangeHandle}
        value={selectedTextField}
        id="outlined-full-width"
        label={label}
        style={{ margin: 5, width: 'auto' }}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />

      <Popper
        style={styles.menu}
        open={open}
        anchorEl={anchorEl.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <Suggestions
                    query={selectedTextField}
                    item={ProductMenuItem}
                    selectedItemEvent={clickItemHandle}
                  />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const styles = {
  menu: {
    position: 'absolute',
    zIndex: 3,
    top: '55px',
    overflow: 'auto',
    width: '100%',
    height: '350px'
  }
};

SpecialSelectComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  addItems: PropTypes.func,
  suggestions: PropTypes.instanceOf(Array)
};

SpecialSelectComponent.defaultProps = {
  label: '',
  placeholder: '',
  addItems: () => {},
  suggestions: []
};

export default SpecialSelectComponent;
