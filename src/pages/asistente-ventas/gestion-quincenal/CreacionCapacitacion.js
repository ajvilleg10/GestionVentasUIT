import { List, ListItem, Grid, InputLabel, FormControl, Select, MenuItem, Button, TextField, FormHelperText } from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import useJefesVentas from 'hooks/useJefesVentas';

const today = dayjs();

const validationSchema = yup.object({
  fecha_reunion: yup.date().required('La fecha de la reunion es requerida'),
  jefe_venta_id: yup.string().required('El Jefe de ventas es requerido'),
  duracion_horas: yup.number().integer().required('La duracion en horas de la reunion es requerida')
});

// eslint-disable-next-line react/prop-types
const CreacionCapacitacion = ({ createCapacitacion }) => {
  const jefesDeVentas = useJefesVentas();

  const initialFormValues = {
    fecha_reunion: '',
    jefe_venta_id: '',
    duracion_horas: 0
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        await createCapacitacion({
          fecha_reunion: values.fecha_reunion,
          jefe_venta_id: values.jefe_venta_id,
          duracion_horas: values.duracion_horas
        });
        dispatch(
          openSnackbar({
            open: true,
            message: 'Capacitacion creada con exito',
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
              <InputLabel htmlFor="fecha_reunion">Fecha de Reunion</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_reunion"
                  name="fecha_reunion"
                  type="date"
                  value={formik.values.fecha_reunion || today}
                  onChange={(date) => formik.setFieldValue('fecha_reunion', date)}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formik.touched.fecha_reunion && Boolean(formik.errors.fecha_reunion)}
                      helperText={formik.touched.fecha_reunion && formik.errors.fecha_reunion}
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
              <InputLabel id="jefe_venta">Jefe de Ventas</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Select
                  labelId="jefe_venta"
                  id="jefe_venta_id"
                  name="jefe_venta_id"
                  value={formik.values.jefe_venta_id}
                  onChange={formik.handleChange}
                >
                  {jefesDeVentas?.map((jefe) => (
                    <MenuItem value={jefe.id} key={jefe.id}>
                      {jefe.Empleado.nombres + ' ' + jefe.Empleado.apellidos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.errors.jefe_venta_id && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.jefe_venta_id}{' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="duracion_horas">Duracion (horas)</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                type="number"
                fullWidth
                id="duracion_horas"
                name="duracion_horas"
                value={formik.values.duracion_horas}
                onChange={formik.handleChange}
                error={formik.touched.duracion_horas && Boolean(formik.errors.duracion_horas)}
                helperText={formik.touched.duracion_horas && formik.errors.duracion_horas}
              />
            </Grid>
            <Grid item xs={12} md={3} display="flex" alignItems="center"></Grid>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Button variant="contained" fullWidth type="submit">
                Crear
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </form>
  );
};

export default CreacionCapacitacion;
