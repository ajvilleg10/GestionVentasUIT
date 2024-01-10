import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';

function createData(id, no, nombre, celular, comentario, origenContacto, estado) {
  return { id, no, nombre, celular, comentario, origenContacto, estado };
}

const ContactosTable = ({ data, showDetails }) => {
  const [rows, setRows] = useState();

  const chipColor = (estado) => {
    switch (estado) {
      case 'Cliente':
        return 'success';
      case 'Prospecto':
        return 'info';
      case 'No interesado':
        return 'error';
      case 'Interesado':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const showContactoDetails = (contact) => {
    console.log(contact);
    showDetails(contact.id);
  };

  useEffect(() => {
    console.log(data);
    const rows = data?.map((c, index) =>
      createData(
        c.id,
        index + 1,
        c.nombres + ' ' + c.apellidos,
        c.numero_celular,
        c.comentarios,
        c.origen_contacto,
        c.estado_contacto?.estado_contacto
      )
    );
    setRows(rows);
  }, [data]);

  // filter
  const VISIBLE_FIELDS = ['nombre', 'celular', 'comentario', 'origen de contacto', 'estado'];
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">No.</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Celular</TableCell>
            <TableCell align="left">Comentario</TableCell>
            <TableCell align="left">Origen de Contacto</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => {
            const estadoColor = chipColor(row.estado);
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}
                onClick={() => showContactoDetails(row)}
              >
                <TableCell align="left" size="small">
                  {row.no}
                </TableCell>
                <TableCell align="left" size="auto">
                  {row.nombre}
                </TableCell>
                <TableCell align="left" size="small">
                  {row.celular}
                </TableCell>
                <TableCell align="left" size="auto">
                  {row.comentario}
                </TableCell>
                <TableCell align="left" size="auto">
                  {row.origenContacto}
                </TableCell>
                <TableCell align="left" size="auto">
                  <Chip label={row.estado} color={estadoColor} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ContactosTable.propTypes = {
  data: PropTypes.array,
  showDetails: PropTypes.func
};

export default ContactosTable;


