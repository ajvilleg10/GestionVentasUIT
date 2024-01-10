import React, { useState, useEffect } from "react";
import {
  useTheme,
  Grid,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import MainCard from "components/MainCard";
import Dot from "components/@extended/Dot";
import { ThemeMode } from "config";
import useConfig from "hooks/useConfig";
import RankingVentasBarChart from "../../../sections/charts/RankingVentasBarChart";
import VentasBarChart from "../../../sections/charts/VentasBarChart";

const areaChartOptions = {
  chart: {
    width: 350,
    type: "donut",
    stacked: false,
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    donut: {
      size: "15%",
    },
  },
  stroke: {
    width: 0,
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
  legend: {
    show: false,
  },
};
const generateRandomName = () => {
  const firstNames = ["John", "Jane", "Robert", "Emily", "Michael", "Olivia", "William", "Sophia", "David", "Emma"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Martinez"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const RankingVentasPieChart = () => {
  const topVendedoresColors = [
    "#FF5252",
    "#FFD740",
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
    "#FF5722",
    "#00BCD4",
    "#795548",
    "#607D8B",
    "#FF9800",
  ];

  const [top, setTop] = useState("3");
  const handleTopChange = (event) => {
    setTop(event.target.value);
  };

  const [jefeVenta, setJefeVenta] = useState("jdv1");
  const handleJefeVentaChange = (event) => {
    setJefeVenta(event.target.value);
  };

  const theme = useTheme();
  const { mode } = useConfig();

  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  const [vendedores, setVendedores] = useState(() => {
    const numberOfVendedores = 14;
    return Array.from({ length: numberOfVendedores }, (_, index) => ({
      nombre: generateRandomName(),
      ventas: Math.floor(Math.random() * 1000),
    }));
  });

  const getTopVendedoresData = (vendedores, n) => {
    const sortedVendedores = vendedores.sort((a, b) => b.ventas - a.ventas);
    const topVendedores = sortedVendedores.slice(0, n);
    const otrosVendedores = sortedVendedores.slice(n);

    const totalVentas = sortedVendedores.reduce(
      (total, vendedor) => total + vendedor.ventas,
      0
    );

    const topVendedoresData = topVendedores.map(
      (vendedor) => (vendedor.ventas / totalVentas) * 100
    );
    const otrosVendedoresData =
      (otrosVendedores.reduce(
        (total, vendedor) => total + vendedor.ventas,
        0
      ) /
        totalVentas) *
      100;

    return {
      topVendedores,
      topVendedoresData,
      otrosVendedoresData,
      otrosVendedores,
    };
  };

  let coloresTop = [];
  useEffect(() => {
    const { topVendedores, topVendedoresData, otrosVendedoresData } =
      getTopVendedoresData(vendedores, parseInt(top, 10));

    coloresTop = topVendedoresColors.slice(0, topVendedores.length);
    const newLabels = [
      ...topVendedores.map((vendedor) => vendedor.nombre),
      "Otros",
    ];

    const newColors = [...coloresTop, theme.palette.primary.lighter];

    setOptions((prevState) => ({
      ...prevState,
      labels: newLabels,
      colors: newColors,
      tooltip: {
        custom: function ({ series, seriesIndex, w }) {
          const porcentaje =
            seriesIndex === series.length - 1
              ? otrosVendedoresData
              : series[seriesIndex];
          return `<div class="pie_box">
            <span class="PieDot" style='background-color:${w.globals.colors[seriesIndex]
            }'></span>
            <span class="fontsize">${w.globals.labels[seriesIndex]}${" "}
            <span class="fontsizeValue">${porcentaje.toFixed(2)}%</span></span></div>`;
        },
      },
      theme: {
        mode: mode === ThemeMode.DARK ? "dark" : "light",
      },
    }));
  }, [mode, primary, secondary, line, theme, top, vendedores]);

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const { topVendedoresData, otrosVendedoresData } =
      getTopVendedoresData(vendedores, parseInt(top, 10));
    setSeries([...topVendedoresData, otrosVendedoresData]);
  }, [top, vendedores]);

  const DotSize = { display: "flex", alignItems: "center", gap: 1 };
  const ExpenseSize = {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 500,
  };

  return (
    <MainCard
      title="Top Ranking de Ventas"
      secondary={
        <Box>
          <Select value={jefeVenta} onChange={handleJefeVentaChange} size="small">
              <MenuItem value="jdv1">Jefe de venta 1</MenuItem>
              <MenuItem value="jdv2">Jefe de venta 2</MenuItem>
              <MenuItem value="jdv3">Jefe de venta 3</MenuItem>
          </Select>
          <Select value={top} onChange={handleTopChange} size="small">
            <MenuItem value="3">Top 3</MenuItem>
            <MenuItem value="5">Top 5</MenuItem>
            <MenuItem value="10">Top 10</MenuItem>
          </Select>
        </Box>


      }
      sx={{
        ".pie_box": {
          padding: 2,
          display: "flex",
          gap: 1,
          alignItems: "left",
          width: "100%",
        },
        ".PieDot": { width: 12, height: 12, borderRadius: "50%" },
        ".fontsize": {
          fontWeight: 500,
          fontSize: "0.875rem",
          lineHeight: "1.375rem",
          color: theme.palette.secondary.main,
        },
        ".fontsizeValue": { color: theme.palette.secondary.dark },
      }}
    >
      <Grid container alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={downMD ? "100%" : 265}
          />
        </Grid>
        <Grid item xs={12}>
          {getTopVendedoresData(vendedores, parseInt(top, 10)).topVendedores.map(
            (vendedor, index) => (
              <Grid container key={index}>
                <Grid item></Grid>
                <Grid item xs sx={DotSize}>
                  <Dot color={coloresTop[index]} size={12} />
                  <Typography
                    align="left"
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {vendedor.nombre}
                  </Typography>
                </Grid>
                <Grid item sx={ExpenseSize}>
                  ${vendedor.ventas.toFixed(2)}
                </Grid>
              </Grid>
            )
          )}
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot
                color={theme.palette.primary.lighter}
                size={12}
              />
              <Typography
                align="left"
                variant="subtitle1"
                color="textSecondary"
              >
                Otros
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              ${getTopVendedoresData(vendedores, parseInt(top, 10)).otrosVendedores.reduce(
                (total, vendedor) => total + vendedor.ventas,
                0
              ).toFixed(2)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <RankingVentasBarChart data={vendedores} />
        </Grid>
        <Grid item xs={12}>
          <VentasBarChart></VentasBarChart>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RankingVentasPieChart;
