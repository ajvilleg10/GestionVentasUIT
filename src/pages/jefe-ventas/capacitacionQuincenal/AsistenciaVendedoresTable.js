/* eslint-disable no-unused-vars */
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
  Grid,
  Typography
} from '@mui/material';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useEffect, useState } from 'react';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import MainCard from 'components/MainCard';

import { ASISTENCIA } from 'utils/constants';
import useCurrentUser from 'hooks/useCurrentUser';
// import DeleteModalCQV from './DeleteModalCQV';
// import EditarModalCQV from './EditarModalCQV';

dayjs.extend(duration);

const CustomTableRow = ({ data, index, handleDelete, handleAsistencias, handleUpdate }) => {

  const [open, setOpen] = useState(false);
  const [asistenciaEmpleados, setAsistenciaEmpleados] = useState(data.participantes);

  const handleEliminar = async (id) => {

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
      console.error('onClick eliminar capacitacion', error);
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
          message: 'Capacitación completada y enviada con éxito',
          variant: 'alert',
          alert: { color: 'success' },
          close: false
        })
      );

    } catch (error) {
      console.error('onClick actualizar asistencias', error);
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
        {/* <TableCell align="center">
          <DeleteModalCQV handleDeleteCapacitacion={handleEliminar} capacitacion={{ ...data, no: index }}/>
          <EditarModalCQV handleEditarCapacitacion={handleUpdate} capacitacion={{ ...data, no: index }}/>
        </TableCell> */}
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
                        {asistenciaEmpleados.map((participante, index) => (
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
                        {/* <Button variant="contained" color="primary" onClick={() => handleUpdateAsistencias(data.id)}> */}
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
  const [rows, setRows] = useState([]);

   const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();
  useEffect(() => {
    console.log('cuentaInfo', cuentaInfo?.empleado_id);

  }, [])

  useEffect(() => {

    const rows = data.map((c, index) => {

      console.log('c', c);
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
        activa_enviar,
        modalidad: "virtual"
      };

    });

    rows.sort((c1, c2) => {

      const date1 = new Date(c1.fecha_inicio);
      const date2 = new Date(c2.fecha_inicio);

      return date1.getTime() - date2.getTime();

    });

    setRows(rows);
  }, [data]);


  const CustomTableRow2 = ({ data }) => {
    const [asistio, setAsistio] = useState(data.asistio);
    const [puntualCompleta, setPuntualCompleta] = useState(data.puntualCompleta);
    const [modalidadReunion, setModalidadReunion] = useState('presencial');
  
  
    const onAsistioChange = (event) => {
      setAsistio(event.target.value);
    };
  
    const onPuntualCompletaChange = (event) => {
      setPuntualCompleta(event.target.value);
    };
  
    useEffect(() => {
      setAsistio(data.asistio);
      setPuntualCompleta(data.puntualCompleta);
    }, [data]);
  
    const asistioOpciones = [
      {
        value: 0,
        option: "NO"
      },
      {
        value: 1,
        option: "SI"
      }
    ];
    const puntualCompletaOpciones = [
      {
        value: 0,
        option: "NO"
      },
      {
        value: 1,
        option: "SI"
      }
    ];
  
    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left" size="auto">
          {data.empleado.nombres + ' ' + data.empleado.apellidos}
        </TableCell>
        <TableCell align="left" size="small">
          {data.tipo_cuenta.nombre_tipo}
        </TableCell>
        <TableCell align="left" size="small">
          <FormControl fullWidth>
            <Select
              disabled
              // labelId="asistio"
              name="asistencia"
              id="asistencia"
              value={data.asistencia ? 'SI' : 'NO'}
            // onChange={onAsistioChange}
            >
              {Object.keys(ASISTENCIA).map((opcion) => (
                <MenuItem value={opcion} key={opcion}>
                  {opcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="left" size="small">
          <FormControl fullWidth>
            <Select
              disabled
              // labelId="puntualCompleta"
              name="puntual_completa"
              id="puntual_completa"
              value={data.puntual_completa ? 'SI' : 'NO'}
            // onChange={onPuntualCompletaChange}
            >
              {Object.keys(ASISTENCIA).map((opcion) => (
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

  return (
    <>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1} />
              <TableCell align="center" colSpan={1}>id reunión</TableCell>
              <TableCell align="center">Fecha de reunión</TableCell>
              <TableCell align="center">Hora de inicio</TableCell>
              <TableCell align="center">hora final</TableCell>
              <TableCell align="center">duración (h)</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <CustomTableRow data={row} key={row.id} index={i + 1} handleDelete={handleDelete} handleAsistencias={handleAsistencias} handleUpdate={handleUpdate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Grid container spacing={3} py={3}>
        <Grid item xs={12} md={12}>
          {rows.length === 0 ? (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" >
                No existen datos
              </Typography>
            </Grid>
          ) : (
            rows.filter((row) => {
              return row.participantes.some((participante) => {
                return participante.empleado.id == cuentaInfo?.empleado_id
              })
            }).map((row, i) => (
              <Grid item xs={12} md={6}>
                {console.log('participantes', row.participantes)}
                {/* <Link style={{ textDecoration: 'none' }} to={`detalles/${reunion.idReunion}`}> */}
                <TableContainer key={row.id} component={Paper} sx={{ mb: 4 }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Id de Reunión</TableCell>
                        <TableCell align="left">Fecha de Reunion</TableCell>
                        <TableCell align="left">Hora de Inicio</TableCell>
                        <TableCell align="left">Hora Final</TableCell>
                        <TableCell align="left">Duración (h)</TableCell>
                        <TableCell align="left">Modalidad</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align='left' size='small'>{row.id}</TableCell>
                        <TableCell align='left' size='small'>{row.fecha_reunion}</TableCell>
                        <TableCell align='left' size='small'>{row.hora_inicio}</TableCell>
                        <TableCell align='left' size='small'>{row.hora_final}</TableCell>
                        <TableCell align='left' size='small'>{dayjs.duration(row.duracion, 'minute').format('HH:mm')}</TableCell>
                        <TableCell align="left" size="small">
                          {row.modalidad}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Nombres y Apellidos</TableCell>
                        <TableCell align="left">Tipo Usuario</TableCell>
                        <TableCell align="left">Asistió</TableCell>
                        <TableCell align="left">Puntual y Completa</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.participantes?.map((participante, i) => (
                        console.log('participante', i, participante, participante.tipo_cuenta.descripcion)
                      ))}
                      {row.participantes?.filter((participante) => participante.tipo_cuenta.descripcion === "Jefe de Ventas").map((participante) => (
                        <CustomTableRow2 data={participante} key={participante.empleado.id} />
                      ))}
                      {row.participantes?.filter((participante) => participante.tipo_cuenta.descripcion != "Jefe de Ventas").map((participante) => (
                        <CustomTableRow2 data={participante} key={participante.empleado.id} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* </Link> */}
              </Grid>
            ))

          )}
        </Grid>
      </Grid>
    </>
  );
};

AsistenciaVendedoresTable.propTypes = {};
CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default AsistenciaVendedoresTable;
