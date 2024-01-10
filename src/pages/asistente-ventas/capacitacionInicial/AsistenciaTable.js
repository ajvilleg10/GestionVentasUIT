import { useEffect, useMemo, useState } from 'react';
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper, Checkbox, Tooltip, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { MAXIMO_DIAS_CAPACITACION } from 'utils/constants';
import { compararFechas } from 'utils/manageFechas';

import dayjs from 'dayjs';
import axios from 'utils/axios';
import { EmptyTable } from 'components/third-party/ReactTable';

const today = dayjs();

const CustomRow = ({ item }) => {

  const key = `capacitacion_${item.id}_checked`;

  const [diaActual, setDiaActual] = useState(false);
  const [checked, setChecked] = useState(false);

  const [enviarCapacitacion, setEnviarCapacitacion] = useState(false);
  const fechaInicio = dayjs(item.fecha_inicio);

  const diasChecked = useMemo(() => {

    let currentDate = fechaInicio.clone();
    const result = [];

    for (let i = 0; i < MAXIMO_DIAS_CAPACITACION;) {

      if (i >= item.duracion) {
        result.push(undefined);
        i++;
        continue;
      }

      if (currentDate.day() !== 0 && currentDate.day() !== 6) {
        result.push({
          fecha: currentDate,
          value: item.asistencia[`asistencia_dia_${i + 1}`]
        });

        i++;
      }

      currentDate = currentDate.add(1, 'day');
    }

    return result;

  }, [item, fechaInicio]);

  const snackbar = {
    open: true,
    variant: 'alert',
    alert: {},
    close: false
  }

  const onChange = async (e, diaIndex) => {

    try {

      const value = e.target.name === 'asistencia';
      const endOfDay = today.clone().endOf('day');

      const localValue = {
        set: true,
        value,
        ttl: endOfDay.unix()
      }

      localStorage.setItem(key, JSON.stringify(localValue));

      const dataUpdate = {
        dia: diaIndex + 1,
        tipo: 'asistencia',
        value
      };

      await axios.put(`/capacitacionesIniciales/${item.id}`, dataUpdate);

      snackbar.message = `Dia ${diaIndex + 1} marcado correctamente`;
      snackbar.alert.color = 'success'

      setDiaActual(true);
      setChecked(value);
      setEnviarCapacitacion(compararFechas(today, dayjs(item.fecha_final)));

    } catch (error) {

      console.log(error);

      snackbar.message = error.message ?? 'Error al actualizar la asistencia';
      snackbar.alert.color = 'error'

    } finally {

      dispatch(openSnackbar(snackbar));

    }

  };

  // TODO: Cambiar el envio de notificaciones por el id de asistente o jefe??
  const onClickEnviarCapacitacion = async () => {

    try {

      await axios.put(`/empleados/${item.empleado_id}`, { capacitacion_inicial: true });
      await axios.put(`/capacitacionesIniciales/${item.id}`, {
        tipo: 'completada'
      });

      // Enviar notificacion
      await axios.post('/notificaciones', {
        mensaje: `El empleado ${item.nombre} ha completado la capacitación inicial`,
        tipo_cuenta_id: 4 // Cambiar por el id del asistente a cargo
      });

      snackbar.message = 'Capacitación incial enviada con éxito';
      snackbar.alert.color = 'success'

      setEnviarCapacitacion(false);

    } catch (error) {

      console.error(error);

      snackbar.message = error.message ?? 'Error al enviar la capacitación';
      snackbar.alert.color = 'error'

    } finally {
      dispatch(openSnackbar(snackbar));
    }

  };

  console.log('renders');

  useEffect(() => {

    const value = JSON.parse(localStorage.getItem(key));
    if (!value) {

      setDiaActual(false);

    } else {

      if (today.unix() > value.ttl) {

        const localValue = {
          set: false,
          value: false,
          ttl: today.clone().endOf('day').unix()
        }

        localStorage.setItem(key, JSON.stringify(localValue));

        setDiaActual(false);

      } else {

        setDiaActual(value.set);
        setChecked(value.value);

      }

      const fechasIguales = compararFechas(today, dayjs(item.fecha_final));
      const fechaDespues = dayjs(item.fecha_final).isBefore(today);

      setEnviarCapacitacion(((fechasIguales && value.set) || fechaDespues) && !item.enviada);

    }

  }, [item]);

  return (
    <TableRow key={item.id}>
      <TableCell align="center" size="small">
        {item.no}
      </TableCell>
      <TableCell align="center" size="small">
        {item.nombre}
      </TableCell>
      <TableCell align="center" size="small">
        {item.celular}
      </TableCell>
      {diasChecked.map((value, index) => {

        if (!value) return <TableCell key={index}></TableCell>;

        const isSameDate = compararFechas(today, value.fecha);
        if ((!isSameDate && value.fecha.isBefore(today)) || (diaActual && isSameDate)) {

          const valueDay = diaActual && isSameDate? checked : value.value;

          return (
            <TableCell align="center" size="small" key={index}>
              <Grid container spacing={0} display="flex" justifyContent="center">
                <Grid item paddingX={0}>
                  <Tooltip title={`Dia ${index + 1}: ${valueDay ? 'Asistió' : 'No asistió'}`}>
                    <div>
                      <Checkbox
                        icon={<CloseIcon />}
                        checkedIcon={<CheckIcon />}
                        checked={valueDay}
                        style={{ color: valueDay ? 'green' : 'red' }}
                        disabled
                      />
                    </div>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          );
        }

        return (
          <TableCell align="center" size="small" key={index}>
            <Grid container spacing={0} display="flex" justifyContent="center">
              <Grid item paddingX={0}>
                <Tooltip title="Asistió">
                  <div>
                    <Checkbox
                      name="asistencia"
                      checkedIcon={<CheckIcon />}
                      onChange={isSameDate ? (e) => onChange(e, index) : () => { }}
                      checked={isSameDate ? diaActual : value.value}
                      disabled={!isSameDate || diaActual}
                    />
                  </div>
                </Tooltip>
              </Grid>
              <Grid item paddingX={0}>
                <Tooltip title="No asistió">
                  <div>
                    <Checkbox
                      name="noasistencia"
                      checkedIcon={<CloseIcon />}
                      onChange={isSameDate ? (e) => onChange(e, index) : () => { }}
                      checked={isSameDate ? diaActual : value.value}
                      disabled={!isSameDate || diaActual}
                    />
                  </div>
                </Tooltip>
              </Grid>
            </Grid>
          </TableCell>
        );

      })}
      <TableCell align="center">
        <Button variant="contained" color="primary" onClick={onClickEnviarCapacitacion} disabled={!enviarCapacitacion}>
          Enviar
        </Button>
      </TableCell>
    </TableRow>
  );
};

const AsistenciaTable = ({ data }) => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const rows = data.map((c, index) => (
      {
        id: c.id,
        no: index + 1,
        nombre: c.Empleado?.nombres + ' ' + c.Empleado?.apellidos,
        celular: c.Empleado?.celular,
        duracion: c.duracion_dias,
        fecha_inicio: c.fecha_desde,
        fecha_final: c.fecha_hasta,
        asistencia: c.AsistenciaCapacitacion,
        empleado_id: c.Empleado?.id,
        enviada: c.enviada
      }
    ));
    setRows(rows);
  }, [data]);

  return (
    <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Celular</TableCell>
            <TableCell align="center" colSpan={5}>Asistencia</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (<EmptyTable msg="No existe datos a mostrar" colSpan={9} />) : (rows.map((item) => <CustomRow key={item.id} item={item} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AsistenciaTable.propTypes = {
  data: PropTypes.array
};

CustomRow.propTypes = {
  item: PropTypes.object
};

export default AsistenciaTable;
