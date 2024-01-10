import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react'

import NotInterestedIcon from '@mui/icons-material/NotInterested';

const DeleteModalCMV = ({ handleDeleteReunion, reunion }) => {

  const [open, setOpen] = useState(false);

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
          Suspender comité mensual
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro que desea suspender el comité mensual con id: {reunion.no}?
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
            onClick={() => {
              handleDeleteReunion(reunion.id)
              setOpen(false);
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModalCMV;
