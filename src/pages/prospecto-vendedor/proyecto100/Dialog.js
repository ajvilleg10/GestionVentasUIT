import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@mui/material';

import ConfirmationModal from 'components/ConfirmationModal';

const ContactosEnviadosDialog = ({ onOpenDialog, isProyecto100Enviado, confirmationOpen, onCloseConfirmation }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    try {
      const openV = await onOpenDialog();
      setOpen(openV);
    } catch (error) {
      console.error('Error al enviar los contactos', error);
    }
  };

  return (
    <div>
      {!isProyecto100Enviado ? (
        <Button variant="contained" onClick={handleClickOpen} disabled={false}>
          Enviar
        </Button>
      ) : (
        <Button variant="contained" disabled={true}>
          Enviar
        </Button>
      )}
        <ConfirmationModal
        open={confirmationOpen}
        onClose={onCloseConfirmation}
        onAccept={handleClickOpen}
        title="Confirmación"
        description="¿Desea enviar el formulario de proyecto 100?"
      />
      {/*<Dialog
        open={confirmationOpen}
        onClose={onCloseConfirmation}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirmar envío</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            ¿Desea enviar el formulario de proyecto 100?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCloseConfirmation}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClickOpen} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle id="alert-dialog-title">Proyecto 100</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Contactos enviados con éxito.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Box>
    </Dialog>*/}
    </div>
  );
};

ContactosEnviadosDialog.propTypes = {
  onOpenDialog: PropTypes.func,
  isProyecto100Enviado: PropTypes.bool,
  confirmationOpen: PropTypes.bool,
  onCloseConfirmation: PropTypes.func
};

export default ContactosEnviadosDialog;
