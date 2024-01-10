import { TableCell, TableRow } from "@mui/material";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
import ApexColumnChart from "../ApexColumnChart.js";

const columnChartOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Proyecto 100", "Referidos", "RCS", "TOTAL"],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
    colors: ["#E8E147", "#6B9AF2", "#F2796B"],
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
    position: "bottom",
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: 5,
      fillColors: ["#E8E147", "#6B9AF2", "#F2796B"],
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
};

function GraficoVentasPorOrigen( {data}) {
  return (
    <TableCell
      style={{
        width: "600px",
        height: "30px",
        border: "40px solid #c1e6df",
      }}
    >
      <label> Ventas x Origen </label>
      <ApexColumnChart
        opciones={columnChartOptions}
        series={data}
        height={350}
      />{" "}
    </TableCell>
  );
}

export default GraficoVentasPorOrigen;
