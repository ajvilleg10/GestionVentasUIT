import { useState } from "react";

import { Grid, List, ListItem, MenuItem, Select, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

import ConfBonificacionGestion from "./bonifcacion-vendedor";
import ConfBonificacionAsistenteVentas from "./bonificacion-asistente"
import BonificacionJefeVentas from "./bonificacion-jefe"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ConfBonificacionSelector = () => {

  const [tipoUsuario, setTipoUsuario] = useState(0);

  return (
    <>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Escoger usuario</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ py: 0 }} dense>
              <ListItem fullWidth>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={2} display="flex" alignItems="center">
                    Tipo de Usuario
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Select fullWidth value={tipoUsuario} onChange={(tipo) => setTipoUsuario(tipo.target.value)} defaultValue={tipoUsuario}>
                      <MenuItem key={0} value={0}>Vendedor</MenuItem>
                      <MenuItem key={1} value={1}>Asistente de Ventas</MenuItem>
                      <MenuItem key={2} value={2}>Jefe de Ventas</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        {tipoUsuario === 0 && <ConfBonificacionGestion />}
        {tipoUsuario === 1 && <ConfBonificacionAsistenteVentas />}
        {tipoUsuario === 2 && <BonificacionJefeVentas />}
      </Grid>
    </>
  )
}

export default ConfBonificacionSelector;
