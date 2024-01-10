import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';

const ContactosEnviadosDialog = ({ onOpenDialog, isProyecto100Enviado }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onOpenDialog();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!isProyecto100Enviado ? (
        <Button variant="contained" onClick={handleClickOpen}>
          Enviar
        </Button>
      ) : (
        <Button variant="contained" disabled={true}>
          Enviar
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle id="alert-dialog-title">Proyecto 100</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Contactos enviados con exito.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

ContactosEnviadosDialog.propTypes = {
  onOpenDialog: PropTypes.func,
  isProyecto100Enviado: PropTypes.bool
};

export default ContactosEnviadosDialog;
