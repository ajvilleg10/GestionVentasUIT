// material-ui
import { Grid, List, ListItem, useMediaQuery, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useCurrentUser from 'hooks/useCurrentUser';
import useJefesVentas from 'hooks/useJefesVentas';
import useTiposCuentas from 'hooks/useTiposCuentas';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const DescripcionGeneral = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [tipoUsuario, setTipoUsuario] = useState('');
  const [oficina, setOficina] = useState('');
  const [jefeDeVentas, setJefeDeVentas] = useState('');
  const [nombresApellidos, setNombresApellidos] = useState('');
  const [usuarioGv, setUsuarioGv] = useState(false);
  // const [acercaDe, setAcercaDeVendedor] = useState('');

  const tiposUsuario = useTiposCuentas();
  const oficinas = ['Guayaquil', 'Quito', 'SIPECOM'];
  const jefesDeVentas = useJefesVentas();

  const user = useCurrentUser();

  useEffect(() => {
    setOficina(user?.empleadoInfo?.oficina);
    setNombresApellidos(user?.empleadoInfo?.nombres + ' ' + user?.empleadoInfo?.apellidos);
    setUsuarioGv(user?.cuentaInfo?.usuario_gv);
    setTipoUsuario(user?.tipoCuentaInfo?.nombre_tipo);
    // setAcercaDeVendedor(user?.empleadoInfo?.acerca_de_vendedor);
    setJefeDeVentas(user?.empleadoInfo?.jefe_venta_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(user);
  }, [user]);

  const onTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value);
  };

  const onOficinaChange = (event) => {
    setOficina(event.target.value);
  };

  const onJefeDeVentasChange = (event) => {
    setJefeDeVentas(event.target.value);
  };

  const onNombresApellidosChange = (event) => {
    setNombresApellidos(event.target.value);
  };

  const onUsuarioGvChange = (event) => {
    setUsuarioGv(event.target.checked);
  };

  // const onAcercaDeChange = (event) => {
  //   setAcercaDeVendedor(event.target.value);
  // };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title={<FormattedMessage id="acercaDe" />}>
              <p>Hola</p>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="tipoDeUsuario">Tipo de Usuario*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select
                          disabled
                          labelId="tipoDeUsuario"
                          id="tipoDeUsuarioSelect"
                          value={tipoUsuario}
                          onChange={onTipoUsuarioChange}
                        >
                          {tiposUsuario?.map((tipoUsuario) => (
                            <MenuItem value={tipoUsuario.nombre_tipo} key={tipoUsuario.id}>
                              {tipoUsuario.nombre_tipo}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="oficina">Oficina*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select disabled labelId="oficina" id="oficinaSelect" value={oficina} onChange={onOficinaChange}>
                          {oficinas?.map((oficina) => (
                            <MenuItem value={oficina} key={oficina}>
                              {oficina}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="oficina">Nombres y Apellidos</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        disabled
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        onChange={onNombresApellidosChange}
                        value={nombresApellidos}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="categoriaVendedor">Categoría de Vendedor*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      ---
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="jefeDeVentas">Jefe de ventas asignado*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select
                          disabled
                          labelId="jefeDeVentas"
                          id="jefeDeVentasSelect"
                          value={jefeDeVentas}
                          onChange={onJefeDeVentasChange}
                        >
                          {jefesDeVentas?.map((jefe) => (
                            <MenuItem value={jefe.Empleado.id} key={jefe.Empleado.id}>
                              {jefe.Empleado.nombres + ' ' + jefe.Empleado.apellidos}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="jefeDeVentas">Usuario GV</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Checkbox onChange={onUsuarioGvChange} checked={usuarioGv} disabled />
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

export default DescripcionGeneral;
