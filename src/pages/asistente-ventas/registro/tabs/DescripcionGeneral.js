// material-ui
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
  Checkbox,
  FormHelperText
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { FormattedMessage } from 'react-intl';

import { useState, useEffect } from 'react';

import useJefesVentas from 'hooks/asistente-ventas/useJefesVenta';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';
import useTiposCuentas from 'hooks/useTiposCuentas';

import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import axios from 'utils/axios';

import { OFICINAS } from 'utils/constants';

import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  tipoUsuario: yup.string(),
  oficina: yup.string().required('El campo oficina es obligatorio'),
  nombresApellidos: yup.string().required('El campo nombre es obligatorio'),
  jefeDeVentas: yup.string().required('El campo jefe de ventas es obligatorio'),
  // usuarioGv: yup.bool(),
  categoria: yup.string()
});

const DescripcionGeneralAsistente = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [disableEdit, setDisableEdit] = useState(true);
  const [cancel, setCancel] = useState(false);

  const dispatch = useDispatch();
  const tiposUsuario = useTiposCuentas();
  const jefesDeVentas = useJefesVentas();
  const user = useProspectoSeleccionado();

  // TODO: En el submit, pendiente la categoria y el usuarioGv
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async (values) => {

      try {

        const full_name = values.nombresApellidos.split(' ');

        const empleadoInfo = {
          oficina: values.oficina,
          nombres: full_name[0],
          apellidos: full_name[1],
          jefe_venta_id: values.jefeDeVentas
        };

        await axios.put(`/empleados/updateDescripcionGeneral/${user?.empleadoInfo?.id}`, empleadoInfo);

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

        setDisableEdit(true);
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

    formik.setValues({
      tipoUsuario: 1,
      oficina: user?.empleadoInfo?.oficina ?? '',
      nombresApellidos: user?.empleadoInfo?.nombres + ' ' + user?.empleadoInfo?.apellidos,
      jefeDeVentas: user?.empleadoInfo?.jefe_venta_id ?? 1,
      // usuarioGv: false,
      categoria: ''
    });

    setCancel(false);

  }, [user, cancel]);

  // TODO: Cambiar render a un loader
  if (tiposUsuario.length == 0 || jefesDeVentas.length === 0 || !user) {
    return <h2>Cargando información...</h2>;
  }

  const acercaDe = tiposUsuario.filter((tipo) => tipo.id == 1)[0].descripcion;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title={<FormattedMessage id="acercaDe" />}>
          <TextField fullWidth id="acercaDe" name="acercaDe" multiline placeholder="Información acerca del rol" value={acercaDe} disabled={true} />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="">
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
                        value={formik.values.tipoUsuario}
                        onChange={formik.handleChange}
                        disabled // TODO: Cambiar en caso de que sea posible que la asistente cambie el tipo de empleado del prospecto
                      >
                        {tiposUsuario?.map((tipoUsuario) => (
                          <MenuItem value={tipoUsuario.id} key={tipoUsuario.id}>
                            {tipoUsuario.nombre_tipo}
                          </MenuItem>
                        ))}
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
                    <InputLabel htmlFor="nombresApellidos">Nombres y Apellidos</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="nombresApellidos"
                      name="nombresApellidos"
                      variant="outlined"
                      value={formik.values.nombresApellidos}
                      onChange={formik.handleChange}
                      disabled={disableEdit}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem divider={!matchDownMD}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="categoria">Categoría de Vendedor*</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="categoria"
                      name="categoria"
                      variant="outlined"
                      value="---"
                      disabled
                      onChange={(e) => console.log(e)}
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
              {/*       <Checkbox */}
              {/*         id="usuarioGv" */}
              {/*         name="usuarioGv" */}
              {/*         checked={formik.values.usuarioGv} */}
              {/*         onChange={formik.handleChange} */}
              {/*         disabled={disableEdit} */}
              {/*       /> */}
              {/*     </Grid> */}
              {/*   </Grid> */}
              {/* </ListItem> */}
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
                          setCancel(true);
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
