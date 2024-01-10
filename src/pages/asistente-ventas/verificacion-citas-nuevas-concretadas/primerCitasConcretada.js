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
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
// project import
import MainCard from 'components/MainCard';
import axios from 'utils/axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

// third-party
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useConfBonificacionGestionJefeVentas } from 'hooks/administrador/useConfBonificacionGestion';

const today = dayjs();

const validationSchema = yup.object({
    vendedor: yup.string(),
    contacto: yup.string(),
    celular: yup.string(),
    email: yup.string(),
    fecha_registro: yup.date().required('Fecha desde es requerida'),
    fecha_cita: yup.date().required('Fecha desde es requerida'),
    direccion_cita: yup.string(),
    concretada: yup.string(),
    convocadoJV: yup.string(),
    asistenciaJefeVentas: yup.string()
});
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const headCells = [
    {
        id: 'numero',
        align: 'left',
        disablePadding: false,
        label: 'N'
    },
    {
        id: 'fecha_sistema',
        align: 'left',
        disablePadding: true,
        label: 'Fecha del Sistema'
    },
    {
        id: 'fecha_registro',
        align: 'left',
        disablePadding: true,
        label: 'Fecha de registro'
    },

    {
        id: 'vendedor',
        align: 'left',
        disablePadding: true,
        label: 'Vendedor'
    },
    {
        id: 'Contacto',
        align: 'left',
        disablePadding: false,
        label: 'Contacto'
    },
    {
        id: 'EstadoVerificacion',
        align: 'left',
        disablePadding: false,
        label: 'Estado de Verificacion'
    },
    {
        id: 'tipo_cita',
        align: 'left',
        disablePadding: false,
        label: 'Tipo Cita'
    },
    {
        id: 'fecha-cita',
        align: 'left',
        disablePadding: false,
        label: 'Explico el servicio'
    },
    {
        id: 'direccionCita',
        align: 'left',
        disablePadding: false,
        label: 'Direccion de la cita'
    },
    {
        id: 'concretada',
        align: 'left',
        disablePadding: false,
        label: 'Concretada'
    },
    {
        id: 'Fecha_verificado',
        align: 'left',
        disablePadding: false,
        label: 'Fecha verificado'
    },
    {
        id: 'convocadoJV',
        align: 'left',
        disablePadding: false,
        label: 'Convocado a JV'
    },
    {
        id: 'asistenciaJefeVentas',
        align: 'left',
        disablePadding: false,
        label: 'Asistencia Jefe de Vnetas'
    },
    {
        id: 'contactoGenerado',
        align: 'left',
        disablePadding: false,
        label: 'Contacto Generado'
    },
    {
        id: 'ModoVerificacion',
        align: 'left',
        disablePadding: false,
        label: 'Modo de verificación'
    },
    {
        id: 'confirmacionVendedor',
        align: 'left',
        disablePadding: false,
        label: 'Confirmacion de Asistencia de Vendedor'
    },
    {
        id: 'Confirmacion Asistente Jefe de Ventas',
        align: 'left',
        disablePadding: false,
        label: 'Confirmacion de Asistencia a Jefe de Ventas'
    },
    {
        id: 'Valoracion_Vendedor',
        align: 'left',
        disablePadding: false,
        label: 'Valoración del vendedor'
    },
    {
        id: 'explico_servicio',
        align: 'left',
        disablePadding: false,
        label: 'Explico el servicio'
    },
    {
        id: 'Valoracion_servicio',
        align: 'left',
        disablePadding: false,
        label: 'Valoracion del servicio'
    },
    {
        id: 'verificadoAV',
        align: 'left',
        disablePadding: false,
        label: 'Verificado por AV'
    },
    {
        id: 'Fecha_verificado',
        align: 'left',
        disablePadding: false,
        label: 'Fecha verificado'
    },
    {
        id: 'comentarios',
        align: 'left',
        disablePadding: false,
        label: 'Comentarios'
    },
    {
        id: 'conclusion',
        align: 'left',
        disablePadding: false,
        label: 'Conclusión'
    },
    {
        id: 'verificacion_exitosa',
        align: 'left',
        disablePadding: false,
        label: 'verificacion_exitosa'
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
const PrimeraCitaConcretada = () => {

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const { bonJV, createBonJV } = useConfBonificacionGestionJefeVentas();

    //const { actualizarConfParametros } = useProspectosVendedores();
    const navigate = useNavigate();

    const [bonificacionJV, setBonificacionJV] = useState({
        fechaCita: '',
        Vendedor: '',
        contacto: '',
        estadoVerificacion: '',

    });
    const handleRowClick = () => {
       navigate('./segundaCitaConcretada');
      };

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
                                        <InputLabel htmlFor="fechaCita">Fecha Cita</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                            <DatePicker format="DD/MM/YYYY" fullWidth />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="vendedor">Vendedor</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                    <TextField
                                            fullWidth
                                            id="vendedor"
                                            name="vendedor"
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="contacto">Contacto</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField
                                            fullWidth
                                            id="contacto"
                                            name="contacto"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={1} display="flex" alignItems="center">
                                    </Grid>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="estadoVerificacion">Estado de Verificacion</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                    <Select >
                                            <MenuItem key={0} value={0}>Pendiente</MenuItem>
                                            <MenuItem key={2} value={1}>Finalizado</MenuItem>
                                        </Select>
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
                                                onClick={handleRowClick}
                                            >
                                                <TableCell align="left">
                                                <label> 1 </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> 8/10/2023 </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> 8/10/2023 </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Jerson Romero </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Jerson</label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Finalizado </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Nueva </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Si </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Av Fco Orellana </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Si </label>

                                                </TableCell>
                                                <TableCell align="left">
                                                <label> 9/10/2023</label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Si </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Si </label>
                                                </TableCell>
                                                <TableCell align="left">
                                                <label> Si </label>
                                                </TableCell>
                                                <TableCell align="left">

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

export default PrimeraCitaConcretada;