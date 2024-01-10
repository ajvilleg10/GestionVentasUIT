import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { REUNIONES_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteReuniones from "hooks/reportes/reuniones/reunion_general";
import { REUNION } from "utils/constants";

const ReporteComiteMensualJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteReuniones({ tipo_reunion: REUNION.Mensual })

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte comite mensual jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (
    <TablaReportes
      filename='comite_mensual.csv'
      headers={REUNIONES_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={REUNIONES_HEADERS.length} />
      ) : (data.map((reunion) => (
        <TableRow key={reunion.id} id={reunion.id}>
          <TableCell align="center">{reunion.fecha_reunion}</TableCell>
          <TableCell align="center">{reunion.jefe_ventas}</TableCell>
          <TableCell align="center">{reunion.tipo_reunion}</TableCell>
          <TableCell align="center">{reunion.asistencia}</TableCell>
          <TableCell align="center">{reunion.puntual_completa}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>
  );

};

export default ReporteComiteMensualJefe;
