import { Grid, Table, TableContainer, TableRow, TableHead, TableCell, Paper, TableBody, TablePagination } from "@mui/material";

import BusquedaReportes from "components/users/BusquedaReportes";
import { CSVExport } from "components/third-party/ReactTable";

import MainCard from "components/MainCard";
import { useSelector } from "store";

const TablaReportes = ({ children, filename, headers, cotizacion }) => {

  const data = useSelector(state => state.reportes.showData);

  return (
    <MainCard
      title="Control de reporte"
      // contentSX={{ height: '100vh' }}
      secondary={
        <CSVExport
          data={data}
          tooltip="Exportar todo"
          filename={filename}
        />
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <BusquedaReportes cotizacion={cotizacion} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
              <TableHead>
                <TableRow id="reporte-header-contactos">
                  {headers.map((h) => (
                    <TableCell sx={{ minWidth: '180px' }} key={h.name} align={h.align}>{h.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {children}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid >
    </MainCard>
  );
}

export default TablaReportes;
