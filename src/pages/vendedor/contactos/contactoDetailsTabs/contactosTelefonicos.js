import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { FormControl, Select, MenuItem, TextField, Stack, Grid } from '@mui/material';
import SiguienteAccionModal from '../SiguienteAccionModal';
import ReferidosModal from '../ReferidosModal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

function createData(id, no, fechaSistema, fechaRegistro, seguroMedico, interesado, siguienteAccion, referidos, comentarios) {
  return { id, no, fechaSistema, fechaRegistro, seguroMedico, interesado, siguienteAccion, referidos, comentarios };
}

const validationSchema = yup.object({
  contactos_telefonicos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_nuevas_obtenidas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_nuevas_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_cierre_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  referidos_obtenidos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  negocios_xcerrar: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  bono_semanal: yup.number().min(1, 'La duracion debe ser mayor a 0'),
});

const ContactosTelefonicos = () => {

  const [referido, setReferido] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  var today = new Date();

  const [gestionDatos, setGestionDatos] = useState([
    {
      fechaSistema: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
      fechaRegistro: '',
      seguroMedico: '',
      interesado: '',
      siguienteAccion: '',
      actividad: {},
      referidos: '',
      comentarios: '',
    },
  ])

  useEffect(() => {

  }, []);

  const siguientesAcciones = ['Cita agendada', 'Llamada agendada', 'Llamada pendiente'];
  const referidos = ['SI', 'NO'];

  const onSeguroMedicoChange = (event, id) => {
    gestionDatos[id].seguroMedico = event.target.value;
    if (event.target.value === '' || event.target.value === 'NO') {
      gestionDatos[id].interesado = '';
      gestionDatos[id].siguienteAccion = '';
    }
    setGestionDatos([...gestionDatos]);
    console.log(gestionDatos[id]);
  };

  const onInteresadoChange = (event, id) => {
    gestionDatos[id].interesado = event.target.value;
    if (event.target.value === '' || event.target.value === 'NO') {
      gestionDatos[id].siguienteAccion = '';
    }
    setGestionDatos([...gestionDatos]);
  };

  const onReferidoChange = (event, id) => {
    console.log(referido + id);
    setReferido(event.target.value);
    if (event.target.value === 'SI') {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  const handleSiguienteAccionAcceptance = (values, index) => {
    console.log('Actividad actualizada');
    gestionDatos[index].siguienteAccion = values['siguienteAccion'];
    gestionDatos[index].actividad = values['actividad'];
    setGestionDatos([...gestionDatos]);
    console.log(gestionDatos[index]);
  };

  const agregarFila = () => {

  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: gestionDatos,
    validationSchema,
    onSubmit: async (values) => {
      try {
        //await createBonVendedor(values);
        agregarFila();
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
        formik.setValues(agregarFila);
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

  const handleChange = (e) => { };

  return (
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">N</TableCell>
                <TableCell align="left">Fecha y hora Sistema</TableCell>
                <TableCell align="left">Fecha y hora Registro</TableCell>
                <TableCell align="left">Seguro Medico</TableCell>
                <TableCell align="left">Interesado</TableCell>
                <TableCell align="left">Siguiente Acción</TableCell>
                <TableCell align="left">Referidos</TableCell>
                <TableCell align="left">Comentarios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gestionDatos?.map((row, index) => {
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                    <TableCell align="left" size="small">
                      {index+1}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {row.fechaSistema}
                    </TableCell>
                    <TableCell align="left" size="small">
                      <Grid container spacing={1}>
                        <Grid item>
                          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="Escoja la Fecha y Hora"  />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="left" size="small">
                      <Select labelId='motivo_salida' name='motivo_salida' id="motivo_salida"
                        value={row.seguroMedico}
                        onChange={(event) => onSeguroMedicoChange(event, index)}>
                        <MenuItem key="SI" value="SI">SI</MenuItem>
                        <MenuItem key="NO" value="NO">NO</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <FormControl fullWidth>
                        <Select
                          id={`interesadoSelect${row.id}`}
                          value={row.interesado}
                          onChange={(event) => onInteresadoChange(event, index)}
                          disabled={!(gestionDatos[index].seguroMedico === 'SI')}
                        >
                          <MenuItem key="SI" value="SI">SI</MenuItem>
                          <MenuItem key="NO" value="NO">NO</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <SiguienteAccionModal
                        row={row}
                        handleAcceptance={handleSiguienteAccionAcceptance}
                        siguientesAcciones={siguientesAcciones}
                        disabled={!(gestionDatos[index].interesado === 'SI')}
                        index={index}
                      />
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <FormControl fullWidth>
                        <Select
                          id={`referidoSelect${row.id}`}
                          defaultValue={row.referidos}
                          onChange={(event) => onReferidoChange(event, row.id)}
                          disabled={gestionDatos[index].seguroMedico === ''}
                        >
                          {referidos.map((option) => (
                            <MenuItem value={option} key={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="left" size="auto">
                      <TextField
                        defaultValue={row.comentarios}
                        disabled={gestionDatos[index].seguroMedico === ''}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={2}>
          <Button variant="contained" onClick={(event) => {
            console.log(gestionDatos);
            gestionDatos.push({
              fechaSistema: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
              fechaRegistro: '05/10/2023',
              seguroMedico: '',
              interesado: '',
              siguienteAccion: '',
              referidos: '',
              comentarios: '',
            });
            setGestionDatos([...gestionDatos]);
          }}>Guardar</Button>
        </Stack>
      </form >
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Agregar Referido</DialogTitle>
        <DialogContent>
          <ReferidosModal />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactosTelefonicos;
