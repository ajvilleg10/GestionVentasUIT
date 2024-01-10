// material-ui
import { Typography } from '@mui/material';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, List, TableHead } from '@mui/material';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { useGestionVentas } from 'hooks/vendedor/useDashboards';
import { useEffect } from 'react';
import ApexColumnChart from 'sections/charts/apexchart/ApexColumnChart.js';
import AcquisitionChart from 'sections/dashboard/analytics/AcquisitionChart';
// project import
const colores1 = ['yellow', 'red', 'blue'];
const headCells = [
  {
    id: 'semana',
    align: 'center',
    disablePadding: false,
    label: 'semana'
  },
  {
    id: 'contactoTelefonico',
    align: 'center',
    disablePadding: true,
    label: 'Contacto Telefonico'
  },
  {
    id: 'citas_obtenidas',
    align: 'center',
    disablePadding: false,
    label: 'Citas nuevas obtenidas'
  },
  {
    id: 'citas_nuevas_concreatadas',
    align: 'center',
    disablePadding: false,
    label: 'Citas  nuevas concretadas'
  },
  {
    id: 'citas_cierre_concretada',
    align: 'center',
    disablePadding: false,
    label: 'Citas de cierre concretadas'
  },

  {
    id: 'negocios_cerrar',
    align: 'center',
    disablePadding: false,
    label: 'Negocios x cerrar'
  },
  {
    id: 'referidos',
    align: 'center',
    disablePadding: false,
    label: 'Referidos Obtenidos'
  },
  {
    id: 'asistecia',
    align: 'center',
    disablePadding: false,
    label: 'Asistencia Puntual RPS CPQ CMV'
  },
  {
    id: 'puntaje',
    align: 'center',
    disablePadding: false,
    label: 'Puntaje Horarios De Citas'
  }

];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
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

const serie = [
  {
    name: 'Contratos Activos',
    data: [44, 55, 57, 56, 50, 60]
  },
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


const GestionVentas = () => {

  const { gestionesBack, fetchGestiones } = useGestionVentas({ anio: '2023', mes: '1' });

  useEffect(() => {
    console.log(gestionesBack);
  }, [gestionesBack]);

  return (
    <Box mt={2}>
      <TableContainer sx={{ width: '60%', overflowX: 'auto' }} style={{ width: '100%' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center'>
                  <Typography align='center' style={{ color: 'blue' }}>
                    Contactos Telefonicos
                  </Typography>
                  |30
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>

              </TableCell>

              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center'>
                  <Typography align='center' style={{ color: '#1ABC9C' }}>
                    Citas Nuevas Obtenidas
                  </Typography>
                  |30
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>

              </TableCell>

              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center'>
                  <Typography align='center' style={{ color: 'blue' }}>
                    Citas Nuevas Concretadas
                  </Typography>
                  |30
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>

              </TableCell>
              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center'>
                  <Typography align='center' style={{ color: 'blue' }}>
                    Negocios Por Cerrar
                  </Typography>
                  |18
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>
                <Typography align='center'>
                  $34,400

                </Typography>

              </TableCell>

            </TableRow>
            <TableRow>
              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center'>
                  <Typography align='center' style={{ color: 'blue' }}>
                    Citas Cierre Concretada
                  </Typography>
                  |18
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>
                <Typography align='center'>
                  $22,500

                </Typography>
              </TableCell>
              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center'>
                  <Typography align='center' style={{ color: 'blue' }}>
                    Referidos
                  </Typography>
                  |30
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>

              </TableCell>

              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center' style={{ color: '#F1C40F' }}>
                  Asistencia Puntal RPS CQV CMV

                </Typography>
                <Typography align='center'>
                  RPS     visto
                </Typography>
                <Typography align='center'>
                  CPQ    cruz
                </Typography>
                <Typography align='center'>
                  CMV   visto
                </Typography>

              </TableCell>

              <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
                <Typography align='center' style={{ color: 'blue' }}>
                  Horarios y Citas
                </Typography>

                <Typography variant="h5" align='center'>
                  Nivel 0
                </Typography>

                <LinearWithLabel value={50} color="primary" />

                <Typography align='center'>
                  Meta Nivel 1     35

                </Typography>
              </TableCell>

            </TableRow>


          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
        <Table>
          <OrderTableHead />
          <TableBody>
            <TableRow>
              <TableCell align='center'>
                <label>3</label>
              </TableCell>
              <TableCell align='center'>
                <label>15</label>
              </TableCell>
              <TableCell align='center'>
                <label>10</label>
              </TableCell>
              <TableCell align='center'>
                <label>8</label>
              </TableCell>
              <TableCell align='center'>
                <label>5   $3000</label>
              </TableCell>
              <TableCell align='center'>
                <label>3   $1800</label>
              </TableCell>
              <TableCell align='center'>
                <label>2D</label>
              </TableCell>
              <TableCell align='center'>
                <label>visto</label>
              </TableCell>
              <TableCell align='center'>
                <label>3D</label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                <label>3</label>
              </TableCell>
              <TableCell align='center'>
                <label>15</label>
              </TableCell>
              <TableCell align='center'>
                <label>10</label>
              </TableCell>
              <TableCell align='center'>
                <label>8</label>
              </TableCell>
              <TableCell align='center'>
                <label>5   $3000</label>
              </TableCell>
              <TableCell align='center'>
                <label>3   $1800</label>
              </TableCell>
              <TableCell align='center'>
                <label>2D</label>
              </TableCell>
              <TableCell align='center'>
                <label>visto</label>
              </TableCell>
              <TableCell align='center'>
                <label>3D</label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                <label>3</label>
              </TableCell>
              <TableCell align='center'>
                <label>15</label>
              </TableCell>
              <TableCell align='center'>
                <label>10</label>
              </TableCell>
              <TableCell align='center'>
                <label>8</label>
              </TableCell>
              <TableCell align='center'>
                <label>5   $3000</label>
              </TableCell>
              <TableCell align='center'>
                <label>3   $1800</label>
              </TableCell>
              <TableCell align='center'>
                <label>2D</label>
              </TableCell>
              <TableCell align='center'>
                <label>visto</label>
              </TableCell>
              <TableCell align='center'>
                <label>3D</label>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
        <Table>
          <TableRow>
            <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
              <ApexColumnChart opciones={columnChartOptions} series={serie} height={350} barColors={colores1} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ width: '100px', height: '100px', border: '40px solid #c1e6df' }}>
              <AcquisitionChart opciones={barChartOptions} series={serie4} type="bar" height={250} />
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>


    </Box>

  )
}
export default GestionVentas;
