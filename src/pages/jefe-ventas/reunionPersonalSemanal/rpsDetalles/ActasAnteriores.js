import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography } from '@mui/material'
import MainCard from 'components/MainCard'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dayMonthYearFormat, timeShortFormat } from 'utils/reunionFormat';
import ActaMejoramientoAnterior from './ActaMejoramientoAnterior';

const ActasAnteriores = ({ idReunionHoy, reuniones }) => {
  const [search, setSearch] = useState('');


  const reunionesRemoveHoy = reuniones.filter((reunion) => {
    // console.log('10', typeof(idReunionHoy), typeof(reunion.idReunion))
    return reunion.idReunion != idReunionHoy
  });

  const reunionesRemoveHoyFiltered = reunionesRemoveHoy?.filter((reunion) => {
    console.log('duracionnn', reunion, reunion.antecedentes, dayMonthYearFormat(reunion.fechaReunion));
    return search.toLowerCase() === ''
      ? reunion
      : (
        reunion.antecedentes?.toLowerCase().includes(search.toLowerCase()) ||
        reunion.compromiso?.toLowerCase().includes(search.toLowerCase()) ||
        reunion.meta?.toLowerCase().includes(search.toLowerCase()) ||
        dayMonthYearFormat(reunion.fechaReunion).includes(search.toLowerCase())
      )
  });


  const actasMejoramiento = reunionesRemoveHoyFiltered.map((reunion) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{dayMonthYearFormat(reunion.fechaReunion)}</Typography>&nbsp;&nbsp;&nbsp;
          <Typography>Reunion ID: {reunion.idReunion}</Typography>&nbsp;&nbsp;&nbsp;
          <Typography>duracion: {timeShortFormat(reunion.duracion)}</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <ActaMejoramientoAnterior reunion={reunion} />
        </AccordionDetails>
      </Accordion>
    )
  });



  return (
    <>
      <Box maxWidth="md" sx={{ my: 1 }}>
        <TextField fullWidth type='search' id='search' label='Search' variant='outlined' onChange={(e) => setSearch(e.target.value)} />
      </Box>
      <MainCard >
        {actasMejoramiento}
      </MainCard>
    </>
  )
}

export default ActasAnteriores