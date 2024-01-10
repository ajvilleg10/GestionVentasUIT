import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| ACQUISITION-CHANNELS CHART ||============================== //

const AcquisitionChart = ({ opciones, series, height }) => {
  const theme = useTheme();
  const line = theme.palette.divider;
  const { primary, secondary } = theme.palette.text;

  const { mode } = useConfig();

  // chart options
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

  const [chartOptions, setChartOptions] = useState({...opciones});
  const [chartSeries] = useState(series);
  useEffect(() => {
    setChartOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.grey[900], theme.palette.primary.main, theme.palette.primary[200]],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  return <ReactApexChart options={chartOptions} series={series} type="bar" height={height} />;
};

export default AcquisitionChart;
