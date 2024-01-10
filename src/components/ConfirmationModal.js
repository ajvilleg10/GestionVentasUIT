import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';

const ConfirmationModal = ({ open, onClose, onAccept, title, description }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onAccept} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ConfirmationModal;
