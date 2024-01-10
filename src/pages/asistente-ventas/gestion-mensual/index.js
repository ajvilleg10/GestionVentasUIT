// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import AsistenciaVendedoresTable from './AsistenciaVendedoresTable';
import useCapacitacionesIniciales from 'hooks/useCapacitacionesIniciales';
import CreacionCapacitacion from './CreacionCapacitacion';
// ==============================|| SAMPLE PAGE ||============================== //

const GestionMensual = () => {
  // TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
  // eslint-disable-next-line no-unused-vars
  const { capacitacionesIniciales, createCapacitacionInicialAndRefresh, searchCapacitacionInicial } = useCapacitacionesIniciales();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear Capacitación</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionCapacitacion createCapacitacion={createCapacitacionInicialAndRefresh} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaVendedoresTable data={capacitacionesIniciales} />
        </Grid>
      </Grid>
    </>
  );
};

export default GestionMensual;
