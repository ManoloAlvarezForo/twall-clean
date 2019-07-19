import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuList from '@material-ui/core/MenuList';

const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      variant="outlined"
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
};

class DownshiftMultiple extends React.Component {
  state = {
    inputValue: '',
    selectedItem: []
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.filter(i => i.id === item.id).length === 0) {
      const { setItems } = this.props;
      selectedItem = [...selectedItem, item];
      setItems(selectedItem);
    }

    this.setState({
      inputValue: '',
      selectedItem
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const {
      classes,
      placeHolder,
      label,
      item,
      suggestions: Suggestions
    } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
        itemToString={itemTemp => (itemTemp ? itemTemp.name : '')}
      >
        {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(itemSelect => (
                  <Chip
                    key={itemSelect.id}
                    tabIndex={-1}
                    label={itemSelect.name}
                    className={classes.chip}
                    onDelete={this.handleDelete(itemSelect)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: placeHolder
              }),
              label
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                <MenuList>
                  <Suggestions
                    query={inputValue}
                    highlightedIndex={highlightedIndex}
                    selectedItem={selectedItem}
                    getItemProps={getItemProps}
                    item={item}
                  />
                </MenuList>
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  suggestions: PropTypes.instanceOf(Array),
  item: PropTypes.instanceOf(Object),
  setItems: PropTypes.func
};

DownshiftMultiple.defaultProps = {
  placeHolder: '',
  label: '',
  suggestions: [],
  item: {},
  setItems: () => {}
};
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 2
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    margin: '5px'
  },
  paper: {
    position: 'absolute',
    zIndex: 3,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight: '225px',
    overflow: 'auto'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    height: '27px'
  },
  inputRoot: {
    flexWrap: 'wrap',
    padding: '5px 5px 5px 12px'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const SelectMultipleComponent = props => {
  const { classes, placeHolder, suggestions, item, setItems, label } = props;
  return (
    <div className={classes.root}>
      <DownshiftMultiple
        classes={classes}
        placeHolder={placeHolder}
        label={label}
        suggestions={suggestions}
        item={item}
        setItems={setItems}
      />
    </div>
  );
};

SelectMultipleComponent.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  suggestions: PropTypes.instanceOf(Array),
  item: PropTypes.instanceOf(Object),
  setItems: PropTypes.func
};

SelectMultipleComponent.defaultProps = {
  placeHolder: '',
  label: '',
  suggestions: [],
  item: {},
  setItems: () => {}
};

export default withStyles(styles)(SelectMultipleComponent);
