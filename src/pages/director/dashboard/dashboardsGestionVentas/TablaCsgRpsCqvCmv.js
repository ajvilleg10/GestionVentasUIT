import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import React from 'react';

const headCells = [
  {
    id: 'Semana',
    align: 'center',
    disablePadding: false,
    label: 'Semana',
  },
  {
    id: 'numero',
    align: 'center',
    disablePadding: true,
    label: 'Número',
  },
  {
    id: 'csg',
    align: 'center',
    disablePadding: false,
    label: 'CSG',
  },
  {
    id: 'rps',
    align: 'center',
    disablePadding: false,
    label: 'RPS',
  },
  {
    id: 'cqv',
    align: 'center',
    disablePadding: false,
    label: 'CQV',
  },
  {
    id: 'cmv',
    align: 'center',
    disablePadding: false,
    label: 'CMV',
  },
  {
    id: 'meta_alcanzada',
    align: 'center',
    disablePadding: false,
    label: 'Meta Alcanzada',
  },
  {
    id: 'valor_bonificado',
    align: 'center',
    disablePadding: false,
    label: 'Valor Bonificado',
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function getCeldaValor(key, value) {
  return <label>{value}</label>;
}

function TablaCsgRpsCqvCmv({ data }) {
  return (
    <TableContainer sx={{ width: '100%', overflowX: 'auto' }} style={{ width: '100%' }}>
      <Table>
        <OrderTableHead />
        <TableBody>
          {data.map((dataRow, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell align='center'>{dataRow.semana}</TableCell>
              {Object.keys(dataRow.dataSemana).map((key) => (
                <TableCell key={key} align='center'>
                  {getCeldaValor(key, dataRow.dataSemana[key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaCsgRpsCqvCmv;
