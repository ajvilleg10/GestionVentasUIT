import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  id,
  no,
  fechaInicioContrato,
  noContrato,
  estadoFirmaContrato,
  estadoContrato,
  plan,
  tipoPlan,
  valorNetoAnual,
  totalCuotaMensual,
  cuotasPendientes,
  valorAdeudado,
  proximoCobro,
  nuevoRenovado
) {
  return {
    id,
    no,
    fechaInicioContrato,
    noContrato,
    estadoFirmaContrato,
    estadoContrato,
    plan,
    tipoPlan,
    valorNetoAnual,
    totalCuotaMensual,
    cuotasPendientes,
    valorAdeudado,
    proximoCobro,
    nuevoRenovado
  };
}

const Contratos = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    const data = [
      {
        id: 1,
        fechaInicioContrato: '10/6/2023',
        noContrato: '1121',
        estadoFirmaContrato: 'Pendiente',
        estadoContrato: 'Activo',
        plan: 'Silver Individual',
        tipoPlan: 'Estandar',
        valorNetoAnual: 600,
        totalCuotaMensual: 50,
        cuotasPendientes: 2,
        valorAdeudado: 300,
        proximoCobro: '11/06/2023',
        nuevoRenovado: 'Nuevo'
      },
      {
        id: 2,
        fechaInicioContrato: '25/6/2023',
        noContrato: '1121',
        estadoFirmaContrato: 'Firmado',
        estadoContrato: 'Inactivo',
        plan: 'Gold grupal',
        tipoPlan: 'Premium',
        valorNetoAnual: 1200,
        totalCuotaMensual: 50,
        cuotasPendientes: 2,
        valorAdeudado: 300,
        proximoCobro: '11/08/2023',
        nuevoRenovado: 'Renovado'
      }
    ];
    const rows = data.map((c, index) =>
      createData(
        c.id,
        index + 1,
        c.fechaInicioContrato,
        c.noContrato,
        c.estadoFirmaContrato,
        c.estadoContrato,
        c.plan,
        c.tipoPlan,
        c.valorNetoAnual,
        c.totalCuotaMensual,
        c.cuotasPendientes,
        c.valorAdeudado,
        c.proximoCobro,
        c.nuevoRenovado
      )
    );
    setRows(rows);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Fecha Inicio Contrato</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>No. Contrato</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Estado Firma Contrato</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Estado Contrato</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Plan</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Tipo Plan</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Valor Neto Anual</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Total Cuota Mensual</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Cuotas Pendientes</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Valor Adeudado</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Próximo Cobro</TableCell>
              <TableCell align="center" sx={{ minWidth: '170px' }}>Nuevo / Renovado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                  <TableCell align="left" size="auto">
                    {row.fechaInicioContrato}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.noContrato}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.estadoFirmaContrato}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.estadoContrato}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.plan}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.tipoPlan}
                  </TableCell>
                  <TableCell align="right" size="small">
                    ${row.valorNetoAnual}
                  </TableCell>
                  <TableCell align="right" size="small">
                    ${row.totalCuotaMensual}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.cuotasPendientes}
                  </TableCell>
                  <TableCell align="right" size="small">
                    ${row.valorAdeudado}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.proximoCobro}
                  </TableCell>
                  <TableCell align="left" size="small">
                    {row.nuevoRenovado}
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

Contratos.propTypes = {};

export default Contratos;
