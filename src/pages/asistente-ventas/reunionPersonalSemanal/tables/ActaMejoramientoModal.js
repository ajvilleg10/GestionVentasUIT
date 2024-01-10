import { Grid, List, ListItem, InputLabel, TextField, Button, Box, Dialog, DialogTitle, Typography, DialogContent } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment'
import { IconButton, Modal } from '@mui/material'
import React, { useState } from 'react'
import MainCard from 'components/MainCard';

const ActaMejoramientoModal = ({ reunion }) => {
  const [open, setOpen] = useState(false)
  const [antecedentes, setAntecedentes] = useState(reunion.antecedentes);
  const [compromiso, setCompromiso] = useState(reunion.compromiso);
  const [meta, setMeta] = useState(reunion.meta);
  const [enviado, setEnviado] = useState(true);

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  console.log('reunion', reunion);


  return (
    <>
      <IconButton
        aria-label='Acta de mejoramiento'
        color='primary'
        sx={{
          mr: 2,
        }}
        onClick={handleOpen}
      >
        <AssignmentIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}

      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='h5' align='center'
            sx={{
              color: 'primary.main'
            }}
          >
            Acta de Mejoramiento
          </Typography>
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <MainCard border={false} boxShadow>
              <List sx={{ py: 0 }} dense>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel id="antecedentes">Antecedentes</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        id="outlined-multiline-flexible"
                        label=""
                        multiline
                        fullWidth
                        placeholder=""
                        onChange={(e) => setAntecedentes(e.target.value)}
                        value={antecedentes}
                        disabled={enviado}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel id="compromiso">Compromiso</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        id="outlined-multiline-flexible"
                        label=""
                        multiline
                        fullWidth
                        placeholder=""
                        onChange={(e) => setCompromiso(e.target.value)}
                        value={compromiso}
                        disabled={enviado}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel id="meta">Meta</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        id="outlined-multiline-flexible"
                        label=""
                        multiline
                        fullWidth
                        placeholder=""
                        onChange={(e) => setMeta(e.target.value)}
                        value={meta}
                        disabled={enviado}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                {/* <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9} display="flex" alignItems="center">

              </Grid>
              <Grid item xs={12} md={3}>
                <Button disabled={enviado} sx={{ mt: 2 }} onClick={handleSaveActaMejoramiento} variant="contained" fullWidth>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </ListItem> */}
              </List>
            </MainCard>
          </Grid>
        </Grid>



      </Dialog>

    </>
  )
}

export default ActaMejoramientoModal