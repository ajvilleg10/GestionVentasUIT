import {
  Grid,
  List,
  ListItem,
  Button,
  useMediaQuery,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { ROLES } from 'utils/constants';

import * as yup from 'yup';
import { useFormik } from 'formik';
import useJefesVentas from 'hooks/useJefesVentas';
import useEmpleado from 'hooks/useEmpleado';
import useAsistenteVentas from 'hooks/asistente-ventas/useAsistenteVentas';
import useCurrentUser from 'hooks/useCurrentUser';

const validationSchema = yup.object({
  oficina: yup.string(),
  nombres: yup.string().required('Campo requerido').test('names', 'Ingrese nombres completos', (value) => {
    if (!value || value === '') return false;

    const words = value.split(' ');
    if (words.length < 2) return false;
    if (words[0] === '' || words[1] === '') return false;

    return true;

  }).test('format', 'Nombre inválido: No debe contenter números', (value) => {
    const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
    return lettersOnlyRegex.test(value);
  }),
  apellidos: yup.string().required('Campo requerido').test('names', 'Ingrese apellidos completos', (value) => {

    if (!value || value === '') return false;

    const words = value.split(' ');
    if (words.length < 2) return false;
    if (words[0] === '' || words[1] === '') return false;

    return true;

  }).test('format', 'Apellido inválido: No debe contenter números', (value) => {
    const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
    return lettersOnlyRegex.test(value);
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
  jefeDeVentas: yup.string(),
  asistenteDeVentas: yup.string()
});

const DescripcionGeneralUser = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { jefesDeVentas } = useJefesVentas();
  const { asistentes: asistentesDeVenta } = useAsistenteVentas();
  const { updateDescripcionGeneralUser } = useEmpleado();

  const user = useCurrentUser();

  const [disableEdit, setDisableEdit] = useState(true);
  const [initialValues, setInitialValues] = useState({
    oficina: '',
    nombres: '',
    apellidos: '',
    jefeDeVentas: '',
    asistenteDeVentas: '',
    trabajo_actual: 'NO',
    nombre_empresa: ''
  });

  useEffect(() => {

    if (user.empleadoInfo) {

      setInitialValues({
        oficina: user?.empleadoInfo?.oficina ?? '',
        nombres: user?.empleadoInfo?.nombres ?? '',
        apellidos: user?.empleadoInfo?.apellidos ?? '',
        trabajo_actual: user?.empleadoInfo?.trabajo_actual ?? 'NO',
        nombre_empresa: user?.empleadoInfo?.nombre_empresa ?? '',
        jefeDeVentas: user?.empleadoInfo?.jefe_venta_id ?? '',
        asistenteDeVentas: user?.empleadoInfo?.asistente_venta_id ?? '',
      });

    }

  }, [user]);

  const onSubmit = async (values) => {

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      const updateInfo = {
        oficina: values.oficina,
        nombres: values.nombres,
        apellidos: values.apellidos,
        trabajo_actual: values.trabajo_actual,
        nombre_empresa: values.nombre_empresa,
        jefe_venta_id: values.jefeDeVentas,
        asistente_venta_id: values.asistenteDeVentas,
      };

      const response = await updateDescripcionGeneralUser(updateInfo);

      snackbar.message = response.message ?? 'Información actualizada correctamente';
      snackbar.alert.color = 'success';

      setInitialValues({ ...initialValues, ...updateInfo });
      setDisableEdit(true);

    } catch (error) {

      console.log('Error al actualizar la informacion personal', error);

      snackbar.message = error.message ?? 'Error al actualizar la información general';
      snackbar.alert.color = 'error';

    } finally {

      dispatch(openSnackbar(snackbar));

    }

  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Información principal">
          <form onSubmit={formik.handleSubmit}>
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} display="flex" alignItems="center">
                    <InputLabel htmlFor="tipoDeUsuario">Tipo de Usuario*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                        id="tipoDeUsuarioSelect"
                        name="tipoDeUsuario"
                        disabled
                        value={0}
                      >
                        <MenuItem value={0}>
                          {user?.tipoCuentaInfo?.nombre_tipo}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              {user?.tipoCuentaInfo?.alias !== ROLES.director && (
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} display="flex" alignItems="center">
                      <InputLabel htmlFor="oficina">Oficina*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select
                          id="oficinaSelect"
                          name="oficina"
                          value={0}
                          disabled
                        >
                          <MenuItem value={0}>
                            {formik.values.oficina}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
              )}
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} display="flex" alignItems="center">
                    <InputLabel htmlFor="nombres">Nombres*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="nombres"
                      name="nombres"
                      variant="outlined"
                      value={formik.values.nombres}
                      onChange={formik.handleChange}
                      disabled={disableEdit}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} display="flex" alignItems="center">
                    <InputLabel htmlFor="apellidos">Apellidos*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="apellidos"
                      name="apellidos"
                      variant="outlined"
                      value={formik.values.apellidos}
                      onChange={formik.handleChange}
                      disabled={disableEdit}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              {(user?.tipoCuentaInfo?.alias === ROLES.vendedor || user?.tipoCuentaInfo?.alias === ROLES.asistente || user?.tipoCuentaInfo?.alias === ROLES.prospecto) && (
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} display="flex" alignItems="center">
                      <InputLabel htmlFor="jefeDeVentas">Jefe de ventas asignado*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select
                          id="jefeDeVentasSelect"
                          name="jefeDeVentas"
                          value={formik.values.jefeDeVentas}
                          disabled
                        >
                          {jefesDeVentas?.map((jefeDeVentas) => (
                            <MenuItem value={jefeDeVentas.id} key={jefeDeVentas.id}>
                              {jefeDeVentas.Empleado.nombres + ' ' + jefeDeVentas.Empleado.apellidos}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
              )}
              {user?.tipoCuentaInfo?.alias === ROLES.jefeV && (
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} display="flex" alignItems="center">
                      <InputLabel htmlFor="asistenteDeVentas">Asistente de ventas asignado*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select
                          id="asistenteDeVentasSelect"
                          name="asistenteDeVentas"
                          value={formik.values.asistenteDeVentas}
                          disabled
                        >
                          {asistentesDeVenta?.map((asistente) => (
                            <MenuItem value={asistente.id} key={asistente.id}>
                              {asistente.Empleado.nombres + ' ' + asistente.Empleado.apellidos}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
              )}
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} display="flex" alignItems="center">
                    <InputLabel htmlFor="trabajo_actual">Trabajo actual*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                      <Select
                        id="trabajo_actual_select_id"
                        name="trabajo_actual"
                        value={formik.values.trabajo_actual}
                        disabled={disableEdit}
                        onChange={(e) => {
                          if (e.target.value === 'NO') formik.setFieldValue('nombre_empresa', '');
                          formik.handleChange(e);
                        }}
                      >
                        <MenuItem value={'NO'}>{'NO'}</MenuItem>
                        <MenuItem value={'SI'}>{'SI'}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      disabled={formik.values.trabajo_actual === 'NO' || disableEdit}
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
              <ListItem sx={{ paddingTop: 3 }} divider={!matchDownMD}>
                <Grid justifyContent="flex-end" container spacing={3}>
                  <Grid item xs={6} md={2}>
                    {disableEdit ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setDisableEdit(false);
                        }}
                      >
                        Editar
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setDisableEdit(true);
                          formik.resetForm();
                        }}
                      >
                        Cancelar
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Button fullWidth variant="contained" disabled={disableEdit} type="submit">
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DescripcionGeneralUser;
