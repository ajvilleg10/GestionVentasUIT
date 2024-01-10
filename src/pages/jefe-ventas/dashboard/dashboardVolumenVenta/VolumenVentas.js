import React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  List,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

//import { Bar } from "react-chartjs-2";
//import { Pie } from "react-chartjs-2";
import MainCard from "components/MainCard";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
//import ApexColumnChart from "sections/charts/apexchart/ApexColumnChart.js";
import ApexPieChart from "sections/charts/apexchart/ApexPieChart";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
//import RoundIconCard from "components/statistics/RoundIconCard";
//import MainCard from "components/MainCard";
//import LinearWithLabel from "components/@extended/progress/LinearWithLabel";
import CardsVolumenVentas from "./CardsVolumenVentas";
import GraficoVentasPorOrigen from "./GraficoVentasPorOrigen";
import GraficoVendedores from "./GraficoVendedores";
import GraficoPersistencia1 from "./GraficoPersistencia1";
import GraficoPersistencia2 from "./GraficoPersistencia2";
import GraficoLeyCompensacion from "./GraficoLeyCompensacion";
import GraficoContratosInactivos from "./GraficoContratosInactivos";
import GraficoVentas from "./GraficoVentas";
import SubtipoPorPlan from "./SubtipoPorPlan";
//import ProductCard from "components/cards/e-commerce/ProductCard";


