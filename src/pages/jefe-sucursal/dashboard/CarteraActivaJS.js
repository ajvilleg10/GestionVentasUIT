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
import MainCard from "components/MainCard";
import ApexRadialChart from "sections/charts/apexchart/ApexRadialChart";
import ApexColumnChart from "sections/charts/apexchart/ApexColumnChart.js";
import RoundIconCard from "components/statistics/RoundIconCard";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
import ApexPieChart from "sections/charts/apexchart/ApexPieChart";
import datosVendedores from "../../../assets/datosVendedores.json";
import VentasPlan from "../../../components/VentasPlan.js";

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


const CarteraActivaJS = ({datos}) => {
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
  const [vendorsArray, setVendorsArray] = useState([]);
  const [carteraActiva, setCarteraActiva] = useState(null);

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleYearChange = (event) => {
    // Maneja el cambio en el dropdown del año
    const year = event.target.value;
    setSelectedYear(year);
  };

  const handleMonthChange = (event) => {
    // Maneja el cambio en el dropdown del mes
    const month = event.target.value;
    setSelectedMonth(month);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (vendorsArray.length === 0) {
          // Obtener los nombres de los vendedores desde datosVendedores
          const vendorNames = Object.keys(datos);
          setVendorsArray(
            vendorNames.map((key) => ({ id: key, name: key }))
          );
        }

        if (selectedVendor && selectedYear && selectedMonth) {
          // Obtener el ID del vendedor desde datosVendedores
          const vendorId = vendorsArray.find((vendor) => vendor.name === selectedVendor)?.id;
          console.log(vendorId);
          // Obtener los datos de CarteraActiva para el vendedor, año y mes seleccionados
          const carteraActiva =
            datosVendedores[vendorId]?.[selectedYear]?.[selectedMonth] ?? null;
            console.log(carteraActiva);
          setCarteraActiva(carteraActiva);
        } else {
          setCarteraActiva(null);
        }
      } catch (error) {
        console.error("Error al cargar datos desde la fuente externa: ", error);
      }
    };

    fetchData();
  }, [selectedVendor, selectedYear, selectedMonth, datos]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form>
          <List sx={{ py: 0 }} dense>
            <MainCard border={false} boxShadow>
            <Box display="flex" justifyContent="space-between" mb={2} >
              <label sx={{width:"240px", textAlign:"center"}}>Seleccione un Vendedor</label>
              <Select 
                value={selectedVendor || ""}
                onChange={handleVendorChange}
                style={{
                            width: "540px",
              }}
              >
                <MenuItem value={null}>Todos los vendedores</MenuItem>
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
                  onChange={handleYearChange}
                  style={{ marginRight: "20px" }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            </MainCard>
            {carteraActiva && (
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
                          <VentasPlan datosIniciales={carteraActiva.VentasxPlan.data} />
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
                              series={carteraActiva.Subtipo.series4}
                              type="bar"
                              height={250}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <label> Proyección de cartera </label>
                    <AcquisitionChart
                      opciones={barChartOptions3}
                      series={carteraActiva.Proyeccion.series6}
                      type="bar"
                      height={250}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <RoundIconCard
                          primary="Cartera por cobrar"
                          secondary={`${
                            carteraActiva?.CarteraPorCobrar?.valor ||
                            "Valor no disponible"
                          }`}
                          content={`contratos ${
                            carteraActiva?.CarteraPorCobrar?.contratos ||
                            "Contratos no disponibles"
                          }`}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}
          </List>
        </form>
      </Grid>
    </Grid>
  );
};

export default CarteraActivaJS;
