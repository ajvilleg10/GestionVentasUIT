import { Grid, List, ListItem, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Paper, Button, FormControl, Select, MenuItem } from "@mui/material";

import { FileDownload } from "@mui/icons-material";

import { useSelector } from "store";
import { useEffect, useRef, useState } from "react";

import dayjs from "dayjs";
import BusquedaReportesJefeVentas from "components/users/BusquedaReportesJefeVentas";
import { CONTACTOS_HEADERS } from "utils/reportes/headersJefeVentas";
import { EmptyTable } from "components/third-party/ReactTable";
import axios from "utils/axios";

const ReporteContactosJefe = () => {

  const currentUser = useSelector(state => state.user);
  const [contactos, setContactos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [vendedor, setVendedor] = useState('');

  const dataRef = useRef([]);

  useEffect(() => {

    const fetchVendedores = async () => {
      fetch(`http://localhost:3000/api/jefesVentas/vendedores/${currentUser.id}`).then((data) => data.json()).then((json) => { console.log(json.data);; setVendedores(json.data); if (json.data.length !== 0) setVendedor(json.data[0].empleado_id); }).catch((error) => console.log(error));
    };

    const fetchContactos = async () => {
      const response = await axios.get('/contactos');
      dataRef.current = response.data;
      setContactos(response.data);
    };

    fetchContactos();
    fetchVendedores();

  }, []);

  const exportData = () => { };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <List sx={{ py: 0 }} dense>
          <ListItem sx={{ px: 0, py: 0 }}>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }} alignItems="start">
              <Button variant="contained" startIcon={<FileDownload />} onClick={exportData}>
                Exportar
              </Button>
            </Grid>
          </ListItem>
          <ListItem sx={{ px: 0, py: 2 }}>
            <Grid item xs={12} md={6}>
              <BusquedaReportesJefeVentas data={dataRef.current} update={(newData) => setContactos(newData)} vendedores={vendedores} />
            </Grid>
            <Grid item xs={12} md={6} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow id="reporte-header-contactos">
                {CONTACTOS_HEADERS.map((h) => (
                  <TableCell sx={{ minWidth: '170px' }} key={h.name} align={h.align}>{h.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {contactos.length === 0 ? (
                <EmptyTable msg="No existen datos para mostrar" colSpan={CONTACTOS_HEADERS.length} />
              ) : (contactos.map((contacto) => (
                <TableRow key={contacto.numero_celular}>
                  <TableCell align="center">{contacto.Empleado.nombres + ' ' + contacto.Empleado.apellidos}</TableCell>
                  <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
                  <TableCell align="center">{dayjs(contacto.createdAt).format("YYYY-MM-DD HH:mm")}</TableCell>
                  <TableCell align="center">{contacto.nombres + ' ' + contacto.apellidos}</TableCell>
                  <TableCell align="center">{contacto.numero_celular}</TableCell>
                  <TableCell align="center">{'Referidor'}</TableCell>
                  <TableCell align="center">{contacto.EstadoContacto.descripcion}</TableCell>
                  <TableCell align="center">{'Tipo de contacto'}</TableCell>
                  <TableCell align="center">{contacto.origen_contacto}</TableCell>
                  <TableCell align="center">{contacto.comentarios}</TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

};

export default ReporteContactosJefe;
