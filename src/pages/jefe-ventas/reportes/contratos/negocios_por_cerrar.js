import { Grid, List, ListItem, InputLabel, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Paper, Button, FormControl, Select, MenuItem } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { FileDownload } from "@mui/icons-material";

import MainCard from "components/MainCard";

import { useSelector } from "store";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { EmptyTable } from "components/third-party/ReactTable";

const ReporteNegociosPorCerrarJefe = () => {

  const currentUser = useSelector(state => state.user);
  // const [contactos, setContactos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  // const [vendedor, setVendedor] = useState('');

  // useEffect(() => {

  //   const fetchVendedores = async () => {
  //     fetch(`http://localhost:3000/api/jefesVentas/vendedores/${currentUser.id}`).then((data) => data.json()).then((json) => { console.log(json.data); ;setVendedores(json.data); if(json.data.length !== 0) setVendedor(json.data[0].empleado_id); }).catch((error) => console.log(error));
  //     if (vendedores.length !== 0){
  //       console.log(vendedor);
  //       fetch(`http://localhost:3000/api/contactos/empleados/${vendedor}`).then((data) => data.json()).then((json) => setContactos(json)).catch((error) => console.log(error));
  //     }
  //   };

  //   fetchVendedores();

  // }, [vendedor]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <List sx={{ py: 0 }} dense>
          <ListItem sx={{ px: 0 }}>
            <Grid item xs={12} md={3}>
              <FormControl sx={{ width: '75%' }}>
                <InputLabel id="vendedor-select-reporte">Vendedor</InputLabel>
                <Select
                  id="vendedor_id"
                  name="vendedor_id"
                  label="Vendedor"
                  labelId="vendedor-select-reporte"
                  value={''}
                >
                  {vendedores && vendedores.map((e) => (
                    <MenuItem value={e.id} key={e.id}>
                      {e.Empleado.nombres + ' ' + e.Empleado.apellidos}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  type="date"
                  value={dayjs().subtract(1, 'month')} // Aqui va la fecha en la que inicio el sistema
                  minDate={dayjs().subtract(1, 'month')}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      name: 'fecha_inicio',
                      id: 'fecha_inicio',
                      label: 'Fecha de inicio'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  type="date"
                  value={dayjs()} // Aqui va la fecha en la que inicio el sistema
                  minDate={dayjs().subtract(1, 'month')}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      name: 'fecha_final',
                      id: 'fecha_final',
                      label: 'Fecha final'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" startIcon={<FileDownload />} onClick={() => console.log('Exportar el archivo')}>
                Exportar
              </Button>
            </Grid>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Vendedor</TableCell>
                <TableCell align="center"># Cotización</TableCell>
                <TableCell align="center">Fecha y hora del sistema</TableCell>
                <TableCell align="center">Fecha y hora de registro</TableCell>
                <TableCell align="center">Año</TableCell>
                <TableCell align="center">Nombres y apellidos</TableCell>
                <TableCell align="center">Cédula</TableCell>
                <TableCell align="center">Celular</TableCell>
                <TableCell align="center">Correo</TableCell>
                <TableCell align="center">Dirección</TableCell>
                <TableCell align="center">Referidor</TableCell>
                <TableCell align="center">Tipo de contacto</TableCell>
                <TableCell align="center">Origen</TableCell>
                <TableCell align="center">Tipo de cita</TableCell>
                <TableCell align="center">Plan</TableCell>
                <TableCell align="center">Tipo de plan</TableCell>
                <TableCell align="center">Valor neto anual</TableCell>
                <TableCell align="center">Total cuota mensual</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <EmptyTable msg="No hay datos para mostrar" colSpan={27} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

};

export default ReporteNegociosPorCerrarJefe;
