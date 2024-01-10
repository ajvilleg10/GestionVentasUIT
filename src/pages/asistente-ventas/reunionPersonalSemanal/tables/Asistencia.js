import { useEffect, useState } from 'react';
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
import { dayMonthYearFormat, timeShortFormat } from 'utils/reunionFormat';
import RpsSendModalAreYouSure from './RspSendModalAreYouSure';
import { openSnackbar } from 'store/reducers/snackbar';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import dayjs from 'dayjs';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ActaMejoramientoModal from './ActaMejoramientoModal';

const CustomTableRow = ({ data }) => {
  const [asistio, setAsistio] = useState(data.asistio);
  const [puntualCompleta, setPuntualCompleta] = useState(data.puntualCompleta);


  const onAsistioChange = (event) => {
    setAsistio(event.target.value);
  };

  const onPuntualCompletaChange = (event) => {
    setPuntualCompleta(event.target.value);
  };

  useEffect(() => {
    setAsistio(data.asistio);
    setPuntualCompleta(data.puntualCompleta);
  }, [data]);

  const asistioOpciones = [
    {
      value: 0,
      option: "NO"
    },
    {
      value: 1,
      option: "SI"
    }
  ];
  const puntualCompletaOpciones = [
    {
      value: 0,
      option: "NO"
    },
    {
      value: 1,
      option: "SI"
    }
  ];

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" size="auto">
        {data.empleadoName}
      </TableCell>
      <TableCell align="left" size="small">
        {data.nombreTipoCuenta}
      </TableCell>
      <TableCell align="left" size="small">
        <FormControl fullWidth>
          <Select disabled labelId="asistio" id="asistioSelect" value={asistio} onChange={onAsistioChange}>
            {asistioOpciones?.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="left" size="small">
        <FormControl fullWidth>
          <Select disabled labelId="puntualCompleta" id="puntualCompletaSelect" value={puntualCompleta} onChange={onPuntualCompletaChange}>
            {puntualCompletaOpciones?.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

const Asistencia = () => {

  // const [rows, setRows] = useState();
  const { deleteReunionesRPS, getAllReunionesRPS, updateReunionesRPS: updateReunionesRPSfetch } = useReunionPersonalSemanal();
  const [search, setSearch] = useState('');
  // const [reunionesst, setReunionesst] = useState();
  const [timeout, setTimeout] = useState(false);


  const reuniones = useSelector((state) => state.reunion.reunionesRPS);
  const sizeRPS = useSelector((state) => state.reunion.size);
  const dispatch = useDispatch();
  // setReunionesst(reuniones);

  // useEffect(() => {
  //   console.log('initial reunion--', reuniones);
  //   console.log('initial size--', sizeRPS);
  //   // dispatch(setInitialReunionesRPS(reuniones));
  //   // dispatch(setInitialSize(reuniones.length));
  //   // getAllReunionesRPS();

  // }, []);

  // useEffect(() => {
  //   dispatch(setInitialReunionesRPS(reuniones));
  //   dispatch(setInitialSize(reuniones.length));
  //   console.log('reunion--', reuniones);
  //   console.log('size--', sizeRPS);
  //   // getAllReunionesRPS();

  // }, [reuniones]);

  // console.log('search', search);

  // useEffect(() => {
  //   console.log('reuniones is', reuniones);
  //   console.log('sizeRPS is', sizeRPS);
  //   // setReunionesst(reuniones);

  // }, [reuniones]);

  async function handleSendReunionesRPS(id, data) {
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

  const handleEditReunionesRPS = (data) => {
    // console.log('edit reunion with ID-', data);

    dispatch(updateReunionesRPS(data));
    // dispatch(setInitialReunionesRPS())


  }

  //delete, modal
  async function handleDeleteReunionesRPS(id) {
    try {
      const response = await deleteReunionesRPS(id);
      // const response = true;
      if (response)
        dispatch(removeReunionesRPS(id));
      // console.log('removed reunion with ID', id);

    } catch (error) {
      console.log(error);
    }

    dispatch(
      openSnackbar({
        open: true,
        message: 'Reunion personal semanal eliminada con exito',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );


  }


  const reunionesOfCurrentUser = reuniones.filter((reunion) => {
    // console.log('enviado', reunion.enviado, typeof(reunion.enviado));
    return reunion.enviado === false;
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

  // function isTimeout(fechaReunionn, horaDesdee) {
  //   // fechaReunion, horaDesde in UTC format

  //   const now = dayjs(dayjs().format('YYYY-MM-DD'));
  //   // const now = dayjs(dayjs().format('2023-10-17'));
  //   const nowTime = dayjs(dayjs().format('YYYY-MM-DD HH:mm'));
  //   // const nowTime = dayjs(dayjs().format('2023-10-17 14:05'));
  //   const fechaReunion = dayjs(fechaReunionn);
  //   const nowDate = now.format('YYYY-MM-DD');
  //   // const time = timeShortFormat(horaDesdee);
  //   const time = dayjs(horaDesdee).format('HH:mm');
  //   // console.log('time', time);
  //   //create and add 30 minutes
  //   const horaDesde = dayjs(`${nowDate} ${time}`).add(30, 'minutes');

  //   // const d1 = dayjs('2023-10-17');
  //   // const difftemp = fechaReunion.diff(now);

  //   // const fechaReunionTimeout = fechaReunion.diff(now);
  //   // const horaDesdeTimeout = horaDesde.diff(nowTime);
  //   const d11 = dayjs('2023-10-19');
  //   const d22 = d11.add(1,'day');
  //   console.log('24h',d11, d22, d22.diff(d11));

  //   if (fechaReunion.diff(now) > 0) {
  //     return false
  //   } else if (fechaReunion.diff(now) === 0 && horaDesde.diff(nowTime) > 0) {
  //     return false
  //   } else if (fechaReunion.diff(now) === 0 && horaDesde.diff(nowTime) === 0) {
  //     return false
  //   } else if (fechaReunion.diff(now) === 0 && horaDesde.diff(nowTime) < 0) {
  //     return true
  //     //control and desactivate check time
  //   } else if (fechaReunion.diff(now) < 0) {
  //     return true
  //   }



  // }

  // const [time, setTime] = useState();
  // const [reunionTimeout, setReunionTimeout] = useState();
  // useEffect(() => {
  //   setInterval(() => setTime(dayjs()), 1000);
  //   // const timer = setTimeout()
  // }, []);
  // useEffect(() => {
  //   setReunionTimeout(isTimeout())
  // }, [time]);


  const reunionTable = reunionesSorted?.filter((reunion) => {

    // function isTimeout(fechaReunionn, horaDesdee) {
    //   // fechaReunion, horaDesde in UTC format

    //   const now = dayjs(dayjs().format('YYYY-MM-DD'));
    //   // const now = dayjs(dayjs().format('2023-10-17'));
    //   const nowTime = dayjs(dayjs().format('YYYY-MM-DD HH:mm'));
    //   // const nowTime = dayjs(dayjs().format('2023-10-17 14:05'));
    //   const fechaReunion = dayjs(fechaReunionn);
    //   const nowDate = now.format('YYYY-MM-DD');
    //   // const time = timeShortFormat(horaDesdee);
    //   const time = dayjs(horaDesdee).format('HH:mm');
    //   // console.log('time', time);
    //   const horaDesde = dayjs(`${nowDate} ${time}`);

    //   // const d1 = dayjs('2023-10-17');
    //   // const difftemp = fechaReunion.diff(now);

    //   const fechaReunionTimeout = fechaReunion.diff(now);
    //   const horaDesdeTimeout = horaDesde.diff(nowTime);

    //   if (fechaReunion.diff(now) > 0 || (fechaReunion.diff(now) === 0 && horaDesde.diff(nowTime) > 0)) {
    //     // console.log('diff', fechaReunionTimeout, horaDesdeTimeout);
    //     return true

    //   }else if (fechaReunion.diff(now) < 0) {
    //     return false
    //   }

    // }
    // console.log('isTimeout', isTimeout(reunion.fechaReunion, reunion.horaDesde));

    // console.log('fech, time', reunion.fechaReunion, reunion.horaDesde, 'fechaReunion', fechaReunion.format('YYYY-MM-DD'), 'now', now.format('YYYY-MM-DD HH:mm'), 'difftemp', difftemp, d1.format('YYYY-MM-DD'), 'diff-today', d1.diff(now), 'horaDesde', nowDate, time, horaDesde.format('HH:mm'), 'diff-time', horaDesde.diff(nowTime));
    // console.log('horaDesde', fechaReunion, horaDesde, );

    // console.log('duracionnn', timeShortFormat(reunion.duracion), dayMonthYearFormat(reunion.fechaReunion));


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
                <ActaMejoramientoModal reunion={reunion}/>
                

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
              <TableCell align='left' size='small'>{dayMonthYearFormat(reunion.fechaReunion)}</TableCell>
              <TableCell align='left' size='small'>{timeShortFormat(reunion.horaDesde)}</TableCell>
              <TableCell align='left' size='small'>{timeShortFormat(reunion.duracion)}</TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombres y Apellidos</TableCell>
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

    )
  });

  return (
    <>
      <Box maxWidth="md" sx={{ my: 1 }}>
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
