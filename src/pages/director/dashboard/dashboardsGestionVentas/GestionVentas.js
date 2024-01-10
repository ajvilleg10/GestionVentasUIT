// material-ui
import { Typography } from "@mui/material";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  List,
  TableHead,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AnalyticEcommerce from "components/statistics/AnalyticEcommerce";
import LinearWithLabel from "components/@extended/progress/LinearWithLabel";
import ApexColumnChart from "sections/charts/apexchart/ApexColumnChart.js";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
import { useEffect, useState } from "react";
import CardBarra from "./CardBarra";
import TabsDeTablas from "./TabsDeTablas";
import GraficoIndicadores from "./GraficoIndicadores";
import GraficoAcumulativo from "./GraficoAcumulativo";
import useVendedoresByJefeVentaEmpeladoId from "hooks/jefeVenta/useVendedoresByJefeVentaEmpeladoId";
import useObtenerContactosIdVendedor from "./useObtenerConactos";

// project import
import MainCard from "components/MainCard";
import Button from "themes/overrides/Button";
import vendedor from "menu-items/vendedor";
import { ConfigContext } from "contexts/ConfigContext";
import { da } from "date-fns/locale";
import { ConsoleView } from "react-device-detect";

const colores1 = ["yellow", "red", "blue"];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function obtenerDatosPorFechaCards(year, mes, idJefeVentas) {
  //console.log("Se cambio de year en funcion obtenerDatosPorFechaCards:", year);

  if (year == 2023) {
    let dataVendedores = [
      {
        id: "1",
        nombres: "Messi Ronaldo",
        dataCards: {
          contactos_telefonicos: { cantidad: 30, nivel: 0, meta: 45 },
          citas_nuevas_obtenidas: { cantidad: 15, nivel: 0, meta: 35 },
          citas_nuevas_concretadas: { cantidad: 18, nivel: 0, meta: 35 },
          negocios_por_cerrar: { cantidad: 30, nivel: 0, meta: 35 },
          citas_cierre_concretada: { cantidad: 22, nivel: 0, meta: 35 },
          referidos: { cantidad: 21, nivel: 0, meta: 35 },
        },
      },
      {
        id: "8",
        nombres: "Pam Lane",
        dataCards: {
          contactos_telefonicos: { cantidad: 20, nivel: 0, meta: 45 },
          citas_nuevas_obtenidas: { cantidad: 12, nivel: 0, meta: 30 },
          citas_nuevas_concretadas: { cantidad: 16, nivel: 0, meta: 30 },
          negocios_por_cerrar: { cantidad: 28, nivel: 0, meta: 30 },
          citas_cierre_concretada: { cantidad: 20, nivel: 0, meta: 30 },
          referidos: { cantidad: 18, nivel: 0, meta: 30 },
        },
      },
      {
        id: "9",
        nombres: "Tim Lee",
        dataCards: {
          contactos_telefonicos: { cantidad: 45, nivel: 0, meta: 45 },
          citas_nuevas_obtenidas: { cantidad: 30, nivel: 0, meta: 30 },
          citas_nuevas_concretadas: { cantidad: 16, nivel: 0, meta: 30 },
          negocios_por_cerrar: { cantidad: 28, nivel: 0, meta: 30 },
          citas_cierre_concretada: { cantidad: 20, nivel: 0, meta: 30 },
          referidos: { cantidad: 18, nivel: 0, meta: 30 },
        },
      },
    ];

    let dataJefeVentas = {
      indicadores: { rps: "visto", cpq: "cruz", cmv: "visto" },
      acompanamiento_citas: { cantidad: 0, nivel: 0, meta: 1 },
      reclutamiento: { cantidad: 0, nivel: 0, meta: 1 },
    };

    let datosGraficoIndicadores = {
      numero_vendedores: [
        {
          name: "Numero de vendedores",
          data: [10, 20, 15, 30, 25, 60, 50, 80, 70, 50, 80, 70],
        },
      ],
      citas_concretadas: [
        {
          name: "Citas concretadas",
          data: [5, 10, 8, 15, 12, 60, 30, 80, 10, 50, 80, 70],
        },
      ],
      citas_seguimiento: [
        {
          name: "Citas de seguimiento",
          data: [8, 15, 12, 20, 18, 60, 20, 60, 40, 50, 80, 70],
        },
      ],
      citas_cierre_concretadas: [
        {
          name: "Citas Cierre Concretadas",
          data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 50, 80, 70],
        },
      ],
    };

    let datosGraficoAcumulativo = [
      {
        name: "Contactos telefonicos",
        data: [100, 200, 150, 30, 25, 60, 100, 200, 150, 30, 25, 60],
      },
      {
        name: "Citas nuevas obtenidas",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 3, 8, 5],
      },
      {
        name: "Citas nuevas concretadas",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 50, 70, 20],
      },
      {
        name: "Citas cierre concretadas",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 100, 20, 40],
      },
      {
        name: "Reclutamiento",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 80, 40, 10],
      },
    ];

    let dataTablas = {
      dataTablaContactos: [
        {
          semana: "1",
          dataSemana: {
            numero_vendedores: 4,
            contactos_telefonicos: 15,
            citas_nuevas_obtenidas: 10,
            citas_nuevas_concretadas: 8,
            citas_cierre_concretadas: { cantidad: 5, monto: "$ 3000" },
            negocios_por_cerrar: { cantidad: 8, monto: "$6000" },
            referidos: 12,
            meta: "visto",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero_vendedores: 1,
            contactos_telefonicos: 3,
            citas_nuevas_obtenidas: 0,
            citas_nuevas_concretadas: 2,
            citas_cierre_concretadas: { cantidad: 2, monto: "$ 100" },
            negocios_por_cerrar: { cantidad: 3, monto: "$900" },
            referidos: 1,
            meta: "cruz",
            valor_bonificado: "$ 0",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero_vendedores: 2,
            contactos_telefonicos: 5,
            citas_nuevas_obtenidas: 1,
            citas_nuevas_concretadas: 1,
            citas_cierre_concretadas: { cantidad: 1, monto: "$ 800" },
            negocios_por_cerrar: { cantidad: 1, monto: "$600" },
            referidos: 2,
            meta: "cruz",
            valor_bonificado: "$ 0",
          },
        },
      ],
      dataIndicadores: [
        {
          semana: "1",
          dataSemana: {
            numero: 4,
            csg: "80 %",
            rps: "65 %",
            cqv: "90 %",
            cmv: "80 %",
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero: 2,
            csg: "60 %",
            rps: "40  %",
            cqv: "80 %",
            cmv: "90 %",
            meta: "Si",
            valor_bonificado: "$ 20",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero: 4,
            csg: "60 %",
            rps: "30 %",
            cqv: "20 %",
            cmv: "40 %",
            meta: "No",
            valor_bonificado: "$ 0",
          },
        },
      ],
      dataTablaReclutamiento: [
        {
          semana: "1",
          dataSemana: {
            numero: 4,
            nombre: "Xavier Pauta",
            fecha_ingreso: "12/10/2023",
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero: 2,
            nombre: "Danna Guerrero",
            fecha_ingreso: "22/10/2023",
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero: 1,
            nombre: "Jose Alvarez",
            fecha_ingreso: "28/10/2023",
            meta: "No",
            valor_bonificado: "$ 0",
          },
        },
      ],
      dataTablaAcompanamiento: [
        {
          semana: "1",
          dataSemana: {
            numero_vendedores: 4,
            citas_concretadas: 15,
            citas_seguimiento: 10,
            citas_cierre_concretadas: 5,
            total_ctas: 30,
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero_vendedores: 2,
            citas_concretadas: 5,
            citas_seguimiento: 5,
            citas_cierre_concretadas: 10,
            total_ctas: 20,
            meta: "Si",
            valor_bonificado: "$ 10",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero_vendedores: 0,
            citas_concretadas: 0,
            citas_seguimiento: 0,
            citas_cierre_concretadas: 0,
            total_ctas: 0,
            meta: "No",
            valor_bonificado: "$ 0",
          },
        },
      ],
    };


    if (mes <= 12) {
      let respaldo = {
        numero_vendedores: [
          {
            name: "Numero de vendedores",
            data: [datosGraficoIndicadores.numero_vendedores[0].data[mes - 1]],
          },
        ],
        citas_concretadas: [
          {
            name: "Citas concretadas",
            data: [datosGraficoIndicadores.citas_concretadas[0].data[mes - 1]],
          },
        ],
        citas_seguimiento: [
          {
            name: "Citas de seguimiento",
            data: [datosGraficoIndicadores.citas_seguimiento[0].data[mes - 1]],
          },
        ],
        citas_cierre_concretadas: [
          {
            name: "Citas Cierre Concretadas",
            data: [
              datosGraficoIndicadores.citas_cierre_concretadas[0].data[mes - 1],
            ],
          },
        ],
      };
      datosGraficoIndicadores = respaldo;

      let xd = []; // Mueve la declaración fuera del bloque condicional
      datosGraficoAcumulativo.forEach((elemento) => {
        let nuevoElemento = {
          name: elemento.name,
          data: [elemento.data[mes - 1]],
        };
        xd.push(nuevoElemento);
      });
      console.log("Contenido de xd:", xd);
      datosGraficoAcumulativo = xd;
    }
    return {
      dataVendedores,
      dataJefeVentas,
      datosGraficoIndicadores,
      datosGraficoAcumulativo,
      dataTablas
    };
  } else {

    let dataVendedores = [
      {
        id: "1",
        nombres: "Leonel Messi",
        dataCards: {
          contactos_telefonicos: { cantidad: 30, nivel: 0, meta: 45 },
          citas_nuevas_obtenidas: { cantidad: 15, nivel: 0, meta: 35 },
          citas_nuevas_concretadas: { cantidad: 18, nivel: 0, meta: 35 },
          negocios_por_cerrar: { cantidad: 30, nivel: 0, meta: 35 },
          citas_cierre_concretada: { cantidad: 22, nivel: 0, meta: 35 },
          referidos: { cantidad: 21, nivel: 0, meta: 35 },
        },
      },
      {
        id: "8",
        nombres: "Pam Lane",
        dataCards: {
          contactos_telefonicos: { cantidad: 20, nivel: 0, meta: 45 },
          citas_nuevas_obtenidas: { cantidad: 12, nivel: 0, meta: 30 },
          citas_nuevas_concretadas: { cantidad: 16, nivel: 0, meta: 30 },
          negocios_por_cerrar: { cantidad: 28, nivel: 0, meta: 30 },
          citas_cierre_concretada: { cantidad: 20, nivel: 0, meta: 30 },
          referidos: { cantidad: 18, nivel: 0, meta: 30 },
        },
      },
      {
        id: "9",
        nombres: "Tim Lee",
        dataCards: {
          contactos_telefonicos: { cantidad: 45, nivel: 0, meta: 45 },
          citas_nuevas_obtenidas: { cantidad: 30, nivel: 0, meta: 30 },
          citas_nuevas_concretadas: { cantidad: 16, nivel: 0, meta: 30 },
          negocios_por_cerrar: { cantidad: 28, nivel: 0, meta: 30 },
          citas_cierre_concretada: { cantidad: 20, nivel: 0, meta: 30 },
          referidos: { cantidad: 18, nivel: 0, meta: 30 },
        },
      },
    ];

    let dataJefeVentas = {
      indicadores: { rps: "visto", cpq: "cruz", cmv: "visto" },
      acompanamiento_citas: { cantidad: 0, nivel: 0, meta: 1 },
      reclutamiento: { cantidad: 0, nivel: 0, meta: 1 },
    };

    let dataTablas = {
      dataTablaContactos: [
        {
          semana: "1",
          dataSemana: {
            numero_vendedores: 10,
            contactos_telefonicos: 15,
            citas_nuevas_obtenidas: 10,
            citas_nuevas_concretadas: 8,
            citas_cierre_concretadas: { cantidad: 5, monto: "$ 3000" },
            negocios_por_cerrar: { cantidad: 8, monto: "$6000" },
            referidos: 12,
            meta: "visto",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero_vendedores: 1,
            contactos_telefonicos: 3,
            citas_nuevas_obtenidas: 0,
            citas_nuevas_concretadas: 2,
            citas_cierre_concretadas: { cantidad: 2, monto: "$ 100" },
            negocios_por_cerrar: { cantidad: 3, monto: "$900" },
            referidos: 1,
            meta: "cruz",
            valor_bonificado: "$ 0",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero_vendedores: 2,
            contactos_telefonicos: 5,
            citas_nuevas_obtenidas: 1,
            citas_nuevas_concretadas: 1,
            citas_cierre_concretadas: { cantidad: 1, monto: "$ 800" },
            negocios_por_cerrar: { cantidad: 1, monto: "$600" },
            referidos: 2,
            meta: "cruz",
            valor_bonificado: "$ 0",
          },
        },
      ],
      dataIndicadores: [
        {
          semana: "1",
          dataSemana: {
            numero: 4,
            csg: "80 %",
            rps: "65 %",
            cqv: "90 %",
            cmv: "80 %",
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero: 2,
            csg: "60 %",
            rps: "40  %",
            cqv: "80 %",
            cmv: "90 %",
            meta: "Si",
            valor_bonificado: "$ 20",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero: 4,
            csg: "60 %",
            rps: "30 %",
            cqv: "20 %",
            cmv: "40 %",
            meta: "No",
            valor_bonificado: "$ 0",
          },
        },
      ],
      dataTablaReclutamiento: [
        {
          semana: "1",
          dataSemana: {
            numero: 4,
            nombre: "Xavier Pauta",
            fecha_ingreso: "12/10/2023",
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero: 2,
            nombre: "Danna Guerrero",
            fecha_ingreso: "22/10/2023",
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero: 1,
            nombre: "Jose Alvarez",
            fecha_ingreso: "28/10/2023",
            meta: "No",
            valor_bonificado: "$ 0",
          },
        },
      ],
      dataTablaAcompanamiento: [
        {
          semana: "1",
          dataSemana: {
            numero_vendedores: 4,
            citas_concretadas: 15,
            citas_seguimiento: 10,
            citas_cierre_concretadas: 5,
            total_ctas: 30,
            meta: "Si",
            valor_bonificado: "$ 25",
          },
        },
        {
          semana: "2",
          dataSemana: {
            numero_vendedores: 2,
            citas_concretadas: 5,
            citas_seguimiento: 5,
            citas_cierre_concretadas: 10,
            total_ctas: 20,
            meta: "Si",
            valor_bonificado: "$ 10",
          },
        },
        {
          semana: "3",
          dataSemana: {
            numero_vendedores: 0,
            citas_concretadas: 0,
            citas_seguimiento: 0,
            citas_cierre_concretadas: 0,
            total_ctas: 0,
            meta: "No",
            valor_bonificado: "$ 0",
          },
        },
      ],
    };

    let datosGraficoIndicadores = {
      numero_vendedores: [
        {
          name: "Numero de vendedores",
          data: [10, 20, 15, 30, 25, 60, 50, 80, 70, 50, 80, 70],
        },
      ],
      citas_concretadas: [
        {
          name: "Citas concretadas",
          data: [5, 10, 8, 15, 12, 60, 30, 80, 10, 50, 80, 70],
        },
      ],
      citas_seguimiento: [
        {
          name: "Citas de seguimiento",
          data: [8, 15, 12, 20, 18, 60, 20, 60, 40, 50, 80, 70],
        },
      ],
      citas_cierre_concretadas: [
        {
          name: "Citas Cierre Concretadas",
          data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 50, 80, 70],
        },
      ],
    };

    let datosGraficoAcumulativo = [
      {
        name: "Contactos telefonicos",
        data: [100, 200, 150, 30, 25, 60, 100, 200, 150, 30, 25, 60],
      },
      {
        name: "Citas nuevas obtenidas",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 3, 8, 5],
      },
      {
        name: "Citas nuevas concretadas",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 50, 70, 20],
      },
      {
        name: "Citas cierre concretadas",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 100, 20, 40],
      },
      {
        name: "Reclutamiento",
        data: [3, 8, 5, 12, 10, 60, 35, 80, 90, 80, 40, 10],
      },
    ];

    if (mes <= 12) {
      let respaldo = {
        numero_vendedores: [
          {
            name: "Numero de vendedores",
            data: [datosGraficoIndicadores.numero_vendedores[0].data[mes - 1]],
          },
        ],
        citas_concretadas: [
          {
            name: "Citas concretadas",
            data: [datosGraficoIndicadores.citas_concretadas[0].data[mes - 1]],
          },
        ],
        citas_seguimiento: [
          {
            name: "Citas de seguimiento",
            data: [datosGraficoIndicadores.citas_seguimiento[0].data[mes - 1]],
          },
        ],
        citas_cierre_concretadas: [
          {
            name: "Citas Cierre Concretadas",
            data: [
              datosGraficoIndicadores.citas_cierre_concretadas[0].data[mes - 1],
            ],
          },
        ],
      };
      datosGraficoIndicadores = respaldo;
      let xd = []; // Mueve la declaración fuera del bloque condicional
      datosGraficoAcumulativo.forEach((elemento) => {
        let nuevoElemento = {
          name: elemento.name,
          data: [elemento.data[mes - 1]],
        };
        xd.push(nuevoElemento);
      });
      console.log("Contenido de xd:", xd);
      datosGraficoAcumulativo = xd;
    }

    return {
      dataVendedores,
      dataJefeVentas,
      datosGraficoIndicadores,
      datosGraficoAcumulativo,
      dataTablas
    };
  }
}

