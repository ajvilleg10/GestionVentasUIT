import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material';

import { Close } from '@mui/icons-material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { dispatch } from 'store';
import { deleteReunion } from 'store/reducers/reunionGeneral';
import { openSnackbar } from 'store/reducers/snackbar';

const SuspenderReunionGeneralModal = ({ handleSuspender, data, errorMsg, successMsg, tipoReunion, nombreReunion }) => {

  const [open, setOpen] = useState(false);

  const handleClick = async () => {

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      if (data.comentario === '') throw new Error('Antes de suspender, escriba un comentario');

      await handleSuspender(data.id);
      dispatch(deleteReunion({ id: data.id, tipo_reunion: tipoReunion }));

      snackbar.message = successMsg;
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error('onClick suspender reunion', error);

      snackbar.message = error.message ?? errorMsg;
      snackbar.alert.color = 'error';

    } finally {

      dispatch(openSnackbar(snackbar));
      setOpen(false);

    }

  };

  return (
    <>

      <Tooltip title="Suspender reunión">
        <IconButton color="error" variant="outlined" onClick={() => setOpen(true)} >
          <NotInterestedIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <DialogTitle id="alert-dialog-title">
          {`Suspender ${nombreReunion}`}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro que desea suspender {nombreReunion}: {data.no}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button
            autoFocus
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            color='error'
            variant='contained'
            onClick={handleClick}
          >
            Suspender
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SuspenderReunionGeneralModal;
