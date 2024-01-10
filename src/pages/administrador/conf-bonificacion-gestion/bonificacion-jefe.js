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
    InputAdornment,
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
import { useConfBonificacionGestionJefeVentas } from 'hooks/administrador/useConfBonificacionGestion';

const today = dayjs();

const validationSchema = yup.object({
    numero_vendedores_reclutar: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    bono_reclutamiento: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    bono_semanal_comites: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    bono_semanal: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    citas_acompañamiento: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    asistencia: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    bono_acompañamiento: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    contactos_telefonicos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    citas_obtenidas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    citas_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    referidos_obtenidos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0')
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
        label: 'Citas Nuevas'
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
const BonificacionJefeVentas = () => {

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const { bonJV, createBonJV } = useConfBonificacionGestionJefeVentas();

    //const { actualizarConfParametros } = useProspectosVendedores();

    const [bonificacionJV, setBonificacionJV] = useState({
        bono_semanal_comites: 1,
        bono_reclutamiento: 1,
        bono_acompañamiento: 1,
        bono_semanal: 1,
        numero_vendedores_reclutar: 1,
        citas_acompañamiento: 1,
        asistencia: 1,
        contactos_telefonicos: 1,
        citas_concretadas: 1,
        citas_obtenidas: 1,
        referidos_obtenidos: 1,
    });

    useEffect(() => {
        if (bonJV != null) {
            setBonificacionJV({ ...bonJV });
            setIsUserDataLoaded(true);
            console.log("bonJV");
            console.log(bonJV);
            console.log("bonificacionJV");
            console.log(bonificacionJV);
        }

    }, [bonJV]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: bonificacionJV,
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                await createBonJV(values);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Bonificación agregada con Exíto',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                formik.setValues(bonificacionJV);
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
                                        <InputLabel htmlFor="numero_vendedores_reclutar">Numero de Vendedores a <br />Reclutar</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="numero_vendedores_reclutar"
                                            name="numero_vendedores_reclutar"
                                            value={formik.values.numero_vendedores_reclutar}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 1,
                                            }}
                                            error={formik.touched.numero_vendedores_reclutar && Boolean(formik.errors.numero_vendedores_reclutar)}
                                            helperText={formik.touched.numero_vendedores_reclutar && formik.errors.numero_vendedores_reclutar}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="bono_reclutamiento">Bono por <br />Reclutamiento</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                              }}
                                            id="bono_reclutamiento"
                                            name="bono_reclutamiento"
                                            value={formik.values.bono_reclutamiento}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 1,
                                                step: "0.01"
                                            }}
                                            error={formik.touched.bono_reclutamiento && Boolean(formik.errors.bono_reclutamiento)}
                                            helperText={formik.touched.bono_reclutamiento && formik.errors.bono_reclutamiento}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="bono_semanal_comites">Bono Semanal por <br />comites</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                              }}
                                            id="bono_semanal_comites"
                                            name="bono_semanal_comites"
                                            value={formik.values.bono_semanal_comites}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 1,
                                                step: "0.01"
                                            }}
                                            error={formik.touched.bono_semanal_comites && Boolean(formik.errors.bono_semanal_comites)}
                                            helperText={formik.touched.bono_semanal_comites && formik.errors.bono_semanal_comites}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="asistencias">% Asistencia</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="asistencia"
                                            name="asistencia"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                              }}
                                            value={formik.values.asistencia}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 1,
                                            }}
                                            error={formik.touched.asistencia && Boolean(formik.errors.asistencia)}
                                            helperText={formik.touched.asistencia && formik.errors.asistencia}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="citas_acompañamiento">Numero de Citas <br /> Acompañamiento </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="citas_acompañamiento"
                                            name="citas_acompañamiento"
                                            value={formik.values.citas_acompañamiento}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 1,
                                            }}
                                            error={formik.touched.citas_acompañamiento && Boolean(formik.errors.citas_acompañamiento)}
                                            helperText={formik.touched.citas_acompañamiento && formik.errors.citas_acompañamiento}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center" >
                                        <InputLabel htmlFor="bono_acompañamiento">Bono por <br />Acompañamiento</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="bono_acompañamiento"
                                            name="bono_acompañamiento"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                              }}
                                            value={formik.values.bono_acompañamiento}
                                            onChange={formik.handleChange}
                                            inputProps={{
                                                min: 1,
                                                step: "0.01"
                                            }}
                                            error={formik.touched.bono_acompañamiento && Boolean(formik.errors.bono_acompañamiento)}
                                            helperText={formik.touched.bono_acompañamiento && formik.errors.bono_reclutabono_acompañamientomiento}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Box mt={2}>
                                <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                                    <Table>
                                        <OrderTableHead />
                                        <TableBody>
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
                                                        defaultValue={formik.values.contactos_telefonicos}
                                                        value={formik.values.contactos_telefonicos}
                                                        onChange={formik.handleChange}
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                        error={formik.touched.contactos_telefonicos && Boolean(formik.errors.contactos_telefonicos)}
                                                        helperText={formik.touched.contactos_telefonicos && formik.errors.contactos_telefonicos}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="citas_obtenidas"
                                                        name="citas_obtenidas"
                                                        value={formik.values.citas_obtenidas}
                                                        onChange={formik.handleChange}
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                        error={formik.touched.citas_obtenidas && Boolean(formik.errors.citas_obtenidas)}
                                                        helperText={formik.touched.citas_obtenidas && formik.errors.citas_obtenidas}

                                                    />
                                                </TableCell>

                                                <TableCell align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="citas_concretadas"
                                                        name="citas_concretadas"
                                                        value={formik.values.citas_concretadas}
                                                        onChange={formik.handleChange}
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                        error={formik.touched.duracion && Boolean(formik.errors.citas_concretadas)}
                                                        helperText={formik.touched.citas_concretadas && formik.errors.citas_concretadas}

                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="referidos_obtenidos"
                                                        name="referidos_obtenidos"
                                                        value={formik.values.referidos_obtenidos}
                                                        onChange={formik.handleChange}
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                        error={formik.touched.referidos_obtenidos && Boolean(formik.errors.referidos_obtenidos)}
                                                        helperText={formik.touched.referidos_obtenidos && formik.errors.referidos_obtenidos}

                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="bono_semanal"
                                                        name="bono_semanal"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                          }}
                                                        value={formik.values.bono_semanal}
                                                        onChange={formik.handleChange}
                                                        inputProps={{
                                                            min: 1,
                                                            step: "0.01"
                                                        }}
                                                        error={formik.touched.bono_semanal && Boolean(formik.errors.bono_semanal)}
                                                        helperText={formik.touched.bono_semanal && formik.errors.bono_semanal}
                                                    />
                                                </TableCell>
                                            </TableRow>
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

export default BonificacionJefeVentas;