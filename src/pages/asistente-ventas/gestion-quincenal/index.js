// eslint-disable-next-line no-unused-vars

import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import AsistenciaVendedoresTable from './AsistenciaVendedoresTable';
import CreacionCapacitacion from './CreacionCapacitacion';

import useCapacitacionQuincenal from 'hooks/asistente-ventas/useCapacitacionQuincenal';
import { useEffect } from 'react';

// TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
const GestionQuincenal = () => {

  const { 
    capacitaciones, 
    createCapacitacionQuincenalAndRefresh: crearCapacitacion, 
    deleteCapacitacionQuincenalAndRefresh: deleteCapacitacion,
    updateAsistenciaCapacitacionQuincenalAndRefresh: updateAsistencia,
    updateCapacitacionQuincenalAndRefresh: updateCapacitacion
  } = useCapacitacionQuincenal();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear capacitación</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionCapacitacion crearCapacitacion={crearCapacitacion} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaVendedoresTable data={capacitaciones} handleDelete={deleteCapacitacion} handleAsistencias={updateAsistencia} handleUpdate={updateCapacitacion} />
        </Grid>
      </Grid>
    </>
  );
};

export default GestionQuincenal;
