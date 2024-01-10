import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton
} from '@mui/material';

// third-party
import { NumericFormat } from 'react-number-format';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';

// project import
import Dot from 'components/@extended/Dot';

// Generar datos ficticios
function generateRows() {
  return Array.from({ length: 10 }, (_, semana) => {
    semana += 1; // Semana actual
    const citasVerificadas = Math.floor(Math.random() * 100); // Número aleatorio para citas verificadas
    const citasNoVerificadas = Math.floor(Math.random() * 100); // Número aleatorio para citas no verificadas
    const asistenciaPuntual = Math.random() < 0.5; // Booleano aleatorio para asistencia puntual (50% de probabilidad)
    const metaAlcanzada = (Math.random() * 100).toFixed(2); // Porcentaje aleatorio para la meta alcanzada (dos decimales)
    const valorBonificado = Math.random().toFixed(2) * 1000; // Valor bonificado aleatorio

    return {
      semana,
      citas_verificadas: citasVerificadas,
      citas_no_verificadas: citasNoVerificadas,
      asisitencias_puntual: asistenciaPuntual,
      meta_alcanzada: metaAlcanzada,
      Valor_bonificado: valorBonificado,
    };
  });
}

const rows = generateRows(); // Generar datos ficticios

const headCells = [
  { id: 'semana', align: 'center', disablePadding: false, label: 'Semana' },
  { id: 'citas_verificadas', align: 'center', disablePadding: true, label: 'Citas Verificadas' },
  { id: 'citas_no_verificadas', align: 'center', disablePadding: false, label: 'Citas No Verificadas' },
  { id: 'asisitencias_puntual', align: 'center', disablePadding: false, label: 'Asistencias Puntual CSG HL' },
  { id: 'meta_alcanzada', align: 'center', disablePadding: false, label: 'Meta Alcanzada (%)' },
  { id: 'Valor_bonificado', align: 'center', disablePadding: false, label: 'Valor Bonificado' },
];

function descendingComparator(a, b, orderBy) {
  return b[orderBy] - a[orderBy];
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const OrderTableHead = ({ order, orderBy }) => (
  <TableHead>
    <TableRow>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.align}
          padding={headCell.disablePadding ? 'none' : 'normal'}
        >
          {headCell.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

OrderTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};

export default function TablaIndicadoresSemanalesCitas() {
  const [order] = useState('asc');
  const [orderBy] = useState('semana');

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          display: 'block',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row) => (
              <TableRow key={row.semana}>
                <TableCell align="center">
                  <Link color="secondary" component={RouterLink} to="">
                    {row.semana}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.citas_verificadas}</TableCell>
                <TableCell align="center">{row.citas_no_verificadas}</TableCell>
                <TableCell align="center">
                  <IconButton
                    sx={{
                      color: row.asisitencias_puntual ? 'success.main' : 'error.main',
                      pointerEvents: 'none', // Elimina el hover
                    }}
                    size="small"
                  >
                    {row.asisitencias_puntual ? <CheckOutlined /> : <CloseOutlined />}
                  </IconButton>
                </TableCell>
                <TableCell align="center">{`${row.meta_alcanzada}%`}</TableCell>
                <TableCell align="center">
                  <NumericFormat value={row.Valor_bonificado} displayType="text" thousandSeparator prefix="$" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
