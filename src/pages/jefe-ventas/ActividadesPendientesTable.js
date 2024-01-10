import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

import axios from 'utils/axios';

// import formatDate from 'utils/formatDate';
// import useAsistenteVentas from 'hooks/asistente-ventas/useAsistenteVentas';

import { JefeVentaDisplayContext } from 'contexts/JefeVentaDisplayContext';
import dayjs from 'dayjs';
import { openSnackbar } from 'store/reducers/snackbar';
import { dispatch } from 'store';

import useProspecto from 'hooks/jefeVenta/useProspecto';
import useTiposCuentas from 'hooks/useTiposCuentas';
import useCapacitacionesIniciales from 'hooks/useCapacitacionesIniciales';
import useCurrentUser from 'hooks/useCurrentUser';
import useJefesVentas from 'hooks/useJefesVentas';
import { useSelector } from 'store';

function createData(
  id,
  no,
  fechaRegistro,
  tipoActividad,
  nombres,
  apellidos,
  celular,
  origen,
  accionRealizada,
  preAprobada,
  aprobada,
  data
) {
  return {
    id,
    no,
    fechaRegistro,
    tipoActividad,
    nombres,
    apellidos,
    celular,
    origen,
    accionRealizada,
    preAprobada,
    aprobada,
    data
  };
}

