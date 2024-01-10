// eslint-disable-next-line no-unused-vars
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import AsistenciaTable from './AsistenciaTable';
import useCapacitacionesIniciales from 'hooks/useCapacitacionesIniciales';
import CreacionCapacitacionInicial from './CreacionCapacitacionInicial';

// TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
// TODO: Intentar usar un estado para el Accordion; cuando se cree una nueva capacitacion, cerrarlo.
const CapacitacionInicial = () => {

  const { capacitacionesIniciales, createCapacitacionInicialAndRefresh } = useCapacitacionesIniciales();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Crear capacitación inicial</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreacionCapacitacionInicial createCapacitacion={createCapacitacionInicialAndRefresh} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} width={'100%'}>
          <AsistenciaTable data={capacitacionesIniciales}/>
        </Grid>
      </Grid>
    </>
  );
};

export default CapacitacionInicial;
