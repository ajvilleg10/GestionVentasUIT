import { Grid, List, ListItem, Button, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRef, useState } from 'react';
import dayjs from "dayjs";

const today = dayjs();
const systemDate = dayjs().subtract(1, 'month');

const BusquedaReportesJefeVentas = ({ data, update, cotizacion, vendedores }) => {

  const [initDate, setInitDate] = useState(systemDate);
  const [finalDate, setFinalDate] = useState(today);
  const [ncotizacion, setNCotizacion] = useState('');
  const [vendedor, setVendedor] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(initDate.format("YYYY-MM-DD"));
    console.log(finalDate.format("YYYY-MM-DD"));

    if (typeof ncotizacion === 'string') {
      console.log('No seleccionado');
    }

    const info = data.filter((d) => {
      // console.log(vendedor);
      // console.log(d.Empleado.id);
      return d.Empleado.id === Number(vendedor);
    });

    console.log(info.length);

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
                <Grid item xs={12} md={6} >
                  <FormControl fullWidth sx={{ paddingRight: '35px' }}>
                    <InputLabel id="vendedor-select-reporte">Vendedor</InputLabel>
                    <Select
                      id="vendedor_id"
                      name="vendedor_id"
                      label="Vendedor"
                      labelId="vendedor-select-reporte"
                      value={vendedor}
                      onChange={(e) => setVendedor(e.target.value)}
                    >
                      {vendedores && vendedores.map((e) => (
                        <MenuItem value={e.Empleado.id} key={e.id}>
                          {e.Empleado.nombres + ' ' + e.Empleado.apellidos}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={12} md={12}>
                  <Button fullWidth variant="contained" color="primary" type="submit">
                    Buscar
                  </Button>
                </Grid>
              </ListItem>
            </List>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );

};

export default BusquedaReportesJefeVentas;


