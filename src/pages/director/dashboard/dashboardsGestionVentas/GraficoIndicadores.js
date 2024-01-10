import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import ApexColumnChart from '../ApexColumnChart.js';
import MainCard from 'components/MainCard';
import ApexCharts from 'react-apexcharts';
const opciones = [
  'Numero de vendedores',
  'Citas concretadas',
  'Citas de seguimiento',
  'Citas Cierre Concretadas',
];

// Configuracion de las opciones del grafico:
// chart options

const GraficoIndicadores = ({ data, categorias, widthColum }) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(opciones[0]);
  const [chartData, setChartData] = useState(data.numero_vendedores);
  const [configChart, setConfigChart] = useState({
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: widthColum,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categorias
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false,
          },
        },
      },
    ],
  });

  useEffect(() => {
    switch (opcionSeleccionada) {
      case 'Numero de vendedores':
        setChartData(data.numero_vendedores);
        break;
      case 'Citas concretadas':
        setChartData(data.citas_concretadas);
        break;
      case 'Citas de seguimiento':
        setChartData(data.citas_seguimiento);
        break;
      case 'Citas Cierre Concretadas':
        setChartData(data.citas_cierre_concretadas);
        break;
      default:
        setChartData(data.numero_vendedores);
    }
  }, [data, opcionSeleccionada]);

  useEffect(() => {
    setConfigChart((prevConfig) => ({
      ...prevConfig,
      xaxis: {
        ...prevConfig.xaxis,
        categories: categorias,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: widthColum,
          endingShape: 'rounded',
        },
    }}));
  }, [categorias]);


  const handleOpcionChange = (event) => {
    setOpcionSeleccionada(event.target.value);
  };
  console.log("Configuraciones Finales Indicadores", configChart);
  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ width: '100%' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="opcion-label">Indicadores</InputLabel>
          <Select
            labelId="opcion-label"
            id="opcion"
            value={opcionSeleccionada}
            label="Opción"
            onChange={handleOpcionChange}
          >
            {opciones.map((opcion) => (
              <MenuItem key={opcion} value={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ApexColumnChart opciones={{ ...configChart }} series={chartData} height={350} barColors="#c1e6df" />
      </Box>
    </MainCard>
  );
};

export default GraficoIndicadores;
