import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import ForwardToInbox from '@mui/icons-material/ForwardToInbox';

import { ASISTENCIA, REUNION } from 'utils/constants';
import EditarModalCSG from './EditarModalCSG';

import SuspendModalCSG from './SuspendModalCSG';
import { EmptyTable } from 'components/third-party/ReactTable';
import { useSelector } from 'store';
import { deleteReunion, setMailSent, setReunionSent } from 'store/reducers/reunionGeneral';

dayjs.extend(duration);

const CustomTable = ({ data, handleDelete, handleAsistencias, handleUpdate, sendEmail }) => {

  const [asistenciaEmpleados, setAsistenciaEmpleados] = useState(data.participantes);
  const [sendingMail, setSendingMail] = useState(false);

  const snackbar = {
    open: true,
    variant: 'alert',
    alert: {},
    close: false
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
      dispatch(setReunionSent({ reunion_id: id, tipo_reunion: REUNION.Semanal }));

      snackbar.message = "Capacitación completada y enviada con éxito";
      snackbar.alert.color = "success";

    } catch (error) {

      console.error('onClick actualizar asistencias', error);

      snackbar.message = error.message ?? 'Error al actualizar la asistencia de la reunión';
      snackbar.alert.color = "error";

    } finally {

      dispatch(openSnackbar(snackbar));

    }

  }

  const suspenderReunion = async (reunion) => {

    try {

      if (reunion.comentario === '') throw new Error('Antes de suspender, escriba un comentario');

      await handleDelete(reunion.id);
      dispatch(deleteReunion({ id: reunion.id, tipo_reunion: REUNION.Semanal }));

      snackbar.message = 'Comité semanal gerencial supendido con éxito';
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error('onClick suspender reunion', error);

      snackbar.message = error.message ?? 'Error al suspender el comité semanal gerencial';
      snackbar.alert.color = 'error';

    }

    dispatch(openSnackbar(snackbar));

  };

  const sendMail = async (id) => {

    try {

      setSendingMail(true);

      await sendEmail(id);
      dispatch(setMailSent({ reunion_id: id, tipo_reunion: REUNION.Semanal }));

      snackbar.message = 'Email enviado con éxito';
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error('Error al enviar email', error);

      snackbar.message = 'Error al enviar el email';
      snackbar.alert.color = 'error';

    } finally {

      setSendingMail(false);
      dispatch(openSnackbar(snackbar));

    }

  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mb: 4 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>id reunión</TableCell>
              <TableCell align="center">Fecha de reunión</TableCell>
              <TableCell align="center">Hora de inicio</TableCell>
              <TableCell align="center">hora final</TableCell>
              <TableCell align="center">duración (h)</TableCell>
              <TableCell align="center">
                <div style={{ display: 'inline-block', paddingLeft: 3, paddingRight: 3 }}>
                  <EditarModalCSG
                    handleEditarReunion={handleUpdate}
                    reunion={data}
                  />
                </div>
                <Tooltip title={sendingMail ? "Enviando email" : "Enviar email"}>
                  <div style={{ display: 'inline-block', paddingLeft: 3, paddingRight: 3 }}>
                    <IconButton
                      color='primary'
                      variant='outlined'
                      disabled={!data.updated_date || sendingMail}
                      onClick={() => sendMail(data.id)}
                    >
                      <ForwardToInbox fontSize="large" />
                    </IconButton>
                  </div>
                </Tooltip>
                <div style={{ display: 'inline-block', paddingLeft: 3, paddingRight: 3 }}>
                  <SuspendModalCSG
                    handleSuspenderReunion={suspenderReunion}
                    reunion={data}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" size="small" colSpan={1}>
                {data.no}
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
              <TableCell align="center" />
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombres</TableCell>
              <TableCell align="center">Apellidos</TableCell>
              <TableCell align="center">Tipo Usuario</TableCell>
              <TableCell align="center">Asistió</TableCell>
              <TableCell align="center">Puntual y Completa</TableCell>
              <TableCell align="center">
                <Button
                  sx={{ maxHeight: '40px' }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateAsistencias(data.id)}
                  disabled={!data.activa_enviar}
                >
                  Enviar reunión
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asistenciaEmpleados.map((participante, index) => (
              <TableRow hover key={participante.empleado.id}>
                <TableCell align="center">{participante.empleado.nombres}</TableCell>
                <TableCell align="center">{participante.empleado.apellidos}</TableCell>
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
                <TableCell align="center" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

}

const AsistenciaTable = ({ handleDelete, handleAsistencias, handleUpdate, sendEmail }) => {

  const data = useSelector(state => state.reunionGeneral[REUNION.Semanal].reuniones);
  const [rows, setRows] = useState([]);

  useEffect(() => {

    const rows = data.filter(d => !d.completada).map((c, index) => {

      const currentDate = dayjs();
      const final = dayjs(c.fecha_final);

      const activa_enviar = currentDate.isAfter(final) || currentDate.isSame(final);

      return {
        id: c.id,
        no: index + 1,
        fecha_inicio: c.fecha_inicio,
        fecha_final: c.fecha_final,
        fecha_reunion: dayjs(c.fecha_inicio).format('YYYY-MM-DD'),
        hora_inicio: dayjs(c.fecha_inicio).format('HH:mm'),
        hora_final: dayjs(c.fecha_final).format('HH:mm'),
        duracion: c.duracion,
        participantes: c.participantes,
        updated_date: c.updated_date,
        comentario: c.comentario,
        completada: c.completada, // Para userlo localmente
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
      {rows.length === 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={1}>id reunión</TableCell>
                <TableCell align="center">Fecha de reunión</TableCell>
                <TableCell align="center">Hora de inicio</TableCell>
                <TableCell align="center">hora final</TableCell>
                <TableCell align="center">duración (h)</TableCell>
                <TableCell align="center" colSpan={1} />
              </TableRow>
            </TableHead>
            <TableBody>
              <EmptyTable msg="No existen comités creados" colSpan={7} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        rows.map((row) => (
          <CustomTable
            key={row.id}
            data={row}
            handleDelete={handleDelete}
            handleAsistencias={handleAsistencias}
            handleUpdate={handleUpdate}
            sendEmail={sendEmail}
          />
        ))
      )}
    </>
  );

}

export default AsistenciaTable;
