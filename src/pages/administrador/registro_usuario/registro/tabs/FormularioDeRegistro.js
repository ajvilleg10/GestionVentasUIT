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

import { PatternFormat } from 'react-number-format';
import MainCard from 'components/MainCard';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { TITULOS, ESTADOS_CIVILES } from 'utils/constants';
import * as yup from 'yup';
import axios from 'utils/axios';
import useUserSeleccionado from 'hooks/administrador/useUserSeleccionado';
import { useSelector } from 'store';
import { updateUser } from 'store/reducers/users';

const FormularioDeRegistroAsistente = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const user = useUserSeleccionado();
  const infoUser = useSelector(state => state.userSeleccionado);

  const titulos = [...TITULOS];

  const [isProfessionOther, setIsProfessionOther] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [disableNombreConyuge, setDisableNombreConyuge] = useState(true);

  const [isEditDisable, setIsEditDisable] = useState(true);

  const validationSchema = yup.object({
    direccion: yup.string().required('Campo requerido'),
    email: yup.string().email('Correo electrónico inválido').required('Campo requerido'),
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
    tituloProfessionOther: yup.string().when('tituloProfession', {
      is: (value) => value && value === TITULOS[TITULOS.length - 1],
      then: (schema) => schema.matches(/^[^0-9]*$/, 'Nombre del título inválido').required('Campo requerido'),
      otherwise: (schema) => schema
    }),
    estadoCivil: yup.string().required('Campo requerido'),
    conyuge: yup.string().when('estadoCivil', {
      is: (value) => value && value !== 'Soltero',
      then: (schema) => schema.required('Campo requerido'),
      otherwise: (schema) => schema
    }),
    numeroHijos: yup.number().integer().min(0, 'El número de hijos no puede ser negativo'),
    nombreCompania: yup.string().when([], {
      is: (_) => infoUser.tipo_cuenta.alias !== 'director_operaciones',
      then: (schema) => schema.required('Campo requerido'),
      otherwise: (schema) => schema
    }),
    direccionCompania: yup.string().when([], {
      is: (_) => infoUser.tipo_cuenta.alias !== 'director_operaciones',
      then: (schema) => schema.required('Campo requerido'),
      otherwise: (schema) => schema
    }),
    telefonoCompania: yup.string().when([], {
      is: (_) => infoUser.tipo_cuenta.alias !== 'director_operaciones',
      then: (schema) => schema.required('Campo requerido').test('phone_number_house', 'Número de teléfono inválido', (value) => {
        if (value === undefined) return true;
        const newValue = value.replace(/[()\-\s"]/g, '');
        return newValue.match(/^(0[2-7]\d{7}|\d{7})$/);
      }),
      otherwise: (schema) => schema
    }),
    referenciaLaboral: yup.string().when([], {
      is: (_) => infoUser.tipo_cuenta.alias !== 'director_operaciones',
      then: (schema) => schema.required('Campo requerido'),
      otherwise: (schema) => schema
    }),
    experienciaEnVentas: yup.boolean(),
    detallesExperiencia: yup.string().when([], {
      is: (_) => infoUser.tipo_cuenta.alias !== 'director_operaciones',
      then: (schema) => schema.required('Campo requerido'),
      otherwise: (schema) => schema
    })
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async (values) => {

      try {

        const newInfo = {
          numero_cedula: values.identificacion,
          direccion: values.direccion,
          celular: values.celular,
          telefono: values.telefono.replace(/\D/g, ''),
          ciudad: values.ciudad,
          titulo_profesion: isProfessionOther ? values.tituloProfessionOther : values.tituloProfession,
          fecha_nacimiento: values.fechaNacimiento.format('YYYY-MM-DD'),
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
        dispatch(updateUser({ userID: user?.empleadoInfo?.id, data: newInfo }));

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

  const handleEditar = () => {
    setIsEditDisable(false)
  };

  useEffect(() => {

    if (user?.empleadoInfo && user?.cuentaInfo && user?.tipoCuentaInfo) {

      const fechaN = dayjs(user?.empleadoInfo?.fecha_nacimiento);

      formik.setValues({
        direccion: user?.empleadoInfo?.direccion ?? '',
        celular: user?.empleadoInfo?.celular ?? '',
        telefono: user?.empleadoInfo?.telefono ?? '',
        email: user?.cuentaInfo?.email ?? '',
        identificacion: user?.empleadoInfo?.numero_cedula ?? '',
        fechaNacimiento: fechaN.isValid() ? fechaN : dayjs(),
        lugarNacimiento: user?.empleadoInfo?.lugar_nacimiento ?? '',
        tituloProfession: user?.empleadoInfo?.titulo_profesion ?? '',
        tituloProfessionOther: '',
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

      setDisableNombreConyuge(!user?.empleadoInfo?.estado_civil !== 'Soltero');
      setIsUserDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!isUserDataLoaded) {
    // Show a loading spinner or placeholder while user data is being fetched
    return <div>Cargando información...</div>;
  }

  if (!titulos.includes(formik.values.tituloProfession)) {
    titulos.splice(0, 0, formik.values.tituloProfession);
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
                    <InputLabel htmlFor="direccion">Dirección del Domicilio *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      id="direccion"
                      name="direccion"
                      placeholder="Dirección de domicilio"
                      value={formik.values.direccion}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 100 }}
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
                    <InputLabel htmlFor="celular">Celular *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="celular"
                      name="celular"
                      placeholder="0912345678"
                      value={formik.values.celular}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 10 }}
                      disabled={isEditDisable}
                      error={formik.touched.celular && Boolean(formik.errors.celular)}
                      helperText={formik.touched.celular && formik.errors.celular}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="telefono">
                      Teléfono Domicilio *
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <PatternFormat
                      fullWidth
                      customInput={TextField}
                      format="(##) ###-####"
                      mask="_"
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
                    <InputLabel htmlFor="email">Correo electrónico *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@email.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 30 }}
                      disabled={isEditDisable}
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
                    <InputLabel htmlFor="identificacion">Identificación *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="identificacion"
                      name="identificacion"
                      placeholder="0123456789"
                      value={formik.values.identificacion}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 10 }}
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
                    <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            error: formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento),
                            helperText: formik.touched.fechaNacimiento && formik.errors.fechaNacimiento
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="lugarNacimiento"> Lugar de Nacimiento *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="lugarNacimiento"
                      name="lugarNacimiento"
                      placeholder="Guayaquil"
                      value={formik.values.lugarNacimiento}
                      onChange={formik.handleChange}
                      inputProps={{ maxLength: 30 }}
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
                    <InputLabel htmlFor="tituloProfession">Titulo Profesión *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <Select
                        id="tituloProfession"
                        labelId="tituloProfession"
                        name="tituloProfession"
                        value={formik.values.tituloProfession}
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
                        {titulos?.map((tituloProfession) => (
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
                  {isProfessionOther && (
                    <Grid item xs={12} md={3}>
                      <FormControl>
                        <TextField
                          id="tituloProfessionOther"
                          name="tituloProfessionOther"
                          value={formik.values.tituloProfessionOther ?? ''}
                          onChange={formik.handleChange}
                          inputProps={{ maxLength: 30 }}
                          placeholder="Profesión"
                          disabled={isEditDisable || !isProfessionOther}
                          error={formik.touched.tituloProfessionOther && Boolean(formik.errors.tituloProfessionOther)}
                          helperText={formik.touched.tituloProfessionOther && formik.errors.tituloProfessionOther}
                        />
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="estadoCivil">Estado Civil *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <Select
                        id="estadoCivilSelect"
                        name="estadoCivil"
                        value={formik.values.estadoCivil}
                        onChange={(e) => {

                          if (e.target.value !== 'Soltero') setDisableNombreConyuge(false);
                          formik.handleChange(e);

                        }}
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
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="conyuge">Nombre del cónyuge *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <TextField
                        id="conyuge"
                        name="conyuge"
                        value={formik.values.conyuge}
                        onChange={formik.handleChange}
                        disabled={disableNombreConyuge || isEditDisable || formik.values.estadoCivil === 'Soltero'}
                        inputProps={{ maxLength: 30 }}
                        error={formik.touched.conyuge && Boolean(formik.errors.conyuge)}
                        helperText={formik.touched.conyuge && formik.errors.conyuge}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="numeroHijos">Número de Hijos *</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      type="number"
                      fullWidth
                      id="numeroHijos"
                      name="numeroHijos"
                      value={formik.values.numeroHijos}
                      onChange={formik.handleChange}
                      inputProps={{ min: 0 }}
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
                  <InputLabel htmlFor="nombreCompania">Nombre de la compañia</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="nombreCompania"
                    name="nombreCompania"
                    placeholder="Nombre de la compañia"
                    value={formik.values.nombreCompania}
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 30 }}
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
                    id="direccionCompania"
                    name="direccionCompania"
                    placeholder="Dirección de la compañia"
                    value={formik.values.direccionCompania}
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 100 }}
                    disabled={isEditDisable}
                    error={formik.touched.direccionCompania && Boolean(formik.errors.direccionCompania)}
                    helperText={formik.touched.direccionCompania && formik.errors.direccionCompania}
                  />
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid item xs={12} md={3} display="flex" alignItems="center">
                  <InputLabel htmlFor="telefonoCompania">Teléfono</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <PatternFormat
                    fullWidth
                    format="(##) ###-####"
                    mask="_"
                    customInput={TextField}
                    placeholder="(02) 123-4567"
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
                  <InputLabel htmlFor="referenciaLaboral">Referencia laboral</InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="referenciaLaboral"
                    name="referenciaLaboral"
                    placeholder="Referencia laboral"
                    value={formik.values.referenciaLaboral}
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 30 }}
                    disabled={isEditDisable}
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
                      disabled={isEditDisable}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} display="flex" alignItems="center">
                    <InputLabel htmlFor="detallesExperiencia">
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
                      inputProps={{ maxLength: 300 }}
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
                      <Button fullWidth variant="contained" onClick={handleEditar}>
                        Editar
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setIsEditDisable(true);
                          setIsProfessionOther(false);
                          formik.resetForm();
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
