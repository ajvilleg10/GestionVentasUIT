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
} from "@mui/material";

import MainCard from "components/MainCard";
import * as yup from "yup";
import dayjs from "dayjs";
import 'dayjs/locale/es';

import useCurrentUser from "hooks/useCurrentUser";
import EnviarModal from "./EnviarModal";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers-pro";
import { PatternFormat } from "react-number-format";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TITULOS, ESTADOS_CIVILES, CIUDADES } from 'utils/constants';

import { dispatch } from "store";
import { openSnackbar } from "store/reducers/snackbar";
import useEmpleado from "hooks/useEmpleado";

const today = dayjs();

const validationSchema = yup.object({
  direccion: yup.string().required("Campo requerido"),
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
  identificacion: yup.string().required("Campo requerido"),
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

const FormularioDeRegistro = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const user = useCurrentUser();
  const { updateProspectoInfo } = useEmpleado();

  const titulosProfesion = [...TITULOS];
  const ciudades = [...CIUDADES];

  const [isProfesionOther, setIsProfesionOther] = useState(false);
  const [isCiudadOther, setIsCiudadOther] = useState(false);
  const [isProfessionCursando, setIsProfessionCursando] = useState(false);

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [disableNombreConyuge, setDisableNombreConyuge] = useState(true);
  const [isSent, setIsSent] = useState(false);

  const [initialValues, setInitialValues] = useState({
    direccion: "",
    email: "",
    celular: "",
    telefono: "",
    identificacion: "",
    fechaNacimiento: null,
    lugarNacimiento: "Guayaquil",
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

      const date = dayjs(user?.empleadoInfo?.fecha_nacimiento);

      setInitialValues({
        direccion: user?.empleadoInfo?.direccion || "",
        email: user?.cuentaInfo?.email || "",
        celular: user?.empleadoInfo?.celular || "",
        telefono: user?.empleadoInfo?.telefono || "",
        identificacion: user?.empleadoInfo?.numero_cedula || "",
        fechaNacimiento: date.isValid() ? date : today,
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
      setIsSent(user?.empleadoInfo?.registro_completo);
      setIsUserDataLoaded(true);
    }
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {

      const snackbar = {
        open: true,
        variant: "alert",
        alert: {},
        close: false,
      };

      try {

        const newInfo = {
          numero_cedula: values.identificacion,
          direccion: values.direccion,
          celular: values.celular,
          telefono: values.telefono.replace(/\D/g, ""),
          titulo_profesion: isProfesionOther
            ? values.tituloProfessionOther
            : isProfessionCursando ?
              `${values.tituloCursando} (Cursando)` : values.tituloProfession,
          fecha_nacimiento: values.fechaNacimiento.format('YYYY-MM-DD'),
          lugar_nacimiento: isCiudadOther ? values.ciudadOther : values.lugarNacimiento,
          oficina: values.oficina,
          estado_civil: values.estadoCivil,
          nombre_conyuge: values.conyuge,
          numero_hijos: values.numeroHijos,
          email: values.email,
          registro_completo: true,
        };

        const response = await updateProspectoInfo(newInfo);

        snackbar.message = response.message ?? 'Información enviada correctamente';
        snackbar.alert.color = "success";

        setIsSent(true);

      } catch (error) {

        console.log("form reg", error);

        snackbar.message = error.message ?? 'Error al enviar la información';
        snackbar.alert.color = "error";

      } finally {

        formik.setSubmitting(false);
        dispatch(openSnackbar(snackbar));

      }
    },
  });

  // Show a loading spinner or placeholder while user data is being fetched
  if (!isUserDataLoaded) {
    return <div>Cargando información...</div>;
  }

  if (!titulosProfesion.includes(formik.values.tituloProfession) && formik.values.tituloProfession !== '') {
    titulosProfesion.splice(0, 0, formik.values.tituloProfession);
  }

  if (!ciudades.includes(formik.values.lugarNacimiento) && formik.values.lugarNacimiento !== '') {
    ciudades.splice(0, 0, formik.values.lugarNacimiento);
  }

  return (
    <Grid container spacing={3}>
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Grid item xs={12}>
          <MainCard title="Información General">
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="direccion">
                      Dirección del Domicilio*
                    </InputLabel>
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
                    <InputLabel htmlFor="email">
                      Correo electrónico*
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
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
                    <InputLabel htmlFor="identificacion">
                      Identificación*
                    </InputLabel>
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
                      disabled={isSent}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="fechaNacimiento">
                      Fecha de Nacimiento*
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} adapterLocale={'es'}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={formik.values.fechaNacimiento}
                        onChange={(date) => formik.setFieldValue("fechaNacimiento", date)}
                        onBlur={formik.handleBlur}
                        disabled={isSent}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            error: formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento),
                            helperText: formik.touched.fechaNacimiento && formik.errors.fechaNacimiento
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="lugarNacimiento">
                      Lugar de Nacimiento*
                    </InputLabel>
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
                        disabled={isSent}
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
                    <InputLabel id="estadoCivil">Estado Civil*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth error={formik.touched.estadoCivil && Boolean(formik.errors.estadoCivil)}>
                      <Select
                        labelId="estadoCivil"
                        id="estadoCivil"
                        name="estadoCivil"
                        value={formik.values.estadoCivil}
                        disabled={isSent}
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
                        {formik.errors.estadoCivil}
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
                          disabled={isSent || !isCiudadOther}
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
                    <InputLabel htmlFor="numeroHijos">
                      Número de hijos
                    </InputLabel>
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
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="conyuge">
                      Nombre del cónyuge
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="conyuge"
                      name="conyuge"
                      value={formik.values.conyuge}
                      onChange={formik.handleChange}
                      disabled={isSent || disableNombreConyuge || formik.values.estadoCivil === 'Soltero' || formik.values.estadoCivil === ''}
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
                    <InputLabel id="tituloProfession">
                      Titulo Profesión*
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth error={formik.touched.tituloProfession && Boolean(formik.errors.tituloProfession)}>
                      <Select
                        labelId="tituloProfession"
                        id="tituloProfession"
                        name="tituloProfession"
                        value={formik.values.tituloProfession}
                        disabled={isSent}
                        onChange={(e) => {
                          setIsProfesionOther(e.target.value === titulosProfesion[titulosProfesion.length - 1]);
                          setIsProfessionCursando(e.target.value === titulosProfesion[titulosProfesion.length - 2]);
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
                    {(formik.touched.tituloProfession && Boolean(formik.errors.tituloProfession)) && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {formik.errors.tituloProfession}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isProfesionOther && (
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="tituloProfessionOther"
                        fullWidth
                        name="tituloProfessionOther"
                        value={formik.values.tituloProfessionOther}
                        onChange={formik.handleChange}
                        inputProps={{ maxLength: 30 }}
                        placeholder="Profesión"
                        disabled={isSent}
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
                        disabled={isSent || !isProfessionCursando}
                        error={formik.touched.tituloCursando && Boolean(formik.errors.tituloCursando)}
                        helperText={formik.touched.tituloCursando && formik.errors.tituloCursando}
                      />
                    </Grid>
                  )}
                  {/* {isCiudadOther && ( */}
                  {/*   <> */}
                  {/*     <Grid item xs={12} md={3}/> */}
                  {/*     <Grid item xs={12} md={3}> */}
                  {/*       <TextField */}
                  {/*         id="ciudadOther" */}
                  {/*         fullWidth */}
                  {/*         name="ciudadOther" */}
                  {/*         value={formik.values.ciudadOther} */}
                  {/*         onChange={formik.handleChange} */}
                  {/*         inputProps={{ maxLength: 30 }} */}
                  {/*         placeholder="Nombre de ciudad" */}
                  {/*         disabled={isSent || !isCiudadOther} */}
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
        <Grid item xs={12} display="flex" justifyContent="end" paddingTop={3}>
          <EnviarModal
            isDisabled={formik.isSubmitting || isSent}
            formik={formik}
            isSent={isSent}
          />
        </Grid>
      </form>
    </Grid>
  );
};

export default FormularioDeRegistro;
