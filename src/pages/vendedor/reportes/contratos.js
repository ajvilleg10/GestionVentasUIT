import TablaReportes from "components/users/TablaReportes";
import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import { useEffect } from 'react';

import dayjs from "dayjs";

import { CONTRATOS_HEADERS } from 'utils/reportes/headers';
import { useSelector } from "store";
import { dispatch } from "store";
import { setInitData } from "store/reducers/reportes";
import useReporteContratos from "hooks/reportes/contratos";

// TODO: Cambiar filas
const ReporteContratos = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteContratos();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte contratos');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='contratos.csv'
      headers={CONTRATOS_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={CONTRATOS_HEADERS.length} />
      ) : (data.map((contrato) => (
        <TableRow key={contrato.numero_celular} id={contrato.numero_celular}>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(contrato.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{contrato.nombres}</TableCell>
          <TableCell align="center">{contrato.apellidos}</TableCell>
          <TableCell align="center">{contrato.numero_celular}</TableCell>
          <TableCell align="center">{contrato.referidor ?? 'Referidor'}</TableCell>
          <TableCell align="center">{contrato.estado_contacto}</TableCell>
          <TableCell align="center">{contrato.tipo_contacto ?? 'Tipo de contrato'}</TableCell>
          <TableCell align="center">{contrato.origen_contacto}</TableCell>
          <TableCell align="center">{contrato.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteContratos;
