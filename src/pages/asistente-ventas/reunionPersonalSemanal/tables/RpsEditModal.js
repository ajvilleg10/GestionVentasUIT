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
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  IconButton,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableCell
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import ReunionPersonalSemanalTables from './index';
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
import { Close } from '@mui/icons-material';
import AsistioTableRow from './AsistioTableRow';
import { useSelector, useDispatch } from 'store';
import { updateReunionesRPS } from 'store/reducers/reunionesRPSSlice';

const today = dayjs();


const validationSchema = yup.object({
  fecha_reunion: yup.date().required('La fecha de reunion es requerida'),
  hora_desde: yup.date().required('La hora desde es requerida'),
  empleado_id_jefeventa: yup.string().required('El jefe de ventas es requerido'),
  empleado_id_vendedor: yup.string().required('El vendedor es requerido'),
  duracion: yup.date().required('La duracion es requerida')
});

// eslint-disable-next-line no-unused-vars
const RpsEditModal = ({ reunion, handleEditReunionesRPS }) => {
  // const vendedores = useVendedores();
  // const jefesDeVentas = useJefesVentas();
  const [vendedores, setVendedores] = useState([]);
  const [jefesDeVentas, setJefesDeVentas] = useState([]);
  const { createJefeConVendedores, updateReunionesRPS, sendMailWhenUpdate } = useReunionPersonalSemanal();
  const [openEdit, setOpenEdit] = useState(false);
  const [asistioJefeVenta, setAsistioJefeVenta] = useState(0);
  const [puntualCompletaJefeVenta, setPuntualCompletaJefeVenta] = useState(0);
  const [asistioVendedor, setAsistioVendedor] = useState(0);
  const [puntualCompletaVendedor, setPuntualCompletaVendedor] = useState(0);
  const dispatchRPS = useDispatch();
  const [startMinDate, setStartMinDate] = useState(dayjs(new Date()));

  useEffect(() => {
    reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Jefe de Ventas").map((empleado) => {
      setAsistioJefeVenta(empleado.asistio);
      setPuntualCompletaJefeVenta(empleado.puntualCompleta);
    });
    reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Vendedor").map((empleado) => {
      setAsistioVendedor(empleado.asistio);
      setPuntualCompletaVendedor(empleado.puntualCompleta);
    });

  }, []);

  const handleOpenEdit = () => {
    setOpenEdit(true);
    formik.resetForm({
      values: {
        fecha_reunion: dayjs(reunion.fechaReunion),
        hora_desde: dayjs(reunion.horaDesde),
        empleado_id_jefeventa: '',
        empleado_id_vendedor: '',
        duracion: dayjs(reunion.duracion)
      }
    });

    reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Jefe de Ventas").map((empleado) => {
      setAsistioJefeVenta(empleado.asistio);
      setPuntualCompletaJefeVenta(empleado.puntualCompleta);
    });
    // console.log('117', reunion);
    reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Vendedor").map((empleado) => {
      // console.log('asistio vendedor', empleado.asistio, asistioVendedor);
      setAsistioVendedor(empleado.asistio);
      setPuntualCompletaVendedor(empleado.puntualCompleta);
    });

    // console.log(123);


  }



  useEffect(() => {
    const fetchCreateJefeConVendedores = async () => {
      const jefeConVendedores = await createJefeConVendedores();
      // console.log('jefeConVendedores', jefeConVendedores);
      setJefesDeVentas(jefeConVendedores);

    }
    fetchCreateJefeConVendedores();
    let empleadoIdJefeVenta = reunion.empleados.filter((item) => item.nombreTipoCuenta === "Jefe de Ventas");
    // console.log('empleadoIdJefeVenta', empleadoIdJefeVenta);
    empleadoIdJefeVenta = empleadoIdJefeVenta[0].empleadoId;
    let empleadoIdVendedor = reunion.empleados.filter((item) => item.nombreTipoCuenta === "Vendedor");
    empleadoIdVendedor = empleadoIdVendedor[0]?.empleadoId;

    // console.log('empleadoIdJefeVenta', empleadoIdJefeVenta, reunion.empleados);
    // console.log('empleadoIdVendedor', empleadoIdVendedor);

    formik.setFieldValue('empleado_id_jefeventa', empleadoIdJefeVenta);
    const foundEmpleadoIdJefe = jefesDeVentas.find((jefe) => jefe.empleadoId === empleadoIdJefeVenta);
    setVendedores(foundEmpleadoIdJefe?.vendedores);
    formik.setFieldValue('empleado_id_vendedor', empleadoIdVendedor);

    // console.log('message set id jefe');
    // console.log('fetching jefes');

  }, [openEdit]);

  const handleCloseEdit = (event, reason) => {
    if (reason === "backdropClick") {
      return
    }
    setOpenEdit(false);
    // formik.resetForm({
    //   values: {
    //     fecha_reunion: dayjs(reunion.fechaReunion),
    //     hora_desde: dayjs(reunion.horaDesde),
    //     empleado_id_jefeventa: '',
    //     empleado_id_vendedor: '',
    //     duracion: dayjs(reunion.duracion)
    //   }
    // });
    // console.log('reset formik 149', reunion);
  }

  function handleSelectJefeVentas(empleadoIdJefe) {
    // console.log('empleadoIdJefe', empleadoIdJefe.target.value);

    formik.setFieldValue('empleado_id_jefeventa', empleadoIdJefe.target.value);
    formik.setFieldValue('empleado_id_vendedor', '');
    const foundEmpleadoIdJefe = jefesDeVentas.find((jefe) => jefe.empleadoId === empleadoIdJefe.target.value);
    setVendedores(foundEmpleadoIdJefe?.vendedores);

  }




  //empleado_id_jefeventa actually is empleado_id
  //empleado_id_vendedor actually is empleado_id

  // let fechaReunion = reunion.fechaReunion.split('/');
  // fechaReunion = `${fechaReunion[2]}-${fechaReunion[1]}-${fechaReunion[0]}`;





  // let initialFormValues = {
  //   fecha_reunion: dayjs(reunion.fechaReunion),
  //   hora_desde: dayjs(reunion.horaDesde),
  //   empleado_id_jefeventa: '',
  //   empleado_id_vendedor: '',
  //   duracion: dayjs(reunion.duracion)
  // };

  // console.log('175', reunion);
  // useEffect(() => {
  //   // formik.setFieldValue('fecha_reunion', reunion.fechaReunion);
  //   // formik.setFieldValue('hora_desde', reunion.horaDesde);
  //   // formik.setFieldValue('duracion', reunion.duracion);
  //   // formik.setFieldValue('duracion', reunion.duracion);

  //   initialFormValues = {
  //     fecha_reunion: dayjs(reunion.fechaReunion),
  //     hora_desde: dayjs(reunion.horaDesde),
  //     empleado_id_jefeventa: '',
  //     empleado_id_vendedor: '',
  //     duracion: dayjs(reunion.duracion)
  //   };
  let initialFormValues = {
    fecha_reunion: '',
    hora_desde: '',
    empleado_id_jefeventa: '',
    empleado_id_vendedor: '',
    duracion: ''
  };

  //   console.log('reset data', reunion);

  // }, [reunion]);


  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log('select form submit - ', values);
      try {


        await updateReunionesRPS(reunion.idReunion, {
          fecha_reunion: values.fecha_reunion,
          duracion: values.duracion,
          hora_desde: values.hora_desde,
          empleado_id_jefeventa: values.empleado_id_jefeventa,
          empleado_id_vendedor: values.empleado_id_vendedor,
          asistio_jefeventa: asistioJefeVenta,
          puntual_completa_jefeventa: puntualCompletaJefeVenta,
          asistio_vendedor: asistioVendedor,
          puntual_completa_vendedor: puntualCompletaVendedor
        });


        handleEditReunionesRPS({
          id: reunion.idReunion,
          fechaReunion: values.fecha_reunion.toISOString().split('T', 1)[0],
          duracion: values.duracion.toISOString(),
          horaDesde: values.hora_desde.toISOString(),
          empleadoIdJefeVenta: values.empleado_id_jefeventa,
          empleadoIdVendedor: values.empleado_id_vendedor,
          asistioJefeVenta,
          puntualCompletaJefeVenta,
          asistioVendedor,
          puntualCompletaVendedor
        });
        handleCloseEdit();

        // console.log('duracion---', dayjs(reunion.duracion));

        
        
        dispatch(
          openSnackbar({
            open: true,
            message: 'Reunion personal semanal actualizada con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        // formik.setValues(initialFormValues);
        formik.setErrors({});
        formik.setTouched({});

        const response = await sendMailWhenUpdate(reunion.idReunion);
        if (response) {
          setTimeout(() => {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Se envió un correo electrónico a los asistentes de la reunión',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );

          }, 5000);
        }

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

  // useEffect(() => {
  //   console.log('openEdit modal', openEdit);

  // }, [openEdit]);

  // id,
  //   fechaReunion,
  //   duracion,
  //   horaDesde,
  //   empleadoIdJefeVenta,
  //   empleadoIdVendedor,
  //   asistioJefeVenta,
  //   puntualCompletaJefeVenta,
  //   asistioVendedor,
  //   puntualCompletaVendedor





  return (
    <>
      <Button sx={{ mr: 2 }} variant="outlined" startIcon={<ModeEditIcon />}
        onClick={handleOpenEdit}
      >
        Editar
      </Button>
      {openEdit &&
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth
          Backdrop
        >
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={handleCloseEdit}>
              <Close />
            </IconButton>
          </Box>
          <DialogTitle>
            Editar Reunion Personal Semanal:
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* - Número: {reunion.no}<br /> */}
              - ID: {reunion.idReunion}
            </DialogContentText>


            <Grid container spacing={3}>
              <Grid item xs={12}>
                <form id={reunion.idReunion} onSubmit={formik.handleSubmit}>
                  <List sx={{ py: 0 }} dense>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
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
                              disablePast
                              minDate={startMinDate}

                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ display: 'none' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
                          <InputLabel id="jefe_venta">Jefe de Ventas</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel id="jefe_venta">Jefe de Venta</InputLabel>
                            <Select
                              labelId="jefe_venta"
                              id="empleado_id_jefeventa"
                              name="empleado_id_jefeventa"
                              value={formik.values.empleado_id_jefeventa}
                              onChange={handleSelectJefeVentas}
                              disabled
                            >
                              {jefesDeVentas?.map((jefe) => (
                                <MenuItem value={jefe.empleadoId} key={jefe.empleadoId}>
                                  {jefe.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {formik.errors.empleado_id_jefeventa && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {' '}
                              {formik.errors.empleado_id_jefeventa}{' '}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem sx={{ display: 'none' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
                          <InputLabel id="vendedor">Vendedor</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth>
                            <InputLabel id="vendedor">Vendedor</InputLabel>
                            <Select
                              labelId="vendedor"
                              id="empleado_id_vendedor"
                              name="empleado_id_vendedor"
                              value={formik.values.empleado_id_vendedor}
                              onChange={formik.handleChange}
                              disabled
                            >
                              {vendedores?.map((vendedor) => (
                                <MenuItem value={vendedor.empleadoId} key={vendedor.empleadoId}>
                                  {vendedor.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {formik.errors.empleado_id_vendedor && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {' '}
                              {formik.errors.empleado_id_vendedor}{' '}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
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
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
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
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Nombres</TableCell>
                              <TableCell align="left">Apellidos</TableCell>
                              <TableCell align="left">Tipo Usuario</TableCell>
                              <TableCell align="left">Asistió</TableCell>
                              <TableCell align="left">Puntual y Completa</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Jefe de Ventas").map((jefeVenta) => (
                              <AsistioTableRow
                                data={jefeVenta}
                                key={jefeVenta.empleadoId}
                                asistio={asistioJefeVenta}
                                setAsistio={setAsistioJefeVenta}
                                puntualCompleta={puntualCompletaJefeVenta}
                                setPuntualCompleta={setPuntualCompletaJefeVenta}
                              />

                            ))}
                            {reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Vendedor").map((vendedor) => (
                              <AsistioTableRow
                                data={vendedor}
                                key={vendedor.empleadoId}
                                asistio={asistioVendedor}
                                setAsistio={setAsistioVendedor}
                                puntualCompleta={puntualCompletaVendedor}
                                setPuntualCompleta={setPuntualCompletaVendedor}
                              />

                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} display={'flex'} justifyContent={'flex-end'}>
                          <Button sx={{ mr: 2 }} onClick={handleCloseEdit}>Cancelar</Button>
                          <Button
                            color='error'
                            variant='contained'
                            type='submit'
                            

                          >
                            Guardar
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </form>
              </Grid>
            </Grid>


          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog >
      }


    </>
  );
};

RpsEditModal.propTypes = {
  contactId: PropTypes.number,
  volver: PropTypes.func
};

export default RpsEditModal;
