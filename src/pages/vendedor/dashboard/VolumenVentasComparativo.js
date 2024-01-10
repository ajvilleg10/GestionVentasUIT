import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, List, Typography, Select, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ApexColumnChart from 'sections/charts/apexchart/ApexColumnChart.js';
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';
import AcquisitionChart from 'sections/dashboard/analytics/AcquisitionChart';
import AnalyticEcommerce from 'components/statistics/AnalyticEcommerce';
import RoundIconCard from 'components/statistics/RoundIconCard';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { color } from 'framer-motion';
import { blue, red } from '@ant-design/colors';
import VentasBarChart from 'sections/charts/VentasBarChart';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
const today = dayjs();
const colores1 = ['yellow', 'red', 'blue'];

const serie6 = [
  {
    name: 'Direct',
    data: [57, 0]
  },
  {
    name: 'Referal',
    data: [99, 0]
  },
  {
    name: 'Social',
    data: [34, 0]
  }
];

const barChartOptions3 = {
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
      radius: '50%',
      fillColors: ['#000000', '#398BFF', '#A1D2FF'],
    },
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
  },
  fill: {
    opacity: 1,
    colors: ['#000000', '#398BFF', '#A1D2FF']
  },
};

const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Proyecto 100', 'Referidos', 'BCS', 'TOTAL']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1,
    colors: ['#E8E147', '#6B9AF2', '#F2796B']
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    position: 'bottom',
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5,
      fillColors: ['#E8E147', '#6B9AF2', '#F2796B']
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};
const serie = [
  {
    name: 'Contratos Activos',
    data: [44, 55, 57, 56]
  },
  {
    name: 'Contratos Inactivos',
    data: [76, 85, 101, 98]
  },
  {
    name: 'Volumen de ventas',
    data: [35, 41, 36, 26]
  }
];
const columnChartOptions2 = {
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1,
    colors: ['#E8E147', '#6B9AF2', '#F2796B']
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    position: 'bottom',
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5,
      fillColors: ['#E8E147', '#6B9AF2', '#F2796B']
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};
const serie2 = [
  {
    name: 'Contratos Activos',
    data: [44, 55, 57, 56, 60, 48]
  },
  {
    name: 'Contratos Inactivos',
    data: [76, 85, 101, 98, 105, 88]
  },
  {
    name: 'Volumen de ventas',
    data: [35, 41, 36, 26, 45, 38]
  }
];
const columnChartOptions3 = {
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1,
    colors: ['#E8E147', '#6B9AF2', '#F2796B']
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    position: 'bottom',
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5,
      fillColors: ['#E8E147', '#6B9AF2', '#F2796B']
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};
const serie3 = [
  {
    name: 'Contratos Activos',
    data: [44, 55, 57, 56, 60, 48]
  },
  {
    name: 'Contratos Inactivos',
    data: [76, 85, 101, 98, 105, 88]
  },
  {
    name: 'Volumen de ventas',
    data: [35, 41, 36, 26, 45, 38]
  }
];
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



