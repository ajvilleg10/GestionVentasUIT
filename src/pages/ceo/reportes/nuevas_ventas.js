import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { VENTAS_NUEVAS_HEADER } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteVentasNuevas from "hooks/reportes/ventas_nuevas";

const ReporteVentasNuevas = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteVentasNuevas();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte ventas nuevas jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='ventas_nuevas.csv'
      headers={VENTAS_NUEVAS_HEADER}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={VENTAS_NUEVAS_HEADER.length} />
      ) : (data.map((gestion) => (
        <TableRow key={gestion.numero_celular} id={gestion.numero_celular}>
          <TableCell align="center">{gestion?.vendedor?.nombre_completo}</TableCell>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(gestion.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{gestion.nombres}</TableCell>
          <TableCell align="center">{gestion.apellidos}</TableCell>
          <TableCell align="center">{gestion.numero_celular}</TableCell>
          <TableCell align="center">{gestion.referidor ?? 'Referidor'}</TableCell>
          <TableCell align="center">{gestion.gestion}</TableCell>
          <TableCell align="center">{gestion.gestion ?? 'Tipo de gestion'}</TableCell>
          <TableCell align="center">{gestion.gestion}</TableCell>
          <TableCell align="center">{gestion.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteVentasNuevas;
