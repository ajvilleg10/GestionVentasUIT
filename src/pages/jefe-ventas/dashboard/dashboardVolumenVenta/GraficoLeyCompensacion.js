import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";


const barChartOptions= {
    chart: {
      type: "bar",
      height: 350,
      width: "100%",
      margin: "auto",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    title: {
        text: "Ley de compensación",
        align: "center", // Ajusta la alineación según tu preferencia
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "16px", // Ajusta el tamaño del texto según tu preferencia
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
      position: "right",
      horizontalAlign: "left",
      offsetX: 0,
      offsetY: 50,
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
      data: [57, 20],
    },
    {
      name: "Referal",
      data: [99, 30],
    }
  ];
  
  

function GraficoLeyCompensacion(){
    return (
        <AcquisitionChart
        opciones={barChartOptions}
        series={data}
        type="bar"
        height={350}
      />
    );
}

export default GraficoLeyCompensacion;