import {
  Grid,
} from '@mui/material';

import TablaSelectorUsuario from './tabla-selector-usuario';

const TablaComisiones = () => {

  return (
    <>
      <Grid container spacing={3}>
        <TablaSelectorUsuario />
      </Grid>
    </>
  );
};

export default TablaComisiones;
