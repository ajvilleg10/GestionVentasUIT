import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';


const RpsSendModalAreYouSure = ({ reunion, handleSendReunionesRPS }) => {
  const [open, setOpen] = useState(false);

  const handleCloseDelete = () => {
    setOpen(false);
  }
  const handleOpenDelete = () => {
    setOpen(true);
  }
  // const { updateReunionesRPS } = useReunionPersonalSemanal();
  
  // function handleRpsSendModal(reunion) {
    
  //   console.log("reunion", reunion.idReunion, "enviada");
  //   // updateReunionesRPS(reunion.idReunion, {
  //   //   "enviar": true
  //   // });
  // }



  return (
    <>
      <Button sx={{ mr: 2 }} color='error' variant="outlined" startIcon={<SendIcon />}
        onClick={handleOpenDelete}
      >
        Enviar
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
            Esta seguro que desea enviar reunion:<br/>- ID: {reunion.idReunion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button 
            color='error' 
            variant='contained' 
            autoFocus
            onClick={() => {
              handleSendReunionesRPS(reunion.idReunion, {
                "id": reunion.idReunion,
                "enviado": true
              });
              setOpen(false);
            }}
            startIcon={<SendIcon />}
            >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default RpsSendModalAreYouSure
