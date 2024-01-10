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
  Button
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { PatternFormat } from 'react-number-format';
import MainCard from 'components/MainCard';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { TITULOS, ESTADOS_CIVILES, CIUDADES } from 'utils/constants';
import * as yup from 'yup';
import axios from 'utils/axios';
import useUserSeleccionado from 'hooks/administrador/useUserSeleccionado';
import { updateUser } from 'store/reducers/users';

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

    const validRange = inputDate.year() < (currentDate.year() - 18) && inputDate.year() > (currentDate.year() - 80);

    return validRange && inputDate.isValid();
  }),
  lugarNacimiento: yup.string().required('Campo requerido'),
  ciudadOther: yup.string().when('lugarNacimiento', {
    is: (value) => value && value === CIUDADES[CIUDADES.length - 1],
    then: (schema) => schema.matches(/^[^0-9]*$/, 'Nombre de ciudad inválido').required('Campo requerido'),
    otherwise: (schema) => schema
  }),
  tituloProfession: yup.string().required('Campo requerido'),
  tituloProfessionOther: yup.string().when('tituloProfession', {
    is: (value) => value && value === TITULOS[TITULOS.length - 1],
    then: (schema) => schema.matches(/^[^0-9]*$/, 'Nombre del título inválido').required('Campo requerido'),
    otherwise: (schema) => schema
  }),
  tituloCursando: yup.string().when('tituloProfession', {
    is: (value) => value && value === TITULOS[TITULOS.length - 2],
    then: (schema) => schema.matches(/^[^0-9]*$/, 'Nombre de la carrera inválido').required('Campo requerido'),
    otherwise: (schema) => schema
  }),
  estadoCivil: yup.string().required('Campo requerido'),
  conyuge: yup.string().when('estadoCivil', {
    is: (value) => value && (value !== 'Soltero' && value !== 'Viudo' && value !== 'Divorciado'),
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema
  }),
  numeroHijos: yup.number().integer().min(0, 'El número de hijos no puede ser negativo'),
});


