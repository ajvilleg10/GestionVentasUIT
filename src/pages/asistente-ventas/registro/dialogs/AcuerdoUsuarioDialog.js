import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AcuerdoUsuarioDialog = ({ handleAcceptance }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const [embedURL] = useState('https://drive.google.com/file/d/1gxaj5fFBNzcoV06PT7Fcg4YyXLY-3Uzz/preview');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Acuerdo de usuario</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Acuerdo de usuario</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}></DialogContentText>
          <iframe src={embedURL} width="640" height="480" allow="autoplay" title="sample PDF"></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleAcceptance();
              handleClose();
            }}
          >
            Aceptar acuerdo de usuario
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AcuerdoUsuarioDialog.propTypes = {
  handleAcceptance: PropTypes.func
};

export default AcuerdoUsuarioDialog;