import useCurrentUser from "hooks/useCurrentUser";
import useVendedoresByJefeVentaEmpeladoId from "hooks/jefeVenta/useVendedoresByJefeVentaEmpeladoId";
import SideBySideBarChart from "./StackedBarChart";
import { CategoryTwoTone } from "@mui/icons-material";
import CommonLayout from "layout/CommonLayout";
import ProductReview from "components/cards/e-commerce/ProductReview";
//ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function obtenerDatosPorFechaCards(year, mes, idJefeVentas) {
  let dataVendedoresIni = [
    {
      id: "1",
      nombres: "Leonel Messi",
      dataCards: {
        vendedores_iniciales: 8,
        vendedores_entrantes: 3,
        vendedores_salientes: 2,
        vendedores_finales: { cantidad: 9, meta: 10 },
        ventas_nuevas: { cantidad: 9000, contratos: 10 },
        contratos_inactivos1: { cantidad: 9000, contratos: 10 },
        ventas_nuevas_reales: { cantidad: 6000, contratos: 5 },
        sin_titulo: { nivel: 0, porcentaje: 50, meta: 6000 },
        renovaciones: { cantidad: 8000, contratos: 10 },
        contratos_inactivos2: { cantidad: 8000, contratos: 10 },
        contratos_renovaciones_reales: { cantidad: 5000, contratos: 5 },
        contratos_por_renovar: { cantidad: 8, porcentaje: 80, meta: 10 },
        volumen_ventas: { cantidad: 8000, contratos: 10 },
        contratos_inactivos3: { cantidad: 3000, porcentaje: 100 },
        volumen_ventas_reales: { cantidad: 11000, nivel: 1, porcentaje: 20 },
        bonificacion: { nivel: 0, meta: 6000, valor: 100, porcentaje: 20 },
      },
    },
    {
      id: "8",
      nombres: "Pam Lane",
      dataCards: {
        vendedores_iniciales: 10,
        vendedores_entrantes: 3,
        vendedores_salientes: 2,
        vendedores_finales: { cantidad: 9, meta: 10 },
        ventas_nuevas: { cantidad: 9000, contratos: 10 },
        contratos_inactivos1: { cantidad: 9000, contratos: 10 },
        ventas_nuevas_reales: { cantidad: 6000, contratos: 5 },
        sin_titulo: { nivel: 0, porcentaje: 50, meta: 6000 },
        renovaciones: { cantidad: 8000, contratos: 10 },
        contratos_inactivos2: { cantidad: 8000, contratos: 10 },
        contratos_renovaciones_reales: { cantidad: 5000, contratos: 5 },
        contratos_por_renovar: { cantidad: 8, porcentaje: 80, meta: 10 },
        volumen_ventas: { cantidad: 8000, contratos: 10 },
        contratos_inactivos3: { cantidad: 3000, porcentaje: 0 },
        volumen_ventas_reales: { cantidad: 11000, nivel: 1, porcentaje: 20 },
        bonificacion: { nivel: 0, meta: 6000, valor: 100, porcentaje: 80 },
      },
    },
    {
      id: "9",
      nombres: "Tim Lee",
      dataCards: {
        vendedores_iniciales: 2,
        vendedores_entrantes: 3,
        vendedores_salientes: 2,
        vendedores_finales: { cantidad: 9, meta: 10 },
        ventas_nuevas: { cantidad: 9000, contratos: 10 },
        contratos_inactivos1: { cantidad: 9000, contratos: 10 },
        ventas_nuevas_reales: { cantidad: 6000, contratos: 5 },
        sin_titulo: { nivel: 0, porcentaje: 50, meta: 6000 },
        renovaciones: { cantidad: 8000, contratos: 10 },
        contratos_inactivos2: { cantidad: 8000, contratos: 10 },
        contratos_renovaciones_reales: { cantidad: 5000, contratos: 5 },
        contratos_por_renovar: { cantidad: 8, porcentaje: 80, meta: 10 },
        volumen_ventas: { cantidad: 8000, contratos: 10 },
        contratos_inactivos3: { cantidad: 3000, porcentaje: 0 },
        volumen_ventas_reales: { cantidad: 11000, nivel: 1, porcentaje: 30 },
        bonificacion: { nivel: 0, meta: 6000, valor: 100, porcentaje: 20 },
      },
    },
  ];

  let dataGraficaVendedoresIni = [
    {
      id: "1",
      nombres: "Leonel Messi",
      dataGrafica: [
        {
          name: "Inciales",
          data: [25, 35, 50, 55, 65, 75, 80, 90, 95, 100, 70, 20],
        },
        {
          name: "Ingresos",
          data: [30, 40, 55, 60, 70, 80, 85, 95, 100, 25, 75, 45],
        },
        {
          name: "Salientes",
          data: [30, 35, 50, 60, 65, 75, 80, 85, 90, 95, 55, 20],
        },
        {
          name: "Finales",
          data: [30, 35, 50, 55, 65, 75, 80, 85, 90, 95, 60, 100],
        },
      ],
    },
    {
      id: "8",
      nombres: "Pam Lane",
      dataGrafica: [
        {
          name: "Inciales",
          data: [20, 30, 40, 50, 55, 65, 70, 75, 85, 90, 95, 100],
        },
        {
          name: "Ingresos",
          data: [25, 35, 40, 50, 55, 65, 75, 80, 85, 90, 95, 100],
        },
        {
          name: "Salientes",
          data: [25, 30, 40, 50, 60, 70, 75, 85, 90, 95, 100, 20],
        },
        {
          name: "Finales",
          data: [25, 30, 40, 50, 55, 65, 75, 80, 85, 90, 95, 100],
        },
      ],
    },
    {
      id: "9",
      nombres: "Tim Lee",
      dataGrafica: [
        {
          name: "Inciales",
          data: [25, 30, 40, 50, 55, 60, 70, 75, 80, 90, 95, 100],
        },
        {
          name: "Ingresos",
          data: [30, 35, 45, 55, 60, 70, 75, 85, 90, 95, 100, 20],
        },
        {
          name: "Salientes",
          data: [25, 35, 40, 50, 55, 65, 70, 80, 85, 90, 95, 100],
        },
        {
          name: "Finales",
          data: [30, 35, 45, 50, 60, 70, 75, 80, 85, 90, 95, 100],
        },
      ],
    },
  ];

  let dataGraficaXOrigenIni = [
    {
      id: "1",
      nombres: "Leonel Messi",
      dataGrafica: [
        {
          name: "Contratos Activos",
          data: [44, 55, 57, 155],
        },
        {
          name: "Contratos Inactivos",
          data: [76, 85, 101, 181],
        },
        {
          name: "Volumen de ventas",
          data: [35, 41, 36, 194],
        },
      ],
    },
    {
      id: "8",
      nombres: "Pam Lane",
      dataGrafica: [
        {
          name: "Contratos Activos",
          data: [44, 55, 57, 56],
        },
        {
          name: "Contratos Inactivos",
          data: [76, 85, 101, 98],
        },
        {
          name: "Volumen de ventas",
          data: [35, 41, 36, 26],
        },
      ],
    },
    {
      id: "9",
      nombres: "Tim Lee",
      dataGrafica: [
        {
          name: "Contratos Activos",
          data: [44, 55, 57, 56],
        },
        {
          name: "Contratos Inactivos",
          data: [76, 85, 101, 98],
        },
        {
          name: "Volumen de ventas",
          data: [35, 41, 36, 26],
        },
      ],
    },
  ];

  let dataGraficaContratosInactivosIni = [
    {
      id: "1",
      nombres: "Leonel Messi",
      dataGrafica: [
        {
          name: "Venta Nueva",
          data: [44, 55, 57, 50, 48, 53, 25, 30, 35, 40, 45, 50],
        },
        {
          name: "Renovacion",
          data: [76, 85, 101, 90, 88, 79, 20, 40, 90, 35, 67, 45],
        },
        {
          name: "Mitad Vigencia",
          data: [35, 41, 36, 30, 49, 30, 20, 60, 30, 75, 50, 45],
        },
      ],
    },
    {
      id: "8",
      nombres: "Pam Lane",
      dataGrafica: [
        {
          name: "Venta Nueva",
          data: [44, 55, 57, 50, 48, 53, 25, 30, 35, 40, 45, 50],
        },
        {
          name: "Renovacion",
          data: [76, 85, 101, 90, 88, 79, 20, 40, 90, 35, 67, 45],
        },
        {
          name: "Mitad Vigencia",
          data: [35, 41, 36, 30, 49, 30, 20, 60, 30, 75, 50, 45],
        },
      ],
    },
    {
      id: "9",
      nombres: "Tim Lee",
      dataGrafica: [
        {
          name: "Venta Nueva",
          data: [44, 55, 57, 50, 48, 53, 25, 30, 35, 40, 45, 50],
        },
        {
          name: "Renovacion",
          data: [76, 85, 101, 90, 88, 79, 20, 40, 90, 35, 67, 45],
        },
        {
          name: "Mitad Vigencia",
          data: [35, 41, 36, 30, 49, 30, 20, 60, 30, 75, 50, 45],
        },
      ],
    },
  ];

  let dataGraficaVentasIni = [
    {
      id: "1",
      nombres: "Leonel Messi",
      dataGrafica: [
        {
          name: "Contratos Activos",
          data: [70, 55, 57, 155, 80, 90, 70, 100, 75, 60, 65, 50],
        },
        {
          name: "Contratos Inactivos",
          data: [76, 85, 101, 181, 60, 70, 80, 95, 85, 75, 90, 100],
        },
        {
          name: "Volumen de ventas",
          data: [35, 41, 36, 194, 55, 65, 75, 85, 90, 80, 70, 100],
        },
      ],
    },
    {
      id: "8",
      nombres: "Pam Lane",
      dataGrafica: [
        {
          name: "Contratos Activos",
          data: [100, 55, 57, 56, 70, 80, 90, 100, 75, 85, 60, 95],
        },
        {
          name: "Contratos Inactivos",
          data: [76, 85, 101, 98, 80, 90, 70, 60, 85, 100, 75, 95],
        },
        {
          name: "Volumen de ventas",
          data: [35, 41, 36, 26, 75, 85, 65, 55, 80, 90, 95, 100],
        },
      ],
    },
    {
      id: "9",
      nombres: "Tim Lee",
      dataGrafica: [
        {
          name: "Contratos Activos",
          data: [20, 55, 57, 56, 80, 90, 70, 100, 75, 60, 65, 50],
        },
        {
          name: "Contratos Inactivos",
          data: [76, 85, 101, 98, 60, 70, 80, 95, 85, 75, 90, 100],
        },
        {
          name: "Volumen de ventas",
          data: [35, 41, 36, 26, 55, 65, 75, 85, 90, 80, 70, 100],
        },
      ],
    },
  ];

  let dataGraficaSubtipoPlanIni = [
    {
      name: "Direct",
      data: [80, 55, 57, 55, 50, 52, 49],
    },
    {
      name: "Referal",
      data: [76, 85, 101, 99, 87, 95, 105],
    },
    {
      name: "Social",
      data: [35, 41, 36, 34, 42, 40, 39],
    },
  ];

  return {
    dataVendedoresIni,
    dataGraficaVendedoresIni,
    dataGraficaXOrigenIni,
    dataGraficaContratosInactivosIni,
    dataGraficaVentasIni,
    dataGraficaSubtipoPlanIni,
  };
}

