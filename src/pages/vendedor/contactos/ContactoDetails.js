/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Grid,
  List,
  ListItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// third-party
import { PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';
// project import
import MainCard from 'components/MainCard';
import ContactoDetailsTables from './ContactoDetailsTables';
import axios from 'utils/axios';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import useEstadosContactos from 'hooks/useEstadosContactos';
import useOrigenesContactos from 'hooks/useOrigenesContactos';

// eslint-disable-next-line no-unused-vars
const ContactoDetails = ({ contactId, volver }) => {
  // TODO: Descomentart esto y reemplazar responseMock por contactos
  // const [contactos, setContactos] = useState([]);

  // useEffect(() => {
  //   const getContactoById = async () => {
  //     const response = await axios.get('{id}');
  //     setContactos(response.data);
  //   };
  //   getContactos();
  // }, []);

  const [contacto, setContacto] = useState({});
  useEffect(() => {
    const getContactoById = async () => {
      const response = await axios.get(`/contactos/${contactId}`);
      setContacto(response.data);
    };
    getContactoById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fechaSistema, setFechaSistema] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [nombresApellidos, setNombresApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [estadoId, setEstadoId] = useState(0);
  const [origen, setOrigen] = useState('');
  const [referidor, setReferidor] = useState('');
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    if (Object.keys(contacto).length > 0) {
      setFechaSistema(dayjs(contacto.fechaSistema));
      setFechaRegistro(dayjs(contacto.fecha_registro));
      setNombresApellidos(contacto.nombres + ' ' + contacto.apellidos);
      setCelular(contacto.numero_celular);
      setEmail(contacto.email);
      setEstadoId(contacto.estado_contacto_id);
      setOrigen(contacto.origen_contacto);
      setReferidor(contacto.referidor);
      setComentario(contacto.comentarios);
    }
  }, [contacto]);

  useEffect(() => {
    console.log(fechaRegistro);
  }, [fechaRegistro]);

  const estados = useEstadosContactos();

  const origenes = useOrigenesContactos();

  const onNombresApellidosChange = (event) => {
    setNombresApellidos(event.target.value);
  };

  const onCelularChange = (event) => {
    setCelular(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onEstadoChange = (event) => {
    setEstadoId(event.target.value);
  };

  const onOrigenChange = (event) => {
    setOrigen(event.target.value);
  };

  const onReferidorChange = (event) => {
    setReferidor(event.target.value);
  };

  const onComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  // const consultar = () => {
  //   const data = {
  //     nombresApellidos: nombresApellidos,
  //     celular: celular,
  //     estado: estado,
  //     origen: origen
  //   };
  //   console.log(data);
  // };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button onClick={volver}>Volver</Button>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Información del contacto</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ py: 0 }} dense>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="fechaSistema">Fecha Sistema</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          value={fechaSistema}
                          onChange={(newValue) => setFechaSistema(newValue)}
                          fullWidth
                          disabled
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="fechaRegistro">Fecha Registro</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          value={fechaRegistro}
                          onChange={(newValue) => setFechaRegistro(newValue)}
                          fullWidth
                          disabled
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="nombresApellidos">Nombres y Apellidos</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="nombresApellidos"
                        variant="outlined"
                        fullWidth
                        value={nombresApellidos}
                        onChange={onNombresApellidosChange}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel htmlFor="celular">Celular</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <PatternFormat
                        format="+593 (###) ###-####"
                        mask="_"
                        fullWidth
                        customInput={TextField}
                        placeholder="0990729257"
                        onBlur={() => {}}
                        onChange={onCelularChange}
                        value={celular}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="email">Correo electrónico</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={onEmailChange}
                        placeholder="stebin.ben@gmail.com"
                        disabled
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="estado">Estado</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Select labelId="estado" id="estadoSelect" value={estadoId} onChange={onEstadoChange} disabled>
                          {estados?.map((estado) => (
                            <MenuItem value={estado.id} key={estado.id}>
                              {estado.estado_contacto}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="origen">Origen</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Select labelId="origen" id="origenSelect" value={origen} onChange={onOrigenChange} disabled>
                          {origenes?.map((origen) => (
                            <MenuItem value={origen} key={origen}>
                              {origen}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="referidor">Referidor</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField id="referidor" variant="outlined" fullWidth value={referidor} onChange={onReferidorChange} disabled />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="comentario">Comentario</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField id="comentario" variant="outlined" fullWidth value={comentario} onChange={onComentarioChange} disabled />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <ContactoDetailsTables />
        </Grid>
      </Grid>
    </>
  );
};

ContactoDetails.propTypes = {
  contactId: PropTypes.number,
  volver: PropTypes.func
};

export default ContactoDetails;
