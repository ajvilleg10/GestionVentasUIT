import { FormControl, MenuItem, Select, TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AsistioTableRow = ({ data, asistio, setAsistio, puntualCompleta, setPuntualCompleta }) => {
  
  const [disabled, setDisabled] = useState();

  useEffect(() => {
    if (asistio === 0) {
      setDisabled(true)
    }
    else if ( asistio === 1) {
      setDisabled(false);
    }
  }, []);
  // setAsistio(data.asistio);
  // setPuntualCompleta(data.puntualCompleta);

  const onAsistioChange = (event) => {
    setAsistio(event.target.value);
    // let selectPuntualcompletaTag = document.querySelector('#puntualCompletaSelect');
    if (event.target.value === 0) {
      // selectPuntualcompletaTag.setAttribute('disabled', '');
      setDisabled(true);
      setPuntualCompleta(0);
    }
    else if (event.target.value === 1) {
      // console.log('selectPuntualcompletaTag', selectPuntualcompletaTag);
      // selectPuntualcompletaTag.removeAttribute('disabled');
      setDisabled(false);
    }
  };

  const onPuntualCompletaChange = (event) => {
    setPuntualCompleta(event.target.value);
  };

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
    <>
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
          <FormControl fullWidth>
            <Select labelId="asistio" id="asistioSelect" value={asistio} onChange={onAsistioChange}>
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
            <Select disabled={disabled} labelId="puntualCompleta" id="puntualCompletaSelect" value={puntualCompleta} onChange={onPuntualCompletaChange}>
              {puntualCompletaOpciones?.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>
    </>
  )
}

export default AsistioTableRow