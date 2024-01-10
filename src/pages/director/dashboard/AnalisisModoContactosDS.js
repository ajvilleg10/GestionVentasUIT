// material-ui

// project import
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
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ApexRadialChart from "sections/charts/apexchart/ApexRadialChart";
import ApexColumnChart from "sections/charts/apexchart/ApexColumnChart.js";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
import ApexPieChart from "sections/charts/apexchart/ApexPieChart";
import datosVendedores from "../../../assets/datosVendedores.json";
import datosJefeVentas from "../../../assets/datosJefeVentas.json";
import datosJefeSucursales from "../../../assets/datosJefeSucursales.json";

// ==============================|| SAMPLE PAGE ||============================== //

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

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
const serie4 = [
  {
    name: "Presencial",
    data: [15, 21, 16, 14, 22, 20, 19],
  },
  {
    name: "Llamada de Whatsapp",
    data: [76, 85, 101, 99, 87, 95, 105],
  },
  {
    name: "Llamada Celular",
    data: [25, 31, 26, 24, 32, 30, 29],
  },
  {
    name: "Videollamada",
    data: [35, 41, 36, 34, 42, 40, 39],
  },
  {
    name: "Mensaje Whatsapp",
    data: [44, 55, 57, 55, 50, 52, 49],
  },
  {
    name: "E-mail",
    data: [5, 11, 6, 4, 12, 10, 9],
  },
];

const barChartOptions3 = {
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
    horizontalAlign: "center",
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
const serie6 = [
  {
    name: "Direct",
    data: [57, 0],
  },
  {
    name: "Referal",
    data: [99, 0],
  },
  {
    name: "Social",
    data: [34, 0],
  },
];

//AÑADIDO
const ventasPlanOptions = {
  chart: {
    type: 'pie',
    width: 450,
    height: 450
  },
  labels: ['G. De Contactos', 'C Nueva Concretada', 'C Seguimiento', 'C. Cierre', 'C. Casual'],
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      radius: 5
    },
    itemMargin: {
      horizontal: 25,
      vertical: 4
    }
  },
  responsive: [
    {
      breakpoint: 450,
      chart: {
        width: 280,
        height: 280
      },
      options: {
        legend: {
          show: false,
          position: 'bottom'
        }
      }
    }
  ]
};


const pieChartOptions = {
  chart: {
    type: "pie",
    width: 450,
    height: 450,
  },
  labels: [
    "G. de contactos",
    "C. Nueva Concretada",
    "C. Seguimiento",
    "C. Cierre",
    "C. Casual",
  ],
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      radius: 5,
    },
    itemMargin: {
      horizontal: 25,
      vertical: 4,
    },
  },
  responsive: [
    {
      breakpoint: 450,
      chart: {
        width: 280,
        height: 280,
      },
      options: {
        legend: {
          show: false,
          position: "bottom",
        },
      },
    },
  ],
};

// const series = [44, 55, 13, 43, 22];

