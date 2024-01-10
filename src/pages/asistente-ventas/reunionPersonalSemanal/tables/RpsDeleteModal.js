import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const RpsDeleteModal = ({handleDeleteReunionesRPS, reunion}) => {
  const [open, setOpen] = useState(false);

  const handleCloseDelete = () => {
    setOpen(false);
  }
  const handleOpenDelete = () => {
    setOpen(true);
  }

  return (
    <>
      <Button sx={{ mr: 2 }} color='error' variant="outlined" startIcon={<DeleteIcon />}
        onClick={handleOpenDelete}
      >
        Eliminar
      </Button>
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
          {"¿Está seguro?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta seguro que desea eliminar la reunion:<br/>- ID: {reunion.idReunion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button 
            color='error' 
            variant='contained' 
            autoFocus
            onClick={() => {
              handleDeleteReunionesRPS(reunion.idReunion)
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

export default RpsDeleteModal
