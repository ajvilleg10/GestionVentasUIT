import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';


// chart options
const pieChartOptions = {
  chart: {
    type: 'pie',
    width: 10000,
    height: 800
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      radius: 5
    },
    itemMargin: {
      horizontal: 25,
      vertical: 4
    }
  },
  responsive: [
    {
      breakpoint: 450,
      chart: {
        width: 300,
        height: 300
      },
      options: {
        legend: {
          show: false,
          position: 'bottom'
        }
      }
    }
  ]
};

const series = [44, 55, 13, 43, 22];

// ==============================|| APEXCHART - PIE ||============================== //

const ApexPieChart = (props) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.grey[200];
  const backColor = theme.palette.background.paper;

  const [series] = useState([]);
  const [options, setOptions] = useState(props.pieChartOptions || pieChartOptions);

  const secondary = theme.palette.primary[700];
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.main;
  const error = theme.palette.error.main;
  const orangeDark = theme.palette.warning.main;


  useEffect(() => {
    console.log(props.initialSeries)
    console.log(props.pieChartOptions)
    setOptions((prevState) => ({
      ...prevState,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 1,
        style: {
          fontSize: '70%',
          colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
        },
      },
      colors: [secondary, primaryMain, successDark, error, orangeDark],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      },
      stroke: {
        colors: [backColor]
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, line, grey200, backColor, secondary, primaryMain, successDark, error, orangeDark]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={props.initialSeries} type="donut" />
    </Box>
  );
};

ApexPieChart.propTypes = {
  pieChartOptions: PropTypes.object.isRequired,
  initialSeries: PropTypes.array.isRequired,
};


ApexPieChart.defaultProps = {
  pieChartOptions: pieChartOptions,
  initialSeries: series,
};

export default ApexPieChart;
