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

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers-pro';

function createData(
  id,
  no,
  fechaSistema,
  fechaRegistro,
  tipoCita,
  fechaHoraCita,
  direccionCita,
  concretada,
  siguienteAccion,
  convocadoJV,
  asistenciaJefeVentas,
  verificadoAV,
  fechaVerificado,
  comentarios
) {
  return {
    id,
    no,
    fechaSistema,
    fechaRegistro,
    tipoCita,
    fechaHoraCita,
    direccionCita,
    concretada,
    siguienteAccion,
    convocadoJV,
    asistenciaJefeVentas,
    verificadoAV,
    fechaVerificado,
    comentarios
  };
}

const Citas = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const data = [
      {
        id: 1,
        fechaSistema: '26/05/2001',
        fechaRegistro: '26/05/2001',
        tipoCita: 'A',
        fechaHoraCita: '26/05/2001 - 15:00',
        direccionCita: 'Samanes',
        concretada: 'NO',
        siguienteAccion: 'Cita agendada',
        convocadoJV: true,
        asistenciaJefeVentas: 'SI',
        verificadoAV: 'SI',
        fechaVerificado: '26/05/2001',
        comentarios: 'Nada que decir'
      },
      {
        id: 2,
        fechaSistema: '26/05/2001',
        fechaRegistro: '26/05/2001',
        tipoCita: 'B',
        fechaHoraCita: '26/09/2001 - 15:00',
        direccionCita: 'Ceibos',
        concretada: 'SI',
        siguienteAccion: 'Cita agendada',
        convocadoJV: false,
        asistenciaJefeVentas: 'SI',
        verificadoAV: 'NO',
        fechaVerificado: '26/06/2001',
        comentarios: 'Nada que decir'
      }
    ];
    const rows = data.map((c, index) =>
      createData(
        c.id,
        index + 1,
        c.fechaSistema,
        c.fechaRegistro,
        c.tipoCita,
        c.fechaHoraCita,
        c.direccionCita,
        c.concretada,
        c.siguienteAccion,
        c.convocadoJV,
        c.asistenciaJefeVentas,
        c.verificadoAV,
        c.fechaVerificado,
        c.comentarios
      )
    );
    setRows(rows);
  }, []);

  const siguientesAcciones = ['Cita agendada', 'Llamada agendada', 'Llamada pendiente'];
  const concretadas = ['SI', 'NO'];
  const tiposCitas = ['Nueva', 'Seguimiento', 'Cierre', 'Referido', 'Casual'];

  const [tipoCita, setTipoCita] = useState('');
  // const [convocadoJV, setConvocadoJV] = useState(false);
  const [concretada, setConcretada] = useState('');
  // const [siguienteAccion, setSiguienteAccion] = useState('');
  // const [fechaRegistro, setFechaRegistro] = useState('');

  const onTipoCitaChange = (event, id) => {
    console.log(tipoCita + id);
    setTipoCita(event.target.value);
  };

  const onConcretadaChange = (event, id) => {
    console.log(concretada + id);
    setConcretada(event.target.value);
  };

  // const onConvocadoJVChange = (event, id) => {
  //   console.log(convocadoJV + id);
  //   setConvocadoJV(event.target.checked);
  // };

  const handleSiguienteAccionAcceptance = () => {
    console.log('Actividad actualizada');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Fecha Sistema</TableCell>
              <TableCell align="left">Fecha Registro</TableCell>
              <TableCell align="left">Tipo Cita</TableCell>
              <TableCell align="left">Fecha Hora Cita</TableCell>
              <TableCell align="left">Direccion Cita</TableCell>
              <TableCell align="left">Concretada</TableCell>
              <TableCell align="left">Siguiente Accion</TableCell>
              <TableCell align="left">Convocado JV</TableCell>
              <TableCell align="left">Asistencia Jefe Ventas</TableCell>
              <TableCell align="left">Verificado AV</TableCell>
              <TableCell align="left">Fecha Verificado</TableCell>
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
                  <TableCell>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                      <DatePicker format="DD/MM/YYYY" fullWidth />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell align="left" size="auto">
                    <FormControl fullWidth>
                      <Select
                        id={`tipoCitaSelect${row.id}`}
                        defaultValue={row.tipoCita}
                        onChange={(event) => onTipoCitaChange(event, row.id)}
                      >
                        {tiposCitas?.map((option) => (
                          <MenuItem value={option} key={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                      <DatePicker format="DD/MM/YYYY" fullWidth />
                    </LocalizationProvider>
                  </TableCell>

                  <TableCell align="left" size="auto">
                    <TextField defaultValue={row.direccionCita} />
                  </TableCell>

                  <TableCell align="left" size="auto">
                    <FormControl fullWidth>
                      <Select
                        id={`concretadaSelect${row.id}`}
                        defaultValue={row.concretada}
                        onChange={(event) => onConcretadaChange(event, row.id)}
                      >
                        {concretadas?.map((option) => (
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

                  {/* <TableCell align="left" size="auto">
                    <Checkbox onChange={(e) => onConvocadoJVChange(e, row.id)} />
                  </TableCell> */}
                  <TableCell align="left" size="auto">
                    <FormControl fullWidth>
                      <Select
                        id={`concretadaSelect${row.id}`}
                        defaultValue={row.concretada}
                        onChange={(event) => onConcretadaChange(event, row.id)}
                      >
                        {concretadas?.map((option) => (
                          <MenuItem value={option} key={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell align="left" size="auto">
                    {row.asistenciaJefeVentas}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.verificadoAV}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.fechaVerificado}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.comentarios}
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

Citas.propTypes = {};

export default Citas;
