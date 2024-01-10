import { Grid } from '@mui/material';
import ProfileTabs from './ProfileTabs';
import Account from './Account';
import { useLocation } from 'react-router';

const InformacionUsuario = () => {

  const location = useLocation();

  return (
    <Grid container spacing={3} paddingY={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProfileTabs />
        </Grid>
        <Grid item xs={12} md={9}>
          <Account tab={location.state?.tab ?? 0} />
        </Grid>
      </Grid>
    </Grid>
  );

};

export default InformacionUsuario;
