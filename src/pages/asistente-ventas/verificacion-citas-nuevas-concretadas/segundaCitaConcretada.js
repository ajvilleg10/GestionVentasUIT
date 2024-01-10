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
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import useVerificacionCitas from 'hooks/asistente-ventas/useVerificacionCitas';
import { FormattedMessage } from 'react-intl';

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
        id: 'contacto_generado',
        align: 'left',
        disablePadding: true,
        label: 'Contacto Generado'
    },
    {
        id: 'modo_verificacion',
        align: 'left',
        disablePadding: true,
        label: 'Modo de Verificacion'
    },
    {
        id: 'Confirmacion de asistencia Vendedor',
        align: 'left',
        disablePadding: false,
        label: 'Confirmación de asistencia Vendedor'
    },
    {
        id: 'Confirmacion Asistente Jefe de Ventas',
        align: 'left',
        disablePadding: false,
        label: 'Confirmacion de Asistencia Jefe de Ventas'
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
        label: 'Asistente Ventas que Verifica'
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
        label: 'Verificacion exitosa'
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
const SegundaCitaConcretada = ({ route, navigation }) => {

    var today = new Date();

    const currentUser = useSelector((state) => state.user);
    const cita = useLocation()?.state?.cita;
    var enviar = true;

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    const { verificacionesBack, modosVerificacionesBack, asistenteBack, createVerificacion } = useVerificacionCitas(cita.id);


    const getDate = (date) => {
        var formatDate = dayjs(date).format("DD/MM/YYYY HH:mm");
        return formatDate.toString();
    }

    const [verificacion, setVerificacion] = useState({
        contacto_generado: false,
        modo_verificacion: -1,
        confirmacion_vendedor: null,
        confirmacion_jv: (cita.convocado_jv ? null : false),
        valoracion_v: null,
        explic_serv: null,
        valoracion_s: null,
        verificado_a: currentUser.id,
        fecha_v: today,
        comentarios: '',
        conclusion: '',
        verificacion_exitosa: false,
        cita: cita.id
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: verificacion,
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                //await createBonJV(values);
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
                formik.setValues(verificacion);
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

    const onChange = (e) => {
        const { name, value } = e.target;
        verificacion[name] = value;
        console.log(currentUser)
        verificacion.verificacion_exitosa = (verificacion.contacto_generado && verificacion.modo_verificacion !== -1 ? true : false)
        setVerificacion({ ...verificacion });
    };

    const validarDatos = () => {
        if (verificacion.modo_verificacion === -1 || (verificacion.verificacion_exitosa && (verificacion.confirmacion_vendedor == null || verificacion.confirmacion_jv == null)) ||
            (verificacion.verificacion_exitosa && verificacion.confirmacion_vendedor && verificacion.valoracion_v === null) ||
            (verificacion.verificacion_exitosa && (verificacion.confirmacion_vendedor || verificacion.confirmacion_jv) && verificacion.explic_serv === null) ||
            (verificacion.verificacion_exitosa && (verificacion.confirmacion_vendedor || verificacion.confirmacion_jv) && verificacion.explic_serv && verificacion.valoracion_s === null)
        )
            throw new Error("Llene todos los campos");

    }

    const crearValidacion = async (e) => {
        e.preventDefault();
        if (enviar) {
            enviar = false;
            try {
                validarDatos();
                await createVerificacion(verificacion);
                if (verificacion.verificacion_exitosa) cita["revisado"] = true;
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Verificacion creada con Exito',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
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
            }
            enviar = true;
        }
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={crearValidacion}>
                        <List sx={{ py: 0 }} dense>
                            <Grid name="Header">
                                <ListItem>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                                            <InputLabel htmlFor="vendedor">Vendedor</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <TextField
                                                fullWidth
                                                id="vendeor"
                                                name="vendedor"
                                                value={cita?.vendedor.nombres + " " + cita.vendedor.apellidos}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} display="flex" alignItems="center">
                                        </Grid>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                                            <InputLabel htmlFor="FechaCita">Fecha Cita</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    fullWidth
                                                    value={dayjs(cita?.fecha_cita)}
                                                    disabled={true}
                                                />
                                            </LocalizationProvider>
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
                                                value={cita?.contacto.nombres + " " + cita.contacto.apellidos}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} display="flex" alignItems="center">
                                        </Grid>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                                            <InputLabel htmlFor="direccionCita">Direccion de la Cita</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <TextField
                                                fullWidth
                                                id="direccionCita"
                                                name="direccionCita"
                                                value={cita?.direccion}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                                            <InputLabel htmlFor="celular">Celular </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                id="Celular"
                                                name="Celular"
                                                value={cita?.contacto?.numero_celular}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} display="flex" alignItems="center">
                                        </Grid>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center" >
                                            <InputLabel htmlFor="Concretada">Concretada</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Select
                                                defaultValue={(cita.concretada ? 0 : 1)}
                                                disabled={true}>
                                                <MenuItem key={0} value={0}>SI</MenuItem>
                                                <MenuItem key={1} value={1}>NO</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                                            <InputLabel htmlFor="email">Email </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <TextField
                                                fullWidth
                                                id="Email"
                                                name="Email"
                                                value={cita?.contacto?.correo}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} display="flex" alignItems="center">
                                        </Grid>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center" >
                                            <InputLabel htmlFor="convocadoJV">convocado a JV</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Select
                                                defaultValue={(cita.convocado_jv ? 0 : 1)}
                                                disabled={true}>
                                                <MenuItem key={0} value={0}>SI</MenuItem>
                                                <MenuItem key={2} value={1}>NO</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center">
                                            <InputLabel htmlFor="fechaRegistro">Fecha de Registro </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    fullWidth
                                                    value={dayjs(cita?.fecha_registro)}
                                                    disabled={true}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} md={1} display="flex" alignItems="center">
                                        </Grid>
                                        <Grid item xs={12} md={2} display="flex" alignItems="center" >
                                            <InputLabel htmlFor="asistenciaJefeVentas">Asistencia de Jefe de Ventas</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Select
                                                defaultValue={(cita.asistencia_jv ? 0 : 1)}
                                                disabled={true}>
                                                <MenuItem key={0} value={0}>SI</MenuItem>
                                                <MenuItem key={2} value={1}>NO</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Grid>
                            <Box name="Table" mt={2}>
                                <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
                                    <Table>
                                        <OrderTableHead />
                                        <TableBody>
                                            {(cita["revisado"] ? null : <TableRow
                                                name="Create"
                                                hover
                                                role="checkbox"
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name="contacto_generado" defaultValue={false} onChange={onChange}>
                                                        <MenuItem key={0} value={true}>SI</MenuItem>
                                                        <MenuItem key={1} value={false}>NO</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name="modo_verificacion" onChange={onChange}>
                                                        {modosVerificacionesBack.map((modo, index) => {
                                                            return (<MenuItem key={modo.id} value={modo.id}>{modo.tipo_verificacion}</MenuItem>);
                                                        })}
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name={"confirmacion_vendedor"} defaultValue={1} disabled={!verificacion.contacto_generado || verificacion.modo_verificacion === -1} onChange={onChange}>
                                                        <MenuItem key={0} value={true}>SI</MenuItem>
                                                        <MenuItem key={1} value={false}>NO</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name={"confirmacion_jv"} defaultValue={(cita.convocado_jv ? null : false)} disabled={!verificacion.contacto_generado || verificacion.modo_verificacion === -1} onChange={onChange}>
                                                        <MenuItem key={0} value={true}>SI</MenuItem>
                                                        <MenuItem key={1} value={false}>NO</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name={"valoracion_v"} disabled={!verificacion.contacto_generado || verificacion.modo_verificacion === -1
                                                        || (!verificacion.confirmacion_vendedor)} onChange={onChange}>
                                                        <MenuItem key={1} value={1}>{1}</MenuItem>
                                                        <MenuItem key={2} value={2}>{2}</MenuItem>
                                                        <MenuItem key={3} value={3}>{3}</MenuItem>
                                                        <MenuItem key={4} value={4}>{4}</MenuItem>
                                                        <MenuItem key={5} value={5}>{5}</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name={"explic_serv"} disabled={!verificacion.contacto_generado || verificacion.modo_verificacion === -1
                                                        || (!verificacion.confirmacion_vendedor && !verificacion.confirmacion_jv)} onChange={onChange}>
                                                        <MenuItem key={0} value={true}>SI</MenuItem>
                                                        <MenuItem key={1} value={false}>NO</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select name={"valoracion_s"} disabled={!verificacion.contacto_generado || verificacion.modo_verificacion === -1
                                                        || (!verificacion.confirmacion_vendedor && !verificacion.confirmacion_jv)} onChange={onChange}>
                                                        <MenuItem key={1} value={1}>{1}</MenuItem>
                                                        <MenuItem key={2} value={2}>{2}</MenuItem>
                                                        <MenuItem key={3} value={3}>{3}</MenuItem>
                                                        <MenuItem key={4} value={4}>{4}</MenuItem>
                                                        <MenuItem key={5} value={5}>{5}</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {asistenteBack?.nombres + " " + asistenteBack?.apellidos}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {getDate(today)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        fullWidth
                                                        id="comentarios"
                                                        name="comentarios"
                                                        onChange={onChange}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        fullWidth
                                                        id="conclusion"
                                                        name="conclusion"
                                                        disabled={!verificacion.contacto_generado || !verificacion.confirmacion_vendedor} onChange={onChange}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Select value={(verificacion.verificacion_exitosa ? 0 : 1)} defaultValue={(verificacion.verificacion_exitosa ? 0 : 1)} disabled={true}>
                                                        <MenuItem key={0} value={0}>SI</MenuItem>
                                                        <MenuItem key={1} value={1}>NO</MenuItem>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>)}
                                            {verificacionesBack.map((verificacion, index) => {
                                                return <TableRow
                                                    name="Create"
                                                    hover
                                                    role="checkbox"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="index" defaultMessage="{value}" values={{ value: index + 1, }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="contacto_generadoFM" defaultMessage="{value}" values={{ value: (verificacion.contacto_generado ? "SI" : "NO") }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="modo_verificacionFM" defaultMessage="{value}" values={{ value: verificacion.ModoVerificacion.tipo_verificacion }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="confirmacion_asistenciaFM" defaultMessage="{value}" values={{ value: (verificacion.confirmacion_vendedor != null ? (verificacion.confirmacion_vendedor ? "SI" : "NO") : null) }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="confirmacion_asistenciaJVFM" defaultMessage="{value}" values={{ value: (verificacion.confirmacion_jv != null ? (verificacion.confirmacion_jv ? "SI" : "NO") : null) }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="valoracion_vFM" defaultMessage="{value}" values={{ value: verificacion.valoracion_v }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="explic_servFM" defaultMessage="{value}" values={{ value: (verificacion.explic_serv != null ? (verificacion.explic_serv ? "SI" : "NO") : null) }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="valoracion_sFM" defaultMessage="{value}" values={{ value: verificacion.valoracion_s }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="valoracion_sFM" defaultMessage="{value}" values={{ value: verificacion.Empleado.nombres + " " + verificacion.Empleado.apellidos }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="fecha_vFM" defaultMessage="{value}" values={{ value: getDate(verificacion.fecha_v) }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="comentariosFM" defaultMessage="{value}" values={{ value: verificacion.comentarios }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="conclusionFM" defaultMessage="{value}" values={{ value: verificacion.conclusion }} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormattedMessage id="verificacion_exitosaFM" defaultMessage="{value}" values={{ value: (verificacion.verificacion_exitosa ? "SI" : "NO") }} />
                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            {(cita["revisado"] ? null : <Grid name="SaveButton">
                                <ListItem>
                                    <Grid item xs={12}>
                                        <Stack direction="row" justifyContent="flex-end">
                                            <Button variant="contained" type="submit">
                                                Guardar
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </ListItem>
                            </Grid>)}
                        </List>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default SegundaCitaConcretada;