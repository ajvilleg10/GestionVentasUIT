/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import SiguienteAccionModal from './motivo_anulacion'

import { useFormik } from 'formik';
import * as yup from 'yup';

import dayjs from 'dayjs';

// third-party
// import { PatternFormat } from 'react-number-format';
// import PropTypes from 'prop-types';
// project import
// import MainCard from 'components/MainCard';
// import axios from 'utils/axios';
// const today = dayjs();


const validationSchema = yup.object({
  no_contrato: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  cedula: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  nombres: yup.string().required('Debe ingresar un nombre'),
  apellidos: yup.string().required('Debe ingresar los apellidos'),
  estado_contrato: yup.string().required('Debe ingresar el estado activo o inactivo'),
  plan: yup.string().required('Debe ingresar un tipo de plan'),
  valor_neto_anual: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  total_cuota_mensual: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  cuotas_pendientes: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  valor_adeudado: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  proximo_cobro: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
  nuevo_renovado: yup.string().required("Debe ingresar N para nuevo o R para renovado"),
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
  {
    id: 'fecha_inicio_contrato',
    align: 'center',
    disablePadding: true,
    label: 'Fecha Inicio Contrato'
  },
  {
    id: 'no_contrato',
    align: 'center',
    disablePadding: true,
    label: 'No contrato'
  },
  {
    id: 'estado_firma_contrato',
    align: 'center',
    disablePadding: false,
    label: 'Estado Firma Contrato'
  },
  {
    id: 'estado_contrato',
    align: 'center',
    disablePadding: false,
    label: 'Estado Contrato'
  },
  {
    id: 'plan',
    align: 'center',
    disablePadding: false,
    label: 'Plan'
  },
  {
    id: 'tipo_plan',
    align: 'center',
    disablePadding: false,
    label: 'Tipo Plan'
  },
  {
    id: 'valor_neto_anual',
    align: 'center',
    disablePadding: false,
    label: 'Valor Neto Anual'
  },
  {
    id: 'total_cuota_mensual',
    align: 'center',
    disablePadding: false,
    label: 'Total Cuota Mensual'
  },
  {
    id: 'cuotas_pendientes',
    align: 'center',
    disablePadding: false,
    label: 'Cuotas Pendientes'
  },
  {
    id: 'valor_adeudado',
    align: 'center',
    disablePadding: false,
    label: 'Valor Adeudado'
  },
  {
    id: 'proximo_cobro',
    align: 'center',
    disablePadding: false,
    label: 'Proximo Cobro'
  },
  {
    id: 'nuevo_renovado',
    align: 'center',
    disablePadding: false,
    label: 'Nuevo/Renovado'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
        {headCells.map((headCell) => (
          <TableCell sx={{ minWidth: '180px' }} key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// eslint-disable-next-line no-unused-vars


const Anulacion_contratos = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleRowClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  //const { actualizarConfParametros } = useProspectosVendedores();


  const initialFormValues = {
    no_contrato: '',
    cedula: '',
    nombres: '',
    apelidos: '',
    estado_contrato: '',
    plan: '',
    valor_neto_anual: '',
    total_cuota_mensual: '',
    cuotas_pendientes: '',
    valor_adeudado: '',
    proximo_cobro: '',
    nuevo_renovado: '',
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('select form submit - ', values);
      try {
        /*await actualizarConfParametros({
           cedula: values.cedula,
                nombres: values.nombre,
                apelidos: values.apellidos,
                estado_contrato: values.estado_contrato,
                plan: values.plan,
                valor_neto_anual: values.valor_neto_anual,
                total_cuota_mensual: values.total_cuota_mensual,
                cuotas_pendientes: values.cuotas_pendientes,
                valor_adeudado:values.valor_adeudado,
                proximo_cobro: values.proximo_cobro,
                nuevo_renovado: values.nuevo_renovado,
         });*/
        dispatch(
          openSnackbar({
            open: true,
            message: 'Reunion personal semanal creada con exito',
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
            message: error.message,
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Buscar contrato</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={formik.handleSubmit}>
                <List dense>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="contrato_no">Contrato No</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="number"
                          fullWidth
                          id="contrato_no"
                          name="contrato_no"
                          value={formik.values.duracion}
                          onChange={formik.handleChange}
                          error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                          helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="cedula">Cedula</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="cedula"
                          fullWidth
                          id="cedula"
                          name="cedula"
                          value={formik.values.duracion}
                          onChange={formik.handleChange}
                          error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                          helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="nombres">Nombres</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="number"
                          fullWidth
                          id="nombres"
                          name="nombres"
                          value={formik.values.duracion}
                          onChange={formik.handleChange}
                          error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                          helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={2} display="flex" alignItems="center">
                        <InputLabel htmlFor="bono_mensual">Apellidos</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="number"
                          fullWidth
                          id="apellidos"
                          name="apellidos"
                          value={formik.values.duracion}
                          onChange={formik.handleChange}
                          error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                          helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          type="submit"
                        >
                          Guardar
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </form>
            </AccordionDetails>
          </Accordion>
          <Box mt={4}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
              <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
                <OrderTableHead />
                <TableBody>
                  <TableRow onClick={handleRowClick}>
                    <TableCell component="th" id={"tabla"} scope="row" align="center">
                      <label> 10/06/23 </label>
                    </TableCell>
                    <TableCell align="center">
                      <label>1121</label>
                    </TableCell>
                    <TableCell align="center">
                      <label> Pendiente </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> Activo </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> Silver Individual </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> Estandar </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> 600 </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> 50 </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> 2 </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> 300 </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> 10/06/23 </label>
                    </TableCell>
                    <TableCell align="center">
                      <label> Nuevo </label>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogContent>
              <SiguienteAccionModal onCancel={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default Anulacion_contratos;

