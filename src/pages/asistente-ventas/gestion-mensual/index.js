import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import AsistenciaVendedoresTable from './AsistenciaVendedoresTable';
import CreacionComiteMensual from './CreacionComiteMensual';
import useReunionGeneral from 'hooks/asistente-ventas/useReunionGeneral';

import { REUNION } from 'utils/constants';
import { dispatch } from 'store';
import { setInitialReuniones } from 'store/reducers/reunionGeneral';
import { useEffect } from 'react';

const GestionMensual = () => {

  const { createNewReunion: crearReunion,
    updateReunion,
    deleteReunion,
    sendEmail,
    updateAsistencia
  } = useReunionGeneral(REUNION.Mensual);

  useEffect(() => {
    return () => {
      console.log('Clean up de comites mensuales');
      dispatch(setInitialReuniones({ tipo_reunion: REUNION.Mensual, data: [] }))
    }
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear comité mensual</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionComiteMensual crearReunion={crearReunion} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <AsistenciaVendedoresTable
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

export default GestionMensual;