const yearActual = new Date().getFullYear();
const mesActual = new Date().getMonth() + 1;

function obtenerDatosCards(dataVendedores, vendedorId) {
  if (!dataVendedores || dataVendedores.length === 0) {
    return {};
  }
  if (vendedorId !== "Todos") {
    const selectedVendedor = dataVendedores.find(
      (vend) => vend.id === vendedorId
    );
    return selectedVendedor.dataCards;
  } else {
    let datosTotales = {
      contactos_telefonicos: { cantidad: 0, nivel: 0, meta: 0 },
      citas_nuevas_obtenidas: { cantidad: 0, nivel: 0, meta: 0 },
      citas_nuevas_concretadas: { cantidad: 0, nivel: 0, meta: 0 },
      negocios_por_cerrar: { cantidad: 0, nivel: 0, meta: 0 },
      citas_cierre_concretada: { cantidad: 0, nivel: 0, meta: 0 },
      referidos: { cantidad: 0, nivel: 0, meta: 0 },
    };

    dataVendedores.forEach((vendedor) => {
      Object.keys(vendedor.dataCards).forEach((categoria) => {
        datosTotales[categoria].cantidad +=
          vendedor.dataCards[categoria].cantidad;
        datosTotales[categoria].meta += vendedor.dataCards[categoria].meta;
      });
    });
    return datosTotales;
  }
}

