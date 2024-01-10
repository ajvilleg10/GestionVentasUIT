// material-ui
import { Grid, List, ListItem, useMediaQuery, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';

const DescripcionGeneral = () => {

  const user = useCurrentUser();
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [oficina, setOficina] = useState('');
  const [jefeDeVentas, setJefeDeVentas] = useState({});// Asignar el objecto que regrese desde el backend
  const [nombresApellidos, setNombresApellidos] = useState('');
  const [usuarioGv, setUsuarioGv] = useState(false);
  const [acercaDe, setAcercaDe] = useState('');

  useEffect(() => {

    if (user.empleadoInfo && user.cuentaInfo && user.tipoCuentaInfo) {

      setOficina(user?.empleadoInfo?.oficina ?? '');
      setNombresApellidos(user?.empleadoInfo?.nombres + ' ' + user?.empleadoInfo?.apellidos ?? '');
      setUsuarioGv(user?.cuentaInfo?.usuario_gv ?? false);
      setTipoUsuario(user?.tipoCuentaInfo?.nombre_tipo ?? '');
      setAcercaDe(user?.tipoCuentaInfo?.descripcion ?? '');
      setJefeDeVentas(user?.empleadoInfo?.jefe_venta ?? {});

      console.log('user.empleadoInfo.jefe_venta', user?.empleadoInfo, user?.empleadoInfo?.jefe_venta_id);
      setLoading(false);

    }

  }, [user]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <Grid item xs={12}>
          <h1>Cargando informacion</h1>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <MainCard title={<FormattedMessage id="acercaDe" />}>
              <TextField fullWidth id="acercaDe" name="acercaDe" multiline placeholder="Información acerca del rol" value={acercaDe} disabled />
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Información general">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="tipoDeUsuario">Tipo de Usuario</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select id="tipoDeUsuarioSelect" value={tipoUsuario} disabled>
                          <MenuItem value={tipoUsuario}>
                            {tipoUsuario}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="oficina">Oficina</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select disabled labelId="oficina" id="oficinaSelect" value={oficina}>
                          <MenuItem value={oficina}>
                            {oficina}
                          </MenuItem>
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
                      <InputLabel id="categoriaVendedor">Categoría de Vendedor</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth id="categoria" name="categoria" variant="outlined" value="---" disabled />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="jefeDeVentas">Jefe de ventas asignado</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Select disabled id="jefeDeVentasSelect" value={jefeDeVentas.jefe_id}>
                          <MenuItem value={jefeDeVentas.jefe_id}>
                            {jefeDeVentas.nombres + ' ' + jefeDeVentas.apellidos}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="usuarioGV">Usuario GV</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Checkbox checked={usuarioGv} disabled />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DescripcionGeneral;
