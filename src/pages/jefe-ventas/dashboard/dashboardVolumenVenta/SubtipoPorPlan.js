

import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";


const barChartOptions = {
    chart: {
      type: "bar",
      height: 250,
      width: "100%",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "left",
      offsetX: 10,
      markers: {
        width: 8,
        height: 8,
        radius: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ["transparent"],
      width: 1,
    },
  };
  

function SubtipoPorPlan( {data}){
    return (
        <AcquisitionChart opciones={barChartOptions} series={data} type="bar" height={250} />

    );
}

export default SubtipoPorPlan;