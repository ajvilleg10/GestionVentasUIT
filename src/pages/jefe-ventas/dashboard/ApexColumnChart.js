import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';




// ==============================|| APEXCHART - COLUMN ||============================== //

const ApexColumnChart = ({ opciones, series, height, barColors }) => {
  console.log("Cateogrias que recibe Apex", opciones);
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.grey[200];

  const secondary = theme.palette.primary[100];
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.main;

  const [chartOptions, setChartOptions] = useState({ ...opciones });
  const [chartSeries, setChartSeries] = useState(series);

  useEffect(() => {
    setChartOptions((prevState) => ({
      ...prevState,
      colors: [secondary, primaryMain, successDark],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        },
        categories: opciones.xaxis.categories
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
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      },
      plotOptions: {
        bar: {
          horizontal: opciones.plotOptions.bar.horizontal,
          columnWidth: opciones.plotOptions.bar.columnWidth,
          endingShape: opciones.plotOptions.bar.endingShape,
        },
    }
    }));
  }, [mode, primary, line, grey200, secondary, primaryMain, successDark, opciones]);

  useEffect(() => {
    setChartSeries(series);
  }, [series]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={height} />
    </Box>
  );
};
export default ApexColumnChart ;