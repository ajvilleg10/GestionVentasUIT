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
    case '/admin/registro/usuarios/descripcionGeneral':
      selectedTab = 0;
      break;
    case '/admin/registro/usuarios/formularioDeRegistro':
      selectedTab = 1;
      break;
    case '/admin/registro/usuarios/documentosContractuales':
      selectedTab = 2;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {

    if (selectedTab === 0) {
      navigate('/admin/registro/usuarios/descripcionGeneral', {
        state: {
          from: '/admin/registro/usuarios'
        },
        replace: false
      });
    }

  }, [navigate, selectedTab]);

  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={(_, value) => setValue(value)} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
          <Tab
            label={<FormattedMessage id="descripcionGeneral" />}
            component={Link}
            to="/admin/registro/usuarios/descripcionGeneral"
            icon={<UserOutlined style={{ fontSize: '2em' }} />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="formularioDeRegistro" />}
            component={Link}
            to="/admin/registro/usuarios/formularioDeRegistro"
            icon={<FileTextOutlined style={{ fontSize: '2em' }} />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="documentosContractuales" />}
            component={Link}
            to="/admin/registro/usuarios/documentosContractuales"
            icon={<ContainerOutlined style={{ fontSize: '2em' }} />}
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
