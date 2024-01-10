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
import { useTablaComisionesJefe } from 'hooks/administrador/useTablaComisiones';

const today = dayjs();

const validationSchema = yup.object({
    monto_desde: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    monto_hasta: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    bono_comision: yup.number().min(1, 'La duracion debe ser mayor a 0'),
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
    {
        id: 'numero',
        align: 'left',
        disablePadding: false,
        label: 'No'
    },
    {
        id: 'nivel',
        align: 'left',
        disablePadding: true,
        label: 'Nivel'
    },
    {
        id: 'monto_desde',
        align: 'left',
        disablePadding: true,
        label: 'Monto Desde'
    },
    {
        id: 'monto_hasta',
        align: 'left',
        disablePadding: false,
        label: 'Monto hasta'
    },
    {
        id: 'Bono_comision',
        align: 'left',
        disablePadding: false,
        label: 'Bono por comisión'
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
const TablaComisionJefe = () => {

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const { tablaComisionesJ, createTablaComisionesJ } = useTablaComisionesJefe();
    const [niveles, setNiveles] = useState([
        {
            no: 1,
            nivel: 1,
            monto_desde: 1,
            monto_hasta: 1,
            bono_comision: 1
        },
    ]);

    useEffect(() => {
        if (tablaComisionesJ != null && tablaComisionesJ.length >= 0) {
            setNiveles([...tablaComisionesJ]);
            setIsUserDataLoaded(true);
        } else if (tablaComisionesJ != null && tablaComisionesJ.length === 0) {
            setIsUserDataLoaded(true);
        }
    }, [tablaComisionesJ]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: niveles,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createTablaComisionesJ(values);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Comision agregada con Exíto',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                formik.setValues(niveles);
                //formik.setErrors({});
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [index, key] = name.split(",");
        niveles[index][key] = value;
        setNiveles([...niveles]);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                <List sx={{ py: 0 }} dense>
                    <Box mt={2}>
                        <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                            <Table>
                                <OrderTableHead />
                                <TableBody>
                                    {niveles && (niveles.map((nivel, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">
                                                    <label> {nivel.nivel} </label>
                                                </TableCell>
                                                <TableCell align="left">  <label> {nivel.nivel} </label> </TableCell>
                                                <TableCell component="th" id={"tabla"} scope="row" align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="monto_desde"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                          }}
                                                        name={[index, "monto_desde"]}
                                                        value={nivel.monto_desde}
                                                        onChange={handleChange}
                                                        inputProps={{
                                                            min: 1, step: "0.01"
                                                        }}
                                                        error={formik.touched.monto_desde && Boolean(formik.errors.monto_desde)}
                                                        helperText={formik.touched.monto_desde && formik.errors.monto_desde}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">  <TextField
                                                    type="number"
                                                    fullWidth
                                                    id="monto_hasta"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                      }}
                                                    name={[index, "monto_hasta"]}
                                                    value={nivel.monto_hasta}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        min: 1, step: "0.01"
                                                    }}
                                                    defaultValue={nivel.monto_hasta}
                                                    error={formik.touched.monto_hasta && Boolean(formik.errors.monto_hasta)}
                                                    helperText={formik.touched.monto_hasta && formik.errors.monto_hasta}
                                                /></TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="bono_comision"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                          }}
                                                        name={[index, "bono_comision"]}
                                                        value={nivel.bono_comision}
                                                        onChange={handleChange}
                                                        inputProps={{

                                                            min: 1, step: "0.01"
                                                        }}
                                                        defaultValue={nivel.bono_comision}
                                                        error={formik.touched.bono_comision && Boolean(formik.errors.bono_comision)}
                                                        helperText={formik.touched.bono_comision && formik.errors.bono_comision}
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
                                        monto_desde: 1,
                                        monto_hasta: 1,
                                        bono_comision: 1
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
                </List>
            </form>

        </>
    );
};

export default TablaComisionJefe;