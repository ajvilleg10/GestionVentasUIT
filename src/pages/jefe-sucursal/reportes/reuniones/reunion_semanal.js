import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { RPS_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteReunionesPersonales from "hooks/reportes/reuniones/reunion_personal";

const ReporteComiteSemanalJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteReunionesPersonales();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte reunion personal semanal jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (
    <TablaReportes
      filename='reunion_personal_semanal.csv'
      headers={RPS_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={RPS_HEADERS.length} />
      ) : (data.map((reunion) => (
        <TableRow key={reunion.id} id={reunion.id}>
          <TableCell align="center">{dayjs(reunion.fecha_reunion).format('YYYY-MM-DD')}</TableCell>
          <TableCell align="center">{reunion.jefe_ventas}</TableCell>
          <TableCell align="center">{reunion.vendedor}</TableCell>
          <TableCell align="center">{reunion.asistencia}</TableCell>
          <TableCell align="center">{reunion.puntual_completa}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>
  );

};

export default ReporteComiteSemanalJefe;
