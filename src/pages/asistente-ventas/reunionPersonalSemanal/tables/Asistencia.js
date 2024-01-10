import { useEffect, useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem, Container, TextField, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';

import { useSelector, useDispatch } from 'store';
import { setInitialReunionesRPS, removeReunionesRPS, setInitialSize, updateReunionesRPS, sendReunionesRPS } from 'store/reducers/reunionesRPSSlice';
import { Close } from '@mui/icons-material';
import RpsEditModal from './RpsEditModal';
import RpsDeleteModal from './RpsDeleteModal';
// import { dayMonthYearFormat, timeShortFormat } from 'utils/reunionFormat';
import RpsSendModalAreYouSure from './RspSendModalAreYouSure';
import { openSnackbar } from 'store/reducers/snackbar';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import dayjs from 'dayjs';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ActaMejoramientoModal from './ActaMejoramientoModal';
import { is } from 'date-fns/locale';

const CustomTableRow = ({ data }) => {


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
        {data.asistio === 1 ? 'SI' : 'NO'}
      </TableCell>
      <TableCell align="left" size="small">
        {data.puntualCompleta === 1 ? 'SI' : 'NO'}
      </TableCell>
    </TableRow>
  );
};

const Asistencia = () => {

  const { deleteReunionesRPS, getAllReunionesRPS, updateReunionesRPS: updateReunionesRPSfetch } = useReunionPersonalSemanal();
  const [search, setSearch] = useState('');
  const [timeout, setTimeout] = useState(false);



  const reuniones = useSelector((state) => state.reunion.reunionesRPS);
  // const sizeRPS = useSelector((state) => state.reunion.size);
  const dispatch = useDispatch();
  console.log('run asistencia', reuniones);


  function handleSendReunionesRPS(id, data) {
    async function run() {
      try {
        // console.log("send reunion", id, "enviada");
        const response = await updateReunionesRPSfetch(id, data);

        if (response) {
          dispatch(sendReunionesRPS(data));
        }

      } catch (error) {
        console.log(error);
      }

      dispatch(
        openSnackbar({
          open: true,
          message: 'Reunion personal semanal enviada con exito',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
    run();

  }

  const handleEditReunionesRPS = (data) => {
    // console.log('edit reunion with ID-', data);

    dispatch(updateReunionesRPS(data));
    // dispatch(setInitialReunionesRPS())


  }

  //delete, modal
  // async function handleDeleteReunionesRPS(id) {
  //   try {
  //     const response = await deleteReunionesRPS(id);
  //     // const response = true;
  //     if (response)
  //       dispatch(removeReunionesRPS(id));
  //     // console.log('removed reunion with ID', id);

  //   } catch (error) {
  //     console.log(error);
  //   }

  //   dispatch(
  //     openSnackbar({
  //       open: true,
  //       message: 'Reunion personal semanal eliminada con exito',
  //       variant: 'alert',
  //       alert: {
  //         color: 'success'
  //       },
  //       close: false
  //     })
  //   );
  // }


  // const reunionesOfCurrentUser = reuniones.filter((reunion) => {
  //   // console.log('enviado', reunion.enviado, typeof(reunion.enviado));
  //   return reunion.enviado === false;
  // });






  const reunionesOfCurrentUser = useMemo(() => reuniones?.filter(reunion => reunion.enviado === false), [reuniones]);

  console.log('reunionesOfCurrentUser', reunionesOfCurrentUser);

  const reunionesSorted = useMemo(() => {
    return reunionesOfCurrentUser.toSorted((r1, r2) => {
      const rr1 = new Date(r1.fechaReunion);
      const rr2 = new Date(r2.fechaReunion);

      const [h1, m1] = r1.horaDesde.split("T")[1].split(':');
      const [h2, m2] = r2.horaDesde.split("T")[1].split(':');
      const hh1 = new Date(null, null, null, h1, m1);
      const hh2 = new Date(null, null, null, h2, m2);
      // console.log('compare', h1, m1, 'zz', hh1, hh2, r1.fechaReunion, rr1, rr2 , rr2 - rr1 == 0, rr2 - rr1);
      return rr1 - rr2 || hh1 - hh2
    });

  }, [reunionesOfCurrentUser])

  console.log('reunionesSorted', reunionesSorted);

  const reunionesJefeAndVendedor = useMemo(() => {
    return reunionesSorted?.filter((reunion) => {
      let isJefe = false;
      let isVendedor = false;
      reunion.empleados?.map((empleado) => {

        if (empleado.nombreTipoCuenta === "Jefe de Ventas") isJefe = true;
        if (empleado.nombreTipoCuenta === "Vendedor") isVendedor = true;
      });
      return isJefe && isVendedor;
    })

  }, [reunionesSorted]);

  console.log('reunionesJefeAndVendedor', reunionesJefeAndVendedor);

  const reunionTable2 = reunionesJefeAndVendedor?.map((reunion) => {
    return (
      <>
        <div>{reunion.idReunion}</div>
        <div>{reunion.fechaReunion}</div>
        <div>{reunion.horaDesde}</div>
        <div>{reunion.duracion}</div>
        {reunion.empleados?.map((empleado) => {
          return (
            <>
              <div>{empleado.empleadoNombres}</div>
              <div>{empleado.empleadoApellidos}</div>
              <div>{empleado.nombreTipoCuenta}</div>
              <div>{empleado.asistio}</div>
              <div>{empleado.puntualCompleta}</div>
            </>
          )
        })}
      </>
    )
  });

  const reunionTable = reunionesJefeAndVendedor?.filter((reunion) => {

    return search.toLowerCase() === ''
      ? reunion
      : (
        reunion.empleados.reduce((accumulatorBool, empleado) => {
          console.log('empleado.empleadoName.toLowerCase()', empleado.empleadoName?.toLowerCase(), empleado.empleadoName?.toLowerCase().includes(search.toLowerCase()));
          return accumulatorBool || empleado.empleadoName?.toLowerCase().includes(search.toLowerCase())

        }, false) ||
        dayjs(reunion.fechaReunion).format("DD/MM/YYYY").includes(search.toLowerCase())

        // dayMonthYearFormat(reunion.fechaReunion).includes(search.toLowerCase()) ||
        // timeShortFormat(reunion.duracion).includes(search.toLowerCase()) ||
        // timeShortFormat(reunion.horaDesde).includes(search.toLowerCase())
      )
  }).map((reunion) => {

    // const reunionTable = reuniones.map((reunion) => {

    console.log('reunion 230', reunion);

    return (
      <TableContainer
        key={reunion.idReunion}
        component={Paper}
        sx={{ mb: 4 }}

      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">No.</TableCell> */}
              <TableCell align="left">Id de Reunión</TableCell>
              <TableCell align="left">Fecha de Reunion</TableCell>
              <TableCell align="left">Hora desde</TableCell>
              <TableCell align="left">Duración</TableCell>
              <TableCell
                align="left"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActaMejoramientoModal reunion={reunion} />


                {/* {isTimeout(reunion.fechaReunion, reunion.horaDesde) ? (
                  <TimerOffIcon 
                    color='error'
                    sx={{
                      mr: 2,
                    }}
                    
                  />

                ) : 'no icon'} */}
                {/* <RpsDeleteModal 
                  handleDeleteReunionesRPS={handleDeleteReunionesRPS}
                  reunion={reunion}
                /> */}

                <RpsEditModal
                  handleEditReunionesRPS={handleEditReunionesRPS}
                  reunion={reunion}
                />
                <RpsSendModalAreYouSure
                  reunion={reunion}
                  handleSendReunionesRPS={handleSendReunionesRPS}
                />

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* <TableCell align='left' size='small'>{reunion.no}</TableCell> */}
              <TableCell align='left' size='small'>{reunion.idReunion}</TableCell>
              <TableCell align='left' size='small'>{dayjs(reunion.fechaReunion).format("DD/MM/YYYY")}</TableCell>
              <TableCell align='left' size='small'>{dayjs(reunion.horaDesde).format("HH:mm")}</TableCell>
              <TableCell align='left' size='small'>{dayjs(reunion.duracion).format("HH:mm")}</TableCell>
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
            {reunion.empleados?.map((empleado) => (
              <CustomTableRow data={empleado} key={empleado.empleadoId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    )
  });

  return (
    <>
      <Box sx={{ my: 1 }}>
        <TextField fullWidth type='search' id='search' label='Search' variant='outlined' onChange={(e) => setSearch(e.target.value)} />
      </Box>
      {reunionTable}

    </>
  );
};

Asistencia.propTypes = {};
CustomTableRow.propTypes = {
  data: PropTypes.object
};

export default Asistencia;
