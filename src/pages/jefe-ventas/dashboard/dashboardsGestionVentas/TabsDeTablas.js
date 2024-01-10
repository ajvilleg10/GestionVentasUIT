import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TablaContactoCitasReferidas from './TablaContactoCitasReferidas';
import TablaCsgRpsCqvCmv from './TablaCsgRpsCqvCmv';
import TablaReclutamiento from './TablaReclutamiento';
import TablaAcompanamientoCitas from './TablaAcompanamientoCitas';
import MainCard from 'components/MainCard';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsDeTablas( {datosTablas}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard border={false} boxShadow>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tabla Contactos" {...allyProps(0)} />
          <Tab label="Tabla Indicadores" {...allyProps(1)} />
          <Tab label="Tabla Reclutamiento" {...allyProps(2)} />
          <Tab label="Tabla Acompañamiento Citas" {...allyProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TablaContactoCitasReferidas data={datosTablas.dataTablaContactos}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TablaCsgRpsCqvCmv data= {datosTablas.dataIndicadores}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TablaReclutamiento data= {datosTablas.dataTablaReclutamiento}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <TablaAcompanamientoCitas data= {datosTablas.dataTablaAcompanamiento}/>
      </CustomTabPanel>
    </Box>
    </MainCard>
  );
}




