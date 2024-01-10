import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/Delete';


const RpsDeleteModalGestion = ({ handleDelete, index }) => {
  const [open, setOpen] = useState(false);

  const handleCloseDelete = () => {
    setOpen(false);
  }
  const handleOpenDelete = () => {
    setOpen(true);
  }

  return (
    <>
      <Button sx={{ mr: 2 }} color='error' variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}
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
            Está seguro que desea eliminar la gestion # {index + 1}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button
            color='error'
            variant='contained'
            autoFocus
            onClick={async () => {
              await handleDelete(index);
              setOpen(false);
            }}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default RpsDeleteModalGestion
