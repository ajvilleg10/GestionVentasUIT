import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { TRANSFERENCIA_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteTransferenciaContactos from "hooks/reportes/transaferencia";

const ReporteTransferenciaJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteTransferenciaContactos();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte transferencia de contactos jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='transferencia_contactos.csv'
      headers={TRANSFERENCIA_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={TRANSFERENCIA_HEADERS.length} />
      ) : (data.map((transferencia) => (
        <TableRow key={transferencia.id} id={transferencia.id}>
          <TableCell align="center">{dayjs(transferencia.fecha_transferencia).format("YYYY-MM-DD")}</TableCell>
          <TableCell align="center">{transferencia.jefe_ventas}</TableCell>
          <TableCell align="center">{transferencia.vendedor_anterior}</TableCell>
          <TableCell align="center">{transferencia.estado_vendedor_anterior}</TableCell>
          <TableCell align="center">{transferencia.vendedor_actual}</TableCell>
          <TableCell align="center">{transferencia.estado_vendedor_actual}</TableCell>
          <TableCell align="center">{transferencia.nombres_contacto}</TableCell>
          <TableCell align="center">{transferencia.apellidos_contacto}</TableCell>
          <TableCell align="center">{transferencia.celular_contacto}</TableCell>
          <TableCell align="center">{transferencia.tipo_contacto}</TableCell>
          <TableCell align="center">{transferencia.estado_contacto}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteTransferenciaJefe;
