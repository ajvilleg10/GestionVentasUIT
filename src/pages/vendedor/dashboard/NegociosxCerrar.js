// material-ui


// project import
import MainCard from 'components/MainCard';
import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, List, ListItemText, Typography, ListItemSecondaryAction, Stack } from '@mui/material';

import ApexRadialChart from 'sections/charts/apexchart/ApexRadialChart';
import AcquisitionChart from 'sections/dashboard/analytics/AcquisitionChart';
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';




// ==============================|| SAMPLE PAGE ||============================== //
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 250,
    width: '100%',
    stacked: true,
    toolbar: {
      show: false
    }
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false
    }
  },
  tooltip: {
    x: {
      show: false
    }
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'left',
    offsetX: 10,
    markers: {
      width: 8,
      height: 8,
      radius: '50%'
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    show: false
  },
  stroke: {
    colors: ['transparent'],
    width: 1
  }
};
const serie4 = [
  {
    name: 'Direct',
    data: [44, 55, 57, 55, 50, 52, 49]
  },
  {
    name: 'Referal',
    data: [76, 85, 101, 99, 87, 95, 105]
  },
  {
    name: 'Social',
    data: [35, 41, 36, 34, 42, 40, 39]
  }
];
const NegociosxCerrar = () => (
  <MainCard title="Dashboard">
    <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df' }}>
              <div>
                <label> NxC Plan </label>
              </div>
              <ApexPieChart />
            </TableCell>
            <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df' }}>
              <div>
                <label> Subtipo Plan </label>
              </div>
              <div>
                <AcquisitionChart opciones={barChartOptions} series={serie4} type="bar" height={250} />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <ListItemText primary={<Typography variant="subtitle1">Top Channels</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  
                </Stack>
              </ListItemSecondaryAction>

            </TableCell>
            <TableCell>
              <ListItemText primary={<Typography variant="subtitle1">Top Pages</Typography>} secondary="Today, 2:00 AM" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </MainCard>
);

export default NegociosxCerrar;