const yearActual = new Date().getFullYear();
const mesActual = new Date().getMonth() + 1;

function obtenerDataGraficoVentas(dataGraficaVentas, vendedorId) {
  console.log("Id enviado Grafico Ventas:", vendedorId);
  //console.log("Data recibida Por Grafico Ventas:", dataGraficaVentas);
  if (!dataGraficaVentas || dataGraficaVentas.length === 0) {
    return {};
  }
  if (vendedorId !== "Todos") {
    const selectedVendedor = dataGraficaVentas.find((vend) => vend.id === vendedorId);
    //console.log("Data retornada Por Grafico Ventas:", selectedVendedor.dataGrafica);
    console.log("Vendedor seleccionado:", selectedVendedor);
    return selectedVendedor.dataGrafica;
  } else {
    let dataTotales = [
      { name: "Contratos Activos", data: Array(12).fill(0) },
      { name: "Contratos Inactivos", data: Array(12).fill(0) },
      { name: "Volumen de ventas", data: Array(12).fill(0) },
    ];

    // Iterar sobre cada objeto en dataGraficaVendedores y sumar los valores correspondientes
    dataGraficaVentas.forEach((vendedor) => {
      vendedor.dataGrafica.forEach((mes, index) => {
        dataTotales[index].data = dataTotales[index].data.map((valor, i) => valor + mes.data[i]);
      });
    });
    //console.log("Data retornada Por Grafico Ventas:", dataTotales);
    return dataTotales;
  }
}

