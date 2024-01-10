import React, { useState, useEffect } from "react";
import { Select, MenuItem, Grid, Box, List } from "@mui/material";
import MainCard from "components/MainCard";
import datosJefeSucursal from "../../../assets/datosJefeSucursal.json";
import CarteraActivaDirec from "./CarteraActivaDirec";

const CustomSelect = () => {
  const [selectedJefeSucursal, setSelectedJefeSucursal] = useState("jefe_sucursal_1");
  const [jefeSucursalInfo, setJefeSucursalInfo] = useState(null);
  const [jefesArray, setJefesArray] = useState([]);

  const handleJefeChange = (event) => {
    setSelectedJefeSucursal(event.target.value);
  };
useEffect(() => {
  const fetchData = async () => {
    try {
      // Actualiza jefesArray solo si está vacío
      if (jefesArray.length === 0) {
        const jefeNames = Object.keys(datosJefeSucursal.jefes_de_sucursal);
        const arrayDeJefes = jefeNames.map((key) => ({ id: key, name: key }));
        setJefesArray(arrayDeJefes);
      }

      // Verifica si hay un jefe de venta seleccionado
      if (selectedJefeSucursal) {
        // Obtiene los datos del jefe de venta para el jefe de venta seleccionado
        const info = Object.values(datosJefeSucursal.jefes_de_sucursal[selectedJefeSucursal].jefes_de_venta);
        console.log("Information: ", info);
        // Actualiza el estado de CarteraActiva
        setJefeSucursalInfo(info);
      } else {
        // Si no hay vendedor seleccionado, reinicia el estado de CarteraActiva
        setJefeSucursalInfo(null);
      }
    } catch (error) {
      // Manejar el error aquí
      console.error(`Error al obtener información: ${error.message}`);
    }
  };

  fetchData();
}, [selectedJefeSucursal, jefesArray]);


  console.log("Info jefe sucursal" +jefeSucursalInfo);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form>
          <List sx={{ py: 0 }} dense>
            <MainCard border={false} boxShadow>
            <Box display="flex" justifyContent="space-between" mb={2} sx={{width:"100%"}}>
              <label sx={{width:"240px", textAlign:"center"}}>Seleccione un Jefe de sucursal</label>
              <Select
                labelId="jefeSucursal"
                value={selectedJefeSucursal || ""}
                onChange={handleJefeChange}
                style={{
                            width: "100%",
                          }}
              >
                <MenuItem value={null}>Todos los jefes</MenuItem>
                {jefesArray.map((jefeSucursal) => (
                  <MenuItem key={jefeSucursal.id} value={jefeSucursal.id}>
                    {jefeSucursal.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            </MainCard>
            {jefeSucursalInfo && (
              <Box mt={2}>
                <CarteraActivaDirec datos={jefeSucursalInfo} />
              </Box>
            )}
          </List>
        </form>
      </Grid>
    </Grid>
  );
};

export default CustomSelect;
