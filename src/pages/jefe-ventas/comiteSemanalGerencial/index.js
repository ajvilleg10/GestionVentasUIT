import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// import CreacionReunion from './CreacionReunion';
import useComitesSemanales from 'hooks/asistente-ventas/useComiteSemanal';
// import useCurrentUser from 'hooks/useCurrentUser';
import AsistenciaTable from './AsistenciaTable';
import { useEffect } from 'react';

const ComiteSemanal = () => {

  const { reuniones, crearReunion, deleteReunion, updateAsistencia, updateReunion } = useComitesSemanales();
  // const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();
  // useEffect(() => {
  //   console.log('cuentaInfo', cuentaInfo?.empleado_id);

  // }, [])

  return (
    <>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear comité semanal gerencial</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionReunion crearReunion={crearReunion} />
            </AccordionDetails>
          </Accordion>
        </Grid> */}
        <Grid item xs={12}>
          <AsistenciaTable data={reuniones} handleDelete={deleteReunion} handleAsistencias={updateAsistencia} handleUpdate={updateReunion} />
        </Grid>
      </Grid>
    </>
  );
};

export default ComiteSemanal;
