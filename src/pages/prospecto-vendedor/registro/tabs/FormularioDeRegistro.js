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
  Stack,
  Button
} from '@mui/material';

import { useDispatch } from 'store';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
// third-party
import { PatternFormat } from 'react-number-format';
import { useFormik } from 'formik';
import * as yup from 'yup';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';

import { openSnackbar } from 'store/reducers/snackbar';

import axios from 'utils/axios';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  direccion: yup.string(),
  email: yup.string().email('Formato de correo electrónico inválido'),
  celular: yup.string().length(18, "Complete el campo"),
  telefono: yup.string().length(12, "Complete el campo"),
  identificacion: yup.string().length(10, "Complete el campo"),
  fechaNacimiento: yup.date(),
  lugarNacimiento: yup.string(),
  tituloProfesion: yup.string(),
  estadoCivil: yup.string(),
  conyuge: yup.string(),
  numeroHijos: yup.number().integer().min(0, 'El número de hijos debe ser al menos 0'),
  nombreCompania: yup.string(),
  direccionCompania: yup.string(),
  telefonoCompania: yup.string().length(12, "Complete el campo"),
  referenciaLaboral: yup.string(),
  experienciaEnVentas: yup.boolean(),
  detallesExperiencia: yup.string()
});

const today = dayjs();

