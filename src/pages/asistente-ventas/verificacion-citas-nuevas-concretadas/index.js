// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

import {
    Grid,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrimeraCitaConcretada from './primerCitasConcretada'
import SegundaCitaConcretada from './segundaCitaConcretada'

const VerificacionCitas = () => {
    // TODO: cambiar contactos por vendedores que no tengan capacitacion_inicial false
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Accordion>
                    <PrimeraCitaConcretada />
                    </Accordion>
                </Grid>
                
            </Grid>
        </>
    );
};

export default VerificacionCitas;
