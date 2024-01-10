import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControl, Select, MenuItem, Container, TextField, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import useReunionPersonalSemanal from 'hooks/asistenteVenta/useReunionPersonalSemanal';
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { useSelector, useDispatch } from 'store';
import { setInitialReuniones } from 'store/reducers/reunionSlice';



const CustomTableRow = ({ data }) => {
  const [asistio, setAsistio] = useState('NO');
  const [puntualCompleta, setPuntualCompleta] = useState('NO');


  const onAsistioChange = (event) => {
    setAsistio(event.target.value);
  };

  const onPuntualCompletaChange = (event) => {
    setPuntualCompleta(event.target.value);
  };

  const asistioOpciones = ['SI', 'NO'];
  const puntualCompletaOpciones = ['SI', 'NO'];

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
          <Select labelId="asistio" id="asistioSelect" value={asistio} onChange={onAsistioChange}>
            {asistioOpciones?.map((opcion) => (
              <MenuItem value={opcion} key={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="left" size="small">
        <FormControl fullWidth>
          <Select labelId="puntualCompleta" id="puntualCompletaSelect" value={puntualCompleta} onChange={onPuntualCompletaChange}>
            {puntualCompletaOpciones?.map((opcion) => (
              <MenuItem value={opcion} key={opcion}>
                {opcion}
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
  // const { getAllReunionesRPS, createReunionPersonalSemanal } = useReunionPersonalSemanal();
  const [search, setSearch] = useState('');

  const reuniones = useSelector((state) => state.reunion.reuniones);
  const size = useSelector((state) => state.reunion.size);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('reunion--', reuniones);
    console.log('size--', size);
    dispatch(setInitialReuniones(reuniones));

  }, [reuniones]);

  console.log('search', search);





  const reunionTable = reuniones?.filter((reunion) => {
    return search.toLowerCase() === ''
      ? reunion
      : (
        reunion.empleados.reduce((accumulatorBool, empleado) => {
          console.log('empleado.empleadoName.toLowerCase()', empleado.empleadoName.toLowerCase(), empleado.empleadoName.toLowerCase().includes(search.toLowerCase()));
          return accumulatorBool || empleado.empleadoName.toLowerCase().includes(search.toLowerCase())

        }, false) ||
        reunion.fechaReunion.includes(search.toLowerCase()) ||
        reunion.duracion.includes(search.toLowerCase()) ||
        reunion.horaDesde.includes(search.toLowerCase())
      )
  }).map((reunion) => {

    return (
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id de Reunión</TableCell>
              <TableCell align="left">Fecha de Reunion</TableCell>
              <TableCell align="left">Duración</TableCell>
              <TableCell align="left">Hora desde</TableCell>
              <TableCell align="left">
                <Button sx={{mr: 2}} color='error' variant="outlined" startIcon={<DeleteIcon />}>
                  Eliminar
                </Button>
                <Button variant="outlined" startIcon={<ModeEditIcon />}>
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='left' size='small'>{reunion.no}</TableCell>
              <TableCell align='left' size='small'>{reunion.fechaReunion}</TableCell>
              <TableCell align='left' size='small'>{reunion.duracion}</TableCell>
              <TableCell align='left' size='small'>{reunion.horaDesde}</TableCell>
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
            {reunion.empleados?.map((row) => (
              <CustomTableRow data={row} key={row.id} />
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
