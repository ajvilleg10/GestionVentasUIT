import { Grid } from '@mui/material';
import Account from './Account';
import ProfileTabs from './ProfileTabs';

const Registro = () => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <ProfileTabs />
      </Grid>
      <Grid item xs={12} md={9}>
        <Account />
      </Grid>
    </Grid>
  );
};

export default Registro;