const CustomTableRow = ({ data }) => {
  // const { deleteCapacitacionInicial } = useCapacitacionesIniciales();
  // const tiposCuentas = useTiposCuentas();
  // const prospectoVendedor = tiposCuentas?.find((tipoCuenta) => tipoCuenta.nombre_tipo === 'Asistente de Ventas');
  // console.log('currentUser', currentUser);

  const [preAprobado, setPreAprobado] = useState(false);
  const [aprobado, setAprobado] = useState(false);
  const [capacitacionAprobada, setCapacitacionAprobada] = useState(false);

  const currentUser = useCurrentUser();
  const { jefesDeVentas: jefesVentas } = useJefesVentas();
  const { capacitacionesIniciales } = useCapacitacionesIniciales();

  // const cuser = useSelector(state => state.user);
  // console.log(cuser);

  useEffect(() => {

    const jefeVentaEmpleadoId = currentUser?.cuentaInfo?.empleado_id;
    const jefeVenta = jefesVentas?.find((jefeVenta) => jefeVenta.empleado_id === jefeVentaEmpleadoId);

    const jefeVentaId = jefeVenta?.id;
    const actividadEmpleadoId = data.data.empleado_id;

    // const asistenteVentaId = jefeVenta?.asistente_venta_id;
    // console.log('jefeVenta', jefeVenta);
    // const actividadId = data.id;
    // console.log('capacitacionesIniciales', capacitacionesIniciales);
    //get the lowest capacitacion_inicial
    //lowest = the most recent capacitacion_inicial

    const capacitacion = capacitacionesIniciales?.sort((capacitacion1, capacitacion2) => {
      const createdAtDiff = dayjs(capacitacion2.createdAt).diff(dayjs(capacitacion1.createdAt));

      let diff;
      if (createdAtDiff === 0) {
        diff = dayjs(capacitacion2.updatedAt).diff(dayjs(capacitacion1.updatedAt));
      } else {
        diff = createdAtDiff;
      }
      return diff;
    }).find((capacitacion) => capacitacion.empleado_id === actividadEmpleadoId && capacitacion.jefe_venta_id === jefeVentaId);

    console.log('capacitacion', capacitacion);

    // const asistenciaId = capacitacion?.asistencia_id
    // console.log('capacitacion', capacitacion);
    // console.log('minimoDiasCapacitacion', minimoDiasCapacitacion);
    // console.log('diasCapacitados', diasCapacitados);

    const capacitacionEnviada = capacitacion?.enviada;
    const capacitacionDuraciondias = capacitacion?.duracion_dias;
    const minimoDiasCapacitacion = Math.ceil(capacitacionDuraciondias * 75 / 100);

    let diasCapacitados = 0;
    for (let i = 1; i <= capacitacionDuraciondias; i++) {
      if (capacitacion?.AsistenciaCapacitacion?.[`asistencia_dia_${i}`]) {
        diasCapacitados++;
      }
    }
    if (diasCapacitados >= minimoDiasCapacitacion && capacitacionEnviada) {
      console.log('aprobar capacitacion');
      setCapacitacionAprobada(true);
    }

  }, [capacitacionesIniciales, jefesVentas, currentUser]);

  // const capacitacionInicial = capacitacionesIniciales?.find((capacitacion) => capacitacion.empleado_id === actividadEmpleadoId && capacitacion.jefe_venta_id === jefeVentaId);
  //search by jefe_venta_id
  // const tipoCuentaJefeVentas = useTiposCuentas();
  // console.log('tipoCuentaJefeVentas', tipoCuentaJefeVentas);
  // const prospectoEmpleadoId = data.data.empleado_id;
  // console.log('asistenteVentas', asistenteVentas);
  // console.log('data actividades', data);
  // const asistenteVentas = useAsistenteVentas();

  const tipoCuentaAsistenteVentas = useTiposCuentas().find((tipoCuenta) => tipoCuenta.nombre_tipo === 'Asistente de Ventas');
  const tipoCuentaAsistenteVentasId = tipoCuentaAsistenteVentas?.id;

  const preAprobarActividad = async () => {

    await axios.put(`/actividades/${data.id}`, { pre_aprobada: true });

    await axios.post('/notificaciones', {
      mensaje: `Actividad pre aprobada para el empleado ${data.nombres + ' ' + data.apellidos}`,
      tipo_cuenta_id: tipoCuentaAsistenteVentasId,
      empleado_id: 3 //id de asistente ventas, empleado_id
    });

    setPreAprobado(true);

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    }

    // snackbar.message = `Actividad Pre-aprobada para el empleado ${data.nombres + ' ' + data.apellidos}. Empleado-ID: ${data.data.empleado_id}.`;
    snackbar.message = `Empleado ${data.nombres + ' ' + data.apellidos} ha sido pre-aprobado`;
    snackbar.alert.color = 'success';

    dispatch(openSnackbar(snackbar));

  };

  // console.log(data);
  // snackbar.message = `Actividad aprobada para el nuevo vendedor ${data.nombres + ' ' + data.apellidos}. Empleado-ID: ${data.data.empleado_id}.`;
  const aprobarActividad = async () => {

    await axios.put(`/actividades/${data.id}`, { aprobada: true });
    await axios.put(`/cuentas/changeProspectoToVendedor/${data?.data?.Empleado?.id}`);

    setAprobado(true);

    const snackbar = {
      open: true,
      variant: 'alert',
      alert: {},
      close: false
    }

    snackbar.message = `Actividad aprobada para el vendedor ${data.nombres + ' ' + data.apellidos}`;
    snackbar.alert.color = 'success';

    dispatch(openSnackbar(snackbar));

    //delete capacitacion
    // const jefeVentaEmpleadoId = currentUser?.cuentaInfo?.empleado_id;
    // const jefeVenta = jefesVentas?.find((jefeVenta) => jefeVenta.empleado_id === jefeVentaEmpleadoId);
    // const jefeVentaId = jefeVenta?.id;
    // const asistenteVentaId = jefeVenta?.asistente_venta_id;
    // console.log('jefeVenta', jefeVenta);

    // const actividadId = data.id;
    // const actividadEmpleadoId = data.data.empleado_id;

    // const capacitacion = capacitacionesIniciales?.sort((capacitacion1, capacitacion2) => {
    //   const createdAtDiff = dayjs(capacitacion2.createdAt).diff(dayjs(capacitacion1.createdAt));

    //   let diff;
    //   if (createdAtDiff === 0) {
    //     diff = dayjs(capacitacion2.updatedAt).diff(dayjs(capacitacion1.updatedAt));
    //   } else {
    //     diff = createdAtDiff;
    //   }
    //   return diff;
    // }).find((capacitacion) => capacitacion.empleado_id === actividadEmpleadoId && capacitacion.jefe_venta_id === jefeVentaId);

    // await deleteCapacitacionInicial(capacitacion.id);

  };

  useEffect(() => {
    setPreAprobado(data.preAprobada);
    setAprobado(data.aprobada);
  }, []);

  // console.log('prospectoJefeVenta2', prospectoJefeVenta, data.data);
  // console.log('handleclick');
  // useEffect(() => {
  //   console.log('displayFlag2', displayFlag);
  // }, [displayFlag]);
  // const { displayFlag, setDisplayFlag, prospecto, setProspecto } = useContext(JefeVentaDisplayContext);

  const { setDisplayFlag, setProspecto } = useContext(JefeVentaDisplayContext);
  const prospectoJefeVenta = useProspecto(data.data.empleado_id);

  // console.log('setDisplay', setDisplayFlag());
  // console.log('setProspecto', setProspecto);

  function handleFlag() {
    setDisplayFlag(value => !value);
    setProspecto(prospectoJefeVenta);
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
      <TableCell align="center" size="small">
        {data.no}
      </TableCell>
      <TableCell align="center" size="small">
        {data.nombres}
      </TableCell>
      <TableCell align="center" size="small">
        {data.apellidos}
      </TableCell>
      <TableCell align="center" size="small">
        {data.celular}
      </TableCell>
      <TableCell align="center" size="small">
        {data.origen}
      </TableCell>
      <TableCell align="center" size="small">
        {/* {(!preAprobado && !aprobado) && 'Sin acción'} */}
        {/* {(preAprobado && !aprobado) && 'Pre aprobada'} */}
        {/* {(preAprobado && aprobado) && 'Aprobada'} */}
        {preAprobado && aprobado === false ? 'Pre aprobada' : ''}
        {aprobado && preAprobado ? 'Aprobada' : ''}
      </TableCell>
      <TableCell align="center" size="small" sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }} colSpan={2}>
        {preAprobado && capacitacionAprobada && !aprobado ? <Button variant='outlined' onClick={aprobarActividad}>Aprobar</Button> : ''}
        {!preAprobado && !aprobado ? <Button variant='outlined' onClick={preAprobarActividad}>Pre aprobar</Button> : ''}
        {/* {(!preAprobado && !aprobado) && <Button variant='outlined' onClick={preAprobarActividad}>Pre aprobar</Button>} */}
        {/* {(preAprobado && !aprobado) && <Button disabled={capacitacionAprobada} variant='outlined' onClick={aprobarActividad}>Aprobar</Button>} */}
        <Button onClick={handleFlag} variant='outlined'>Ir al Perfil</Button>
      </TableCell>
    </TableRow>
  );
};

