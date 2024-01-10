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
import useVendedores from 'hooks/useVendedores';
import useJefesVentas from 'hooks/useJefesVentas';
import useTiposCuentas from 'hooks/useTiposCuentas';
import useActividad from 'hooks/useActividad';

const today = dayjs().add(5, 'day');

const CustomRow = ({ item }) => {

  const [capacitacionAprobada, setCapacitacionAprobada] = useState(false);
  const [diaActual, setDiaActual] = useState(false);
  const [checked, setChecked] = useState(false);
  const [enviarCapacitacion, setEnviarCapacitacion] = useState(false);

  const { getActividadesByEmpleadoIdByBodyData, deleteActividad } = useActividad();

  const vendedor = useVendedores().find((v) => v.empleado_id === item.empleado_id);
  const jefeVentaId = vendedor?.jefe_venta_id;
  const jefeVenta = useJefesVentas()?.jefesDeVentas.find((j) => j.id === jefeVentaId);
  const tipoCuentaJefeVentas = useTiposCuentas().find((tipoCuenta) => tipoCuenta.alias === 'jefe_ventas');
  const tipoCuentaJefeVentasId = tipoCuentaJefeVentas?.id;
  const jefeVentaEmpleadoId = jefeVenta?.empleado_id;

  const key = `capacitacion_${item.id}_checked`;

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

  useEffect(() => {
    console.log('item mm', item);
    const capacitacionDuracionDias = item.duracion;
    const minimoDiasCapacitacion = Math.ceil(capacitacionDuracionDias * 75 / 100);
    console.log('minimoDiasCapacitacion', minimoDiasCapacitacion);
    let diasCapacitados = 0;
    for (let i = 1; i <= capacitacionDuracionDias; i++) {
      if (item?.asistencia?.[`asistencia_dia_${i}`]) {
        diasCapacitados++;
      }
    }
    console.log('diasCapacitados', diasCapacitados);
    if (diasCapacitados >= minimoDiasCapacitacion) {
      console.log('aprobar capacitacion');
      setCapacitacionAprobada(true);
    }

  }, [item]);

  // TODO: Cambiar el envio de notificaciones por el id de asistente o jefe??

  const onClickEnviarCapacitacion = async () => {

    if (!capacitacionAprobada) {
      snackbar.message = 'Capacitación incompleta enviada, no completo el 75% de la capacitación';
      snackbar.alert.color = 'error'

      dispatch(openSnackbar(snackbar));

      const prospectoEmpleadoId = item.empleado_id;
      const formData = {
        origen: "Proyecto 100",
        tipo_actividad: "Contactos",
        pre_aprobada: true,
        aprobada: false
      }
      const actividad = await getActividadesByEmpleadoIdByBodyData(prospectoEmpleadoId, formData);
      console.log('actividad', actividad);
      const actividadId = actividad?.id;
      await deleteActividad(actividadId);

      // Enviar notificacion
      await axios.post('/notificaciones', {
        mensaje: `El prospecto Empleado ${item.nombre} NO completo la capacitación inicial`,
        tipo_cuenta_id: tipoCuentaJefeVentasId,
        empleado_id: jefeVentaEmpleadoId
      });

      //item = capacitacionInicial
      // await deleteCapacitacionInicial(item.id);

      return;
    }

    try {
      console.log('item mm', item);
      await axios.put(`/empleados/${item.empleado_id}`, { capacitacion_inicial: true });
      await axios.put(`/capacitacionesIniciales/${item.id}`, {
        tipo: 'completada'
      });

      // Enviar notificacion
      await axios.post('/notificaciones', {
        mensaje: `El empleado ${item.nombre} ha completado la capacitación inicial`,
        tipo_cuenta_id: tipoCuentaJefeVentasId,
        empleado_id: jefeVentaEmpleadoId
      });

      snackbar.message = 'Capacitación incial enviada con éxito';
      snackbar.alert.color = 'success'

      //item = capacitacionInicial
      // await deleteCapacitacionInicial(item.id);

      setEnviarCapacitacion(false);

    } catch (error) {

      console.error(error);

      snackbar.message = error.message ?? 'Error al enviar la capacitación';
      snackbar.alert.color = 'error'

    } finally {
      dispatch(openSnackbar(snackbar));
    }

  };

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
        {item.nombres}
      </TableCell>
      <TableCell align="center" size="small">
        {item.apellidos}
      </TableCell>
      <TableCell align="center" size="small">
        {item.celular}
      </TableCell>
      {diasChecked.map((value, index) => {

        if (!value) return <TableCell key={index}></TableCell>;

        const isSameDate = compararFechas(today, value.fecha);
        if ((!isSameDate && value.fecha.isBefore(today)) || (diaActual && isSameDate)) {

          const valueDay = diaActual && isSameDate ? checked : value.value;

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
  //data = capacitacionesIniciales
  //rows, item

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const rows = data.map((c, index) => (
      {
        id: c.id,
        no: index + 1,
        nombre: c.Empleado?.nombres + ' ' + c.Empleado?.apellidos,
        nombres: c.Empleado?.nombres,
        apellidos: c.Empleado?.apellidos,
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
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
      <Table sx={{ width: '100%', backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Celular</TableCell>
            <TableCell align="center" colSpan={5}>Asistencia</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (<EmptyTable msg="No existen datos a mostrar" colSpan={10} height="200px" />) : (rows.map((item) => <CustomRow key={item.id} item={item} />))}
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
