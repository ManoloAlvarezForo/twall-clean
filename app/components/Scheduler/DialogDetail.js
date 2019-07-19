import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { FiX } from 'react-icons/fi';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';

/**
 * Dialog Detail Component.
 *
 * @param {Object} content Component for the Content.
 * @param {boolean} open Boolean to open/close the Dialog.
 * @param {func} setOpenDetailEventDialog Function to enable/disable the Dialog.
 * @param {Object} data Data for the Content Component.
 */
const DialogDetail = ({
  content: Content,
  open,
  setOpenDetailEventDialog,
  data
}) => {
  /**
   * Boolean to configue if is full with.
   */
  const [fullWidth] = useState(true);

  /**
   * String max with 'sm' small.
   */
  const [maxWidth] = useState('sm');

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={() => setOpenDetailEventDialog(false)}
      aria-labelledby="form-dialog-title"
    >
      <MuiDialogTitle disableTypography style={styles.dialogTitle}>
        <Typography style={styles.dialogTitleTypography} variant="h6">
          Calendar Event
        </Typography>
        <IconButton
          style={styles.dialogIconButton}
          aria-label="Close"
          onClick={() => setOpenDetailEventDialog(false)}
        >
          <FiX color="#afafaf" />
        </IconButton>
      </MuiDialogTitle>
      <Divider style={styles.divider} variant="inset" />
      <DialogContent style={styles.dialogContent}>
        <Content data={data} />
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  dialogTitle: {
    display: 'flex',
    flexDirection: 'row',
    padding: '3px 3px 3px 10px'
  },
  dialogTitleTypography: {
    display: 'flex',
    alignSelf: 'center'
  },
  dialogIconButton: {
    marginLeft: 'auto'
  },
  divider: {
    marginLeft: 0
  },
  dialogContent: {
    paddingTop: '20px'
  }
};

DialogDetail.propTypes = {
  content: PropTypes.instanceOf(Object),
  open: PropTypes.bool,
  setOpenDetailEventDialog: PropTypes.func,
  data: PropTypes.instanceOf(Object)
};

DialogDetail.defaultProps = {
  content: {},
  open: false,
  setOpenDetailEventDialog: () => {},
  data: {}
};

export default DialogDetail;
