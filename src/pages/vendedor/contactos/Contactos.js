// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import axios from 'utils/axios';

import { Grid, List, ListItem, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

import AnalyticEcommerce from 'components/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';
import ContactosTable from './ContactosTable';
import ContactoDetails from './ContactoDetails';
import { useSelector } from 'store';
import useEstadosContactos from 'hooks/useEstadosContactos';
import useOrigenesContactos from 'hooks/useOrigenesContactos';

// ==============================|| SAMPLE PAGE ||============================== //

const Contactos = () => {
  const user = useSelector((state) => state.user);

  const [showDetails, setShowDetails] = useState(false);

  const [contactos, setContactos] = useState([]);
  const [contactoDetailsId, setContactoDetailsId] = useState(0);

  const [nombresApellidos, setNombresApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [origen, setOrigen] = useState('');

  const estados = useEstadosContactos();

  const origenes = useOrigenesContactos();

  const onNombresApellidosChange = (event) => {
    setNombresApellidos(event.target.value);
  };

  const onCelularChange = (event) => {
    setCelular(event.target.value);
  };

  const onEstadoChange = (event) => {
    setEstadoId(event.target.value);
  };

  const onOrigenChange = (event) => {
    setOrigen(event.target.value);
  };

  const getContactos = async () => {
    // Separar nombres y apellidos si nombresApellidos está presente
    let nombres = '';
    let apellidos = '';
    if (nombresApellidos) {
      const nombresApellidosArr = nombresApellidos.split(' ');
      nombres = nombresApellidosArr[0] || '';
      apellidos = nombresApellidosArr.slice(1).join(' ') || '';
    }
    let cleanedPhoneNumber = '';
    if (celular) {
      cleanedPhoneNumber = celular.replace(/\D/g, '');
      cleanedPhoneNumber = cleanedPhoneNumber.replace(/^593/, '');
    }
    const response = await axios.get(
      `/contactos/empleados/${user.id}?nombres=${nombres}&apellidos=${apellidos}&numero_celular=${cleanedPhoneNumber}&parentezco=&origen_contacto=${origen}&estado_contacto_id=${estadoId}`
    );
    setContactos(response.data);
  };

  const consultar = () => {
    getContactos();
  };

  useEffect(() => {
    getContactos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showContactDetails = (contactId) => {
    setContactoDetailsId(contactId);
    setShowDetails(true);
  };

  return (
    <>
      {showDetails ? (
        <ContactoDetails contactId={contactoDetailsId} volver={() => setShowDetails(false)} />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <MainCard title="Busqueda">
                  <List sx={{ py: 0 }} dense>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
                          <InputLabel id="nombresApellidos">Nombres y Apellidos</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <TextField id="nombresApellidos" variant="outlined" fullWidth onChange={onNombresApellidosChange} />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
                          <InputLabel htmlFor="celular">Celular</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <PatternFormat
                            format="+593 (###) ###-####"
                            mask="_"
                            fullWidth
                            customInput={TextField}
                            placeholder="0990729257"
                            onBlur={() => {}}
                            onChange={onCelularChange}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
                          <InputLabel id="estado">Estado</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <FormControl fullWidth>
                            <Select labelId="estado" id="estadoSelect" value={estadoId} onChange={onEstadoChange}>
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
                        <Grid item xs={12} md={4} display="flex" alignItems="center">
                          <InputLabel id="origen">Origen</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <FormControl fullWidth>
                            <Select labelId="origen" id="origenSelect" value={origen} onChange={onOrigenChange}>
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
                      <Button variant="contained" fullWidth onClick={consultar}>
                        Consultar
                      </Button>
                    </ListItem>
                  </List>
                </MainCard>
              </Grid>
              <Grid
                container
                xs={12}
                md={6}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px' }}
              >
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Citas concretadas | Semana" count="7" percentage={40} color="primary" />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Citas | Semana" count="7" percentage={40} color="primary" />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Contratos x Cerrar | Semana" count="7" percentage={40} color="error" />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Contactos referidos | Semana" count="4" percentage={20} color="warning" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ContactosTable data={contactos} showDetails={showContactDetails} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Contactos;
