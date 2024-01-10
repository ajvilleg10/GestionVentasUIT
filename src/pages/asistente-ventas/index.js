import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  List,
  ListItem,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  useMediaQuery,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';
import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import * as yup from 'yup';

import useProspectosVendedores from 'hooks/useProspectosVendedores';
import Registro from 'pages/asistente-ventas/registro/Registro';

import useTiposCuentas from 'hooks/useTiposCuentas';
import useJefesVentas from 'hooks/asistente-ventas/useJefesVenta';

import { EmptyTable } from 'components/third-party/ReactTable';

const headCells = [
  {
    id: 'numero',
    label: 'ID',
    align: 'center',
    disablePadding: true
  },
  {
    id: 'nombres',
    label: 'Nombres',
    align: 'center',
    disablePadding: true
  },
  {
    id: 'apellidos',
    label: 'Apellidos',
    align: 'center',
    disablePadding: true
  },
  {
    id: 'celular',
    label: 'Celular',
    align: 'center',
    disablePadding: false
  }
];

const validationSchema = yup.object({
  nombres: yup.string().required('Campo requerido').test('names', 'Ingrese nombres completos', (value) => {
    if (!value || value === '') return false;

    const words = value.split(' ');
    for (const w of words) {
      if (w === '') return false;
    }

    return true;

  }).test('format', 'Nombre inválido: Solo debe contener letras', (value) => {
    const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
    return lettersOnlyRegex.test(value);
  }),
  apellidos: yup.string().required('Campo requerido').test('names', 'Ingrese apellidos completos', (value) => {

    if (!value || value === '') return false;

    const words = value.split(' ');
    if (words.length < 2) return false;
    if (words[0] === '' || words[1] === '') return false;

    return true;

  }).test('format', 'Apellido inválido: Solo debe contener letras', (value) => {
    const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
    return lettersOnlyRegex.test(value);
  }),
  email: yup.string().email('Formato de email inválido').required('Campo requerido'),
  password: yup.string().required('Campo requerido').test('strong_password', 'La contraseña debe tener al menos 8 caracters con minúsculas, mayúsculas y números', (value) => {
    if (!value) return false;
    if (value.length === 0) return false;
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');

    return pattern.test(value) && value.length >= 8;
  }),
  trabajo_actual: yup.string().required('Campo requerido'),
  nombre_empresa: yup.string().when('trabajo_actual', {
    is: (value) => value && value === "SI",
    then: (schema) => schema.required("Campo requerido").test('format', 'Nombre de empresa inválido', (value) => {
      const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ\.]+$/;
      return lettersOnlyRegex.test(value);
    }),
    otherwise: (schema) => schema,
  }),
  jefeDeVentas: yup.string().required('El campo jefe de ventas es obligatorio'),
  tipoDeUsuario: yup.string().required('Campo requerido'),
  oficina: yup.string().required("Campo requerido")
});