let {
  dataVendedores,
  dataJefeVentas,
  datosGraficoIndicadores,
  datosGraficoAcumulativo, dataTablas
} = obtenerDatosPorFechaCards(yearActual, mesActual, "");

function GestionVentas() {
  const [vendedorSelec_cards, setVendedorSelec_cards] = useState("Todos");

  const [jefeVenta, setJefeVenta] = useState("jdv1");
  const handleJefeVentaChange = (event) => {
    setJefeVenta(event.target.value);
  };

  const [jefeSucursal, setJefeSucursal] = useState("jds1");
  const handleJefeSucursalChange = (event) => {
    setJefeSucursal(event.target.value);
  };
  const [yearSelec_cards, setYearSelec_cards] = useState(yearActual);

  const [dataVendedoresState, setDataVendedores] = useState(dataVendedores);

  const [datosGraficoIndicadoresState, setDatosGrafico1] = useState(
    datosGraficoIndicadores
  );

  const [datosTablasState, setDatosTablasState] = useState(dataTablas);

  const [datosGraficoAcumulativoState, setDatosGraficoAcum] = useState(
    datosGraficoAcumulativo
  );
  const [dataCards, setDataCards] = useState(
    obtenerDatosCards(dataVendedoresState, "Todos")
  );

  const [mesSeleccionado, setMesSeleccionado] = useState(mesActual);

  const [dataJefeVentasActual, setDataJefeVentasActual] =
    useState(dataJefeVentas);

  const handleVendedorChange = (event) => {
    if (!dataVendedoresState) {
      console.log("Vendedor Nullo o Indefinido");
      return;
    }
    setVendedorSelec_cards(event.target.value);
    if (event.target.value !== "Todos") {
      setDataCards(obtenerDatosCards(dataVendedoresState, event.target.value));
      setDatosGrafico1(
        obtenerDatosPorFechaCards(yearSelec_cards, mesSeleccionado, "")
          .datosGraficoIndicadores
      );
      setDatosTablasState(obtenerDatosPorFechaCards(yearSelec_cards, mesSeleccionado, '').dataTablas);
    } else {
      setDataCards(obtenerDatosCards(dataVendedoresState, "Todos"));
      setDatosGrafico1(
        obtenerDatosPorFechaCards(yearSelec_cards, mesSeleccionado, "")
          .datosGraficoIndicadores
      );
      setDatosTablasState(obtenerDatosPorFechaCards(yearSelec_cards, mesSeleccionado, '').dataTablas);
    }
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setYearSelec_cards(newYear);
    setDataVendedores(
      obtenerDatosPorFechaCards(newYear, mesSeleccionado).dataVendedores
    );
    setDataCards(
      obtenerDatosCards(
        obtenerDatosPorFechaCards(newYear, mesSeleccionado).dataVendedores,
        vendedorSelec_cards
      )
    );
    setDatosGrafico1(
      obtenerDatosPorFechaCards(newYear, mesSeleccionado, "")
        .datosGraficoIndicadores
    );
    setDatosGraficoAcum(
      obtenerDatosPorFechaCards(newYear, mesSeleccionado, "")
        .datosGraficoAcumulativo
    );
    setDatosTablasState(obtenerDatosPorFechaCards(newYear, mesSeleccionado, '').dataTablas);

    setDataJefeVentasActual(
      obtenerDatosPorFechaCards(newYear, mesSeleccionado).dataJefeVentas
    );


  };

  const handleMesChange = (event) => {
    console.log("Mes cambiado: ", event.target.value);
    const newMes = event.target.value;
    setMesSeleccionado(newMes);
    setDataVendedores(
      obtenerDatosPorFechaCards(yearSelec_cards, newMes).dataVendedores
    );
    setDataCards(
      obtenerDatosCards(
        obtenerDatosPorFechaCards(yearSelec_cards, newMes).dataVendedores,
        vendedorSelec_cards
      )
    );
    setDatosGrafico1(
      obtenerDatosPorFechaCards(yearSelec_cards, newMes, "")
        .datosGraficoIndicadores
    );
    setDatosGraficoAcum(
      obtenerDatosPorFechaCards(yearSelec_cards, newMes, "")
        .datosGraficoAcumulativo
    );
    setDatosTablasState(obtenerDatosPorFechaCards(yearSelec_cards, newMes, '').dataTablas);

    setDataJefeVentasActual(
      obtenerDatosPorFechaCards(yearSelec_cards, newMes).dataJefeVentas
    );
  };

  return (
    <Box mt={2}>
      <TableContainer
        sx={{ width: "60%", overflowX: "auto" }}
        style={{ width: "100%" }}
      >
        <MainCard border={false} boxShadow>
          <Box sx={{ width: "100%" }}>
            <Grid container justifyContent="space-between">
              <Box style={{ width: "240px" }}>
                <FormControl fullWidth>
                  <InputLabel id="vendedor-frame-label">
                    Selecciona el vendedor
                  </InputLabel>
                  <Select
                    value={vendedorSelec_cards}
                    onChange={handleVendedorChange}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    {dataVendedoresState.map((vendedor) => (
                      <MenuItem key={vendedor.id} value={vendedor.id}>
                        {vendedor.nombres}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box style={{ width: "800px" }}>
                <Grid container justifyContent="space-evenly">
                  <Box style={{ width: "200px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="vendedor-frame-label">
                        Selecciona el jefe de sucursal
                      </InputLabel>
                      <Select value={jefeSucursal} onChange={handleJefeSucursalChange}>
                        <MenuItem value="jds1">Jefe de sucursal 1</MenuItem>
                        <MenuItem value="jds2">Jefe de sucursal 2</MenuItem>
                        <MenuItem value="jds3">Jefe de sucursal 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box style={{ width: "150px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="vendedor-frame-label">
                        Selecciona el jefe de ventas
                      </InputLabel>
                      <Select value={jefeVenta} onChange={handleJefeVentaChange}>
                        <MenuItem value="jdv1">Jefe de venta 1</MenuItem>
                        <MenuItem value="jdv2">Jefe de venta 2</MenuItem>
                        <MenuItem value="jdv3">Jefe de venta 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box style={{ width: "150px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="vendedor-frame-label">
                        Selecciona el año
                      </InputLabel>
                      <Select
                        value={yearSelec_cards}
                        onChange={handleYearChange}
                      >
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box style={{ width: "200px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="vendedor-frame-label">
                        Selecciona el mes
                      </InputLabel>
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
        <Table>
          <TableBody>
            <TableRow>
              <CardBarra
                titulo="Contactos Telefonicos"
                total={dataCards.contactos_telefonicos.cantidad}
                nivel={dataCards.contactos_telefonicos.nivel}
                meta={dataCards.contactos_telefonicos.meta}
                porcentaje={Math.round(
                  (dataCards.contactos_telefonicos.cantidad * 100) /
                  dataCards.contactos_telefonicos.meta
                )}
                color="blue"
              />

              <CardBarra
                titulo="Citas Nuevas Obtenidas"
                total={dataCards.citas_nuevas_obtenidas.cantidad}
                nivel={dataCards.citas_nuevas_obtenidas.nivel}
                meta={dataCards.citas_nuevas_obtenidas.meta}
                porcentaje={Math.round(
                  (dataCards.citas_nuevas_obtenidas.cantidad * 100) /
                  dataCards.citas_nuevas_obtenidas.meta
                )}
                colorTitulo="#1ABC9C"
              />

              <CardBarra
                titulo="Citas Nuevas Concretadas"
                total={dataCards.citas_nuevas_concretadas.cantidad}
                nivel={dataCards.citas_nuevas_concretadas.nivel}
                meta={dataCards.citas_nuevas_concretadas.meta}
                porcentaje={Math.round(
                  (dataCards.citas_nuevas_concretadas.cantidad * 100) /
                  dataCards.citas_nuevas_concretadas.meta
                )}
                colorTitulo="blue"
              />
            </TableRow>

            <TableRow>
              <CardBarra
                titulo="Negocios Por Cerrar"
                total={dataCards.negocios_por_cerrar.cantidad}
                nivel={dataCards.negocios_por_cerrar.nivel}
                meta={dataCards.negocios_por_cerrar.meta}
                porcentaje={Math.round(
                  (dataCards.negocios_por_cerrar.cantidad * 100) /
                  dataCards.negocios_por_cerrar.meta
                )}
                colorTitulo="blue"
              />
              <CardBarra
                titulo="Citas Cierre Concretada"
                total={dataCards.citas_cierre_concretada.cantidad}
                nivel={dataCards.citas_cierre_concretada.nivel}
                meta={dataCards.citas_cierre_concretada.meta}
                porcentaje={Math.round(
                  (dataCards.citas_cierre_concretada.cantidad * 100) /
                  dataCards.citas_cierre_concretada.meta
                )}
                colorTitulo="blue"
              />
              <CardBarra
                titulo="Referidos"
                total={dataCards.referidos.cantidad}
                nivel={dataCards.referidos.nivel}
                meta={dataCards.referidos.meta}
                porcentaje={Math.round(
                  (dataCards.referidos.cantidad * 100) /
                  dataCards.referidos.meta
                )}
                colorTitulo="blue"
              />
            </TableRow>

            <TableRow>
              <TableCell
                style={{
                  width: "100px",
                  height: "100px",
                  border: "40px solid #c1e6df",
                }}
              >
                <Typography align="center" style={{ color: "#F1C40F" }}>
                  Asistencia Puntal RPS CQV CMV
                </Typography>
                <Typography align="center">
                  RPS {dataJefeVentasActual.indicadores.rps}
                </Typography>
                <Typography align="center">
                  CPQ {dataJefeVentasActual.indicadores.cpq}
                </Typography>
                <Typography align="center">
                  CMV {dataJefeVentasActual.indicadores.cmv}
                </Typography>
              </TableCell>

              <CardBarra
                titulo="Acompañamiento A Citas"
                total={dataJefeVentasActual.acompanamiento_citas.cantidad}
                nivel={dataJefeVentasActual.acompanamiento_citas.nivel}
                meta={dataJefeVentasActual.acompanamiento_citas.meta}
                porcentaje={Math.round(
                  (dataJefeVentasActual.acompanamiento_citas.cantidad * 100) /
                  dataJefeVentasActual.acompanamiento_citas.meta
                )}
                colorTitulo="blue"
              />
              <CardBarra
                titulo="Reclutamiento"
                total={dataJefeVentasActual.reclutamiento.cantidad}
                nivel={dataJefeVentasActual.reclutamiento.nivel}
                meta={dataJefeVentasActual.reclutamiento.meta}
                porcentaje={Math.round(
                  (dataJefeVentasActual.reclutamiento.cantidad * 100) /
                  dataJefeVentasActual.reclutamiento.meta
                )}
                colorTitulo="blue"
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <TabsDeTablas datosTablas={datosTablasState} />
      </Box>

      <GraficoIndicadores
        data={datosGraficoIndicadoresState}
        categorias={
          mesSeleccionado <= 12 ? [meses[mesSeleccionado - 1]] : meses
        }
        widthColum={mesSeleccionado <= 12 ? "10%" : "55%"}
      />
      <GraficoAcumulativo
        data={datosGraficoAcumulativoState}
        categorias={
          mesSeleccionado <= 12 ? [meses[mesSeleccionado - 1]] : meses
        }
        widthColum={mesSeleccionado <= 12 ? "10%" : "55%"}
      />
    </Box>
  );
}
export default GestionVentas;
