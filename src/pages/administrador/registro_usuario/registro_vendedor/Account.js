import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { FormattedMessage } from 'react-intl';

// assets
import { ContainerOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let selectedTab = 0;
  switch (pathname) {
    case '/registroUsuario/asistenteVentas/descripcionGeneral':
      selectedTab = 0;
      break;
    case '/registroUsuario/asistenteVentas/formularioDeRegistro':
      selectedTab = 1;
      break;
    case '/registroUsuario/asistenteVentas/documentosContractuales':
      selectedTab = 2;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {
    if (selectedTab === 0) {
      navigate('/registroUsuario/asistenteVentas/descripcionGeneral', {
        state: {
          from: ''
        },
        replace: true
      });
    }
  }, [navigate, selectedTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
          <Tab
            label={<FormattedMessage id="descripcionGeneral" />}
            component={Link}
            to="/registroUsuario/asistenteVentas/descripcionGeneral"
            icon={<UserOutlined />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="formularioDeRegistro" />}
            component={Link}
            to="/registroUsuario/asistenteVentas/formularioDeRegistro"
            icon={<FileTextOutlined />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="documentosContractuales" />}
            component={Link}
            to="/registroUsuario/asistenteVentas/documentosContractuales"
            icon={<ContainerOutlined />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default AccountProfile;
