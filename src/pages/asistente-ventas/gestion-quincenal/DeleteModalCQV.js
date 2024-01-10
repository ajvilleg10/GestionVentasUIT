import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModalCQV = ({handleDeleteCapacitacion, capacitacion}) => {

  const [open, setOpen] = useState(false);

  const handleCloseDelete = () => {
    setOpen(false);
  }

  return (
    <>
      <Button sx={{ mr: 2 }} color='error' variant="outlined" startIcon={<DeleteIcon />} onClick={() => setOpen(true)}>
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
            Está seguro que desea eliminar la capacitacion: {capacitacion.no}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" color="primary" onClick={handleCloseDelete}> Cancelar </Button>
          <Button 
            color='error' 
            variant='contained' 
            onClick={() => {
              handleDeleteCapacitacion(capacitacion.id)
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

export default DeleteModalCQV;
