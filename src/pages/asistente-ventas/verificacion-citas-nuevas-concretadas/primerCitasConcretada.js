import { useEffect, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
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
// import { PatternFormat } from 'react-number-format';
// import PropTypes from 'prop-types';
// project import
// import MainCard from 'components/MainCard';
// import axios from 'utils/axios';
// third-party
// const today = dayjs();

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { useFormik } from 'formik';
import * as yup from 'yup';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useConfBonificacionGestionJefeVentas } from 'hooks/administrador/useConfBonificacionGestion';
import { useCitasConcretadas } from 'hooks/asistente-ventas/useGestionCitas';
import { EmptyTable } from 'components/third-party/ReactTable';

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
  // {
  //   id: 'numero',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'N'
  // },
  /*{
      id: 'fechaSistema',
      align: 'left',
      disablePadding: false,
      label: 'Fecha y Hora del Sistema'
  },
  {
      id: 'fechaRegistro',
      align: 'left',
      disablePadding: false,
      label: 'Fecha y Hora de Registro'
  },*/

  {
    id: 'vendedor',
    align: 'center',
    disablePadding: true,
    label: 'Vendedor'
  },
  {
    id: 'Contacto',
    align: 'center',
    disablePadding: false,
    label: 'Contacto'
  },
  {
    id: 'EstadoVerificacion',
    align: 'center',
    disablePadding: false,
    label: 'Estado de Verificación'
  },
  {
    id: 'tipoCita',
    align: 'center',
    disablePadding: false,
    label: 'Tipo de Cita'
  },
  {
    id: 'fechaCita',
    align: 'center',
    disablePadding: false,
    label: 'Fecha y Hora de Cita'
  },
  {
    id: 'direccionCita',
    align: 'center',
    disablePadding: false,
    label: 'Dirección de Cita'
  },
  {
    id: 'concretada',
    align: 'center',
    disablePadding: false,
    label: 'Concretada'
  },
  {
    id: 'convocadoJV',
    align: 'center',
    disablePadding: false,
    label: 'Convocado a Jefe de Ventas'
  },
  {
    id: 'asistenciaJefeVntas',
    align: 'center',
    disablePadding: false,
    label: 'Asistencia de Jefe Ventas'
  },
  {
    id: 'contactoGenerado',
    align: 'center',
    disablePadding: false,
    label: 'Contacto Generado'
  },
  {
    id: 'modoVerificacion',
    align: 'center',
    disablePadding: false,
    label: 'Modo de Verificación'
  },
  {
    id: 'confirmacionAsistenciaVendedor',
    align: 'center',
    disablePadding: false,
    label: 'Confirmación de Asistencia de Vendedor'
  },
  {
    id: 'confirmacionAsistenteJefeventas',
    align: 'center',
    disablePadding: false,
    label: "Confirmación de Asistencia de Jefe Ventas"
  },
  {
    id: 'valoracionVendedor',
    align: 'center',
    disablePadding: false,
    label: 'Valoracion del Vendedor (1-5)'
  },
  {
    id: 'explicoServicio',
    align: 'center',
    disablePadding: false,
    label: 'Explicó el Servicio'
  },
  {
    id: 'valoracionServicio',
    align: 'center',
    disablePadding: false,
    label: 'Valoración del Servicio (1-5)'
  },
  {
    id: 'fechaVerificacion',
    align: 'center',
    disablePadding: false,
    label: 'Fecha de Verificación'
  },
  {
    id: 'comentarios',
    align: 'center',
    disablePadding: false,
    label: 'Comentarios'
  },
  {
    id: 'conclusion',
    align: 'center',
    disablePadding: false,
    label: 'Conclusión'
  },
  {
    id: 'verificacionExitosa',
    align: 'center',
    disablePadding: false,
    label: 'Verificación Éxitosa'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead sx={{ backgroundColor: 'white' }}>
      <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
        {headCells.map((headCell) => (
          <TableCell sx={{ minWidth: '200px' }} key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// eslint-disable-next-line no-unused-vars
const PrimeraCitaConcretada = () => {

  const getDate = (date) => {
    var formatDate = dayjs(date).format("DD/MM/YYYY HH:mm");
    return formatDate.toString();
  }

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
  const handleRowClick = (cita) => {
    navigate(`/segundaCitaConcretada`, {
      state: {
        cita: cita
      },

    });
  };

  const { citasConcretadasBack, fetchCitaConcretadaBack } = useCitasConcretadas();
  const [citasConcretadas, setCitasConcretadas] = useState(
    []
  )

  useEffect(() => {
    if (citasConcretadasBack != null && citasConcretadasBack.length > 0) {
      setCitasConcretadas([...citasConcretadasBack]);
      console.log(citasConcretadasBack);
    }

  }, [citasConcretadasBack]);


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
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Buscar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ py: 0 }} dense>
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="fechaCita">Fecha de Cita</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker format="DD/MM/YYYY" />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="vendedor">Vendedor</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      id="vendedor"
                      name="vendedor"
                    />
                  </Grid>
                </Grid>
              </ListItem >
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="contacto">Contacto</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth

                      id="contacto"
                      name="contacto"
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    <InputLabel htmlFor="estadoVerificacion">Estado de Verificación</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Select fullWidth>
                      <MenuItem key={0} value={0}>Pendiente</MenuItem>
                      <MenuItem key={2} value={1}>Finalizado</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button variant="contained" fullWidth >
                  Consultar
                </Button>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Box mt={2}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }} >
            <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
              <OrderTableHead />
              <TableBody >
                {citasConcretadas.length === 0 ? (<EmptyTable msg="No existen citas" colSpan={headCells.length} height={'200px'} />) : (
                  citasConcretadas.map((cita) => {
                    return (<TableRow
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => handleRowClick(cita)}
                    >
                      <TableCell align="center">
                        <label> {cita["vendedor"]["nombres"] + " " + cita["vendedor"]["apellidos"]} </label>
                      </TableCell>
                      <TableCell align="center">
                        <label> {cita["contacto"]["nombres"] + " " + cita["contacto"]["apellidos"]} </label>
                      </TableCell>
                      <TableCell align="center">
                        <label> {(cita["revisado"] ? "VERIFICADA" : "NO VERIFICADA")} </label>
                      </TableCell>
                      <TableCell><label> {cita["tipo_cita"]}  </label></TableCell>
                      <TableCell><label> {getDate(cita["fecha_cita"])} </label></TableCell>
                      <TableCell><label> {cita["direccion"]} </label></TableCell>
                      <TableCell><label> SI </label></TableCell>
                      <TableCell><label> {(cita["convocado_jv"] ? "SI" : "NO")} </label></TableCell>
                      <TableCell><label> {(cita["asistencia_jv"] ? "SI" : "NO")} </label></TableCell>
                      <TableCell><label> {(cita["revisado"] ? "SI" : "NO")} </label></TableCell>
                      <TableCell><label> {cita?.verificacion?.ModoVerificacion?.tipo_verificacion}</label></TableCell>
                      <TableCell><label> {(cita["confirmacion_vend"] ? "SI" : "NO")}</label></TableCell>
                      <TableCell><label> {(cita["asistencia_jv"] ? "SI" : "NO")} </label></TableCell>
                      <TableCell><label> {cita?.verificacion?.valoracion_v} </label></TableCell>
                      <TableCell><label> {(cita?.verificacion?.explic_serv !== null ? (cita?.verificacion?.explic_serv ? "SI" : "NO") : null)} </label></TableCell>
                      <TableCell><label> {cita?.verificacion?.valoracion_s} </label></TableCell>
                      <TableCell><label> {(cita?.verificacion?.fecha_v ? getDate(cita?.verificacion?.fecha_v) : null)}</label></TableCell>
                      <TableCell><label> {cita?.verificacion?.comentarios} </label></TableCell>
                      <TableCell><label> {cita?.verificacion?.conclusion}</label></TableCell>
                      <TableCell><label> {(cita?.verificacion?.verificacion_exitosa !== null ? (cita?.verificacion?.verificacion_exitosa ? "SI" : "NO") : null)} </label></TableCell>
                    </TableRow>)
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      {/* <Grid container spacing={3}> */}
      {/*   <Grid item xs={12}> */}
      {/*     <Grid container spacing={3}> */}
      {/*       <Grid xs={12} md={6}> */}
      {/*         <MainCard title="Busqueda"> */}
      {/*           <List sx={{ py: 0 }} dense> */}
      {/*             <ListItem> */}
      {/*               <Grid container spacing={1}> */}
      {/*                 <Grid item xs={12} md={2} display="flex" alignItems="center"> */}
      {/*                   <InputLabel htmlFor="fechaCita">Fecha Cita</InputLabel> */}
      {/*                 </Grid> */}
      {/*                 <Grid item xs={12} md={8}> */}
      {/*                   <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      {/*                     <DatePicker format="DD/MM/YYYY" /> */}
      {/*                   </LocalizationProvider> */}
      {/*                 </Grid> */}
      {/*               </Grid> */}
      {/*             </ListItem> */}
      {/*             <ListItem > */}
      {/*               <Grid container spacing={1}> */}
      {/*                 <Grid item xs={12} md={2} display="flex" alignItems="center"> */}
      {/*                   <InputLabel htmlFor="vendedor">Vendedor</InputLabel> */}
      {/*                 </Grid> */}
      {/*                 <Grid item xs={12} md={8}> */}
      {/*                   <TextField */}
      {/*                     fullWidth */}
      {/*                     id="vendedor" */}
      {/*                     name="vendedor" */}
      {/*                   /> */}
      {/*                 </Grid> */}
      {/*               </Grid> */}
      {/*             </ListItem > */}
      {/*             <ListItem> */}
      {/*               <Grid container spacing={1}> */}
      {/*                 <Grid item xs={12} md={2} display="flex" alignItems="center"> */}
      {/*                   <InputLabel htmlFor="contacto">Contacto</InputLabel> */}
      {/*                 </Grid> */}
      {/*                 <Grid item xs={12} md={8}> */}
      {/*                   <TextField */}
      {/*                     fullWidth */}

      {/*                     id="contacto" */}
      {/*                     name="contacto" */}
      {/*                   /> */}
      {/*                 </Grid> */}
      {/*               </Grid> */}
      {/*             </ListItem> */}
      {/*             <ListItem> */}
      {/*               <Grid container spacing={1}> */}
      {/*                 <Grid item xs={12} md={2} display="flex" alignItems="center"> */}
      {/*                   <InputLabel htmlFor="estadoVerificacion">Estado de Verificacion</InputLabel> */}
      {/*                 </Grid> */}
      {/*                 <Grid item xs={12} md={8}> */}

      {/*                   <Select fullWidth> */}
      {/*                     <MenuItem key={0} value={0}>Pendiente</MenuItem> */}
      {/*                     <MenuItem key={2} value={1}>Finalizado</MenuItem> */}
      {/*                   </Select> */}

      {/*                 </Grid> */}
      {/*               </Grid> */}
      {/*             </ListItem> */}
      {/*             <ListItem> */}
      {/*               <Button variant="contained" fullWidth > */}
      {/*                 Consultar */}
      {/*               </Button> */}
      {/*             </ListItem> */}
      {/*           </List> */}
      {/*         </MainCard> */}
      {/*       </Grid> */}
      {/*     </Grid> */}
      {/*   </Grid> */}
      {/*   <Grid item xs={12}> */}
      {/*   </Grid> */}
      {/*   <Grid item xs={12}> */}
      {/*     <Box mt={2}> */}
      {/*       <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }} > */}
      {/*         <Table sx={{ backgroundColor: 'white', border: '2px solid lightblue' }}> */}
      {/*           <OrderTableHead /> */}
      {/*           <TableBody > */}
      {/*             {citasConcretadas.map((cita, index) => { */}
      {/*               return (<TableRow */}
      {/*                 hover */}
      {/*                 role="checkbox" */}
      {/*                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }} */}
      {/*                 onClick={() => handleRowClick(cita)} */}
      {/*               > */}
      {/*                 <TableCell align="left"> */}
      {/*                   <label> {index + 1} </label> */}
      {/*                 </TableCell> */}
      {/*                 <TableCell align="left"> */}
      {/*                   <label> {cita["vendedor"]["nombres"] + " " + cita["vendedor"]["apellidos"]} </label> */}
      {/*                 </TableCell> */}
      {/*                 <TableCell align="left"> */}
      {/*                   <label> {cita["contacto"]["nombres"] + " " + cita["contacto"]["apellidos"]} </label> */}
      {/*                 </TableCell> */}
      {/*                 <TableCell align="left"> */}
      {/*                   <label> {(cita["revisado"] ? "VERIFICADA" : "NO VERIFICADA")} </label> */}
      {/*                 </TableCell> */}
      {/*                 <TableCell><label> {cita["tipo_cita"]}  </label></TableCell> */}
      {/*                 <TableCell><label> {getDate(cita["fecha_cita"])} </label></TableCell> */}
      {/*                 <TableCell><label> {cita["direccion"]} </label></TableCell> */}
      {/*                 <TableCell><label> SI </label></TableCell> */}
      {/*                 <TableCell><label> {(cita["convocado_jv"] ? "SI" : "NO")} </label></TableCell> */}
      {/*                 <TableCell><label> {(cita["asistencia_jv"] ? "SI" : "NO")} </label></TableCell> */}
      {/*                 <TableCell><label> {(cita["revisado"] ? "SI" : "NO")} </label></TableCell> */}
      {/*                 <TableCell><label> {cita?.verificacion?.ModoVerificacion?.tipo_verificacion}</label></TableCell> */}
      {/*                 <TableCell><label> {(cita["confirmacion_vend"] ? "SI" : "NO")}</label></TableCell> */}
      {/*                 <TableCell><label> {(cita["asistencia_jv"] ? "SI" : "NO")} </label></TableCell> */}
      {/*                 <TableCell><label> {cita?.verificacion?.valoracion_v} </label></TableCell> */}
      {/*                 <TableCell><label> {(cita?.verificacion?.explic_serv !== null ? (cita?.verificacion?.explic_serv ? "SI" : "NO") : null)} </label></TableCell> */}
      {/*                 <TableCell><label> {cita?.verificacion?.valoracion_s} </label></TableCell> */}
      {/*                 <TableCell><label> {(cita?.verificacion?.fecha_v ? getDate(cita?.verificacion?.fecha_v) : null)}</label></TableCell> */}
      {/*                 <TableCell><label> {cita?.verificacion?.comentarios} </label></TableCell> */}
      {/*                 <TableCell><label> {cita?.verificacion?.conclusion}</label></TableCell> */}
      {/*                 <TableCell><label> {(cita?.verificacion?.verificacion_exitosa !== null ? (cita?.verificacion?.verificacion_exitosa ? "SI" : "NO") : null)} </label></TableCell> */}
      {/*               </TableRow>) */}
      {/*             })} */}
      {/*           </TableBody> */}
      {/*         </Table> */}
      {/*       </TableContainer> */}
      {/*     </Box> */}
      {/*   </Grid> */}
      {/* </Grid> */}

    </>
  );
};

export default PrimeraCitaConcretada;
