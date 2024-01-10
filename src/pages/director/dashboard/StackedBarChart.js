import React from "react";
import Chart from "react-apexcharts";

const SideBySideBarChart = () => {
  const commonOptions = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["Persistencia"],
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
      },
      title: {
        text: "Monto",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
  };

  const series1 = [
    {
      name: "Barra 1",
      data: [5000],
    },
  ];

  const series2 = [
    {
      name: "Barra 2",
      data: [20000],
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, marginRight: "10px" }}>
        <Chart
          options={commonOptions}
          series={series1}
          type="bar"
          height="350"
          width="100%"
        />
      </div>
      <div style={{ flex: 1 }}>
        <Chart
          options={commonOptions}
          series={series2}
          type="bar"
          height="350"
          width="100%"
        />
      </div>
    </div>
  );
};

export default SideBySideBarChart;
