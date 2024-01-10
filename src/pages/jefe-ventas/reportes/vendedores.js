import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import TablaReportes from "components/users/TablaReportes";

import { useSelector, dispatch } from "store";
import { useEffect } from "react";

import dayjs from "dayjs";
import { VENDEDORES_HEADER } from "utils/reportes/headersJefeVentas";
import { setInitData } from "store/reducers/reportes";
import useReporteVendedores from "hooks/reportes/vendedores";

const ReporteVendedoresJefe = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteVendedores();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte vendedores jf');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='vendedores.csv'
      headers={VENDEDORES_HEADER}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={VENDEDORES_HEADER.length} />
      ) : (data.map((vendedor) => {

        const fecha_baja = dayjs(vendedor.fecha_baja);

        return (
          <TableRow key={vendedor.id} id={vendedor.id}>
            <TableCell align="center">{dayjs(vendedor.fecha_alta).format("YYYY-MM-DD HH:mm")}</TableCell>
            <TableCell align="center">{fecha_baja.isValid() ? fecha_baja.format("YYYY-MM-DD HH:mm") : vendedor.fecha_baja}</TableCell>
            <TableCell align="center">{vendedor.dias_activo}</TableCell>
            <TableCell align="center">{vendedor.nombre_vendedor}</TableCell>
            <TableCell align="center">{vendedor.cedula}</TableCell>
            <TableCell align="center">{vendedor.celular}</TableCell>
            <TableCell align="center">{vendedor.correo}</TableCell>
            <TableCell align="center">{vendedor.direccion}</TableCell>
            <TableCell align="center">{vendedor.estado}</TableCell>
            <TableCell align="center">{vendedor.transferencia_contactos}</TableCell>
            <TableCell align="center">{vendedor.motivo_salida}</TableCell>
            <TableCell align="center">{vendedor.comentarios}</TableCell>
          </TableRow>
        );

      }))}
    </TablaReportes>

  );

};

export default ReporteVendedoresJefe;
