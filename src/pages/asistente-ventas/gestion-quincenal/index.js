// eslint-disable-next-line no-unused-vars
import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// project import
import AsistenciaVendedoresTable from './AsistenciaVendedoresTable';
import CreacionCapacitacion from './CreacionCapacitacion';
import { useEffect } from 'react';
import useReunionGeneral from 'hooks/asistente-ventas/useReunionGeneral';
import { REUNION } from 'utils/constants';
import { dispatch } from 'store';
import { setInitialReuniones } from 'store/reducers/reunionGeneral';

const GestionQuincenal = () => {

  const { 
    createNewReunion: crearCapacitacion, 
    updateReunion: updateCapacitacion, 
    deleteReunion: deleteCapacitacion,
    sendEmail, 
    updateAsistencia 
  } = useReunionGeneral(REUNION.Quincenal);

  useEffect(() => {
    return () => {
      console.log('Clean up de capacitaciones quincenales');
      dispatch(setInitialReuniones({ tipo_reunion: REUNION.Quincenal, data: [] }))
    }
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear capacitación quincenal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionCapacitacion crearCapacitacion={crearCapacitacion} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaVendedoresTable 
            handleDelete={deleteCapacitacion} 
            handleAsistencias={updateAsistencia} 
            handleUpdate={updateCapacitacion} 
            sendEmail={sendEmail}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GestionQuincenal;
