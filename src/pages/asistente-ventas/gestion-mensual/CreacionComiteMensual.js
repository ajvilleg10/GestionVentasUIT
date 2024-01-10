import { List, ListItem, Grid, InputLabel, FormControl, Select, MenuItem, Button, TextField, Checkbox } from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useState } from 'react';
import { useFormik } from 'formik';

// third-party
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import useJefesVentas from 'hooks/useJefesVentas';
import { DIAS } from 'utils/constants';

dayjs.extend(duration);

const today = dayjs();
const inicio = today.hour(16).minute(0);
const fin = today.hour(18).minute(0);

const CreacionComiteMensual = ({ crearReunion }) => {

  const [multiple, setMultiple] = useState(false);
  const [jefeVentaSeleccionado, setJefeVentaSeleccionado] = useState(false);
  const jefesDeVentas = useJefesVentas() ?? [];

  const initialValues = {
    hora_inicio: inicio,
    hora_final: fin,
    duracion: {
      formato: dayjs.duration(fin.diff(inicio, 'minute'), 'minute').format('HH:mm'),
      tiempo: fin.diff(inicio, 'minute') // Esto se envia al backend
    },
    fecha_reunion: today,
    fecha_reunion_incio_batch: today,
    fecha_reunion_final_batch: today.add(1, 'month'),
    jefe_venta_id: '',
    date: 5
  };

  // Cada date en el mes
  // function getDates(startDate, endDate, date) {
  //   let current = dayjs(startDate).startOf('month');
  //   const end = dayjs(endDate).endOf('month');
  //   const dates = [];
  //   while (current.isBefore(end)) {
  //     if (current.day() === date) { 
  //       dates.push(current.format('YYYY-MM-DD'));
  //     }
  //     current = current.add(1, 'day');
  //   }
  //   return dates;
  // }

  function getDates(startDate, endDate, date) {

    let current = dayjs(startDate).startOf('month');
    const end = dayjs(endDate).endOf('month');
    const dates = [];

    while (current.isBefore(end)) {
      if (current.day() === date) {
        if (!current.isBefore(today)){
          dates.push(current.format('YYYY-MM-DD'));
        }
        current = current.add(1, 'month').startOf('month');
      } else {
        current = current.add(1, 'day');
      }
    }

    return dates;
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {

      console.log('select form submit - ', values);

      try {

        if (!jefeVentaSeleccionado) throw new Error('No se ha seleccionado un jefe de ventas');
        if (values.duracion.tiempo === 0 || values.duracion.tiempo < 120) throw new Error('La duración debe ser de 2 horas mínimo');

        if (multiple) {

          const dates = getDates(values.fecha_reunion_incio_batch, values.fecha_reunion_final_batch, values.date);
          if (dates.length === 0) throw new Error('No se pueden crear reuniones en el rango seleccionado');

          const CMVs = dates.map((fecha) => {

            const fechaCompletaInicio = dayjs(fecha).set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
            const fechaCompletaFinal = dayjs(fecha).set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

            return {
              duracion: values.duracion.tiempo,
              fecha_inicio: fechaCompletaInicio.format('YYYY-MM-DD HH:mm'),
              fecha_final: fechaCompletaFinal.format('YYYY-MM-DD HH:mm'),
              jefe_venta_id: values.jefe_venta_id,
              tipo_reunion: 'mensual'
            };
          });

          const newCMVsData = {
            bulk: true,
            data: CMVs
          };

          await crearReunion(newCMVsData);

        } else {

          const now = dayjs();
          if (dayjs(values.fecha_reunion).hour(values.hora_inicio.get('hour')).minute(values.hora_inicio.get('minute')).isBefore(now)) {
            throw new Error('Hora y fecha inválida');
          }
          if (values.fecha_reunion.day() === 6 || values.fecha_reunion.day() === 0) throw new Error('La reunión debe ser en dia laboral');

          const fechaCompletaInicio = dayjs(values.fecha_reunion).set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
          const fechaCompletaFinal = dayjs(values.fecha_reunion).set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

          const newCMV = {
            bulk: false,
            data: {
              duracion: values.duracion.tiempo,
              fecha_inicio: fechaCompletaInicio.format('YYYY-MM-DD HH:mm').toString(),
              fecha_final: fechaCompletaFinal.format('YYYY-MM-DD HH:mm').toString(),
              jefe_venta_id: values.jefe_venta_id,
              tipo_reunion: 'mensual'
            }
          };

          await crearReunion(newCMV);

          setJefeVentaSeleccionado(false);
          setMultiple(false);
          formik.resetForm();

        }

        dispatch(
          openSnackbar({
            open: true,
            message: 'Comité mensual creado con éxito',
            variant: 'alert',
            alert: { color: 'success' },
            close: false
          })
        );

      } catch (error) {

        console.error('Error en submit comite mensual', error);

        dispatch(
          openSnackbar({
            open: true,
            message: error.message,
            variant: 'alert',
            alert: { color: 'error' },
            close: false
          })
        );

      }
    }

  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <List sx={{ py: 0 }} dense>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="jefe_venta_id">Jefe de ventas</InputLabel>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <Select
                  id="jefe_venta_id"
                  name="jefe_venta_id"
                  value={formik.values.jefe_venta_id}
                  onChange={(e) => {
                    setJefeVentaSeleccionado(true);
                    formik.handleChange(e);
                  }}
                >
                  {jefesDeVentas.length === 0 && (
                    <MenuItem disabled>
                      No existen jefes de venta
                    </MenuItem>
                  )}
                  {jefesDeVentas?.map((jefe) => (
                    <MenuItem value={jefe.id} key={jefe.id}>
                      {jefe.Empleado.nombres + ' ' + jefe.Empleado.apellidos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="hora_inicio">Hora de inicio</InputLabel>
            </Grid>
            <Grid item xs={12} md={2}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <TimeField
                  format="HH:mm"
                  value={formik.values.hora_inicio}
                  disabled={!jefeVentaSeleccionado}
                  onChange={(date) => {

                    const now = dayjs();
                    const selectedDate = dayjs(formik.values.fecha_reunion).hour(date.get('hour')).minute(date.get('minute'))
                    const hour = date.hour();

                    const isBeforeNow = selectedDate.isBefore(now);
                    const isInRange = hour >= 8 && hour <= 18;

                    const durationC = dayjs(formik.values.hora_final).diff(date, 'minutes');  
                    const format = dayjs.duration(durationC, 'minute').format('HH:mm');

                    if (!isBeforeNow && isInRange && durationC > 0) {

                      formik.setFieldValue('duracion.formato', format);
                      formik.setFieldValue('duracion.tiempo', durationC);

                    } else {

                      formik.setFieldValue('duracion.formato', '00:00');
                      formik.setFieldValue('duracion.tiempo', 0);

                    }

                    formik.setFieldValue('hora_inicio', date);
 
                  }}  
                  slotProps={{
                    textField: {
                      id: "hora_inicio",
                      name: "hora_inicio"
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="hora_final">Hora final</InputLabel>
            </Grid>
            <Grid item xs={12} md={2}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <TimeField
                  format="HH:mm"
                  value={formik.values.hora_final}
                  disabled={!jefeVentaSeleccionado}
                  onChange={(date) => {

                    const now = dayjs();
                    const selectedDate = dayjs(formik.values.fecha_reunion).hour(date.get('hour')).minute(date.get('minute'))
                    const hour = date.hour();

                    const isBeforeNow = selectedDate.isBefore(now);
                    const isInRange = hour >= 8 && hour <= 18;

                    const durationC = date.diff(dayjs(formik.values.hora_inicio), 'minutes');  
                    const format = dayjs.duration(durationC, 'minute').format('HH:mm');

                    if (!isBeforeNow && isInRange && durationC > 0) {

                      formik.setFieldValue('duracion.formato', format);
                      formik.setFieldValue('duracion.tiempo', durationC);

                    } else {

                      formik.setFieldValue('duracion.formato', '00:00');
                      formik.setFieldValue('duracion.tiempo', 0);

                    }

                    formik.setFieldValue('hora_final', date);

                  }}  
                  slotProps={{
                    textField: {
                      id: "hora_final",
                      name: "hora_final",
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="duracion">Duración</InputLabel>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth> 
                <TextField
                  value={formik.values.duracion.formato}
                  disabled
                />
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="fecha_reunion">Fecha de reunión</InputLabel>
            </Grid>
            <Grid item xs={12} md={2}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_reunion"
                  name="fecha_reunion"
                  type="date"
                  value={formik.values.fecha_reunion}
                  disabled={!jefeVentaSeleccionado || multiple}
                  minDate={today}
                  onChange={(date) => {

                    const durationC = dayjs(formik.values.hora_final).diff(dayjs(formik.values.hora_inicio), 'minutes');  
                    const format = dayjs.duration(durationC, 'minute').format('HH:mm');

                    if (durationC > 0) {

                      formik.setFieldValue('duracion.formato', format);
                      formik.setFieldValue('duracion.tiempo', durationC);

                    }

                    formik.setFieldValue('fecha_reunion', date);

                  }}
                  slotProps={{
                    textField: {
                      variant: 'outlined'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <InputLabel htmlFor="repetir_reunion">Repetir reunión</InputLabel>
              <FormControl>
                <Checkbox checked={multiple} onChange={() => setMultiple(!multiple)} />
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        {multiple && (
          <>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={2} display="flex" alignItems="center">
                  <InputLabel htmlFor="date">Dia a repetir</InputLabel>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <Select
                      id="date"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      disabled={!jefeVentaSeleccionado}
                    >
                      {DIAS.map((dia, index) => (
                        <MenuItem value={index + 1} key={index}>
                          {dia}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={2} display="flex" alignItems="center">
                  <InputLabel htmlFor="fecha_reunion_incio_batch">Fecha de incio</InputLabel>
                </Grid>
                <Grid item xs={12} md={2}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      id="fecha_reunion_incio_batch"
                      name="fecha_reunion_incio_batch"
                      type="date"
                      disabled={!jefeVentaSeleccionado}
                      value={formik.values.fecha_reunion_incio_batch}
                      minDate={today}
                      onChange={(date) => formik.setFieldValue('fecha_reunion_incio_batch', date)}
                      slotProps={{
                        textField: {
                          variant: 'outlined'
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item xs={12} md={2} display="flex" alignItems="center">
                  <InputLabel htmlFor="fecha_reunion_final_batch">Fecha final</InputLabel>
                </Grid>
                <Grid item xs={12} md={2}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      id="fecha_reunion_final_batch"
                      name="fecha_reunion_final_batch"
                      type="date"
                      value={formik.values.fecha_reunion_final_batch}
                      disabled={!jefeVentaSeleccionado}
                      minDate={today}
                      maxDate={today.add(1, 'year')}
                      onChange={(date) => formik.setFieldValue('fecha_reunion_final_batch', date)}
                      slotProps={{
                        textField: {
                          variant: 'outlined'
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </ListItem>
          </>
        )}
        <ListItem>
          <Button variant="contained" fullWidth type="submit">
            Crear
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default CreacionComiteMensual;
