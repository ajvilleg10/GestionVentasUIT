import { ContainerOutlined, FileTextOutlined } from '@ant-design/icons';
import { Box, Grid, Tab, Tabs } from '@mui/material'
import MainCard from 'components/MainCard'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ReunionPersonalSemanal = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  let selectedTab = 0;
  switch (pathname) {
    case '/reunionPersonalSemanalJefeVentas/rps/pendientes':
      selectedTab = 0;
      break;
    case '/reunionPersonalSemanalJefeVentas/rps/cerradas':
      selectedTab = 1;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  useEffect(() => {
    if (selectedTab === 0) {
      navigate('/reunionPersonalSemanalJefeVentas/rps/pendientes', {
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
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard border={false} boxShadow>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
                <Tab
                  label={'Pendientes'}
                  component={Link}
                  to="/reunionPersonalSemanalJefeVentas/rps/pendientes"
                />
                <Tab
                  label={'Cerradas'}
                  component={Link}
                  to="/reunionPersonalSemanalJefeVentas/rps/cerradas"
                />
              </Tabs>
            </Box>
            <Box sx={{ mt: 2.5 }}>
              <Outlet />
            </Box>
          </MainCard>

        </Grid>

      </Grid>
    </>
  )
}

export default ReunionPersonalSemanal