/* eslint-disable no-unused-vars */
// material-ui
import {
  Grid,
  List,
  ListItem,
  useMediaQuery,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import axios from 'utils/axios';

import { TITULOS, ESTADOS_CIVILES } from 'utils/constants';

const validationSchema = yup.object({
  direccion: yup.string(),
  email: yup.string().email('Formato de correo electrónico inválido'),
  celular: yup.string(),
  // .test('phone', 'Número de celular inválido', (value) => {
  //   if (value === undefined || value ==='') return true;
  //   return value.match(/^09\d{8}$/);
  // }),
  telefono: yup.string(),
  // .test('house', 'Número de teléfono inválido', (value) => {
  //   if (value === undefined) return true;
  //   const newValue = value.replace(/[()\-\s"]/g, '');
  //   return newValue.match(/^(0[2-7]\d{7}|\d{7})$/);
  // }),
  identificacion: yup.string(),
  // .test('id', 'Número de cédula inválido', (value) => {
  //   if (value === undefined) return true;
  //   return value.match(/^(0[1-9]|1[0-9]|2[0-4]|30)\d{8}$/);
  // }),
  lugarNacimiento: yup.string(),
  tituloProfesion: yup.string(),
  tituloProfesionOther: yup.string(),
  // .test('alpha', 'Nombre inválido', (value) => {
  //   if (value !== undefined) {
  //     return value.match(/^[^0-9]*$/);
  //   }
  //   return true;
  // }),
  estadoCivil: yup.string(),
  conyuge: yup.string(),
  numeroHijos: yup.number().integer().min(0, 'El número de hijos debe ser al menos 0'),
  nombreCompania: yup.string(),
  direccionCompania: yup.string(),
  telefonoCompania: yup.string(),
  // .test('house', 'Número de teléfono inválido', (value) => {
  //   if (value === undefined) return true;
  //   const newValue = value.replace(/[()\-\s"]/g, '');
  //   return newValue.match(/^(0[2-7]\d{7}|\d{7})$/);
  // }),
  referenciaLaboral: yup.string(),
  experienciaEnVentas: yup.boolean(),
  detallesExperiencia: yup.string()
});

const FormularioDeRegistroAsistente = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const user = useProspectoSeleccionado();

  const titulos = [...TITULOS];

  const [disableNombreConyuge, setDisableNombreConyuge] = useState(true);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [isProfessionOther, setIsProfessionOther] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isEditCancel, setIsEditCancel] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const newInfo = {
          numero_cedula: values.identificacion,
          direccion: values.direccion,
          celular: values.celular,
          telefono: values.telefono.replace(/\D/g, ''),
          ciudad: values.ciudad,
          titulo_profesion: isProfessionOther ? values.tituloProfessionOther : values.tituloProfesion,
          fecha_nacimiento: values.fechaNacimiento,
          lugar_nacimiento: values.lugarNacimiento,
          oficina: values.oficina,
          estado_civil: values.estadoCivil,
          nombre_conyuge: values.conyuge,
          numero_hijos: values.numeroHijos,
          nombre_compania: values.nombreCompania,
          direccion_compania: values.direccionCompania,
          telefono_compania: values.telefonoCompania.replace(/\D/g, ''),
          referencia_laboral: values.referenciaLaboral,
          experiencia_laboral: values.experienciaEnVentas,
          detalles_experiencia_laboral: values.detallesExperiencia,
          email: values.email
        };
        const response = await axios.put(`/empleados/updateProspectoVendedorInfo/${user?.empleadoInfo?.id}`, newInfo);
        console.log(response);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Informacion guardada con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );

        setIsEditDisable(true);
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
      }
    }
  });

  useEffect(() => {
    if (user?.empleadoInfo && user?.cuentaInfo && user?.tipoCuentaInfo) {
      setIsUserDataLoaded(true);

      formik.setValues({
        direccion: user?.empleadoInfo?.direccion ?? '',
        celular: user?.empleadoInfo?.celular ?? '',
        telefono: user?.empleadoInfo?.telefono ?? '',
        email: user?.cuentaInfo?.email ?? '',
        identificacion: user?.empleadoInfo?.numero_cedula ?? '',
        fechaNacimiento: dayjs(user?.empleadoInfo?.fecha_nacimiento) || null,
        lugarNacimiento: user?.empleadoInfo?.lugar_nacimiento ?? '',
        tituloProfesion: user?.empleadoInfo?.titulo_profesion ?? '',
        tituloProfesionOther: '',
        estadoCivil: user?.empleadoInfo?.estado_civil ?? '',
        conyuge: user?.empleadoInfo?.nombre_conyuge ?? '',
        numeroHijos: user?.empleadoInfo?.numero_hijos ?? 0,
        nombreCompania: user?.empleadoInfo?.nombre_compania ?? '',
        direccionCompania: user?.empleadoInfo?.direccion_compania ?? '',
        telefonoCompania: user?.empleadoInfo?.telefono_compania ?? '',
        referenciaLaboral: user?.empleadoInfo?.referencia_laboral ?? '',
        experienciaEnVentas: user?.empleadoInfo?.experiencia_laboral ?? false,
        detallesExperiencia: user?.empleadoInfo?.detalles_experiencia_laboral ?? ''
      });

      if (user?.empleadoInfo?.estado_civil !== 'Soltero') {
        setDisableNombreConyuge(false);
      }

      setIsEditCancel(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isEditCancel]);

  if (!isUserDataLoaded) {
    // Show a loading spinner or placeholder while user data is being fetched
    return <div>Loading user data...</div>;
  }

  if (!titulos.includes(formik.values.tituloProfesion)) {
    titulos.splice(0, 0, formik.values.tituloProfesion);
  }

  console.log('renders');

  return (
    <Grid container spacing={3}>
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <MainCard title="Información General">
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="direccion">Dirección del Domicilio</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      id="direccion"
                      name="direccion"
                      placeholder="Street 110-B Kalians Bag, Dewan, M.P. New York"
                      value={formik.values.direccion}
                      onChange={formik.handleChange}
                      disabled={isEditDisable}
                      error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                      helperText={formik.touched.direccion && formik.errors.direccion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="celular">Celular</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      placeholder="0990729257"
                      id="celular"
                      name="celular"
                      value={formik.values.celular}
                      onChange={formik.handleChange}
                      disabled={isEditDisable}
                      error={formik.touched.celular && Boolean(formik.errors.celular)}
                      helperText={formik.touched.celular && formik.errors.celular}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="telefono">
                      Teléfono
                      <br />
                      Domicilio
                    </InputLabel>{' '}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <PatternFormat
                      fullWidth
                      customInput={TextField}
                      format="(##) ###-####"
                      mask="_"
                      onBlur={() => {}}
                      placeholder="(02) 123-4567"
                      id="telefono"
                      name="telefono"
                      value={formik.values.telefono}
                      onChange={formik.handleChange}
                      error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                      helperText={formik.touched.telefono && formik.errors.telefono}
                      disabled={isEditDisable}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="email">Correo electrónico</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      placeholder="stebin.ben@gmail.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      disabled={isEditDisable}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard title="Información Personal">
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="identificacion">Identificación</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      placeholder="0123456789"
                      id="identificacion"
                      name="identificacion"
                      value={formik.values.identificacion}
                      onChange={formik.handleChange}
                      error={formik.touched.identificacion && Boolean(formik.errors.identificacion)}
                      helperText={formik.touched.identificacion && formik.errors.identificacion}
                      disabled={isEditDisable}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="fechaNacimiento">Fecha de Nacimiento</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={formik.values.fechaNacimiento}
                        onChange={(date) => formik.setFieldValue('fechaNacimiento', date)}
                        onBlur={formik.handleBlur}
                        disabled={isEditDisable}
                        slotProps={{ textField: { variant: 'outlined' } }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel id="lugarNacimiento">
                      Lugar
                      <br />
                      Nacimiento
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="lugarNacimiento"
                      name="lugarNacimiento"
                      value={formik.values.lugarNacimiento}
                      onChange={formik.handleChange}
                      disabled={isEditDisable}
                      error={formik.touched.lugarNacimiento && Boolean(formik.errors.lugarNacimiento)}
                      helperText={formik.touched.lugarNacimiento && formik.errors.lugarNacimiento}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="tituloProfesion">Titulo Profesión</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <Select
                        id="tituloProfesion"
                        labelId="tituloProfesion"
                        name="tituloProfesion"
                        value={formik.values.tituloProfesion}
                        disabled={isEditDisable}
                        onChange={(e) => {
                          if (e.target.value === titulos[titulos.length - 1]) {
                            setIsProfessionOther(true);
                          } else {
                            setIsProfessionOther(false);
                          }
                          formik.handleChange(e);
                        }}
                      >
                        {titulos?.map((tituloProfesion) => (
                          <MenuItem value={tituloProfesion} key={tituloProfesion}>
                            {tituloProfesion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {formik.errors.tituloProfesion && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.tituloProfesion}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isProfessionOther && (
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="tituloProfesionOther"
                        name="tituloProfesionOther"
                        value={formik.values.tituloProfesionOther}
                        onChange={formik.handleChange}
                        placeholder="Profesión"
                      />
                    </Grid>
                  )}
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="estadoCivil">Estado Civil</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <Select
                        labelId="estadoCivil"
                        id="estadoCivilSelect"
                        name="estadoCivil"
                        value={formik.values.estadoCivil}
                        onChange={formik.handleChange}
                        disabled={isEditDisable}
                      >
                        {ESTADOS_CIVILES?.map((estadoCivil) => (
                          <MenuItem value={estadoCivil} key={estadoCivil}>
                            {estadoCivil}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel id="nombreConyuge">
                      Nombre del
                      <br />
                      cónyuge
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="conyuge"
                      name="conyuge"
                      value={formik.values.conyuge}
                      onChange={formik.handleChange}
                      disabled={disableNombreConyuge || isEditDisable || formik.values.estadoCivil === 'Soltero'}
                      error={formik.touched.conyuge && Boolean(formik.errors.conyuge)}
                      helperText={formik.touched.conyuge && formik.errors.conyuge}
                      {...formik.getFieldProps('conyuge')}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="numeroHijos">Número de Hijos</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      fullWidth
                      id="numeroHijos"
                      name="numeroHijos"
                      value={formik.values.numeroHijos}
                      onChange={formik.handleChange}
                      error={formik.touched.numeroHijos && Boolean(formik.errors.numeroHijos)}
                      helperText={formik.touched.numeroHijos && formik.errors.numeroHijos}
                      disabled={isEditDisable}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard title="Referencia Laboral">
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel id="nombreCompania">Nombre de la compañia</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="nombreCompania"
                    name="nombreCompania"
                    value={formik.values.nombreCompania}
                    onChange={formik.handleChange}
                    disabled={isEditDisable}
                    error={formik.touched.nombreCompania && Boolean(formik.errors.nombreCompania)}
                    helperText={formik.touched.nombreCompania && formik.errors.nombreCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="direccion">Dirección</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="direccion"
                    name="direccion"
                    value={formik.values.direccionCompania}
                    onChange={formik.handleChange}
                    disabled={isEditDisable}
                    error={formik.touched.direccionCompania && Boolean(formik.errors.direccionCompania)}
                    helperText={formik.touched.direccionCompania && formik.errors.direccionCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel id="telefono">Telefono</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <PatternFormat
                    fullWidth
                    format="(##) ###-####"
                    mask="_"
                    customInput={TextField}
                    placeholder="(02) 123-4567"
                    onBlur={() => {}}
                    id="telefonoCompania"
                    name="telefonoCompania"
                    value={formik.values.telefonoCompania}
                    onChange={formik.handleChange}
                    disabled={isEditDisable}
                    error={formik.touched.telefonoCompania && Boolean(formik.errors.telefonoCompania)}
                    helperText={formik.touched.telefonoCompania && formik.errors.telefonoCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel id="referenciaLaboral">Referencia laboral</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="referenciaLaboral"
                    name="referenciaLaboral"
                    value={formik.values.referenciaLaboral}
                    onChange={formik.handleChange}
                    disabled={isEditDisable}
                    error={formik.touched.referenciaLaboral && Boolean(formik.errors.referenciaLaboral)}
                    helperText={formik.touched.referenciaLaboral && formik.errors.referenciaLaboral}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="experienciaEnVentas">Experiencia en Ventas</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Checkbox
                      id="experienciaEnVentas"
                      name="experienciaEnVentas"
                      onChange={formik.handleChange}
                      checked={formik.values.experienciaEnVentas}
                      disabled={isEditDisable}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} display="flex" alignItems="center">
                    <InputLabel id="detallesExperienciaLaboral">
                      Favor dar detalles de su ocupación actual o último cargo desempeñado
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      multiline
                      id="detallesExperiencia"
                      name="detallesExperiencia"
                      value={formik.values.detallesExperiencia}
                      onChange={formik.handleChange}
                      disabled={isEditDisable}
                      error={formik.touched.detallesExperiencia && Boolean(formik.errors.detallesExperiencia)}
                      helperText={formik.touched.detallesExperiencia && formik.errors.detallesExperiencia}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem sx={{ paddingTop: 3 }} divider={!matchDownMD}>
                <Grid justifyContent="flex-end" container spacing={3}>
                  <Grid item xs={6} md={2}>
                    {isEditDisable ? (
                      <Button fullWidth variant="contained" onClick={() => setIsEditDisable(false)}>
                        Editar
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setIsEditDisable(true);
                          setIsEditCancel(true);
                          setIsProfessionOther(false);
                        }}
                      >
                        Cancelar
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Button fullWidth variant="contained" disabled={isEditDisable} type="submit">
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
      </form>
    </Grid>
  );
};

export default FormularioDeRegistroAsistente;

// const [direccion, setDireccion] = useState('');
// const [email, setEmail] = useState('');
// const [celular, setCelular] = useState('');
// const [telefono, setTelefono] = useState('');
// const [identificacion, setIdentificacion] = useState('');
// const [fechaNacimiento, setFechaNacimiento] = useState(null);
// const [lugarNacimiento, setLugarNacimiento] = useState('');
// const [tituloProfesion, setTituloProfesion] = useState('');
// const [estadoCivil, setEstadoCivil] = useState('');
// const [conyuge, setConyuge] = useState('');
// const [numeroHijos, setNumeroHijos] = useState(0);
// const [isEditable, setIsEditable] = useState(false);
// console.log(setIsEditable);
// const [experienciaEnVentas, setExperienciaEnVentas] = useState(false);
// const [disableNombreConyuge, setDisableNombreConyuge] = useState(true);
// useEffect(() => {
//   setDisableNombreConyuge(estadoCivil === 'Soltero' || estadoCivil === '');
// }, [estadoCivil]);
// const onEmailChange = (event) => {
//   setEmail(event.target.value);
// };
// const onDireccionChange = (event) => {
//   setDireccion(event.target.value);
// };
// const onCelularChange = (event) => {
//   setCelular(event.target.value);
// };
// const onIdentificacionChange = (event) => {
//   setIdentificacion(event.target.value);
// };
// const onFechaNacimientoChange = (newValue) => {
//   setFechaNacimiento(dayjs(newValue));
// };
// const onLugarNacimientoChange = (event) => {
//   setLugarNacimiento(event.target.value);
// };
// const onTituloProfesionChange = (event) => {
//   setTituloProfesion(event.target.value);
// };
// const onEstadoCivilChange = (event) => {
//   setEstadoCivil(event.target.value);
// };
// const onConyugeChange = (event) => {
//   setConyuge(event.target.value);
// };
// const onExperienciaEnVentasChange = (event) => {
//   setExperienciaEnVentas(event.target.checked);
// };
// const onNumeroHijosChange = (event) => {
//   let numero = event.target.value;
//   // const sanitizedValue = numero.replace(/-/g, '');
//   // Check if the value is a valid positive number
//   if (numero === '' || (numero >= 0 && !isNaN(numero))) {
//     setNumeroHijos(numero);
//   } else {
//     setNumeroHijos('');
//   }
// };
