import { List, ListItem, Grid, InputLabel, FormControl, Select, MenuItem, TextField, FormHelperText } from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import useOrigenesContactos from 'hooks/useOrigenesContactos';
import useTiposActividades from 'hooks/useTiposActividades';
import useEstadosContactos from 'hooks/useEstadosContactos';

const today = dayjs();

const validationSchema = yup.object({
  fecha_reunion: yup.date().required('La fecha de la reunion es requerida'),
  jefe_venta_id: yup.string().required('El Jefe de ventas es requerido'),
  duracion_horas: yup.number().integer().required('La duracion en horas de la reunion es requerida')
});

const FiltrosActividadesPendientes = ({ searchActividad }) => {

  const origenes = useOrigenesContactos();
  const estadosProspectos = useEstadosContactos();
  const tiposActividades = useTiposActividades();

  const initialFormValues = {
    fecha_registro: '',
    tipo_actividad: '',
    nombres: '',
    apellidos: '',
    celular: '',
    origen: '',
    estado_prospecto: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        await searchActividad({
          fecha_registro: values.fecha_registro,
          tipo_actividad: values.tipo_actividad,
          nombres: values.nombres,
          apellidos: values.apellidos,
          celular: values.celular,
          origen: values.origen,
          estado_prospecto: values.estado_prospecto
        });
        dispatch(
          openSnackbar({
            open: true,
            message: 'Busqueda realizada con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(initialFormValues);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
        console.log(error);
        dispatch(
          openSnackbar({
            open: true,
            message: error.message,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      } finally {
        formik.setSubmitting(false); // Ensure that the form is not stuck in a submitting state
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <List sx={{ py: 0 }} dense>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="fecha_registro">Fecha Registro</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} adapterLocale={'es'}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_registro"
                  name="fecha_registro"
                  type="date"
                  value={formik.values.fecha_registro || today}
                  onChange={(date) => formik.setFieldValue('fecha_reunion', date)}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formik.touched.fecha_registro && Boolean(formik.errors.fecha_registro)}
                      helperText={formik.touched.fecha_registro && formik.errors.fecha_registro}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel id="tipo_act">Tipo de Actividad</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Select
                  labelId="tipo_act"
                  id="tipo_actividad"
                  name="tipo_actividad"
                  value={formik.values.tipo_actividad}
                  onChange={formik.handleChange}
                >
                  {tiposActividades?.map((actividad) => (
                    <MenuItem value={actividad} key={actividad}>
                      {actividad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.errors.tipo_actividad && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.tipo_actividad}{' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel id="origen_label">Origen</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Select labelId="origen_label" id="origen" name="origen" value={formik.values.origen} onChange={formik.handleChange}>
                  {origenes?.map((origen) => (
                    <MenuItem value={origen} key={origen}>
                      {origen}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.errors.origen && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.origen}{' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel id="estado_prosp">Estado de Prospecto</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Select
                  labelId="estado_prosp"
                  id="estado_prospecto"
                  name="estado_prospecto"
                  value={formik.values.estado_prospecto}
                  onChange={formik.handleChange}
                >
                  {estadosProspectos?.map((estado) => (
                    <MenuItem value={estado.id} key={estado.id}>
                      {estado.estado_contacto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.errors.estado_prospecto && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.estado_prospecto}{' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </form>
  );
};

export default FiltrosActividadesPendientes;
