/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

// import axios from 'utils/axios';
import { useSelector } from 'store';
import { useMediaQuery } from '@mui/material';

import { Grid, List, ListItem, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

// project import
import MainCard from 'components/MainCard';
import ActividadesPendientesTable from 'pages/jefe-ventas/ActividadesPendientesTable';

import { useFormik } from 'formik';
import * as yup from 'yup';
import useOrigenesContactos from 'hooks/useOrigenesContactos';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  fechaRegistro: yup.date(),
  nombresApellidos: yup.string(),
  celular: yup.string(),
  origen: yup.string()
});

// ==============================|| SAMPLE PAGE ||============================== //
const today = dayjs();

const ActividadesPendientesJefeVentas = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const origenes = useOrigenesContactos();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fechaRegistro: '',
      nombresApellidos: '',
      celular: '',
      origen: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('select form submit - ', values);
      // dispatch(
      //   openSnackbar({
      //     open: true,
      //     message: 'Informacion enviada con exito',
      //     variant: 'alert',
      //     alert: {
      //       color: 'success'
      //     },
      //     close: false
      //   })
      // );
    }
  });

  // const consultar = () => {};

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MainCard title="Busqueda">
            <form onSubmit={formik.handleSubmit}>
              <List sx={{ py: 0 }} dense>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel htmlFor="fechaRegistro">Fecha Registro</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker
                          fullWidth
                          format="DD/MM/YYYY"
                          id="fechaRegistro"
                          name="fechaRegistro"
                          type="date"
                          value={formik.values.fechaRegistro || today}
                          onChange={(date) => formik.setFieldValue('fechaRegistro', date)}
                          onBlur={formik.handleBlur}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={formik.touched.fechaRegistro && Boolean(formik.errors.fechaRegistro)}
                              helperText={formik.touched.fechaRegistro && formik.errors.fechaRegistro}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel htmlFor="nombresApellidos">Nombres y Apellidos</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="nombresApellidos"
                        name="nombresApellidos"
                        value={formik.values.nombresApellidos}
                        onChange={formik.handleChange}
                        error={formik.touched.nombresApellidos && Boolean(formik.errors.nombresApellidos)}
                        helperText={formik.touched.nombresApellidos && formik.errors.nombresApellidos}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel htmlFor="celular">Celular</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        placeholder="0990729257"
                        id="celular"
                        name="celular"
                        value={formik.values.celular}
                        onChange={formik.handleChange}
                        error={formik.touched.celular && Boolean(formik.errors.celular)}
                        helperText={formik.touched.celular && formik.errors.celular}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center">
                      <InputLabel id="origenLabel">Origen</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormControl fullWidth>
                        <Select labelId="origenLabel" id="origen" name="origen" value={formik.values.origen} onChange={formik.handleChange}>
                          {origenes?.map((origen) => (
                            <MenuItem value={origen} key={origen}>
                              {origen}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {formik.errors.origen && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {' '}
                          {formik.errors.origen}{' '}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={12} display="flex" alignItems="center">
                    <Button variant="contained" fullWidth type="submit">
                      Consultar
                    </Button>
                  </Grid>
                </ListItem>
              </List>
            </form>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <ActividadesPendientesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default ActividadesPendientesJefeVentas;
