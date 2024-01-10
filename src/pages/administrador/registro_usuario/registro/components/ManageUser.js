import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Switch,
  Tooltip
} from '@mui/material';

import { Close } from '@mui/icons-material';

import { dispatch } from 'store';
import { useState } from 'react'
import { openSnackbar } from 'store/reducers/snackbar';

const ManageUser = ({ user, desactivar, activar }) => {

  const [open, setOpen] = useState(false);
  const activo = user.Cuenta[0].esta_activo;

  const onClick = async () => {

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      let successMsg = "";

      if (activo) {

        const rs = await desactivar(user.id);
        successMsg = rs.message ?? 'Usuario desactivado correctamente';

      } else {

        const rs = await activar(user.id);
        successMsg = rs.message ?? 'Usuario activado correctamente';

      }

      snackbar.message = successMsg;
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error('onClick de manage user', error);

      snackbar.message = error.message ?? 'Error al administrar el usuario';
      snackbar.alert.color = 'error';

    } finally {

      dispatch(openSnackbar(snackbar));
      setOpen(false);

    }

  }

  return (
    <>
      <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Tooltip title={activo ? 'Desactivar Usuario' : 'Activar Usuario'}>
          <Switch checked={activo} onChange={() => setOpen(true)} onClick={(e) => { e.stopPropagation(); }} />
        </Tooltip>
      </div>

      <Dialog
        open={open}
        onClose={(e) => {
          e.stopPropagation();
          setOpen(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}>
            <Close />
          </IconButton>
        </Box>

        {activo ? (
          <DialogTitle id="alert-dialog-title">
            Desactivar Usuario
          </DialogTitle>
        ) : (
          <DialogTitle id="alert-dialog-title">
            Activar Usuario
          </DialogTitle>
        )}

        {activo ? (

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`¿Está seguro que desea desactivar al usuario ${user.nombres} ${user.apellidos}?`}
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`¿Está seguro que desea activar al usuario ${user.nombres} ${user.apellidos}?`}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Cancelar
          </Button>

          <Button
            color='primary'
            variant='contained'
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {activo ? 'Desactivar' : 'Activar'}
          </Button>
        </DialogActions>

      </Dialog>

    </>
  );

};

export default ManageUser;
