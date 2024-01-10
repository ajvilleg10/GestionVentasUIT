import { useEffect, useState } from 'react';
import { Grid, List, ListItem, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import AnalyticEcommerce from 'components/statistics/AnalyticEcommerce';
import CachedIcon from '@mui/icons-material/Cached';

import MainCard from 'components/MainCard';
import ContactosTable from './ContactosTable';
import ContactoDetails from './ContactoDetails';
import { useSelector } from 'store';
import useEstadosContactos from 'hooks/useEstadosContactos';
import useOrigenesContactos from 'hooks/useOrigenesContactos';
import useContactos from 'hooks/vendedor/useContactos';

const Contactos = () => {
  const user = useSelector((state) => state.user);

  const [showDetails, setShowDetails] = useState(false);

  const { contactosBack, statsBack, createContactos, fetchContactos } = useContactos();
  const [contactos, setContactos] = useState([]);
  const [contactoDetailsId, setContactoDetailsId] = useState(0);

  const [nombresApellidos, setNombresApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [origen, setOrigen] = useState('');

  const [stats, setStats] = useState({
    "referidos": 0,
    "citas": 0,
    "citasC": 0,
    "contratos_por_cerrar": 0,
    "nivel": {
      "nivel": 0,
      "citas_nuevas_obtenidas": 1,
      "citas_nuevas_concretadas": 1,
      "referidos_obtenidos": 1,
      "negocios_xcerrar": 1,
    }
  });

  useEffect(() => {
    if (statsBack != null)
      setStats({ ...stats, ...statsBack})
  }, [statsBack])

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

  useEffect(() => {
    if (contactosBack != null) {
      setContactos([...contactosBack]);
    }
  }, [contactosBack]);

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

    const response = await fetchContactos({ nombres: nombres, apellidos: apellidos, cleanedPhoneNumber: cleanedPhoneNumber, origen: origen, estadoId: estadoId })
    /*const response = await axios.get(
      `/contactos/empleados/${user.id}?nombres=${nombres}&apellidos=${apellidos}&numero_celular=${cleanedPhoneNumber}&parentezco=&origen_contacto=${origen}&estado_contacto_id=${estadoId}`
    );*/
    setContactos(response.data);
  };

  const consultar = () => {
    getContactos();
  };

  useEffect(() => {
    //getContactos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showContactDetails = (contactId) => {
    setContactoDetailsId(contactId);
    setShowDetails(true);
  };

  const getPercentage = (stats, nivel) => {
    var true_percentage = parseInt((stats * 100) / nivel)

    return (true_percentage <= 100 ? true_percentage : 100)
  }

  const onUpdate = () => {
    getContactos();
  };

  return (
    <>
      {showDetails ? (
        <ContactoDetails key={"id"} contactId={contactoDetailsId} volver={() => setShowDetails(false)} />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <MainCard title="Busqueda" stilo="h4">
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
                            //format="+593 (###) ###-####"
                            mask="_"
                            fullWidth
                            customInput={TextField}
                            placeholder="0990729257"
                            onBlur={() => { }}
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
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '20px ' }}
              >
                <Grid item xs={12}>
                  <Typography variant="h4" color="inherit">
                    Nivel Actual: {(stats.nivel?.ultimo ? stats.nivel.nivel : stats.nivel.nivel - 1)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Citas Nuevas Obtenidas" periodo="Semanal" count={stats?.citas} percentage={getPercentage(stats?.citas, stats.nivel.citas_nuevas_obtenidas)} color="primary" />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Citas Nuevas Concretadas" periodo="Semanal" count={stats?.citasC} percentage={getPercentage(stats?.citasC, stats.nivel.citas_nuevas_concretadas)} color="primary" />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Negocios por Cerrar" periodo="Semanal" count={stats?.contratos_por_cerrar} percentage={getPercentage(stats?.contratos_por_cerrar, stats.nivel.negocios_xcerrar)} color="error" />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticEcommerce title="Referidos Obtenidos" periodo="Semanal" count={stats?.referidos} percentage={getPercentage(stats?.referidos, stats.nivel.referidos_obtenidos)} color="warning" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CachedIcon style={{ fontSize: '1.5rem' }} />}
              onClick={onUpdate}
            >
              Actualizar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ContactosTable data={contactos} showDetails={showContactDetails} createFunction={createContactos} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Contactos;