const ActividadesPendientesTable = () => {

  const [showProspectoInfo, setShowProspectoInfo] = useState();
  const [prospecto, setProspecto] = useState();

  const handleClick = (prospectoVendedor) => {
    console.log('prospectoVendedor', prospectoVendedor);
    setProspecto(prospectoVendedor);
    setShowProspectoInfo(true);
  };
  const [rows, setRows] = useState();

  useEffect(() => {
    const getActividadesSinAprobar = async () => {
      const response = await axios.get('/actividades/sinAprobar');
      const data = response.data;
      console.log(response.data);
      const rows = data.map((c, index) =>
        createData(
          c.id,
          index + 1,
          c.createdAt,
          c.tipo_actividad,
          c.Empleado.nombres,
          c.Empleado.apellidos,
          c.Empleado.celular,
          c.origen,
          c.pre_aprobada ? 'Pre aprobada' : c.aprobada ? 'Aprobada' : '',
          c.pre_aprobada,
          c.aprobada,
          c
        )
      );
      setRows(rows);
    };
    getActividadesSinAprobar();
  }, []);

  return (
    <>
      {showProspectoInfo ? <Box /> : <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nombres</TableCell>
              <TableCell align="center">Apellidos</TableCell>
              <TableCell align="center">Celular</TableCell>
              <TableCell align="center">Origen</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell colSpan={2} align="center">Acción a realizar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return <CustomTableRow
                key={row.id}
                data={row}
                onClick={() => handleClick(row)}
              />;
            })}
          </TableBody>
        </Table>
      </TableContainer>}
    </>
  );
};

ActividadesPendientesTable.propTypes = {
  data: PropTypes.array
};
CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default ActividadesPendientesTable;
