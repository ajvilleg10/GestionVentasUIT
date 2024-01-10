/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  TextField,
  InputLabel,
  Button,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useConfBonificacionGestionJefeVentas } from 'hooks/administrador/useConfBonificacionGestion';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  numero_vendedores_reclutar: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  bono_reclutamiento: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  bono_semanal_comites: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  bono_semanal: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  citas_acompañamiento: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  asistencia: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  bono_acompañamiento: yup.number().min(1, 'La duracion debe ser mayor a 0'),
  contactos_telefonicos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_obtenidas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  referidos_obtenidos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0')
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
  {
    id: 'contactos',
    align: 'center',
    disablePadding: false,
    label: 'Contactos Telefonicos'
  },
  {
    id: 'citas_obtenidas',
    align: 'center',
    disablePadding: true,
    label: 'Citas Nuevas Obtenidas'
  },
  {
    id: 'citas_nuevas',
    align: 'center',
    disablePadding: true,
    label: 'Citas Nuevas Concretadas'
  },
  {
    id: 'citas_cierre_concretadas',
    align: 'center',
    disablePadding: true,
    label: 'Citas de Cierre Concretadas	'
  },
  {
    id: 'referidos_obtenidos',
    align: 'center',
    disablePadding: false,
    label: 'Referidos Obtenidos'
  },
  {
    id: 'negocios_xcerrar',
    align: 'center',
    disablePadding: false,
    label: 'Negocios Por Cerrar	'
  },

];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// TODO: Para observar la configuracion de cada jefe de ventas se debe poner un select
const BonificacionJefeVentas = () => {

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { bonJV, jefesV, confEmpl, createBonJV } = useConfBonificacionGestionJefeVentas();

  const [bonificacionJV, setBonificacionJV] = useState({
    bono_semanal_comites: 1,
    bono_reclutamiento: 1,
    bono_acompañamiento: 1,
    bono_semanal: 1,
    numero_vendedores_reclutar: 1,
    citas_acompañamiento: 1,
    asistencia: 1,
    contactos_telefonicos: 1,
    citas_concretadas: 1,
    citas_obtenidas: 1,
    referidos_obtenidos: 1,
  });

  const [jefesVentas, setJefesVentas] = useState([])
  const [confEmpds, setConfEmpds] = useState([])
  const [jefeSelected, setJefeSelected] = useState()

  useEffect(() => {
    if (bonJV != null) {
      setBonificacionJV({ ...bonJV });
      setIsUserDataLoaded(true);
      console.log("bonJV");
      console.log(bonJV);
      console.log("bonificacionJV");
      console.log(bonificacionJV);
    }

  }, [bonJV]);

  useEffect(() => {
    setJefesVentas([...jefesV])
    setConfEmpds([...confEmpl])
  }, [jefesV])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...bonificacionJV },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values)
        await createBonJV(values);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Bonificación agregada con Exíto',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(bonificacionJV);
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
            <List sx={{ py: 2 }} dense>
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="numero_vendedores_reclutar">Número de vendedores a <br />reclutar por mes</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      id="numero_vendedores_reclutar"
                      name="numero_vendedores_reclutar"
                      value={formik.values.numero_vendedores_reclutar}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.numero_vendedores_reclutar && Boolean(formik.errors.numero_vendedores_reclutar)}
                      helperText={formik.touched.numero_vendedores_reclutar && formik.errors.numero_vendedores_reclutar}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="bono_reclutamiento">Bono mensual por reclutamiento</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      id="bono_reclutamiento"
                      name="bono_reclutamiento"
                      value={formik.values.bono_reclutamiento}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                        step: "0.01"
                      }}
                      error={formik.touched.bono_reclutamiento && Boolean(formik.errors.bono_reclutamiento)}
                      helperText={formik.touched.bono_reclutamiento && formik.errors.bono_reclutamiento}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="asistencias">Porcentaje de asistencia (CQV - CMV - CSG)</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      id="asistencia"
                      name="asistencia"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      defaultValue={formik.values.asistencia}
                      value={formik.values.asistencia}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.asistencia && Boolean(formik.errors.asistencia)}
                      helperText={formik.touched.asistencia && formik.errors.asistencia}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="bono_semanal_comites">Bono semanal por <br />asistencia (CQV - CMV - CSG)</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      id="bono_semanal_comites"
                      name="bono_semanal_comites"
                      value={formik.values.bono_semanal_comites}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                        step: "0.01"
                      }}
                      error={formik.touched.bono_semanal_comites && Boolean(formik.errors.bono_semanal_comites)}
                      helperText={formik.touched.bono_semanal_comites && formik.errors.bono_semanal_comites}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="citas_acompañamiento">Número de citas de <br />acompañamiento por mes</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      id="citas_acompañamiento"
                      name="citas_acompañamiento"
                      value={formik.values.citas_acompañamiento}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                      }}
                      error={formik.touched.citas_acompañamiento && Boolean(formik.errors.citas_acompañamiento)}
                      helperText={formik.touched.citas_acompañamiento && formik.errors.citas_acompañamiento}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={3} display="flex" alignItems="center" >
                    <InputLabel htmlFor="bono_acompañamiento">Bono mensual por acompañamiento <br />a citas</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      id="bono_acompañamiento"
                      name="bono_acompañamiento"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      value={formik.values.bono_acompañamiento}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                        step: "0.01"
                      }}
                      error={formik.touched.bono_acompañamiento && Boolean(formik.errors.bono_acompañamiento)}
                      helperText={formik.touched.bono_acompañamiento && formik.errors.bono_reclutabono_acompañamientomiento}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="jefe_ventas">Jefe de Ventas</InputLabel> 
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Select fullWidth onChange={(tipo) => { setJefeSelected(tipo.target.value); console.log((confEmpds)) }}>
                      {jefesVentas.map((jefe, index) => {
                        return <MenuItem key={index} value={index}>{jefe.Empleado.nombres + " " + jefe.Empleado.apellidos}</MenuItem>
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={3} display="flex" alignItems="center" >
                    <InputLabel htmlFor="bono_semanal">Bono semanal por gestión de ventas</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      type="number"
                      fullWidth
                      id="bono_semanal"
                      name="bono_semanal"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      value={formik.values.bono_semanal}
                      onChange={formik.handleChange}
                      inputProps={{
                        min: 1,
                        step: "0.01"
                      }}
                      error={formik.touched.bono_acompañamiento && Boolean(formik.errors.bono_acompañamiento)}
                      helperText={formik.touched.bono_acompañamiento && formik.errors.bono_reclutabono_acompañamientomiento}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <Box mt={4}>
                <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                  <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
                    <OrderTableHead />
                    <TableBody sx={{ width: '100%' }}>
                      {(jefeSelected != null && confEmpds.length > 0 ?

                        < TableRow
                          hover
                          role="checkbox"
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left" >
                            <TextField
                              fullWidth
                              value={confEmpds[0].contactos_telefonicos * jefesVentas[jefeSelected]['vendedoresQ']}
                              disabled
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              value={confEmpds[0].citas_nuevas_obtenidas * jefesVentas[jefeSelected]['vendedoresQ']}
                              disabled
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              value={confEmpds[0].citas_nuevas_concretadas * jefesVentas[jefeSelected]['vendedoresQ']}
                              disabled
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              value={confEmpds[0].citas_cierre_concretadas * jefesVentas[jefeSelected]['vendedoresQ']}
                              disabled
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              value={confEmpds[0].referidos_obtenidos * jefesVentas[jefeSelected]['vendedoresQ']}
                              disabled
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              fullWidth
                              value={(confEmpds[0].negocios_xcerrar * jefesVentas[jefeSelected]['vendedoresQ'])}
                              disabled
                            />
                          </TableCell>
                        </TableRow>

                        : null)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <ListItem sx={{ paddingTop: 3 }}>
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

export default BonificacionJefeVentas;
