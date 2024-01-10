import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AsistenciaTable from './AsistenciaTable';
import CreacionReunion from './CreacionReunion';
import useComitesSemanales from 'hooks/asistente-ventas/useComiteSemanal';

const ComiteSemanal = () => {

  const { reuniones, crearReunion, deleteReunion, updateAsistencia, updateReunion } = useComitesSemanales();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear comité semanal gerencial</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionReunion crearReunion={crearReunion} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaTable data={reuniones} handleDelete={deleteReunion} handleAsistencias={updateAsistencia} handleUpdate={updateReunion} />
        </Grid>
      </Grid>
    </>
  );
};

export default ComiteSemanal;
