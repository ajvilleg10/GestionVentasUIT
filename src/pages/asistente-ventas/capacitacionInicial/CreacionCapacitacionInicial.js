import { List, ListItem, Grid, InputLabel, FormControl, Select, MenuItem, Button, FormHelperText } from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import useJefesVentas from 'hooks/useJefesVentas';
import useProspectoVendedoresPreAprobados from 'hooks/asistente-ventas/useProspectoVendedoresPreAprobados';
import workingDays from 'utils/workingDays';

const today = dayjs();

const validationSchema = yup.object({
  fecha_desde: yup.date().required('Fecha de inicio es requerida'),
  fecha_hasta: yup.date().required('Fecha de finalización es requerida'),
  jefe_venta_id: yup.string(),
  empleado_id: yup.string()
});

const INIT_DAYS = 5; // Obtener esto desde el back. Configuracion del administrador

// eslint-disable-next-line react/prop-types
const CreacionCapacitacionInicial = ({ createCapacitacion }) => {
  const jefesVentas = useJefesVentas();
  const { prospectosVendedores } = useProspectoVendedoresPreAprobados();

  const [isJefeDeVentasSeleccionado, setIsJefeDeVentasSeleccionado] = useState(false);
  const [jefeVentasID, setJefeVentasID] = useState(-1);

  const initialFormValues = {
    fecha_desde: today,
    fecha_hasta: today,
    jefe_venta_id: '',
    empleado_id: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {

      console.log('select form submit - ', values);

      if (workingDays(values.fecha_desde, values.fecha_hasta) != INIT_DAYS) {
        dispatch(
          openSnackbar({
            open: true,
            message: `La capacitación inicial debe durar ${INIT_DAYS} dias`,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
        return;
      }

      try {
        await createCapacitacion({
          fecha_desde: values.fecha_desde,
          fecha_hasta: values.fecha_hasta,
          jefe_venta_id: values.jefe_venta_id,
          empleado_id: values.empleado_id
        });
        dispatch(
          openSnackbar({
            open: true,
            message: 'Capacitación inicial creada con éxito',
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
              <InputLabel htmlFor="celular">Fecha Desde</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_desde"
                  name="fecha_desde"
                  type="date"
                  value={formik.values.fecha_desde || today}
                  onChange={(date) => formik.setFieldValue('fecha_desde', date)}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    textField: {
                      variant: 'outlined'
                      // error: formik.touched.fecha_desde && Boolean(formik.errors.fecha_desde),
                      // helperText: formik.touched.fecha_desde && formik.errors.fecha_desde
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
              <InputLabel htmlFor="fecha_hasta">Fecha Hasta</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_hasta"
                  name="fecha_hasta"
                  type="date"
                  value={formik.values.fecha_hasta || today}
                  onChange={(date) => formik.setFieldValue('fecha_hasta', date)}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    textField: {
                      variant: 'outlined'
                      // error: formik.touched.fecha_hasta && Boolean(formik.errors.fecha_hasta),
                      // helperText: formik.touched.fecha_hasta && formik.errors.fecha_hasta
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
              <InputLabel id="jefe_venta">Jefe de Ventas</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Select
                  labelId="jefe_venta"
                  id="jefe_venta_id"
                  name="jefe_venta_id"
                  value={formik.values.jefe_venta_id}
                  onChange={(e) => {

                    setIsJefeDeVentasSeleccionado(true);
                    setJefeVentasID(e.target.value);

                    formik.handleChange(e);
                  }}
                >
                  {jefesVentas?.map((jefe) => (
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
              <InputLabel id="prospecto">Prospecto Vendedor</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Select
                  labelId="prospecto"
                  id="empleado_id"
                  name="empleado_id"
                  value={formik.values.empleado_id}
                  onChange={formik.handleChange}
                  disabled={!isJefeDeVentasSeleccionado}
                >
                  {prospectosVendedores.length == 0 && (
                    <MenuItem value={'empty'} key={'empty'} disabled>
                      No existen prospectos pre-aprobados
                    </MenuItem>
                  )}
                  {prospectosVendedores?.filter((p) => p.jefe_venta_id === jefeVentasID).map((prospecto) => (
                    <MenuItem value={prospecto.Empleado.id} key={prospecto.Empleado.id}>
                      {prospecto.Empleado.nombres + ' ' + prospecto.Empleado.apellidos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.errors.empleado_id && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.empleado_id}{' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Button variant="contained" fullWidth type="submit">
            Crear
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default CreacionCapacitacionInicial;
