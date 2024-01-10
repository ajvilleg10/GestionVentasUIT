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
import { LocalizationProvider, TimeField, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import useJefesVentas from 'hooks/useJefesVentas';
import useVendedores from 'hooks/useVendedores';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';


const today = dayjs();


const validationSchema = yup.object({
  fecha_reunion: yup.date().required('La fecha de reunion es requerida'),
  hora_desde: yup.date().required('La hora desde es requerida'),
  jefe_venta_id: yup.string().required('El jefe de ventas es requerido'),
  vendedor_id: yup.string().required('El vendedor es requerido'),
  duracion: yup.date().required('La duracion es requerida')
});

// eslint-disable-next-line no-unused-vars
const ReunionPersonalSemanal = () => {
  // const vendedores = useVendedores();
  // const jefesDeVentas = useJefesVentas();
  const [vendedores, setVendedores] = useState([]);
  const [jefesDeVentas, setJefesDeVentas] = useState([]);
  const { createReunionPersonalSemanal, createJefeConVendedores } = useReunionPersonalSemanal();


  useEffect(()=> {
    const fetchCreateJefeConVendedores = async () => {
      const jefeConVendedores = await createJefeConVendedores();
      console.log('jefeConVendedores', jefeConVendedores);
      setJefesDeVentas(jefeConVendedores);
      

    }
    fetchCreateJefeConVendedores();


  }, []);

  function handleSelectJefeVentas(empleadoIdJefe) {
    console.log('empleadoIdJefe', empleadoIdJefe.target.value);

    formik.setFieldValue('jefe_venta_id', empleadoIdJefe.target.value);
    formik.setFieldValue('vendedor_id', '');
    const foundEmpleadoIdJefe = jefesDeVentas.find((jefe) => jefe.empleadoId === empleadoIdJefe.target.value);
    setVendedores(foundEmpleadoIdJefe?.vendedores);

  }

  //jefe_venta_id actually is empleado_id
  //vendedor_id actually is empleado_id

  const initialFormValues = {
    fecha_reunion: '',
    hora_desde: '',
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
        

        await createReunionPersonalSemanal({
          fecha_reunion: values.fecha_reunion,
          hora_desde: values.hora_desde,
          jefe_venta_id: values.jefe_venta_id,
          vendedor_id: values.vendedor_id,
          duracion: values.duracion
        });
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
                            label="Fecha de Reunion"
                            value={formik.values.fecha_reunion}
                            onChange={(date) => formik.setFieldValue('fecha_reunion', date)}
                            onBlur={formik.handleBlur}
                            slotProps={{
                              textField: {
                                id: 'fecha_reunion',
                                name: 'fecha_reunion',
                                error: formik.touched.fecha_reunion && Boolean(formik.errors.fecha_reunion),
                                helperText: formik.touched.fecha_reunion && formik.errors.fecha_reunion
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
                          <InputLabel id="jefe_venta">Jefe de Venta</InputLabel>
                          <Select
                            labelId="jefe_venta"
                            id="jefe_venta_id"
                            name="jefe_venta_id"
                            value={formik.values.jefe_venta_id}
                            onChange={handleSelectJefeVentas}
                          >
                            {jefesDeVentas?.map((jefe) => (
                              <MenuItem value={jefe.empleadoId} key={jefe.empleadoId}>
                                {jefe.nombre}
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
                          <InputLabel id="vendedor">Vendedor</InputLabel>
                          <Select
                            labelId="vendedor"
                            id="vendedor_id"
                            name="vendedor_id"
                            value={formik.values.vendedor_id}
                            onChange={formik.handleChange}
                          >
                            {vendedores?.map((vendedor) => (
                              <MenuItem value={vendedor.empleadoId} key={vendedor.empleadoId}>
                                {vendedor.nombre}
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
                        <InputLabel htmlFor="duracion">Duración</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <TimeField
                            format='HH:mm'
                            label="Duración"
                            value={formik.values.duracion}
                            onChange={(date) => formik.setFieldValue('duracion', date)}
                            onBlur={formik.handleBlur}
                            slotProps={{
                              textField: {
                                id: 'duracion',
                                name: 'duracion',
                                error: formik.touched.duracion && Boolean(formik.errors.duracion),
                                helperText: formik.touched.duracion && formik.errors.duracion
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
                        <InputLabel htmlFor="celular">Hora Desde</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <TimeField
                            format='HH:mm'
                            label="Hora Desde"
                            value={formik.values.hora_desde}
                            onChange={(date) => formik.setFieldValue('hora_desde', date)}
                            onBlur={formik.handleBlur}
                            slotProps={{
                              textField: {
                                id: 'hora_desde',
                                name: 'hora_desde',
                                error: formik.touched.hora_desde && Boolean(formik.errors.hora_desde),
                                helperText: formik.touched.hora_desde && formik.errors.hora_desde
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid>
                          <Button variant="contained" type="submit">
                            Guardar
                          </Button>

                        </Grid>
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