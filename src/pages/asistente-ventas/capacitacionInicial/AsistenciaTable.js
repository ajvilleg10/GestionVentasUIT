import { useEffect, useState } from 'react';
import { Button, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'utils/axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

function createData(id, no, nombre, celular, dia1, dia2, dia3, dia4, dia5, data) {
  return { id, no, nombre, celular, dia1, dia2, dia3, dia4, dia5, data };
}

const CustomTableRow = ({ data }) => {

  const [dia1, setDia1] = useState(data.dia1);
  const [dia2, setDia2] = useState(data.dia2);
  const [dia3, setDia3] = useState(data.dia3);
  const [dia4, setDia4] = useState(data.dia4);
  const [dia5, setDia5] = useState(data.dia5);
  const [enviada, setEnviada] = useState(data.data.enviada);

  const onDia1Change = async (event) => {
    setDia1(event.target.checked);
    await axios.put(`/capacitacionesIniciales/${data.id}`, {
      asistencia_dia1: event.target.checked
    });
  };
  const onDia2Change = async (event) => {
    setDia2(event.target.checked);
    await axios.put(`/capacitacionesIniciales/${data.id}`, {
      asistencia_dia2: event.target.checked
    });
  };
  const onDia3Change = async (event) => {
    setDia3(event.target.checked);
    await axios.put(`/capacitacionesIniciales/${data.id}`, {
      asistencia_dia3: event.target.checked
    });
  };
  const onDia4Change = async (event) => {
    setDia4(event.target.checked);
    await axios.put(`/capacitacionesIniciales/${data.id}`, {
      asistencia_dia4: event.target.checked
    });
  };
  const onDia5Change = async (event) => {
    setDia5(event.target.checked);
    await axios.put(`/capacitacionesIniciales/${data.id}`, {
      asistencia_dia5: event.target.checked
    });
  };

  const enviarAsistencia = async () => {
    try {
      await axios.put(`/empleados/${data.data.Empleado.id}`, { capacitacion_inicial: true });
      await axios.put(`/capacitacionesIniciales/${data.id}`, { enviada: true });
      await axios.post('/notificaciones', {
        mensaje: `Capacitacion inicial completada por el empleado ${data.nombre}`,
        tipo_cuenta_id: 4
      });
      dispatch(
        openSnackbar({
          open: true,
          message: 'Asistencia enviada con exito',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      setEnviada(true);
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          message: error.error,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" size="small">
        {data?.no}
      </TableCell>
      <TableCell align="left" size="auto">
        {data?.nombre}
      </TableCell>
      <TableCell align="left" size="small">
        {data?.celular}
      </TableCell>
      <TableCell align="left" size="small">
        <Checkbox onChange={onDia1Change} checked={dia1} disabled={enviada} />
      </TableCell>
      <TableCell align="left" size="small">
        <Checkbox onChange={onDia2Change} checked={dia2} disabled={enviada} />
      </TableCell>
      <TableCell align="left" size="small">
        <Checkbox onChange={onDia3Change} checked={dia3} disabled={enviada} />
      </TableCell>
      <TableCell align="left" size="small">
        <Checkbox onChange={onDia4Change} checked={dia4} disabled={enviada} />
      </TableCell>
      <TableCell align="left" size="small">
        <Checkbox onChange={onDia5Change} checked={dia5} disabled={enviada} />
      </TableCell>
      <TableCell align="left" size="small">
        {dia1 && dia2 && dia3 && dia4 && dia5 && enviada === false ? (
          <Button variant="contained" onClick={enviarAsistencia}>
            Enviar
          </Button>
        ) : (
          ''
        )}
      </TableCell>
    </TableRow>
  );
};

const AsistenciaTable = ({ data }) => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const rows = data.map((c, index) =>
      createData(
        c.id,
        index + 1,
        c.Empleado?.nombres + ' ' + c?.Empleado?.apellidos,
        c.Empleado?.telefono,
        c.asistencia_dia1,
        c.asistencia_dia2,
        c.asistencia_dia3,
        c.asistencia_dia4,
        c.asistencia_dia5,
        c
      )
    );
    setRows(rows);
    console.log(data);
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Celular</TableCell>
              <TableCell align="left">Dia 1</TableCell>
              <TableCell align="left">Dia 2</TableCell>
              <TableCell align="left">Dia 3</TableCell>
              <TableCell align="left">Dia 4</TableCell>
              <TableCell align="left">Dia 5</TableCell>
              <TableCell align="left"></TableCell>
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

AsistenciaTable.propTypes = {
  data: PropTypes.array
};

CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default AsistenciaTable;
