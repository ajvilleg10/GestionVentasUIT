import { useEffect, useState } from 'react';

import {
  Grid,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableCompensacion from './tableCompensacion';

const ConfBonificacionGestion = () => {

  const [anio, setAnio] = useState('');

  useEffect(() => {
    console.log(anio);
  }, [anio]);

  return (
    <>
      <Grid container spacing={3} width={'100%'}>
        <Grid item width={'100%'}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Buscar año</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ py: 0 }} dense>
                <ListItem fullWidth>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={2} display="flex" alignItems="center">
                      Año
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                          label={'Seleccione un año'} 
                          openTo="year" 
                          views={['year']} 
                          minDate={dayjs("2023-05-01T00:00:00.000Z")} 
                          onChange={(event) => { setAnio(event.toDate().getUTCFullYear().toString()) }} 
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item width={'100%'}>
          {anio && (< TableCompensacion key={anio} anio={anio} />)}
        </Grid>
      </Grid>
    </>
  );
};

export default ConfBonificacionGestion;
