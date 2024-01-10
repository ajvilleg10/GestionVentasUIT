// CREACION DE PROSPECTOS Y MUESTRA DE PROSPECTOS
// material-ui
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

// project import
import useProspectosVendedores from 'hooks/useProspectosVendedores';
import Registro from 'pages/asistente-ventas/registro/Registro';

import useTiposCuentas from 'hooks/useTiposCuentas';
import useJefesVentas from 'hooks/useJefesVentas';
import sendEmail from 'utils/emailJS';

import { OFICINAS } from 'utils/constants';
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

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const validationSchema = yup.object({
  oficina: yup.string().required('El campo oficina es obligatorio'),
  nombres: yup.string().required('El campo nombre es obligatorio'),
  apellidos: yup.string().required('El campo apellido es obligatorio'),
  jefeDeVentas: yup.string().required('El campo jefe de ventas es obligatorio'),
  email: yup.string().required('El campo correo es obligatorio'),
  password: yup.string().required('El campo contraseña es obligatorio').test('strong_password', 'La contraseña debe tener al menos 8 caracters con minúsculas, mayúsculas y números', (value) => {

    //const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$'); // En caso de necesitar al menos un caracter especial

    if (!value) return false;
    if (value.length === 0) return false;
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');

    return pattern.test(value) && value.length >= 8;

  }),
  tipoDeUsuario: yup.string(),
  // usuarioGv: yup.bool(),
  categoria: yup.string()
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

  const initialFormValues = {
    tipoDeUsuario: 1, // Prospecto Vendedor
    oficina: '',
    nombres: '',
    apellidos: '',
    jefeDeVentas: '',
    categoria: '',
    usuarioGv: false,
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {

        await createProspectoVendedorAndRefresh({
          nombres: values.nombres,
          apellidos: values.apellidos,
          oficina: values.oficina,
          tipo_cuenta_id: values.tipoDeUsuario,
          jefe_venta_id: values.jefeDeVentas,
          usuario_gv: values.usuarioGv,
          email: values.email,
          password: values.password
        });

        dispatch(
          openSnackbar({
            open: true,
            message: 'Prospecto creado con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );

        sendEmail({ email: values.email, password: values.password, nombres: values.nombres, apellidos: values.apellidos });
        formik.setValues(initialFormValues);
        formik.setErrors({});
        formik.setTouched({});

      } catch (error) {
        console.log(error);
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
        formik.setSubmitting(false); // Ensure that the form is not stuck in a submitting state
      }
    }
  });

  // TODO: Cambiar render a un loader
  if (tiposUsuario.length === 0 || jefesDeVentas.length === 0) {
    return <h2>Cargando información...</h2>;
  }

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
                        <Grid item xs={12} md={6}>
                          <InputLabel id="tipoDeUsuario">Tipo de Usuario*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Select
                              labelId="tipoDeUsuario"
                              id="tipoDeUsuarioSelect"
                              name="tipoDeUsuario"
                              value={formik.values.tipoDeUsuario}
                              onChange={formik.handleChange}
                              disabled
                            >
                              {tiposUsuario?.map((tipoUsuario) => (
                                <MenuItem value={tipoUsuario.id} key={tipoUsuario.id}>
                                  {tipoUsuario.nombre_tipo}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {formik.errors.tipoDeUsuario && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {' '}
                              {formik.errors.tipoDeUsuario}{' '}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <InputLabel id="oficina">Oficina*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Select
                              labelId="oficina"
                              id="oficinaSelect"
                              name="oficina"
                              value={formik.values.oficina}
                              onChange={formik.handleChange}
                            >
                              {OFICINAS?.map((oficina) => (
                                <MenuItem value={oficina} key={oficina}>
                                  {oficina}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {formik.errors.oficina && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {' '}
                              {formik.errors.oficina}{' '}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <InputLabel htmlFor="nombres">Nombres</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label=""
                            variant="outlined"
                            fullWidth
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
                        <Grid item xs={12} md={6}>
                          <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label=""
                            variant="outlined"
                            fullWidth
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
                        <Grid item xs={12} md={6}>
                          <InputLabel id="categoriaVendedor">Categoría de Vendedor*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label=""
                            variant="outlined"
                            id="categoria"
                            name="categoria"
                            value="---"
                            disabled
                            onChange={formik.handleChange}
                            error={formik.touched.categoria && Boolean(formik.errors.categoria)}
                            helperText={formik.touched.categoria && formik.errors.categoria}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <InputLabel id="jefeDeVentas">Jefe de ventas asignado*</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Select
                              labelId="jefeDeVentas"
                              id="jefeDeVentasSelect"
                              name="jefeDeVentas"
                              value={formik.values.jefeDeVentas}
                              onChange={formik.handleChange}
                            >
                              {jefesDeVentas?.map((jefeDeVentas) => (
                                <MenuItem value={jefeDeVentas.id} key={jefeDeVentas.id}>
                                  {jefeDeVentas.Empleado.nombres + ' ' + jefeDeVentas.Empleado.apellidos}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {formik.errors.jefeDeVentas && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {' '}
                              {formik.errors.jefeDeVentas}{' '}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                    {/* <ListItem divider={!matchDownMD}> */}
                    {/*   <Grid container spacing={3}> */}
                    {/*     <Grid item xs={12} md={6}> */}
                    {/*       <InputLabel htmlFor="usuarioGv">Usuario GV</InputLabel> */}
                    {/*     </Grid> */}
                    {/*     <Grid item xs={12} md={6}> */}
                    {/*       <Checkbox id="usuarioGv" name="usuarioGv" onChange={formik.handleChange} checked={formik.values.usuarioGv} /> */}
                    {/*       {formik.errors.usuarioGv && ( */}
                    {/*         <FormHelperText error id="standard-weight-helper-text-email-login"> */}
                    {/*           {' '} */}
                    {/*           {formik.errors.usuarioGv}{' '} */}
                    {/*         </FormHelperText> */}
                    {/*       )} */}
                    {/*     </Grid> */}
                    {/*   </Grid> */}
                    {/* </ListItem> */}
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <InputLabel htmlFor="email">Correo</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label=""
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
                        <Grid item xs={12} md={6}>
                          <InputLabel htmlFor="password">Contraseña</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label=""
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
                        <Grid item xs={12}>
                          <Button type="submit" fullWidth variant="contained">
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
              <Table>
                <OrderTableHead />
                <TableBody>
                  {prospectosVendedores.length === 0 ? (
                    <EmptyTable msg="No existen prospectos" colSpan={headCells.length} />
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
                          <TableCell align="center">{row.Empleado.nombres}</TableCell>
                          <TableCell align="center">{row.Empleado.apellidos}</TableCell>
                          <TableCell align="center">{row.Empleado.celular}</TableCell>
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
