// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import {
  Grid,
  List,
  ListItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

// project import
import AsistenciaTable from './AsistenciaTable';
import useCapacitacionesIniciales from 'hooks/useCapacitacionesIniciales';
import CreacionCapacitacionInicial from './CreacionCapacitacionInicial';
import useJefesVentas from 'hooks/useJefesVentas';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

const today = dayjs();

const validationSchema = yup.object({
  fecha_desde: yup.date(),
  fecha_hasta: yup.date(),
  jefe_venta_id: yup.string()
});

// ==============================|| SAMPLE PAGE ||============================== //

const CapacitacionInicial = () => {
  // TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
  const { capacitacionesIniciales, createCapacitacionInicialAndRefresh, searchCapacitacionInicial } = useCapacitacionesIniciales();
  const jefesDeVentas = useJefesVentas();

  const initialFormValues = {
    fecha_desde: '',
    fecha_hasta: '',
    jefe_venta_id: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        await searchCapacitacionInicial({
          fecha_desde: values.fecha_desde,
          fecha_hasta: values.fecha_hasta,
          jefe_venta_id: values.jefe_venta_id
        });
        dispatch(
          openSnackbar({
            open: true,
            message: 'Capacitacion Inicial creada con exito',
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
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Creación de Capacitación inicial</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionCapacitacionInicial createCapacitacion={createCapacitacionInicialAndRefresh} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={formik.touched.fecha_desde && Boolean(formik.errors.fecha_desde)}
                                helperText={formik.touched.fecha_desde && formik.errors.fecha_desde}
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
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={formik.touched.fecha_hasta && Boolean(formik.errors.fecha_hasta)}
                                helperText={formik.touched.fecha_hasta && formik.errors.fecha_hasta}
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
                        <InputLabel id="jefe_venta">Jefe de Ventas Asignado</InputLabel>
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
                      <Grid item xs={12} md={3} display="flex" alignItems="center"></Grid>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <Button variant="contained" fullWidth type="submit">
                          Consultar
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </form>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaTable data={capacitacionesIniciales} />
        </Grid>
      </Grid>
    </>
  );
};

export default CapacitacionInicial;
