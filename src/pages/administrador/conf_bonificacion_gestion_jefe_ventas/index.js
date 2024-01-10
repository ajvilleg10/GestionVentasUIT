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
    Stack
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
    numero_contactos: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    bono_semanal_cumplimiento: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    llamadas_no_verificadas: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    llamadas: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    emails: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
    whatsapp: yup.number().integer().min(0, 'La duracion debe ser mayor a 0'),
});

// eslint-disable-next-line no-unused-vars
const Conf_bonificacion_gestion_jefe_ventas = () => {

    //const { actualizarConfParametros } = useProspectosVendedores();

    const initialFormValues = {
        bono_semanal_cumplimiento: '',
        llamadas_no_verificadas: '',
        llamadas: '',
        emails: '',
        whatsapp: ''
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('select form submit - ', values);
            try {
                /*await actualizarConfParametros({
                  bono_semanal_cumplimiento: values.bono_semanal_cumplimiento,
                  llamadas_no_verificadas: values.llamadas_no_verificadas,
                  llamadas: values.llamadas,
                  emails: values.emails,
                  whatsapp: values.whatsapp,
                 });*/
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
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="bono_semanal_cumplimiento">Bono Semanal Cumplimiento</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="bono_semanal_cumplimiento"
                                            name="bono_semanal_cumplimiento"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="llamadas_no_verificadas">% Llamadas no verificadas</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="llamadas_no_verificadas"
                                            name="llamadas_no_verificadas"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="llamadas">Llamadas</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="llamadas"
                                            name="llamadas"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="emails">Emails</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="emails"
                                            name="emails"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>

                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                                        <InputLabel htmlFor="whatsapp">Whatsapp</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            id="whatsapp"
                                            name="whatsapp"
                                            value={formik.values.duracion}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                                            helperText={formik.touched.duracion && formik.errors.duracion}
                                        />
                                    </Grid>

                                </Grid>
                            </ListItem>
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

export default Conf_bonificacion_gestion_jefe_ventas