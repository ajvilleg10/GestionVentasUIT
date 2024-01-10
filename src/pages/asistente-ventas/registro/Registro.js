import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Account from './Account';

import ProfileTabs from './ProfileTabs';

import { dispatch } from 'store';
import { setId, setCuentaId, setTipoCuenta, setNombreCompleto } from 'store/reducers/prospectoSeleccionado';
import { useNavigate } from 'react-router';

const Registro = ({ prospectoVendedor, volver }) => {

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setId({ id: prospectoVendedor.id }));
    dispatch(setTipoCuenta({ tipo_cuenta: prospectoVendedor.Cuenta[0].TipoCuentum }));
    dispatch(setCuentaId({ cuenta_id: prospectoVendedor.Cuenta[0].id }));
    dispatch(setNombreCompleto({ nombres: prospectoVendedor.nombres, apellidos: prospectoVendedor.apellidos }));
  }, [prospectoVendedor]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} md={12}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => {
            volver();
            navigate('/registro/prospectos');
          }}>
          Volver
        </Button>
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