function obtenerDataGraficoContratosInactivos(dataGraficaContratosInactivosIni, vendedorId) {
  if (!dataGraficaContratosInactivosIni || dataGraficaContratosInactivosIni.length === 0) {
    return {};
  }
  if (vendedorId !== "Todos") {
    const selectedVendedor = dataGraficaContratosInactivosIni.find((vend) => vend.id === vendedorId);
    return selectedVendedor.dataGrafica;
  } else {
    let dataTotales = [
      { name: "Venta Nueva", data: Array(12).fill(0) },
      { name: "Renovacion", data: Array(12).fill(0) },
      { name: "Mitad Vigencia", data: Array(12).fill(0) },
    ];

    // Iterar sobre cada objeto en dataGraficaVendedores y sumar los valores correspondientes
    dataGraficaContratosInactivosIni.forEach((vendedor) => {
      vendedor.dataGrafica.forEach((mes, index) => {
        dataTotales[index].data = dataTotales[index].data.map((valor, i) => valor + mes.data[i]);
      });
    });
    return dataTotales;
  }
}

function obtenerDataGraficoVentasPorOrigen(dataGraficaVentasXOrigen, vendedorId) {
  if (!dataGraficaVentasXOrigen || dataGraficaVentasXOrigen.length === 0) {
    return {};
  }
  if (vendedorId !== "Todos") {
    const selectedVendedor = dataGraficaVentasXOrigen.find((vend) => vend.id === vendedorId);
    return selectedVendedor.dataGrafica;
  } else {
    let dataTotales = [
      { name: "Contratos Activos", data: Array(4).fill(0) },
      { name: "Contratos Inactivos", data: Array(4).fill(0) },
      { name: "Volumen de ventas", data: Array(4).fill(0) },
    ];

    // Iterar sobre cada objeto en dataGraficaVendedores y sumar los valores correspondientes
    dataGraficaVentasXOrigen.forEach((vendedor) => {
      vendedor.dataGrafica.forEach((mes, index) => {
        dataTotales[index].data = dataTotales[index].data.map((valor, i) => valor + mes.data[i]);
      });
    });
    return dataTotales;
  }
}

