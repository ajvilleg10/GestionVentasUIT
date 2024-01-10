import { Grid, List, ListItem, Button, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, FormControl } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';
import dayjs from "dayjs";

const today = dayjs();
const systemDate = dayjs().subtract(1, 'month');

const BusquedaReportes = ({ data, update, cotizacion }) => {

  const [initDate, setInitDate] = useState(systemDate);
  const [finalDate, setFinalDate] = useState(today);
  const [ncotizacion, setNCotizacion] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(initDate.format("YYYY-MM-DD"));
    console.log(finalDate.format("YYYY-MM-DD"));

    if (typeof ncotizacion === 'string') {
      console.log('No seleccionado');
    }

    const info = data.slice(1);

    update(info);

  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Buscar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <List sx={{ py: 0 }}>
              <ListItem>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      type="date"
                      value={initDate}
                      minDate={systemDate}
                      maxDate={today}
                      onChange={(date) => setInitDate(date)}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          name: 'fecha_inicio',
                          id: 'fecha_inicio',
                          label: 'Fecha de inicio',
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      type="date"
                      value={finalDate}
                      minDate={initDate}
                      maxDate={today}
                      onChange={(date) => setFinalDate(date)}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          name: 'fecha_final',
                          id: 'fecha_final',
                          label: 'Fecha final',
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </ListItem>
              {cotizacion && (
                <ListItem>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        sx={{ paddingRight: '35px' }}
                        id="cotizacion"
                        name="cotizacion"
                        value={ncotizacion}
                        type="number"
                        label="# de Cotización"
                        onChange={(data) => setNCotizacion(data.target.value)}
                        inputProps={{
                          variant: 'outlined',
                          name: 'cotizacion',
                          id: 'cotizacion_text',
                          min: 1
                        }}
                      />
                    </FormControl>
                  </Grid>
                </ListItem>
              )}
              <ListItem>
                <Grid item xs={12} md={12}>
                  <Button fullWidth variant="contained" color="primary" type="submit">
                    Buscar
                  </Button>
                </Grid>
                {/* <Grid item xs={12} md={2} px={2}> */}
                {/*   <Button variant="contained" color="error" fullWidth> */}
                {/*     Cancelar */}
                {/*   </Button> */}
                {/* </Grid> */}
              </ListItem>
            </List>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );

};

export default BusquedaReportes;


