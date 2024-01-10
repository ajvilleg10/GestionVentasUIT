import {
  Grid,
  ListItem,
  List,
  InputLabel,
  TextField,
  FormControl
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker, TimeField } from '@mui/x-date-pickers-pro';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const ComiteSemanalFormulario = ({ formik, data }) => {

  const validateHora = (date, inicial) => {

    const now = dayjs();
    const selectedDate = dayjs(formik.values.fecha_reunion).hour(date.get('hour')).minute(date.get('minute'))
    const hour = date.hour();

    const isBeforeNow = selectedDate.isBefore(now);
    const isInRange = hour >= 8 && hour <= 18;
    const minute = date.minute(); 

    let duracion = 0;

    if (inicial) duracion = dayjs(formik.values.hora_final).diff(date, 'minutes');
    else duracion = date.diff(dayjs(formik.values.hora_inicio), 'minutes');

    if (!isBeforeNow && isInRange && duracion > 0 && (!inicial ? minute === 0 : true)) formik.setFieldValue('duracion', duracion);
    else formik.setFieldValue('duracion', 0);

  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List sx={{ py: 0 }} dense>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="jefe_venta_id">Jefe de ventas</InputLabel>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    value={data.participantes[0].empleado.nombres + ' ' + data.participantes[0].empleado.apellidos}
                    disabled
                  />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="hora_inicio">Hora de inicio</InputLabel>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <TimeField
                      format="HH:mm"
                      value={formik.values.hora_inicio}
                      onChange={(date) => {
                        validateHora(date, true);
                        formik.setFieldValue('hora_inicio', date)
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
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="hora_final">Hora final</InputLabel>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <TimeField
                      format="HH:mm"
                      value={formik.values.hora_final}
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
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="duracion">Duración</InputLabel>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    value={dayjs.duration(formik.values.duracion, 'minute').format('HH:mm')}
                    disabled
                  />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="fecha_reunion">Fecha de reunión</InputLabel>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      id="fecha_reunion"
                      name="fecha_reunion"
                      type="date"
                      value={formik.values.fecha_reunion}
                      minDate={dayjs()}
                      onChange={(date) => {
                        const duracion = dayjs(formik.values.hora_final).diff(dayjs(formik.values.hora_inicio), 'minutes');
                        console.log('duracion', duracion);
                        if (duracion > 0) formik.setFieldValue('duracion', duracion);

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
                  <InputLabel htmlFor="comentario">Comentario</InputLabel>
                </Grid>
                <Grid item xs={12} md={5}>
                  <FormControl fullWidth>
                    <TextField
                      id="comentario"
                      name="comentario"
                      placeholder="Comentarios sobre la reunión"
                      value={formik.values.comentario}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 100 }}
                      error={formik.touched.comentario && Boolean(formik.errors.comentario)}
                      helperText={formik.touched.comentario && formik.errors.comentario}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default ComiteSemanalFormulario;
