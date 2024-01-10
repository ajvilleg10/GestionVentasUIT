import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { CAPACITACION_INICIAL_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteCapacitacionInicial from "hooks/reportes/capacitacion_inicial";

const ReporteCapacitacionInicialJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteCapacitacionInicial();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte capacitacion inicial jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (
    <TablaReportes
      filename='capacitacion_inicial.csv'
      headers={CAPACITACION_INICIAL_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={CAPACITACION_INICIAL_HEADERS.length} />
      ) : (data.map((capacitacion) => (
        <TableRow key={capacitacion.id} id={capacitacion.id}>
          <TableCell align="center">{dayjs(capacitacion.fecha_capacitacion).format("YYYY-MM-DD")}</TableCell>
          <TableCell align="center">{capacitacion.jefe_ventas}</TableCell>
          <TableCell align="center">{capacitacion.prospecto}</TableCell>
          <TableCell align="center">{capacitacion.capacitacion_inicial}</TableCell>
          <TableCell align="center">{capacitacion.estado}</TableCell>
          <TableCell align="center">{capacitacion.comentarios}</TableCell>
          <TableCell align="center">{capacitacion.fecha_alta}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>
  );

};

export default ReporteCapacitacionInicialJefe;
