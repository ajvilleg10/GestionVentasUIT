import React, { useState, useEffect } from "react";
import { Select, MenuItem, Grid, Box, List } from "@mui/material";
import MainCard from "components/MainCard";
import datosJefeVentas from "../../../assets/datosJefeVentas.json";
import CarteraActivaJS from "./CarteraActivaJS";

const CustomSelect = () => {
  const [selectedJefeVenta, setSelectedJefeVenta] = useState("jefe_venta_1");
  const [jefeVentaInfo, setJefeVentaInfo] = useState(null);
  const [jefesArray, setJefesArray] = useState([]);

  const handleJefeChange = (event) => {
    setSelectedJefeVenta(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Actualiza jefesArray solo si está vacío
        if (jefesArray.length === 0) {
          const jefeNames = Object.keys(datosJefeVentas.jefes_de_venta);
          const arrayDeJefes = jefeNames.map((key) => ({ id: key, name: key }));
          setJefesArray(arrayDeJefes);
        }
        // Actualiza jefesArray solo si está vacío
        // Verifica si hay un jefe de venta seleccionado
        console.log(selectedJefeVenta);
        if (selectedJefeVenta) {
          // Obtiene los datos del jefe de venta para el jefe de venta selccionado
          const info = datosJefeVentas.jefes_de_venta[selectedJefeVenta];
          console.log(info);
          // Actualiza el estado de CarteraActiva
          setJefeVentaInfo(info);
        } else {
          // Si no hay vendedor seleccionado, reinicia el estado de CarteraActiva
          setJefeVentaInfo(null);
        }
      } catch (error) {
        // Manejar el error aquí
        console.error(`Error al obtener información: ${error.message}`);
      }
    };

    fetchData();
  }, [selectedJefeVenta]);

  console.log(jefeVentaInfo);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form>
          <List sx={{ py: 0 }} dense>
            <MainCard border={false} boxShadow>
            <Box display="flex" justifyContent="space-between" mb={2} sx={{ width: "100%"}}>
              <label sx={{width:"240px", textAlign:"center"}}>Seleccione un Jefe de Venta</label>
              <Select 
                value={selectedJefeVenta || ""}
                onChange={handleJefeChange}
                style={{
                            width: "100%",
                          }}
              >
                <MenuItem value={null}>Todos los jefes</MenuItem>
                {jefesArray.map((jefeVenta) => (
                  <MenuItem key={jefeVenta.id} value={jefeVenta.id}>
                    {jefeVenta.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            </MainCard>
            {jefeVentaInfo && (
              <Box mt={2}>
                <CarteraActivaJS datos={jefeVentaInfo.vendedores} />
              </Box>
            )}
          </List>
        </form>
      </Grid>
    </Grid>
  );
};

export default CustomSelect;
