import {
  Grid,
  List,
  ListItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState, useRef } from 'react';
import dayjs from "dayjs";
import { dispatch, useSelector } from "store";
import { setShowData } from "store/reducers/reportes";
import useVendedoresByJefeVentaEmpeladoId from "hooks/jefeVenta/useVendedoresByJefeVentaEmpeladoId";

const today = dayjs();
const systemDate = dayjs().subtract(1, 'month');

const BusquedaReportes = ({ cotizacion }) => {

  const [initDate, setInitDate] = useState(systemDate);
  const [finalDate, setFinalDate] = useState(today);
  const [ncotizacion, setNCotizacion] = useState('');
  const [vendedor, setVendedor] = useState('');

  const data = useSelector(state => state.reportes);
  const currentUser = useSelector(state => state.user);
  const vendedores = useVendedoresByJefeVentaEmpeladoId();

  useEffect(() => { }, [data, vendedores]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (typeof ncotizacion === 'string') {
      console.log('No seleccionado');
    }

    let result = [];

    if (currentUser.alias === 'jefe_ventas') {

      result = data.initialData.filter((c) => Number(vendedor) === c.vendedor.id);
      dispatch(setShowData({ data: result }));
      return;

    }

    const info = data.initialData.slice(1);
    dispatch(setShowData({ data: info }));

  };

  const limpiarBusqueda = () => {

    setInitDate(systemDate);
    setFinalDate(today);
    setVendedor('');
    dispatch(setShowData({ data: data.initialData }));

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
              {currentUser.alias === 'jefe_ventas' && (
                <ListItem>
                  <Grid item xs={12} md={4} >
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
                        {vendedores.length === 0 && (
                          <MenuItem value={'empty'} key={'empty'} disabled>
                            No existen vendedores
                          </MenuItem>
                        )}
                        {vendedores.map((e) => (
                          <MenuItem value={e.id} key={e.id}>
                            {e.Empleado.nombres + ' ' + e.Empleado.apellidos}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </ListItem>
              )}
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
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                    <Button fullWidth variant="contained" color="primary" type="submit">
                      Buscar
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button fullWidth variant="contained" color="error" onClick={limpiarBusqueda}>
                      Limpiar búsqueda
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );

};

export default BusquedaReportes;
