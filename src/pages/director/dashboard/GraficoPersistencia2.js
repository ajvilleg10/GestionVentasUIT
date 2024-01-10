import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
const barChartOptions= {
  chart: {
    type: "bar",
    height: 350,
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
    offsetX: 0,
    offsetY: 0,
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
const data = [
    {
      name: "Direct",
      data: [57, 10],
    },
    {
      name: "Referal",
      data: [99, 20],
    },

  ];
  
  

function GraficoPersistencia2(){
    return (
        <AcquisitionChart
        opciones={barChartOptions}
        series={data}
        type="bar"
        height={350}
      />
    );
}

export default GraficoPersistencia2;