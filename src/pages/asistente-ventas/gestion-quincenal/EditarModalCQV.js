/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  Grid,
  ListItem,
  List,
  InputLabel,
  FormControl,
  TextField
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker, TimeField } from '@mui/x-date-pickers-pro';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Close from '@mui/icons-material/Close';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import * as yup from 'yup';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useFormik } from 'formik';

dayjs.extend(duration);

const validationSchema = yup.object({
  hora_inicio: yup.date().required('La hora de inicio es requerida'),
  hora_final: yup.date().required('La hora de finalización es requerida'),
  duracion: yup.object()
});

const EditarModalCQV = ({ handleEditarCapacitacion, capacitacion }) => {

  const [open, setOpen] = useState(false);

  const inicio = dayjs(capacitacion.fecha_inicio, 'YYYY-MM-DD HH:mm');
  const fin = dayjs(capacitacion.fecha_final, 'YYYY-MM-DD HH:mm');

  const initialValues = {
    hora_inicio: inicio,
    hora_final: fin,
    duracion: {
      formato: dayjs.duration(capacitacion.duracion, 'minute').format('HH:mm'),
      tiempo: capacitacion.duracion  // Esto se envia al backend
    },
    fecha_reunion: dayjs(capacitacion.fecha_reunion),
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      try {

        if (values.duracion.tiempo === 0 || values.duracion.tiempo < 120) throw new Error('La duración debe ser de 2 horas mínimo');
        if (values.fecha_reunion.day() == 6 || values.fecha_reunion.day() == 0) throw new Error('La reunión debe ser en dia laboral');

        const fechaCompletaInicio = dayjs(values.fecha_reunion).set('hour', values.hora_inicio.hour()).set('minute', values.hora_inicio.minute());
        const fechaCompletaFinal = dayjs(values.fecha_reunion).set('hour', values.hora_final.hour()).set('minute', values.hora_final.minute());

        const updateCQV = {
          duracion: values.duracion.tiempo,
          fecha_inicio: fechaCompletaInicio.format('YYYY-MM-DD HH:mm').toString(),
          fecha_final: fechaCompletaFinal.format('YYYY-MM-DD HH:mm').toString(),
        };

        await handleEditarCapacitacion(capacitacion.id, updateCQV);

        dispatch(
          openSnackbar({
            open: true,
            message: 'Capacitación actualizada con éxito',
            variant: 'alert',
            alert: { color: 'success' },
            close: false
          })
        );

      } catch (error) {

        console.error('submit editar', error);

        dispatch(
          openSnackbar({
            open: true,
            message: error.message,
            variant: 'alert',
            alert: { color: 'error' },
            close: false
          })
        );
      } finally {

        formik.resetForm();
        setOpen(false);

      }

    }
  })

  const handleCloseDelete = () => {
    setOpen(false);
  }

  return (
    <>
      <Button variant="outlined" startIcon={<ModeEditIcon />} onClick={() => setOpen(true)}>
        Editar
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <form onSubmit={formik.handleSubmit}>
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={handleCloseDelete}>
              <Close />
            </IconButton>
          </Box>
          <DialogTitle id="alert-dialog-title">
            Editar capacitación quincenal
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <List sx={{ py: 0 }} dense>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="jefe_venta_id">Jefe de ventas</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth> 
                          <TextField
                            value={capacitacion.participantes[0].empleado.nombres + ' ' + capacitacion.participantes[0].empleado.apellidos}
                            disabled
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="hora_inicio">Hora de inicio</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <TimeField
                            format="HH:mm"
                            value={formik.values.hora_inicio}
                            onChange={(date) => {

                              const now = dayjs();
                              const selectedDate = dayjs(formik.values.fecha_reunion).hour(date.get('hour')).minute(date.get('minute'))
                              const hour = date.hour();

                              const isBeforeNow = selectedDate.isBefore(now);
                              const isInRange = hour >= 8 && hour <= 18;

                              const durationC = dayjs(formik.values.hora_final).diff(date, 'minutes');  
                              const format = dayjs.duration(durationC, 'minute').format('HH:mm');

                              if (!isBeforeNow && isInRange) {

                                formik.setFieldValue('duracion.formato', format);
                                formik.setFieldValue('duracion.tiempo', durationC);

                              } else {

                                formik.setFieldValue('duracion.formato', '00:00');
                                formik.setFieldValue('duracion.tiempo', 0);

                              }

                              formik.setFieldValue('hora_inicio', date);

                            }}
                            slotProps={{
                              textField: {
                                id: "hora_inicio",
                                name: "hora_inicio"
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="hora_final">Hora final</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <TimeField
                            format="HH:mm"
                            value={formik.values.hora_final}
                            onChange={(date) => {

                              const now = dayjs();
                              const selectedDate = dayjs(formik.values.fecha_reunion).hour(date.get('hour')).minute(date.get('minute'))
                              const hour = date.hour();

                              const isBeforeNow = selectedDate.isBefore(now);
                              const isInRange = hour >= 8 && hour <= 18;

                              const durationC = date.diff(dayjs(formik.values.hora_inicio), 'minutes');  
                              const format = dayjs.duration(durationC, 'minute').format('HH:mm');

                              if (!isBeforeNow && isInRange) {

                                formik.setFieldValue('duracion.formato', format);
                                formik.setFieldValue('duracion.tiempo', durationC);

                              } else {

                                formik.setFieldValue('duracion.formato', '00:00');
                                formik.setFieldValue('duracion.tiempo', 0);

                              }

                              formik.setFieldValue('hora_final', date);

                            }}
                            slotProps={{
                              textField: {
                                id: "hora_final",
                                name: "hora_final",
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="duracion">Duración</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth> 
                          <TextField
                            value={formik.values.duracion.formato}
                            disabled
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3} display="flex" alignItems="center">
                        <InputLabel htmlFor="fecha_reunion">Fecha de reunión</InputLabel>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <DatePicker
                            format="DD/MM/YYYY"
                            id="fecha_reunion"
                            name="fecha_reunion"
                            type="date"
                            value={formik.values.fecha_reunion}
                            minDate={dayjs()}
                            onChange={(date) => formik.setFieldValue('fecha_reunion', date)}
                            slotProps={{
                              textField: {
                                variant: 'outlined'
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" color="primary" onClick={() => {
              formik.resetForm();
              handleCloseDelete();
            }}> Cancelar </Button>
            <Button 
              color='error' 
              variant='contained' 
              type="submit"
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EditarModalCQV;

                        // {/* <FormControl fullWidth> */}
                        // {/*   <Select */}
                        // {/*     id="jefe_venta_id" */}
                        // {/*     name="jefe_venta_id" */}
                        // {/*     value={''} */}
                        // {/*     onChange={(e) => console.log(e)} */}
                        // {/*   > */}
                        // {/*     {jefesDeVentas.length === 0 && ( */}
                        // {/*       <MenuItem disabled> */}
                        // {/*         No existen jefes de venta */}
                        // {/*       </MenuItem> */}
                        // {/*     )} */}
                        // {/*     {jefesDeVentas?.map((jefe) => ( */}
                        // {/*       <MenuItem value={jefe.id} key={jefe.id}> */}
                        // {/*         {jefe.Empleado.nombres + ' ' + jefe.Empleado.apellidos} */}
                        // {/*       </MenuItem> */}
                        // {/*     ))} */}
                        // {/*   </Select> */}
                        // {/* </FormControl> */}