const VolumenVentasComparativo = () => (
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        <Grid item display="flex" alignItems="start">
          <DatePicker label={'Seleccione un mes'} openTo="month" views={['month']} defaultValue={today} />
        </Grid>
        <Grid item display="flex" alignItems="start">
          <Select defaultValue='Todos' label={'Seleccione un valor'}>
            <MenuItem key={0} value={0}>Individual</MenuItem>
            <MenuItem key={1} value={1}>Grupal</MenuItem>
            <MenuItem key={2} value={2}>Todos</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </LocalizationProvider>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form >
          <List sx={{ py: 0 }} dense>
            <Box mt={2}>
              <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody style={{ border: '0px' }}>
                    <TableRow >
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#F1C40F', borderColor: 'black' }}>
                                Ventas Nuevas Netas
                              </Typography>
                              <Typography variant='h2' align='center'>
                                $6,000
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 5
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#F1C40F', borderColor: 'black' }}>
                                Ventas Nuevas Netas
                              </Typography>
                              <Typography variant='h2' align='center'>
                                $12,000
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 5
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#F1C40F', borderColor: 'black' }}>
                                Proporción
                              </Typography>
                              <Typography variant='h2' align='center' style={(200 > 100 ? { color: 'blue' } : { color: 'red' })}>
                                200%
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 100%
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#CA6F1E ' }}>
                                Renovación Netas
                              </Typography>
                              <Typography variant='h2' align='center'>
                                $5,000
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 5
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#CA6F1E ' }}>
                                Renovaciones Netas
                              </Typography>
                              <Typography variant='h2' align='center'>
                                $3,000
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 2
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#CA6F1E ' }}>
                                Proporción
                              </Typography>
                              <Typography variant='h2' align='center' style={(60 > 100 ? { color: blue } : { color: 'red' })}>
                                60%
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 40%
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#F1C40F' }}>
                                Volumen Ventas Netas
                              </Typography>
                              <Typography variant='h2' align='center'>
                                $3,264
                              </Typography>
                              <Typography variant='h5' align='center'>
                                Nivel 1-20%
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#F1C40F' }}>
                                Renovaciones Netas
                              </Typography>
                              <Typography variant='h2' align='center'>
                                $3,000
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 2
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '33.33%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0 }}>
                          <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                            <Typography align='center' justifyItems='center'>
                              <Typography variant='h4' align='center' style={{ color: '#F1C40F' }}>
                                Proporción
                              </Typography>
                              <Typography variant='h2' align='center' style={(136 > 100 ? { color: 'blue' } : { color: 'red' })}>
                                136%
                              </Typography>
                              <Typography variant='h5' align='center'>
                                contratos 70%
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>

                  </TableBody >
                </Table >
              </TableContainer >
              <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: '66.66%', height: '30px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <Typography style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}> Ventas por Origen </Typography>
                        {/*<ApexColumnChart opciones={columnChartOptions2} series={serie2} height={350} />*/}
                        <Grid overflow={'auto'}>
                          <VentasBarChart />
                        </Grid>
                      </TableCell>
                      <TableCell style={{
                        width: '33.33%', height: '30px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', alignItems: 'flex-start', justifyContent: 'center'
                      }}>
                        <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0, flexDirection: 'column' }}>
                          <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0, }}>
                            <RoundIconCard primary="Promedio Contrato Activos" secondary="$800" />
                          </Grid>
                          <Grid sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: 0, }}>
                            <RoundIconCard primary="Promedio Contrato Activos" secondary="$800" />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ width: '60%' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: '66.66%', height: '30px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <Typography style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}> Ventas </Typography>
                        {/*<ApexColumnChart opciones={columnChartOptions2} series={serie2} height={350} />*/}
                        <Grid overflow={'auto'}>
                          <VentasBarChart />
                        </Grid>
                        <Grid overflow={'auto'}>
                          <VentasBarChart />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ width: '60%' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <label >Ventas por Plan</label>
                        <div style={{ textAlign: 'right' }}>
                          <label >Filtro: </label>

                          <Select defaultValue='Hola' >
                            <MenuItem key={0} value={0}>Venta Nueva</MenuItem>
                            <MenuItem key={1} value={1}>Renovación</MenuItem>
                            <MenuItem key={2} value={2}>Todo</MenuItem>
                          </Select>
                        </div>
                        <ApexPieChart />
                      </TableCell>
                      <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <Grid sx={{ width: '100%', height: '100%', display: 'flex', alignContent: 'space-between', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <label> Subtipo Plan </label>
                          </div>
                          <div>
                            <AcquisitionChart opciones={barChartOptions} series={serie4} type="bar" height={250} />
                          </div>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ width: '60%' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <label >Ventas por Plan</label>
                        <div style={{ textAlign: 'right' }}>
                          <label >Filtro: </label>

                          <Select defaultValue='Hola' >
                            <MenuItem key={0} value={0}>Venta Nueva</MenuItem>
                            <MenuItem key={1} value={1}>Renovación</MenuItem>
                            <MenuItem key={2} value={2}>Todo</MenuItem>
                          </Select>
                        </div>
                        <ApexPieChart />
                      </TableCell>
                      <TableCell style={{ width: '50%', height: '300px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <Grid sx={{ width: '100%', height: '100%', display: 'flex', alignContent: 'space-between', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <label> Subtipo Plan </label>
                          </div>
                          <div>

                            <AcquisitionChart opciones={barChartOptions} series={serie4} type="bar" height={250} />
                          </div>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box >
          </List >
        </form >
      </Grid >
    </Grid >
  </>
);
export default VolumenVentasComparativo;
