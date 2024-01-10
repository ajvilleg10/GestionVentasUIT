import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,Box
} from "@mui/material";

const FiltroSelect = () => {
  const [tipoFiltro, setTipoFiltro] = useState("Mes");
  const [semana, setSemana] = useState("");
  const [mes, setMes] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [semestre, setSemestre] = useState("");

  const handleTipoFiltroChange = (event) => {
    const selectedTipoFiltro = event.target.value;
    setTipoFiltro(selectedTipoFiltro);
    // Restablecer los valores de los otros filtros
    setSemana("");
    setMes("");
    setTrimestre("");
    setSemestre("");
  };

  return (
    <FormControl fullWidth>
      <Grid container spacing={2}>
        <Box style={{ width: "240px" }} xs={8}>
          <InputLabel>Escoja tipo de filtro</InputLabel>
          <Select
            value={tipoFiltro}
            onChange={handleTipoFiltroChange}
            label="Escoja tipo de filtro"
          >
            <MenuItem value="semana">Semana</MenuItem>
            <MenuItem value="mes">Mes</MenuItem>
            <MenuItem value="trimestre">Trimestre</MenuItem>
            <MenuItem value="semestre">Semestre</MenuItem>
          </Select>
        </Box>

        <Box style={{ width: "240px" }} xs={4}>
          {tipoFiltro === "semana" && (
            <Grid item>
              <TextField
                label="Número de semana"
                variant="outlined"
                value={semana}
                onChange={(e) => setSemana(e.target.value)}
              />
            </Grid>
          )}

          {tipoFiltro === "mes" && (
            <Grid item>
              <Select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                label="Mes"
              >
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
              </Select>
            </Grid>
          )}

          {tipoFiltro === "trimestre" && (
            <Grid item>
              <Select
                value={trimestre}
                onChange={(e) => setTrimestre(e.target.value)}
                label="Trimestre"
              >
                <MenuItem value="ene-mar">Ene-Mar</MenuItem>
                <MenuItem value="abr-jun">Abr-Jun</MenuItem>
                <MenuItem value="jul-sep">Jul-Sep</MenuItem>
                <MenuItem value="oct-dic">Oct-Dic</MenuItem>
              </Select>
            </Grid>
          )}

          {tipoFiltro === "semestre" && (
            <Grid item>
              <Select
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                label="Semestre"
              >
                <MenuItem value="ene-jun">Ene-Jun</MenuItem>
                <MenuItem value="jul-dic">Jul-Dic</MenuItem>
              </Select>
            </Grid>
          )}
        </Box>
      </Grid>
    </FormControl>
  );
};

export default FiltroSelect;
