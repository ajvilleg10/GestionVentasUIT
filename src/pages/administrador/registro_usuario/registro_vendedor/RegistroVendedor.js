import { useRef } from 'react';

// material-ui
import { Grid } from '@mui/material';
import Account from './Account';

// project import
import ProfileTabs from './ProfileTabs';

// ==============================|| PROFILE - USER ||============================== //

const RegistroVendedor = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={11}>
        <Account />
      </Grid>
    </Grid>
  );
};

export default RegistroVendedor;
