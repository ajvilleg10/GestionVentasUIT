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
} from '@mui/material';

import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EmptyTable } from 'components/third-party/ReactTable';
import EmpleadoFormulario from 'components/users/EmpleadoFormulario';

import * as yup from 'yup';

import { useFormik } from 'formik';
import useUsuarios from 'hooks/administrador/useUsuarios';
import useTiposCuentas from 'hooks/administrador/useTipoCuentas';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import RegistroAdmin from './registro/Registro';
import { CREACION_USUARIOS_HEADERS } from 'utils/tables/admin';
import { useSelector } from 'store';
import ManageUser from './registro/components/ManageUser';

const validationSchema = yup.object({
  oficina: yup.string(),
  nombres: yup.string().required('Campo requerido').test('names', 'Ingrese nombres completos', (value) => {
    if (!value || value === '') return false;

    const words = value.split(' ');
    if (words.length < 2) return false;
    if (words[0] === '' || words[1] === '') return false;

    return true;
  }),
  apellidos: yup.string().required('Campo requerido').test('names', 'Ingrese apellidos completos', (value) => {
    if (!value || value === '') return false;

    const words = value.split(' ');
    if (words.length < 2) return false;
    if (words[0] === '' || words[1] === '') return false;

    return true;
  }),
  email: yup.string().required('Campo requerido'),
  password: yup.string().required('El campo contraseña es obligatorio').test('strong_password', 'La contraseña debe tener al menos 8 caracters con minúsculas, mayúsculas y números', (value) => {
    if (!value) return false;
    if (value.length === 0) return false;
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');

    return pattern.test(value) && value.length >= 8;
  }),
  tipoDeUsuario: yup.string().required('Campo requerido'),
  asistente_ventas_id: yup.string(),
});

const EmpleadoView = () => {

  const { crearUsuario, desactivarUsuario, activarUsuario } = useUsuarios({ activos: false });
  const tiposUsuario = useTiposCuentas();
  const [userSeleccionado, setUserSeleccionado] = useState(undefined);

  const usuarios = useSelector(state => state.users.users);

  const formik = useFormik({
    initialValues: {
      oficina: '',
      tipoDeUsuario: '',
      nombres: '',
      apellidos: '',
      categoria: '',
      email: '',
      password: '',
      asistente_ventas_id: '',
      jefe_ventas_id: '',
      user_type: ''
    },
    validationSchema,
    onSubmit: async (values) => {

      formik.setSubmitting(true);

      console.log('submit values - ', values);

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

        console.error(error);

        snackbar.alert.color = 'error';
        snackbar.message = error.message ?? 'Error al crear el nuevo usuario';

      } finally {

        formik.setSubmitting(false);
        dispatch(openSnackbar(snackbar));

      }

    }
  });

  return (
    <>
      {userSeleccionado ? (
        <RegistroAdmin user={userSeleccionado} volver={() => setUserSeleccionado(null)} />
      ) : (
        <Grid container spacing={3} width={'100%'}>
          <Grid item width={'100%'}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Crear nuevo usuario</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <EmpleadoFormulario formik={formik} tipos={tiposUsuario} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item width={'100%'}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
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
