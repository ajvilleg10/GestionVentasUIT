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
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ApexColumnChart from "sections/charts/apexchart/ApexColumnChart.js";
import ApexPieChart from "sections/charts/apexchart/ApexPieChart";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
import RoundIconCard from "components/statistics/RoundIconCard";
import MainCard from "components/MainCard";
import LinearWithLabel from "components/@extended/progress/LinearWithLabel";
import datosVendedores from '../../../assets/datosVendedores.json';


ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const columnChartOptions2 = {
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

const serie2 = [
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
];

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
    name: "Direct",
    data: [44, 55, 57, 55, 50, 52, 49],
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
const columnChartOptions4 = {
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
    categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
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

const serie7 = [
  {
    name: "Contratos Activos",
    data: [44, 55, 57, 50, 48, 53],
  },
  {
    name: "Contratos Inactivos",
    data: [76, 85, 101, 90, 88, 79],
  },
  {
    name: "Volumen de Ventas",
    data: [35, 41, 36, 30, 0, 0],
  },
];

const VolumenVentasJV = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorData, setVendorData] = useState({});
  const [vendorsArray, setVendorsArray] = useState([]);

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

useEffect(() => {
    const fetchData = () => {
      try {
        // Actualiza vendorsArray solo si está vacío
        if (vendorsArray.length === 0) {
          const vendorNames = Object.keys(datosVendedores);
          setVendorsArray(vendorNames.map((key) => ({ id: key, name: key })));
        }

        // Verifica si hay un vendedor seleccionado
        if (selectedVendor !== null) {
          // Obtiene los datos del vendedor seleccionado desde datosVendedores.json
          const vendorData = datosVendedores[selectedVendor].Volumen_Ventas;
          // Actualiza vendorData con los datos del vendedor seleccionado
          setVendorData(vendorData);
        } else {
          // Si no hay vendedor seleccionado, reinicia vendorData
          setVendorData({});
        }
      } catch (error) {
        // Maneja los errores de la solicitud
        console.error("Error al cargar datos desde la fuente externa: ", error);
      }
    };

    // Llama a la función fetchData para cargar los datos cuando el componente se monta
    fetchData();
  }, [selectedVendor, vendorsArray]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form>
            <List sx={{ py: 0 }} dense>
              <Select
                value={selectedVendor || ""}
                onChange={handleVendorChange}
              >
                <MenuItem value={null}>Todos los vendedores</MenuItem>
                {/* Map a través del array de vendedores para crear los elementos del dropdown */}
                {vendorsArray.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
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
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "blue" }}
                            >
                              Ventas Nuevas
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $9000
                          </Typography>
                          <Typography align="center">contratos 10</Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography align="center" style={{ color: "red" }}>
                              Contratos Inactivos
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $3,000
                          </Typography>
                          <Typography align="center">contratos 5</Typography>
                        </TableCell>

                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "#F1C40F" }}
                            >
                              Ventas Nuevas Reales
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $6,000
                          </Typography>
                          <Typography align="center">contratos 5</Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">Mensual</Typography>
                          <Typography variant="h5" align="center">
                            Nivel 1
                          </Typography>
                          <LinearWithLabel value={50} color="primary" />
                          <Typography align="center">
                            Meta Nivel 1 $6000
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            Renovaciones | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $3,000
                          </Typography>
                          <Typography align="center">contratos 5</Typography>
                        </TableCell>

                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "#C0392B " }}
                            >
                              Contratos Inactivos
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $3,000
                          </Typography>
                          <Typography align="center">contratos 5</Typography>
                        </TableCell>

                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "#D4AC0D" }}
                            >
                              Renovaciones Reales
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $5,000
                          </Typography>
                          <Typography align="center">contratos 10</Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "blue" }}
                            >
                              Contratos x Renovar
                            </Typography>
                            | Mensual
                          </Typography>
                          <Typography variant="h5" align="center">
                            8
                          </Typography>
                          <LinearWithLabel value={50} color="primary" />
                          <Typography align="center">Meta 10</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "blue" }}
                            >
                              Volumen de Ventas
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $8,000
                          </Typography>
                          <Typography align="center">contratos 10</Typography>
                        </TableCell>

                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography align="center" style={{ color: "red" }}>
                              Contratos Inactivos
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $3,000
                          </Typography>
                          <Typography align="center">contratos 5</Typography>
                        </TableCell>

                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "#F1C40F" }}
                            >
                              Volumen de Ventas Reales
                            </Typography>
                            | Del Mes
                          </Typography>
                          <Typography variant="h3" align="center">
                            $8,000
                          </Typography>
                          <Typography align="center">contratos 10</Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <Typography align="center">
                            <Typography
                              align="center"
                              style={{ color: "blue" }}
                            >
                              Bonificación
                            </Typography>
                            | Mensual
                          </Typography>
                          <Typography variant="h5" align="center">
                            Nivel 0
                          </Typography>
                          <LinearWithLabel value={50} color="primary" />
                          <Typography align="center">Meta n1 $6,000</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer
                  sx={{ width: "60%", overflowX: "auto" }}
                  style={{ width: "100%" }}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "600px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <label> Ventas por Origen </label>
                          <ApexColumnChart
                            opciones={columnChartOptions2}
                            series={serie2}
                            height={350}
                          />
                        </TableCell>
                        <TableCell
                          style={{
                            width: "300px",
                            height: "30px",
                            border: "40px solid #c1e6df",
                          }}
                        >
                          <label> Ley de Compensación </label>
                          <AcquisitionChart
                            opciones={barChartOptions3}
                            series={serie6}
                            type="bar"
                            height={250}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ border: "40px solid #c1e6df" }}>
                          <div>
                            <label> Ventas </label>
                            <ApexColumnChart
                              opciones={columnChartOptions4}
                              series={serie7}
                              height={350}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
                            <AcquisitionChart
                              opciones={barChartOptions}
                              series={serie4}
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
    </>
  );
};
export default VolumenVentasJV;
