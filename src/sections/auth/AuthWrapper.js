import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Avatar } from '@mui/material';

// project import
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';
import logoImage from 'assets/images/logo.jpg';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Logo />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            <Avatar alt="Remy Sharp" src={logoImage} sx={{ width: '150px', height: '150px' }} />
          </Grid>
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
