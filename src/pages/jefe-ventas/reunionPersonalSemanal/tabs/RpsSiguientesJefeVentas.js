import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem, Container, TextField, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';

import { useSelector, useDispatch } from 'store';
import { setInitialReunionesRPS, removeReunionesRPS, setInitialSize, updateReunionesRPS } from 'store/reducers/reunionesRPSSlice';
import { Close } from '@mui/icons-material';


import { dayMonthYearFormat, timeShortFormat } from 'utils/reunionFormat';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';


const CustomTableRow = ({ data }) => {
  // const [asistio, setAsistio] = useState(data.asistio);
  // const [puntualCompleta, setPuntualCompleta] = useState(data.puntualCompleta);


  // const onAsistioChange = (event) => {
  //   setAsistio(event.target.value);
  // };

  // const onPuntualCompletaChange = (event) => {
  //   setPuntualCompleta(event.target.value);
  // };

  // useEffect(() => {
  //   setAsistio(data.asistio);
  //   setPuntualCompleta(data.puntualCompleta);
  //   console.log('data rps', data);
  // }, [data]);

  // const asistioOpciones = [
  //   {
  //     value: 0,
  //     option: "NO"
  //   },
  //   {
  //     value: 1,
  //     option: "SI"
  //   }
  // ];
  // const puntualCompletaOpciones = [
  //   {
  //     value: 0,
  //     option: "NO"
  //   },
  //   {
  //     value: 1,
  //     option: "SI"
  //   }
  // ];

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" size="auto">
        {data.empleadoNombres}
      </TableCell>
      <TableCell align="left" size="auto">
        {data.empleadoApellidos}
      </TableCell>
      <TableCell align="left" size="small">
        {data.nombreTipoCuenta}
      </TableCell>
      <TableCell align="left" size="small">
        {data.asistio === 1 ? "SI" : "NO"}
      </TableCell>
      <TableCell align="left" size="small">
        {data.puntualCompleta === 1 ? "SI" : "NO"}
      </TableCell>
    </TableRow>
  );
};

const RpsSiguientesJefeVentas
  = () => {

    // const [rows, setRows] = useState();
    const { deleteReunionesRPS, getAllReunionesRPS } = useReunionPersonalSemanal();
    const [search, setSearch] = useState('');
    const currentUser = useSelector((state) => state.user);
    // console.log('current user', currentUser);
    const currentUserEmpleadoId = currentUser.id;


    const reuniones = useSelector((state) => state.reunion.reunionesRPS);
    const sizeRPS = useSelector((state) => state.reunion.size);
    const dispatch = useDispatch();

    useEffect(() => {
      console.log('reuniones is', reuniones);
      console.log('sizeRPS is', sizeRPS);
      
    }, [reuniones]);

    const reunionesOfCurrentUser = reuniones.filter((reunion) => {
      console.log('enviado', reunion.enviado);
      return reunion.empleados.some((empleado) => empleado.empleadoId === currentUserEmpleadoId) && reunion.enviado === false;
    });


    const reunionesSorted = reunionesOfCurrentUser.toSorted((r1, r2) => {
      const rr1 = new Date(r1.fechaReunion);
      const rr2 = new Date(r2.fechaReunion);

      const [h1, m1] = r1.horaDesde.split("T")[1].split(':');
      const [h2, m2] = r2.horaDesde.split("T")[1].split(':');
      const hh1 = new Date(null, null, null, h1, m1);
      const hh2 = new Date(null, null, null, h2, m2);
      // console.log('compare', h1, m1, 'zz', hh1, hh2, r1.fechaReunion, rr1, rr2 , rr2 - rr1 == 0, rr2 - rr1);
      return rr1 - rr2 || hh1 - hh2
    });

    console.log('search', search);
    const reunionTable = reunionesSorted?.filter((reunion) => {
      console.log('duracionnn', timeShortFormat(reunion.duracion), dayMonthYearFormat(reunion.fechaReunion), reunion.fechaReunion);
      return search.toLowerCase() === ''
        ? reunion
        : (
          reunion.empleados.reduce((accumulatorBool, empleado) => {
            console.log('empleado.empleadoName.toLowerCase()', empleado.empleadoName.toLowerCase(), empleado.empleadoName.toLowerCase().includes(search.toLowerCase()));
            return accumulatorBool || empleado.empleadoName.toLowerCase().includes(search.toLowerCase())

          }, false) ||
          dayMonthYearFormat(reunion.fechaReunion).includes(search.toLowerCase())

          // dayMonthYearFormat(reunion.fechaReunion).includes(search.toLowerCase()) ||
          // timeShortFormat(reunion.duracion).includes(search.toLowerCase()) ||
          // timeShortFormat(reunion.horaDesde).includes(search.toLowerCase())
        )
    }).map((reunion) => {

      return (
        <Grid item xs={12} md={6}>
          <Link style={{ textDecoration: 'none' }} to={`detalles/${reunion.idReunion}`}>
            <TableContainer key={reunion.idReunion} component={Paper} sx={{ mb: 4 }}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Id de Reunión</TableCell>
                    <TableCell align="left">Fecha de Reunion</TableCell>
                    <TableCell align="left">Hora desde</TableCell>
                    <TableCell align="left" colSpan={2}>Duración</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='left' size='small'>{reunion.idReunion}</TableCell>
                    <TableCell align='left' size='small'>{dayMonthYearFormat(reunion.fechaReunion)}</TableCell>
                    <TableCell align='left' size='small'>{timeShortFormat(reunion.horaDesde)}</TableCell>
                    <TableCell align='left' size='small'>{timeShortFormat(reunion.duracion)}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nombres</TableCell>
                    <TableCell align="left">Apellidos</TableCell>
                    <TableCell align="left">Tipo Usuario</TableCell>
                    <TableCell align="left">Asistió</TableCell>
                    <TableCell align="left">Puntual y Completa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Jefe de Ventas").map((empleado) => (
                    <CustomTableRow data={empleado} key={empleado.empleadoId} />
                  ))}
                  {reunion.empleados?.filter((empleado) => empleado.nombreTipoCuenta === "Vendedor").map((empleado) => (
                    <CustomTableRow data={empleado} key={empleado.empleadoId} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Link>
        </Grid>



      )
    });

    return (
      <>
        <Box sx={{ mb: 2 }}>
          <TextField fullWidth type='search' id='search' label='Search' variant='outlined' onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <Grid container spacing={3}>
          {reunionTable}
        </Grid>

      </>
    );
  };

RpsSiguientesJefeVentas
  .propTypes = {};
CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default RpsSiguientesJefeVentas;
