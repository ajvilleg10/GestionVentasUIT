
import {
  Grid,
  List,
  ListItem,
  Button,
  InputLabel,
  TextField
} from '@mui/material';

const SiguienteAccionModal =({ onCancel }) => {
  // ...

  const handleCancelClick = () => {
    // Llamar a la función de cancelación proporcionada
    onCancel();
  };


  return (
    <div>
      <List sx={{ py: 0 }}>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
              <InputLabel id="motivo_cancelacion">Motivo de  <br/>Cancelación  </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                type="cedula"
                fullWidth
                id="cedula"
                name="cedula"
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" alignItems="center">
              <InputLabel id="comentarios">Comentarios</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                type="comentarios"
                fullWidth
                id="comentarios"
                name="comentarios"
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justifyContent="flex-end">
            <Grid item xs={6} md={3}>
              <Button id="guardar" fullWidth onClick={handleCancelClick}>Guardar</Button>
            </Grid>
            <Grid item xs={6} md={3}>
              <Button id="cancelar"  fullWidth onClick={handleCancelClick}>Cancelar</Button>
            </Grid>
          </Grid>
        </ListItem>

      </List>
    </div>
  );
};


export default SiguienteAccionModal;