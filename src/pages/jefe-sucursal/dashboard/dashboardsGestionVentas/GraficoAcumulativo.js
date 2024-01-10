import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';

const opciones = [
  'Contactos telefonicos',
  'Citas nuevas obtenidas',
  'Citas nuevas concretadas',
  'Citas cierre concretadas',
  'Reclutamiento'
];

const GraficoAcumulativo = ( {data, categorias, widthColum}) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState( data );

  useEffect(() => {
    // Lógica para configurar las opciones del gráfico
    setChartOptions({
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
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
        categories: categorias,
      },
      yaxis: {
        title: {
          text: 'Total',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val) {
            return `${val}`;
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
        floating: false,
        markers: {width: 12},

      },
      colors: ['#315DE9','#5BDBA3', '#E9BC31', '#6CE931']
    });
  }, [categorias]);

  useEffect(() => {
    setChartSeries(data);
  }, [data]);


  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ width: '100%' }}>
        <ApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </Box>
    </MainCard>
  );
};

export default GraficoAcumulativo;
