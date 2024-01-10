// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import useCapacitacionesIniciales from 'hooks/useCapacitacionesIniciales';
import FiltrosActividadesPendientes from './FiltrosActividadesPendientes';
import ActividadesPendientesTable from './ActividadesPendientesTable';
// ==============================|| SAMPLE PAGE ||============================== //

const ActividadesPendientesVendedor = () => {
  // TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
  // eslint-disable-next-line no-unused-vars
  const { capacitacionesIniciales, createCapacitacionInicialAndRefresh, searchCapacitacionInicial } = useCapacitacionesIniciales();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FiltrosActividadesPendientes createCapacitacion={createCapacitacionInicialAndRefresh} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <ActividadesPendientesTable data={capacitacionesIniciales} />
        </Grid>
      </Grid>
    </>
  );
};

export default ActividadesPendientesVendedor;
