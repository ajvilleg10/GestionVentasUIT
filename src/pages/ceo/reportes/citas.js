import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { CITAS_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteCitas from "hooks/reportes/citas";

const ReporteCitasJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteCitas();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte de citas jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  console.log('data', data);

  return (

    <TablaReportes
      filename='citas.csv'
      headers={CITAS_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={CITAS_HEADERS.length} />
      ) : (data.map((cita) => (
        <TableRow key={cita.id} id={cita.id}>
          <TableCell align="center">{cita?.vendedor?.nombre_completo}</TableCell>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(cita.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{cita.nombres}</TableCell>
          <TableCell align="center">{cita.apellidos}</TableCell>
          <TableCell align="center">{cita.cedula}</TableCell>
          <TableCell align="center">{cita.numero_celular}</TableCell>
          <TableCell align="center">{cita.correo}</TableCell>
          <TableCell align="center">{cita.referidor}</TableCell>
          <TableCell align="center">{cita.estado_contacto}</TableCell>
          <TableCell align="center">{cita.tipo_contacto}</TableCell>
          <TableCell align="center">{cita.origen_contacto}</TableCell>
          <TableCell align="center">{cita.tipo_cita}</TableCell>
          <TableCell align="center">{cita.modo_contacto}</TableCell>
          <TableCell align="center">{dayjs(cita.fecha_cita).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{cita.direccion}</TableCell>
          <TableCell align="center">{cita.modo_verificacion}</TableCell>
          <TableCell align="center">{cita.concretada}</TableCell>
          <TableCell align="center">{cita.convocado_jv}</TableCell>
          <TableCell align="center">{cita.asistio_vendedor}</TableCell>
          <TableCell align="center">{cita.asistio_jefe_ventas}</TableCell>
          <TableCell align="center">{cita.explico_serv}</TableCell>
          <TableCell align="center">{cita.valoracion_vend}</TableCell>
          <TableCell align="center">{cita.valoracion_serv}</TableCell>
          <TableCell align="center">{cita.verificado_av}</TableCell>
          <TableCell align="center">{dayjs(cita.fecha_verificado).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{cita.seguro_medico}</TableCell>
          <TableCell align="center">{cita.interesado}</TableCell>
          <TableCell align="center">{cita.siguiente_accion}</TableCell>
          <TableCell align="center">{cita.referidos}</TableCell>
          <TableCell align="center">{cita.cantidad_referidos}</TableCell>
          <TableCell align="center">{cita.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteCitasJefe;
