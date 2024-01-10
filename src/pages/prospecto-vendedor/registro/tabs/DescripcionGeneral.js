// material-ui
import { Grid, List, ListItem, useMediaQuery, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useCurrentUser from 'hooks/useCurrentUser';
import useJefesVentas from 'hooks/useJefesVentas';
import useTiposCuentas from 'hooks/useTiposCuentas';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { OFICINAS } from 'utils/constants';

const DescripcionGeneral = () => {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [tipoUsuario, setTipoUsuario] = useState('');
  const [oficina, setOficina] = useState('');
  const [jefeDeVentas, setJefeDeVentas] = useState('');
  const [nombresApellidos, setNombresApellidos] = useState('');
  const [usuarioGv, setUsuarioGv] = useState(false);
  const [acercaDe, setAcercaDe] = useState('');

  const tiposUsuario = useTiposCuentas();
  const jefesDeVentas = useJefesVentas();

  const user = useCurrentUser();

  useEffect(() => {
    setOficina(user?.empleadoInfo?.oficina ?? '');
    setNombresApellidos(user?.empleadoInfo?.nombres + ' ' + user?.empleadoInfo?.apellidos ?? '');
    setUsuarioGv(user?.cuentaInfo?.usuario_gv ?? false);
    setTipoUsuario(user?.tipoCuentaInfo?.id ?? 1);
    setJefeDeVentas(user?.empleadoInfo?.jefe_venta_id ?? 1);
    setAcercaDe(user?.tipoCuentaInfo?.descripcion ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // TODO: Cambiar render a un loader
  if (tiposUsuario.length == 0 || jefesDeVentas.length === 0 || !user) {
    return <h3>Cargando información...</h3>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title={<FormattedMessage id="acercaDe" />}>
              <TextField fullWidth id="acercaDe" name="acercaDe" multiline placeholder="Información acerca del rol" value={acercaDe} disabled />
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
                        <Select id="tipoDeUsuarioSelect" value={tipoUsuario} disabled>
                          {tiposUsuario?.map((tipoUsuario) => (
                            <MenuItem value={tipoUsuario.id} key={tipoUsuario.id}>
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
                        <Select disabled labelId="oficina" id="oficinaSelect" value={oficina}>
                          {OFICINAS?.map((oficina) => (
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
                      <TextField fullWidth id="outlined-basic" variant="outlined" value={nombresApellidos} disabled />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="categoriaVendedor">Categoría de Vendedor*</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth id="categoria" name="categoria" variant="outlined" value="---" disabled />
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
                        <Select disabled id="jefeDeVentasSelect" value={jefeDeVentas}>
                          {jefesDeVentas?.map((jefe) => (
                            <MenuItem value={jefe.id} key={jefe.Empleado.id}>
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
                      <Checkbox checked={usuarioGv} disabled />
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
