import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

// material-ui
import { Grid, Button } from '@mui/material';
import Account from './Account';

// project import
import ProfileTabs from './ProfileTabs';
// import { Grid, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

import { ArrowBack } from '@mui/icons-material';
import { dispatch } from 'store';
import { setId, setCuentaId, setTipoCuenta } from 'store/reducers/userSeleccionado';


const RegistroAdmin = ({ user, volver }) => {

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setId({ id: user.id }));
    dispatch(setTipoCuenta({ tipo_cuenta: user.Cuenta[0].TipoCuentum }));
    dispatch(setCuentaId({ cuenta_id: user.Cuenta[0].id }));
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