const AsistenteDeVentas = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { prospectosVendedores, createProspectoVendedorAndRefresh } = useProspectosVendedores();
  const [showProspectoInfo, setShowProspectoInfo] = useState(false);
  const [prospecto, setProspecto] = useState({});

  const tiposUsuario = useTiposCuentas();
  const jefesDeVentas = useJefesVentas();

  const handleClick = (prospectoVendedor) => {
    setProspecto(prospectoVendedor);
    setShowProspectoInfo(true);
  };

  const formik = useFormik({
    initialValues: {
      oficina: 'Guayaquil - Ecuador',
      nombres: '',
      apellidos: '',
      email: '',
      password: '',
      trabajo_actual: 'NO',
      nombre_empresa: '',
      tipoDeUsuario: 'prospecto_vendedor',
      jefeDeVentas: ''
    },
    validationSchema,
    onSubmit: async (values) => {

      try {

        const tipoID = tiposUsuario.filter((u) => u.alias === values.tipoDeUsuario)[0];

        await createProspectoVendedorAndRefresh({
          nombres: values.nombres,
          apellidos: values.apellidos,
          oficina: values.oficina,
          tipo_cuenta_id: tipoID.id,
          jefe_venta_id: values.jefeDeVentas,
          trabajo_actual: values.trabajo_actual,
          nombre_empresa: values.nombre_empresa,
          email: values.email,
          password: values.password
        });

        dispatch(
          openSnackbar({
            open: true,
            message: 'Prospecto creado con éxito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );

        formik.resetForm();

      } catch (error) {

        console.log('Error en la creacion del prospecto', error);

        dispatch(
          openSnackbar({
            open: true,
            message: error.error,
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );

      } finally {

        formik.setSubmitting(false);

      }
    }
  });

  return (
    <>
      {showProspectoInfo ? (
        <Registro volver={() => setShowProspectoInfo(false)} prospectoVendedor={prospecto} />
      ) : (
        <Grid container spacing={3} width={'100%'}>
          <Grid item width={'100%'}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Crear Prospecto Vendedor</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form onSubmit={formik.handleSubmit}>
                  <List sx={{ py: 0 }}>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel id="tipoDeUsuario">Tipo de Usuario*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Select
                              labelId="tipoDeUsuario"
                              id="tipoDeUsuarioSelect"
                              name="tipoDeUsuario"
                              value={formik.values.tipoDeUsuario}
                              disabled
                            >
                              <MenuItem value={'prospecto_vendedor'}>
                                Prospecto de Vendedor
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel id="oficina">Oficina*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={formik.touched.oficina && Boolean(formik.errors.oficina)}>
                            <Select
                              labelId="oficina"
                              id="oficinaSelect"
                              name="oficina"
                              value={formik.values.oficina}
                              disabled
                            // onChange={formik.handleChange}
                            >
                              <MenuItem value={formik.values.oficina}>
                                {formik.values.oficina}
                              </MenuItem>
                              {/* {OFICINAS.map((oficina) => ( */}
                              {/*   <MenuItem value={oficina} key={oficina}> */}
                              {/*     {oficina} */}
                              {/*   </MenuItem> */}
                              {/* ))} */}
                            </Select>
                          </FormControl>
                          {/* {(formik.touched.oficina && Boolean(formik.errors.oficina)) && ( */}
                          {/*   <FormHelperText error id="standard-weight-helper-text-email-login"> */}
                          {/*     {' '} */}
                          {/*     {formik.errors.oficina}{' '} */}
                          {/*   </FormHelperText> */}
                          {/* )} */}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel htmlFor="nombres">Nombres*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            id="nombres"
                            name="nombres"
                            value={formik.values.nombres}
                            onChange={formik.handleChange}
                            error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                            helperText={formik.touched.nombres && formik.errors.nombres}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel htmlFor="apellidos">Apellidos*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            id="apellidos"
                            name="apellidos"
                            value={formik.values.apellidos}
                            onChange={formik.handleChange}
                            error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                            helperText={formik.touched.apellidos && formik.errors.apellidos}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel id="jefeDeVentas">Jefe de ventas*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth error={formik.touched.jefeDeVentas && Boolean(formik.errors.jefeDeVentas)}>
                            <Select
                              id="jefeDeVentasSelect"
                              name="jefeDeVentas"
                              value={formik.values.jefeDeVentas}
                              onChange={formik.handleChange}
                            >
                              {jefesDeVentas.length === 0 ? (
                                <MenuItem value={''} disabled>
                                  No existen jefes de venta
                                </MenuItem>
                              ) : (
                                jefesDeVentas?.map((jefeDeVentas) => (
                                  <MenuItem value={jefeDeVentas.id} key={jefeDeVentas.id}>
                                    {jefeDeVentas.Empleado.nombres + ' ' + jefeDeVentas.Empleado.apellidos}
                                  </MenuItem>
                                ))
                              )}
                              {}
                            </Select>
                          </FormControl>
                          {(formik.touched.jefeDeVentas && Boolean(formik.errors.jefeDeVentas)) && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {' '}
                              {formik.errors.jefeDeVentas}{' '}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel htmlFor="email">Correo*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel htmlFor="password">Contraseña*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                          <InputLabel htmlFor="trabajo_actual">Trabajo actual*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <FormControl fullWidth>
                            <Select
                              id="trabajo_actual_select_id"
                              name="trabajo_actual"
                              value={formik.values.trabajo_actual}
                              onChange={formik.handleChange}
                            >
                              <MenuItem value={'NO'}>{'NO'}</MenuItem>
                              <MenuItem value={'SI'}>{'SI'}</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <TextField
                            fullWidth
                            label="Nombre de la empresa actual"
                            disabled={formik.values.trabajo_actual === 'NO'}
                            variant="outlined"
                            id="nombre_empresa"
                            name="nombre_empresa"
                            value={formik.values.nombre_empresa}
                            onChange={formik.handleChange}
                            error={formik.touched.nombre_empresa && Boolean(formik.errors.nombre_empresa)}
                            helperText={formik.touched.nombre_empresa && formik.errors.nombre_empresa}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Button type="submit" fullWidth variant="contained" disabled={formik.isSubmitting}>
                            Crear
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </form>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item width={'100%'}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }} component={Paper}>
              <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prospectosVendedores.length === 0 ? (
                    <EmptyTable msg="No existen prospectos" colSpan={headCells.length} height={'300px'} />
                  ) : (
                    prospectosVendedores.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                          tabIndex={-1}
                          key={row.id}
                          onClick={() => handleClick(row)}
                        >
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{row.nombres}</TableCell>
                          <TableCell align="center">{row.apellidos}</TableCell>
                          <TableCell align="center">{row.celular}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AsistenteDeVentas;
