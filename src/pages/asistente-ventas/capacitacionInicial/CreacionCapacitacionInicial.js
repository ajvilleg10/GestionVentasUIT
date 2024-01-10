/* eslint-disable no-unused-vars */
import { List, ListItem, Grid, InputLabel, FormControl, Select, MenuItem, Button, FormHelperText } from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import useJefesVentas from 'hooks/asistente-ventas/useJefesVenta';
import useProspectoVendedoresPreAprobados from 'hooks/asistente-ventas/useProspectoVendedoresPreAprobados';
import workingDays from 'utils/workingDays';
import useAdminConfig from 'hooks/useAdminConfig';

const validationSchema = yup.object({
  fecha_desde: yup.date('Fecha inválida').required('Fecha de inicio es requerida'),
  fecha_hasta: yup.date('Fecha inválida').required('Fecha de finalización es requerida'),
  jefe_venta_id: yup.string().required('El jefe de ventas es requerido'),
  empleado_id: yup.string().required('El vendedor es requerido')
});

// TODO: Cargar manualmente los feriados empezando cada anio
const CreacionCapacitacionInicial = ({ createCapacitacion }) => {

  const jefesVentas = useJefesVentas();
  const { prospectosVendedores } = useProspectoVendedoresPreAprobados();
  const adminConfig = useAdminConfig();

  useEffect(() => {
    console.log('prospectosVendedores!!', prospectosVendedores);
  }, [jefesVentas, adminConfig]);

  const [isJefeDeVentasSeleccionado, setIsJefeDeVentasSeleccionado] = useState(false);
  const [prospectosXJefes, setProspectosXJefes] = useState([]);

  const formik = useFormik({
    initialValues: {
      fecha_desde: dayjs(),
      fecha_hasta: dayjs(),
      jefe_venta_id: '',
      empleado_id: ''
    },
    validationSchema,
    onSubmit: async (values) => {

      const snackbar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      }

      const days = workingDays(values.fecha_desde, values.fecha_hasta);

      if (days !== adminConfig?.dias_capacitacion_inicial) {

        if (days < 0) {
          snackbar.message = `No deben existir feriados en el rango de fechas seleccionado`;
        } else {
          snackbar.message = `La capacitación inicial debe durar ${adminConfig?.dias_capacitacion_inicial} dias`;
        }
        snackbar.alert.color = 'error';

        dispatch(openSnackbar(snackbar));
        return;
      }

      try {

        await createCapacitacion({
          fecha_desde: values.fecha_desde,
          fecha_hasta: values.fecha_hasta,
          jefe_venta_id: values.jefe_venta_id,
          empleado_id: values.empleado_id,
          duracion_dias: adminConfig?.dias_capacitacion_inicial 
        });

        snackbar.message = 'Capacitación inicial creada con éxito';
        snackbar.alert.color = 'success';

        formik.resetForm();

      } catch (error) {

        console.error(error);

        snackbar.message = error.message ?? 'Error al crear la capacitación inicial';
        snackbar.alert.color = 'error';


      } finally {

        dispatch(openSnackbar(snackbar));
        formik.setSubmitting(false);

      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <List sx={{ py: 0 }} dense>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="fecha_desde">Fecha Desde</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} adapterLocale={'es'}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_desde"
                  name="fecha_desde"
                  type="date"
                  minDate={dayjs()}
                  value={formik.values.fecha_desde}
                  onChange={(date) => formik.setFieldValue('fecha_desde', date)}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      error: formik.touched.fecha_desde && Boolean(formik.errors.fecha_desde),
                      helperText: formik.touched.fecha_desde && formik.errors.fecha_desde
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
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} adapterLocale={'es'}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_hasta"
                  name="fecha_hasta"
                  minDate={dayjs()}
                  type="date"
                  value={formik.values.fecha_hasta}
                  onChange={(date) => formik.setFieldValue('fecha_hasta', date)}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      error: formik.touched.fecha_hasta && Boolean(formik.errors.fecha_hasta),
                      helperText: formik.touched.fecha_hasta && formik.errors.fecha_hasta
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
              <FormControl fullWidth error={formik.touched.jefe_venta_id && Boolean(formik.errors.jefe_venta_id)}>
                <Select
                  labelId="jefe_venta"
                  id="jefe_venta_id"
                  name="jefe_venta_id"
                  value={formik.values.jefe_venta_id}
                  onChange={(e) => {
                    setIsJefeDeVentasSeleccionado(true);

                    const prospectos = prospectosVendedores.filter((p) => p.jefe_venta_id === e.target.value);
                    setProspectosXJefes(prospectos);

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
              {(formik.touched.jefe_venta_id && Boolean(formik.errors.jefe_venta_id)) && (
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
              <FormControl fullWidth error={formik.touched.empleado_id && Boolean(formik.errors.empleado_id)}>
                <Select
                  labelId="prospecto"
                  id="empleado_id"
                  name="empleado_id"
                  value={formik.values.empleado_id}
                  onChange={formik.handleChange}
                  disabled={!isJefeDeVentasSeleccionado}
                >
                  {prospectosXJefes.length === 0 && (
                    <MenuItem value={'empty'} key={'empty'} disabled>
                      No existen prospectos pre-aprobados
                    </MenuItem>
                  )}
                  {prospectosXJefes.map((prospecto) => (
                    <MenuItem value={prospecto.empleado.id} key={prospecto.empleado.id}>
                      {prospecto.empleado.nombres + ' ' + prospecto.empleado.apellidos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {(formik.touched.empleado_id && Boolean(formik.errors.empleado_id)) && (
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
