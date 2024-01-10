import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

const SiguienteAccionModal = ({ handleAcceptance, siguientesAcciones, row }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSiguienteAccionChange = (event, id) => {
    console.log(event.target.value + id);
    if (event.target.value === 'Llamada pendiente') {
      setOpen(true);
    }
  };

  const actividades = ['Contacto Telefónico Agendado', 'Contacto Telefónico Pendiente'];
  const [fechaActividad, setFechaActividad] = useState('');
  const [horaActividad, setHoraActividad] = useState('');
  const [actividad, setActividad] = useState('');

  const onActividadChange = (event, id) => {
    console.log(event.target.value + id);
    if (event.target.value === 'Llamada pendiente') {
      setOpen(true);
    }
    setActividad(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select
          id={`siguienteAccionSelect${row.id}`}
          defaultValue={row.siguienteAccion}
          onChange={(event) => onSiguienteAccionChange(event, row.id)}
        >
          {siguientesAcciones?.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Actividad</DialogTitle>
        <DialogContent>
          <List sx={{ py: 0 }}>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" alignItems="center">
                  <InputLabel id="fechaActividad">Fecha Actividad</InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker format="DD/MM/YYYY" value={fechaActividad} onChange={(newValue) => setFechaActividad(newValue)} fullWidth />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" alignItems="center">
                  <InputLabel id="horaActividad">Hora Actividad</InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker format="DD/MM/YYYY" value={horaActividad} onChange={(newValue) => setHoraActividad(newValue)} fullWidth />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" alignItems="center">
                  <InputLabel id="fechaRegistro">Actividad</InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl fullWidth>
                    <Select id="actividad" value={actividad} onChange={(event) => onActividadChange(event, row.id)}>
                      {actividades?.map((option) => (
                        <MenuItem value={option} key={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleAcceptance();
              handleClose();
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SiguienteAccionModal.propTypes = {
  handleAcceptance: PropTypes.func,
  siguientesAcciones: PropTypes.array,
  row: PropTypes.object
};

export default SiguienteAccionModal;
