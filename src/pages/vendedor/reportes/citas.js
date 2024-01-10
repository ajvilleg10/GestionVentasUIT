import TablaReportes from "components/users/TablaReportes";
import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import { useEffect } from 'react';

import dayjs from "dayjs";

import { CITAS_HEADERS } from 'utils/reportes/headers';
import useReporteCitas from "hooks/reportes/citas";
import { useSelector } from "store";
import { dispatch } from "store";
import { setInitData } from "store/reducers/reportes";

const ReporteCitas = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteCitas();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte citas');
      dispatch(setInitData({ data: [] }));
    }
  }, []);

  return (

    <TablaReportes
      filename='gestion_contactos.csv'
      headers={CITAS_HEADERS}
    >
      {data.length === 0 ? (
        <EmptyTable msg="No existen datos para mostrar" colSpan={CITAS_HEADERS.length} />
      ) : (data.map((cita) => (
        <TableRow key={cita.id} id={cita.id}>
          <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{dayjs(cita.fecha_registro).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{cita.nombres}</TableCell>
          <TableCell align="center">{cita.apellidos}</TableCell>
          <TableCell align="center">{cita.cedula}</TableCell>
          <TableCell align="center">{cita.numero_celular}</TableCell>
          <TableCell align="center">{cita.correo}</TableCell>
          <TableCell align="center">{cita.referidor}</TableCell>
          <TableCell align="center">{cita.estado_contacto}</TableCell>
          <TableCell align="center">{cita.tipo_contacto}</TableCell>
          <TableCell align="center">{cita.origen_contacto}</TableCell>
          <TableCell align="center">{cita.tipo_cita}</TableCell>
          <TableCell align="center">{cita.modo_contacto}</TableCell>
          <TableCell align="center">{dayjs(cita.fecha_cita).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{cita.direccion}</TableCell>
          <TableCell align="center">{cita.modo_verificacion}</TableCell>
          <TableCell align="center">{cita.concretada}</TableCell>
          <TableCell align="center">{cita.convocado_jv}</TableCell>
          <TableCell align="center">{cita.asistio_vendedor}</TableCell>
          <TableCell align="center">{cita.asistio_jefe_ventas}</TableCell>
          <TableCell align="center">{cita.explico_serv}</TableCell>
          <TableCell align="center">{cita.valoracion_vend}</TableCell>
          <TableCell align="center">{cita.valoracion_serv}</TableCell>
          <TableCell align="center">{cita.verificado_av}</TableCell>
          <TableCell align="center">{dayjs(cita.fecha_verificado).format("YYYY-MM-DD HH:mm")}</TableCell>
          <TableCell align="center">{cita.seguro_medico}</TableCell>
          <TableCell align="center">{cita.interesado}</TableCell>
          <TableCell align="center">{cita.siguiente_accion}</TableCell>
          <TableCell align="center">{cita.referidos}</TableCell>
          <TableCell align="center">{cita.cantidad_referidos}</TableCell>
          <TableCell align="center">{cita.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

  // const currentUser = useSelector(state => state.user);
  // const [citas, setCitas] = useState([]);

  // console.log(currentUser);
  // const exportData = () => { };

  // return (
  //   <Grid container spacing={3}>
  //     <Grid item xs={12}>
  //       <List sx={{ py: 0 }} dense>
  //         <ListItem sx={{ px: 0 }}>
  //           <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }} alignItems="start">
  //             <Button variant="contained" startIcon={<FileDownload />} onClick={exportData}>
  //               Exportar
  //             </Button>
  //           </Grid>
  //         </ListItem>
  //         <ListItem sx={{ px: 0 }}>
  //           <Grid item xs={12} md={6}>
  //             <BusquedaReportes data={citas} update={(newData) => setCitas(newData)} />
  //           </Grid>
  //           <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'end' }} alignItems="start" />
  //         </ListItem>
  //       </List>
  //     </Grid>
  //     <Grid item xs={12}>
  //       <TableContainer component={Paper}>
  //         <Table sx={{ width: '100%' }} aria-label="simple table">
  //           <TableHead>
  //             <TableRow>
  //               {CITAS_HEADERS.map((h) => (
  //                 <TableCell sx={{ minWidth: '170px' }} align={h.align} key={h.name}>{h.name}</TableCell>
  //               ))}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {citas.length === 0 ? (
  //               <EmptyTable msg="No existen datos para mostrar" colSpan={CITAS_HEADERS.length} />
  //             ) : (citas.map((cita) => (
  //               <TableRow key={cita.id} id={cita.id}>
  //                 {/*Aqui verificar como llega la data para mostrarla*/}
  //                 <TableCell align="center">{dayjs().format("YYYY-MM-DD HH:mm")}</TableCell>
  //               </TableRow>
  //             )))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </Grid>
  //   </Grid>
  // );

};

export default ReporteCitas;
