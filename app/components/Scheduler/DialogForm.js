import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const FormDialog = ({
  title,
  content: Content,
  dataModel,
  open,
  setOpenDialog,
  saveMutation: SaveMutation,
  month,
  year,
  locale,
  selectedDate
}) => {
  const [fullWidth] = useState(true);
  const [maxWidth] = useState('sm');
  const [data, setData] = useState(dataModel);

  return (
    <Dialog
      classes={{
        paper: 'dialog-height'
      }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Content selectedDate={selectedDate} setData={setData} />
      </DialogContent>
      <DialogActions style={{ margin: '25px' }}>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          Discard
        </Button>
        <SaveMutation
          data={data}
          setOpenDialog={setOpenDialog}
          month={month}
          year={year}
          locale={locale}
        />
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.instanceOf(Object),
  dataModel: PropTypes.instanceOf(Object),
  open: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  saveMutation: PropTypes.instanceOf(Object),
  month: PropTypes.string,
  year: PropTypes.string,
  locale: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Object)
};

FormDialog.defaultProps = {
  title: '',
  content: {},
  dataModel: {},
  open: false,
  setOpenDialog: () => {},
  saveMutation: {},
  month: '',
  year: '',
  locale: '',
  selectedDate: () => {}
};

export default FormDialog;
