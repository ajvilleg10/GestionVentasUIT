import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem, TextField } from '@mui/material';
// import PropTypes from 'prop-types';
import SiguienteAccionModal from '../SiguienteAccionModal';

function createData(id, no, fechaSistema, fechaRegistro, interesado, siguienteAccion, referidos, comentarios) {
  return { id, no, fechaSistema, fechaRegistro, interesado, siguienteAccion, referidos, comentarios };
}

const ContactosTelefonicos = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const data = [
      {
        id: 1,
        fechaSistema: '26/05/2001',
        fechaRegistro: '26/05/2001',
        interesado: 'SI',
        siguienteAccion: 'Cita agendada',
        referidos: 'NO',
        comentarios: 'Nada que decir'
      },
      {
        id: 2,
        fechaSistema: '26/05/2001',
        fechaRegistro: '26/05/2001',
        interesado: 'SI',
        siguienteAccion: 'Cita agendada',
        referidos: 'NO',
        comentarios: 'Nada que decir'
      }
    ];
    const rows = data.map((c, index) =>
      createData(c.id, index + 1, c.fechaSistema, c.fechaRegistro, c.interesado, c.siguienteAccion, c.referidos, c.comentarios)
    );
    setRows(rows);
  }, []);

  const interesados = ['SI', 'NO'];
  const siguientesAcciones = ['Cita agendada', 'Llamada agendada', 'Llamada pendiente'];
  const referidos = ['SI', 'NO'];

  const [interesado, setInteresado] = useState('');
  // const [siguienteAccion, setSiguienteAccion] = useState('');
  const [referido, setReferido] = useState('');

  const onInteresadoChange = (event, id) => {
    console.log(interesado + id);
    setInteresado(event.target.value);
  };

  // const onSiguienteAccionChange = (event, id) => {
  //   console.log(siguienteAccion + id);
  //   setSiguienteAccion(event.target.value);
  // };

  const onReferidoChange = (event, id) => {
    console.log(referido + id);
    setReferido(event.target.value);
  };

  const handleSiguienteAccionAcceptance = () => {
    console.log('Actividad actualizada');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Fecha y hora Sistema</TableCell>
              <TableCell align="left">Fecha y hora Registro</TableCell>
              <TableCell align="left">Interesado</TableCell>
              <TableCell align="left">Siguiente Acción</TableCell>
              <TableCell align="left">Referidos</TableCell>
              <TableCell align="left">Comentarios</TableCell>
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
                    {row.fechaSistema}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.fechaRegistro}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <FormControl fullWidth>
                      <Select
                        id={`interesadoSelect${row.id}`}
                        defaultValue={row.interesado}
                        onChange={(event) => onInteresadoChange(event, row.id)}
                      >
                        {interesados?.map((option) => (
                          <MenuItem value={option} key={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <SiguienteAccionModal
                      row={row}
                      handleAcceptance={handleSiguienteAccionAcceptance}
                      siguientesAcciones={siguientesAcciones}
                    />
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <FormControl fullWidth>
                      <Select
                        id={`referidoSelect${row.id}`}
                        defaultValue={row.interesado}
                        onChange={(event) => onReferidoChange(event, row.id)}
                      >
                        {referidos?.map((option) => (
                          <MenuItem value={option} key={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <TextField defaultValue={row.comentarios} />
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

ContactosTelefonicos.propTypes = {};

export default ContactosTelefonicos;
