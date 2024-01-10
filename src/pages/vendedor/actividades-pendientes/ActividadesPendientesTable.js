import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

function createData(id, no, fecha_registro, tipo_actividad, nombresApellidos, celular, origen, accion_realizada) {
  return { id, no, fecha_registro, tipo_actividad, nombresApellidos, celular, origen, accion_realizada };
}

const CustomTableRow = ({ data }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" size="small">
        {data.no}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.fecha_registro}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.tipo_actividad}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.nombresApellidos}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.celular}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.origen}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.accion_realizada}
      </TableCell>
    </TableRow>
  );
};

const ActividadesPendientesTable = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const data = [
      {
        id: 1,
        fecha_registro: '23-05-2021',
        tipo_actividad: 'Contacto Telefónico Pendiente',
        nombresApellidos: 'Denny Hidalgo',
        celular: '098744455',
        origen: 'Proyecto 100',
        accion_realizada: ''
      },
      {
        id: 2,
        fecha_registro: '23-05-2021',
        tipo_actividad: 'Contacto Telefónico Pendiente',
        nombresApellidos: 'Juan Perez',
        celular: '098744455',
        origen: 'Proyecto 100',
        accion_realizada: ''
      }
    ];
    const rows = data.map((c, index) =>
      createData(c.id, index + 1, c.fecha_registro, c.tipo_actividad, c.nombresApellidos, c.celular, c.origen, c.accion_realizada)
    );
    setRows(rows);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Fecha Registro</TableCell>
              <TableCell align="left">Tipo Actividad</TableCell>
              <TableCell align="left">Nombres y Apellidos</TableCell>
              <TableCell align="left">Celular</TableCell>
              <TableCell align="left">Origen</TableCell>
              <TableCell align="left">Acción Realizada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <CustomTableRow data={row} key={row.id} />
            ))}
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
