import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { RENOVACIONES_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteRenovaciones from "hooks/reportes/renovaciones";

const ReporteRenovacionesJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteRenovaciones();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte renovaciones jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='gestion_contactos.csv'
      headers={RENOVACIONES_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={RENOVACIONES_HEADERS.length} />
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

export default ReporteRenovacionesJefe;
