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
const extraHeaderStyles = {
    backgroundColor: '#938383',
    color: '#fff',
    textAlign: 'center',
    colSpan: 3
};
const extraHeaderLabel = 'LEY DE COMPENSACION';
const extraHeaderStyles2 = {
    backgroundColor: '#349176',
    color: '#fff',
    textAlign: 'center',
    colSpan: 3
};
const extraHeaderLabel2 = 'PRESUPUESTO';
const extraHeaderStyles3 = {
    backgroundColor: '#349176',
    color: '#fff',
    textAlign: 'center',
    colSpan: 2
};
const extraHeaderLabel3 = 'REAL';


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [


    {
        id: 'fecha',
        align: 'center',
        disablePadding: true,
        label: 'FECHA',

    },
    {
        id: 'nActivos',
        align: 'center',
        disablePadding: true,
        label: 'N° de Vendedores Activos',
        
    },
    {
        id: 'produccionNueva',
        align: 'center',
        disablePadding: true,
        label: 'PRODUCCION NUEVA',
        
    },
    {
        id: 'nActivos',
        align: 'center',
        disablePadding: true,
        label: 'N° de Vendedores Activos',
        
    },
    {
        id: 'produccionNueva',
        align: 'center',
        disablePadding: true,
        label: 'PRODUCCION NUEVA',
        
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




const Table2 = () => {

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
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        style={extraHeaderStyles}
                                    >
                                        {extraHeaderLabel}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        style={extraHeaderStyles2}
                                    >
                                        {extraHeaderLabel2}
                                    </TableCell>
                                    <TableCell
                                        colSpan={3}
                                        style={extraHeaderStyles3}
                                    >
                                        {extraHeaderLabel3}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <OrderTableHead />
                            <TableBody>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" id={"tabla"} scope="row" align="left" style={cellStyles}>
                                        <label>Abril 01/2019</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}><label>9</label> </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$30,000,000</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>10</label>
                                    </TableCell>
                                    <TableCell align="left" style={cellStyles}>
                                        <label>$34,000,000</label>
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

export default Table2;