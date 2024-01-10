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



//var tipoCitas = ["Nueva Obtenida", "Seguimiento", "Referido", "Casual", "Servicio"];

const ContactosTelefonicos = ({ idContacto }) => {

  var today = new Date();
  var todayjs = dayjs();

  const currentUser = useSelector((state) => state.user);
  const contacto = useSelector((state) => state.contactoSeleccionado);
  const { gestionContactosBack, createGestionContactosBack, deleteGestionContactosBack, validarNuevaObtenida } = useGestionContactos();
  const [gestionDatosBack, setGestionDatosBack] = useState([]);
  const [tipoCitas, setTipoCitas] = useState(["Seguimiento", "Referido", "Casual", "Servicio"]);
  const [fechaMinRegistro, setFechaMinRegistro] = useState(null);
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

  console.log('Gestion de contactos', gestionContactosBack);

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
    gestionDatos.lista_referidos = [];
    gestionDatos.referidos = values['referido'];
    if (Array.isArray(values['referidos']))
      values['referidos'].map((row, index) => {
        if (!(row["primerNombre"] === '' && row["apellidos"] === '' && row["parentezco"] === '' && row["numero"] === ''))
          gestionDatos.lista_referidos.push(row);
      });
    setGestionDatos({ ...gestionDatos });
  };

  const handleHour = (event) => {
    gestionDatos.fechaRegistro = event.toDate();
    setFechaMinRegistro(dayjs(event.toDate()))
    gestionDatos.siguienteAccion = '';
    gestionDatos.actividad = {};
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
        todayjs = dayjs();
        setGestionDatos({
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
        },)
        QuitarNuevaObtenida();
        formik.setValues(values);
        formik.setErrors({});
        formik.setTouched({});
      } catch (error) {
        console.log(error);
        dispatch(
          openSnackbar({
            open: true,
            message: "Error al crear la gestion",
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

  var minDate = calculateMinDate(todayjs);

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

  const EjecutarValidarNuevaObtenida = async () => {
    if (await validarNuevaObtenida()) {
      setTipoCitas(["Nueva Obtenida", ...tipoCitas])
    }
  }

  const QuitarNuevaObtenida = () => {
    var index = tipoCitas.indexOf("Nueva Obtenida")
    if (index !== -1) {
      tipoCitas.splice(index, 1);
      setTipoCitas([...tipoCitas]);
    }
  }

  useEffect(() => { EjecutarValidarNuevaObtenida() }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit} onChange={handleChange}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
                <TableCell align="center" sx={{ minWidth: '200px' }}>Fecha y hora Sistema</TableCell>
                <TableCell align="center" sx={{ minWidth: '230px' }}>Fecha y hora Registro</TableCell>
                <TableCell align="center" sx={{ minWidth: '200px' }}>Seguro Médico Internacional</TableCell>
                <TableCell align="center" sx={{ minWidth: '200px' }}>Interesado</TableCell>
                <TableCell align="center" sx={{ minWidth: '200px' }}>Siguiente Acción</TableCell>
                <TableCell align="center" sx={{ minWidth: '200px' }}>Referidos</TableCell>
                <TableCell align="center" sx={{ minWidth: '200px' }}>Comentarios</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={gestionDatos.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                <TableCell align="left" size="auto">
                  {(today.getDate() >= 10 ? today.getDate() : "0" + today.getDate()) + '/' + (today.getMonth() + 1 >= 10 ? today.getMonth() : "0" + (today.getMonth() + 1)) + '/' +
                    today.getFullYear() + ' ' + (today.getHours() > 9 ? today.getHours() : "0" + today.getHours()) + ':' + (today.getMinutes() > 9 ? today.getMinutes() : "0" + today.getMinutes())}
                </TableCell>
                <TableCell align="left" size="small">
                  <Grid container spacing={1}>
                    <Grid item>
                      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs} adapterLocale={'es'}>
                        <DateTimePicker label="Escoja la Fecha y Hora" onChange={handleHour} minDateTime={minDate} maxDateTime={todayjs}
                          format="DD/MM/YYYY HH:mm" />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="left" size="small">
                  <Select labelId='motivo_salida' name='motivo_salida' id="motivo_salida"
                    value={gestionDatos.seguroMedico}
                    onChange={(event) => onSeguroMedicoChange(event)} fullWidth
                    disabled={gestionDatos.fechaRegistro === ''}>
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
                      fullWidth
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
                    minDate={fechaMinRegistro}
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
                <TableCell align="left" size="auto" />
              </TableRow>
              {gestionDatosBack?.map((row, index) => {
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
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
                    <TableCell align="center" size="small">
                      <RpsDeleteModalGestion index={index} handleDelete={handleDelete} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end" spacing={3} paddingTop={3}>
          <Button variant="contained" type="submit">Guardar</Button>
        </Stack>
      </form >
    </>
  );
};

export default ContactosTelefonicos;
