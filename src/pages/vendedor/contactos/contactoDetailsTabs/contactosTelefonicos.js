import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl, Select, MenuItem, TextField, Stack, Grid } from '@mui/material';
import SiguienteAccionModal from '../SiguienteAccionModal';
import ReferidosModal from '../ReferidosModal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import { useGestionContactos } from 'hooks/vendedor/useGestionContactos';
import { useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/Delete';
import RpsDeleteModalGestion from '../RpsDeleteModalGestion';

const validationSchema = yup.object({
  contactos_telefonicos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_nuevas_obtenidas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_nuevas_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  citas_cierre_concretadas: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  referidos_obtenidos: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  negocios_xcerrar: yup.number().integer().min(1, 'La duracion debe ser mayor a 0'),
  bono_semanal: yup.number().min(1, 'La duracion debe ser mayor a 0'),
});

var today = new Date();

const tipoCitas = ["Nueva Obtenida", "Seguimiento", "Referido", "Casual", "Servicio"];

const ContactosTelefonicos = ({ idContacto }) => {

  const todayjs = dayjs();

  const currentUser = useSelector((state) => state.user);
  const contacto = useSelector((state) => state.contactoSeleccionado);
  const { gestionContactosBack, createGestionContactosBack, deleteGestionContactosBack } = useGestionContactos();
  const [gestionDatosBack, setGestionDatosBack] = useState([]);
  const [gestionDatos, setGestionDatos] = useState(
    {
      fechaSistema: today.toUTCString(),
      fechaRegistro: '',
      seguroMedico: '',
      interesado: '',
      siguienteAccion: '',
      actividad: {},
      referidos: '',
      comentarios: '',
      vendedor: currentUser.id,
      contacto: contacto.id,
    },
  )

  useEffect(() => {
    if (gestionContactosBack != null) {
      setGestionDatosBack([...gestionContactosBack]);
    }

  }, [gestionContactosBack]);

  useEffect(() => {
    console.log(gestionDatos);

  }, [gestionDatos]);

  const getDate = (date) => {
    var formatDate = dayjs(date).format("DD/MM/YYYY HH:mm");
    return formatDate.toString();
  }

  const siguientesAcciones = ['Cita agendada', 'Llamada agendada', 'Llamada pendiente'];

  const onSeguroMedicoChange = (event) => {
    gestionDatos.seguroMedico = event.target.value;
    if (event.target.value === '' || event.target.value === 'NO') {
      gestionDatos.interesado = '';
      gestionDatos.siguienteAccion = '';
    }
    setGestionDatos({ ...gestionDatos });
  };

  const onInteresadoChange = (event) => {
    gestionDatos.interesado = event.target.value;
    if (event.target.value === '' || event.target.value === 'NO') {
      gestionDatos.siguienteAccion = '';
    }
    setGestionDatos({ ...gestionDatos });
  };

  const handleSiguienteAccionAcceptance = (values) => {
    gestionDatos.siguienteAccion = values['siguienteAccion'];
    gestionDatos.actividad = values['actividad'];
    setGestionDatos({ ...gestionDatos });
  };

  const handleReferidosModal = (values) => {
    gestionDatos.lista_referidos = values['referidos'];
    gestionDatos.referidos = values['referido'];
    setGestionDatos({ ...gestionDatos });
  };

  const handleHour = (event) => {
    gestionDatos.fechaRegistro = event.toDate();
    setGestionDatos({ ...gestionDatos });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: gestionDatos,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createGestionContactosBack(gestionDatos);
        dispatch(
          openSnackbar({
            open: true,
            message: 'Gestion creada con Exíto',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        formik.setValues(values);
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

  const calculateMinDate = (fecha) => {
    if (today.getDay() === 1)
      return fecha.subtract(today.getHours(), 'hours').subtract(today.getMinutes(), 'minutes').subtract(today.getSeconds(), 'seconds');
    if (today.getDay() === 2)
      return fecha.subtract(today.getHours() + 24, 'hours').subtract(today.getMinutes(), 'minutes').subtract(today.getSeconds(), 'seconds');
    return fecha.subtract(48, 'hours');
  };

  const handleDelete = async (index) => {
    try {
      await deleteGestionContactosBack({ "id": gestionDatosBack[index]["id"] });
      dispatch(
        openSnackbar({
          open: true,
          message: 'Gestion Borrada Exitosamente',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error) {
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
  };

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
                <TableCell align="left">Seguro Medico<br />Internacional</TableCell>
                <TableCell align="left">Interesado</TableCell>
                <TableCell align="left">Siguiente Acción</TableCell>
                <TableCell align="left">Referidos</TableCell>
                <TableCell align="left">Comentarios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={gestionDatos.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                <TableCell align="left" size="small">
                  { }
                </TableCell>
                <TableCell align="left" size="auto">
                  {today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes()}
                </TableCell>
                <TableCell align="left" size="small">
                  <Grid container spacing={1}>
                    <Grid item>
                      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Escoja la Fecha y Hora" onChange={handleHour} minDate={calculateMinDate(todayjs)} maxDate={todayjs}
                          format="DD/MM/YYYY HH:mm" />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="left" size="small">
                  <Select labelId='motivo_salida' name='motivo_salida' id="motivo_salida"
                    value={gestionDatos.seguroMedico}
                    onChange={(event) => onSeguroMedicoChange(event)}>
                    <MenuItem key="SI" value="SI">SI</MenuItem>
                    <MenuItem key="NO" value="NO">NO</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="left" size="auto">
                  <FormControl fullWidth>
                    <Select
                      id={`interesadoSelect${gestionDatos.id}`}
                      value={gestionDatos.interesado}
                      onChange={(event) => onInteresadoChange(event)}
                      disabled={!(gestionDatos.seguroMedico === 'SI')}
                    >
                      <MenuItem key="SI" value="SI">SI</MenuItem>
                      <MenuItem key="NO" value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="left" size="auto">
                  <SiguienteAccionModal
                    row={gestionDatos}
                    handleAcceptance={handleSiguienteAccionAcceptance}
                    siguientesAcciones={siguientesAcciones}
                    disabled={!(gestionDatos.interesado === 'SI')}
                    tipoCitas={tipoCitas}
                  />
                </TableCell>
                <TableCell align="left" size="auto">
                  <ReferidosModal
                    row={gestionDatos}
                    handleAcceptance={handleReferidosModal}
                    disabled={gestionDatos.seguroMedico === ''} />
                </TableCell>
                <TableCell align="left" size="auto">
                  <TextField
                    defaultValue={gestionDatos.comentarios}
                    disabled={gestionDatos.seguroMedico === ''}
                  />
                </TableCell>
              </TableRow>
              {gestionDatosBack?.map((row, index) => {
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                    <TableCell align="left" size="small">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" size="auto">
                      {getDate(row.fecha_sistema)}
                    </TableCell>
                    <TableCell align="left" size="small">
                      {getDate(row.fecha_registro)}
                    </TableCell>
                    <TableCell align="left" size="small">
                      {row.seguro_medico ? "SI" : "NO"}
                    </TableCell>
                    <TableCell align="left" size="small">
                      {row.interesado ? "SI" : "NO"}
                    </TableCell>
                    <TableCell align="left" size="small">
                      {row.siguiente_accion}
                    </TableCell>
                    <TableCell align="left" size="small">
                      {row.referidos ? "SI" : "NO"}
                    </TableCell>
                    <TableCell align="left" size="small">
                      {row.comentarios}
                    </TableCell>
                    <TableCell align="left" size="small">
                      <RpsDeleteModalGestion index={index} handleDelete={handleDelete} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={2}>
          <Button variant="contained" type="submit">Guardar</Button>
        </Stack>
      </form >
    </>
  );
};

export default ContactosTelefonicos;
