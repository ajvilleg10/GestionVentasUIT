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
import useLeyCompensacion from 'hooks/administrador/useLeyCompensacion';

const today = dayjs();

const validationSchema = yup.object({
    vendedores_activos: yup.number().min(1, 'La duracion debe ser mayor a 0'),
    produccion_nueva: yup.number().min(1, 'La duracion debe ser mayor a 0'),
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
        id: 'mes',
        align: 'left',
        disablePadding: true,
        label: 'Mes'
    },
    {
        id: 'vendedores_activos',
        align: 'left',
        disablePadding: true,
        label: 'Vendedores Activos'
    },
    {
        id: 'produccion_nueva',
        align: 'left',
        disablePadding: false,
        label: 'Produccion Nueva'
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
const TableCompensacion = ({ anio }) => {

    var { leyCompensacionBack, createCompensacion } = useLeyCompensacion(anio);
    const [meses, setNiveles] = useState([
        { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
        { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
        { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
        { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' }, { vendedores_activos: '1', produccion_nueva: '1.0' },
    ]);

    useEffect(() => {
        if (leyCompensacionBack != null && leyCompensacionBack.length === 12) {
            setNiveles([...leyCompensacionBack]);
        } else {
            meses.map((row, index) => { row['anio'] = anio;});
        }
    }, [leyCompensacionBack]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: meses,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createCompensacion(meses);
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
                formik.setValues(meses);
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
        meses[index][key] = value;
        setNiveles([...meses]);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                <List sx={{ py: 0 }} dense >
                    <Box mt={2} >
                        <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '50%' }}>
                            <Table>
                                <OrderTableHead />
                                <TableBody>
                                    {meses && (meses.map((nivel, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">
                                                    <label> {index + 1} </label>
                                                </TableCell>
                                                <TableCell align="left">  <label> {index + 1} </label> </TableCell>
                                                <TableCell component="th" id={"tabla"} scope="row" align="left">
                                                    <TextField
                                                        type="number"
                                                        fullWidth
                                                        id="vendedores_activos"
                                                        name={[index, "vendedores_activos"]}
                                                        value={nivel.vendedores_activos}
                                                        onChange={handleChange}
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                        error={formik.touched.vendedores_activos && Boolean(formik.errors.vendedores_activos)}
                                                        helperText={formik.touched.vendedores_activos && formik.errors.vendedores_activos}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        type="number"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                        }}
                                                        fullWidth
                                                        id="produccion_nueva"
                                                        name={[index, "produccion_nueva"]}
                                                        value={nivel.produccion_nueva}
                                                        onChange={handleChange}
                                                        inputProps={{
                                                            min: 1, step: "0.01"
                                                        }}
                                                        defaultValue={nivel.produccion_nueva}
                                                        error={formik.touched.produccion_nueva && Boolean(formik.errors.produccion_nueva)}
                                                        helperText={formik.touched.produccion_nueva && formik.errors.produccion_nueva}
                                                    /></TableCell>
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

        </>
    );
};

export default TableCompensacion;