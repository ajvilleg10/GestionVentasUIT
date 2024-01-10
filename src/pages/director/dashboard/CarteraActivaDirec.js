import React, { useState, useEffect } from "react";
import { Select, MenuItem, Grid, Box, List } from "@mui/material";
import MainCard from "components/MainCard";
import datosJefeVentas from "../../../assets/datosJefeVentas.json";
import CarteraDirect from "./CarteraDirect";

const CartaActivaDirec = ({datos}) => {
  const [selectedJefeVenta, setSelectedJefeVenta] = useState("jefe_venta_1");
  const [jefeVentaInfo, setJefeVentaInfo] = useState(null);
  const [jefesArray, setJefesArray] = useState([]);

  const handleJefeChange = (event) => {
    setSelectedJefeVenta(event.target.value);
  };

useEffect(() => {
    // Verifica si hay un jefe de venta seleccionado
    if (selectedJefeVenta) {
      const selectedJefe = Object.values(datosJefeVentas.jefes_de_venta[selectedJefeVenta]);
      console.log("Selected jefe: "+selectedJefe);
      if (selectedJefe) {
        setJefeVentaInfo(selectedJefe);
      } else {
        console.error(`No se encontró el id para ${selectedJefeVenta}`);
      }
    } else {
      // Si no hay vendedor seleccionado, reinicia el estado de CarteraActiva
      setJefeVentaInfo(null);
    }
  }, [selectedJefeVenta, datos]);

  console.log("Info jefes de venta:"+jefeVentaInfo);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form>
          <List sx={{ py: 0 }} dense>
            <MainCard border={false} boxShadow>
            <Box display="flex" justifyContent="space-between" mb={2} sx={{width:"100%"}}>
              <label sx={{width:"240px", textAlign:"center"}}>Seleccione un Jefe de Venta</label>
              <Select
                value={selectedJefeVenta || ""}
                onChange={handleJefeChange}
                style={{
                            width: "100%",
                          }}
              >
                <MenuItem value={null}>Todos los jefes</MenuItem>
                {datos.map((jefeVenta) => (
                  <MenuItem key={jefeVenta.id} value={jefeVenta.id}>
                    {jefeVenta.id}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            </MainCard>
            {jefeVentaInfo && (
              <Box mt={2}>
                <CarteraDirect />
              </Box>
            )}
          </List>
        </form>
      </Grid>
    </Grid>
  );
};

export default CartaActivaDirec;
