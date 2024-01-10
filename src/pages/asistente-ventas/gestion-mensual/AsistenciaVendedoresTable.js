import {
  Table, 
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import PropTypes from 'prop-types';

import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import MainCard from 'components/MainCard';

import { ASISTENCIA } from 'utils/constants';
import DeleteModalCMV from './DeleteModalCMV';
import EditarModalCMV from './EditarModalCMV';

dayjs.extend(duration);

const CustomTableRow = ({ data, index, handleDelete, handleAsistencias, handleUpdate }) => {

  const [open, setOpen] = useState(false);
  const [asistenciaEmpleados, setAsistenciaEmpleados] = useState(data.participantes);

  const deleteReunion = async (id) => {

    try {

      await handleDelete(id);
      dispatch(
        openSnackbar({
          open: true,
          message: 'Capacitación eliminada con éxito',
          variant: 'alert',
          alert: { color: 'success' },
          close: false
        })
      );
    } catch (error) {
      console.error('onClick eliminar reunion', error);
      dispatch(
        openSnackbar({
          open: true,
          message: error.message,
          variant: 'alert',
          alert: { color: 'error' },
          close: false
        })
      );
    }

  };

  const handleChange = (e, index) => {

    const newAsistencia = asistenciaEmpleados.map((c, i) => {
      if (i === index) {
        if (e.target.name === 'asistencia' && !ASISTENCIA[e.target.value]) {
          return {
            ...c,
            [e.target.name]: ASISTENCIA[e.target.value],
            puntual_completa: false
          };
        } else {
          return {
            ...c,
            [e.target.name]: ASISTENCIA[e.target.value]
          };
        }
      }
      return c;
    });

    setAsistenciaEmpleados(newAsistencia);

  }

  const handleUpdateAsistencias = async (id) => {

    try {
      const data = asistenciaEmpleados.map((e) => ({
        asistencia: e.asistencia,
        puntual_completa: e.puntual_completa,
        asistencia_id: e.asistencia_id
      }));

      await handleAsistencias(id, { participantes: data });
      dispatch(
        openSnackbar({
          open: true,
          message: 'Comité completado y enviada con éxito',
          variant: 'alert',
          alert: { color: 'success' },
          close: false
        })
      );

    } catch (error) {

      console.error('onClick actualizar asistencias (mensual)', error);

      dispatch(
        openSnackbar({
          open: true,
          message: error.message,
          variant: 'alert',
          alert: { color: 'error' },
          close: false
        })
      );
    }

  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center" colSpan={1}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        <TableCell align="center" size="small" colSpan={1}>
          {index}
        </TableCell>
        <TableCell align="center" size="small">
          {data.fecha_reunion}
        </TableCell>
        <TableCell align="center" size="small">
          {data.hora_inicio}
        </TableCell>
        <TableCell align="center" size="small">
          {data.hora_final}
        </TableCell>
        <TableCell align="center" size="small">
          {dayjs.duration(data.duracion, 'minute').format('HH:mm')}
        </TableCell>
        <TableCell align="center">
          <DeleteModalCMV handleDeleteReunion={deleteReunion} reunion={{ ...data, no: index }}/>
          <EditarModalCMV handleEditarReunion={handleUpdate} reunion={{ ...data, no: index }}/>
        </TableCell>
      </TableRow>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && (
              <Box sx={{ py: 3, width: '90%', margin: 'auto' }}>
                <TableContainer>
                  <MainCard content={false} title={<div style={{ display: 'flex', justifyContent: 'center' }}>Asistencia Vendedores</div>}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Nombre</TableCell>
                          <TableCell align="center">Tipo de usuario</TableCell>
                          <TableCell align="center">Asistió</TableCell>
                          <TableCell align="center">Puntual y completa</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        { asistenciaEmpleados.map((participante, index) => (
                          <TableRow hover key={participante.empleado.id}>
                            <TableCell align="center">{participante.empleado.nombres + ' ' + participante.empleado.apellidos}</TableCell>
                            <TableCell align="center">{participante.tipo_cuenta.nombre_tipo}</TableCell>
                            <TableCell align="center">
                              <FormControl fullWidth>
                                <Select name="asistencia" id="asistencia" value={participante.asistencia ? 'SI' : 'NO'} onChange={(e) => handleChange(e, index)}>
                                  {Object.keys(ASISTENCIA).map((opcion) => (
                                    <MenuItem value={opcion} key={opcion}>
                                      {opcion}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell align="center">
                              <FormControl fullWidth>
                                <Select id="puntual_completa" name="puntual_completa" value={participante.puntual_completa ? 'SI' : 'NO'} disabled={!participante.asistencia} onChange={(e) => handleChange(e, index)}>
                                  {Object.keys(ASISTENCIA).map((opcion) => (
                                    <MenuItem value={opcion} key={opcion}>
                                      {opcion}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Grid container spacing={3} py={3}>
                      <Grid item md={12} sx={{ display: 'flex', justifyContent: 'end' }} px={3}>
                        <Button variant="contained" color="primary" onClick={() => handleUpdateAsistencias(data.id)} disabled={!data.activa_enviar}>
                          Enviar
                        </Button>
                      </Grid>
                    </Grid>
                  </MainCard>
                </TableContainer>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const AsistenciaVendedoresTable = ({ data, handleDelete, handleAsistencias, handleUpdate }) => {

  const [rows, setRows] = useState();

  useEffect(() => {

    const rows = data.map((c, index) => {

      const currentDate = dayjs();
      const final = dayjs(c.fecha_final);

      const activa_enviar = currentDate.isAfter(final) || currentDate.isSame(final);

      return {
        id: c.id,
        no: index + 1,
        fecha_inicio: c.fecha_inicio,
        fecha_final: c.fecha_final,
        fecha_reunion: dayjs(c.fecha_inicio).format('YYYY-MM-DD').toString(),
        hora_inicio: dayjs(c.fecha_inicio).format('HH:mm').toString(),
        hora_final: dayjs(c.fecha_final).format('HH:mm').toString(),
        duracion: c.duracion,
        participantes: c.participantes,
        activa_enviar
      };

    });

    if (rows.length > 0) {

      rows.sort((c1, c2) => {

        const date1 = new Date(c1.fecha_inicio);
        const date2 = new Date(c2.fecha_inicio);

        return date1.getTime() - date2.getTime();

      });

    }

    setRows(rows);

  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}/>
              <TableCell align="center" colSpan={1}>id reunión</TableCell>
              <TableCell align="center">Fecha de reunión</TableCell>
              <TableCell align="center">Hora de inicio</TableCell>
              <TableCell align="center">hora final</TableCell>
              <TableCell align="center">duración (h)</TableCell>
              <TableCell align="center"/>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <CustomTableRow data={row} key={row.id} index={i + 1} handleDelete={handleDelete} handleAsistencias={handleAsistencias} handleUpdate={handleUpdate}/>
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
