// material-ui


// project import
import MainCard from 'components/MainCard';
import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, List, Select, MenuItem } from '@mui/material';

import ApexRadialChart from 'sections/charts/apexchart/ApexRadialChart';
import AcquisitionChart from 'sections/dashboard/analytics/AcquisitionChart';
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';
import ApexBarChart from 'sections/charts/apexchart/ApexBarChart';




// ==============================|| SAMPLE PAGE ||============================== //

const DashboardCEO = () => (
  <MainCard title="Dashboard">
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} >
        <div style={{ marginBottom: '10px' }}>
          <label> Ingresos</label>
        </div>
        <Select defaultValue="Hola">
          <MenuItem key={0} value={0}>
            Venta Nueva
          </MenuItem>
          <MenuItem key={1} value={1}>
            Renovación
          </MenuItem>
          <MenuItem key={2} value={2}>
            Todo
          </MenuItem>
        </Select>
        <ApexPieChart />

      </Grid>
      <Grid item xs={12} sm={4} >
        <div style={{ marginBottom: '10px' }}>
          <label> Egresos </label>
        </div>
        <Select defaultValue="Hola">
          <MenuItem key={0} value={0}>
            Gestion Venta
          </MenuItem>
          <MenuItem key={1} value={1}>
            Volumen Venta
          </MenuItem>
          <MenuItem key={2} value={2}>
            Nomina
          </MenuItem>
          <MenuItem key={3} value={3}>
            Todo
          </MenuItem>
        </Select>
        <ApexPieChart  />

      </Grid>
      <Grid item xs={12} sm={4}>
        <div style={{ marginBottom: '10px' }}>
          <label> Balance </label>
        </div>
        <Select defaultValue="Hola">
          <MenuItem key={0} value={0}>
            Venta Nueva
          </MenuItem>
          <MenuItem key={1} value={1}>
            Renovación
          </MenuItem>
          <MenuItem key={2} value={2}>
            Todo
          </MenuItem>
        </Select>

        <ApexPieChart  />

      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} >
        
        <ApexBarChart />

      </Grid>
      <Grid item xs={12} sm={4} >
        
        <ApexBarChart  />

      </Grid>
      <Grid item xs={12} sm={4}>
        

        <ApexBarChart  />

      </Grid>
    </Grid>
  </MainCard>
);

export default DashboardCEO;
