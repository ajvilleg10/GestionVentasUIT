import React, { useEffect, useState } from 'react';
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
  InputLabel,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';

import { DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

// Otros importes...

const SiguienteAccionModal = ({ handleAcceptance, siguientesAcciones, row, disabled, index }) => {
  const [open, setOpen] = useState(false);
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);
  const [fechaActividad, setFechaActividad] = useState('');
  const [actividad, setActividad] = useState('');
  const [tipoCita, setTipoCita] = useState('');
  const [direccionCita, setDireccionCita] = useState('');

  const [parametrosSiguienteAccion, setParametrosSiguiente] = useState({});

  const handleClose = () => {
    setOpen(false);
    setSecondDialogOpen(false);
    setActividad("");
    setFechaActividad("");
    setTipoCita("");
    setDireccionCita("");
    setParametrosSiguiente({});
  };

  const onSiguienteAccionChange = (event) => {
    setActividad(event.target.value);
    if (event.target.value === 'Llamada pendiente' || event.target.value === 'Llamada agendada') {
      setOpen(true);
    } else if (event.target.value === 'Cita agendada') {
      setSecondDialogOpen(true);
    }
    console.log(actividad)
  };

  const guardarFunc = () => {
    handleAcceptance({ actividad: parametrosSiguienteAccion, siguienteAccion: actividad }, index);
  }

  const changeActividad = (index, value) => {
    parametrosSiguienteAccion[index] = value;
    setParametrosSiguiente({ ...parametrosSiguienteAccion });
  };

  const changeFecha = (event) => {
    changeActividad("fecha", event);
    setFechaActividad(event);
  };

  useEffect(() => {
    console.log(fechaActividad)
  }, [fechaActividad]);

  return (
    <div>
      <FormControl fullWidth>
        <Select
          id={`siguienteAccionSelect${row.id}`}
          defaultValue={row.siguienteAccion}
          onChange={onSiguienteAccionChange}
          disabled={disabled}
        >
          {siguientesAcciones?.map((option) => (
            <MenuItem value={option} key={option}>{option}</MenuItem>
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
                  <InputLabel id="fechaActividad">Fecha y Hora<br/>Actividad</InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Escoja la Fecha y Hora" onChange={changeFecha} />
                  </LocalizationProvider>
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
              guardarFunc();
              handleClose();
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={secondDialogOpen} onClose={handleClose}>
        <DialogTitle>Agregar Cita</DialogTitle>
        <DialogContent>
          <List sx={{ py: 0 }}>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" alignItems="center">
                  <InputLabel id="TipoCita">Tipo Cita</InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Select labelId='tipoCitas' defaultValue={tipoCita} name='tipoCitas' id="tipoCitas" onChange={(newValue) => { setTipoCita(newValue.target.value); changeActividad("tipoCita", newValue.target.value); }}>
                    <MenuItem key="Nueva" value="Nueva">Nueva</MenuItem>
                    <MenuItem key="seguimiento" value="seguimiento">Cierre</MenuItem>
                    <MenuItem key="referido" value="referido">Referido</MenuItem>
                    <MenuItem key="casual" value="casual">Casual</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" alignItems="center" >
                  <InputLabel id="fechaCita">Fecha Cita</InputLabel>
                </Grid>
                <Grid item xs={12} md={8} >
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Escoja la Fecha y Hora" onChange={changeFecha} />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" alignItems="center">
                  <InputLabel htmlFor="direccionCita">Direccion Cita</InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    id="direccionCita"
                    name="direccionCita"
                    value={direccionCita} onChange={(newValue) => { setDireccionCita(newValue.target.value); changeActividad("direccionCita", newValue.target.value); }}
                  />
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
              guardarFunc();
              handleClose();
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

SiguienteAccionModal.propTypes = {
  handleAcceptance: PropTypes.func,
  siguientesAcciones: PropTypes.array,
  row: PropTypes.object
};

export default SiguienteAccionModal;