const FormularioDeRegistroAdmin = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const user = useUserSeleccionado();

  const titulos = [...TITULOS];
  const ciudades = [...CIUDADES];

  const [isProfessionOther, setIsProfessionOther] = useState(false);
  const [isCiudadOther, setIsCiudadOther] = useState(false);
  const [isProfessionCursando, setIsProfessionCursando] = useState(false);

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [disableNombreConyuge, setDisableNombreConyuge] = useState(true);
  const [isEditDisable, setIsEditDisable] = useState(true);

  const [initialValues, setInitialValues] = useState({
    direccion: "",
    email: "",
    celular: "",
    telefono: "",
    identificacion: "",
    fechaNacimiento: null,
    lugarNacimiento: "",
    tituloProfession: "",
    tituloProfessionOther: "",
    tituloCursando: "",
    ciudadOther: "",
    estadoCivil: "",
    conyuge: "",
    numeroHijos: 0
  });

  useEffect(() => {

    if (user?.empleadoInfo && user?.cuentaInfo && user?.tipoCuentaInfo) {

      const fechaN = dayjs(user?.empleadoInfo?.fecha_nacimiento);

      setInitialValues({
        direccion: user?.empleadoInfo?.direccion || "",
        email: user?.cuentaInfo?.email || "",
        celular: user?.empleadoInfo?.celular || "",
        telefono: user?.empleadoInfo?.telefono || "",
        identificacion: user?.empleadoInfo?.numero_cedula || "",
        fechaNacimiento: fechaN.isValid() ? fechaN : dayjs(),
        lugarNacimiento: user?.empleadoInfo?.lugar_nacimiento || "Guayaquil",
        tituloProfession: user?.empleadoInfo?.titulo_profesion || "",
        tituloProfessionOther: "",
        tituloCursando: "",
        ciudadOther: "",
        estadoCivil: user?.empleadoInfo?.estado_civil || "",
        conyuge: user?.empleadoInfo?.nombre_conyuge || "",
        numeroHijos: user?.empleadoInfo?.numero_hijos || 0,
      });

      setDisableNombreConyuge(user?.empleadoInfo?.estado_civil === 'Soltero' || user?.empleadoInfo?.estado_civil === 'Viudo' || user?.empleadoInfo?.estado_civil === 'Divorciado');
      setIsUserDataLoaded(true);
    }
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      const snackbar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      };

      try {

        const newInfo = {
          numero_cedula: values.identificacion,
          direccion: values.direccion,
          celular: values.celular,
          telefono: values.telefono.replace(/\D/g, ''),
          titulo_profesion: isProfessionOther ? values.tituloProfessionOther : isProfessionCursando ? `${values.tituloCursando} (Cursando)` : values.tituloProfession,
          fecha_nacimiento: values.fechaNacimiento.format('YYYY-MM-DD'),
          lugar_nacimiento: isCiudadOther ? values.ciudadOther : values.lugarNacimiento,
          oficina: values.oficina,
          estado_civil: values.estadoCivil,
          nombre_conyuge: values.conyuge,
          numero_hijos: values.numeroHijos,
          email: values.email,
          registro_completo: true
        };

        await axios.put(`/empleados/updateProspectoVendedorInfo/${user?.empleadoInfo?.id}`, newInfo);
        dispatch(updateUser({ userID: user?.empleadoInfo?.id, data: newInfo }));

        snackbar.message = 'Informacion guardada con exito';
        snackbar.alert.color = 'success';

        setIsEditDisable(true);

      } catch (error) {

        console.log('Error al guardar la informacion del usuario', error);

        snackbar.message = error.message ?? 'Error al guardar la información del empleado';
        snackbar.alert.color = 'error';

      } finally {

        dispatch(openSnackbar(snackbar));

      }
    }
  });

  if (!isUserDataLoaded) {
    return <div>Cargando información...</div>;
  }

  if (!titulos.includes(formik.values.tituloProfession) && formik.values.tituloProfession !== '') {
    titulos.splice(0, 0, formik.values.tituloProfession);
  }

  if (!ciudades.includes(formik.values.lugarNacimiento) && formik.values.lugarNacimiento !== '') {
    ciudades.splice(0, 0, formik.values.lugarNacimiento);
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
                    <InputLabel htmlFor="celular">Celular*</InputLabel>
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
                      Teléfono Domicilio*
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
                    <InputLabel htmlFor="email">Correo electrónico*</InputLabel>
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
                    <InputLabel htmlFor="identificacion">Identificación*</InputLabel>
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
                    <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} adapterLocale={'es'}>
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
                            helperText: formik.touched.fechaNacimiento && formik.errors.fechaNacimiento && 'Fecha de nacimiento inválida'
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="lugarNacimiento">Lugar de Nacimiento*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth error={formik.touched.lugarNacimiento && Boolean(formik.errors.lugarNacimiento)} >
                      <Select
                        id="lugarNacimiento"
                        name="lugarNacimiento"
                        value={formik.values.lugarNacimiento}
                        onChange={(e) => {
                          setIsCiudadOther(e.target.value === ciudades[ciudades.length - 1]);
                          formik.handleChange(e);
                        }}
                        disabled={isEditDisable}
                      >
                        {ciudades.map((ciudad) => (
                          <MenuItem value={ciudad} key={ciudad}>
                            {ciudad}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {(formik.touched.lugarNacimiento && Boolean(formik.errors.lugarNacimiento)) && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.lugarNacimiento}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="estadoCivil">Estado Civil*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth error={formik.touched.estadoCivil && Boolean(formik.errors.estadoCivil)}>
                      <Select
                        id="estadoCivilSelect"
                        name="estadoCivil"
                        value={formik.values.estadoCivil}
                        disabled={isEditDisable}
                        onChange={(e) => {
                          if (e.target.value === 'Soltero' || e.target.value === 'Viudo' || e.target.value === 'Divorciado') {
                            formik.setFieldValue('conyuge', '');
                            setDisableNombreConyuge(true);
                          } else setDisableNombreConyuge(false);

                          formik.handleChange(e);
                        }}
                      >
                        {ESTADOS_CIVILES.map((estadoCivil) => (
                          <MenuItem value={estadoCivil} key={estadoCivil}>
                            {estadoCivil}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {(formik.touched.estadoCivil && Boolean(formik.errors.estadoCivil)) && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.estadoCivil}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isCiudadOther && (
                    <>
                      <Grid item xs={12} md={3}/>
                      <Grid item xs={12} md={3}>
                        <TextField
                          id="ciudadOther"
                          fullWidth
                          name="ciudadOther"
                          value={formik.values.ciudadOther}
                          onChange={formik.handleChange}
                          inputProps={{ maxLength: 30 }}
                          placeholder="Nombre de ciudad"
                          disabled={isEditDisable || !isCiudadOther}
                          error={formik.touched.ciudadOther && Boolean(formik.errors.ciudadOther)}
                          helperText={formik.touched.ciudadOther && formik.errors.ciudadOther}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="numeroHijos">Número de Hijos*</InputLabel>
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
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="conyuge">Nombre del cónyuge*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="conyuge"
                      fullWidth
                      name="conyuge"
                      value={formik.values.conyuge}
                      onChange={formik.handleChange}
                      disabled={disableNombreConyuge || isEditDisable || formik.values.estadoCivil === 'Soltero' || formik.values.estadoCivil === ''}
                      inputProps={{ maxLength: 30 }}
                      error={formik.touched.conyuge && Boolean(formik.errors.conyuge)}
                      helperText={formik.touched.conyuge && formik.errors.conyuge}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="tituloProfession">Titulo Profesión*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={formik.touched.tituloProfession && Boolean(formik.errors.tituloProfession)} >
                      <Select
                        id="tituloProfession"
                        labelId="tituloProfession"
                        name="tituloProfession"
                        value={formik.values.tituloProfession}
                        disabled={isEditDisable}
                        onChange={(e) => {
                          setIsProfessionOther(e.target.value === titulos[titulos.length - 1]);
                          setIsProfessionCursando(e.target.value === titulos[titulos.length - 2]);
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
                    {(formik.touched.tituloProfession && Boolean(formik.errors.tituloProfession)) && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.tituloProfession}{' '}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isProfessionOther && (
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="tituloProfessionOther"
                        fullWidth
                        name="tituloProfessionOther"
                        value={formik.values.tituloProfessionOther ?? ''}
                        onChange={formik.handleChange}
                        inputProps={{ maxLength: 30 }}
                        placeholder="Profesión"
                        disabled={isEditDisable || !isProfessionOther}
                        error={formik.touched.tituloProfessionOther && Boolean(formik.errors.tituloProfessionOther)}
                        helperText={formik.touched.tituloProfessionOther && formik.errors.tituloProfessionOther}
                      />
                    </Grid>
                  )}
                  {isProfessionCursando && (
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="tituloCursando"
                        fullWidth
                        name="tituloCursando"
                        value={formik.values.tituloCursando}
                        onChange={formik.handleChange}
                        inputProps={{ maxLength: 30 }}
                        placeholder="Carrera en curso - Especifique"
                        disabled={isEditDisable || !isProfessionCursando}
                        error={formik.touched.tituloCursando && Boolean(formik.errors.tituloCursando)}
                        helperText={formik.touched.tituloCursando && formik.errors.tituloCursando}
                      />
                    </Grid>
                  )}
                  {/* {isCiudadOther && ( */}
                  {/*   <> */}
                  {/*     {(!isProfessionOther && !isProfessionCursando) && (<Grid item xs={12} md={3} />)} */}
                  {/*     <Grid item xs={12} md={3}> */}
                  {/*       <TextField */}
                  {/*         id="ciudadOther" */}
                  {/*         fullWidth */}
                  {/*         name="ciudadOther" */}
                  {/*         value={formik.values.ciudadOther} */}
                  {/*         onChange={formik.handleChange} */}
                  {/*         inputProps={{ maxLength: 30 }} */}
                  {/*         placeholder="Nombre de ciudad" */}
                  {/*         disabled={isEditDisable || !isCiudadOther} */}
                  {/*         error={formik.touched.ciudadOther && Boolean(formik.errors.ciudadOther)} */}
                  {/*         helperText={formik.touched.ciudadOther && formik.errors.ciudadOther} */}
                  {/*       /> */}
                  {/*     </Grid> */}
                  {/*   </> */}
                  {/* )} */}
                </Grid>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <List sx={{ py: 0 }}>
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
                        setIsProfessionOther(false);
                        setIsProfessionCursando(false);
                        setIsCiudadOther(false);
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
        </Grid>
      </form>
    </Grid>
  );
};

export default FormularioDeRegistroAdmin;
