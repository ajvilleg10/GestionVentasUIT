import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { NEGOCIOS_CERRAR_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteNegociosPorCerrar from "hooks/reportes/negocios_cerrar";

const ReporteNegociosPorCerrarJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteNegociosPorCerrar();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte de negocios por cerrar jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='citas.csv'
      headers={NEGOCIOS_CERRAR_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={NEGOCIOS_CERRAR_HEADERS.length} />
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

export default ReporteNegociosPorCerrarJefe;
