import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import AsistenciaVendedoresTable from './AsistenciaVendedoresTable';
// import CreacionComiteMensual from './CreacionComiteMensual';
import useComitesMensuales from 'hooks/asistente-ventas/useComiteMensual';

const GestionMensual = () => {
  const { reuniones, crearReunion, deleteReunion, updateAsistencia, updateReunion } = useComitesMensuales();

  return (
    <>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear comité mensual</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionComiteMensual crearReunion={crearReunion} />
            </AccordionDetails>
          </Accordion>
        </Grid> */}
        <Grid item xs={12}>
          <AsistenciaVendedoresTable data={reuniones} handleDelete={deleteReunion} handleAsistencias={updateAsistencia} handleUpdate={updateReunion} />
        </Grid>
      </Grid>
    </>
  );
};

export default GestionMensual;
