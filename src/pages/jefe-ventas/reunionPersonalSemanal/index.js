/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import ReunionPersonalSemanalTables from './tables/index';
import axios from 'utils/axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

const today = dayjs();

import useJefesVentas from 'hooks/useJefesVentas';
import useVendedores from 'hooks/useVendedores';

const validationSchema = yup.object({
  fecha_reunion: yup.date(),
  fecha_desde: yup.date(),
  fecha_hasta: yup.date(),
  jefe_venta_id: yup.string(),
  vendedor_id: yup.string(),
  duracion: yup.number().integer().min(0, 'La duracion debe ser mayor a 0')
});

// eslint-disable-next-line no-unused-vars
const ReunionPersonalSemanal = () => {
  const vendedores = useVendedores();
  const jefesDeVentas = useJefesVentas();

  const initialFormValues = {
    fecha_reunion: '',
    fecha_desde: '',
    fecha_hasta: '',
    jefe_venta_id: '',
    vendedor_id: '',
    duracion: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        // await searchCapacitacionInicial({
        //   fecha_reunion: values.fecha_reunion,
        //   fecha_desde: values.fecha_desde,
        //   fecha_hasta: values.fecha_hasta,
        //   jefe_venta_id: values.jefe_venta_id,
        //   vendedor_id: values.vendedor_id,
        //   duracion: values.duracion
        // });
        dispatch(
          openSnackbar({
            open: true,
            message: 'Reunion personal semanal creada con exito',
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
              <Typography>Creación</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                        <InputLabel id="vendedor">Vendedor</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <Select
                            labelId="vendedor"
                            id="vendedor_id"
                            name="vendedor_id"
                            value={formik.values.vendedor_id}
                            onChange={formik.handleChange}
                          >
                            {vendedores?.map((vendedor) => (
                              <MenuItem value={vendedor.id} key={vendedor.id}>
                                {vendedor.Empleado.nombres + ' ' + vendedor.Empleado.apellidos}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {formik.errors.vendedor_id && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.vendedor_id}{' '}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="duracion">Duracion (min)</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="number"
                          fullWidth
                          id="duracion"
                          name="duracion"
                          value={formik.values.duracion}
                          onChange={formik.handleChange}
                          error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                          helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="celular">Fecha Desde</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={2}>
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
                      <Grid item xs={12} md={1} display="flex" alignItems="center">
                        <InputLabel htmlFor="fecha_hasta">Hasta</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={2}>
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
                      <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" type="submit">
                          Guardar
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
          <ReunionPersonalSemanalTables />
        </Grid>
      </Grid>
    </>
  );
};

ReunionPersonalSemanal.propTypes = {
  contactId: PropTypes.number,
  volver: PropTypes.func
};

export default ReunionPersonalSemanal;
