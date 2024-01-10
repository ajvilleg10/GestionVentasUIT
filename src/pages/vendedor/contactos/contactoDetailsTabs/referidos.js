import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem } from '@mui/material';
import useOrigenesContactos from 'hooks/useOrigenesContactos';
// import PropTypes from 'prop-types';

function createData(id, no, nombre, celular, parentesco, origen) {
  return { id, no, nombre, celular, parentesco, origen };
}

const Referidos = () => {
  const [rows, setRows] = useState();

  const [origen, setOrigen] = useState('');
  const origenes = useOrigenesContactos();

  const onOrigenChange = (event, id) => {
    console.log(origen, id);
    setOrigen(event.target.value);
  };

  useEffect(() => {
    const data = [
      {
        id: 1,
        nombre: 'Juan Perez',
        celular: '0955575455',
        parentesco: 'Conocido',
        origen: 'BCS'
      },
      {
        id: 2,
        nombre: 'Luis Andrade',
        celular: '0955575415',
        parentesco: 'Familiar',
        origen: 'Proyecto 100'
      }
    ];
    const rows = data.map((c, index) => createData(c.id, index + 1, c.nombre, c.celular, c.parentesco, c.origen));
    setRows(rows);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Celular</TableCell>
              <TableCell align="left">Parentesco</TableCell>
              <TableCell align="left">Origen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                  <TableCell align="left" size="small">
                    {row.no}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.celular}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.parentesco}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <FormControl fullWidth>
                      <Select id={`origenSelect${row.id}`} defaultValue={row.origen} onChange={(event) => onOrigenChange(event, row.id)}>
                        {origenes?.map((origen) => (
                          <MenuItem value={origen} key={origen.id}>
                            {origen}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Referidos.propTypes = {};

export default Referidos;
