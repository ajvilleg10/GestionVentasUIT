import PropTypes from 'prop-types';

// third-party
import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';
import { Box } from '@mui/material';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

import logo from 'assets/images/logo.jpg';
import logoDark from 'assets/images/logo.jpg';
import Avatar from 'components/@extended/Avatar';

// ==============================|| LOGO SVG ||============================== //

// eslint-disable-next-line no-unused-vars
const LogoMain = ({ reverse }) => {
  const theme = useTheme();
  return (
    <Box sx={{ with: '100%', justifyContent: 'space-between', alignItems: 'center', display: 'flex', gap: '10px' }}>
      <Avatar src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width="40" />
      <h3>
        <FormattedMessage id="app-name" />
      </h3>
    </Box>
  );
};

LogoMain.propTypes = {
  reverse: PropTypes.bool
};

export default LogoMain;
