/* eslint-disable no-unused-vars */
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
// third-party
import MainCard from 'components/MainCard';
import { PatternFormat } from 'react-number-format';
import { useFormik } from 'formik';
import * as yup from 'yup';

import dayjs from 'dayjs';
import { dispatch } from 'store';
import { useEffect, useState } from 'react';

import { openSnackbar } from 'store/reducers/snackbar';
import useCurrentUser from 'hooks/useCurrentUser';
import { ESTADOS_CIVILES, TITULOS } from 'utils/constants';
import axios from 'utils/axios';

const today = dayjs();

const validationSchema = yup.object({
  direccion: yup.string().required('Campo requerido'),
  email: yup.string().email('Formato de correo electrónico inválido').required('Campo requerido'),
  celular: yup.string().required('Campo requerido').test('phone_number', 'Número de celular inválido', (value) => {
    if (value === undefined) return true;
    return value.match(/^09\d{8}$/);
  }),
  telefono: yup.string().required('Campo requerido').test('phone_number_house', 'Número de teléfono inválido', (value) => {
    if (value === undefined) return true;
    const newValue = value.replace(/[()\-\s"]/g, '');
    return newValue.match(/^(0[2-7]\d{7}|\d{7})$/);
  }),
  identificacion: yup.string().required('Campo requerido'),
  fechaNacimiento: yup.date('Fecha inválida').required('Campo requerido').test('check-date', 'Fecha de nacimiento inválida', (value) => {
    const currentDate = dayjs();
    const inputDate = dayjs(value);

    const sameDate = inputDate.day() === currentDate.day() && inputDate.year() === currentDate.year() && inputDate.month() === currentDate.month();

    if (sameDate || inputDate.isAfter(currentDate)) return false;

    return true;
  }),
  lugarNacimiento: yup.string().required('Campo requerido'),
  tituloProfession: yup.string().required('Campo requerido'),
  estadoCivil: yup.string().required('Campo requerido'),
  numeroHijos: yup.number().integer().min(0, 'El número de hijos debe ser al menos 0'),
  nombreCompania: yup.string().required('Campo requerido'),
  direccionCompania: yup.string().required('Campo requerido'),
  telefonoCompania: yup.string().required('Campo requerido').test('phone_number_house', 'Número de teléfono inválido', (value) => {
    if (value === undefined) return true;
    const newValue = value.replace(/[()\-\s"]/g, '');
    return newValue.match(/^(0[2-7]\d{7}|\d{7})$/);
  }),
  referenciaLaboral: yup.string().required('Campo requerido'),
  experienciaEnVentas: yup.boolean(),
  detallesExperiencia: yup.string().required('Campo requerido')
});

const FormularioDeRegistro = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const user = useCurrentUser();

  const titulosProfesion = [...TITULOS];

  const [tituloProfessionOtherValid, seTituloProfessionOtherValid] = useState({ error: false });
  const [nombreConyugeValid, setNombreConyugeValid] = useState({ error: false });

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [isProfesionOther, setIsProfesionOther] = useState(false);
  const [initialValues, setInitialValues] = useState({
    direccion: '',
    email: '',
    celular: '',
    telefono: '',
    identificacion: '',
    fechaNacimiento: null,
    lugarNacimiento: '',
    tituloProfession: '',
    tituloProfessionOther: '',
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

  useEffect(() => {

    if (user?.empleadoInfo && user?.cuentaInfo && user?.tipoCuentaInfo) {

      setIsUserDataLoaded(true);

      const date = dayjs(user?.empleadoInfo?.fecha_nacimiento);

      setInitialValues({
        direccion: user?.empleadoInfo?.direccion || '',
        email: user?.cuentaInfo?.email || '',
        celular: user?.empleadoInfo?.celular || '',
        telefono: user?.empleadoInfo?.telefono || '',
        identificacion: user?.empleadoInfo?.numero_cedula || '',
        fechaNacimiento: date.isValid() ? date : today,
        lugarNacimiento: user?.empleadoInfo?.lugar_nacimiento || '',
        tituloProfession: user?.empleadoInfo?.titulo_profesion || '',
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

      setIsSent(user?.empleadoInfo?.registro_completo);

    }
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {

      setIsSubmitting(true);
      console.log('select form submit - ', values);

      if (values.tituloProfession === TITULOS[TITULOS.length - 1]) {
        const valid = values.tituloProfessionOther && values.tituloProfessionOther.toString().match(/^[^0-9]*$/) && values.tituloProfessionOther.length > 0;
        if (!valid) {
          seTituloProfessionOtherValid({
            error: true,
            message: 'Nombre de titulo inválido'
          });
          return;
        } else {
          if (tituloProfessionOtherValid.error) {
            seTituloProfessionOtherValid({ error: false });
          }
        }
      }

      if (values.estadoCivil !== 'Soltero') {
        const valid = values.conyuge && values.conyuge.length > 0;
        if (!valid) {
          setNombreConyugeValid({
            error: true,
            message: 'Campo requerido'
          });
          return;
        } else {
          if (nombreConyugeValid.error) {
            setNombreConyugeValid({ error: false });
          }
        }
      }

      try {

        const newInfo = {
          numero_cedula: values.identificacion,
          direccion: values.direccion,
          celular: values.celular,
          telefono: values.telefono.replace(/\D/g, ''),
          ciudad: values.ciudad,
          titulo_profesion: isProfesionOther ? values.tituloProfessionOther : values.tituloProfession,
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
          email: values.email,
          registro_completo: true
        };

        await axios.put(`/empleados/updateProspectoVendedorInfo/${user?.empleadoInfo?.id}`, newInfo);

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

      setIsSubmitting(false);
      setIsSent(true);
    }
  });

  // Show a loading spinner or placeholder while user data is being fetched
  if (!isUserDataLoaded) {
    return <div>Loading user data...</div>;
  }

  if (!titulosProfesion.includes(formik.values.tituloProfession)) {
    titulosProfesion.splice(0, 0, formik.values.tituloProfession);
  }

  return (
    <Grid container spacing={3}>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Grid item xs={12}>
          <MainCard title="Información General">
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="direccion">Dirección del Domicilio*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      id="direccion"
                      name="direccion"
                      placeholder="Street 110-B Kalians Bag, Dewan, M.P. New York"
                      value={formik.values.direccion}
                      onChange={formik.handleChange}
                      disabled={isSent}
                      inputProps={{ maxLength: 100 }}
                      error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                      helperText={formik.touched.direccion && formik.errors.direccion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="celular">Celular*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="celular"
                      name="celular"
                      placeholder="0912345678"
                      value={formik.values.celular}
                      inputProps={{ maxLength: 10 }}
                      onChange={formik.handleChange}
                      disabled={isSent}
                      error={formik.touched.celular && Boolean(formik.errors.celular)}
                      helperText={formik.touched.celular && formik.errors.celular}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="telefono">
                      Teléfono Domicilio*
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <PatternFormat
                      fullWidth
                      id="telefono"
                      name="telefono"
                      customInput={TextField}
                      format="(##) ###-####"
                      mask="_"
                      placeholder="(02) 123-4567"
                      value={formik.values.telefono}
                      onChange={formik.handleChange}
                      disabled={isSent}
                      error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                      helperText={formik.touched.telefono && formik.errors.telefono}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="email">Correo electrónico*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@example.com"
                      value={formik.values.email}
                      disabled
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
                    <InputLabel htmlFor="identificacion">Identificación*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="identificacion"
                      name="identificacion"
                      placeholder="0123456789"
                      value={formik.values.identificacion}
                      inputProps={{ maxLength: 10 }}
                      onChange={formik.handleChange}
                      disabled={isSent}
                      error={formik.touched.identificacion && Boolean(formik.errors.identificacion)}
                      helperText={formik.touched.identificacion && formik.errors.identificacion}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={formik.values.fechaNacimiento || null}
                        onChange={(date) => formik.setFieldValue('fechaNacimiento', date)}
                        disabled={isSent}
                        onBlur={formik.handleBlur}
                        slotProps={{ textField: { variant: 'outlined' } }}
                      />
                    </LocalizationProvider>
                    {(Boolean(formik.errors.fechaNacimiento) && formik.touched.fechaNacimiento) && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.fechaNacimiento}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="lugarNacimiento">
                      Lugar de Nacimiento*
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="lugarNacimiento"
                      name="lugarNacimiento"
                      value={formik.values.lugarNacimiento}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 30 }}
                      disabled={isSent}
                      error={formik.touched.lugarNacimiento && Boolean(formik.errors.lugarNacimiento)}
                      helperText={formik.touched.lugarNacimiento && formik.errors.lugarNacimiento}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="tituloProfession">Titulo Profesión*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <Select
                        labelId="tituloProfession"
                        id="tituloProfession"
                        name="tituloProfession"
                        value={formik.values.tituloProfession}
                        disabled={isSent}
                        onChange={(e) => {
                          if (e.target.value === titulosProfesion[titulosProfesion.length - 1]) {
                            setIsProfesionOther(true);
                          } else {
                            setIsProfesionOther(false);
                          }
                          formik.handleChange(e);
                        }}
                      >
                        {titulosProfesion?.map((tituloProfession) => (
                          <MenuItem value={tituloProfession} key={tituloProfession}>
                            {tituloProfession}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {(Boolean(formik.errors.tituloProfession) && formik.touched.tituloProfession) && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.tituloProfession}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isProfesionOther && (
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          id="tituloProfessionOther"
                          name="tituloProfessionOther"
                          value={formik.values.tituloProfessionOther ?? ''}
                          disabled={isSent}
                          onChange={(e) => {
                            if (tituloProfessionOtherValid.error) {
                              seTituloProfessionOtherValid({ error: false });
                            }
                            formik.handleChange(e);
                          }}
                          placeholder="Profesión"
                          inputProps={{ maxLength: 30 }}
                          error={formik.touched.tituloProfessionOther && Boolean(formik.errors.tituloProfessionOther)}
                          helperText={formik.touched.tituloProfessionOther && formik.errors.tituloProfessionOther}
                        />
                      </FormControl>
                      {tituloProfessionOtherValid.error && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {' '}
                          {tituloProfessionOtherValid.message}{' '}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="estadoCivil">Estado Civil*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <Select
                        labelId="estadoCivil"
                        id="estadoCivil"
                        name="estadoCivil"
                        value={formik.values.estadoCivil}
                        disabled={isSent}
                        onChange={formik.handleChange}
                      >
                        {ESTADOS_CIVILES?.map((estadoCivil) => (
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
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="conyuge">
                      Nombre del cónyuge
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <TextField
                        id="conyuge"
                        name="conyuge"
                        value={formik.values.conyuge ?? ''}
                        onChange={(e) => {
                          if (nombreConyugeValid.error) {
                            setNombreConyugeValid({ error: false });
                          }
                          formik.handleChange(e);
                        }}
                        inputProps={{ maxLength: 30 }}
                        error={formik.touched.conyuge && Boolean(formik.errors.conyuge)}
                        helperText={formik.touched.conyuge && formik.errors.conyuge}
                        {...formik.getFieldProps('conyuge')}
                        disabled={formik.values.estadoCivil === 'Soltero' || formik.values.estadoCivil === '' || isSent}
                      />
                    </FormControl>
                    {nombreConyugeValid.error && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {nombreConyugeValid.message}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="numeroHijos">Número de Hijos</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="numeroHijos"
                      type="number"
                      name="numeroHijos"
                      value={formik.values.numeroHijos}
                      onChange={formik.handleChange}
                      inputProps={{ min: 0 }}
                      disabled={isSent}
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
                  <InputLabel htmlFor="nombreCompania">Nombre de la compañia*</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="nombreCompania"
                    name="nombreCompania"
                    fullWidth
                    value={formik.values.nombreCompania}
                    inputProps={{ maxLength: 30 }}
                    onChange={formik.handleChange}
                    disabled={isSent}
                    error={formik.touched.nombreCompania && Boolean(formik.errors.nombreCompania)}
                    helperText={formik.touched.nombreCompania && formik.errors.nombreCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="direccionCompania">Dirección*</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="direccionCompania"
                    name="direccionCompania"
                    value={formik.values.direccionCompania}
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 100 }}
                    disabled={isSent}
                    error={formik.touched.direccionCompania && Boolean(formik.errors.direccionCompania)}
                    helperText={formik.touched.direccionCompania && formik.errors.direccionCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="telefonoCompania">Teléfono*</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <PatternFormat
                    format="(##) ###-####"
                    mask="_"
                    fullWidth
                    customInput={TextField}
                    placeholder="(02) 123-4567"
                    onBlur={() => { }}
                    id="telefonoCompania"
                    name="telefonoCompania"
                    value={formik.values.telefonoCompania}
                    onChange={formik.handleChange}
                    disabled={isSent}
                    error={formik.touched.telefonoCompania && Boolean(formik.errors.telefonoCompania)}
                    helperText={formik.touched.telefonoCompania && formik.errors.telefonoCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="referenciaLaboral">Referencia laboral*</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="referenciaLaboral"
                    name="referenciaLaboral"
                    value={formik.values.referenciaLaboral}
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 30 }}
                    disabled={isSent}
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
                      disabled={isSent}
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
                      Favor dar detalles de su ocupación actual o último cargo desempeñado*
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      id="detallesExperiencia"
                      name="detallesExperiencia"
                      multiline
                      value={formik.values.detallesExperiencia}
                      disabled={isSent}
                      inputProps={{ maxLength: 300 }}
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
        <Grid item xs={12} display="flex" justifyContent="end" paddingTop={3}>
          <Button variant="contained" type="submit" disabled={isSubmitting || isSent}>
            Guardar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default FormularioDeRegistro;
