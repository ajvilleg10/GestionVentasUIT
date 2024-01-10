import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Container, Toolbar } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { MenuOrientation } from 'config';
// import navigation from 'menu-items';
import useConfig from 'hooks/useConfig';
import { dispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';

import prospectoVendedor from 'menu-items/prospectoVendedor';
import vendedor from 'menu-items/vendedor';
import asistenteVentas from 'menu-items/asistenteVentas';
import jefeVentas from 'menu-items/jefeVentas';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      dispatch(openDrawer(!matchDownXL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownXL]);

  const user = useSelector((state) => state.user);

  const [navigation, setNavigation] = useState({ items: [] });

  useEffect(() => {
    if (user?.type === 'Prospecto Vendedor') {
      setNavigation({ items: [prospectoVendedor] });
    } else if (user?.type === 'Vendedor') {
      setNavigation({ items: [vendedor] });
    } else if (user?.type === 'Asistente de Ventas') {
      setNavigation({ items: [asistenteVentas] });
    } else if (user?.type === 'Jefe de Ventas') {
      setNavigation({ items: [jefeVentas] });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {!isHorizontal ? <Drawer /> : <HorizontalBar />}
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
          <Outlet />
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
