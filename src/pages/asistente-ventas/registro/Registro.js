import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Grid, IconButton } from '@mui/material';
import Account from './Account';
import CloseIcon from '@mui/icons-material/Close';

// project import
import ProfileTabs from './ProfileTabs';

import { dispatch } from 'store';
import { setId, setCuentaId, setTipoCuentaId } from 'store/reducers/prospectoSeleccionado';

// ==============================|| PROFILE - USER ||============================== //

const Registro = ({ prospectoVendedor, volver }) => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    dispatch(setId({ id: prospectoVendedor?.Empleado?.id }));
    dispatch(setTipoCuentaId({ tipo_cuenta_id: prospectoVendedor?.TipoCuentum?.id }));
    dispatch(setCuentaId({ cuenta_id: prospectoVendedor?.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prospectoVendedor]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} md={12} display="flex" alignItems="end" justifyContent="end">
        <IconButton onClick={() => volver()} color="primary">
          <CloseIcon></CloseIcon>
        </IconButton>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProfileTabs focusInput={focusInput} />
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