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
    case '/registro/prospectos/descripcionGeneral':
      selectedTab = 0;
      break;
    case '/registro/prospectos/formularioDeRegistro':
      selectedTab = 1;
      break;
    case '/registro/prospectos/documentosContractuales':
      selectedTab = 2;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {
    if (selectedTab === 0) {
      navigate('/registro/prospectos/descripcionGeneral', {
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
            to="/registro/prospectos/descripcionGeneral"
            icon={<UserOutlined style={{ fontSize: '2em' }} />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="formularioDeRegistro" />}
            component={Link}
            to="/registro/prospectos/formularioDeRegistro"
            icon={<FileTextOutlined style={{ fontSize: '2em' }} />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="documentosContractuales" />}
            component={Link}
            to="/registro/prospectos/documentosContractuales"
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
