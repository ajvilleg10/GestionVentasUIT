import { Grid, List, ListItem, InputLabel, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Paper, Button } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { FileDownload } from "@mui/icons-material";

import dayjs from "dayjs";
import { useSelector } from "store";
import { useEffect, useState } from "react";

import { EmptyTable } from "components/third-party/ReactTable";
import { CITAS_HEADERS } from 'utils/reportes/headers';
import BusquedaReportes from "components/users/BusquedaReportes";

// TODO: Cambiar filas por la data obtenida del back
const ReporteCitas = () => {

  const currentUser = useSelector(state => state.user);
  const [citas, setCitas] = useState([]);

  console.log(currentUser);
  const exportData = () => { };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <List sx={{ py: 0 }} dense>
          <ListItem sx={{ px: 0 }}>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }} alignItems="start">
              <Button variant="contained" startIcon={<FileDownload />} onClick={exportData}>
                Exportar
              </Button>
            </Grid>
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <Grid item xs={12} md={6}>
              <BusquedaReportes data={citas} update={(newData) => setCitas(newData)} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'end' }} alignItems="start" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {CITAS_HEADERS.map((h) => (
                  <TableCell sx={{ minWidth: '170px' }} align={h.align} key={h.name}>{h.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.length === 0 ? (
                <EmptyTable msg="No existen datos para mostrar" colSpan={CITAS_HEADERS.length} />
              ) : (citas.map((cita) => (
                <TableRow key={cita.id} id={cita.id}>
                  {/*Aqui verificar como llega la data para mostrarla*/}
                  <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

};

export default ReporteCitas;
