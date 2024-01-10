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
  Stack
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
import useLeyCompensacion from 'hooks/administrador/useLeyCompensacion';

const today = dayjs();

const validationSchema = yup.object({
  numero_contactos: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  dias_entrega: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  dias_capacitacion_inicial: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  tiempo_registro: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
});

// eslint-disable-next-line no-unused-vars
const Conf_ley_compensacion = () => {

  //const { actualizarConfParametros } = useProspectosVendedores();

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { leyCompensacionBack, createConfParametros } = useLeyCompensacion();

  const [leyCompensacion, setLeyCompensacion] = useState({
    numero_contactos: 1,
    dias_entrega: 1,
    numero_dias: 1,
    tiempo_registro: 1,
  });

  useEffect(() => {
    if (leyCompensacionBack != null) {
      setLeyCompensacion({ ...leyCompensacionBack});
      setIsUserDataLoaded(true);
    }

  }, [leyCompensacionBack]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: leyCompensacion,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createConfParametros(values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Ley de Compesacion creada con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(leyCompensacion);
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
          <form onSubmit={formik.handleSubmit}>
            <List sx={{ py: 0 }} dense>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="numero_contactos">Numero de Contactos para Prospecto Vendedor</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="numero_contactos"
                      name="numero_contactos"
                      value={formik.values.numero_contactos}
                      onChange={formik.handleChange}
                      error={formik.touched.numero_contactos && Boolean(formik.errors.numero_contactos)}
                      helperText={formik.touched.numero_contactos && formik.errors.numero_contactos}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="dias_entrega">Tiempo en días para entrega de informacion por parte del prospecto de vendedor</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="dias_entrega"
                      name="dias_entrega"
                      value={formik.values.dias_entrega}
                      onChange={formik.handleChange}
                      error={formik.touched.dias_entrega && Boolean(formik.errors.dias_entrega)}
                      helperText={formik.touched.dias_entrega && formik.errors.dias_entrega}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="dias_capacitacion_inicial">Número de días Capacitación Inicial</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="numero_dias"
                      name="numero_dias"
                      value={formik.values.numero_dias}
                      onChange={formik.handleChange}
                      error={formik.touched.numero_dias && Boolean(formik.errors.numero_dias)}
                      helperText={formik.touched.numero_dias && formik.errors.numero_dias}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="tiempo_registro">Tiempo Máximo de Registro de Referidos</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="tiempo_registro"
                      name="tiempo_registro"
                      value={formik.values.tiempo_registro}
                      onChange={formik.handleChange}
                      error={formik.touched.tiempo_registro && Boolean(formik.errors.tiempo_registro)}
                      helperText={formik.touched.tiempo_registro && formik.errors.tiempo_registro}
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
      </Grid>
    </>
  );
};

export default Conf_ley_compensacion;