const FormularioDeRegistro = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const titulosProfesion = ['Ingeniero', 'Arquitecto', 'Doctor', 'Otros Especfique'];
  const estadosCiviles = ['Soltero', 'Casado', 'Viudo'];

  const user = useCurrentUser();

  // Determine if the user data has been fetched
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  // State variable to hold the initial form values
  const [initialValues, setInitialValues] = useState({
    direccion: '',
    email: '',
    celular: '',
    telefono: '',
    identificacion: '',
    fechaNacimiento: null, // Use Day.js object or null
    lugarNacimiento: '',
    tituloProfesion: '',
    estadoCivil: '',
    conyuge: '',
    numeroHijos: 0,
    nombreCompania: '',
    direccionCompania: '',
    telefonoCompania: '',
    referenciaLaboral: '',
    experienciaEnVentas: false,
    detallesExperiencia: ''
  });

  // Fetch user data
  useEffect(() => {
    if (user?.empleadoInfo && user?.cuentaInfo && user?.tipoCuentaInfo) {
      setIsUserDataLoaded(true);
      // Update initial values once user data is available
      setInitialValues({
        direccion: user?.empleadoInfo?.direccion || '',
        email: user?.cuentaInfo?.email || '',
        celular: user?.empleadoInfo?.celular || '',
        telefono: user?.empleadoInfo?.telefono || '',
        identificacion: user?.empleadoInfo?.numero_cedula || '',
        fechaNacimiento: dayjs(user?.empleadoInfo?.fecha_nacimiento) || null, // Use Day.js object or null
        lugarNacimiento: user?.empleadoInfo?.lugar_nacimiento || '',
        tituloProfesion: user?.empleadoInfo?.titulo_profesion || '',
        estadoCivil: user?.empleadoInfo?.estado_civil || '',
        conyuge: user?.empleadoInfo?.nombre_conyuge || '',
        numeroHijos: user?.empleadoInfo?.numero_hijos || 0,
        nombreCompania: user?.empleadoInfo?.nombre_compania || '',
        direccionCompania: user?.empleadoInfo?.direccion_compania || '',
        telefonoCompania: user?.empleadoInfo?.telefono_compania || '',
        referenciaLaboral: user?.empleadoInfo?.referencia_laboral || '',
        experienciaEnVentas: user?.empleadoInfo?.experiencia_laboral || false,
        detallesExperiencia: user?.empleadoInfo?.detalles_experiencia_laboral || ''
      });
    }
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        const newInfo = {
          numero_cedula: values.identificacion,
          direccion: values.direccion,
          celular: values.celular,
          telefono: values.telefono,
          ciudad: values.ciudad,
          titulo_profesion: values.tituloProfesion,
          fecha_nacimiento: values.fechaNacimiento,
          lugar_nacimiento: values.lugarNacimiento,
          oficina: values.oficina,
          estado_civil: values.estadoCivil,
          nombre_conyuge: values.conyuge,
          numero_hijos: values.numeroHijos,
          nombre_compania: values.nombreCompania,
          direccion_compania: values.direccionCompania,
          telefono_compania: values.telefonoCompania,
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

  if (!isUserDataLoaded) {
    // Show a loading spinner or placeholder while user data is being fetched
    return <div>Loading user data...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
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
                        <PatternFormat
                          format="+(###) ## ### ####"
                          mask="_"
                          fullWidth
                          customInput={TextField}
                          placeholder="+(593) 99 072 9257"
                          id="celular"
                          name="celular"
                          value={formik.values.celular}
                          onChange={formik.handleChange}
                          error={formik.touched.celular && Boolean(formik.errors.celular)}
                          helperText={formik.touched.celular && formik.errors.celular}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="telefono">Telefono Domicilio</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <PatternFormat
                          format="(###) ######"
                          mask="_"
                          fullWidth
                          customInput={TextField}
                          placeholder="(042) 1234567"
                          id="telefono"
                          name="telefono"
                          value={formik.values.telefono}
                          onChange={formik.handleChange}
                          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                          helperText={formik.touched.telefono && formik.errors.telefono}
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
                          type="email"
                          fullWidth
                          id="email"
                          name="email"
                          placeholder="stebin.ben@gmail.com"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
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
                        <InputLabel htmlFor="identificacion">Identificación</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PatternFormat
                          format="##########"
                          mask="_"
                          fullWidth
                          customInput={TextField}
                          placeholder="0123456789"
                          id="identificacion"
                          name="identificacion"
                          value={formik.values.identificacion}
                          onChange={formik.handleChange}
                          error={formik.touched.identificacion && Boolean(formik.errors.identificacion)}
                          helperText={formik.touched.identificacion && formik.errors.identificacion}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <DatePicker
                            format="DD/MM/YYYY"
                            id="fechaNacimiento"
                            name="fechaNacimiento"
                            type="date"
                            value={formik.values.fechaNacimiento || today}
                            onChange={(date) => formik.setFieldValue('fechaNacimiento', date)}
                            onBlur={formik.handleBlur}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                                helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="lugarNacimiento">Lugar Nacimiento</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="lugarNacimiento"
                          name="lugarNacimiento"
                          value={formik.values.lugarNacimiento}
                          onChange={formik.handleChange}
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
                            labelId="tituloProfesion"
                            id="tituloProfesion"
                            name="tituloProfesion"
                            value={formik.values.tituloProfesion}
                            onChange={formik.handleChange}
                          >
                            {titulosProfesion?.map((tituloProfesion) => (
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
                            id="estadoCivil"
                            name="estadoCivil"
                            value={formik.values.estadoCivil}
                            onChange={formik.handleChange}
                          >
                            {estadosCiviles?.map((estadoCivil) => (
                              <MenuItem value={estadoCivil} key={estadoCivil}>
                                {estadoCivil}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {formik.errors.estadoCivil && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.estadoCivil}{' '}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="conyuge">Nombre del cónyuge</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="conyuge"
                          name="conyuge"
                          value={formik.values.conyuge}
                          onChange={formik.handleChange}
                          error={formik.touched.conyuge && Boolean(formik.errors.conyuge)}
                          helperText={formik.touched.conyuge && formik.errors.conyuge}
                          {...formik.getFieldProps('conyuge')}
                          disabled={formik.values.estadoCivil === 'Soltero' || formik.values.estadoCivil === ''}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="numeroHijos">Número de Hijos</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="number"
                          fullWidth
                          id="numeroHijos"
                          name="numeroHijos"
                          value={formik.values.numeroHijos}
                          onChange={formik.handleChange}
                          inputProps={{min:0}}
                          error={formik.touched.numeroHijos && Boolean(formik.errors.numeroHijos)}
                          helperText={formik.touched.numeroHijos && formik.errors.numeroHijos}
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
                      <InputLabel htmlFor="nombreCompania">Nombre de la compañia</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="nombreCompania"
                        name="nombreCompania"
                        fullWidth
                        value={formik.values.nombreCompania}
                        onChange={formik.handleChange}
                        error={formik.touched.nombreCompania && Boolean(formik.errors.nombreCompania)}
                        helperText={formik.touched.nombreCompania && formik.errors.nombreCompania}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel htmlFor="direccionCompania">Dirección</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        id="direccionCompania"
                        name="direccionCompania"
                        value={formik.values.direccionCompania}
                        onChange={formik.handleChange}
                        error={formik.touched.direccionCompania && Boolean(formik.errors.direccionCompania)}
                        helperText={formik.touched.direccionCompania && formik.errors.direccionCompania}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel htmlFor="telefonoCompania">Telefono</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <PatternFormat
                        format="(###) ######"
                        mask="_"
                        fullWidth
                        customInput={TextField}
                        placeholder="(042) 1234567"
                        onBlur={() => { }}
                        id="telefonoCompania"
                        name="telefonoCompania"
                        value={formik.values.telefonoCompania}
                        onChange={formik.handleChange}
                        error={formik.touched.telefonoCompania && Boolean(formik.errors.telefonoCompania)}
                        helperText={formik.touched.telefonoCompania && formik.errors.telefonoCompania}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel htmlFor="referenciaLaboral">Referencia laboral</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        id="referenciaLaboral"
                        name="referenciaLaboral"
                        value={formik.values.referenciaLaboral}
                        onChange={formik.handleChange}
                        error={formik.touched.referenciaLaboral && Boolean(formik.errors.referenciaLaboral)}
                        helperText={formik.touched.referenciaLaboral && formik.errors.referenciaLaboral}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="experienciaEnVentas">Experiencia en Ventas</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Checkbox
                          id="experienciaEnVentas"
                          name="experienciaEnVentas"
                          onChange={formik.handleChange}
                          checked={formik.values.experienciaEnVentas}
                        />
                        {formik.errors.experienciaEnVentas && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.experienciaEnVentas}{' '}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} display="flex" alignItems="center">
                        <InputLabel htmlFor="detallesExperiencia">
                          Favor dar detalles de su ocupación actual o Ultimo cargo desempeñado
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label=""
                          multiline
                          fullWidth
                          id="detallesExperiencia"
                          name="detallesExperiencia"
                          value={formik.values.detallesExperiencia}
                          onChange={formik.handleChange}
                          error={formik.touched.detallesExperiencia && Boolean(formik.errors.detallesExperiencia)}
                          helperText={formik.touched.detallesExperiencia && formik.errors.detallesExperiencia}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </MainCard>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default FormularioDeRegistro;
