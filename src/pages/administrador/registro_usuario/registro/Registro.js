import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Grid, Button } from '@mui/material';
import Account from './Account';
import ProfileTabs from './ProfileTabs';

import { ArrowBack } from '@mui/icons-material';
import { dispatch } from 'store';
import { setId, setCuentaId, setTipoCuenta, setNombreCompleto } from 'store/reducers/userSeleccionado';

const RegistroAdmin = ({ user, volver }) => {

  const navigate = useNavigate();

  console.log('radmin', user);

  useEffect(() => {
    dispatch(setId({ id: user.id }));
    dispatch(setTipoCuenta({ tipo_cuenta: user.Cuenta[0].TipoCuentum }));
    dispatch(setCuentaId({ cuenta_id: user.Cuenta[0].id }));
    dispatch(setNombreCompleto({ nombres: user.nombres, apellidos: user.apellidos }));
  }, [user]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Button startIcon={<ArrowBack />} onClick={() => {
          volver();
          navigate('/admin/registro/usuarios');
        }}> Volver </Button>
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

RegistroAdmin.propTypes = {
  volver: PropTypes.func,
  user: PropTypes.object
};

export default RegistroAdmin;
