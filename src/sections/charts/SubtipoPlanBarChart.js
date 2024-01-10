import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useConfig from 'hooks/useConfig';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import { Box, Stack, Select, MenuItem} from '@mui/material';
import MainCard from 'components/MainCard';

const SubtipoPlanBarChart = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const [legend, setLegend] = useState({
    email: true,
    mensajesWhatsapp: true,
    llamadaWhatsapp: true,
    llamadaTelefonica: true,
  });

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
        show: true
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

  const [timeScale, setTimeScale] = useState("semana");
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(barChartOptions); // Definir options como un estado

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const handleTimeScaleChange = (event) => {
    setTimeScale(event.target.value);
  };

  const getChartData = (timeScale) => {
    const data = {
      semana: {
        email: [21, 17, 15, 13, 15, 13, 16, 13, 8, 14, 11, 9, 7, 5, 3, 3, 7],
        mensajesWhatsapp: [28, 30, 20, 26, 18, 27, 22, 28, 20, 21, 15, 14, 12, 10, 8, 18, 16],
        llamadaWhatsapp: [50, 51, 60, 54, 53, 48, 55, 40, 44, 42, 44, 44, 42, 40, 42, 32, 16],
        llamadaTelefonica: [1, 2, 5, 7, 14, 12, 7, 19, 28, 23, 30, 33, 39, 45, 47, 47, 59],
      },
      mes: {
        email: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 0],
        mensajesWhatsapp: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
        llamadaWhatsapp: [130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20],
        llamadaTelefonica: [140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30],
      },
      trimestre: {
        email: [350, 330, 310, 290],
        mensajesWhatsapp: [380, 360, 340, 320],
        llamadaWhatsapp: [410, 390, 370, 350],
        llamadaTelefonica: [450, 430, 410, 390],
      },
      semestre: {
        email: [700, 650],
        mensajesWhatsapp: [720, 680],
        llamadaWhatsapp: [750, 710],
        llamadaTelefonica: [800, 760],
      },
    };

    return [
      {
        name: 'E-mail',
        data: legend.email ? data[timeScale].email : [],
      },
      {
        name: 'Mensajes Whatsapp',
        data: legend.mensajesWhatsapp ? data[timeScale].mensajesWhatsapp : [],
      },
      {
        name: 'Llamada Whatsapp',
        data: legend.llamadaWhatsapp ? data[timeScale].llamadaWhatsapp : [],
      },
      {
        name: 'Llamada Telefonica',
        data: legend.llamadaTelefonica ? data[timeScale].llamadaTelefonica : [],
      },
    ];
  };

  useEffect(() => {
    const newData = getChartData(timeScale);
    setSeries(newData);

    setOptions((prevState) => ({
      ...prevState,
      colors: [
        theme.palette.grey[900],
        theme.palette.primary.main,
        theme.palette.primary[200],
        theme.palette.primary[100],
      ],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light',
      },
      xaxis: {
        categories: getTimeScaleCategories(timeScale),
        labels: {
          style: {
            colors: [theme.palette.text.secondary],
          },
        },
      },
    }));
  }, [mode, theme, legend, timeScale]);

  const getTimeScaleCategories = (scale) => {
    switch (scale) {
      case 'semana':
        return Array.from({ length: 17 }, (_, i) => `Week ${i + 1}`);
      case 'mes':
        return Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
      case 'trimestre':
        return ['Q1', 'Q2', 'Q3', 'Q4'];
      case 'semestre':
        return ['S1', 'S2'];
      default:
        return [];
    }
  };

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Select value={timeScale} onChange={handleTimeScaleChange} size='small'>
          <MenuItem value="semana">Semanal</MenuItem>
          <MenuItem value="mes">Mensual</MenuItem>
          <MenuItem value="trimestre">Trimestral</MenuItem>
          <MenuItem value="semestre">Semestral</MenuItem>
        </Select>
      </Stack>
      <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="bar" height={250} />
      
      </Box>
      </Box>
    </MainCard>
  );
};

export default SubtipoPlanBarChart;
