import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  Button,
  IconButton
} from '@mui/material';

import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CachedIcon from '@mui/icons-material/Cached';
import { EmptyTable } from 'components/third-party/ReactTable';
import EmpleadoFormulario from 'components/users/EmpleadoFormulario';

import { useFormik } from 'formik';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { CREACION_USUARIOS_HEADERS } from 'utils/tables/admin';
import { useSelector } from 'store';

import useUsuarios from 'hooks/administrador/useUsuarios';
import useTiposCuentas from 'hooks/administrador/useTipoCuentas';
import useAsistenteVentas from 'hooks/asistente-ventas/useAsistenteVentas';
import useJefesVentas from 'hooks/useJefesVentas';
import * as yup from 'yup';

import RegistroAdmin from './registro/Registro';
import ManageUser from './registro/components/ManageUser';

const validationSchema = yup.object({
  nombres: yup.string().required('Campo requerido').test('names', 'Ingrese nombres completos', (value) => {
    if (!value || value === '') return false;

    const words = value.split(' ');
    for (const w of words) {
      if (w === '') return false;
    }

    return true;

  }).test('format', 'Nombre inválido: Solo debe contener letras', (value) => {
    const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
    return lettersOnlyRegex.test(value);
  }),
  apellidos: yup.string().required('Campo requerido').test('names', 'Ingrese apellidos completos', (value) => {

    if (!value || value === '') return false;

    const words = value.split(' ');
    if (words.length < 2) return false;
    if (words[0] === '' || words[1] === '') return false;

    return true;

  }).test('format', 'Apellido inválido: Solo debe contener letras', (value) => {
    const lettersOnlyRegex = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
    return lettersOnlyRegex.test(value);
  }),
  email: yup.string().email('Formato de email inválido').required('Campo requerido'),
  password: yup.string().required('Campo requerido').test('strong_password', 'La contraseña debe tener al menos 8 caracters con minúsculas, mayúsculas y números', (value) => {
    if (!value) return false;
    if (value.length === 0) return false;
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');

    return pattern.test(value) && value.length >= 8;
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
  tipoDeUsuario: yup.string().required('Campo requerido'),
  user_type: yup.string(),
  asistente_ventas_id: yup.string().when('user_type', {
    is: (value) => value && value === "jefe_ventas",
    then: (schema) => schema.required("Campo requerido"),
    otherwise: (schema) => schema,
  }),
  jefe_ventas_id: yup.string().when('user_type', {
    is: (value) => value && value === "prospecto_vendedor",
    then: (schema) => schema.required("Campo requerido"),
    otherwise: (schema) => schema,
  }),
  oficina: yup.string().when('user_type', {
    is: (value) => value && value === "director_operaciones",
    then: (schema) => schema,
    otherwise: (schema) => schema.required("Campo requerido"),
  }),
});

const EmpleadoView = () => {

  const usuarios = useSelector(state => state.users.users);

  const [userSeleccionado, setUserSeleccionado] = useState(undefined);

  const { crearUsuario, desactivarUsuario, activarUsuario } = useUsuarios({ activos: false });

  const tiposUsuario = useTiposCuentas();
  const { fetchAsistentes, asistentes } = useAsistenteVentas();
  const { fetchJefesVenta, jefesDeVentas } = useJefesVentas();

  const formik = useFormik({
    initialValues: {
      oficina: 'Guayaquil - Ecuador',
      nombres: '',
      apellidos: '',
      email: '',
      password: '',
      trabajo_actual: 'NO',
      nombre_empresa: '',
      tipoDeUsuario: '',
      user_type: '',
      asistente_ventas_id: '',
      jefe_ventas_id: ''
    },
    validationSchema,
    onSubmit: async (values) => {

      const snackbar = {
        open: true,
        variant: 'alert',
        alert: {},
        close: false
      };

      try {

        await crearUsuario(values);

        snackbar.message = 'Usuario creado correctamente';
        snackbar.alert.color = 'success';

        formik.resetForm();

      } catch (error) {

        console.error('Error de creacion de usuario', error);

        snackbar.alert.color = 'error';
        snackbar.message = error.message ?? 'Error al crear el nuevo usuario';

      } finally {

        formik.setSubmitting(false);
        dispatch(openSnackbar(snackbar));

      }

    }
  });

  const onUpdate = () => {
    fetchAsistentes();
    fetchJefesVenta();
  };

  return (
    <>
      {userSeleccionado ? (
        <RegistroAdmin user={userSeleccionado} volver={() => setUserSeleccionado(null)} />
      ) : (
        <Grid container spacing={3} width={'100%'}>
          <Grid item width={'100%'} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CachedIcon style={{ fontSize: '1.5rem' }} />}
              onClick={onUpdate}
            >
              Actualizar
            </Button>
          </Grid>
          <Grid item width={'100%'}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Crear nuevo usuario</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <EmpleadoFormulario
                  formik={formik}
                  tipos={tiposUsuario}
                  asistentes={asistentes}
                  jefesDeVentas={jefesDeVentas}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item width={'100%'}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }} component={Paper}>
              <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
                    {CREACION_USUARIOS_HEADERS.map((h) => (
                      <TableCell key={h.id} align={h.align} padding={h.padding}>
                        {h.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuarios.length === 0 ? (<EmptyTable msg="No existen usuarios" colSpan={CREACION_USUARIOS_HEADERS.length} />) : (
                    usuarios.map((u, i) => (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                        key={u.id}
                        onClick={() => setUserSeleccionado(u)}
                      >
                        <TableCell align="center">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">
                          {u.nombres}
                        </TableCell>
                        <TableCell align="center">
                          {u.apellidos}
                        </TableCell>
                        <TableCell align="center">
                          {u.Cuenta[0].TipoCuentum.nombre_tipo}
                        </TableCell>
                        <TableCell align="center">
                          {u.celular}
                        </TableCell>
                        <TableCell align="center">
                          <ManageUser user={u} desactivar={desactivarUsuario} activar={activarUsuario} />
                        </TableCell>
                      </TableRow>
                    ))
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

export default EmpleadoView;
