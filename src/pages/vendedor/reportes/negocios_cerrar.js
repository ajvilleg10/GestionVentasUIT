import TablaReportes from "components/users/TablaReportes";
import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import { useEffect } from 'react';

import dayjs from "dayjs";

import { NEGOCIOS_CERRAR_HEADERS } from 'utils/reportes/headers';
import useReporteNegociosPorCerrar from 'hooks/reportes/negocios_cerrar';
import { useSelector } from "store";
import { dispatch } from "store";
import { setInitData } from "store/reducers/reportes";

// TODO: Cambiar filas
const ReporteNegociosCerrar = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteNegociosPorCerrar();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte negocios por cerrar');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='negocios_por_cerrar.csv'
      headers={NEGOCIOS_CERRAR_HEADERS}
      cotizacion={true}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={NEGOCIOS_CERRAR_HEADERS.length} />
      ) : (data.map((negocio) => (
        <TableRow key={negocio.id} id={negocio.id}>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(negocio.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{negocio.nombres}</TableCell>
          <TableCell align="center">{negocio.apellidos}</TableCell>
          <TableCell align="center">{negocio.numero_celular}</TableCell>
          <TableCell align="center">{negocio.referidor ?? 'Referidor'}</TableCell>
          <TableCell align="center">{negocio.estado_contacto}</TableCell>
          <TableCell align="center">{negocio.tipo_contacto ?? 'Tipo de negocio'}</TableCell>
          <TableCell align="center">{negocio.origen_contacto}</TableCell>
          <TableCell align="center">{negocio.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteNegociosCerrar;
