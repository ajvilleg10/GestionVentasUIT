import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { EmptyTable } from 'components/third-party/ReactTable';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { PAGE_SIZE } from 'utils/constants';

import Paginacion from 'components/users/PaginacionTablas';

function createData(id, no, tipo_actividad, fecha_llamada, nombres_contacto, origen, accion_realizada, createdAt, numero_celular_contacto) {
  return { id, no, tipo_actividad, nombres_contacto, fecha_llamada, origen, accion_realizada, fecha_registro: createdAt, numero_celular: numero_celular_contacto };
}

const CustomTableRow = ({ data, updateActividad }) => {

  const [aprobada, setAprobada] = useState(data.accion_realizada);

  const today = dayjs();
  const fecha_llamada_obj = dayjs(data.fecha_llamada);
  const fecha_registro = dayjs(data.fecha_registro).format('MM/DD/YYYY HH:mm');

  const handleClick = async (actividad_id) => {

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    };

    try {

      const response = await updateActividad(actividad_id);

      snackbar.message = response.message ?? 'Actividad completada correctamente';
      snackbar.alert.color = 'success';

      setAprobada(true);

    } catch (error) {

      console.error('Error de actualizacion de la actividad', error);

      snackbar.alert.color = 'error';
      snackbar.message = error.message ?? 'Error al completar la actividad';

    } finally {

      dispatch(openSnackbar(snackbar));

    }

  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center" size="auto">
        {fecha_registro}
      </TableCell>
      <TableCell align="center" size="auto">
        {data.tipo_actividad}
      </TableCell>
      <TableCell align="center" size="auto">
        {data.nombres_contacto}
      </TableCell>
      <TableCell align="center" size="auto">
        {data.numero_celular}
      </TableCell>
      <TableCell align="center" size="auto">
        {data.origen}
      </TableCell>
      <TableCell align="center" size="auto">
        <Button
          variant="contained"
          disabled={fecha_llamada_obj.isAfter(today) || aprobada}
          onClick={() => handleClick(data.id)}
        >
          Completar
        </Button>
      </TableCell>
    </TableRow>
  );
};

const ActividadesPendientesTable = ({ data, updateActividad }) => {

  const [rows, setRows] = useState([]);
  const [pageRows, setPageRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);

  useEffect(() => {

    const rows = data.map((c, index) =>
      createData(c.id, index + 1, c.tipo_actividad, c.fecha_llamada, c.nombre_contacto, c.origen, c.aprobada, c.createdAt, c.numero_celular_contacto)
    );

    setPageRows(rows);
    setRows(rows);

  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
              <TableCell align="center">Fecha de registro</TableCell>
              <TableCell align="center">Tipo Actividad</TableCell>
              <TableCell align="center">Nombres de contacto</TableCell>
              <TableCell align="center">Celular del contacto</TableCell>
              <TableCell align="center">Origen de contacto</TableCell>
              <TableCell align="center">Acción Realizada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows.length === 0 ? (
              <EmptyTable msg="No existen actividades pendientes" colSpan={5} height={'150px'} />
            ) : (pageRows?.map((row) => (
              <CustomTableRow data={row} key={row.id} updateActividad={updateActividad} />
            )))}
            {pageRows.length > 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ p: 2 }}>
                  <Paginacion
                    data={rows}
                    setPageRows={setPageRows}
                    page={page}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    rowsPerPage={rowsPerPage}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

ActividadesPendientesTable.propTypes = {};
CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default ActividadesPendientesTable;
