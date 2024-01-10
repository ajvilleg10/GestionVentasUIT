/* eslint-disable no-unused-vars */
import { List, ListItem, Grid, InputLabel, FormControl, Select, MenuItem, Button, FormHelperText } from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

import useJefesVentas from 'hooks/asistente-ventas/useJefesVenta';
import useProspectoVendedoresPreAprobados from 'hooks/asistente-ventas/useProspectoVendedoresPreAprobados';

import workingDays from 'utils/workingDays';
import useCurrentUser from 'hooks/useCurrentUser';
// import useActividad from 'hooks/useActividad';

const today = dayjs();

const validationSchema = yup.object({
  fecha_desde: yup.date().required('Fecha de inicio es requerida'),
  fecha_hasta: yup.date().required('Fecha de finalización es requerida'),
  jefe_venta_id: yup.string(),
  empleado_id: yup.string()
});

// TODO: Obtener la configuracion desde la base por parte del admin
const INIT_DAYS = 4; // Obtener esto desde el back. Configuracion del administrador

const CreacionCapacitacionInicial = ({ createCapacitacion }) => {

  // const { getActividadesByEmpleadoIdByBodyData } = useActividad();

  const jefesVentas = useJefesVentas();
  const { prospectosVendedores } = useProspectoVendedoresPreAprobados();
  useEffect(() => {
    console.log('prospectosVendedores!!', prospectosVendedores);

  }, [jefesVentas]);

  const [isJefeDeVentasSeleccionado, setIsJefeDeVentasSeleccionado] = useState(false);
  const [prospectosXJefes, setProspectosXJefes] = useState([]);
  // const asistenteVenta = useCurrentUser();

  // useEffect(() => {
  //   console.log('asistenteVenta', asistenteVenta);

  // }, [asistenteVenta]);
  // const asistenteVentaId = asistenteVenta?.cuentaInfo?.id;



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

      const snackbar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      }

      if (workingDays(values.fecha_desde, values.fecha_hasta) !== INIT_DAYS) {

        snackbar.message = `La capacitación inicial debe durar ${INIT_DAYS} dias`;
        snackbar.alert.color = 'error';

        dispatch(openSnackbar(snackbar));
        return;
      }

      try {

        // const actividades = await getActividadesByEmpleadoIdByBodyData(values.empleado_id, {
        //   tipo_actividad: "Contactos",
        //   origen: "Proyecto 100",
        //   pre_aprobada: true

        // });
        // if (actividades.length === 0) {

        //   snackbar.message = 'El prospecto seleccionado no tiene actividades pre-aprobadas';
        //   snackbar.alert.color = 'error';

        //   dispatch(openSnackbar(snackbar));
        //   return;
        // }
        await createCapacitacion({
          fecha_desde: values.fecha_desde,
          fecha_hasta: values.fecha_hasta,
          jefe_venta_id: values.jefe_venta_id,
          empleado_id: values.empleado_id,
          duracion_dias: INIT_DAYS
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
              <InputLabel htmlFor="celular">Fecha Desde</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_desde"
                  name="fecha_desde"
                  type="date"
                  minDate={dayjs()}
                  value={formik.values.fecha_desde || today}
                  onChange={(date) => formik.setFieldValue('fecha_desde', date)}
                  onBlur={formik.handleBlur}
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
            <Grid item xs={12} md={2} display="flex" alignItems="center">
              <InputLabel htmlFor="fecha_hasta">Fecha Hasta</InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  id="fecha_hasta"
                  name="fecha_hasta"
                  minDate={dayjs()}
                  type="date"
                  value={formik.values.fecha_hasta || today}
                  onChange={(date) => formik.setFieldValue('fecha_hasta', date)}
                  onBlur={formik.handleBlur}
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
