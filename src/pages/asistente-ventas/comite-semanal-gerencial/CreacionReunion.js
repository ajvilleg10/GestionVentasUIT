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

import { DIAS, MIERCOLES, MODALIDADES, REUNION } from 'utils/constants';
import { useSelector } from 'react-redux';
import useJefesVentas from 'hooks/asistente-ventas/useJefesVenta';
import { getDates } from 'utils/manageFechas';

dayjs.extend(duration);
const today = dayjs();

const CreacionReunion = ({ crearReunion }) => {

  const [multiple, setMultiple] = useState(false);
  const currentUser = useSelector((state) => state.user);

  const [jefeVentaSeleccionado, setJefeVentaSeleccionado] = useState(false);
  const jefesDeVentas = useJefesVentas();

  const validateHora = (date, inicial) => {

    const now = dayjs();
    const selectedDate = dayjs(formik.values.fecha_reunion).hour(date.get('hour')).minute(date.get('minute'))
    const hour = date.hour();
    const minute = date.minute();

    const isBeforeNow = selectedDate.isBefore(now);
    const isInRange = hour >= 8 && hour <= 18;

    let duracion = 0;

    if (inicial) duracion = dayjs(formik.values.hora_final).diff(date, 'minutes');
    else duracion = date.diff(dayjs(formik.values.hora_inicio), 'minutes');

    if (!isBeforeNow && isInRange && duracion > 0 && (!inicial ? minute === 0 : true)) formik.setFieldValue('duracion', duracion);
    else {
      if (multiple) {
        formik.setFieldValue('duracion', duracion);
      } else {
        formik.setFieldValue('duracion', 0);
      }
    }

  };

  const formik = useFormik({
    initialValues: {
      hora_inicio: today.hour(16).minute(0),
      hora_final: today.hour(18).minute(0),
      duracion: 120,
      fecha_reunion: today,
      fecha_reunion_incio_batch: today,
      fecha_reunion_final_batch: today.add(1, 'month'),
      jefe_venta_id: '',
      modalidad: '',
      date: MIERCOLES
    },
    onSubmit: async (values) => {

      const snackbar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      };

      try {

        if (!jefeVentaSeleccionado) throw new Error('No se ha seleccionado un jefe de ventas');
        if (values.modalidad === '') throw new Error('Falta escoger la modalidad de la reunión');
        if (values.duracion < 120) throw new Error('La duración debe ser de 2 horas mínimo');

        if (multiple) {

          const dates = getDates(values.fecha_reunion_incio_batch, values.fecha_reunion_final_batch, values.date, REUNION.Semanal);
          if (dates.length === 0) throw new Error('No se pueden crear reuniones en el rango seleccionado');

          const CSGs = dates.map((fecha) => {

            const fechaCompletaInicio = dayjs(fecha).set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
            const fechaCompletaFinal = dayjs(fecha).set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

            return {
              asistente_id: currentUser.id,
              fecha_inicio: fechaCompletaInicio.format('YYYY-MM-DD HH:mm'),
              fecha_final: fechaCompletaFinal.format('YYYY-MM-DD HH:mm'),
              fecha_reunion: fecha,
              duracion: values.duracion,
              jefe_venta_id: values.jefe_venta_id,
              modalidad: values.modalidad,
              tipo_reunion: REUNION.Semanal
            };
          });

          const newCSGs = {
            bulk: true,
            data: CSGs
          };

          const rs = await crearReunion(newCSGs);

          snackbar.message = rs.message ?? 'Reuniones creadas con éxito';
          snackbar.alert.color = 'success';

        } else {

          const now = dayjs();
          if (dayjs(values.fecha_reunion).hour(values.hora_inicio.get('hour')).minute(values.hora_inicio.get('minute')).isBefore(now)) {
            throw new Error('Hora y fecha inválida');
          }
          if (values.fecha_reunion.day() === 6 || values.fecha_reunion.day() === 0) throw new Error('La reunión debe ser en dia laboral');

          const fechaCompletaInicio = dayjs(values.fecha_reunion).set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
          const fechaCompletaFinal = dayjs(values.fecha_reunion).set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

          const newCSG = {
            bulk: false,
            data: {
              asistente_id: currentUser.id,
              fecha_inicio: fechaCompletaInicio.format('YYYY-MM-DD HH:mm'),
              fecha_final: fechaCompletaFinal.format('YYYY-MM-DD HH:mm'),
              fecha_reunion: values.fecha_reunion.format('YYYY-MM-DD'),
              duracion: values.duracion,
              jefe_venta_id: values.jefe_venta_id,
              modalidad: values.modalidad,
              tipo_reunion: REUNION.Semanal
            }
          };

          const rs = await crearReunion(newCSG);

          snackbar.message = rs.message ?? 'Reunión creada con éxito';
          snackbar.alert.color = 'success';

        }

        setMultiple(false);
        setJefeVentaSeleccionado(false);
        formik.resetForm();

      } catch (error) {

        snackbar.message = error.message;
        snackbar.alert.color = 'error';

      }

      formik.setSubmitting(false);
      dispatch(openSnackbar(snackbar));

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
            <Grid item xs={12} md={3}>
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
                    validateHora(date, true);
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
                    validateHora(date, false);
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
                  value={dayjs.duration(formik.values.duracion, 'minute').format('HH:mm')}
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
                  minDate={today}
                  disabled={!jefeVentaSeleccionado || multiple}
                  onChange={(date) => {
                    const duracion = dayjs(formik.values.hora_final).diff(dayjs(formik.values.hora_inicio), 'minutes');
                    if (duracion > 0) formik.setFieldValue('duracion', duracion)

                    formik.setFieldValue('fecha_reunion', date);

                  }}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      name: 'fecha_reunion'
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
              <InputLabel htmlFor="modalidad">Modalidad de reunión</InputLabel>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <Select
                  id="modalidad_reunion_id"
                  name="modalidad"
                  value={formik.values.modalidad}
                  disabled={!jefeVentaSeleccionado}
                  onChange={formik.handleChange}
                >
                  {MODALIDADES.map((m) => (
                    <MenuItem value={m} key={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                      disabled={!jefeVentaSeleccionado}
                      onChange={formik.handleChange}
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
                      value={formik.values.fecha_reunion_incio_batch}
                      minDate={today}
                      disabled={!jefeVentaSeleccionado}
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
                      minDate={today}
                      maxDate={today.add(4, 'month')}
                      disabled={!jefeVentaSeleccionado}
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
          <Button variant="contained" fullWidth type="submit" disabled={formik.isSubmitting}>
            Crear
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default CreacionReunion;
