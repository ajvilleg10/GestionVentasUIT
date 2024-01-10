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
  MenuItem,
  FormHelperText
} from '@mui/material';

import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import useJefesVentas from 'hooks/asistente-ventas/useJefesVenta';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';

import { OFICINAS } from 'utils/constants';

import * as yup from 'yup';
import { useFormik } from 'formik';
import useEmpleado from 'hooks/useEmpleado';

const validationSchema = yup.object({
  oficina: yup.string().required('Campo requerido'),
  nombres: yup.string().required('Campo requerido').test('names', 'Ingrese nombres completos', (value) => {
    if (!value || value === '') return false;

    const words = value.split(' ');
    for (const w of words) {
      if (w === '') return false;
    }

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
  jefeDeVentas: yup.string().required('Campo requerido'),
});

const DescripcionGeneralAsistente = () => {

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const jefesDeVentas = useJefesVentas();
  const user = useProspectoSeleccionado();
  const { updateDescripcionGeneralProspecto } = useEmpleado()

  const [disableEdit, setDisableEdit] = useState(true);
  const [initialValues, setInitialValues] = useState({
    oficina: '',
    nombres: '',
    apellidos: '',
    trabajo_actual: 'NO',
    nombre_empresa: '',
    jefeDeVentas: '',
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
      });

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

        const empleadoInfo = {
          oficina: values.oficina,
          nombres: values.nombres,
          apellidos: values.apellidos,
          trabajo_actual: values.trabajo_actual,
          nombre_empresa: values.nombre_empresa,
          jefe_venta_id: values.jefeDeVentas
        };

        const response = await updateDescripcionGeneralProspecto(empleadoInfo);

        snackbar.message = response.message ?? "Información actualizada correctamente";
        snackbar.alert.color = "success";

        setInitialValues({ ...initialValues, ...empleadoInfo });
        setDisableEdit(true);

      } catch (error) {

        console.log('Error al enviar la informacion de descripcion general del empleado', error);

        snackbar.message = error.message ?? 'Error al actualizar la Información general del empleado';
        snackbar.alert.color = 'error';

      } finally {

        dispatch(openSnackbar(snackbar));

      }
    }
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Información general">
          <form onSubmit={formik.handleSubmit}>
            <List sx={{ py: 0 }}>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
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
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="oficina">Oficina*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                        id="oficinaSelect"
                        name="oficina"
                        value={formik.values.oficina}
                        onChange={formik.handleChange}
                        disabled={disableEdit}
                      >
                        {OFICINAS.map((oficina) => (
                          <MenuItem value={oficina} key={oficina}>
                            {oficina}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {(formik.touched.oficina && Boolean(formik.errors.oficina)) && (
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
                  <Grid item xs={12} md={6}>
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
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="jefeDeVentas">Jefe de ventas asignado*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <Select
                        id="jefeDeVentasSelect"
                        name="jefeDeVentas"
                        value={formik.values.jefeDeVentas}
                        onChange={formik.handleChange}
                        disabled={disableEdit}
                      >
                        {jefesDeVentas?.map((jefeDeVentas) => (
                          <MenuItem value={jefeDeVentas.id} key={jefeDeVentas.id}>
                            {jefeDeVentas.Empleado.nombres + ' ' + jefeDeVentas.Empleado.apellidos}
                          </MenuItem>
                        ))}
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
                      <Button fullWidth variant="contained" onClick={() => setDisableEdit(false)}>
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

export default DescripcionGeneralAsistente;
