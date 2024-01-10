// material-ui


// project import
import MainCard from 'components/MainCard';
import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, List } from '@mui/material';

import ApexRadialChart from 'sections/charts/apexchart/ApexRadialChart';
import AcquisitionChart from 'sections/dashboard/analytics/AcquisitionChart';
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';




// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () => (
  <MainCard title="Dashboard">
    <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df' }}>
              <ApexPieChart />
            </TableCell>
            <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df' }}>
              <ApexPieChart />
            </TableCell>
            <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df' }}>
              <ApexPieChart />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </MainCard>
);

export default Dashboard;
