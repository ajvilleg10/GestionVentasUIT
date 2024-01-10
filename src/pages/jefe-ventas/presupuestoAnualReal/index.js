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
import Table1 from './table1'
import Table2 from './table2'

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import dayjs from 'dayjs';

const extraHeaderStyles = {
    backgroundColor: '#349176',
    color: '#fff',
    textAlign: 'center'
};

const extraHeaderLabel = 'PRESUPUESTO DE VENTAS NUEVAS Y RECLUTAMIENTO ANUAL';


const PresupuestoAnualReal = () => {

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
                                        colSpan={3}
                                        style={extraHeaderStyles}
                                    >
                                        {extraHeaderLabel}
                                    </TableCell>
                                </TableRow>

                            </TableHead>
                            
                            <TableBody>
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell  style={cellStyles}>
                                    <Table1/>
                                    </TableCell>
                                    <TableCell  style={cellStyles}>  <Table2/> </TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </form>
        </>
    );
};

export default PresupuestoAnualReal;