import TablaReportes from "components/users/TablaReportes";
import { TableRow, TableCell } from "@mui/material";
import { EmptyTable } from "components/third-party/ReactTable";
import { useEffect } from 'react';

import dayjs from "dayjs";

import { GESTION_CONTACTOS_HEADERS } from 'utils/reportes/headers';
import useReporteGestionContactos from "hooks/reportes/gestion_contactos";
import { useSelector } from "store";
import { dispatch } from "store";
import { setInitData } from "store/reducers/reportes";

const ReporteGestionContactos = () => {

  const data = useSelector(state => state.reportes.showData);
  useReporteGestionContactos();

  useEffect(() => {
    return () => {
      console.log('Clean up estado = Reporte gestion de contactos');
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
          <TableCell align="center">{contacto.modo_contacto}</TableCell>
          <TableCell align="center">{contacto.interesado}</TableCell>
          <TableCell align="center">{contacto.motivo}</TableCell>
          <TableCell align="center">{contacto.siguiente_accion}</TableCell>
          <TableCell align="center">{contacto.referidos}</TableCell>
          <TableCell align="center">{contacto.cantidad_referidos}</TableCell>
          <TableCell align="center">{contacto.comentarios}</TableCell>
        </TableRow>
      )))}
    </TablaReportes>

  );

  // const currentUser = useSelector(state => state.user);
  // const [data, setData] = useState([]);

  // console.log(currentUser);
  // const exportData = () => {};

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
  //             <BusquedaReportes data={data} update={(newData) => setData(newData)} />
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
  //               {GESTION_CONTACTOS_HEADERS.map((h) => (
  //                 <TableCell sx={{ minWidth: '170px' }} align={h.align} key={h.name}>{h.name}</TableCell>
  //               ))}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {data.length === 0 ? (
  //               <EmptyTable msg="No existen datos para mostrar" colSpan={GESTION_CONTACTOS_HEADERS.length} />
  //             ) : (data.map((d) => (
  //               <TableRow key={d.id} id={d.id}>
  //                   {/*Aqui verificar como llega la data para mostrarla*/}
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

export default ReporteGestionContactos;
