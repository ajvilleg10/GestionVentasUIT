import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { GESTION_CONTACTOS_HEADERS } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteGestionContactos from "hooks/reportes/gestion_contactos";

const ReporteGestionContactosJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteGestionContactos();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte gestion de contactos jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='gestion_contactos.csv'
      headers={GESTION_CONTACTOS_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={GESTION_CONTACTOS_HEADERS.length} />
      ) : (data.map((gestion) => (
        <TableRow key={gestion.numero_celular} id={gestion.numero_celular}>
          <TableCell align="center">{gestion?.vendedor?.nombre_completo}</TableCell>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(gestion.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{gestion.nombres}</TableCell>
          <TableCell align="center">{gestion.apellidos}</TableCell>
          <TableCell align="center">{gestion.numero_celular}</TableCell>
          <TableCell align="center">{gestion.referidor ?? 'Referidor'}</TableCell>
          <TableCell align="center">{gestion.estado_contacto}</TableCell>
          <TableCell align="center">{gestion.tipo_contacto ?? 'Tipo de contacto'}</TableCell>
          <TableCell align="center">{gestion.origin_contacto}</TableCell>
          <TableCell align="center">{gestion.modo_contacto}</TableCell>
          <TableCell align="center">{gestion.interesado}</TableCell>
          <TableCell align="center">{gestion.motivo}</TableCell>
          <TableCell align="center">{gestion.siguiente_accion}</TableCell>
          <TableCell align="center">{gestion.referidos}</TableCell>
          <TableCell align="center">{gestion.cantidad_referidos}</TableCell>
          <TableCell align="center">{gestion.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteGestionContactosJefe;
