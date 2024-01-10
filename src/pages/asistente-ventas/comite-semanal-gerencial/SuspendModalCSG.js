import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react'

// import DeleteIcon from '@mui/icons-material/Delete';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const SuspendModalCSG = ({ handleSuspenderReunion, reunion, closeTooltip }) => {

  const [open, setOpen] = useState(false);

  const handleCloseDelete = () => {
    setOpen(false);
  }

  return (
    <>
      <IconButton color="error" variant="outlined" onClick={() => { closeTooltip(); setOpen(true) }} >
        <NotInterestedIcon fontSize="medium" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleCloseDelete}>
            <Close />
          </IconButton>
        </Box>
        <DialogTitle id="alert-dialog-title">
          Suspender reunión
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro que desea suspender el comité mensual con id: {reunion.no}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" color="primary" onClick={handleCloseDelete}> Cancelar </Button>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              handleSuspenderReunion(reunion)
              setOpen(false);
            }}
          >
            Suspender
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SuspendModalCSG;
