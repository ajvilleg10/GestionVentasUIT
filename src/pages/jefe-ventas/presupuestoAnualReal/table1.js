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


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [


    {
        id: 'fecha',
        align: 'center',
        disablePadding: true,
        label: 'Fecha',
        colSpan: 3
    },
    {
        id: 'vendedoresActivos',
        align: 'center',
        disablePadding: true,
        label: 'N° Vendedores Activos Presupuesto'
    },
    {
        id: 'produccionNueva',
        align: 'center',
        disablePadding: false,
        label: 'Produccion Nueva Presupuesto',

    },
    {
        id: 'vendedoresReales',
        align: 'center',
        disablePadding: false,
        label: 'N° Vendedores Reales',

    },
    {
        id: 'produccionNuevaReal',
        align: 'center',
        disablePadding: false,
        label: 'Produccion Nueva real',

    },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
    const tableHeadStyles = {
        backgroundColor: '#938383', // Cambia el color de fondo del encabezado de la tabla
    };

    const cellStyles = {
        color: '#fff', // Cambia el color del texto en las celdas del encabezado
    };
    return (
        <TableHead style={tableHeadStyles}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        style={cellStyles}
                        colSpan={headCell.colSpan || 1}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}




const Table1 = () => {

    const tableStyles = {
        width: '100%',
        backgroundColor: '#FFFFFF', // Cambia el color de fondo de la tabla
        border: '1px solid #0A0A0A', // Cambia el color del borde
    };

    const cellStyles = {
        padding: '10px',
        border: '2px solid #000000',
        background: '#FFFFFF', // Cambia el color de fondo de las celdas
        color: '#333', // Cambia el color del texto en las celdas
    };
    const cellStyleslc = {
        padding: '10px',
        border: '2px solid #000000',
        background: '#349176', 
        color: '#FFFFFF', 
    };

    return (
        <>
            <form >
                <Box mt={2}>
                    <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={tableStyles}>
                        <Table>
                           
                            <OrderTableHead />
                            <TableBody>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" id={"tabla"} scope="row" align="left" style={cellStyles}>
                                        <label>1</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}><label>13/10/2023</label> </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>13/10/2023</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>3</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$4000000</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>7</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$2000000</label>
                                    </TableCell>
                                </TableRow>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" id={"tabla"} scope="row" align="left" style={cellStyles}>
                                        <label>2</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}><label>13/10/2023</label> </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>13/10/2023</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>3</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$4000000</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>7</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$2000000</label>
                                    </TableCell>
                                </TableRow>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" id={"tabla"} scope="row" align="left" style={cellStyles}>
                                        <label>3</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}><label>13/10/2023</label> </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>13/10/2023</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>3</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$4000000</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>7</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$2000000</label>
                                    </TableCell>
                                   
                                </TableRow>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" id={"tabla"} scope="row" align="left" style={cellStyles}>
                                        <label>4</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}><label>13/10/2023</label> </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>13/10/2023</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>3</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$4000000</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>7</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$2000000</label>
                                    </TableCell>
                                </TableRow>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" id={"tabla"} scope="row" align="left" style={cellStyles}>
                                        <label>5</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}><label>13/10/2023</label> </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>13/10/2023</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>3</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$4000000</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>7</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$2000000</label>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </form>
        </>
    );
};

export default Table1;