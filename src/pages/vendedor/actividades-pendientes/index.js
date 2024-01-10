import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiltrosActividadesPendientes from './FiltrosActividadesPendientes';
import ActividadesPendientesTable from './ActividadesPendientesTable';

import useActividad from 'hooks/useActividad';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';

const ActividadesPendientesVendedor = () => {

  const user = useSelector(state => state.user);
  const [actividades, setActividades] = useState([]);
  const { getActividadesByEmpleado, completarActividadVendedor } = useActividad();

  const fetchActividad = async () => {
    const response = await getActividadesByEmpleado(user?.id, { aprobada: false });
    setActividades(response);
  };

  useEffect(() => {
    fetchActividad();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FiltrosActividadesPendientes createCapacitacion={() => { }} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <ActividadesPendientesTable data={actividades} updateActividad={completarActividadVendedor} />
        </Grid>
      </Grid>
    </>
  );
};

export default ActividadesPendientesVendedor;
