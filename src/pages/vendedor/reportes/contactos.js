import TablaReportes from "components/users/TablaReportes";
import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import { useEffect } from 'react';

import dayjs from "dayjs";

import { CONTACTOS_HEADERS } from 'utils/reportes/headers';
import useReporteContactos from 'hooks/reportes/contactos';
import { useSelector } from "store";
import { dispatch } from "store";
import { setInitData } from "store/reducers/reportes";

const ReporteContactos = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteContactos();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte contactos');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='contactos.csv'
      headers={CONTACTOS_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={CONTACTOS_HEADERS.length} />
      ) : (data.map((contacto) => (
        <TableRow key={contacto.numero_celular} id={contacto.numero_celular}>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(contacto.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{contacto.nombres}</TableCell>
          <TableCell align="center">{contacto.apellidos}</TableCell>
          <TableCell align="center">{contacto.numero_celular}</TableCell>
          <TableCell align="center">{contacto.referidor ?? 'Referidor'}</TableCell>
          <TableCell align="center">{contacto.estado_contacto}</TableCell>
          <TableCell align="center">{contacto.tipo_contacto ?? 'Tipo de contacto'}</TableCell>
          <TableCell align="center">{contacto.origen_contacto}</TableCell>
          <TableCell align="center">{contacto.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

};

export default ReporteContactos;