function obtenerDataGraficoVendedores(dataGraficaVendedores, vendedorId) {
  if (!dataGraficaVendedores || dataGraficaVendedores.length === 0) {
    return {};
  }
  if (vendedorId !== "Todos") {
    const selectedVendedor = dataGraficaVendedores.find((vend) => vend.id === vendedorId);
    return selectedVendedor.dataGrafica;
  } else {
    let dataTotales = [
      { name: "Inciales", data: Array(12).fill(0) },
      { name: "Ingresos", data: Array(12).fill(0) },
      { name: "Salientes", data: Array(12).fill(0) },
      { name: "Finales", data: Array(12).fill(0) },
    ];
    // Iterar sobre cada objeto en dataGraficaVendedores y sumar los valores correspondientes
    dataGraficaVendedores.forEach((vendedor) => {
      vendedor.dataGrafica.forEach((mes, index) => {
        dataTotales[index].data = dataTotales[index].data.map((valor, i) => valor + mes.data[i]);
      });
    });
    return dataTotales;
  }
}

function obtenerDatosCards(dataVendedores, vendedorId) {
  if (!dataVendedores || dataVendedores.length === 0) {
    return {};
  }
  if (vendedorId !== "Todos") {
    const selectedVendedor = dataVendedores.find((vend) => vend.id === vendedorId);
    return selectedVendedor.dataCards;
  } else {
    let datosTotales = {
      vendedores_iniciales: 0,
      vendedores_entrantes: 0,
      vendedores_salientes: 0,
      vendedores_finales: { cantidad: 0, meta: 0 },
      ventas_nuevas: { cantidad: 0, contratos: 0 },
      contratos_inactivos1: { cantidad: 0, contratos: 0 },
      ventas_nuevas_reales: { cantidad: 0, contratos: 0 },
      sin_titulo: { nivel: 0, porcentaje: 0, meta: 0 },
      renovaciones: { cantidad: 0, contratos: 0 },
      contratos_inactivos2: { cantidad: 0, contratos: 0 },
      contratos_renovaciones_reales: { cantidad: 0, contratos: 0 },
      contratos_por_renovar: { cantidad: 0, porcentaje: 0, meta: 0 },
      volumen_ventas: { cantidad: 0, contratos: 0 },
      contratos_inactivos3: { cantidad: 0, porcentaje: 0 }, //No sabemos como actualizar este porcentaje
      volumen_ventas_reales: { cantidad: 0, nivel: 0, porcentaje: 0 }, //No sabemos como actualizar este porcentaje
      bonificacion: { nivel: 0, meta: 0, valor: 0, porcentaje: 0 }, //No sabemos como actualizar este porcentaje
    };

    dataVendedores.forEach((vendedor) => {
      Object.keys(vendedor.dataCards).forEach((categoria) => {
        if (!["sin_titulo", "bonificacion"].includes(categoria)) {
          if (["vendedores_iniciales", "vendedores_entrantes", "vendedores_salientes"].includes(categoria)) {
            datosTotales[categoria] += vendedor.dataCards[categoria];
          } else {
            datosTotales[categoria].cantidad += vendedor.dataCards[categoria].cantidad;
          }
        }
        if (
          [
            "ventas_nuevas",
            "contratos_inactivos1",
            "ventas_nuevas_reales",
            "renovaciones",
            "contratos_inactivos2",
            "contratos_renovaciones_reales",
            "contratos_por_renovar",
            "volumen_ventas",
          ].includes(categoria)
        ) {
          datosTotales[categoria].contratos += vendedor.dataCards[categoria].contratos;
        }

        if (["vendedores_finales", "sin_titulo", "cotratos_por_renovar"].includes(categoria)) {
          datosTotales[categoria].meta += vendedor.dataCards[categoria].meta;
        }

        if (categoria == "bonificacion") {
          datosTotales[categoria].meta += vendedor.dataCards[categoria].meta;
          datosTotales[categoria].valor += vendedor.dataCards[categoria].valor;
        }
      });
    });
    return datosTotales;
  }
}

let {
  dataVendedoresIni,
  dataGraficaVendedoresIni,
  dataGraficaXOrigenIni,
  dataGraficaContratosInactivosIni,
  dataGraficaVentasIni,
  dataGraficaSubtipoPlanIni,
} = obtenerDatosPorFechaCards(yearActual, mesActual, "");

let dataGraficaVendSelec = obtenerDataGraficoVendedores(dataGraficaVendedoresIni, "Todos");
let dataCardsIni = obtenerDatosCards(dataVendedoresIni, "Todos");
let dataGraficaVentaXOrigenSelec = obtenerDataGraficoVentasPorOrigen(dataGraficaXOrigenIni, "Todos");

