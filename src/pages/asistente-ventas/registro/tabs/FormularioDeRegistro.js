// material-ui
import { Grid, List, ListItem, useMediaQuery, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import useProspectoSeleccionado from 'hooks/useProspectoSeleccionado';

const FormularioDeRegistroAsistente = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [lugarNacimiento, setLugarNacimiento] = useState('');
  const [tituloProfesion, setTituloProfesion] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [conyuge, setConyuge] = useState('');
  const [numeroHijos, setNumeroHijos] = useState(0);

  const [experienciaEnVentas, setExperienciaEnVentas] = useState(false);
  const [disableNombreConyuge, setDisableNombreConyuge] = useState(true);

  const titulosProfesion = ['Ingeniero', 'Arquitecto', 'Doctor', 'Otros Especfique'];
  const estadosCiviles = ['Soltero', 'Casado', 'Viudo'];

  const user = useProspectoSeleccionado();

  useEffect(() => {
    setEmail(user?.cuentaInfo?.email);
    setDireccion(user?.empleadoInfo?.direccion);
    setCelular(user?.empleadoInfo?.telefono);
    setIdentificacion(user?.empleadoInfo?.numero_cedula);
    setFechaNacimiento(dayjs(user?.empleadoInfo?.fecha_nacimiento));
    setLugarNacimiento(user?.empleadoInfo?.lugar_nacimiento);
    setTituloProfesion(user?.empleadoInfo?.titulo_profesion);
    setEstadoCivil(user?.empleadoInfo?.estado_civil);
    setConyuge(user?.empleadoInfo?.nombre_conyuge);
    setNumeroHijos(user?.empleadoInfo?.numero_hijos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(user);
  }, [user]);

  useEffect(() => {
    setDisableNombreConyuge(estadoCivil === 'Soltero' || estadoCivil === '');
  }, [estadoCivil]);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const onCelularChange = (event) => {
    setCelular(event.target.value);
  };

  const onIdentificacionChange = (event) => {
    setIdentificacion(event.target.value);
  };

  const onFechaNacimientoChange = (newValue) => {
    setFechaNacimiento(dayjs(newValue));
  };

  const onLugarNacimientoChange = (event) => {
    setLugarNacimiento(event.target.value);
  };

  const onTituloProfesionChange = (event) => {
    setTituloProfesion(event.target.value);
  };

  const onEstadoCivilChange = (event) => {
    setEstadoCivil(event.target.value);
  };

  const onConyugeChange = (event) => {
    setConyuge(event.target.value);
  };

  const onExperienciaEnVentasChange = (event) => {
    setExperienciaEnVentas(event.target.checked);
  };

  const onNumeroHijosChange = (event) => {
    let numero = event.target.value;
    // const sanitizedValue = numero.replace(/-/g, '');
    // Check if the value is a valid positive number
    if (numero === '' || (numero >= 0 && !isNaN(numero))) {
      setNumeroHijos(numero);
    } else {
      setNumeroHijos('');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Información General">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel htmlFor="direccionDelDomicilio">Dirección del Domicilio</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <TextField
                        fullWidth
                        id="direccionDelDomicilio"
                        placeholder="Street 110-B Kalians Bag, Dewan, M.P. New York"
                        value={direccion}
                        onChange={onDireccionChange}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
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
                        value={celular}
                        onChange={onCelularChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel htmlFor="telefonoDomicilio">Telefono Domicilio</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <PatternFormat
                        format="(##) ###-####"
                        mask="_"
                        fullWidth
                        customInput={TextField}
                        placeholder="(02) 123-4567"
                        onBlur={() => {}}
                        value={celular}
                        onChange={onCelularChange}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel htmlFor="correoElectronico">Correo electrónico</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <TextField
                        type="email"
                        fullWidth
                        id="correoElectronico"
                        placeholder="stebin.ben@gmail.com"
                        value={email}
                        onChange={onEmailChange}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Información Personal">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="identificacion">Identificación</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <PatternFormat
                        format="##########"
                        mask="_"
                        fullWidth
                        customInput={TextField}
                        placeholder="0123456789"
                        onBlur={() => {}}
                        value={identificacion}
                        onChange={onIdentificacionChange}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="fechaNacimiento">Fecha de Nacimiento</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD/MM/YYYY" value={fechaNacimiento} onChange={onFechaNacimientoChange} />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="lugarNacimiento">Lugar Nacimiento</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField id="lugarNacimiento" value={lugarNacimiento} onChange={onLugarNacimientoChange} />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="tituloProfesion">Titulo Profesión</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Select labelId="tituloProfesion" id="tituloProfesion" value={tituloProfesion} onChange={onTituloProfesionChange}>
                          {titulosProfesion?.map((tituloProfesion) => (
                            <MenuItem value={tituloProfesion} key={tituloProfesion}>
                              {tituloProfesion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="estadoCivil">Estado Civil</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Select labelId="estadoCivil" id="estadoCivilSelect" value={estadoCivil} onChange={onEstadoCivilChange}>
                          {estadosCiviles?.map((estadoCivil) => (
                            <MenuItem value={estadoCivil} key={estadoCivil}>
                              {estadoCivil}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      <InputLabel id="nombreConyuge">Nombre del cónyuge</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField id="nombreConyuge" disabled={disableNombreConyuge} value={conyuge} onChange={onConyugeChange} />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="numeroHijos">Número de Hijos</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField type="number" fullWidth id="numeroHijos" value={numeroHijos} onChange={onNumeroHijosChange} />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Referencia Laboral">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="nombreCompania">Nombre de la compañia</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField id="nombreCompania" fullWidth />
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel htmlFor="direccion">Dirección</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth id="direccion" />
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="telefono">Telefono</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <PatternFormat
                      format="(##) ###-####"
                      mask="_"
                      fullWidth
                      customInput={TextField}
                      placeholder="(02) 123-4567"
                      onBlur={() => {}}
                      onChange={() => {}}
                    />
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid item xs={12} md={3} display="flex" alignItems="center">
                    <InputLabel id="referenciaLaboral">Referencia laboral</InputLabel>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField id="referenciaLaboral" fullWidth />
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3} display="flex" alignItems="center">
                      <InputLabel id="experienciaEnVentas">Experiencia en Ventas</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Checkbox value={experienciaEnVentas} onChange={onExperienciaEnVentasChange} />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} display="flex" alignItems="center">
                      <InputLabel id="detallesExperienciaLaboral">
                        Favor dar detalles de su ocupación actual o Ultimo cargo desempeñado
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField id="outlined-multiline-flexible" label="" multiline fullWidth disabled={!experienciaEnVentas} />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormularioDeRegistroAsistente;
