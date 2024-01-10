import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ContactosEnviadosDialog = ({ onOpenDialog, isProyecto100Enviado }) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {

    try {

      const openV = await onOpenDialog();
      setOpen(openV);

    } catch (error) {

      console.error('error al enviar los contactos', error);

    }

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
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle id="alert-dialog-title">Proyecto 100</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Contactos enviados con exito.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)} autoFocus>
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
