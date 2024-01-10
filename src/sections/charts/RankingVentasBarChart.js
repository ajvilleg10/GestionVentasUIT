import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ThemeMode } from "config";
import useConfig from "hooks/useConfig";
import VentasXPlanPieChart from "./VentasXPlanPieChart";
import SubtipoPlanBarChart from "./SubtipoPlanBarChart";

const RankingVentasBarChart = ({ data }) => {
  
  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      events: {
        dataPointSelection: function (event, chartContext, config) {
          
          if (config.selectedDataPoints[0].length >0) {
            console.log("config.selectedDataPoints",config.selectedDataPoints[0]);
            setShowPieChart(true);
          }
          else{
            setShowPieChart(false);
          }
          
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [], // Inicialmente vacío, se llenará dinámicamente
    },
  };
  const theme = useTheme();
  const { mode } = useConfig();
  const line = theme.palette.divider;
  const { primary } = theme.palette.text;
  const successDark = theme.palette.success.main;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(barChartOptions);
  const [showPieChart, setShowPieChart] = useState(false);
  console.log("hooooooola",showPieChart);
  useEffect(() => {
    if (data) {
      setSeries(data.map((item) => item.ventas));

      setOptions((prevState) => ({
        ...prevState,
        colors: [successDark],
        xaxis: {
          categories: data.map((item) => item.nombre),
          labels: {
            style: {
              colors: Array(data.length).fill(primary),
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: Array(data.length).fill(primary),
            },
          },
        },
        grid: {
          borderColor: line,
        },
        theme: {
          mode: mode === ThemeMode.DARK ? "dark" : "light",
        },
      }));
    }
  }, [data, mode, primary, line, successDark, showPieChart]);

  return (
    <>
      <Box id="chart" sx={{ bgcolor: "transparent" }}>
        <ReactApexChart
          options={options}
          series={[{ data: series }]}
          type="bar"
          height={350}
        />
      </Box>
      {showPieChart && <VentasXPlanPieChart />}
      {showPieChart && <SubtipoPlanBarChart/>}
    </>
  );
};

export default RankingVentasBarChart;
