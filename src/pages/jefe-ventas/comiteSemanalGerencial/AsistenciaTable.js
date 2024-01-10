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
  Tooltip,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  Grid,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import ForwardToInbox from '@mui/icons-material/ForwardToInbox';

import { ASISTENCIA } from 'utils/constants';
// import EditarModalCSG from './EditarModalCSG';

// import SuspendModalCSG from './SuspendModalCSG';
import { EmptyTable } from 'components/third-party/ReactTable';
import useCurrentUser from 'hooks/useCurrentUser';

dayjs.extend(duration);

// NOTE: HandleDelete sirve para suspender la reunion
const CustomTableRow = ({ data, index, handleDelete, handleAsistencias, handleUpdate }) => {

  const [open, setOpen] = useState(false);
  const [asistenciaEmpleados, setAsistenciaEmpleados] = useState(data.participantes);
  // const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();
  // useEffect(() => {
  //   console.log('cuentaInfo', cuentaInfo?.empleado_id);

  // }, [])
  // asistenciaEmpleados.map((empleado) => {
  //   console.log('empleado', empleado.empleado.id);
  // })
  // const asistenciaEmpleadosOfCurrentJefeVenta = asistenciaEmpleados.filter((empleado) => empleado.empleado.id == 3)
  // console.log('asistenciaEmpleadosOfCurrentJefeVenta', asistenciaEmpleadosOfCurrentJefeVenta);

  const [editarShow, setEditarShow] = useState(false);
  const [suspenderShow, setSuspenderShow] = useState(false);
  const [modalidadReunion, setModalidadReunion] = useState('presencial');

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

      await handleAsistencias(id, { participantes: data, modalidad: modalidadReunion });


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

      snackbar.message = 'Comité supendido con éxito';
      snackbar.alert.color = 'success';

    } catch (error) {

      console.error('onClick suspender reunion', error);

      snackbar.message = error.message ?? 'Error al suspender el comité';
      snackbar.alert.color = 'error';

    }

    dispatch(openSnackbar(snackbar));

  };

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
          <Tooltip title="Editar reunión" arrow open={editarShow} disableHoverListener onMouseEnter={() => setEditarShow(true)} onMouseLeave={() => setEditarShow(false)} >
            <div style={{ display: 'inline-block' }}>
              <EditarModalCSG handleEditarReunion={handleUpdate} closeTooltip={() => setEditarShow(false)} reunion={{ ...data, no: index }} />
            </div>
          </Tooltip>
          <Tooltip title="Enviar email">
            <div style={{ display: 'inline-block' }}>
              <IconButton color='primary' variant="outlined" disabled={!data.updated} onClick={() => console.log('Aqui se envia el email de la reunion actualizada')} >
                <ForwardToInbox fontSize="medium" />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Suspender reunion" arrow open={suspenderShow} disableHoverListener onMouseEnter={() => setSuspenderShow(true)} onMouseLeave={() => setSuspenderShow(false)}>
            <div style={{ display: 'inline-block' }}>
              <SuspendModalCSG handleSuspenderReunion={suspenderReunion} closeTooltip={() => setSuspenderShow(false)} reunion={{ ...data, no: index }} />
            </div>
          </Tooltip>
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
                                <Select name="asistencia" id="asistencia" value={participante.asistencia ? 'SI' : 'NO'} onChange={(e) => handleChange(e, index)}
                                  disabled
                                >
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
                                <Select
                                  id="puntual_completa" name="puntual_completa"
                                  value={participante.puntual_completa ? 'SI' : 'NO'}
                                  // disabled={!participante.asistencia} 
                                  onChange={(e) => handleChange(e, index)}
                                  disabled
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
                        ))}
                        <TableRow>
                          <TableCell colSpan={4} display="flex" align="center">
                            <FormControl
                              disabled
                            >
                              <FormLabel id="modalidad-reunion">Modalidad</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="modalidad-reunion"
                                value={modalidadReunion}
                                onChange={(e) => setModalidadReunion(e.target.value)}
                                name="radio-modalidad"
                              >
                                <FormControlLabel value="presencial" control={<Radio />} label="Presencial" />
                                <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
                              </RadioGroup>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Grid container spacing={3} py={3}>
                      <Grid item md={12} display="flex" justifyContent="end" px={3}>
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

}

//data: participante
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
        {data.empleado.nombres}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.empleado.apellidos}
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

const AsistenciaTable = ({ data, handleDelete, handleAsistencias, handleUpdate }) => {

  const [rows, setRows] = useState([]);
  const [modalidadReunion, setModalidadReunion] = useState('presencial');
  const { empleadoInfo, tipoCuentaInfo, cuentaInfo } = useCurrentUser();
  useEffect(() => {
    console.log('cuentaInfo', cuentaInfo?.empleado_id);

  }, [])

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
        updated: c.updated_date,
        comentario: c.comentario,
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
            {rows.length === 0 ? (
              <EmptyTable msg="No exiten reuniones creadas" colSpan={7} />
            ) : (
              rows.map((row, i) => (
                <CustomTableRow data={row} key={row.id} index={i + 1} handleDelete={handleDelete} handleAsistencias={handleAsistencias} handleUpdate={handleUpdate} />
              ))
            )}

          </TableBody>
        </Table>
      </TableContainer> */}
      <Grid container spacing={3} py={3}>
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
                        {modalidadReunion}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Nombres</TableCell>
                      <TableCell align="left">Apellidos</TableCell>
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
    </>
  );


}

export default AsistenciaTable;
