import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Account from './Account';
import ProfileTabs from './ProfileTabs';

import { dispatch } from 'store';
import { setId, setCuentaId } from 'store/reducers/prospectoSeleccionado';

const Registro = ({ prospectoVendedor, volver }) => {

  useEffect(() => {
    dispatch(setId({ id: prospectoVendedor?.Empleado?.id }));
    dispatch(setCuentaId({ cuenta_id: prospectoVendedor?.id }));
    // dispatch(setTipoCuentaId({ tipo_cuenta_id: prospectoVendedor?.TipoCuentum?.id }));
  }, [prospectoVendedor]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} md={12}>
        <Button startIcon={<ArrowBack />} onClick={() => volver()}> Volver </Button>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProfileTabs />
        </Grid>
        <Grid item xs={12} md={9}>
          <Account />
        </Grid>
      </Grid>
    </Grid>
  );

};

Registro.propTypes = {
  prospectoVendedor: PropTypes.object,
  volver: PropTypes.func
};

export default Registro;
