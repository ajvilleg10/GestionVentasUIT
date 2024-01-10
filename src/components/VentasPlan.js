import React, { useState, useEffect } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import ApexPieChart from "sections/charts/apexchart/ApexPieChart"; // Asegúrate de importar el componente correcto

const VentasPlan = ({ datosIniciales }) => {
  const [filtro, setFiltro] = useState("Todo"); // Estado para almacenar el valor seleccionado del filtro
  const [datosFiltrados, setDatosFiltrados] = useState([]
  ); // Estado para almacenar los datos filtrados

  useEffect(() => {
    // Función para filtrar los datos según la opción seleccionada del filtro
    const filtrarDatos = () => {
      if (filtro === "VentaNueva") {
        const datosFiltrados=datosIniciales["VentaNueva"];
        setDatosFiltrados(datosFiltrados);
        console.log(datosFiltrados.serie);
      } else if (filtro === "Renovacion") {
        const datosFiltrados = datosIniciales["Renovacion"];
        setDatosFiltrados(datosFiltrados);
        console.log(datosFiltrados.serie);
      } else {
        // Calcula la suma de "VentaNueva" y "Renovacion" para el filtro "Todo"
        const datosFiltrados = datosIniciales["Todo"];
        setDatosFiltrados(datosFiltrados);
        console.log(datosFiltrados);
      }
    };

    filtrarDatos(); // Llama a la función de filtrado al cambiar el filtro
  }, [filtro, datosIniciales]);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value); // Actualiza el estado cuando se selecciona una opción del filtro
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="h5">Ventas x Plan</Typography>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Filtro:</label>
        <Select value={filtro} onChange={handleFiltroChange}>
          <MenuItem key="VentaNueva" value="VentaNueva">
            Venta Nueva
          </MenuItem>
          <MenuItem key="Renovacion" value="Renovacion">
            Renovación
          </MenuItem>
          <MenuItem key="Todo" value="Todo">
            Todo
          </MenuItem>
        </Select>
      </div>
      {datosFiltrados && (
        <ApexPieChart initialSeries={datosFiltrados?.serie} /> 
      )}
    </div>
  );
};

export default VentasPlan;
