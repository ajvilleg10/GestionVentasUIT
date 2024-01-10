// eslint-disable no-unused-vars
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid
} from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useFormik } from 'formik';
import * as yup from 'yup';

import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ContactosEnviadosDialog from './Dialog';

// third-party
import useContactosProyecto100 from 'hooks/useContactosProyecto100';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  nombres: yup.string().required('Nombres es obligatorio'),
  apellidos: yup.string().required('Apellidos es obligatorio'),
  numero_celular: yup
    .string()
    .required('Teléfono es obligatorio')
    .test('phone', 'Número de celular inválido', (value) => {
      if (value === undefined) return true;
      return value.match(/^09\d{8}$/);
    }),
  comentarios: yup.string().required('Descripción es obligatoria'),
  parentezco: yup.string().required('Parentesco es obligatorio')
});

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
  {
    id: 'numero',
    align: 'left',
    disablePadding: false,
    label: 'Número'
  },
  {
    id: 'nombres',
    align: 'left',
    disablePadding: true,
    label: 'Nombres'
  },
  {
    id: 'apellidos',
    align: 'left',
    disablePadding: true,
    label: 'Apellidos'
  },
  {
    id: 'telefeno',
    align: 'left',
    disablePadding: false,
    label: 'Teléfono'
  },
  {
    id: 'comentarios',
    align: 'left',
    disablePadding: false,
    label: 'Descripción'
  },
  {
    id: 'parentezco',
    align: 'left',
    disablePadding: false,
    label: 'Parentesco'
  }
];

// TODO: Recuperar desde la base, configuracion del admin
const CANTIDAD_CONTACTOS = 2;

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| SAMPLE PAGE ||============================== //

const Proyecto = () => {
  const { contactos, addContacto, enviarContactos, isProyecto100Enviado } = useContactosProyecto100();
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const [selected] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    if (contactos.length == CANTIDAD_CONTACTOS) {
      setIsFormDisabled(true);
      setNotificationOpen(true);
    }
  }, [contactos]);

  const initialFormValues = {
    nombres: '',
    apellidos: '',
    numero_celular: '',
    comentarios: '',
    parentezco: ''
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        await addContacto({
          nombres: values.nombres,
          apellidos: values.apellidos,
          numero_celular: values.numero_celular,
          comentarios: values.comentarios,
          parentezco: values.parentezco
        });
        dispatch(
          openSnackbar({
            open: true,
            message: 'Contacto agregado con exito',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(initialFormValues);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
        console.log(error);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Error al crear el contacto',
            variant: 'alert',
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      } finally {
        formik.setSubmitting(false); // Ensure that the form is not stuck in a submitting state
      }
    }
  });

  return (
    <>
      <Box>
        <Box mt={2}>
          <form onSubmit={formik.handleSubmit}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" mb={2}>
                Agregar contactos
              </Typography>
              <Box display="flex" gap={2} width="100%">
                <TextField
                  label="Nombres"
                  variant="outlined"
                  size="small"
                  id="nombres"
                  name="nombres"
                  value={formik.values.nombres}
                  onChange={formik.handleChange}
                  error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                  helperText={formik.touched.nombres && formik.errors.nombres}
                  disabled={isFormDisabled}
                />
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  size="small"
                  id="apellidos"
                  name="apellidos"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                  error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                  helperText={formik.touched.apellidos && formik.errors.apellidos}
                  disabled={isFormDisabled}
                />
                <TextField
                  placeholder="0990729257"
                  size="small"
                  variant="outlined"
                  label="Telefono"
                  minLength={10}
                  id="comentarios"
                  name="numero_celular"
                  value={formik.values.numero_celular}
                  onChange={formik.handleChange}
                  error={formik.touched.numero_celular && Boolean(formik.errors.numero_celular)}
                  helperText={formik.touched.numero_celular && formik.errors.numero_celular}
                  disabled={isFormDisabled}
                />
                <TextField
                  label="Descripcion"
                  variant="outlined"
                  size="small"
                  id="comentarios"
                  name="comentarios"
                  value={formik.values.comentarios}
                  onChange={formik.handleChange}
                  error={formik.touched.comentarios && Boolean(formik.errors.comentarios)}
                  helperText={formik.touched.comentarios && formik.errors.comentarios}
                  disabled={isFormDisabled}
                />
                <TextField
                  label="Parentesco"
                  variant="outlined"
                  size="small"
                  id="parentezco"
                  name="parentezco"
                  value={formik.values.parentezco}
                  onChange={formik.handleChange}
                  error={formik.touched.parentezco && Boolean(formik.errors.parentezco)}
                  helperText={formik.touched.parentezco && formik.errors.parentezco}
                  disabled={isFormDisabled}
                />
                <Button variant="contained" color="primary" type="submit" style={{ maxHeight: '40px' }} disabled={isFormDisabled}>
                  Agregar
                </Button>
              </Box>
            </Paper>
          </form>
        </Box>

        <Box mt={2}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
            <Table>
              <OrderTableHead />
              <TableBody>
                {contactos &&
                  contactos.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${row.id}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell component="th" id={labelId} scope="row" align="left">
                          <Link color="secondary" component={RouterLink} to="">
                            {index + 1}
                          </Link>
                        </TableCell>
                        <TableCell align="left">{row.nombres}</TableCell>
                        <TableCell align="left">{row.apellidos}</TableCell>
                        <TableCell align="left">{row.numero_celular}</TableCell>
                        <TableCell align="left">{row.comentarios}</TableCell>
                        <TableCell align="left">{row.parentezco}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid display="flex" justifyContent="right" alignItems="center">
            {notificationOpen ? <ContactosEnviadosDialog onOpenDialog={enviarContactos} isProyecto100Enviado={isProyecto100Enviado} /> : ''}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Proyecto;