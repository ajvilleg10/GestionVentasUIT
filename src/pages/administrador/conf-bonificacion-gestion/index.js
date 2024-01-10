import {
  Grid,
} from '@mui/material';

import MainCard from 'components/MainCard';
import ConfBonificacionSelector from './bonificacion-selector-usuario';

const Conf_bonificacion_gestion = () => {
  return (
    <>
      <MainCard>
        <Grid container spacing={3}>
          <ConfBonificacionSelector />
        </Grid>
      </MainCard>
    </>
  );
};

export default Conf_bonificacion_gestion;