const AnalisisModoContactosJV = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1989 },
    (_, index) => 1990 + index
  );
  const months = [
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

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState("Enero");
  const [selectedVendor, setSelectedVendor] = useState("vendedor1");
  const [vendorData, setVendorData] = useState({});
  const [vendorsArray, setVendorsArray] = useState([]);

  const [selectedJefeVendor, setSelectedJefeVendor] = useState("jdv1");
  // const [jefeVendorData, setJefeVendorData] = useState({});
  const [jefeVendorsArray, setJefeVendorsArray] = useState([]);
  
  const [selectedJefeSucursal, setSelectedJefeSucursal] = useState("jds1");
  const [jefeSucursalArray, setJefeSucursalArray] = useState([]);

  const [ventasPlan,setVentasPlan] = useState([34, 41, 36, 34, 42]);//AÑADIDO
  const [selectedData,setSelectedData] = useState("Todo");

  const [subTipo, setSubtipo] = useState(serie4);

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleJefeVendorChange = (event) => {
    setSelectedJefeVendor(event.target.value);
    setSelectedVendor(datosJefeVentas[event.target.value][0]);
  };

  const handleJefeSucursalChange = (event) => {
    setSelectedJefeSucursal(event.target.value);
    setSelectedJefeVendor(datosJefeSucursales[event.target.value][0]);
  };

  useEffect(()=>{
    const fetchData = () => {
      if(jefeSucursalArray.length === 0){
        const jefeSucursalNames = Object.keys(datosJefeSucursales);
        setJefeSucursalArray(jefeSucursalNames.map((key) => ({id:key, name:key})));
      }
    }
    fetchData();
  },[])

  useEffect(()=>{
    const fetchData = () => {
      if(selectedJefeSucursal){
        const jefeVendorsNames = Object.keys(datosJefeVentas).filter(jefeVendor => datosJefeSucursales[selectedJefeSucursal].includes(jefeVendor));
        setJefeVendorsArray(jefeVendorsNames.map((key) => ({id:key, name:key})));
        setSelectedVendor(datosJefeVentas[selectedJefeVendor])
      }
    }
    fetchData();
  },[selectedJefeVendor])

  useEffect(() => {
    const fetchData = () => {
      try {
        // Actualiza vendorsArray solo si está vacío
        if (selectedJefeVendor) {
          let vendorNames = Object.keys(datosVendedores).filter(vendedor => datosJefeVentas[selectedJefeVendor].includes(vendedor));
          setVendorsArray(vendorNames.map((key) => ({ id: key, name: key })));
        }else{
          setVendorsArray([]);
        }
        // Verifica si hay un vendedor seleccionado
        if (selectedVendor !== null) {
          // Obtiene los datos del vendedor seleccionado desde datosVendedores.json
          const vendorData = datosVendedores[selectedVendor];
          // Actualiza vendorData con los datos del vendedor seleccionado
          setVendorData(vendorData.NegociosPorCerrar);
          setVentasPlan(vendorData.AnalisisModoContactos[selectedYear][selectedMonth].VentasxPlan[selectedData]);//AÑADIDO
          setSubtipo(vendorData.AnalisisModoContactos[selectedYear][selectedMonth].Subtipo);
        } else {
          // Si no hay vendedor seleccionado, reinicia vendorData
          setVendorData({});
          setVentasPlan([138,141,184,142,127]);//AÑADIDO
          setSubtipo(serie4)
        }
      } catch (error) {
        // Maneja los errores de la solicitud
        console.error("Error al cargar datos desde la fuente externa: ", error);
      }
    };

    // Llama a la función fetchData para cargar los datos cuando el componente se monta
    fetchData();
  }, [selectedVendor, selectedData, selectedYear, selectedMonth, selectedJefeVendor]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form>
          <List sx={{ py: 0 }} dense>
            <Box display="flex" justifyContent="space-between" mb={2}>
            <Select
                value={selectedJefeSucursal || ""}
                onChange={handleJefeSucursalChange}
              >
                <MenuItem value={null} >Todos los jefes de sucursales</MenuItem>
                {/* Map a través del array de vendedores para crear los elementos del dropdown */}
                {jefeSucursalArray.map((jefeSucursal) => (
                  <MenuItem key={jefeSucursal.id} value={jefeSucursal.id}>
                    {jefeSucursal.name}
                  </MenuItem>
                ))}
              </Select>
            <Select
                value={selectedJefeVendor || ""}
                onChange={handleJefeVendorChange}
              >
                <MenuItem value={null} >Todos los jefes de ventas</MenuItem>
                {/* Map a través del array de vendedores para crear los elementos del dropdown */}
                {jefeVendorsArray.map((jefeVendor) => (
                  <MenuItem key={jefeVendor.id} value={jefeVendor.id}>
                    {jefeVendor.name}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={selectedVendor || ""}
                onChange={handleVendorChange}
              >
                <MenuItem value={null} >Todos los vendedores</MenuItem>
                {/* Map a través del array de vendedores para crear los elementos del dropdown */}
                {vendorsArray.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
              <Box display="flex" alignItems="flex-end">
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ marginRight: "20px" }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box mt={2}>
              <TableContainer
                sx={{ width: "60%", overflowX: "auto" }}
                style={{ width: "100%" }}
              >
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

                          <Select defaultValue="Hola"
                             onChange={(e) => setSelectedData(e.target.value)}
                            >
                            <MenuItem key={0} value={"Ventas_Nuevas"}>
                              Venta Nueva
                            </MenuItem>
                            <MenuItem key={1} value={"Renovacion"}>
                              Renovación
                            </MenuItem>
                            <MenuItem key={2} value={"Todo"}>
                              Todo
                            </MenuItem>
                          </Select>
                        </div>
                        <ApexPieChart
                          pieChartOptions={ventasPlanOptions}
                          initialSeries={ventasPlan}
                        />
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
                          <AcquisitionChart
                            opciones={barChartOptions}
                            series={subTipo}
                            type="bar"
                            height={250}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </List>
        </form>
      </Grid>
    </Grid>
  );
};

export default AnalisisModoContactosJV;
