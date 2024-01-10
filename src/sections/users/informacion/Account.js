import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import { FormattedMessage } from 'react-intl';
import { ContainerOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';

const AccountProfile = ({ tab }) => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  let selectedTab = tab;

  switch (pathname) {
    case '/informacion/descripcionGeneral':
      selectedTab = 0;
      break;
    case '/informacion/informacionDeRegistro':
      selectedTab = 1;
      break;
    case '/informacion/documentosContractuales':
      selectedTab = 2;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {

    if (selectedTab === 0) {
      navigate('/informacion/descripcionGeneral', {
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
            to="/informacion/descripcionGeneral"
            icon={<UserOutlined style={{ fontSize: '2em' }} />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="informacionDeRegistro" />}
            component={Link}
            to="/informacion/informacionDeRegistro"
            icon={<FileTextOutlined style={{ fontSize: '2em' }} />}
            iconPosition="start"
          />
          <Tab
            label={<FormattedMessage id="documentosContractuales" />}
            component={Link}
            to="/informacion/documentosContractuales"
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
