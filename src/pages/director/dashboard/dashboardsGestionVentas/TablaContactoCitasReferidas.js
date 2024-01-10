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
    id: 'numero_vendedor',
    align: 'center',
    disablePadding: true,
    label: 'Número vendedor',
  },
  {
    id: 'contacto_telefoncio',
    align: 'center',
    disablePadding: false,
    label: 'Contactos telefónicos',
  },
  {
    id: 'citas_nuevas_obtenidas',
    align: 'center',
    disablePadding: false,
    label: 'Citas nuevas obtenidas',
  },
  {
    id: 'citas_nuevas_concretadas',
    align: 'center',
    disablePadding: false,
    label: 'Citas nuevas concretadas',
  },
  {
    id: 'citas_cierre_concretadas',
    align: 'center',
    disablePadding: false,
    label: 'Citas de cierre concretadas',
  },
  {
    id: 'negocios_cerrar',
    align: 'center',
    disablePadding: false,
    label: 'Negocios por cerrar',
  },
  {
    id: 'referidos',
    align: 'center',
    disablePadding: false,
    label: 'Referidos',
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
  if (key === 'citas_cierre_concretadas' || key === 'negocios_por_cerrar') {
    return (
      <Box display='flex' justifyContent='space-between' width='100%'>
        <div style={{ flex: 1 }}>{value.cantidad}</div>
        <div style={{ flex: 1 }}>{value.monto}</div>
      </Box>
    );
  }

  if (key === 'meta_alcanzada') {
    return <label>{value === 'visto' ? 'Sí' : 'No'}</label>;
  }

  return <label>{value}</label>;
}

function TablaContactoCitasReferidas({ data }) {
  console.log("La data que se envia a la tabla contactos: ", data);
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

export default TablaContactoCitasReferidas;
