// material-ui

// project import
import MainCard from "components/MainCard";
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
  MenuItem
} from "@mui/material";

import ApexRadialChart from "sections/charts/apexchart/ApexRadialChart";
import AcquisitionChart from "sections/dashboard/analytics/AcquisitionChart";
import ApexPieChart from "sections/charts/apexchart/ApexPieChart";
import datosVendedores from '../../../assets/datosVendedores.json';

// ==============================|| SAMPLE PAGE ||============================== //
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
const NegociosxCerrarJV = () => {
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
          const vendorData = datosVendedores[selectedVendor].NegociosPorCerrar;
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
    <MainCard title="Dashboard">
      <form>
        <List sx={{ py: 0 }} dense>
          <Select value={selectedVendor || ""} onChange={handleVendorChange}>
            <MenuItem value={null}>Todos los vendedores</MenuItem>
            {/* Map a través del array de vendedores para crear los elementos del dropdown */}
            {vendorsArray.map((vendor) => (
              <MenuItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </MenuItem>
            ))}
          </Select>
          <TableContainer
            sx={{ width: "60%", overflowX: "auto"}}
            style={{ width: "100%", marginTop:"20px"}}
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
                    <div>
                      <label> NxC Plan </label>
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
                <TableRow>
                  <TableCell>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">Top Channels</Typography>
                      }
                      secondary="Today, 2:00 AM"
                    />
                    <ListItemSecondaryAction>
                      <Stack alignItems="flex-end"></Stack>
                    </ListItemSecondaryAction>
                  </TableCell>
                  <TableCell>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">Top Pages</Typography>
                      }
                      secondary="Today, 2:00 AM"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </List>
      </form>
    </MainCard>
  );
};

export default NegociosxCerrarJV;
