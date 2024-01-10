// eslint-disable-next-line no-unused-vars

import {
  Grid,
} from '@mui/material';

import PrimeraCitaConcretada from './primerCitasConcretada'

// TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
const VerificacionCitas = () => {
  return (
    <>
      <Grid container spacing={3}>
        <PrimeraCitaConcretada />
        {/* <Accordion> */}
        {/* </Accordion> */}
        {/* <Grid item xs={12}> */}
        {/* </Grid> */}
      </Grid>
    </>
  );
};

export default VerificacionCitas;

// import { useEffect, useState } from 'react';
// Accordion,
// AccordionSummary,
// Typography,
// AccordionDetails
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SegundaCitaConcretada from './segundaCitaConcretada'
