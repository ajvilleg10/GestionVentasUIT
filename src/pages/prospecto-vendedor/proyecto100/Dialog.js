import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';
import { openSnackbar } from 'store/reducers/snackbar';
import { dispatch } from 'store';

const ContactosEnviadosDialog = ({ isDisabled, enviarContactos }) => {

  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClick = async () => {

    setSubmitting(true);

    const enviados = await enviarContactos();
    if (!enviados) {
      setOpen(false);
      setSubmitting(false);
    } else setSent(enviados);

    setSubmitting(false);

  };

  const aceptarLogout = async () => {

    try {

      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });

    } catch (err) {

      console.log('Error al logout (proyecto 100)', err);

      dispatch(openSnackbar({
        open: true,
        variant: 'alert',
        message: 'Error al salir de la cuenta, por favor salir manualmente',
        alert: {
          color: 'error'
        },
        close: true
      }));

    } finally {

      setOpen(false);

    }

  };

  return (
    <>
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={() => setOpen(true)}
      >
        Enviar contactos
      </Button>

      <Dialog
        disableEscapeKeyDown
        open={open}
        onClick={null}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {sent ? (
          <>
            <DialogTitle id="alert-dialog-title-prospecto-envio-formulario">
              Registro Completo
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Estamos validando tus datos para continuar con el proceso de aceptación. Serás notificado via correo en breve
              </DialogContentText>
              {/* <DialogContentText> */}
              {/*   Serás expulsado de tu perfil para poder proseguir con el proceso de aceptación */}
              {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button
                color='primary'
                variant='contained'
                sx={{ width: '100px' }}
                onClick={aceptarLogout}
              >
                Aceptar
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title-prospecto-envio-formulario">
              Envio de contactos (Proyecto 100)
            </DialogTitle>
            <DialogContent>
              ¿Estás seguro de que deseas enviar los contactos?
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                variant='contained'
                color='error'
                sx={{ width: '100px' }}
                disabled={isSubmitting}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                color='primary'
                variant='contained'
                sx={{ width: '100px' }}
                disabled={isSubmitting}
                onClick={onClick}
              >
                Enviar
              </Button>
            </DialogActions>
          </>
        )}

      </Dialog>
    </>
  );

};

export default ContactosEnviadosDialog;