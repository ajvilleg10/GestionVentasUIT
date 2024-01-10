import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ContainerOutlined } from '@ant-design/icons';

function createData(id, no, fechaHoraSistema, noCotizacion, plan, tipoPlan, valorNetoAnual, necogioCerrar) {
  return { id, no, fechaHoraSistema, noCotizacion, plan, tipoPlan, valorNetoAnual, necogioCerrar };
}

const Cotizaciones = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const data = [
      {
        id: 1,
        fechaHoraSistema: '10/6/2023',
        noCotizacion: '1121',
        plan: 'Silver Individual',
        tipoPlan: 'Estandar',
        valorNetoAnual: 600,
        necogioCerrar: true
      },
      {
        id: 2,
        fechaHoraSistema: '25/6/2023',
        noCotizacion: '1202',
        plan: 'Gold grupal',
        tipoPlan: 'Premium',
        valorNetoAnual: 1200,
        necogioCerrar: false
      }
    ];
    const rows = data.map((c, index) =>
      createData(c.id, index + 1, c.fechaHoraSistema, c.noCotizacion, c.plan, c.tipoPlan, c.valorNetoAnual, c.necogioCerrar)
    );
    setRows(rows);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Fecha y Hora Sistema</TableCell>
              <TableCell align="left">No. Cotizacion</TableCell>
              <TableCell align="left">Plan</TableCell>
              <TableCell align="left">Tipo Plan</TableCell>
              <TableCell align="left">Valor Neto Anual</TableCell>
              <TableCell align="left">Negocio X Cerrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                  <TableCell align="left" size="small">
                    {row.no}
                  </TableCell>
                  <TableCell align="left" size="auto">
                    {row.fechaHoraSistema}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.noCotizacion}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.plan}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.tipoPlan}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.valorNetoAnual}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.necogioCerrar ? <ContainerOutlined /> : ''}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Cotizaciones.propTypes = {};

export default Cotizaciones;
