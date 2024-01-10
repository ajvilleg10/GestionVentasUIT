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
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import axios from 'utils/axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import dayjs from 'dayjs';

const today = dayjs();

const validationSchema = yup.object({
    numero_vendedores_reclutar: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    bono_semanal_comites: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    citas_acompañamiento: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    bono_reclutamiento: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    asistencia: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    bono_acompañamiento: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    contactos_telefonicos: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    citas_obtenidas: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    citas_concretadas: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    referidos_obtenidos: yup.number().integer().min(0, 'La duracion debe ser mayor a 0')
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
    {
        id: 'numero',
        align: 'left',
        disablePadding: false,
        label: 'Contactos Telefonicos'
    },
    {
        id: 'nivel',
        align: 'left',
        disablePadding: true,
        label: 'Citas Nuevas Obtenidas'
    },
    {
        id: 'contactos',
        align: 'left',
        disablePadding: true,
        label: 'Citas Nuevas Concretadas'
    },
    {
        id: 'Referidos Obtenidos',
        align: 'left',
        disablePadding: false,
        label: 'Referidos Obtenidos'
    },
    {
        id: 'Bono Semanal',
        align: 'left',
        disablePadding: false,
        label: 'Bono Semanal'
    },

];

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

// eslint-disable-next-line no-unused-vars
const Bonificacion_jefe_ventas = () => {
    const [niveles, setNiveles ] = useState([
        {
            no: 'numero',
            nivel: 'left',
            monto_desde: false,
            monto_hasta: 'Numero',
            bono_comision: 'sadsa'
        },
    ]);
    

    //const { actualizarConfParametros } = useProspectosVendedores();

    const initialFormValues = {
        numero_vendedores_reclutar: '',
        bono_semanal_comites: '',
        citas_acompañamiento: '',
        bono_reclutamiento: '',
        asistencia: '',
        bono_acompañamiento: '',
        contactos_telefonicos: '',
        citas_obtenidas: '',
        citas_concretadas: '',
        referidos_obtenidos: ''
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('select form submit - ', values);
            try {
                /*await actualizarConfParametros({
                  numero_vendedores_reclutar:values.numero_vendedores_reclutar
                  bono_semanal_comites:values.bono_semanal_comites
                  citas_acompañamientos:values.citas_acompañamiento
                  bono_reclutamiento:values.bono_reclutamiento
                  asitencia: values.asistencia
                  bono-acompañamiento: values.bono_acompañamiento
                  contactos_telefonicos: values.contactos_telefonicos
                  citas_obtenidas: values.citas_obtenidas
                  citas_concretadas:values.citas_concretadas
                  referidos_obtenidos: values.referidos_obtenidos
                 });*/
                 niveles.push({
                    Hola: 212
                });

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
                    <form onSubmit={formik.handleSubmit}>
                        <List sx={{ py: 0 }} dense>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="numero_vendedores_reclutar">Numero de Vendedores a <br/>Reclutar</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="numero_vendedores_reclutar"
                                            name="numero_vendedores_reclutar"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="bono_reclutamiento">Bono por <br/>Reclutamiento</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="bono_reclutamiento"
                                            name="bono_reclutamiento"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="bono_semanal_comites">Bono Semanal por <br/>comites</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="bono_semanal_comites"
                                            name="bono_semanal_comites"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="asistencias">Asistencia</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="asistencia"
                                            name="asistencia"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                </Grid>     
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="citas_acompañamiento">Numero de Citas <br/> Acompañamiento </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="citas_acompañamiento"
                                            name="citas_acompañamiento"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center" >
                                        <InputLabel htmlFor="bono_acompañamiento">Bono por <br/>Acompañamiento</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="bono_reclutamiento"
                                            name="bono_reclutamiento"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Box mt={2}>
                                <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                                    <Table>
                                        <OrderTableHead />
                                        <TableBody>
                                            {niveles && (niveles.map((nivel) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                    
                                                        <TableCell align="left">
                                                            <TextField
                                                                type="number"
                                                                fullWidth
                                                                id="contactos_telefonicos"
                                                                name="contactos_telefonicos"
                                                                defaultValue="contactos_telefonicos"
                                                                //value={"a"}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                                                helperText={formik.touched.duracion && formik.errors.duracion}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <TextField
                                                                type="number"
                                                                fullWidth
                                                                id="citas_nuevas_obtenidas"
                                                                name="citas_nuevas_obtenidas"
                                                                value={formik.values.duracion}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                                                helperText={formik.touched.duracion && formik.errors.duracion}

                                                            />
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <TextField
                                                                type="number"
                                                                fullWidth
                                                                id="citas_nuevas_concretadas"
                                                                name="dias_capacitacion_inicial1"
                                                                value={formik.values.duracion}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                                                helperText={formik.touched.duracion && formik.errors.duracion}

                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <TextField
                                                                type="number"
                                                                fullWidth
                                                                id="referidos_obtenidos"
                                                                name="referidos_obtenidos"
                                                                value={formik.values.duracion}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                                                helperText={formik.touched.duracion && formik.errors.duracion}

                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <TextField
                                                                type="number"
                                                                fullWidth
                                                                id="bono_semanal"
                                                                name="dias_capacitacion_inicial1"
                                                                value={formik.values.duracion}
                                                                onChange={formik.handleChange}
                                                                error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                                                helperText={formik.touched.duracion && formik.errors.duracion}

                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <ListItem>
                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="flex-end">
                                        <Button variant="contained" type="submit">
                                            Guardar
                                        </Button>
                                    </Stack>
                                </Grid>
                            </ListItem>
                        </List>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default Bonificacion_jefe_ventas;