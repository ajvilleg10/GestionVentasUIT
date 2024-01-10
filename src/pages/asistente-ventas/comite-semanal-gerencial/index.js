import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AsistenciaTable from './AsistenciaTable';
import CreacionReunion from './CreacionReunion';
import useReunionGeneral from 'hooks/asistente-ventas/useReunionGeneral';

import { REUNION } from 'utils/constants';
import { useEffect } from 'react';
import { dispatch } from 'store';
import { setInitialReuniones } from 'store/reducers/reunionGeneral';

const ComiteSemanal = () => {

  const { createNewReunion, updateReunion, deleteReunion, sendEmail, updateAsistencia } = useReunionGeneral(REUNION.Semanal);

  useEffect(() => {
    return () => {
      console.log('Clean up de comites semanales');
      dispatch(setInitialReuniones({ tipo_reunion: REUNION.Semanal, data: [] }))
    }
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear comité semanal gerencial</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionReunion crearReunion={createNewReunion} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaTable 
            handleDelete={deleteReunion} 
            handleAsistencias={updateAsistencia} 
            handleUpdate={updateReunion}
            sendEmail={sendEmail}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ComiteSemanal;
