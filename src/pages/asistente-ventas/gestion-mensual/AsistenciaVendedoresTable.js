import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

function createData(id, no, nombresApellidos, asistio, puntualCompleta) {
  return { id, no, nombresApellidos, asistio, puntualCompleta };
}

const CustomTableRow = ({ data }) => {
  const [asistio, setAsistio] = useState('NO');
  const [puntualCompleta, setPuntualCompleta] = useState('NO');

  const onAsistioChange = (event) => {
    setAsistio(event.target.value);
  };

  const onPuntualCompletaChange = (event) => {
    setPuntualCompleta(event.target.value);
  };

  const asistioOpciones = ['SI', 'NO'];
  const puntualCompletaOpciones = ['SI', 'NO'];

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" size="small">
        {data.no}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.nombresApellidos}
      </TableCell>
      <TableCell align="left" size="small">
        <FormControl fullWidth>
          <Select labelId="asistio" id="asistioSelect" value={asistio} onChange={onAsistioChange}>
            {asistioOpciones?.map((opcion) => (
              <MenuItem value={opcion} key={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="left" size="small">
        <FormControl fullWidth>
          <Select labelId="puntualCompleta" id="puntualCompletaSelect" value={puntualCompleta} onChange={onPuntualCompletaChange}>
            {puntualCompletaOpciones?.map((opcion) => (
              <MenuItem value={opcion} key={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

const AsistenciaVendedoresTable = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const data = [
      {
        id: 1,
        nombresApellidos: 'Denny Hidalgo',
        asistio: 'SI',
        puntualCompleta: 'SI'
      },
      {
        id: 2,
        nombresApellidos: 'Javier Burrai',
        asistio: 'SI',
        puntualCompleta: 'SI'
      }
    ];
    const rows = data.map((c, index) => createData(c.id, index + 1, c.nombresApellidos, c.asistio, c.puntualCompleta));
    setRows(rows);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Nombres y Apellidos</TableCell>
              <TableCell align="left">Asistió</TableCell>
              <TableCell align="left">Puntual y Completa</TableCell>
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

AsistenciaVendedoresTable.propTypes = {};
CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default AsistenciaVendedoresTable;
