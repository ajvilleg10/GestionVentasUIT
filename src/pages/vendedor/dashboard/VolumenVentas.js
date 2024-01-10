import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, List, Typography, Select, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ApexColumnChart from 'sections/charts/apexchart/ApexColumnChart.js'
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';
import AcquisitionChart from 'sections/dashboard/analytics/AcquisitionChart';
import RoundIconCard from 'components/statistics/RoundIconCard';
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import VentasBarChart from 'sections/charts/VentasBarChart';
import { fill } from 'lodash';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
const today = dayjs();




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
    categories: ['Proyecto 100', 'Referidos', 'RCS', 'TOTAL']
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
      fillColors: ['#E8E147', '#6B9AF2', '#F2796B'],
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8,

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
const columnChartOptions4 = {
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
      fillColors: ['#E8E147', '#6B9AF2', '#F2796B'],
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

const serie7 = [
  {
    name: 'Contratos Activos',
    data: [44, 55, 57, 50, 48, 53]
  },
  {
    name: 'Contratos Inactivos',
    data: [76, 85, 101, 90, 88, 79]
  },
  {
    name: 'Volumen de Ventas',
    data: [35, 41, 36, 30, 0, 0]
  }
];


const VolumenVentas = () => (

  <>

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3}>
            <Grid item display="flex" alignItems="start">
              <DatePicker label={'Seleccione un año'} openTo="year" views={['year']} defaultValue={today} minDate={dayjs("2023-05-01T00:00:00.000Z")} />
            </Grid>
            <Grid item display="flex" alignItems="start">
              <DatePicker label={'Seleccione un mes'} openTo="month" views={['month']} defaultValue={today} />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <form >
          <List sx={{ py: 0 }} dense>

            <Box mt={2}>
              <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody>
                    <TableRow style={{ height: "auto" }}>
                      <TableCell style={{ width: '25%', height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                          <Typography align='center' justifyItems='center'>
                            <Typography align='center' style={{ color: 'blue' }} justifyItems='center'>
                              Ventas Nuevas
                            </Typography >
                            <Typography align='center' style={{ color: 'black' }} justifySelf={'center'}>
                              Mes
                            </Typography>
                            <Typography variant='h3' align='center' justifySelf={'center'}>
                              $9000
                            </Typography>
                            <Typography align='center' justifySelf={'center'}>
                              contratos 10
                            </Typography>
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: 'red' }}>
                              Contratos Inactivos
                            </Typography>
                            <Typography align='center' style={{ color: 'black' }}>
                              Mes
                            </Typography>
                            <Typography variant='h3' align='center'>
                              $3,000
                            </Typography>
                            <Typography align='center'>
                              contratos 5
                            </Typography>
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: '#F1C40F' }}>
                              Ventas Nuevas Reales
                            </Typography>
                            Mes
                          </Typography>
                          <Typography variant='h3' align='center'>
                            $6,000
                          </Typography>
                          <Typography align='center'>
                            contratos 5
                          </Typography>

                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            Mensual
                          </Typography>
                          <Typography variant="h5" align='center'>
                            Nivel 1
                          </Typography>
                          <LinearWithLabel value={50} color="primary" />
                          <Typography align='center'>
                            Meta Nivel 1  $6000
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center' style={{ color: 'blue' }} justifyItems='center'>
                            Renovaciones
                          </Typography>
                          Mes
                          <Typography variant='h3' align='center'>
                            $3,000
                          </Typography>
                          <Typography align='center'>
                            contratos 5
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: '#C0392B ' }}>
                              Contratos Inactivos
                            </Typography>
                            Mes
                          </Typography>
                          <Typography variant='h3' align='center'>
                            $3,000
                          </Typography>
                          <Typography align='center'>
                            contratos 5
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: '#D4AC0D' }}>
                              Renovaciones Reales
                            </Typography>
                            Mes
                          </Typography>
                          <Typography variant='h3' align='center'>
                            $5,000
                          </Typography>
                          <Typography align='center'>
                            contratos 10
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: 'blue' }}>
                              Contratos x Renovar
                            </Typography>
                            Mensual
                          </Typography>
                          <Typography variant="h5" align='center'>
                            8
                          </Typography>
                          <LinearWithLabel value={50} color="primary" />
                          <Typography align='center'>
                            Meta 10
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: 'blue' }}>
                              Volumen de Ventas
                            </Typography>
                            Mes
                          </Typography>
                          <Typography variant='h3' align='center'>
                            $8,000
                          </Typography>
                          <Typography align='center'>
                            contratos 10
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: 'red' }}>
                              Contratos Inactivos
                            </Typography>
                            Mes
                          </Typography>
                          <Typography variant='h3' align='center'>
                            $3,000
                          </Typography>
                          <Typography align='center'>
                            contratos 5
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: '#F1C40F' }}>
                              Volumen de Ventas Reales
                            </Typography>
                            Mes
                          </Typography>
                          <Typography variant='h3' align='center'>
                            $8,000
                          </Typography>
                          <Typography align='center'>
                            contratos 10
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: '25%', overflow: true, height: '175px', border: '40px solid #c1e6df', background: '#c1e6df', padding: 0, justifyItems: 'center', justifySelf: 'center' }}>
                        <Grid sx={{ borderRadius: '10%', background: 'white', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                          <Typography align='center'>
                            <Typography align='center' style={{ color: 'blue' }}>
                              Bonificación
                            </Typography>
                            Mensual
                          </Typography>
                          <Typography variant="h5" align='center'>
                            Nivel 0
                          </Typography>
                          <LinearWithLabel value={50} color="primary" />
                          <Typography align='center'>
                            Meta n1 $6,000
                          </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: '75%', height: '30px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <Typography style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}> Ventas por Origen </Typography>
                        {/*<ApexColumnChart opciones={columnChartOptions2} series={serie2} height={350} />*/}
                        <Grid overflow={'auto'}>
                          <VentasBarChart />
                        </Grid>
                      </TableCell>
                      <TableCell style={{
                        width: '25%', height: '30px', border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', alignItems: 'flex-start', justifyContent: 'flex-start'
                      }}>
                        <Grid sx={{ width: '100%', height: '100%', display: 'flex', alignContent: 'space-between', flexDirection: 'column', justifyContent: 'space-between' }}>
                          < Typography style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}> Ley de Compensación </Typography>
                          <AcquisitionChart opciones={barChartOptions3} series={serie6} type="bar" height={350} />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ border: '40px solid #c1e6df', borderTop: '0px solid #c1e6df', }}>
                        <div>
                          <label> Ventas </label>
                          {/*<ApexColumnChart opciones={columnChartOptions4} series={serie7} height={350} />*/}
                          <Grid overflow={'auto'}>
                            <VentasBarChart />
                          </Grid>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
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
            </Box>
          </List>
        </form>
      </Grid>
    </Grid >
  </>
);
export default VolumenVentas;

