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
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [trabajoActual, setTrabajoActual] = useState('NO');
  const [nombreEmpresa, setNombreEmpresa] = useState('');

  useEffect(() => {

    if (user.empleadoInfo && user.cuentaInfo && user.tipoCuentaInfo) {

      setOficina(user?.empleadoInfo?.oficina ?? '');
      setNombres(user?.empleadoInfo?.nombres);
      setApellidos(user?.empleadoInfo?.apellidos ?? '');
      setTipoUsuario(user?.tipoCuentaInfo?.nombre_tipo ?? '');
      setJefeDeVentas(user?.empleadoInfo?.jefe_venta ?? {});
      setTrabajoActual(user?.empleadoInfo?.trabajo_actual ?? 'NO');
      setNombreEmpresa(user?.empleadoInfo?.nombre_empresa ?? '');

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
                      <InputLabel id="nombres">Nombres</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth id="nombres-pv" variant="outlined" value={nombres} disabled />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <InputLabel id="apellidos">Apellidos</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth id="apellidos-pv" variant="outlined" value={apellidos} disabled />
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
                      <InputLabel id="trabajoActual">Trabajo actual</InputLabel>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth>
                        <Select disabled id="trabajo-actual-id" value={trabajoActual}>
                          <MenuItem value={trabajoActual}>
                            {trabajoActual}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth id="nombre-empresa-pv" variant="outlined" value={nombreEmpresa} disabled />
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
