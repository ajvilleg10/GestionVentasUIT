/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState, Component, Fragment } from 'react';
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
  Stack
} from '@mui/material';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import axios from 'utils/axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import dayjs from 'dayjs';
import { CompactPicker } from 'react-color';
import useConfParametros from 'hooks/administrador/useAdministrador';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

const today = dayjs();

const validationSchema = yup.object({
  numero_contactos: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  dias_entrega: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  dias_capacitacion_inicial: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  tiempo_registro: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
});
// eslint-disable-next-line no-unused-vars
const Conf_parametros = () => {

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { confParametrosBack, createConfParametros } = useConfParametros();
  const [confParametros, setConfParametros] = useState({
    numero_contactos: '',
    dias_entrega: '',
    tiempo_registro: '',
    dias_capacitacion_inicial: '',
    dia_seleccionado: "Lunes",
    hora_seleccionado: "00:00:00",
    color_concretada: '#ffffff',
    color_obtenida: '#ffffff',
    color_cierre: '#ffffff'
  });

  useEffect(() => {
    if (confParametrosBack != null) {
      setConfParametros({
        numero_contactos: confParametrosBack.numero_contactos,
        dias_entrega: confParametrosBack.dias_entrega,
        tiempo_registro: confParametrosBack.tiempo_registro,
        dias_capacitacion_inicial: confParametrosBack.dias_capacitacion_inicial,
        dia_seleccionado: confParametrosBack.dia_seleccionado,
        hora_seleccionado: confParametrosBack.hora_seleccionado,
        color_concretada: confParametrosBack.color_concretada,
        color_obtenida: confParametrosBack.color_obtenida,
        color_cierre: confParametrosBack.color_cierre
      });
      setHora_seleccionado(dayjs(confParametrosBack.hora_seleccionado));
      setColor_concretada(confParametrosBack.color_concretada);
      setColor_obtenida(confParametrosBack.color_obtenida);
      setColor_cierre(confParametrosBack.color_cierre);
      setIsUserDataLoaded(true);
    }

  }, [confParametrosBack]);

  const [color_concretada, setColor_concretada] = useState();
  const [color_obtenida, setColor_obtenida] = useState();
  const [color_cierre, setColor_cierre] = useState();
  const [hora_seleccionado, setHora_seleccionado] = useState('10:00');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: confParametros,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createConfParametros(values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Configuracion guardada con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(confParametros);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
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

  if (!isUserDataLoaded) {
    // Show a loading spinner or placeholder while user data is being fetched
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <List sx={{ py: 0 }} dense>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="numero_contactos">Numero de Contactos para Prospecto Vendedor</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="numero_contacto"
                      name="numero_contactos"
                      value={formik.values.numero_contactos}
                      onChange={formik.handleChange}
                      defaultValue={formik.values.numero_contactos}
                      placeholder="1"
                      inputProps={{ min: 1 }}
                      error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                      helperText={formik.touched.duracion && formik.errors.duracion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="dias_entrega">Tiempo en días para entrega de informacion <br/>por parte del prospecto de vendedor</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="dias_entrega"
                      name="dias_entrega"
                      value={formik.values.dias_entrega}
                      onChange={formik.handleChange}
                      placeholder="1"
                      defaultValue={formik.values.dias_entrega}
                      inputProps={{ min: 1 }}
                      error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                      helperText={formik.touched.duracion && formik.errors.duracion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="dias_capacitacion_inicial">Número de días Capacitación Inicial</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="dias_capacitacion_inicial"
                      name="dias_capacitacion_inicial"
                      value={formik.values.dias_capacitacion_inicial}
                      onChange={formik.handleChange}
                      placeholder="1"
                      inputProps={{ min: 1 }}
                      defaultValue={formik.values.dias_capacitacion_inicial}
                      error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                      helperText={formik.touched.duracion && formik.errors.duracion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="tiempo_registro">Número de días Capacitación Inicial</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="tiempo_registro"
                      name="tiempo_registro"
                      value={formik.values.tiempo_registro}
                      onChange={formik.handleChange}
                      placeholder="1"
                      inputProps={{ min: 1 }}
                      defaultValue={formik.values.tiempo_registro}
                      error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                      helperText={formik.touched.duracion && formik.errors.duracion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="dia_seleccionado">Tiempo Máximo de Registro de Referidos</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <Select labelId='dia_seleccionado' name='dia_seleccionado' id="dia_seleccionado" value={formik.values.dia_seleccionado} onChange={formik.handleChange} defaultValue={formik.values.dia_seleccionado}>
                      <MenuItem key="Lunes" value="Lunes">Lunes</MenuItem>
                      <MenuItem key="Martes" value="Martes">Martes</MenuItem>
                      <MenuItem key="Miercoles" value="Miercoles">Miercoles</MenuItem>
                      <MenuItem key="Jueves" value="Jueves">Jueves</MenuItem>
                      <MenuItem key="Viernes" value="Viernes">Viernes</MenuItem>
                      <MenuItem key="Sabado" value="Sabado">Sabado</MenuItem>
                      <MenuItem key="Domingo" value="Domingo">Domingo</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                      <TimePicker labelId='hora_seleccionado' name='hora_seleccionado' id="hora_seleccionado"
                        key="hora_seleccionado" defaultValue={dayjs(formik.values.hora_seleccionado)} label="Escoja la hora"
                        value={hora_seleccionado} onChange={(value) => {setHora_seleccionado(value); formik.values.hora_seleccionado = value.toDate()}} />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="label_colores_contactos">Colores de  contacto telefónico</InputLabel>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="color_concretada">Cita Nueva Concretada</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CompactPicker labelId='color_concretada' name='color_concretada' id="color_concretada" value={color_concretada}
                      triangle='hide'
                      color={color_concretada}
                      defaultValue={color_concretada}
                      onChange={(colorcito) => { setColor_concretada(colorcito); formik.values.color_concretada = colorcito.hex}}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="color_obtenida">Cita Nueva Obtenida</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CompactPicker labelId='color_obtenida' name='color_obtenida' id="color_obtenida" value={color_obtenida}
                      triangle='hide'
                      color={color_obtenida}
                      defaultValue={color_obtenida}
                      onChange={(colorcito) => { setColor_obtenida(colorcito); formik.values.color_obtenida = colorcito.hex}}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="color_cierre">Cita de Cierre</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CompactPicker labelId='color_cierre' name='color_cierre' id="color_cierre" value={color_cierre}
                      triangle='hide'
                      color={color_cierre}
                      defaultValue={color_cierre}
                      onChange={(colorcito) => { setColor_cierre(colorcito); formik.values.color_cierre = colorcito.hex}}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Button variant="contained" type="submit">
                      Guardar
                    </Button>
                  </Stack>
                </Grid>
              </ListItem>
            </List>
          </form>
        </Grid>
      </Grid >
    </>
  );
};

export default Conf_parametros;
