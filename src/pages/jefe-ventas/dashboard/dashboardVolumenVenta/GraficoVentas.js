import ApexColumnChart from "../ApexColumnChart.js";

const barChartOptions = {
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
      categories: ["Ene", "Feb", "Mar", "Abr", 'May', 'Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
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
          return `${val}`;
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
  


function GraficoVentas({data}){
    return (
        <ApexColumnChart
        opciones={barChartOptions}
        series={data}
        height={350}
      />
    );
}

export default GraficoVentas;
