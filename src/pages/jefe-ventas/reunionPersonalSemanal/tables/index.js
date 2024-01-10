import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { ContainerOutlined, FileTextOutlined } from '@ant-design/icons';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const ReunionPersonalSemanalTables = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let selectedTab = 0;
  switch (pathname) {
    case '/reunionPersonalSemanalJefeVentas/asistencia':
      selectedTab = 0;
      break;
    case '/reunionPersonalSemanalJefeVentas/actaMejoramiento':
      selectedTab = 1;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {
    if (selectedTab === 0) {
      navigate('/reunionPersonalSemanalJefeVentas/asistencia', {
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
            label={'Asistencia'}
            component={Link}
            to="/reunionPersonalSemanalJefeVentas/asistencia"
            icon={<FileTextOutlined />}
            iconPosition="start"
          />
          <Tab
            label={'Acta Mejoramiento'}
            component={Link}
            to="/reunionPersonalSemanalJefeVentas/actaMejoramiento"
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

export default ReunionPersonalSemanalTables;