let dataGraficaContratosInactivosSelecIni = obtenerDataGraficoContratosInactivos(dataGraficaContratosInactivosIni, "Todos");

let dataGraficaVentasSelecIni = obtenerDataGraficoVentas(dataGraficaVentasIni, "Todos");

function VolumenVentas() {
  const [dataVendedoresState, setDataVendedores] = useState(dataVendedoresIni);
  const [dataGraficaVendedoresState, setDataGraficaVendedores] = useState(dataGraficaVendedoresIni);
  const [dataGraficaVendedorSelecState, setDataGraficaVendedoresSelec] = useState(dataGraficaVendSelec);

  const [dataCards, setDataCards] = useState(dataCardsIni);
  const [dataGraficaVentasXOrigenState, setDataGraficaVentasXOrigen] = useState(dataGraficaXOrigenIni);
  const [dataGraficaVentasXOrgienSelec, setDataGraficaVentasXOrigenSelec] = useState(dataGraficaVentaXOrigenSelec);

  const [dataGraficaContratosInactivosState, setDataGraficaContratosInactivos] = useState(dataGraficaContratosInactivosIni);
  const [dataGraficaContratosInactivosSelec, setDataGraficaContratosInactivosSelec] = useState(dataGraficaContratosInactivosSelecIni);

  const [dataGraficaVentasState, setDataGraficaVentas] = useState(dataGraficaVentasIni);
  const [dataGraficaVentasSelec, setDataGraficaVentasSelec] = useState(dataGraficaVentasSelecIni);

  const [dataGraficaSubtipoPlanState, setDataGraficaSubtipoPlan] = useState(dataGraficaSubtipoPlanIni);

  const [vendedorSelec_cards, setVendedorSelec_cards] = useState("Todos");

  const [yearSelec_cards, setYearSelec_cards] = useState(yearActual);

  const [mesSeleccionado, setMesSeleccionado] = useState(mesActual);

  const handleVendedorChange = (event) => {
    if (!dataVendedoresState) {
      console.log("Vendedor Nullo o Indefinido");
      return;
    }
    setVendedorSelec_cards(event.target.value);
    if (event.target.value !== "Todos") {
      setDataCards(obtenerDatosCards(dataVendedoresState, event.target.value));
      setDataGraficaVendedoresSelec(obtenerDataGraficoVendedores(dataGraficaVendedoresState, event.target.value));
      setDataGraficaVentasXOrigenSelec(obtenerDataGraficoVentasPorOrigen(dataGraficaVentasXOrigenState, event.target.value));
      setDataGraficaContratosInactivosSelec(obtenerDataGraficoContratosInactivos(dataGraficaContratosInactivosState, event.target.value));
      setDataGraficaVentasSelec(obtenerDataGraficoVentas(dataGraficaVentasState, event.target.value));
    } else {
      setDataCards(obtenerDatosCards(dataVendedoresState, "Todos"));
      setDataGraficaVendedoresSelec(obtenerDataGraficoVendedores(dataGraficaVendedoresState, "Todos"));
      setDataGraficaVentasXOrigenSelec(obtenerDataGraficoVentasPorOrigen(dataGraficaVentasXOrigenState, "Todos"));
      setDataGraficaContratosInactivosSelec(obtenerDataGraficoContratosInactivos(dataGraficaContratosInactivosState, "Todos"));
      setDataGraficaVentasSelec(obtenerDataGraficoVentas(dataGraficaVentasState, "Todos"));
    }
  };

  const handleYearChange = (event) => {
    setYearSelec_cards(event.target.value);
  };

  const handleMesChange = (event) => {
    setMesSeleccionado(event.target.value);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form>
            <List sx={{ py: 0 }} dense>
              <Box mt={2}>
                <MainCard border={false} boxShadow>
                  <Box sx={{ width: "100%" }}>
                    <Grid container justifyContent="space-between">
                      <Box style={{ width: "240px" }}>
                        <FormControl fullWidth>
                          <InputLabel id="vendedor-frame-label">Selecciona el vendedor</InputLabel>
                          <Select value={vendedorSelec_cards} onChange={handleVendedorChange} style={{ width: "100%" }}>
                            <MenuItem value="Todos">Todos</MenuItem>
                            {dataVendedoresState.map((vendedor) => (
                              <MenuItem key={vendedor.id} value={vendedor.id}>
                                {vendedor.nombres}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      <Box style={{ width: "400px" }}>
                        <Grid container justifyContent="space-evenly">
                          <Box style={{ width: "150px" }}>
                            <FormControl fullWidth>
                              <InputLabel id="vendedor-frame-label">Selecciona el año</InputLabel>
                              <Select value={yearSelec_cards} onChange={handleYearChange}>
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <Box style={{ width: "200px" }}>
                            <FormControl fullWidth>
                              <InputLabel id="vendedor-frame-label">Selecciona el mes</InputLabel>
                              <Select
                                value={mesSeleccionado}
                                onChange={handleMesChange}
                                style={{ width: "100%" }}
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                  },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                  },
                                  getContentAnchorEl: null, // Para evitar que el menú se posicione incorrectamente
                                  PaperProps: {
                                    style: {
                                      maxHeight: 200, // Ajusta este valor según tu preferencia
                                    },
                                  },
                                }}
                              >
                                {/* Puedes usar un array de meses o generarlos según tus necesidades */}
                                <MenuItem value={1}>Enero</MenuItem>
                                <MenuItem value={2}>Febrero</MenuItem>
                                <MenuItem value={3}>Marzo</MenuItem>
                                <MenuItem value={4}>Abril</MenuItem>
                                <MenuItem value={5}>Mayo</MenuItem>
                                <MenuItem value={6}>Junio</MenuItem>
                                <MenuItem value={7}>Julio</MenuItem>
                                <MenuItem value={8}>Agosto</MenuItem>
                                <MenuItem value={9}>Septiembre</MenuItem>
                                <MenuItem value={10}>Octubre</MenuItem>
                                <MenuItem value={11}>Noviembre</MenuItem>
                                <MenuItem value={12}>Diciembre</MenuItem>
                                <MenuItem value={13}>Trimestre</MenuItem>
                                <MenuItem value={14}>Semestre</MenuItem>
                              </Select>{" "}
                            </FormControl>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                  </Box>
                </MainCard>
                <CardsVolumenVentas data={dataCards} />


                <TableContainer sx={{ width: "60%", overflowX: "auto" }} style={{ width: "100%" }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <GraficoVendedores data={dataGraficaVendedorSelecState} />

                        <TableCell
                          style={{
                            width: "19.5%",
                            //height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <GraficoPersistencia1></GraficoPersistencia1>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "20.5%",
                            //height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <GraficoPersistencia2 />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <GraficoVentasPorOrigen data={dataGraficaVentasXOrgienSelec} />

                        <TableCell
                          style={{
                            width: "300px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                            margin: "auto",
                          }}
                        >
                          <GraficoLeyCompensacion />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ border: "40px solid #c1e6df" }}>
                          <div>
                            <label> Contratos Inactivos </label>

                            <GraficoContratosInactivos data={dataGraficaContratosInactivosSelec} />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table>
                    <TableRow>
                      <TableCell style={{ border: "40px solid #c1e6df" }}>
                        <div>
                          <label> Ventas </label>

                          <GraficoVentas data={dataGraficaVentasSelec} />
                        </div>
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "50%",
                          height: "300px",
                          border: "40px solid #c1e6df",
                        }}
                      >
                        <label>Ventas x Plan</label>
                        <div style={{ textAlign: "right" }}>
                          <label>Filtro: </label>

                          <Select defaultValue="Hola">
                            <MenuItem key={0} value={0}>
                              Venta Nueva
                            </MenuItem>
                            <MenuItem key={1} value={1}>
                              Renovación
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                              Todo
                            </MenuItem>
                          </Select>
                        </div>

                        <ApexPieChart />
                      </TableCell>
                      <TableCell
                        style={{
                          width: "50%",
                          height: "300px",
                          border: "40px solid #c1e6df",
                        }}
                      >
                        <div>
                          <label> Subtipo Plan </label>
                        </div>
                        <div>
                          <SubtipoPorPlan data={dataGraficaSubtipoPlanState} />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </List>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
export default VolumenVentas;
