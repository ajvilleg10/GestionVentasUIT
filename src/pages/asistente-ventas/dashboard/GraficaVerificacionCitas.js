import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography, Select, MenuItem } from '@mui/material';
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import ReactApexChart from 'react-apexcharts';
import { ThemeMode } from 'config';
import TablaIndicadoresSemanalesCitas from './TablaIndicadoresSemanalesCitas';
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: { show: false },
  },
  plotOptions: {
    bar: { columnWidth: '30%', borderRadius: 4 },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 8, colors: ['transparent'] },
  xaxis: { categories: [] },
  yaxis: { title: { text: 'Numero de citas' } },
  fill: { opacity: 1 },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} citass`;
      },
    },
  },
  legend: { show: false },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: { show: false },
      },
    },
  ],
};

const initialApiData = {
  semana: {
    citasVerificadas: [100, 110, 120, 105, 108, 115, 120, 112, 130, 125, 127, 135, 140, 138, 145, 150, 148, 155, 160, 158, 165, 170, 175, 172, 180, 185, 190, 188, 195, 200, 205, 202, 210, 215, 220, 218, 225, 230, 235, 232, 240, 245, 250, 248, 255, 260, 265, 262, 270, 275],
    citasNoVerificadas: [70, 75, 80, 78, 82, 85, 90, 88, 95, 100, 105, 102, 110, 115, 120, 118, 125, 130, 128, 135, 140, 145, 142, 150, 155, 160, 158, 165, 170, 175, 172, 180, 185, 190, 188, 195, 200, 205, 202, 210, 215, 220, 218, 225, 230, 235, 232, 240, 245, 250, 248],
  },
  mes: {
    citasVerificadas: [1800, 1900, 2100, 2000, 2200, 2250, 2300, 2100, 2200, 2350, 2400, 2300],
    citasNoVerificadas: [1400, 1500, 1600, 1550, 1700, 1725, 1750, 1650, 1700, 1780, 1800, 1750],
  },
  trimestre: {
    citasVerificadas: [6500, 6700, 6900, 6800],
    citasNoVerificadas: [4900, 5000, 5200, 5100],
  },
  semestre: {
    citasVerificadas: [12500, 13000],
    citasNoVerificadas: [9500, 9800],
  },
};

const GraficaVerificacionCitas = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  const [legend, setLegend] = useState({
    citasVerificadas: true,
    citasNoVerificadas: true,
  });

  const [timeScale, setTimeScale] = useState("semana");
  const [series, setSeries] = useState([]);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const handleTimeScaleChange = (event) => {
    setTimeScale(event.target.value);
  };

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [options, setOptions] = useState(columnChartOptions);

  const getChartData = (timeScale) => {
    const { citasVerificadas, citasNoVerificadas } = initialApiData[timeScale];

    return [
      {
        name: 'Citas Verificadas',
        data: legend.citasVerificadas ? citasVerificadas : [],
      },
      {
        name: 'Citas No Verificadas',
        data: legend.citasNoVerificadas ? citasNoVerificadas : [],
      },
    ];
  };

  useEffect(() => {
    const newData = getChartData(timeScale);
    setSeries(newData);
  }, [legend, timeScale]);

  useEffect(() => {
    const categories =
      timeScale === 'mes'
        ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        : timeScale === 'semana'
        ? Array.from({ length: 52 }, (_, i) => `S${i + 1}`)
        : timeScale === 'trimestre'
        ? ["T1", "T2", "T3", "T4"]
        : ["S1", "S2"];

    setOptions((prevState) => ({
      ...prevState,
      colors: !(legend.citasVerificadas && legend.citasNoVerificadas) && !legend.citasVerificadas ? [theme.palette.primary.main] : [theme.palette.warning.main, theme.palette.primary.main],
      xaxis: {
        categories,
        labels: { style: { colors: [theme.palette.text.secondary] } },
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light',
      },
    }));
  }, [mode, theme, legend, timeScale]);

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox color="warning" checked={legend.citasVerificadas} onChange={handleLegendChange} name="citasVerificadas" />}
                label="Citas Verificadas"
              />
              <FormControlLabel control={<Checkbox checked={legend.citasNoVerificadas} onChange={handleLegendChange} name="citasNoVerificadas" />} label="Citas No Verificadas" />
            </FormGroup>
          </FormControl>
          <Select value={timeScale} onChange={handleTimeScaleChange} size='small'>
            <MenuItem value="semana">Semanal</MenuItem>
            <MenuItem value="mes">Mensual</MenuItem>
            <MenuItem value="trimestre">Trimestral</MenuItem>
            <MenuItem value="semestre">Semestral</MenuItem>
          </Select>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={360} />
          <TablaIndicadoresSemanalesCitas />
        </Box>
      </Box>
      
    </MainCard>
  );
};

export default GraficaVerificacionCitas;
