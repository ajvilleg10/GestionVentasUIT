import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton, Stack } from '@mui/material';
// import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SelectFormsModalTransferenciaContactos from './SelectForms';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

export default function SelectVendedor({ contactos, handleAction }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    handleAction();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton 
        aria-label='transferir'
        color='primary'
        onClick={handleClickOpen}
        size='large'
      >
        <SyncAltIcon />
      </IconButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack spacing={2.5}>
                <SelectFormsModalTransferenciaContactos
                  contactos={contactos}
                  handleClose={handleClose}
                />
                {/* <AutoCompleteForm /> */}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}