import { Grid, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Paper } from "@mui/material";

import dayjs from "dayjs";
import BusquedaReportes from "components/users/BusquedaReportes";
import { EmptyTable, CSVExport } from "components/third-party/ReactTable";
import { CONTACTOS_HEADERS } from 'utils/reportes/headers';

import MainCard from "components/MainCard";

import useReporteContactos from 'hooks/reportes/contactos';

const ReporteContactos = () => {

  const { contactos } = useReporteContactos();

  return (
    <MainCard
      title="Control de reporte"
      contentSX={{ height: '100vh' }}
      secondary={
        <CSVExport
          data={contactos}
          tooltip="Exportar todo"
          filename={'contactos.csv'}
        />
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ paddingBottom: 5 }}>
          <BusquedaReportes data={contactos} update={(newData) => console.log(newData)} />
        </Grid>
        <Grid item xs={12} md={12}>
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
                  <TableRow key={contacto.numero_celular} id={contacto.numero_celular}>
                    <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
                    <TableCell align="center">{dayjs(contacto.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
                    <TableCell align="center">{contacto.nombres}</TableCell>
                    <TableCell align="center">{contacto.apellidos}</TableCell>
                    <TableCell align="center">{contacto.numero_celular}</TableCell>
                    <TableCell align="center">{contacto.referidor ?? 'Referidor'}</TableCell>
                    <TableCell align="center">{contacto.estado_contacto.descripcion}</TableCell>
                    <TableCell align="center">{contacto.tipo_contacto ?? 'Tipo de contacto'}</TableCell>
                    <TableCell align="center">{contacto.origen_contacto}</TableCell>
                    <TableCell align="center">{contacto.comentarios}</TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid >
    </MainCard>
  );

};

export default ReporteContactos;
