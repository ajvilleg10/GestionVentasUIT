import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
// import { FormattedMessage } from 'react-intl';

// assets
import { ContactsOutlined, ShoppingOutlined, FileDoneOutlined, UserAddOutlined, CalendarOutlined } from '@ant-design/icons';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const ContactoDetailsTables = ({ contactId }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let selectedTab = 0;
  switch (pathname) {
    case '/contactos/descripcionGeneral':
      selectedTab = 0;
      break;
    case '/contactos/citas':
      selectedTab = 1;
      break;
    case '/contactos/referidos':
      selectedTab = 2;
      break;
    case '/contactos/cotizaciones':
      selectedTab = 3;
      break;
    case '/contactos/contratos':
      selectedTab = 4;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {
    if (selectedTab === 0) {
      navigate('/contactos/contactosTelefonicos', {
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
            label={'Gestion de Contactos'}
            component={Link}
            to="/contactos/contactosTelefonicos"
            icon={<ContactsOutlined style={{ fontSize: '1.3rem' }} />}
            iconPosition="start"
            initialParams={{contact: contactId}}
          />
          <Tab label={'Citas'} component={Link} to="/contactos/citas" icon={<CalendarOutlined style={{ fontSize: '1.3rem' }} />} iconPosition="start" />
          <Tab label={'Referidos'} component={Link} to="/contactos/referidos" icon={<UserAddOutlined style={{ fontSize: '1.3rem' }}/>} iconPosition="start" />
          <Tab label={'Cotizaciones'} component={Link} to="/contactos/cotizaciones" icon={<ShoppingOutlined style={{ fontSize: '1.3rem' }} />} iconPosition="start" />
          <Tab label={'Contratos'} component={Link} to="/contactos/contratos" icon={<FileDoneOutlined style={{ fontSize: '1.3rem' }} />} iconPosition="start" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default ContactoDetailsTables;
