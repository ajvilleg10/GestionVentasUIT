import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { StarFilled, CheckOutlined } from '@ant-design/icons';
import useCotizaciones from 'hooks/vendedor/useCotizaciones';

import Paginacion from 'components/users/PaginacionTablas';
import { PAGE_SIZE } from 'utils/constants';

const Cotizaciones = () => {

  const cotizaciones = useCotizaciones();

  const [page, setPage] = useState(0);
  const [pageRows, setPageRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);

  useEffect(() => {
    const rows = cotizaciones.slice(0, rowsPerPage);
    setPageRows(rows);
  }, [cotizaciones]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: 'white', border: '2px solid lightblue' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#d7d7d7' }}>
              <TableCell align="center">Fecha de registro</TableCell>
              <TableCell align="center">No. Cotización</TableCell>
              <TableCell align="center">Plan</TableCell>
              <TableCell align="center">Tipo Plan</TableCell>
              <TableCell align="center">Valor Neto Anual</TableCell>
              <TableCell align="center">Negocio por Cerrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows?.map((row) => {
              return (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { cursor: 'pointer' } }}>
                  <TableCell align="center" size="auto">
                    {row.fecha_emision}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {row.id}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {row.nombre_plan}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {row.nombre_tipo}
                  </TableCell>
                  <TableCell align="right" size="small">
                    ${Number(row.valor_neto_anual).toFixed(2)}
                  </TableCell>
                  <TableCell align="center" size="small" onClick={() => console.log('Aber')}>
                    {/* Modal para confirmacion? */}
                    {row.contrato_cerrar ? <StarFilled style={{ color: '#ffd250', fontSize: '1.5rem' }} /> : ''}
                    {/* {row.necogioCerrar ? <CheckOutlined style={{ color: '#4ca64c', fontSize: '1.5rem' }} /> : ''} */}
                  </TableCell>
                </TableRow>
              );
            })}
            {cotizaciones.length > 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ p: 2 }}>
                  <Paginacion
                    data={cotizaciones}
                    setPageRows={setPageRows}
                    page={page}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    rowsPerPage={rowsPerPage}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Cotizaciones.propTypes = {};

export default Cotizaciones;
