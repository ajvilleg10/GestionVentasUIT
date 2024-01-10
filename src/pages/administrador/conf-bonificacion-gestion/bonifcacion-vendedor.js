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
import { useConfBonificacionGestionVendedor } from 'hooks/administrador/useConfBonificacionGestion';

const today = dayjs();

const validationSchema = yup.object({
    contactos_telefonicos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    citas_nuevas_obtenidas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    citas_nuevas_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    citas_cierre_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    referidos_obtenidos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    negocios_xcerrar: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
    bono_semanal: yup.number().min(1, 'La duracion debe ser mayor a 0'),
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
    {
        id: 'numero',
        align: 'center',
        disablePadding: false,
        label: 'Numero'
    },
    {
        id: 'nivel',
        align: 'center',
        disablePadding: true,
        label: 'Nivel'
    },
    {
        id: 'contactos',
        align: 'center',
        disablePadding: true,
        label: 'Contactos Telefonicos'
    },
    {
        id: 'citas_obtenidas',
        align: 'center',
        disablePadding: false,
        label: 'Citas nuevas obtenidas'
    },
    {
        id: 'citas_nuevas_concreatadas',
        align: 'center',
        disablePadding: false,
        label: 'Citas de nuevas concretadas'
    },
    {
        id: 'citas_cierre_concretada',
        align: 'center',
        disablePadding: false,
        label: 'Citas de cierre concretadas'
    },
    {
        id: 'referidos',
        align: 'center',
        disablePadding: false,
        label: 'Referidos Obtenidos'
    },
    {
        id: 'negocios_cerrar',
        align: 'center',
        disablePadding: false,
        label: 'Negocios x cerrar'
    },
    {
        id: 'bono_semanal',
        align: 'center',
        disablePadding: false,
        label: 'Bono Semanal'
    }

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


const ConfBonificacionGestion = () => {

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const { bonVendedor, createBonVendedor } = useConfBonificacionGestionVendedor();
    const [niveles, setNiveles] = useState([{
        no: 1,
        nivel: 1,
        contactos_telefonicos: 1,
        citas_nuevas_obtenidas: 1,
        citas_nuevas_concretadas: 1,
        citas_cierre_concretadas: 1,
        referidos_obtenidos: 1,
        negocios_xcerrar: 1,
        bono_semanal: 1
    }]);

    useEffect(() => {
        if (bonVendedor != null && bonVendedor.length >= 0) {
            setNiveles([...bonVendedor]);
            setIsUserDataLoaded(true);
        } else if (bonVendedor != null && bonVendedor.length === 0) {
            setIsUserDataLoaded(true);
        }
    }, [bonVendedor]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: niveles,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createBonVendedor(values);
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
                formik.setValues(niveles);
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
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [index, key] = name.split(",");
        niveles[index][key] = value;
        setNiveles([...niveles]);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                <Box mt={2}>
                    <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                        <Table>
                            <OrderTableHead />
                            <TableBody>
                                {formik.values && (formik.values.map((nivel, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" id={"tabla"} scope="row" align="left">
                                                <label>{nivel.nivel}</label>
                                            </TableCell>
                                            <TableCell align="left"><label>{nivel.nivel}</label></TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="contactos_telefonicos"
                                                    name={[index, "contactos_telefonicos"]}
                                                    value={nivel.contactos_telefonicos}
                                                    onChange={handleChange}
                                                    inputProps={{ min: 1 }}
                                                    error={formik.touched.contactos_telefonicos && Boolean(formik.errors.contactos_telefonicos)}
                                                    helperText={formik.touched.contactos_telefonicos && formik.errors.contactos_telefonicos}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="citas_nuevas_obtenidas"
                                                    name={[index, "citas_nuevas_obtenidas"]}
                                                    value={nivel.citas_nuevas_obtenidas}
                                                    onChange={handleChange}
                                                    defaultValue={nivel.citas_nuevas_obtenidas}
                                                    inputProps={{ min: 1 }}
                                                    error={formik.touched.citas_nuevas_obtenidas && Boolean(formik.errors.citas_nuevas_obtenidas)}
                                                    helperText={formik.touched.citas_nuevas_obtenidas && formik.errors.citas_nuevas_obtenidas}

                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="citas_nuevas_concretadas"
                                                    name={[index, "citas_nuevas_concretadas"]}
                                                    value={nivel.citas_nuevas_concretadas}
                                                    onChange={handleChange}
                                                    defaultValue={nivel.citas_nuevas_concretadas}
                                                    inputProps={{ min: 1 }}
                                                    error={formik.touched.citas_nuevas_concretadas && Boolean(formik.errors.citas_nuevas_concretadas)}
                                                    helperText={formik.touched.citas_nuevas_concretadas && formik.errors.citas_nuevas_concretadas}

                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="citas_cierre_concretadas"
                                                    name={[index, "citas_cierre_concretadas"]}
                                                    value={nivel.citas_cierre_concretadas}
                                                    onChange={handleChange}
                                                    defaultValue={nivel.citas_cierre_concretadas}
                                                    inputProps={{ min: 1 }}
                                                    error={formik.touched.citas_cierre_concretadas && Boolean(formik.errors.citas_cierre_concretadas)}
                                                    helperText={formik.touched.citas_cierre_concretadas && formik.errors.citas_cierre_concretadas}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="referidos_obtenidos"
                                                    name={[index, "referidos_obtenidos"]}
                                                    value={nivel.referidos}
                                                    onChange={handleChange}
                                                    defaultValue={nivel.referidos_obtenidos}
                                                    inputProps={{ min: 1 }}
                                                    error={formik.touched.referidos_obtenidos && Boolean(formik.errors.referidos_obtenidos)}
                                                    helperText={formik.touched.referidos_obtenidos && formik.errors.referidos_obtenidos}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="negocios_xcerrar"
                                                    name={[index, "negocios_xcerrar"]}
                                                    value={nivel.negocios_xcerrar}
                                                    onChange={handleChange}
                                                    defaultValue={nivel.negocios_xcerrar}
                                                    inputProps={{ min: 1 }}
                                                    error={formik.touched.negocios_xcerrar && Boolean(formik.errors.negocios_xcerrar)}
                                                    helperText={formik.touched.negocios_xcerrar && formik.errors.negocios_xcerrar}

                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="bono_semanal"
                                                    name={[index, "bono_semanal"]}
                                                    value={nivel.bono_semanal}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        min: 1,
                                                        step: "0.01"
                                                    }}
                                                    defaultValue={nivel.bono_semanal}
                                                    error={formik.touched.bono_semanal && Boolean(formik.errors.bono_semanal)}
                                                    helperText={formik.touched.bono_semanal && formik.errors.bono_semanal}
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
                        <Stack direction="row" justifyContent="flex-end" spacing={3}>
                            <Button variant="contained" type="button" onClick={() => {
                                const items = [...niveles];
                                items.push({
                                    no: niveles.length + 1,
                                    nivel: niveles.length + 1,
                                    contactos_telefonicos: 1,
                                    citas_nuevas_obtenidas: 1,
                                    citas_nuevas_concretadas: 1,
                                    citas_cierre_concretadas: 1,
                                    referidos_obtenidos: 1,
                                    negocios_xcerrar: 1,
                                    bono_semanal: 1
                                })
                                setNiveles(items)
                            }}>
                                Agregar
                            </Button>
                            <Button variant="contained" type="submit">
                                Guardar
                            </Button>
                        </Stack>
                    </Grid>
                </ListItem>
            </form>
        </>
    );
};

export default ConfBonificacionGestion;