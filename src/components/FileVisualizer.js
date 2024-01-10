import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const FileVisualizer = ({ data, accept, handleAcceptance, alt }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

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
    <>
      <Button disabled={!data.url} fullWidth variant="outlined" onClick={handleClickOpen('paper')}>{data.filename ?? alt}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{data.filename}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}></DialogContentText>
          <iframe src={data.url} width="640" height="480" allow="autoplay" title="sample PDF"></iframe>
        </DialogContent>
        <DialogActions>
          {accept ? (
            <>
              <Button
                onClick={() => {
                  handleAcceptance();
                  handleClose();
                }}
              >
                Aceptar
              </Button>
              <Button onClick={handleClose} color="error">
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} color="error">
              Cerrar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

FileVisualizer.propTypes = {
  data: PropTypes.object,
  accept: PropTypes.bool,
  alt: PropTypes.string,
  handleAcceptance: PropTypes.func
};

export default FileVisualizer;
